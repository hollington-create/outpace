import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { error, supabase, user } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    // Get workstream name if a workstream was specified
    let workstreamName: string | null = null;
    if (body.workstream_id) {
      const { data: ws } = await supabase!
        .from("workstreams")
        .select("pillar:pillars(name)")
        .eq("id", body.workstream_id)
        .single();

      const pillar = ws?.pillar as unknown as { name: string } | null;
      workstreamName = pillar?.name || null;
    }

    const { data, error: dbError } = await supabase!
      .from("updates")
      .insert({
        engagement_id: body.engagement_id,
        type: body.type || "general",
        content: body.content,
        author_name: user!.email || "Admin",
        workstream_id: body.workstream_id || null,
        workstream_name: workstreamName,
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    return NextResponse.json(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to post update";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
