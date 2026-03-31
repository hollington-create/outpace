import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import PortalCard from "@/components/portal/PortalCard";
import StatusBadge from "@/components/portal/StatusBadge";
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  Clock,
  Building2,
  User,
  Target,
  FileText,
  Lightbulb,
} from "lucide-react";

/* ---------- Types ---------- */

interface Message {
  id: string;
  role: string;
  content: string;
  tool_calls: unknown;
  created_at: string;
}

interface Proposal {
  id: string;
  content: Record<string, unknown>;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Consultation {
  id: string;
  session_id: string;
  slug: string | null;
  status: string;
  extracted_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  messages: Message[];
  proposals: Proposal[];
}

interface VoiceConversation {
  id: string;
  elevenlabs_conversation_id: string;
  agent_id: string | null;
  status: string | null;
  transcript: { role: string; content: string; timestamp: number | null }[];
  transcript_summary: string | null;
  call_successful: string | null;
  call_duration_secs: number | null;
  cost: number | null;
  created_at: string;
}

/* ---------- Helpers ---------- */

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(secs: number | null): string {
  if (!secs) return "—";
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function renderValue(val: unknown): string {
  if (val === null || val === undefined) return "—";
  if (typeof val === "boolean") return val ? "Yes" : "No";
  if (typeof val === "number") return String(val);
  if (typeof val === "string") return val || "—";
  if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "—";
  return JSON.stringify(val);
}

/* ---------- Page ---------- */

export default async function ConsultationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { id } = await params;
  const { type } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const isVoice = type === "voice";

  if (isVoice) {
    // Load voice conversation
    const { data: voiceCall } = await supabase
      .from("voice_conversations")
      .select("*")
      .eq("id", id)
      .single();

    if (!voiceCall) notFound();

    const call = voiceCall as unknown as VoiceConversation;
    const transcript = call.transcript || [];

    return (
      <div className="space-y-6">
        {/* Back link */}
        <Link
          href="/admin/consultations?tab=voice"
          className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-cyan transition-colors"
        >
          <ArrowLeft size={16} />
          Back to consultations
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-text flex items-center gap-3">
              <Phone className="text-emerald-400" size={24} />
              Voice Call
            </h1>
            <p className="text-brand-muted text-sm mt-1">
              {formatDate(call.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {call.call_successful && (
              <StatusBadge
                status={call.call_successful === "true" ? "completed" : "cancelled"}
                size="md"
              />
            )}
          </div>
        </div>

        {/* Call Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Duration", value: formatDuration(call.call_duration_secs), icon: Clock },
            { label: "Status", value: call.status || "—", icon: Phone },
            { label: "Successful", value: call.call_successful || "—", icon: Target },
            { label: "Cost", value: call.cost ? `$${Number(call.cost).toFixed(4)}` : "—", icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <PortalCard key={item.label} className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} className="text-brand-muted" />
                  <p className="text-xs text-brand-muted uppercase tracking-wider">{item.label}</p>
                </div>
                <p className="text-sm font-semibold text-brand-text">{item.value}</p>
              </PortalCard>
            );
          })}
        </div>

        {/* Summary */}
        {call.transcript_summary && (
          <PortalCard className="p-5">
            <h2 className="text-sm font-semibold text-brand-text mb-2 flex items-center gap-2">
              <Lightbulb size={16} className="text-amber-400" />
              Call Summary
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">{call.transcript_summary}</p>
          </PortalCard>
        )}

        {/* Transcript */}
        <PortalCard className="p-5">
          <h2 className="text-sm font-semibold text-brand-text mb-4 flex items-center gap-2">
            <MessageSquare size={16} className="text-brand-cyan" />
            Transcript ({transcript.length} messages)
          </h2>
          <div className="space-y-3">
            {transcript.length === 0 ? (
              <p className="text-sm text-brand-muted">No transcript available.</p>
            ) : (
              transcript.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    msg.role === "assistant" ? "" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      msg.role === "assistant"
                        ? "bg-brand-cyan/20 text-brand-cyan"
                        : "bg-violet-500/20 text-violet-400"
                    }`}
                  >
                    {msg.role === "assistant" ? "AI" : "U"}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-brand-dark border border-brand-border/50 text-brand-text"
                        : "bg-brand-cyan/10 text-brand-text"
                    }`}
                  >
                    {msg.content}
                    {msg.timestamp !== null && (
                      <span className="block text-xs text-brand-muted mt-1">
                        {formatDuration(msg.timestamp)}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </PortalCard>

        {/* Conversation ID */}
        <p className="text-xs text-brand-muted/50 font-mono">
          ElevenLabs ID: {call.elevenlabs_conversation_id}
        </p>
      </div>
    );
  }

  // ── Text Consultation ──
  const { data: consultation } = await supabase
    .from("consultations")
    .select("*, messages(*), proposals(*)")
    .eq("id", id)
    .single();

  if (!consultation) notFound();

  const c = consultation as unknown as Consultation;
  const messages = [...c.messages].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const extracted = c.extracted_data || {};
  const proposals = c.proposals || [];

  // Build sections from extracted_data
  const dataSection = (title: string, icon: React.ReactNode, data: Record<string, unknown> | undefined) => {
    if (!data) return null;
    const entries = Object.entries(data).filter(([, v]) => v !== null && v !== undefined && v !== "");
    if (entries.length === 0) return null;
    return (
      <PortalCard key={title} className="p-5">
        <h3 className="text-sm font-semibold text-brand-text mb-3 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {entries.map(([key, val]) => (
            <div key={key}>
              <p className="text-xs text-brand-muted capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </p>
              <p className="text-sm text-brand-text">{renderValue(val)}</p>
            </div>
          ))}
        </div>
      </PortalCard>
    );
  };

  const company = extracted.company as Record<string, unknown> | undefined;
  const qualification = extracted.qualification as Record<string, unknown> | undefined;
  const leadGen = extracted.leadGeneration as Record<string, unknown> | undefined;
  const digitalPresence = extracted.digitalPresence as Record<string, unknown> | undefined;
  const systemsOps = extracted.systemsOperations as Record<string, unknown> | undefined;
  const contentBrand = extracted.contentBrand as Record<string, unknown> | undefined;
  const aiTools = extracted.aiGrowthTools as Record<string, unknown> | undefined;
  const salesEnablement = extracted.salesEnablement as Record<string, unknown> | undefined;
  const closing = extracted.closing as Record<string, unknown> | undefined;
  const partnerships = extracted.partnerships as Record<string, unknown> | undefined;
  const businessAnalysis = extracted.businessAnalysis as Record<string, unknown> | undefined;
  const keyInsights = extracted.keyInsights as string[] | undefined;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/consultations"
        className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-cyan transition-colors"
      >
        <ArrowLeft size={16} />
        Back to consultations
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text flex items-center gap-3">
            <MessageSquare className="text-brand-cyan" size={24} />
            {(company?.contactName as string) || c.slug || "Anonymous Consultation"}
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            {formatDate(c.created_at)}
            {c.slug && <span className="ml-2 font-mono text-xs bg-white/5 px-2 py-0.5 rounded-full">{c.slug}</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={c.status} size="md" />
          <StatusBadge status={(extracted.currentStage as string) || "opening"} size="md" />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Messages (2 cols wide) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Messages */}
          <PortalCard className="p-5">
            <h2 className="text-sm font-semibold text-brand-text mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-brand-cyan" />
              Conversation ({messages.length} messages)
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {messages.length === 0 ? (
                <p className="text-sm text-brand-muted">No messages in this consultation.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.role === "assistant" ? "" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        msg.role === "assistant"
                          ? "bg-brand-cyan/20 text-brand-cyan"
                          : msg.role === "system"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-violet-500/20 text-violet-400"
                      }`}
                    >
                      {msg.role === "assistant" ? "AI" : msg.role === "system" ? "S" : "U"}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "assistant"
                          ? "bg-brand-dark border border-brand-border/50 text-brand-text"
                          : msg.role === "system"
                          ? "bg-amber-500/10 border border-amber-500/20 text-amber-200"
                          : "bg-brand-cyan/10 text-brand-text"
                      }`}
                    >
                      {msg.content}
                      <span className="block text-xs text-brand-muted/60 mt-1">
                        {new Date(msg.created_at).toLocaleTimeString("en-IE", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </PortalCard>

          {/* Proposals */}
          {proposals.length > 0 && (
            <PortalCard className="p-5">
              <h2 className="text-sm font-semibold text-brand-text mb-4 flex items-center gap-2">
                <FileText size={16} className="text-emerald-400" />
                Proposals ({proposals.length})
              </h2>
              <div className="space-y-3">
                {proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="p-4 rounded-xl border border-brand-border/30 bg-brand-darkest/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-brand-text">
                        Proposal — {formatDate(proposal.created_at)}
                      </p>
                      <StatusBadge
                        status={
                          proposal.status === "accepted"
                            ? "completed"
                            : proposal.status === "rejected"
                            ? "cancelled"
                            : proposal.status
                        }
                      />
                    </div>
                    {proposal.updated_at !== proposal.created_at && (
                      <p className="text-xs text-brand-muted">
                        Last updated: {formatDate(proposal.updated_at)}
                      </p>
                    )}
                    <details className="mt-2">
                      <summary className="text-xs text-brand-cyan cursor-pointer hover:text-brand-cyan-bright transition-colors">
                        View proposal data
                      </summary>
                      <pre className="mt-2 text-xs text-brand-muted bg-brand-darkest p-3 rounded-lg overflow-x-auto max-h-[300px] overflow-y-auto">
                        {JSON.stringify(proposal.content, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            </PortalCard>
          )}
        </div>

        {/* Right: Extracted Data sidebar */}
        <div className="space-y-4">
          {/* Key Insights */}
          {keyInsights && keyInsights.length > 0 && (
            <PortalCard className="p-5">
              <h3 className="text-sm font-semibold text-brand-text mb-3 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-400" />
                Key Insights
              </h3>
              <ul className="space-y-2">
                {keyInsights.map((insight, i) => (
                  <li key={i} className="text-sm text-brand-muted flex gap-2">
                    <span className="text-brand-cyan flex-shrink-0">-</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </PortalCard>
          )}

          {/* Qualification Score */}
          {qualification && (
            <PortalCard className="p-5">
              <h3 className="text-sm font-semibold text-brand-text mb-3 flex items-center gap-2">
                <Target size={16} className="text-brand-cyan" />
                Qualification
              </h3>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-brand-muted">Score</span>
                  <span className="text-sm font-bold text-brand-cyan">
                    {(qualification.qualificationScore as number) || 0}/6
                  </span>
                </div>
                <div className="w-full bg-brand-darkest rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-brand-cyan to-brand-teal h-2 rounded-full transition-all"
                    style={{ width: `${(((qualification.qualificationScore as number) || 0) / 6) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                {Object.entries(qualification)
                  .filter(([key]) => key !== "qualificationScore")
                  .map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-brand-muted capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className={`text-xs font-medium ${val ? "text-emerald-400" : "text-brand-muted/50"}`}>
                        {val ? "Yes" : "No"}
                      </span>
                    </div>
                  ))}
              </div>
            </PortalCard>
          )}

          {/* Extracted data sections */}
          {dataSection("Company", <Building2 size={16} className="text-brand-cyan" />, company)}
          {dataSection("Business Analysis", <Target size={16} className="text-violet-400" />, businessAnalysis)}
          {dataSection("Lead Generation", <User size={16} className="text-emerald-400" />, leadGen)}
          {dataSection("Digital Presence", <Target size={16} className="text-blue-400" />, digitalPresence)}
          {dataSection("Systems & Operations", <Building2 size={16} className="text-amber-400" />, systemsOps)}
          {dataSection("Content & Brand", <FileText size={16} className="text-pink-400" />, contentBrand)}
          {dataSection("AI & Growth Tools", <Lightbulb size={16} className="text-cyan-400" />, aiTools)}
          {dataSection("Sales Enablement", <Target size={16} className="text-orange-400" />, salesEnablement)}
          {dataSection("Partnerships", <User size={16} className="text-indigo-400" />, partnerships)}
          {dataSection("Closing", <FileText size={16} className="text-emerald-400" />, closing)}
        </div>
      </div>

      {/* Footer meta */}
      <p className="text-xs text-brand-muted/50 font-mono">
        Consultation ID: {c.id} · Session: {c.session_id}
      </p>
    </div>
  );
}
