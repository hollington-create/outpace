import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    const { data, error: dbError } = await supabase!
      .from("deliverables")
      .insert({
        workstream_id: body.workstream_id,
        title: body.title,
        description: body.description || null,
        status: "pending",
        sort_order: body.sort_order ?? 0,
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    return NextResponse.json(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create deliverable";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
