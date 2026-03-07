import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    // Check if user already exists for this client
    const { data: existing } = await supabase!
      .from("client_users")
      .select("id")
      .eq("client_id", body.client_id)
      .eq("email", body.email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "This email is already associated with this client." },
        { status: 400 }
      );
    }

    // Create client_user record (user_id will be linked when they sign up/log in)
    const { data, error: dbError } = await supabase!
      .from("client_users")
      .insert({
        client_id: body.client_id,
        email: body.email,
        display_name: body.display_name || null,
        role: "client",
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    // Send magic link invite via Supabase Auth
    const { error: authError } = await supabase!.auth.admin.inviteUserByEmail(
      body.email
    );

    // If auth invite fails, the client_user record is still created
    // The user can still log in via the normal login flow
    if (authError) {
      console.warn("Auth invite failed (user may need to use login page):", authError.message);
    }

    return NextResponse.json(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send invite";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
