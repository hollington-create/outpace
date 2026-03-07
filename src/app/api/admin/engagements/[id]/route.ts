import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    const { error: dbError } = await supabase!
      .from("engagements")
      .update({
        status: body.status,
        start_date: body.start_date,
        target_end_date: body.target_end_date,
        key_contact: body.key_contact,
      })
      .eq("id", params.id);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update engagement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
