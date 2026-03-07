import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    const { data, error: dbError } = await supabase!
      .from("files")
      .insert({
        engagement_id: body.engagement_id,
        workstream_id: body.workstream_id || null,
        file_name: body.file_name,
        file_size: body.file_size || null,
        storage_path: body.storage_path,
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    return NextResponse.json(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to save file record";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
