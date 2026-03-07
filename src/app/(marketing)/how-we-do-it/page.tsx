"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Search,
  Compass,
  Rocket,
  TrendingUp,
  FileText,
  Target,
  BarChart3,
  Users,
  Mail,
  Globe,
  Settings,
  Video,
  Zap,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import GlowOrb from "@/components/GlowOrb";
import AccentHeading from "@/components/AccentHeading";
import AnimatedSection from "@/components/AnimatedSection";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import LogoCloud from "@/components/LogoCloud";
import { DEPLOY_LOGOS } from "@/lib/brand-logos";

const steps = [
  {
    number: "01",
    title: "Diagnose",
    subtitle: "Understand before we act",
    icon: Search,
    gradient: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.12)",
    desc: "Every engagement starts the same way — we listen. Before we touch a single campaign, we audit your business, your sales process, your retention metrics, and where the real opportunities are hiding.",
    bullets: [
      { icon: FileText, text: "Full business audit — what makes you different, documented" },
      { icon: Target, text: "Target market identification & competitive mapping" },
      { icon: BarChart3, text: "Revenue leak analysis — where are you losing deals?" },
      { icon: Users, text: "Stakeholder interviews & team capability assessment" },
    ],
    outcome: "You get a clear picture of where you are, where you could be, and what's standing in the way.",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Build the playbook",
    icon: Compass,
    gradient: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52, 211, 153, 0.12)",
    desc: "Armed with real data about your business, we design a bespoke growth plan — covering GTM strategy, brand positioning, sales enablement, and campaign architecture. Not a generic template, but a custom playbook built around your strengths.",
    bullets: [
      { icon: FileText, text: "Custom growth strategy document with clear priorities" },
      { icon: Target, text: "Channel selection — where to invest time and budget" },
      { icon: Mail, text: "Content calendar & campaign architecture" },
      { icon: Settings, text: "Tech stack recommendations & integration plan" },
    ],
    outcome: "You get a detailed roadmap with timelines, KPIs, and clear accountability for every deliverable.",
  },
  {
    number: "03",
    title: "Deploy",
    subtitle: "Execute with speed",
    icon: Rocket,
    gradient: "from-violet-400 to-purple-500",
    glowColor: "rgba(167, 139, 250, 0.12)",
    desc: "This is where most agencies stop at strategy. We don't. We build the systems, launch the campaigns, produce the content, and start generating pipeline — not in three months, but now.",
    bullets: [
      { icon: Globe, text: "Website development & landing page builds" },
      { icon: Mail, text: "Outbound email sequences & AI calling activation" },
      { icon: Video, text: "Content production — video, copy, social media" },
      { icon: Settings, text: "CRM implementation & automation setup" },
    ],
    outcome: "Within weeks, not months, your growth engine is live and generating real pipeline.",
  },
  {
    number: "04",
    title: "Drive",
    subtitle: "Optimise and scale",
    icon: TrendingUp,
    gradient: "from-amber-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.12)",
    desc: "Launch is just the beginning. We monitor every metric, test every assumption, and continuously improve. Monthly reviews keep us aligned, and transparent reporting means you always know the score.",
    bullets: [
      { icon: BarChart3, text: "Monthly performance reviews with actionable insights" },
      { icon: RotateCcw, text: "A/B testing & continuous campaign optimisation" },
      { icon: Zap, text: "Scale what works — double down on winning channels" },
      { icon: CheckCircle2, text: "Transparent dashboards & real-time reporting" },
    ],
    outcome: "Your growth compounds month over month. What works gets scaled. What doesn't gets cut.",
  },
];

const deliverables = [
  "Business Audit Report",
  "Growth Strategy Document",
  "Brand Positioning Document",
  "Campaign Architecture",
  "Website & Landing Pages",
  "Email Sequences",
  "CRM Setup",
  "Sales Playbook & Training",
  "Video Content",
  "Social Media Management",
  "AI Calling System",
  "Client Retention Strategy",
  "Referral Programme Design",
  "Monthly Performance Reports",
  "KPI Dashboard",
  "Continuous Optimisation",
];

/* ───── Step Section ───── */

function StepSection({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      {/* Huge watermark number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className={`text-[14rem] sm:text-[20rem] font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-[0.03]`}>
          {step.number}
        </span>
      </div>

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at ${isEven ? "30%" : "70%"} 50%, ${step.glowColor}, transparent)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={!isEven ? "lg:order-2" : ""}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, type: "spring" }}
                className={`inline-block text-6xl sm:text-7xl font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-30`}
              >
                {step.number}
              </motion.span>
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white">
                  {step.title}<span className="text-brand-cyan-bright">.</span>
                </h2>
                <p className={`font-semibold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                  {step.subtitle}
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-lg">
              {step.desc}
            </p>

            {/* Outcome callout */}
            <div className="mt-8 p-4 rounded-xl border border-brand-cyan/20 bg-brand-cyan/5">
              <p className="text-sm font-semibold text-brand-cyan-bright mb-1">The Outcome</p>
              <p className="text-sm text-slate-300 leading-relaxed">{step.outcome}</p>
            </div>
          </motion.div>

          {/* Bullets side */}
          <div className={`space-y-4 ${!isEven ? "lg:order-1" : ""}`}>
            {step.bullets.map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="group flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.gradient} bg-opacity-10 flex-shrink-0 flex items-center justify-center`}
                  style={{ background: `linear-gradient(135deg, ${step.glowColor}, transparent)` }}>
                  <bullet.icon className="text-white" size={20} />
                </div>
                <p className="text-slate-300 font-medium pt-1.5 group-hover:text-white transition-colors">
                  {bullet.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Page ───── */

export default function HowWeDoItPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-brand-darkest overflow-hidden">
        <GlowOrb color="rgba(34, 211, 238, 0.1)" size={600} top="-20%" left="-10%" duration={10} />
        <GlowOrb color="rgba(52, 211, 153, 0.06)" size={400} bottom="-10%" right="-5%" delay={2} duration={12} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              How We Do It
            </p>
          </AnimatedSection>
          <AccentHeading
            as="h1"
            text="From **stuck** to **scaling.** In four steps."
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-display text-brand-text max-w-4xl leading-tight"
            delay={0.1}
          />
          <AnimatedSection delay={0.3}>
            <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl leading-relaxed">
              Our proven framework turns insight into revenue. Every engagement
              follows the same battle-tested process — Diagnose, Design, Deploy, Drive.
            </p>
          </AnimatedSection>

          {/* 4D Visual */}
          <AnimatedSection delay={0.5}>
            <div className="mt-12 flex items-center gap-4 sm:gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-4 sm:gap-6"
                >
                  <div className="text-center">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${s.gradient} bg-opacity-10 flex items-center justify-center`}
                      style={{ background: `linear-gradient(135deg, ${s.glowColor}, rgba(15,23,42,0.8))` }}>
                      <s.icon className="text-white" size={24} />
                    </div>
                    <p className="mt-2 text-xs sm:text-sm font-semibold text-brand-muted">{s.title}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-brand-cyan/40 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Gradient Divider ── */}
      <div className="gradient-divider" />

      {/* ── Step Sections ── */}
      {steps.map((step, idx) => (
        <StepSection key={step.number} step={step} index={idx} />
      ))}

      {/* ── What You Get ── */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                What You Get
              </p>
              <AccentHeading
                text="Everything delivered. **Nothing** outsourced."
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {deliverables.map((item, i) => (
              <AnimatedSection key={item} delay={i * 0.05}>
                <TiltCard className="h-full">
                  <div className="h-full p-5 rounded-xl glass glass-hover flex items-center gap-3">
                    <CheckCircle2 className="text-brand-cyan-bright shrink-0" size={18} />
                    <span className="text-sm font-medium text-brand-text">{item}</span>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Powered By logos */}
          <div className="mt-16">
            <LogoCloud
              logos={DEPLOY_LOGOS}
              title="Powered by industry-leading platforms"
              size={26}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 sm:py-32 bg-brand-darkest overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[200px] animate-pulse-glow" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <AccentHeading
              text="Ready to start with **Step 1?**"
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
                  className="group px-10 py-5 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-bold rounded-xl shadow-xl shadow-brand-cyan/30 transition-all duration-300 inline-flex items-center gap-3 text-xl btn-ripple"
                >
                  Book a Discovery Call
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
