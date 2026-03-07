"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import PortalCard from "@/components/portal/PortalCard";
import StatusBadge from "@/components/portal/StatusBadge";
import ProgressBar from "@/components/portal/ProgressBar";
import ActivityItem from "@/components/portal/ActivityItem";
import FileRow from "@/components/portal/FileRow";
import ClientForm from "@/components/admin/ClientForm";
import UpdateComposer from "@/components/admin/UpdateComposer";
import FileUploader from "@/components/admin/FileUploader";
import InviteUserForm from "@/components/admin/InviteUserForm";
import {
  ArrowLeft,
  ChevronRight,
  Plus,
  Loader2,
  Building2,
  Users,
  FileText,
  MessageSquare,
  Layers,
  Settings,
} from "lucide-react";

/* ---------- Types ---------- */

interface Client {
  id: string;
  company_name: string;
  industry: string | null;
  website: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_role: string | null;
  employee_count: string | null;
  location: string | null;
  notes: string | null;
}

interface Deliverable {
  id: string;
  status: string;
}

interface Pillar {
  id: string;
  name: string;
  number: string;
}

interface Workstream {
  id: string;
  status: string;
  progress: number;
  pillar: Pillar | null;
  deliverables: Deliverable[];
}

interface Engagement {
  id: string;
  status: string;
  start_date: string | null;
  target_end_date: string | null;
  key_contact: string | null;
}

interface Update {
  id: string;
  type: string;
  content: string;
  author_name: string | null;
  created_at: string;
  workstream_name: string | null;
}

interface ClientUser {
  id: string;
  user_id: string;
  role: string;
  display_name: string | null;
  email?: string;
}

interface EngagementFile {
  id: string;
  file_name: string;
  file_size: number | null;
  storage_path: string;
  created_at: string;
}

interface AllPillar {
  id: string;
  name: string;
  number: string;
}

/* ---------- Helpers ---------- */

const INPUT_CLASSES =
  "w-full px-4 py-3 rounded-xl bg-brand-darkest border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 outline-none transition-all text-sm";

const SELECT_CLASSES =
  "px-3 py-2 rounded-lg bg-brand-darkest border border-brand-border text-brand-text text-sm outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 transition-all";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ---------- Section Type ---------- */

type Section =
  | "company"
  | "engagement"
  | "workstreams"
  | "activity"
  | "users"
  | "files";

const SECTIONS: { key: Section; label: string; icon: typeof Building2 }[] = [
  { key: "company", label: "Company", icon: Building2 },
  { key: "engagement", label: "Engagement", icon: Settings },
  { key: "workstreams", label: "Workstreams", icon: Layers },
  { key: "activity", label: "Activity", icon: MessageSquare },
  { key: "users", label: "Users", icon: Users },
  { key: "files", label: "Files", icon: FileText },
];

/* ---------- Page ---------- */

export default function ClientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Client | null>(null);
  const [engagement, setEngagement] = useState<Engagement | null>(null);
  const [workstreams, setWorkstreams] = useState<Workstream[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [clientUsers, setClientUsers] = useState<ClientUser[]>([]);
  const [files, setFiles] = useState<EngagementFile[]>([]);
  const [allPillars, setAllPillars] = useState<AllPillar[]>([]);
  const [activeSection, setActiveSection] = useState<Section>("company");

  // Client form state
  const [savingClient, setSavingClient] = useState(false);

  // Engagement form state
  const [engStatus, setEngStatus] = useState("");
  const [engStartDate, setEngStartDate] = useState("");
  const [engEndDate, setEngEndDate] = useState("");
  const [engKeyContact, setEngKeyContact] = useState("");
  const [savingEngagement, setSavingEngagement] = useState(false);
  const [creatingEngagement, setCreatingEngagement] = useState(false);

  // Workstream add state
  const [selectedPillarId, setSelectedPillarId] = useState("");
  const [addingWorkstream, setAddingWorkstream] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/clients/${clientId}`);
      if (!res.ok) {
        router.push("/admin/clients");
        return;
      }
      const data = await res.json();

      setClient(data.client);
      setEngagement(data.engagement);
      setWorkstreams(data.workstreams || []);
      setUpdates(data.updates || []);
      setClientUsers(data.clientUsers || []);
      setFiles(data.files || []);
      setAllPillars(data.pillars || []);

      if (data.engagement) {
        setEngStatus(data.engagement.status || "");
        setEngStartDate(data.engagement.start_date || "");
        setEngEndDate(data.engagement.target_end_date || "");
        setEngKeyContact(data.engagement.key_contact || "");
      }
    } catch {
      router.push("/admin/clients");
    } finally {
      setLoading(false);
    }
  }, [clientId, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ── Client save handler ── */
  const handleSaveClient = async (data: {
    company_name: string;
    industry: string;
    website: string;
    contact_name: string;
    contact_email: string;
    contact_role: string;
    employee_count: string;
    location: string;
    notes: string;
  }) => {
    setSavingClient(true);
    try {
      await fetch(`/api/admin/clients/${clientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await fetchData();
    } catch {
      // Error handled silently
    } finally {
      setSavingClient(false);
    }
  };

  /* ── Engagement handlers ── */
  const handleCreateEngagement = async () => {
    setCreatingEngagement(true);
    try {
      await fetch("/api/admin/engagements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId }),
      });
      await fetchData();
    } catch {
      // Error handled silently
    } finally {
      setCreatingEngagement(false);
    }
  };

  const handleSaveEngagement = async () => {
    if (!engagement) return;
    setSavingEngagement(true);
    try {
      await fetch(`/api/admin/engagements/${engagement.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: engStatus,
          start_date: engStartDate || null,
          target_end_date: engEndDate || null,
          key_contact: engKeyContact || null,
        }),
      });
      await fetchData();
    } catch {
      // Error handled silently
    } finally {
      setSavingEngagement(false);
    }
  };

  /* ── Workstream handlers ── */
  const handleAddWorkstream = async () => {
    if (!engagement || !selectedPillarId) return;
    setAddingWorkstream(true);
    try {
      await fetch("/api/admin/workstreams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engagement_id: engagement.id,
          pillar_id: selectedPillarId,
        }),
      });
      setSelectedPillarId("");
      await fetchData();
    } catch {
      // Error handled silently
    } finally {
      setAddingWorkstream(false);
    }
  };

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
      </div>
    );
  }

  if (!client) return null;

  /* ── Render ── */
  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/clients"
        className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-cyan transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Clients
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
          {client.company_name}
        </h1>
        {client.industry && (
          <p className="text-brand-muted mt-1">{client.industry}</p>
        )}
      </div>

      {/* Section navigation */}
      <div className="flex flex-wrap gap-1 border-b border-brand-border/50 pb-1">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.key;
          return (
            <button
              key={section.key}
              type="button"
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-brand-cyan-bright bg-brand-cyan/10"
                  : "text-brand-muted hover:text-brand-text hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* ================================================================ */}
      {/* SECTION: Company Info */}
      {/* ================================================================ */}
      {activeSection === "company" && (
        <PortalCard className="p-6">
          <h2 className="text-lg font-semibold text-brand-text mb-4">
            Company Information
          </h2>
          <ClientForm
            client={client}
            onSave={handleSaveClient}
            loading={savingClient}
          />
        </PortalCard>
      )}

      {/* ================================================================ */}
      {/* SECTION: Engagement */}
      {/* ================================================================ */}
      {activeSection === "engagement" && (
        <PortalCard className="p-6">
          <h2 className="text-lg font-semibold text-brand-text mb-4">
            Engagement
          </h2>

          {!engagement ? (
            <div className="text-center py-8">
              <p className="text-brand-muted mb-4">
                No engagement has been created for this client yet.
              </p>
              <button
                type="button"
                onClick={handleCreateEngagement}
                disabled={creatingEngagement}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {creatingEngagement ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Plus size={16} />
                )}
                Create Engagement
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-brand-muted mb-1.5">
                    Status
                  </label>
                  <select
                    value={engStatus}
                    onChange={(e) => setEngStatus(e.target.value)}
                    className={SELECT_CLASSES + " w-full py-3 rounded-xl"}
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Key Contact */}
                <div>
                  <label className="block text-sm font-medium text-brand-muted mb-1.5">
                    Key Contact Name
                  </label>
                  <input
                    type="text"
                    value={engKeyContact}
                    onChange={(e) => setEngKeyContact(e.target.value)}
                    placeholder="Lead consultant name"
                    className={INPUT_CLASSES}
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-brand-muted mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={engStartDate}
                    onChange={(e) => setEngStartDate(e.target.value)}
                    className={INPUT_CLASSES}
                  />
                </div>

                {/* Target End Date */}
                <div>
                  <label className="block text-sm font-medium text-brand-muted mb-1.5">
                    Target End Date
                  </label>
                  <input
                    type="date"
                    value={engEndDate}
                    onChange={(e) => setEngEndDate(e.target.value)}
                    className={INPUT_CLASSES}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveEngagement}
                disabled={savingEngagement}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingEngagement ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Engagement"
                )}
              </button>
            </div>
          )}
        </PortalCard>
      )}

      {/* ================================================================ */}
      {/* SECTION: Workstreams */}
      {/* ================================================================ */}
      {activeSection === "workstreams" && (
        <div className="space-y-4">
          {!engagement ? (
            <PortalCard className="p-6">
              <p className="text-brand-muted text-center py-4">
                Create an engagement first to manage workstreams.
              </p>
            </PortalCard>
          ) : (
            <>
              {/* Workstream list */}
              {workstreams.length === 0 ? (
                <PortalCard className="p-6">
                  <p className="text-brand-muted text-sm py-2">
                    No workstreams yet. Add one below.
                  </p>
                </PortalCard>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {workstreams.map((ws) => {
                    const total = ws.deliverables?.length || 0;
                    const completed =
                      ws.deliverables?.filter((d) => d.status === "completed")
                        .length || 0;
                    const progress =
                      total > 0 ? (completed / total) * 100 : ws.progress || 0;

                    return (
                      <PortalCard
                        key={ws.id}
                        href={`/admin/clients/${clientId}/workstreams/${ws.id}`}
                        className="p-5"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                              <Layers size={20} />
                            </div>
                            <div>
                              <p className="text-xs text-brand-muted font-medium uppercase tracking-wider">
                                {ws.pillar?.number || ""}
                              </p>
                              <h3 className="text-sm font-semibold text-brand-text">
                                {ws.pillar?.name || "Workstream"}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <StatusBadge status={ws.status} />
                            <ChevronRight
                              size={16}
                              className="text-brand-muted"
                            />
                          </div>
                        </div>
                        <ProgressBar value={progress} />
                        <p className="text-xs text-brand-muted mt-2">
                          {completed}/{total} deliverables completed
                        </p>
                      </PortalCard>
                    );
                  })}
                </div>
              )}

              {/* Add workstream */}
              <PortalCard className="p-5">
                <h3 className="text-sm font-semibold text-brand-text mb-3">
                  Add Workstream
                </h3>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedPillarId}
                    onChange={(e) => setSelectedPillarId(e.target.value)}
                    className={SELECT_CLASSES + " flex-1"}
                  >
                    <option value="">Select a pillar...</option>
                    {allPillars.map((pillar) => (
                      <option key={pillar.id} value={pillar.id}>
                        {pillar.number} - {pillar.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddWorkstream}
                    disabled={addingWorkstream || !selectedPillarId}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-cyan/10 text-brand-cyan text-sm font-medium hover:bg-brand-cyan/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingWorkstream ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Plus size={14} />
                    )}
                    Add
                  </button>
                </div>
              </PortalCard>
            </>
          )}
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION: Activity */}
      {/* ================================================================ */}
      {activeSection === "activity" && (
        <div className="space-y-4">
          {engagement && (
            <PortalCard className="p-6">
              <h2 className="text-lg font-semibold text-brand-text mb-4">
                Post Update
              </h2>
              <UpdateComposer
                engagementId={engagement.id}
                workstreams={workstreams.map((ws) => ({
                  id: ws.id,
                  pillar: ws.pillar ? { name: ws.pillar.name } : null,
                }))}
                onPost={fetchData}
              />
            </PortalCard>
          )}

          <PortalCard className="p-6">
            <h2 className="text-lg font-semibold text-brand-text mb-4">
              Activity Feed
            </h2>

            {updates.length === 0 ? (
              <p className="text-sm text-brand-muted py-4">
                No activity yet.{" "}
                {engagement
                  ? "Post your first update above."
                  : "Create an engagement first."}
              </p>
            ) : (
              <div className="divide-y divide-brand-border/30">
                {updates.map((update) => (
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
            )}
          </PortalCard>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION: Users */}
      {/* ================================================================ */}
      {activeSection === "users" && (
        <div className="space-y-4">
          <PortalCard className="p-6">
            <h2 className="text-lg font-semibold text-brand-text mb-4">
              Client Users
            </h2>

            {clientUsers.length === 0 ? (
              <p className="text-sm text-brand-muted py-2">
                No users have been added to this client yet.
              </p>
            ) : (
              <div className="divide-y divide-brand-border/30">
                {clientUsers.map((cu) => (
                  <div
                    key={cu.id}
                    className="flex items-center justify-between py-3 first:pt-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="text-sm text-brand-text font-medium">
                          {cu.display_name || cu.email || "Unnamed User"}
                        </p>
                        {cu.email && (
                          <p className="text-xs text-brand-muted">{cu.email}</p>
                        )}
                      </div>
                    </div>
                    <StatusBadge status={cu.role === "admin" ? "active" : "pending"} />
                  </div>
                ))}
              </div>
            )}
          </PortalCard>

          <PortalCard className="p-6">
            <h2 className="text-lg font-semibold text-brand-text mb-4">
              Invite User
            </h2>
            <InviteUserForm clientId={clientId} onInvite={fetchData} />
          </PortalCard>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION: Files */}
      {/* ================================================================ */}
      {activeSection === "files" && (
        <div className="space-y-4">
          {engagement && (
            <PortalCard className="p-6">
              <h2 className="text-lg font-semibold text-brand-text mb-4">
                Upload File
              </h2>
              <FileUploader
                engagementId={engagement.id}
                clientId={clientId}
                onUpload={fetchData}
              />
            </PortalCard>
          )}

          <PortalCard className="p-6">
            <h2 className="text-lg font-semibold text-brand-text mb-4">
              Files
            </h2>

            {files.length === 0 ? (
              <p className="text-sm text-brand-muted py-4">
                No files uploaded yet.
                {!engagement && " Create an engagement first."}
              </p>
            ) : (
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
            )}
          </PortalCard>
        </div>
      )}
    </div>
  );
}
