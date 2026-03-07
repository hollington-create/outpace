import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import PortalCard from "@/components/portal/PortalCard";
import ProgressBar from "@/components/portal/ProgressBar";
import StatusBadge from "@/components/portal/StatusBadge";
import FileRow from "@/components/portal/FileRow";
import { PILLAR_ICONS } from "@/lib/pillar-icons";
import { ArrowLeft, Calendar } from "lucide-react";

/* ---------- Types ---------- */

interface Deliverable {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
}

interface Pillar {
  name: string;
  number: string;
  icon_name: string;
}

interface WorkstreamFile {
  id: string;
  file_name: string;
  file_size: number | null;
  storage_path: string;
  created_at: string;
}

interface Workstream {
  id: string;
  status: string;
  engagement_id: string;
  pillar: Pillar | null;
  deliverables: Deliverable[];
  files: WorkstreamFile[];
}

/* ---------- Helpers ---------- */

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ---------- Page ---------- */

export default async function WorkstreamDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Verify user has a client account
  const { data: clientUser } = await supabase
    .from("client_users")
    .select("client_id")
    .eq("user_id", user.id)
    .single();

  if (!clientUser) redirect("/login");

  // Fetch workstream with related data
  const { data: workstream } = await supabase
    .from("workstreams")
    .select(
      `
      *,
      pillar:pillars(*),
      deliverables(*),
      files(*)
    `
    )
    .eq("id", params.id)
    .single();

  if (!workstream) notFound();

  const ws = workstream as unknown as Workstream;

  // Verify the workstream belongs to the client's engagement
  const { data: engagement } = await supabase
    .from("engagements")
    .select("id")
    .eq("id", ws.engagement_id)
    .eq("client_id", clientUser.client_id)
    .single();

  if (!engagement) notFound();

  /* ── Derived data ── */
  const pillarName = ws.pillar?.name || "Workstream";
  const pillarNumber = ws.pillar?.number || "";
  const iconName = ws.pillar?.icon_name || "Settings";
  const Icon = PILLAR_ICONS[iconName];

  const deliverables = ws.deliverables || [];
  const total = deliverables.length;
  const completed = deliverables.filter(
    (d) => d.status === "completed"
  ).length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  const files = ws.files || [];

  return (
    <div className="space-y-8">
      {/* ── Back Link ── */}
      <Link
        href="/portal"
        className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-cyan transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {/* ── Header ── */}
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
            {Icon ? <Icon size={28} /> : null}
          </div>
          <div className="flex-1">
            {pillarNumber && (
              <p className="text-xs text-brand-muted font-medium uppercase tracking-wider mb-1">
                {pillarNumber}
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
              {pillarName}
            </h1>
          </div>
          <StatusBadge status={ws.status} size="md" />
        </div>
      </AnimatedSection>

      {/* ── Progress ── */}
      <AnimatedSection delay={0.1}>
        <PortalCard className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-brand-text">
              Overall Progress
            </h2>
            <span className="text-sm text-brand-muted">
              {completed}/{total} deliverables
            </span>
          </div>
          <ProgressBar value={progress} size="md" />
        </PortalCard>
      </AnimatedSection>

      {/* ── Deliverables List ── */}
      <AnimatedSection delay={0.2}>
        <PortalCard className="p-6">
          <h2 className="text-lg font-semibold text-brand-text mb-4">
            Deliverables
          </h2>

          {deliverables.length === 0 ? (
            <p className="text-sm text-brand-muted py-4">
              No deliverables have been added yet.
            </p>
          ) : (
            <div className="divide-y divide-brand-border/30">
              {deliverables.map((deliverable) => (
                <div
                  key={deliverable.id}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-brand-text">
                        {deliverable.title}
                      </h3>
                      {deliverable.description && (
                        <p className="text-sm text-brand-muted mt-1 line-clamp-2">
                          {deliverable.description}
                        </p>
                      )}
                      {deliverable.due_date && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <Calendar size={12} className="text-brand-muted" />
                          <span className="text-xs text-brand-muted">
                            Due {formatDate(deliverable.due_date)}
                          </span>
                        </div>
                      )}
                    </div>
                    <StatusBadge status={deliverable.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </PortalCard>
      </AnimatedSection>

      {/* ── Files ── */}
      {files.length > 0 && (
        <AnimatedSection delay={0.3}>
          <PortalCard className="p-6">
            <h2 className="text-lg font-semibold text-brand-text mb-2">
              Files
            </h2>
            <div className="divide-y divide-brand-border/30">
              {files.map((file) => (
                <FileRow
                  key={file.id}
                  fileName={file.file_name}
                  fileSize={file.file_size ?? undefined}
                  createdAt={file.created_at}
                />
              ))}
            </div>
          </PortalCard>
        </AnimatedSection>
      )}
    </div>
  );
}
