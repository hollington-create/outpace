import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import PortalCard from "@/components/portal/PortalCard";
import StatusBadge from "@/components/portal/StatusBadge";
import {
  MessageSquare,
  Phone,
  Clock,
  User,
  Building2,
  Search,
} from "lucide-react";

/* ---------- Types ---------- */

interface Consultation {
  id: string;
  slug: string | null;
  status: string;
  extracted_data: {
    company?: { name?: string | null; contactName?: string | null; industry?: string | null };
    currentStage?: string | null;
    qualification?: { qualificationScore?: number };
    keyInsights?: string[];
  };
  created_at: string;
  updated_at: string;
  messages: { id: string }[];
  proposals: { id: string; status: string }[];
}

interface VoiceConversation {
  id: string;
  elevenlabs_conversation_id: string;
  agent_id: string | null;
  status: string | null;
  transcript_summary: string | null;
  call_duration_secs: number | null;
  call_successful: string | null;
  created_at: string;
}

/* ---------- Helpers ---------- */

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IE", {
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

/* ---------- Page ---------- */

export default async function ConsultationsListPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const activeTab = params.tab || "text";

  // Fetch text consultations
  const { data: consultations } = await supabase
    .from("consultations")
    .select("*, messages(id), proposals(id, status)")
    .order("created_at", { ascending: false });

  // Fetch voice conversations
  const { data: voiceCalls } = await supabase
    .from("voice_conversations")
    .select("id, elevenlabs_conversation_id, agent_id, status, transcript_summary, call_duration_secs, call_successful, created_at")
    .order("created_at", { ascending: false });

  const allConsultations = (consultations || []) as unknown as Consultation[];
  const allVoiceCalls = (voiceCalls || []) as unknown as VoiceConversation[];

  // Stats
  const totalText = allConsultations.length;
  const totalVoice = allVoiceCalls.length;
  const withMessages = allConsultations.filter((c) => c.messages.length > 1).length;
  const withProposals = allConsultations.filter((c) => c.proposals.length > 0).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
          Consultations
        </h1>
        <p className="text-brand-muted mt-1">
          AI consultation conversations and voice call transcripts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Text Chats", value: totalText, icon: MessageSquare, color: "text-brand-cyan", bg: "bg-brand-cyan/10" },
          { label: "Voice Calls", value: totalVoice, icon: Phone, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "With Replies", value: withMessages, icon: User, color: "text-violet-400", bg: "bg-violet-500/10" },
          { label: "Proposals Sent", value: withProposals, icon: Search, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <PortalCard key={stat.label} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-brand-text">{stat.value}</p>
                </div>
              </div>
            </PortalCard>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-brand-border/50 pb-0">
        {[
          { key: "text", label: "Text Consultations", count: totalText },
          { key: "voice", label: "Voice Calls", count: totalVoice },
        ].map((tab) => (
          <Link
            key={tab.key}
            href={`/admin/consultations?tab=${tab.key}`}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.key
                ? "text-brand-cyan-bright bg-brand-cyan/10 border-b-2 border-brand-cyan"
                : "text-brand-muted hover:text-brand-text hover:bg-white/5"
            }`}
          >
            {tab.label}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.key ? "bg-brand-cyan/20 text-brand-cyan" : "bg-white/10 text-brand-muted"
            }`}>
              {tab.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Text Consultations Tab */}
      {activeTab === "text" && (
        <div className="space-y-2">
          {allConsultations.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-brand-cyan" />
              </div>
              <h2 className="text-lg font-semibold text-brand-text mb-1">No consultations yet</h2>
              <p className="text-brand-muted text-sm">Consultation conversations will appear here.</p>
            </div>
          ) : (
            allConsultations.map((consultation) => {
              const contactName = consultation.extracted_data?.company?.contactName;
              const companyName = consultation.extracted_data?.company?.name;
              const stage = consultation.extracted_data?.currentStage || "opening";
              const score = consultation.extracted_data?.qualification?.qualificationScore || 0;
              const msgCount = consultation.messages.length;
              const hasProposal = consultation.proposals.length > 0;
              const proposalStatus = hasProposal ? consultation.proposals[0].status : null;

              return (
                <PortalCard
                  key={consultation.id}
                  href={`/admin/consultations/${consultation.id}`}
                  className="p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Left: Icon + Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan flex-shrink-0">
                        <MessageSquare size={20} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-brand-text truncate">
                          {contactName || consultation.slug || "Anonymous"}
                          {companyName && (
                            <span className="font-normal text-brand-muted ml-1">
                              — {companyName}
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-brand-muted">
                          {formatDate(consultation.created_at)} · {msgCount} message{msgCount !== 1 ? "s" : ""}
                          {score > 0 && (
                            <span className="ml-2 text-brand-cyan">Score: {score}/6</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Right: Badges */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {consultation.slug && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-brand-muted font-mono">
                          {consultation.slug}
                        </span>
                      )}
                      <StatusBadge status={stage} />
                      {hasProposal && (
                        <StatusBadge status={proposalStatus === "accepted" ? "completed" : proposalStatus || "pending"} />
                      )}
                    </div>
                  </div>
                </PortalCard>
              );
            })
          )}
        </div>
      )}

      {/* Voice Calls Tab */}
      {activeTab === "voice" && (
        <div className="space-y-2">
          {allVoiceCalls.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-lg font-semibold text-brand-text mb-1">No voice calls yet</h2>
              <p className="text-brand-muted text-sm">ElevenLabs voice transcripts will appear here.</p>
            </div>
          ) : (
            allVoiceCalls.map((call) => (
              <PortalCard
                key={call.id}
                href={`/admin/consultations/${call.id}?type=voice`}
                className="p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-brand-text truncate">
                        Voice Call
                        {call.transcript_summary && (
                          <span className="font-normal text-brand-muted ml-1 text-xs">
                            — {call.transcript_summary.slice(0, 80)}...
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-brand-muted flex items-center gap-3">
                        <span>{formatDate(call.created_at)}</span>
                        {call.call_duration_secs && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {formatDuration(call.call_duration_secs)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {call.call_successful && (
                      <StatusBadge
                        status={call.call_successful === "true" ? "completed" : "cancelled"}
                      />
                    )}
                    <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-brand-muted font-mono">
                      {call.elevenlabs_conversation_id.slice(0, 12)}...
                    </span>
                  </div>
                </div>
              </PortalCard>
            ))
          )}
        </div>
      )}
    </div>
  );
}
