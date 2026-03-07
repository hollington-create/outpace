import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const { data, error: dbError } = await supabase!
      .from("workstreams")
      .select(
        "*, pillar:pillars(name, number), deliverables(*), files(*)"
      )
      .eq("id", params.id)
      .single();

    if (dbError || !data) {
      return NextResponse.json(
        { error: "Workstream not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    const updateData: Record<string, unknown> = {};
    if (body.status !== undefined) updateData.status = body.status;
    if (body.progress !== undefined) updateData.progress = body.progress;
    if (body.notes !== undefined) updateData.notes = body.notes;

    const { error: dbError } = await supabase!
      .from("workstreams")
      .update(updateData)
      .eq("id", params.id);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update workstream";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
