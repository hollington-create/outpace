"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  Users,
  CalendarCheck,
  Target,
  BarChart3,
  TrendingUp,
  Globe,
  FileCode,
  Megaphone,
  Share2,
  FileText,
  MousePointerClick,
  Mic,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Workflow,
  Trophy,
  CheckCircle2,
  Search,
  Compass,
  Rocket,
  X as XIcon,
  BadgeEuro,
  Settings,
  HeadphonesIcon,
  Video,
  Camera,
  UserPlus,
  Heart,
  ThumbsUp,
  ArrowUpRight,
  RefreshCw,
  Crosshair,
  Map,
  Tag,
  Handshake,
  Network,
  Gift,
  Briefcase,
  BrainCircuit,
  Bot,
  ClipboardCheck,
  Lightbulb,
  Pencil,
  Presentation,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import GlowOrb from "@/components/GlowOrb";
import AccentHeading from "@/components/AccentHeading";
import AnimatedSection from "@/components/AnimatedSection";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import LogoCloud from "@/components/LogoCloud";
import FaqAccordion from "@/components/FaqAccordion";
import ParticleField from "@/components/ParticleField";
import {
  OUTBOUND_LOGOS,
  DIGITAL_LOGOS,
  AI_LOGOS,
  SYSTEMS_LOGOS,
} from "@/lib/brand-logos";
import type { ServicePageConfig, ServiceFeature } from "@/lib/service-page-configs";

/* ───── Icon resolver ───── */
const ICON_MAP: Record<string, React.ElementType> = {
  Mail,
  Phone,
  Users,
  CalendarCheck,
  Target,
  BarChart3,
  TrendingUp,
  Globe,
  FileCode,
  Megaphone,
  Share2,
  FileText,
  MousePointerClick,
  Mic,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Workflow,
  Trophy,
  Linkedin: FaLinkedinIn as unknown as React.ElementType,
  // New icons for remaining 6 pillars
  BadgeEuro,
  Settings,
  HeadphonesIcon,
  Video,
  Camera,
  UserPlus,
  Heart,
  ThumbsUp,
  ArrowUpRight,
  RefreshCw,
  Crosshair,
  Map,
  Tag,
  Handshake,
  Network,
  Gift,
  Briefcase,
  Search,
  BrainCircuit,
  Bot,
  ClipboardCheck,
  Lightbulb,
  Pencil,
  Presentation,
};

const LOGO_MAP = {
  OUTBOUND_LOGOS,
  DIGITAL_LOGOS,
  AI_LOGOS,
  SYSTEMS_LOGOS,
};

/* ───── Process mini-steps ───── */
const processSteps = [
  { icon: Search, title: "Diagnose", desc: "Audit & understand" },
  { icon: Compass, title: "Design", desc: "Build the playbook" },
  { icon: Rocket, title: "Deploy", desc: "Execute with speed" },
  { icon: TrendingUp, title: "Drive", desc: "Optimise & scale" },
];

/* ───── Feature Card ───── */
function FeatureCard({
  feature,
  iconBg,
  iconColor,
  index,
}: {
  feature: ServiceFeature;
  iconBg: string;
  iconColor: string;
  index: number;
}) {
  const Icon = ICON_MAP[feature.iconName] || Target;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <TiltCard className="h-full">
        <div className="group p-6 rounded-xl glass glass-hover h-full">
          <div
            className={`w-11 h-11 rounded-lg ${iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={iconColor} size={22} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {feature.desc}
          </p>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ───── Page Content ───── */
export default function ServicePageContent({
  config,
}: {
  config: ServicePageConfig;
}) {
  const logos = config.logoSetKey ? LOGO_MAP[config.logoSetKey] : null;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <ParticleField />
        </div>
        <GlowOrb
          color={config.glowColor}
          size={600}
          top="-20%"
          left="-10%"
          duration={10}
        />
        <GlowOrb
          color="rgba(52, 211, 153, 0.06)"
          size={400}
          bottom="-10%"
          right="-5%"
          delay={2}
          duration={12}
        />

        {/* Watermark number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className={`text-[16rem] sm:text-[22rem] font-black bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent opacity-[0.03]`}
          >
            {config.pillarNumber}
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p
              className={`font-semibold text-sm uppercase tracking-[0.2em] mb-4 bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
            >
              Service Pillar {config.pillarNumber}
            </p>
          </AnimatedSection>
          <AccentHeading
            as="h1"
            text={config.title}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-display text-brand-text max-w-5xl leading-tight"
            delay={0.1}
          />
          <AnimatedSection delay={0.3}>
            <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl leading-relaxed">
              {config.subtitle}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="group px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-xl shadow-lg shadow-brand-cyan/25 transition-all duration-300 inline-flex items-center gap-2 text-lg btn-ripple"
                >
                  Book a Discovery Call
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/how-we-do-it"
                  className="px-8 py-4 border border-white/10 hover:border-brand-cyan/30 text-white font-semibold rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-lg hover:bg-white/[0.03]"
                >
                  See Our Process
                </Link>
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <AccentHeading
                text={config.problemHeading}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                {config.problemText}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                {config.problemBullets.map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-red-500/10 bg-red-500/[0.03]"
                  >
                    <XIcon
                      className="text-red-400/60 mt-0.5 shrink-0"
                      size={18}
                    />
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {bullet}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section className="relative py-24 sm:py-32 bg-brand-darkest overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 70% 50%, ${config.glowColor}, transparent)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection delay={0.1}>
              <div className="space-y-4">
                {config.approachBullets.map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-brand-cyan/10 bg-brand-cyan/[0.03]"
                  >
                    <CheckCircle2
                      className="text-brand-cyan-bright mt-0.5 shrink-0"
                      size={18}
                    />
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {bullet}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <AccentHeading
                text={config.approachHeading}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
              <p className="mt-6 text-lg text-brand-muted leading-relaxed">
                {config.approachText}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Process mini ── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-3 group-hover:bg-brand-cyan/20 group-hover:scale-110 transition-all duration-300">
                    <s.icon className="text-brand-cyan-bright" size={24} />
                  </div>
                  <p className="font-semibold text-white text-sm">
                    {s.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.5}>
            <div className="mt-8 text-center">
              <Link
                href="/how-we-do-it"
                className="text-brand-cyan-bright font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all group"
              >
                See our full process
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p
                className={`font-semibold text-sm uppercase tracking-[0.2em] mb-4 bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
              >
                What&apos;s Included
              </p>
              <AccentHeading
                text="Everything you need. **Nothing** you don't."
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {config.features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                iconBg={config.iconBg}
                iconColor={config.iconColor}
                index={i}
              />
            ))}
          </div>

          {logos && (
            <div className="mt-16">
              <LogoCloud
                logos={logos}
                title="Powered by industry-leading platforms"
                size={26}
              />
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 sm:py-32 bg-brand-darkest">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                Common Questions
              </p>
              <AccentHeading
                text="Everything you need to **know.**"
                className="text-3xl sm:text-4xl font-bold font-display text-brand-text"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <FaqAccordion items={config.faq} accentColor={config.iconColor} />
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 sm:py-32 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[200px] animate-pulse-glow" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <AccentHeading
              text={config.ctaHeading}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
            />
            <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
              {config.ctaText}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="group px-10 py-5 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-bold rounded-xl shadow-xl shadow-brand-cyan/30 transition-all duration-300 inline-flex items-center gap-3 text-xl btn-ripple"
                >
                  Book a Discovery Call
                  <ArrowRight
                    size={22}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/what-we-do"
                  className="px-8 py-4 border border-white/10 hover:border-brand-cyan/30 text-white font-semibold rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-lg hover:bg-white/[0.03]"
                >
                  See All Services
                </Link>
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
