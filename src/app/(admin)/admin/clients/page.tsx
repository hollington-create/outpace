import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import PortalCard from "@/components/portal/PortalCard";
import StatusBadge from "@/components/portal/StatusBadge";
import { Plus, Building2, Mail, User } from "lucide-react";

/* ---------- Types ---------- */

interface Client {
  id: string;
  company_name: string;
  industry: string | null;
  contact_name: string | null;
  contact_email: string | null;
  engagements: { status: string }[];
}

/* ---------- Page ---------- */

export default async function ClientsListPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: clients } = await supabase
    .from("clients")
    .select("*, engagements(status)")
    .order("company_name", { ascending: true });

  const allClients = (clients || []) as unknown as Client[];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
            Clients
          </h1>
          <p className="text-brand-muted mt-1">
            Manage all client accounts and engagements.
          </p>
        </div>

        <Link
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-semibold text-sm hover:opacity-90 transition-opacity self-start"
        >
          <Plus size={16} />
          New Client
        </Link>
      </div>

      {/* Client List */}
      {allClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-brand-cyan" />
          </div>
          <h2 className="text-lg font-semibold text-brand-text mb-1">
            No clients yet
          </h2>
          <p className="text-brand-muted text-sm max-w-md mb-4">
            Create your first client to get started managing engagements and
            deliverables.
          </p>
          <Link
            href="/admin/clients/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            New Client
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {allClients.map((client) => {
            const latestEngagement = client.engagements?.[0];
            const engagementStatus = latestEngagement?.status || "no_engagement";

            return (
              <PortalCard
                key={client.id}
                href={`/admin/clients/${client.id}`}
                className="p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Company info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan flex-shrink-0">
                      <Building2 size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-brand-text truncate">
                        {client.company_name}
                      </h3>
                      {client.industry && (
                        <p className="text-xs text-brand-muted truncate">
                          {client.industry}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="flex items-center gap-4 text-xs text-brand-muted flex-shrink-0">
                    {client.contact_name && (
                      <span className="flex items-center gap-1.5">
                        <User size={12} />
                        {client.contact_name}
                      </span>
                    )}
                    {client.contact_email && (
                      <span className="flex items-center gap-1.5 hidden sm:flex">
                        <Mail size={12} />
                        {client.contact_email}
                      </span>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0">
                    <StatusBadge
                      status={
                        engagementStatus === "no_engagement"
                          ? "draft"
                          : engagementStatus
                      }
                    />
                  </div>
                </div>
              </PortalCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
