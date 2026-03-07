import DiscoveryChat from "@/components/DiscoveryChat";

export const metadata = {
  title: "Free Growth Consultation",
  description:
    "Get a free AI-powered growth consultation. We'll identify your biggest growth opportunities in 10 minutes.",
};

export default function DiscoveryPage() {
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
              Outpace · Growth Consultation
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
            Let&apos;s find your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              biggest growth opportunity
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-4">
            Our AI consultant will ask you a few questions about your business
            and identify specific opportunities to accelerate your growth.
            Takes about 10 minutes.
          </p>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "🎯", label: "Identifies your specific growth gaps" },
            { icon: "⚡", label: "Instant AI-powered analysis" },
            { icon: "📊", label: "Tailored recommendations" },
            { icon: "🤝", label: "No obligation, completely free" },
          ].map((vp) => (
            <div
              key={vp.label}
              className="bg-[#0d1525] border border-slate-800/60 rounded-xl p-4 text-center"
            >
              <span className="text-2xl mb-2 block">{vp.icon}</span>
              <p className="text-slate-400 text-xs leading-relaxed">{vp.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Chat Widget ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <DiscoveryChat />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-500 text-xs tracking-wider uppercase font-medium text-center mb-8">
            How it works
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "AI Discovery", desc: "Chat with our AI consultant for 10 minutes about your business challenges" },
              { step: "02", title: "Tailored Proposal", desc: "We analyse your responses and build a custom growth strategy within 24 hours" },
              { step: "03", title: "Strategy Call", desc: "Walk through the proposal with our team — no obligation, just insight" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
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
