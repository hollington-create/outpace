"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ArrowRight,
  Layers,
  Target,
  Users,
  LineChart,
  Shield,
  DollarSign,
  Cpu,
  Globe,
  Zap,
  Search,
  Compass,
  Rocket,
  TrendingUp,
  AlertTriangle,
  Unplug,
  UserX,
} from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Digital Infrastructure",
    desc: "Websites, landing pages, SEO, paid advertising, and social media — built as an integrated system, not siloed channels.",
  },
  {
    icon: Target,
    title: "Acquisition & Growth",
    desc: "B2B email sequences, AI-powered outbound calling, scraped prospect lists, and meeting booking that fills your pipeline.",
  },
  {
    icon: Users,
    title: "Client Relationships",
    desc: "CRM implementation, customer service consulting, and process efficiency to turn one-time buyers into long-term clients.",
  },
  {
    icon: LineChart,
    title: "Strategy & Advisory",
    desc: "Consultative business analysis, market research, USP documentation, and target market identification to sharpen your edge.",
  },
];

const usps = [
  {
    icon: Shield,
    title: "Full-Lifecycle Ownership",
    desc: "From first touchpoint to closed deal — we own the entire business development pipeline so nothing falls through the cracks.",
  },
  {
    icon: DollarSign,
    title: "Revenue-Tied Accountability",
    desc: "We measure success in revenue generated, not vanity metrics. Our incentives are aligned with your bottom line.",
  },
  {
    icon: Cpu,
    title: "Integrated Tech Stack",
    desc: "One unified system instead of five disconnected tools. CRM, outbound, analytics, and content working together seamlessly.",
  },
  {
    icon: Globe,
    title: "B2B + B2C Fluency",
    desc: "Whether you sell to businesses or consumers, we adapt our approach. Most agencies only know one side.",
  },
  {
    icon: Zap,
    title: "Strategy + Execution",
    desc: "We don't just write the playbook — we run it. Strategy without execution is a slideshow. We deliver both.",
  },
];

const process = [
  {
    step: "01",
    icon: Search,
    title: "Diagnose",
    desc: "We sit with your team, audit your current systems, document your strengths, and identify where revenue is leaking.",
  },
  {
    step: "02",
    icon: Compass,
    title: "Design",
    desc: "We build a bespoke growth plan — targeting the right markets, with the right message, through the right channels.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Deploy",
    desc: "We launch campaigns, build systems, produce content, and start generating pipeline — not in three months, but now.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Drive",
    desc: "We optimise, iterate, and scale what works. Monthly reviews, transparent reporting, and continuous improvement.",
  },
];

const stats = [
  { value: "900+", label: "Contacts Reached" },
  { value: "115", label: "Companies Targeted" },
  { value: "3", label: "Video Series Produced" },
  { value: "100%", label: "Client Retention" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-darkest" />
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-emerald/[0.08] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
          <AnimatedSection>
            <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-6">
              Full-Spectrum Business Development
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-bright to-brand-emerald">
                OUTPACE
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-8 text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
              We don&apos;t just market your business — we develop it. Strategy,
              lead generation, systems, content, and digital presence, all under
              one roof.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-lg transition-all duration-200 inline-flex items-center gap-2 text-lg shadow-lg shadow-brand-cyan/25"
              >
                Book a Discovery Call
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border border-brand-border hover:border-brand-muted text-brand-muted hover:text-white font-semibold rounded-lg transition-all duration-200 text-lg"
              >
                Explore Services
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-border rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-muted rounded-full" />
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-4">
                The Problem
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
                Growth shouldn&apos;t be this fragmented
              </h2>
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                Most mid-market businesses are juggling 5-8 vendors just to keep
                the lights on. The result? Leads fall through the cracks, tech is
                disconnected, and nobody owns the outcome.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Too Many Vendors",
                desc: "A web agency here, an SEO firm there, a CRM consultant somewhere else. No one sees the full picture.",
              },
              {
                icon: Unplug,
                title: "Disconnected Systems",
                desc: "Your website doesn't talk to your CRM. Your outbound doesn't feed your analytics. Data lives in silos.",
              },
              {
                icon: UserX,
                title: "No Ownership",
                desc: "When leads go cold, everyone points fingers. No single partner owns the pipeline from start to finish.",
              },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <div className="p-8 rounded-2xl bg-brand-dark/80 border border-brand-border/50 hover:border-brand-cyan/30 transition-colors">
                  <item.icon className="text-brand-cyan-bright mb-4" size={28} />
                  <h3 className="text-lg font-semibold text-brand-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-brand-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach — Service Pillars */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-4">
                Our Approach
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
                Four pillars of growth
              </h2>
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                Everything your business needs to acquire, convert, and retain
                customers — integrated into a single partnership.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl bg-brand-dark/50 border border-brand-border/50 hover:border-brand-cyan/40 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-6 group-hover:bg-brand-cyan/20 transition-colors">
                    <s.icon className="text-brand-cyan-bright" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-brand-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-4">
                What Sets Us Apart
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
                Not another agency
              </h2>
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                We&apos;re a strategic growth partner. Here&apos;s what makes the
                difference.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map((u, i) => (
              <AnimatedSection key={u.title} delay={i * 0.08}>
                <div className="p-8 rounded-2xl bg-brand-dark/80 border border-brand-border/50 hover:border-brand-cyan/30 transition-colors h-full">
                  <u.icon className="text-brand-cyan-bright mb-4" size={24} />
                  <h3 className="text-lg font-semibold text-brand-text">
                    {u.title}
                  </h3>
                  <p className="mt-2 text-brand-muted text-sm leading-relaxed">
                    {u.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-4">
                How We Work
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
                Diagnose. Design. Deploy. Drive.
              </h2>
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                A proven four-step framework that turns insight into revenue.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.1}>
                <div className="relative p-8 rounded-2xl bg-brand-dark/50 border border-brand-border/50 hover:border-brand-cyan/40 transition-all duration-300">
                  <span className="text-5xl font-extrabold text-brand-cyan/10 absolute top-4 right-6">
                    {p.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-6">
                    <p.icon className="text-brand-cyan-bright" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-brand-muted text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl sm:text-5xl font-extrabold text-brand-cyan-bright">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-brand-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
              Ready to outpace your competition?
            </h2>
            <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Book a free discovery call. We&apos;ll audit your current setup,
              identify the gaps, and show you exactly where the revenue is hiding.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-lg transition-all duration-200 inline-flex items-center gap-2 text-lg shadow-lg shadow-brand-cyan/25"
              >
                Book a Discovery Call
                <ArrowRight size={20} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
