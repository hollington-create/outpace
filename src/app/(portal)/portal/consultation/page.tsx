import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import PortalCard from "@/components/portal/PortalCard";
import type { ExtractedConsultationData, PainBranch } from "@/lib/types";
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";

/* ---------- Helpers ---------- */

const PAIN_BRANCH_LABELS: Record<PainBranch, string> = {
  business_analysis: "Business Analysis",
  lead_generation: "Lead Generation",
  digital_presence: "Digital Presence",
  systems_operations: "Systems & Operations",
  content_brand: "Content & Brand",
  ai_growth_tools: "AI & Growth Tools",
  sales_enablement: "Sales Enablement",
  client_retention: "Client Retention",
  brand_positioning: "Brand Positioning",
  partnerships: "Partnerships",
};

function QualSignal({
  label,
  value,
}: {
  label: string;
  value: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {value ? (
        <CheckCircle size={16} className="text-brand-emerald flex-shrink-0" />
      ) : (
        <XCircle size={16} className="text-brand-muted/50 flex-shrink-0" />
      )}
      <span
        className={`text-sm ${value ? "text-brand-text" : "text-brand-muted"}`}
      >
        {label}
      </span>
    </div>
  );
}

/* ---------- Page ---------- */

export default async function ConsultationPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: clientUser } = await supabase
    .from("client_users")
    .select("client_id")
    .eq("user_id", user.id)
    .single();

  if (!clientUser) redirect("/login");

  // Get the client's consultation_id
  const { data: client } = await supabase
    .from("clients")
    .select("consultation_id")
    .eq("id", clientUser.client_id)
    .single();

  let consultationData: ExtractedConsultationData | null = null;

  if (client?.consultation_id) {
    const { data: consultation } = await supabase
      .from("consultations")
      .select("extracted_data")
      .eq("id", client.consultation_id)
      .single();

    if (consultation?.extracted_data) {
      consultationData =
        consultation.extracted_data as unknown as ExtractedConsultationData;
    }
  }

  /* ── No consultation data ── */
  if (!consultationData) {
    return (
      <div className="space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
          Consultation Summary
        </h1>
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-brand-cyan" />
          </div>
          <p className="text-brand-muted max-w-md">
            No consultation data available. Your consultation summary will
            appear here after your discovery session is complete.
          </p>
        </div>
      </div>
    );
  }

  const { company, primaryPainBranch, secondaryPainBranches, keyInsights, qualification } =
    consultationData;

  return (
    <div className="space-y-8">
      <AnimatedSection>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
          Consultation Summary
        </h1>
        <p className="text-brand-muted mt-1">
          Key findings from your discovery consultation.
        </p>
      </AnimatedSection>

      {/* ── Company Info ── */}
      <AnimatedSection delay={0.1}>
        <PortalCard className="p-6">
          <h2 className="text-lg font-semibold text-brand-text mb-4">
            Company Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {company.name && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-darkest flex items-center justify-center text-brand-cyan">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted">Company</p>
                  <p className="text-sm text-brand-text font-medium">
                    {company.name}
                  </p>
                </div>
              </div>
            )}

            {company.industry && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-darkest flex items-center justify-center text-violet-400">
                  <Target size={18} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted">Industry</p>
                  <p className="text-sm text-brand-text font-medium">
                    {company.industry}
                  </p>
                </div>
              </div>
            )}

            {company.location && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-darkest flex items-center justify-center text-amber-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted">Location</p>
                  <p className="text-sm text-brand-text font-medium">
                    {company.location}
                  </p>
                </div>
              </div>
            )}

            {company.website && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-darkest flex items-center justify-center text-brand-emerald">
                  <Globe size={18} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted">Website</p>
                  <a
                    href={
                      company.website.startsWith("http")
                        ? company.website
                        : `https://${company.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-cyan hover:text-brand-cyan-bright transition-colors"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            )}

            {company.employeeCount && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-darkest flex items-center justify-center text-rose-400">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-xs text-brand-muted">Employees</p>
                  <p className="text-sm text-brand-text font-medium">
                    {company.employeeCount}
                  </p>
                </div>
              </div>
            )}
          </div>
        </PortalCard>
      </AnimatedSection>

      {/* ── Primary Focus ── */}
      {primaryPainBranch && (
        <AnimatedSection delay={0.2}>
          <PortalCard className="p-6">
            <h2 className="text-lg font-semibold text-brand-text mb-4">
              Primary Focus Area
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20">
              <Target size={18} className="text-brand-cyan" />
              <span className="text-sm font-semibold text-brand-cyan">
                {PAIN_BRANCH_LABELS[primaryPainBranch] || primaryPainBranch}
              </span>
            </div>
          </PortalCard>
        </AnimatedSection>
      )}

      {/* ── Secondary Areas ── */}
      {secondaryPainBranches && secondaryPainBranches.length > 0 && (
        <AnimatedSection delay={0.25}>
          <PortalCard className="p-6">
            <h2 className="text-lg font-semibold text-brand-text mb-4">
              Secondary Focus Areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {secondaryPainBranches.map((branch) => (
                <span
                  key={branch}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-brand-darkest text-sm text-brand-text border border-brand-border/50"
                >
                  {PAIN_BRANCH_LABELS[branch] || branch}
                </span>
              ))}
            </div>
          </PortalCard>
        </AnimatedSection>
      )}

      {/* ── Key Insights ── */}
      {keyInsights && keyInsights.length > 0 && (
        <AnimatedSection delay={0.3}>
          <PortalCard className="p-6">
            <h2 className="text-lg font-semibold text-brand-text mb-4">
              Key Insights
            </h2>
            <ul className="space-y-3">
              {keyInsights.map((insight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Lightbulb
                    size={16}
                    className="text-amber-400 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-brand-text leading-relaxed">
                    {insight}
                  </span>
                </li>
              ))}
            </ul>
          </PortalCard>
        </AnimatedSection>
      )}

      {/* ── Qualification Signals ── */}
      {qualification && (
        <AnimatedSection delay={0.35}>
          <PortalCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-brand-text">
                Qualification
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-muted">Score</span>
                <span
                  className={`text-lg font-bold ${
                    qualification.qualificationScore >= 4
                      ? "text-brand-emerald"
                      : qualification.qualificationScore >= 2
                        ? "text-amber-400"
                        : "text-brand-muted"
                  }`}
                >
                  {qualification.qualificationScore}/6
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <QualSignal
                label="Budget Indicated"
                value={qualification.budgetIndicated}
              />
              <QualSignal
                label="Timeline Urgent"
                value={qualification.timelineUrgent}
              />
              <QualSignal
                label="Decision Maker"
                value={qualification.decisionMaker}
              />
              <QualSignal
                label="Pain Clearly Articulated"
                value={qualification.painClearlyArticulated}
              />
              <QualSignal
                label="Previous Agency Experience"
                value={qualification.previousAgencyExperience}
              />
              <QualSignal
                label="Ready to Start"
                value={qualification.readyToStart}
              />
            </div>
          </PortalCard>
        </AnimatedSection>
      )}
    </div>
  );
}
