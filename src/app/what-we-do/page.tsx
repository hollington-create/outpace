"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Search,
  Mail,
  Phone,
  CalendarCheck,
  Globe,
  FileCode,
  BarChart3,
  Megaphone,
  Share2,
  Settings,
  HeadphonesIcon,
  Workflow,
  Video,
  Mic,
  Users,
  Camera,
  CheckCircle2,
  Bot,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  MousePointerClick,
  BrainCircuit,
  MessageSquare,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Trophy,
  Heart,
  ThumbsUp,
  ArrowUpRight,
  RefreshCw,
  Crosshair,
  Map,
  Tag,
  Briefcase,
  Handshake,
  Network,
  Gift,
  UserPlus,
  BadgeEuro,
  Megaphone as MegaphoneIcon,
} from "lucide-react";
import ParticleField from "@/components/ParticleField";
import GlowOrb from "@/components/GlowOrb";
import AccentHeading from "@/components/AccentHeading";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import LogoCloud from "@/components/LogoCloud";
import {
  OUTBOUND_LOGOS,
  DIGITAL_LOGOS,
  SYSTEMS_LOGOS,
  AI_LOGOS,
} from "@/lib/brand-logos";
import type { BrandLogoEntry } from "@/lib/brand-logos";

/* ───── Data ───── */

interface Pillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  gradient: string;
  glowColor: string;
  iconBg: string;
  iconColor: string;
  features: { icon: React.ElementType; text: string }[];
  logos?: BrandLogoEntry[];
  serviceLink?: string; // link to dedicated landing page
}

const pillars: Pillar[] = [
  {
    id: "analysis",
    number: "01",
    title: "Consultative Business Analysis",
    subtitle: "Understand before you act",
    desc: "Before we launch a single campaign, we sit with your team and learn your business inside-out. We document your unique selling points, map your competitive landscape, and identify the markets where you'll win.",
    gradient: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.15)",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    features: [
      { icon: Search, text: "Full business audit — what makes you different, documented" },
      { icon: Users, text: "Target market identification — who to go after and why" },
      { icon: BarChart3, text: "Competitive mapping — who you're up against and how to win" },
      { icon: Target, text: "Growth opportunity roadmap with clear priorities" },
      { icon: BadgeEuro, text: "Grant & funding navigation (Enterprise Ireland, LEO)" },
    ],
  },
  {
    id: "leads",
    number: "02",
    title: "Outbound Lead Generation",
    subtitle: "Fill your pipeline with qualified prospects",
    desc: "We get your offer in front of the right decision-makers — email, phone, LinkedIn, whatever it takes. From building your prospect lists to AI-powered calling at scale, we fill the top of your pipeline so your team can focus on closing.",
    gradient: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52, 211, 153, 0.15)",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    features: [
      { icon: Mail, text: "B2B email sequences with personalised copy" },
      { icon: Phone, text: "AI-powered outbound calling at scale" },
      { icon: Users, text: "Scraped & verified prospect lists" },
      { icon: CalendarCheck, text: "Meeting booking & handoff to your sales team" },
    ],
    logos: OUTBOUND_LOGOS,
    serviceLink: "/services/lead-generation",
  },
  {
    id: "digital",
    number: "03",
    title: "Digital Presence",
    subtitle: "Look as good as you are",
    desc: "Your digital presence should work as hard as your sales team. We build high-converting websites, run targeted ad campaigns, manage your social channels, and make sure you're found when prospects search for what you do.",
    gradient: "from-violet-400 to-purple-500",
    glowColor: "rgba(167, 139, 250, 0.15)",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    features: [
      { icon: Globe, text: "Website development & landing pages" },
      { icon: FileCode, text: "Search engine optimisation (SEO)" },
      { icon: Megaphone, text: "Paid advertising (Google, LinkedIn, Meta)" },
      { icon: Share2, text: "Social media management & content" },
    ],
    logos: DIGITAL_LOGOS,
    serviceLink: "/services/digital-presence",
  },
  {
    id: "systems",
    number: "04",
    title: "Systems & Operations",
    subtitle: "Build the machine that scales",
    desc: "Growth without systems is chaos. We implement CRMs, streamline your customer service, and build operational processes that let your team focus on what matters — closing deals and serving clients.",
    gradient: "from-amber-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.15)",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    features: [
      { icon: Settings, text: "CRM implementation & customisation" },
      { icon: HeadphonesIcon, text: "Customer service consulting & training" },
      { icon: Workflow, text: "Process mapping — cut the bottlenecks slowing you down" },
      { icon: BarChart3, text: "Reporting dashboards & KPI tracking" },
    ],
    logos: SYSTEMS_LOGOS,
  },
  {
    id: "content",
    number: "05",
    title: "Content & Video",
    subtitle: "Build trust before the first meeting",
    desc: "People buy from companies they trust. We produce professional video content — management interviews, client testimonials, facility tours — and build a content strategy that positions you as the authority in your space.",
    gradient: "from-rose-400 to-pink-500",
    glowColor: "rgba(251, 113, 133, 0.15)",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    features: [
      { icon: Mic, text: "Management interview series" },
      { icon: Video, text: "Client testimonial videos" },
      { icon: Camera, text: "Facility tours & brand films" },
      { icon: Share2, text: "Content strategy & thought leadership" },
      { icon: UserPlus, text: "Employer branding & recruitment content" },
    ],
  },
  {
    id: "ai",
    number: "06",
    title: "AI-Powered Growth Tools",
    subtitle: "Technology that sells while you sleep",
    desc: "We don't just talk about AI — we build it into your sales process. AI voice agents handle discovery calls, chatbots qualify leads 24/7, and intelligent systems generate tailored proposals in hours, not weeks.",
    gradient: "from-cyan-400 to-emerald-400",
    glowColor: "rgba(34, 211, 238, 0.15)",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    features: [
      { icon: Bot, text: "AI voice agents for discovery & outbound calls" },
      { icon: MessageSquare, text: "24/7 chatbot lead qualification on your site" },
      { icon: BrainCircuit, text: "Auto-generated tailored proposals" },
      { icon: MousePointerClick, text: "Personalised prospect landing pages" },
    ],
    logos: AI_LOGOS,
    serviceLink: "/services/ai-growth-tools",
  },
  {
    id: "sales",
    number: "07",
    title: "Sales Enablement & Training",
    subtitle: "Close more of what you generate",
    desc: "No point filling a pipeline if your team can't close it. We work with your salespeople — not instead of them — to sharpen their pitch, tighten their process, and give them the tools to convert more of the opportunities we generate.",
    gradient: "from-indigo-400 to-blue-500",
    glowColor: "rgba(129, 140, 248, 0.15)",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    features: [
      { icon: BookOpen, text: "Sales playbook creation & objection handling" },
      { icon: GraduationCap, text: "Discovery call coaching & pitch training" },
      { icon: Workflow, text: "Sales process mapping & optimisation" },
      { icon: Trophy, text: "Win/loss analysis & pipeline reviews" },
    ],
    serviceLink: "/services/sales-enablement",
  },
  {
    id: "retention",
    number: "08",
    title: "Customer Retention & Growth",
    subtitle: "Your easiest revenue is already in your database",
    desc: "Most businesses obsess over new logos while their best clients quietly drift away. We build the systems that keep them — health scoring so you spot churn before it happens, structured check-ins that surface new opportunities, and upsell playbooks that grow accounts you've already won.",
    gradient: "from-teal-400 to-cyan-500",
    glowColor: "rgba(45, 212, 191, 0.15)",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",
    features: [
      { icon: Heart, text: "Churn analysis & client health scoring" },
      { icon: ThumbsUp, text: "NPS / CSAT programme setup & tracking" },
      { icon: ArrowUpRight, text: "Upsell & cross-sell strategy" },
      { icon: RefreshCw, text: "Quarterly business reviews that deepen relationships" },
    ],
  },
  {
    id: "positioning",
    number: "09",
    title: "Brand Positioning & GTM Strategy",
    subtitle: "Get clear before you spend a cent",
    desc: "If your positioning is vague, every campaign you run is a coin flip. We help you get crystal clear on who you're for, why they should care, and how to take that message to market — so every pound you spend actually lands.",
    gradient: "from-sky-400 to-blue-500",
    glowColor: "rgba(56, 189, 248, 0.15)",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    features: [
      { icon: Crosshair, text: "Messaging hierarchy & value proposition workshops" },
      { icon: Map, text: "Go-to-market strategy for new products & markets" },
      { icon: Users, text: "ICP refinement & buyer persona development" },
      { icon: Tag, text: "Pricing & packaging strategy reviews" },
    ],
  },
  {
    id: "partnerships",
    number: "10",
    title: "Partnerships & Referral Programmes",
    subtitle: "Turn your network into a growth engine",
    desc: "Your best clients know other businesses just like them — but most referrals happen by accident. We design structured referral programmes, identify strategic partners, and build co-marketing campaigns that turn word-of-mouth into a predictable, repeatable source of warm introductions.",
    gradient: "from-lime-400 to-emerald-500",
    glowColor: "rgba(163, 230, 53, 0.15)",
    iconBg: "bg-lime-500/10",
    iconColor: "text-lime-400",
    features: [
      { icon: Handshake, text: "Strategic partner identification & outreach" },
      { icon: Network, text: "Referral programme design & tracking" },
      { icon: Gift, text: "Co-marketing campaigns with partners" },
      { icon: Briefcase, text: "Partner enablement — collateral, training & incentives" },
    ],
  },
];

/* ───── Animated Feature Row ───── */

function FeatureRow({
  icon: Icon,
  text,
  iconBg,
  iconColor,
  index,
}: {
  icon: React.ElementType;
  text: string;
  iconBg: string;
  iconColor: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/20 transition-all duration-300"
    >
      <div
        className={`w-10 h-10 rounded-lg ${iconBg} flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={iconColor} size={20} />
      </div>
      <p className="text-slate-300 font-medium pt-1.5 group-hover:text-white transition-colors">
        {text}
      </p>
    </motion.div>
  );
}

/* ───── Service Pillar Section ───── */

function PillarSection({
  pillar,
  index,
}: {
  pillar: Pillar;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} id={pillar.id} className="relative py-24 sm:py-32">
      {/* Huge watermark number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className={`text-[12rem] sm:text-[16rem] font-black bg-gradient-to-br ${pillar.gradient} bg-clip-text text-transparent opacity-[0.03]`}>
          {pillar.number}
        </span>
      </div>

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at ${isEven ? "20%" : "80%"} 50%, ${pillar.glowColor}, transparent)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:direction-rtl" : ""}`}
        >
          <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={!isEven ? "lg:order-2" : ""}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, type: "spring" }}
              className={`inline-block text-7xl sm:text-8xl font-black bg-gradient-to-br ${pillar.gradient} bg-clip-text text-transparent opacity-20`}
            >
              {pillar.number}
            </motion.span>

            <h2 className="mt-2 text-3xl sm:text-4xl font-bold font-display text-white">
              {pillar.title}
            </h2>

            <p
              className={`mt-2 font-semibold bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}
            >
              {pillar.subtitle}
            </p>

            <p className="mt-6 text-slate-400 leading-relaxed text-lg">
              {pillar.desc}
            </p>

            {pillar.serviceLink && (
              <Link
                href={pillar.serviceLink}
                className={`mt-6 inline-flex items-center gap-2 font-semibold text-sm bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent hover:gap-3 transition-all duration-300 group`}
              >
                Learn more
                <ArrowRight size={16} className={`${pillar.iconColor} group-hover:translate-x-1 transition-transform`} />
              </Link>
            )}
          </motion.div>

          <div className={`space-y-3 ${!isEven ? "lg:order-1" : ""}`}>
            {pillar.features.map((f, i) => (
              <FeatureRow
                key={i}
                icon={f.icon}
                text={f.text}
                iconBg={pillar.iconBg}
                iconColor={pillar.iconColor}
                index={i}
              />
            ))}
            {pillar.logos && (
              <div className="pt-4">
                <LogoCloud logos={pillar.logos} size={22} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Floating Service Nav ───── */

function ServiceNav() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {pillars.map((p, i) => (
            <motion.a
              key={p.id}
              href={`#${p.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              className="group relative"
            >
              <TiltCard className="relative">
                <div
                  className={`relative p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                    active === p.id ? "border-white/20 bg-white/[0.06]" : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}
                  />
                  <span
                    className={`relative text-xs font-bold bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent`}
                  >
                    {p.number}
                  </span>
                  <p className="relative mt-2 text-sm font-semibold text-white leading-tight">
                    {p.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="relative text-sm font-semibold text-white/40 leading-tight">
                    {p.title.split(" ").slice(2).join(" ")}
                  </p>
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${p.gradient} transition-all duration-500`}
                  />
                </div>
              </TiltCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Stats Bar ───── */

function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    { value: "10", label: "Service Pillars" },
    { value: "40+", label: "Individual Services" },
    { value: "1", label: "Integrated Partner" },
    { value: "100%", label: "Client Retention" },
  ];

  return (
    <div ref={ref} className="relative py-16 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
              className="text-center"
            >
              <p className="text-4xl sm:text-5xl font-black text-shimmer">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───── Page ───── */

export default function WhatWeDoPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-8 sm:pt-40 sm:pb-12 overflow-hidden"
      >
        <div className="absolute inset-0">
          <ParticleField />
        </div>

        <GlowOrb color="rgba(34, 211, 238, 0.12)" size={500} top="10%" left="-5%" delay={0} />
        <GlowOrb color="rgba(52, 211, 153, 0.08)" size={400} top="60%" left="70%" delay={2} />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cyan-400 font-semibold text-sm uppercase tracking-[0.25em] mb-6">
              What We Do
            </p>

            <AccentHeading
              as="h1"
              text="Everything you need to **grow.** Nothing you don't."
              className="text-5xl sm:text-6xl lg:text-7xl font-black font-display text-brand-text max-w-5xl leading-[1.05]"
            />

            <p className="mt-8 text-xl text-slate-400 max-w-2xl leading-relaxed">
              Ten integrated service pillars covering the entire business
              development lifecycle — from positioning and strategy through pipeline
              generation, sales enablement, and client retention.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 inline-flex items-center gap-2 text-lg"
                >
                  Book a Discovery Call
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#analysis"
                  className="px-8 py-4 border border-white/10 hover:border-cyan-500/30 text-white font-semibold rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-lg hover:bg-white/[0.03]"
                >
                  Explore Services
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Quick-nav cards ── */}
      <ServiceNav />

      {/* ── Stats ── */}
      <StatsBar />

      {/* ── Service Pillars ── */}
      {pillars.map((pillar, idx) => (
        <PillarSection key={pillar.id} pillar={pillar} index={idx} />
      ))}

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-divider" />
      </div>

      {/* ── CTA → How We Do It ── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-[#0a0f1a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[120px] animate-pulse-glow" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white">
              Want to see how we put this into action?
            </h2>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Our proven four-step process takes you from stuck to scaling.
              Every engagement follows the same battle-tested framework.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/how-we-do-it"
                  className="group px-8 py-4 border-2 border-brand-cyan/50 hover:border-brand-cyan text-white font-semibold rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-lg hover:bg-brand-cyan/10"
                >
                  See Our Process
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="group px-10 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-xl shadow-cyan-500/30 transition-all duration-300 inline-flex items-center gap-3 text-lg"
                >
                  Book a Discovery Call
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
