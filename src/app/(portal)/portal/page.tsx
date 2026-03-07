import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import PortalCard from "@/components/portal/PortalCard";
import PillarCard from "@/components/portal/PillarCard";
import ActivityItem from "@/components/portal/ActivityItem";
import FileRow from "@/components/portal/FileRow";
import StatusBadge from "@/components/portal/StatusBadge";
import { Calendar, User } from "lucide-react";

/* ---------- Types ---------- */

interface Deliverable {
  id: string;
  status: string;
}

interface Pillar {
  name: string;
  number: string;
  icon_name: string;
}

interface Workstream {
  id: string;
  status: string;
  pillar: Pillar | null;
  deliverables: Deliverable[];
}

interface Update {
  id: string;
  type: string;
  content: string;
  author_name: string | null;
  created_at: string;
  workstream_name: string | null;
}

interface EngagementFile {
  id: string;
  file_name: string;
  file_size: number | null;
  storage_path: string;
  created_at: string;
}

interface Engagement {
  id: string;
  status: string;
  start_date: string | null;
  target_end_date: string | null;
  key_contact: string | null;
  workstreams: Workstream[];
  updates: Update[];
  files: EngagementFile[];
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

export default async function PortalDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: clientUser } = await supabase
    .from("client_users")
    .select("client_id, clients(company_name, consultation_id)")
    .eq("user_id", user.id)
    .single();

  if (!clientUser) redirect("/login");

  const client = clientUser.clients as {
    company_name?: string;
    consultation_id?: string;
  } | null;
  const companyName = client?.company_name || "Your Company";

  const { data: engagement } = await supabase
    .from("engagements")
    .select(
      `
      *,
      workstreams(*, pillar:pillars(*), deliverables(id, status)),
      updates(*),
      files(*)
    `
    )
    .eq("client_id", clientUser.client_id)
    .eq("status", "active")
    .single();

  const eng = engagement as Engagement | null;

  /* ── No active engagement ── */
  if (!eng) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-6">
          <Calendar className="w-10 h-10 text-brand-cyan" />
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-2">
          No active engagement yet
        </h1>
        <p className="text-brand-muted max-w-md">
          Your engagement hasn&apos;t been set up yet. Once your project kicks
          off, you&apos;ll see progress, deliverables, and updates right here.
        </p>
      </div>
    );
  }

  /* ── Derived data ── */
  const sortedUpdates = [...(eng.updates || [])]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 10);

  const recentFiles = [...(eng.files || [])]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* ── Welcome Header ── */}
      <AnimatedSection>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
            Welcome back, {companyName}
          </h1>
          <p className="text-brand-muted mt-1">
            Here&apos;s an overview of your engagement progress.
          </p>
        </div>
      </AnimatedSection>

      {/* ── Engagement Overview ── */}
      <AnimatedSection delay={0.1}>
        <PortalCard className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h2 className="text-lg font-semibold text-brand-text">
              Engagement Overview
            </h2>
            <StatusBadge status={eng.status} size="md" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-darkest flex items-center justify-center text-brand-cyan">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs text-brand-muted">Start Date</p>
                <p className="text-sm text-brand-text font-medium">
                  {formatDate(eng.start_date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-darkest flex items-center justify-center text-brand-emerald">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs text-brand-muted">Target End</p>
                <p className="text-sm text-brand-text font-medium">
                  {formatDate(eng.target_end_date)}
                </p>
              </div>
            </div>

            {eng.key_contact && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-darkest flex items-center justify-center text-violet-400">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted">Key Contact</p>
                  <p className="text-sm text-brand-text font-medium">
                    {eng.key_contact}
                  </p>
                </div>
              </div>
            )}
          </div>
        </PortalCard>
      </AnimatedSection>

      {/* ── Pillar Progress Grid ── */}
      {eng.workstreams && eng.workstreams.length > 0 && (
        <AnimatedSection delay={0.2}>
          <h2 className="text-lg font-semibold text-brand-text mb-4">
            Pillar Progress
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eng.workstreams.map((ws) => {
              const total = ws.deliverables?.length || 0;
              const completed =
                ws.deliverables?.filter((d) => d.status === "completed")
                  .length || 0;
              const progress = total > 0 ? (completed / total) * 100 : 0;

              return (
                <PillarCard
                  key={ws.id}
                  pillarName={ws.pillar?.name || "Workstream"}
                  pillarNumber={ws.pillar?.number || ""}
                  iconName={ws.pillar?.icon_name || "Settings"}
                  status={ws.status}
                  progress={progress}
                  completedDeliverables={completed}
                  totalDeliverables={total}
                  href={`/portal/workstreams/${ws.id}`}
                />
              );
            })}
          </div>
        </AnimatedSection>
      )}

      {/* ── Recent Activity ── */}
      {sortedUpdates.length > 0 && (
        <AnimatedSection delay={0.3}>
          <PortalCard className="p-6">
            <h2 className="text-lg font-semibold text-brand-text mb-2">
              Recent Activity
            </h2>
            <div className="divide-y divide-brand-border/30">
              {sortedUpdates.map((update) => (
                <ActivityItem
                  key={update.id}
                  type={
                    (update.type as
                      | "general"
                      | "milestone"
                      | "deliverable"
                      | "meeting"
                      | "note") || "general"
                  }
                  content={update.content}
                  authorName={update.author_name || undefined}
                  createdAt={update.created_at}
                  workstreamName={update.workstream_name || undefined}
                />
              ))}
            </div>
          </PortalCard>
        </AnimatedSection>
      )}

      {/* ── Recent Files ── */}
      {recentFiles.length > 0 && (
        <AnimatedSection delay={0.4}>
          <PortalCard className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-brand-text">
                Recent Files
              </h2>
              <a
                href="/portal/files"
                className="text-sm text-brand-cyan hover:text-brand-cyan-bright transition-colors"
              >
                View all
              </a>
            </div>
            <div className="divide-y divide-brand-border/30">
              {recentFiles.map((file) => (
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
