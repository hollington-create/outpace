import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { error, supabase } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    const { data, error: dbError } = await supabase!
      .from("clients")
      .insert({
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
      .select("id")
      .single();

    if (dbError) throw dbError;

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create client";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
