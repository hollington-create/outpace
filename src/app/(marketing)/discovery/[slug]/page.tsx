import { notFound } from "next/navigation";
import Image from "next/image";
import DiscoveryChat from "@/components/DiscoveryChat";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollChevron from "@/components/ScrollChevron";
import { PAGE_CONFIGS } from "@/lib/discovery-configs";

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
    robots: { index: false, follow: false },
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
      <ScrollToTop />
      {/* ── Full-width hero image ── */}
      {config.heroImage && (
        <div className="relative w-full h-56 md:h-72 lg:h-96 overflow-hidden group -mb-16">
          <Image
            src={config.heroImage}
            alt={config.companyName || "Company"}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
            priority
          />
          {/* Smooth bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-[70%]"
            style={{ background: "linear-gradient(to top, #0a0f1a 0%, #0a0f1a 8%, transparent 100%)" }}
          />
          {/* Subtle side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/30 via-transparent to-[#0a0f1a]/30" />
        </div>
      )}

      {/* ── Hero ── */}
      <section className="pt-6 pb-2 px-6 relative overflow-hidden" tabIndex={-1}>
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Pill + Company card row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0d1525] border border-slate-800 rounded-full px-4 py-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400 text-xs font-medium tracking-wider uppercase">
                  {config.contactName
                    ? `Prepared for ${config.contactName}`
                    : `Outpace · ${config.industry}`}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1]">
                {config.heroTitle}
              </h1>
            </div>

            {/* Company logo */}
            {config.companyLogo && (
              <div className="flex-shrink-0 bg-white rounded-lg p-3">
                <Image
                  src={config.companyLogo}
                  alt={config.companyName || "Company logo"}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
            )}
          </div>

          <p className="text-base text-slate-400 max-w-2xl mb-4">
            {config.heroSubtitle}
          </p>

          {/* Website link */}
          {config.website && (
            <a
              href={`https://${config.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-400/70 hover:text-cyan-300 text-xs font-medium transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              {config.website}
            </a>
          )}
        </div>
      </section>

      {/* ── Scroll hint ── */}
      <ScrollChevron />

      {/* ── How It Works ── */}
      <section className="px-6 pt-4 pb-2">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-400 text-base md:text-lg text-center mb-8 animate-fade-up-in">
            A free, confidential growth consultation for{" "}
            <span className="text-white font-medium">{config.companyName}</span>{" "}
            — voice or text, takes around 10 minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px bg-gradient-to-r from-cyan-500/20 via-cyan-500/40 to-cyan-500/20" />

            {[
              {
                step: "1",
                title: "Have a conversation",
                desc: "Tell us about your business, goals, and challenges",
              },
              {
                step: "2",
                title: "We identify opportunities",
                desc: "Our AI uncovers growth levers specific to your market",
              },
              {
                step: "3",
                title: "Get your strategy",
                desc: "Receive a tailored proposal with clear next steps",
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`flex flex-col items-center text-center relative z-10 animate-fade-up-in stagger-${item.step}`}
              >
                <div className={`w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 step-pulse-${item.step}`}>
                  <span className="text-cyan-400 text-sm font-bold">{item.step}</span>
                </div>
                <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Start here indicator ── */}
      <div className="flex flex-col items-center pt-6 pb-2 animate-fade-up-in stagger-3">
        <span className="text-cyan-400/50 text-[10px] font-medium uppercase tracking-[0.2em] mb-1">
          Start here
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-cyan-400/40 animate-bounce-down">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ── Chat Widget ── */}
      <section className="px-6 pt-2 pb-12">
        <div className="max-w-3xl mx-auto">
          <DiscoveryChat slug={config.slug} />
        </div>
      </section>

      {/* ── What You'll Receive ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "📋",
                title: "Tailored proposal",
                desc: "A growth strategy specific to your business, not a generic template",
              },
              {
                icon: "⏱",
                title: "Within 24 hours",
                desc: "Our team reviews the consultation and delivers your proposal fast",
              },
              {
                icon: "🎯",
                title: "Clear next steps",
                desc: "Actionable opportunities ranked by impact and effort",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#0d1525]/60 border border-slate-800/40 rounded-xl p-5 text-center"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <p className="text-white font-semibold text-sm mb-1">
                  {item.title}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
