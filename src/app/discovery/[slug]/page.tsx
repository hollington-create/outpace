import { notFound } from "next/navigation";
import DiscoveryChat from "@/components/DiscoveryChat";
import type { DiscoveryPageConfig } from "@/lib/types";

const PAGE_CONFIGS: Record<string, DiscoveryPageConfig> = {
  security: {
    slug: "security",
    heroTitle: "Growth strategy for security companies",
    heroSubtitle:
      "We've helped security firms scale through targeted outreach, AI-powered prospecting, and digital presence. Let's explore what we can do for you.",
    valueProps: [
      "Identify high-value commercial prospects",
      "AI outbound calling for security sales",
      "SEO for local security keywords",
      "CRM setup for long sales cycles",
    ],
    industry: "Security & Fire Safety",
  },
  construction: {
    slug: "construction",
    heroTitle: "Growth strategy for construction firms",
    heroSubtitle:
      "From project pipeline management to reaching the right decision-makers, we help construction companies win more contracts.",
    valueProps: [
      "Target facility managers and developers",
      "Multi-touch email campaigns",
      "Project showcase video production",
      "LinkedIn thought leadership",
    ],
    industry: "Construction & Building",
  },
  "professional-services": {
    slug: "professional-services",
    heroTitle: "Growth strategy for professional services",
    heroSubtitle:
      "Whether you're in accounting, legal, or consulting, we'll help you build a predictable pipeline of ideal clients.",
    valueProps: [
      "Target your ideal client profile",
      "Content marketing & thought leadership",
      "Referral system optimisation",
      "Digital presence overhaul",
    ],
    industry: "Professional Services",
  },
  hospitality: {
    slug: "hospitality",
    heroTitle: "Growth strategy for hospitality businesses",
    heroSubtitle:
      "Hotels, restaurants, and event venues — we help you fill rooms and tables through targeted digital marketing and outreach.",
    valueProps: [
      "Targeted corporate event outreach",
      "Google & social advertising",
      "Reputation management strategy",
      "Loyalty & retention programmes",
    ],
    industry: "Hospitality",
  },
  manufacturing: {
    slug: "manufacturing",
    heroTitle: "Growth strategy for manufacturers",
    heroSubtitle:
      "We help manufacturing companies reach procurement managers and grow their B2B pipeline with targeted outreach.",
    valueProps: [
      "Reach procurement decision-makers",
      "Trade show follow-up automation",
      "Technical content marketing",
      "Export market prospecting",
    ],
    industry: "Manufacturing",
  },
};

export async function generateStaticParams() {
  return Object.keys(PAGE_CONFIGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const config = PAGE_CONFIGS[params.slug];
  if (!config) return {};
  return {
    title: config.heroTitle,
    description: config.heroSubtitle,
  };
}

export default function PersonalisedDiscoveryPage({
  params,
}: {
  params: { slug: string };
}) {
  const config = PAGE_CONFIGS[params.slug];
  if (!config) notFound();

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* ── Hero ── */}
      <section className="pt-12 pb-10 px-6 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#0d1525] border border-slate-800 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-slate-400 text-xs font-medium tracking-wider uppercase">
              Outpace · {config.industry}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
            {config.heroTitle}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {config.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {config.valueProps.map((vp) => (
            <div
              key={vp}
              className="bg-[#0d1525] border border-slate-800/60 rounded-xl p-4 text-center"
            >
              <span className="text-cyan-400 text-lg mb-1 block">▸</span>
              <p className="text-slate-400 text-xs leading-relaxed">{vp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Chat Widget ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <DiscoveryChat slug={config.slug} />
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0d1525] border border-slate-800 rounded-xl p-8">
            <p className="text-cyan-400 font-semibold text-xs tracking-wider uppercase mb-3">
              Proven Results
            </p>
            <p className="text-white font-bold text-lg mb-2">
              Cube Printing Case Study
            </p>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              We helped Cube Printing identify the med-tech market as their ideal
              target, reached 900 decision-makers across 115 companies, and
              secured new business within months.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "115", label: "Target companies" },
                { value: "900", label: "Contacts reached" },
                { value: "✓", label: "New business won" },
              ].map((s) => (
                <div key={s.label} className="bg-slate-800/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-cyan-400">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
