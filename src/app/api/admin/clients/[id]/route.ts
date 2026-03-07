import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const clientId = params.id;

    // Fetch client
    const { data: client, error: clientErr } = await supabase!
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .single();

    if (clientErr || !client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Fetch engagement
    const { data: engagement } = await supabase!
      .from("engagements")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // Fetch workstreams if engagement exists
    let workstreams: unknown[] = [];
    let updates: unknown[] = [];
    let files: unknown[] = [];

    if (engagement) {
      const [wsRes, updatesRes, filesRes] = await Promise.all([
        supabase!
          .from("workstreams")
          .select("*, pillar:pillars(id, name, number), deliverables(id, status)")
          .eq("engagement_id", engagement.id)
          .order("created_at", { ascending: true }),
        supabase!
          .from("updates")
          .select("*")
          .eq("engagement_id", engagement.id)
          .order("created_at", { ascending: false })
          .limit(50),
        supabase!
          .from("files")
          .select("*")
          .eq("engagement_id", engagement.id)
          .order("created_at", { ascending: false }),
      ]);

      workstreams = wsRes.data || [];
      updates = updatesRes.data || [];
      files = filesRes.data || [];
    }

    // Fetch client users
    const { data: clientUsers } = await supabase!
      .from("client_users")
      .select("*")
      .eq("client_id", clientId);

    // Fetch all pillars for the add-workstream dropdown
    const { data: pillars } = await supabase!
      .from("pillars")
      .select("id, name, number")
      .order("number", { ascending: true });

    return NextResponse.json({
      client,
      engagement,
      workstreams,
      updates,
      files,
      clientUsers: clientUsers || [],
      pillars: pillars || [],
    });
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
    const clientId = params.id;

    const { error: dbError } = await supabase!
      .from("clients")
      .update({
        company_name: body.company_name,
        industry: body.industry || null,
        website: body.website || null,
        contact_name: body.contact_name || null,
        contact_email: body.contact_email || null,
        contact_role: body.contact_role || null,
        employee_count: body.employee_count || null,
        location: body.location || null,
        notes: body.notes || null,
      })
      .eq("id", clientId);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update client";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
