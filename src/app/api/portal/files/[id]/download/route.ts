import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();

    // Auth check: any authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Fetch the file record
    const { data: file, error: fileError } = await supabase
      .from("files")
      .select("storage_path, engagement_id")
      .eq("id", id)
      .single();

    if (fileError || !file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Verify the file belongs to the user's client
    // Get the client_id from the engagement
    const { data: engagement, error: engError } = await supabase
      .from("engagements")
      .select("client_id")
      .eq("id", file.engagement_id)
      .single();

    if (engError || !engagement) {
      return NextResponse.json(
        { error: "Engagement not found" },
        { status: 404 }
      );
    }

    // Check user has access to this client
    const { data: clientUser, error: accessError } = await supabase
      .from("client_users")
      .select("id")
      .eq("user_id", user.id)
      .eq("client_id", engagement.client_id)
      .single();

    if (accessError || !clientUser) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    // Generate signed URL (valid for 1 hour)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from("client-files")
      .createSignedUrl(file.storage_path, 3600);

    if (urlError || !signedUrlData) {
      return NextResponse.json(
        { error: "Failed to generate download URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: signedUrlData.signedUrl });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 }
    );
  }
}
