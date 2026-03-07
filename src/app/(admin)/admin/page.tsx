import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PortalCard from "@/components/portal/PortalCard";
import ActivityItem from "@/components/portal/ActivityItem";
import { Users, Briefcase, CheckCircle } from "lucide-react";

/* ---------- Types ---------- */

interface Update {
  id: string;
  type: string;
  content: string;
  author_name: string | null;
  created_at: string;
  workstream_name: string | null;
  engagement: {
    client: {
      company_name: string;
    } | null;
  } | null;
}

/* ---------- Page ---------- */

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch stats in parallel
  const [clientsRes, engagementsRes, deliverablesRes, updatesRes] =
    await Promise.all([
      supabase.from("clients").select("id", { count: "exact", head: true }),
      supabase
        .from("engagements")
        .select("id", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("deliverables")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("updates")
        .select(
          "*, engagement:engagements(client:clients(company_name))"
        )
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

  const totalClients = clientsRes.count ?? 0;
  const activeEngagements = engagementsRes.count ?? 0;
  const totalDeliverables = deliverablesRes.count ?? 0;
  const recentUpdates = (updatesRes.data || []) as unknown as Update[];

  const stats = [
    {
      label: "Total Clients",
      value: totalClients,
      icon: Users,
      color: "text-brand-cyan",
      bg: "bg-brand-cyan/10",
    },
    {
      label: "Active Engagements",
      value: activeEngagements,
      icon: Briefcase,
      color: "text-brand-emerald",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Deliverables",
      value: totalDeliverables,
      icon: CheckCircle,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
          Admin Dashboard
        </h1>
        <p className="text-brand-muted mt-1">
          Overview of all clients and engagements.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <PortalCard key={stat.label} className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-brand-text mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </div>
            </PortalCard>
          );
        })}
      </div>

      {/* Recent Activity */}
      <PortalCard className="p-6">
        <h2 className="text-lg font-semibold text-brand-text mb-4">
          Recent Activity
        </h2>

        {recentUpdates.length === 0 ? (
          <p className="text-sm text-brand-muted py-4">
            No recent activity across clients.
          </p>
        ) : (
          <div className="divide-y divide-brand-border/30">
            {recentUpdates.map((update) => {
              const clientName =
                update.engagement?.client?.company_name || "Unknown Client";
              return (
                <div key={update.id}>
                  <div className="pt-1 pb-0.5">
                    <span className="text-xs font-medium text-brand-cyan">
                      {clientName}
                    </span>
                  </div>
                  <ActivityItem
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
                </div>
              );
            })}
          </div>
        )}
      </PortalCard>
    </div>
  );
}
