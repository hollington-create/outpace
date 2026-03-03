import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { createEmptyExtractedData } from "@/lib/consultation-defaults";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("consultations")
      .insert({ slug: slug || null, extracted_data: createEmptyExtractedData() })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ consultation: data });
  } catch {
    return NextResponse.json({ error: "Failed to create consultation" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("consultations")
      .select("*, messages(*)")
      .eq("session_id", sessionId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ consultation: data });
  } catch {
    return NextResponse.json({ error: "Failed to load consultation" }, { status: 500 });
  }
}
