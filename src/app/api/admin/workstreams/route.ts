import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    const { data, error: dbError } = await supabase!
      .from("workstreams")
      .insert({
        engagement_id: body.engagement_id,
        pillar_id: body.pillar_id,
        status: "not_started",
        progress: 0,
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create workstream";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
