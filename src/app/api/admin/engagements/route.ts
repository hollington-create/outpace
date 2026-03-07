import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    const { data, error: dbError } = await supabase!
      .from("engagements")
      .insert({
        client_id: body.client_id,
        status: "draft",
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create engagement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
