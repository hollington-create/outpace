"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AccentHeading from "@/components/AccentHeading";
import ParticleField from "@/components/ParticleField";
import GlowOrb from "@/components/GlowOrb";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";
import LogoCloud from "@/components/LogoCloud";
import { HOMEPAGE_LOGOS } from "@/lib/brand-logos";
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
  X,
  Check,
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
  { value: 900, suffix: "+", label: "Contacts Reached" },
  { value: 115, suffix: "", label: "Companies Targeted" },
  { value: 3, suffix: "", label: "Video Series Produced" },
  { value: 100, suffix: "%", label: "Client Retention" },
];

const donts = [
  "Vanity metrics that look good but mean nothing",
  "Cookie-cutter strategies copied from a template",
  "Disconnected tools that don't talk to each other",
  "Month-long onboarding before anything happens",
];

const dos = [
  "Drive actual revenue you can measure",
  "Build custom playbooks for your business",
  "Integrate everything into one system",
  "Launch within weeks, not months",
];

export default function HomePage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-darkest" />
        <ParticleField />
        <GlowOrb color="rgba(34, 211, 238, 0.12)" size={600} top="-20%" left="-10%" duration={10} />
        <GlowOrb color="rgba(52, 211, 153, 0.08)" size={500} bottom="-20%" right="-10%" delay={2} duration={12} />
        <GlowOrb color="rgba(8, 145, 178, 0.1)" size={300} top="40%" right="20%" delay={4} duration={9} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-20">
          <AnimatedSection>
            <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-6">
              Full-Spectrum Business Development
            </p>
          </AnimatedSection>

          <AccentHeading
            as="h1"
            text="We don't just market your business. We **grow** it."
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold font-display tracking-tight leading-[1.1] text-brand-text"
            delay={0.1}
          />

          <AnimatedSection delay={0.3}>
            <p className="mt-8 text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Strategy, lead generation, systems, content, and digital presence — all under one roof.
              One partner. One pipeline. Real revenue.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="group px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 text-lg shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40 hover:scale-[1.02] btn-ripple"
                >
                  Book a Discovery Call
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/what-we-do"
                  className="px-8 py-4 border border-brand-border hover:border-brand-cyan/50 text-brand-muted hover:text-white font-semibold rounded-lg transition-all duration-300 text-lg hover:bg-white/5"
                >
                  Explore Services
                </Link>
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-border rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-muted rounded-full" />
          </div>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <Marquee />

      {/* ═══════ TRUST LOGOS ═══════ */}
      <section className="py-16 sm:py-20 bg-brand-darkest">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <LogoCloud
            logos={HOMEPAGE_LOGOS}
            title="Integrated with the tools you rely on"
            size={30}
          />
        </div>
      </section>

      {/* ═══════ THE PROBLEM ═══════ */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-4">
                The Problem
              </p>
              <AccentHeading
                text="Growth shouldn't be this **fragmented.**"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                Most mid-market businesses are juggling 5-8 vendors just to keep
                the lights on. The result? Leads fall through the cracks, tech is
                disconnected, and nobody owns the outcome.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ DO / DON'T ═══════ */}
      <section className="py-20 sm:py-28 bg-brand-darkest">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* DON'T column */}
            <AnimatedSection>
              <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.03]">
                <h3 className="text-xl font-bold font-display text-red-400 mb-6 flex items-center gap-2">
                  <X size={24} className="shrink-0" />
                  We don&apos;t do
                </h3>
                <ul className="space-y-4">
                  {donts.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X size={16} className="text-red-400/60 mt-1 shrink-0" />
                      <span className="text-brand-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* DO column */}
            <AnimatedSection delay={0.15}>
              <div className="p-8 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/[0.03]">
                <h3 className="text-xl font-bold font-display text-brand-cyan-bright mb-6 flex items-center gap-2">
                  <Check size={24} className="shrink-0" />
                  We do
                </h3>
                <ul className="space-y-4">
                  {dos.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} className="text-brand-cyan-bright/60 mt-1 shrink-0" />
                      <span className="text-brand-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════ GRADIENT DIVIDER ═══════ */}
      <div className="gradient-divider" />

      {/* ═══════ OUR APPROACH — SERVICE PILLARS ═══════ */}
      <section className="relative py-24 sm:py-32 bg-brand-darkest overflow-hidden">
        <GlowOrb color="rgba(34, 211, 238, 0.06)" size={400} top="20%" left="-10%" delay={1} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-4">
                Our Approach
              </p>
              <AccentHeading
                text="Four pillars of **growth.**"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                Everything your business needs to acquire, convert, and retain
                customers — integrated into a single partnership.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <TiltCard className="relative h-full">
                  <div className="group p-8 rounded-2xl glass glass-hover card-shine h-full">
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-6 group-hover:bg-brand-cyan/20 group-hover:scale-110 transition-all duration-300">
                      <s.icon className="text-brand-cyan-bright" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-text">
                      {s.title}<span className="text-brand-cyan-bright">.</span>
                    </h3>
                    <p className="mt-3 text-brand-muted leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="mt-12 text-center">
              <Link
                href="/what-we-do"
                className="text-brand-cyan-bright font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all group"
              >
                See all 24+ services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ WHAT SETS US APART ═══════ */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-4">
                What Sets Us Apart
              </p>
              <AccentHeading
                text="Not another **agency.**"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                We&apos;re a strategic growth partner. Here&apos;s what makes the
                difference.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map((u, i) => (
              <AnimatedSection key={u.title} delay={i * 0.08}>
                <TiltCard className="relative h-full">
                  <div className="p-8 rounded-2xl glass glass-hover card-shine h-full">
                    <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-4">
                      <u.icon className="text-brand-cyan-bright" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-text">
                      {u.title}<span className="text-brand-cyan-bright">.</span>
                    </h3>
                    <p className="mt-2 text-brand-muted text-sm leading-relaxed">
                      {u.desc}
                    </p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW WE WORK ═══════ */}
      <section className="relative py-24 sm:py-32 bg-brand-darkest overflow-hidden">
        <GlowOrb color="rgba(52, 211, 153, 0.06)" size={400} bottom="10%" right="-10%" delay={2} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase mb-4">
                How We Work
              </p>
              <AccentHeading
                text="Diagnose. Design. Deploy. **Drive.**"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                A proven four-step framework that turns insight into revenue.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.1}>
                <TiltCard className="relative h-full">
                  <div className="relative p-8 rounded-2xl glass glass-hover card-shine h-full group">
                    <span className="text-5xl font-extrabold text-brand-cyan/10 absolute top-4 right-6 group-hover:text-brand-cyan/20 transition-colors duration-300">
                      {p.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-6 group-hover:bg-brand-cyan/20 group-hover:scale-110 transition-all duration-300">
                      <p.icon className="text-brand-cyan-bright" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-text">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-brand-muted text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5}>
            <div className="mt-12 text-center">
              <Link
                href="/how-we-do-it"
                className="text-brand-cyan-bright font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all group"
              >
                See our full process
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center group">
                  <p className="text-4xl sm:text-5xl font-extrabold font-display text-brand-cyan-bright">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-brand-muted group-hover:text-brand-text transition-colors">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ GRADIENT DIVIDER ═══════ */}
      <div className="gradient-divider" />

      {/* ═══════ BOTTOM CTA ═══════ */}
      <section className="relative py-24 sm:py-32 bg-brand-darkest overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[200px] animate-pulse-glow" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <AccentHeading
              text="Ready to **outpace** your competition?"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
            />
            <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Book a free discovery call. We&apos;ll audit your current setup,
              identify the gaps, and show you exactly where the revenue is hiding.
            </p>
            <div className="mt-10">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="group px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 text-lg shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40 hover:scale-[1.02] btn-ripple"
                >
                  Book a Discovery Call
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
