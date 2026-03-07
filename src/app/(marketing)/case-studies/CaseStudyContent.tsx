"use client";

import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import AccentHeading from "@/components/AccentHeading";
import ParticleField from "@/components/ParticleField";
import GlowOrb from "@/components/GlowOrb";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import Marquee from "@/components/Marquee";
import BrowserMockup from "@/components/BrowserMockup";
import PhoneMockup from "@/components/PhoneMockup";
import VideoShowcase from "@/components/VideoShowcase";
import SocialMediaGrid from "@/components/SocialMediaGrid";
import TimelineStep from "@/components/TimelineStep";
import HexagonGrid from "@/components/HexagonGrid";
import {
  ArrowRight,
  Mail,
  Video,
  Globe,
  Phone,
  Share2,
  Search,
  MapPin,
  Factory,
  CheckCircle2,
  Target,
  Users,
  Layers,
  TrendingUp,
  Zap,
  ExternalLink,
  Shield,
  AlertTriangle,
  Wifi,
  Megaphone,
} from "lucide-react";

const stats = [
  { value: 115, suffix: "", label: "MedTech Companies Targeted", icon: Target },
  { value: 900, suffix: "+", label: "Decision-Makers Contacted", icon: Users },
  { value: 3, suffix: "", label: "Video Series Produced", icon: Video },
  { value: 4, suffix: "", label: "Social Platforms Managed", icon: Share2 },
  { value: 1, suffix: "", label: "New Website Launched", icon: Globe },
  { value: 100, suffix: "%", label: "Integrated Approach", icon: Layers },
];

const challenges = [
  {
    icon: Target,
    title: "Limited Market Reach",
    desc: "Relied on word-of-mouth with no structured outbound pipeline to reach new med-tech prospects.",
  },
  {
    icon: AlertTriangle,
    title: "Limited Digital Presence",
    desc: "Outdated website that didn\u2019t reflect their capabilities. Minimal social media strategy in place.",
  },
  {
    icon: Wifi,
    title: "No Content Pipeline",
    desc: "No video content, no case studies, no visual assets to build trust with new prospects.",
  },
];

const timelineSteps = [
  {
    number: "01",
    title: "Discovery & Analysis",
    description:
      "Deep-dive into Cube\u2019s strengths, competitive landscape, and the med-tech market opportunity. Documented USPs and identified high-value target segments.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy Design",
    description:
      "Built an integrated growth plan spanning outbound, digital, content, and social \u2014 all designed to work together, not in silos.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Website & Content",
    description:
      "Launched a conversion-focused website and produced three professional video series: leadership interviews, client testimonials, and a facility tour.",
    icon: Globe,
  },
  {
    number: "04",
    title: "Outbound Campaigns",
    description:
      "Built targeted prospect lists of 115 med-tech companies, launched B2B email sequences reaching 900+ contacts, and deployed AI-powered follow-up calling.",
    icon: Megaphone,
  },
  {
    number: "05",
    title: "Ongoing Growth",
    description:
      "Continuous social media management across 4 platforms, pipeline optimization, and new content production to maintain momentum.",
    icon: TrendingUp,
  },
];

const funnelSteps = [
  { label: "Companies Targeted", value: 115, width: "100%" },
  { label: "Contacts Reached", value: 900, suffix: "+", width: "75%" },
  { label: "Qualified Meetings", value: 0, display: "Booked", width: "40%" },
];

export default function CaseStudyContent() {
  return (
    <>
      {/* 1. HERO — Video background */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-black">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/cube-desktop.png"
        >
          <source src="https://cube.irish/wp-content/uploads/2026/01/Untitled.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4A014]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-40">
          <AnimatedSection>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black/70 border border-[#D4A014]/40 backdrop-blur-md mb-8">
              <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#D4A014] flex-shrink-0">
                <Image
                  src="/images/cube-icon-gold.jpg"
                  alt="Cube Printing"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="border-l border-[#D4A014]/30 pl-3">
                <span className="text-white font-extrabold text-xl tracking-wider">CUBE</span>
                <p className="text-[#D4A014] text-[9px] font-semibold tracking-[0.25em] uppercase leading-tight">Design &middot; Print &middot; Package</p>
              </div>
            </div>
            <p className="text-[#D4A014] font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              Case Study
            </p>
          </AnimatedSection>

          <AccentHeading
            as="h1"
            text="Cube Printing: From local printer to **med-tech powerhouse.**"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-5xl leading-tight drop-shadow-lg"
            accentColor="text-[#D4A014]"
          />

          <AnimatedSection delay={0.3}>
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed drop-shadow-md">
              How we helped a Limerick-based printing company break into the
              med-tech market with an integrated strategy spanning outbound,
              video, web, social, and AI.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-[#D4A014]" />
                Limerick, Ireland
              </span>
              <span className="flex items-center gap-2">
                <Factory size={14} className="text-[#D4A014]" />
                Med-Tech Printing
              </span>
              <span className="flex items-center gap-2">
                <Shield size={14} className="text-[#D4A014]" />
                ISO 9001 Certified
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <Marquee
        items={[
          "STRATEGY",
          "MED-TECH",
          "VIDEO PRODUCTION",
          "OUTBOUND",
          "WEBSITE",
          "SOCIAL MEDIA",
          "AI CALLING",
          "LEAD GEN",
          "EMAIL",
          "BRAND",
        ]}
        textColor="text-[#D4A014]/20"
        dotColor="bg-[#D4A014]/30"
        bgColor="bg-[#0e0e0e]"
        borderColor="border-white/[0.06]"
      />

      {/* 3. CLIENT PROFILE */}
      <section className="py-16 sm:py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="p-8 sm:p-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#D4A014]">
                      <Image
                        src="/images/cube-icon-gold.jpg"
                        alt="Cube Printing logo"
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-brand-text">
                        Cube Printing
                      </h2>
                      <p className="text-sm text-brand-muted">
                        Design &bull; Print &bull; Package
                      </p>
                    </div>
                  </div>
                  <p className="text-brand-muted leading-relaxed max-w-xl">
                    Cube Printing is a Limerick-based printing company with
                    three decades of expertise. They needed a partner to help
                    them break into new markets, generate qualified leads, and
                    build a brand that matched the quality of their work.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A014]/10 border border-[#D4A014]/30 text-xs text-[#D4A014] font-medium">
                    <Shield size={14} /> ISO 9001
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A014]/10 border border-[#D4A014]/30 text-xs text-[#D4A014] font-medium">
                    <Factory size={14} /> MedTech Specialist
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A014]/10 border border-[#D4A014]/30 text-xs text-[#D4A014] font-medium">
                    <MapPin size={14} /> Limerick, IE
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#D4A014]/20">
                <a
                  href="https://cube.irish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#D4A014] hover:text-[#e8b82e] hover:underline transition-colors"
                >
                  Visit cube.irish
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3.5. HEXAGON GRID — Inside Cube */}
      <section className="py-20 sm:py-28 bg-[#0e0e0e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,160,20,0.04)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <AnimatedSection>
              <p className="text-[#D4A014] font-semibold text-sm uppercase tracking-[0.2em] mb-4">Inside the facility</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
                Three decades of <span className="text-[#D4A014]">precision.</span>
              </h2>
              <p className="mt-6 text-brand-muted leading-relaxed max-w-2xl mx-auto">
                From design to print to packaging — Cube&apos;s state-of-the-art facility in
                Limerick handles every stage of production under one roof. ISO 9001 certified
                with cGMP processes built for the med-tech sector.
              </p>
            </AnimatedSection>
          </div>
          <div className="max-w-4xl mx-auto">
            <HexagonGrid />
          </div>
        </div>
      </section>

      {/* 4. THE BRIEF */}
      <section className="py-20 sm:py-28 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="The **Brief.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
              accentColor="text-[#D4A014]"
            />
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
                Cube had the expertise and the equipment. What they didn&apos;t
                have was a way to tell the world about it.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] h-full">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-5">
                      <c.icon className="text-red-400" size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-brand-text">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5. DISCOVERY & ANALYSIS */}
      <section className="py-20 sm:py-28 bg-[#0e0e0e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(212,160,20,0.05)_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <AccentHeading
                text="Discovery & **Analysis.**"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
                accentColor="text-[#D4A014]"
              />
              <AnimatedSection delay={0.2}>
                <p className="mt-6 text-brand-muted leading-relaxed text-lg">
                  Before we built anything, we sat down with the Cube team and got
                  to the core of their business. What makes them different? Where
                  are the gaps? What does the market actually need?
                </p>
                <p className="mt-4 text-brand-muted leading-relaxed">
                  We ran a full business analysis — mapping strengths, weaknesses,
                  competitive positioning, and market opportunity. This wasn&apos;t
                  a surface-level audit. We helped Cube articulate USPs they&apos;d
                  never formally defined: three decades of expertise, ISO 9001
                  certification, cGMP-ready processes, and a vertically integrated
                  facility that handles design, print, and packaging under one roof.
                </p>
                <p className="mt-4 text-brand-muted leading-relaxed">
                  We identified the med-tech sector as the highest-value
                  opportunity — a market that demands the exact quality standards
                  Cube already had, but didn&apos;t know how to reach. This
                  discovery phase shaped every decision that followed.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: "USPs Defined", detail: "Core differentiators documented and sharpened" },
                    { label: "SWOT Analysis", detail: "Strengths, weaknesses, opportunities mapped" },
                    { label: "Market Identified", detail: "Med-tech sector pinpointed as ideal fit" },
                    { label: "Target Segments", detail: "High-value prospect profiles built" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                    >
                      <p className="text-sm font-bold text-[#D4A014]">{item.label}</p>
                      <p className="mt-1 text-xs text-brand-muted leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
                  <Image
                    src="/images/cube-boardroom.png"
                    alt="Cube Printing team in boardroom strategy session"
                    width={958}
                    height={1152}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-[#D4A014]/10 border border-[#D4A014]/20 -z-10" />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#D4A014]/10 border border-[#D4A014]/20 -z-10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 5. STATS */}
      <section className="py-20 sm:py-28 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="The **Numbers.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
              accentColor="text-[#D4A014]"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center overflow-hidden group hover:border-[#D4A014]/40 transition-colors">
                  <stat.icon
                    className="absolute top-3 right-3 text-[#D4A014]/10"
                    size={28}
                  />
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#D4A014]">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-brand-muted">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WEBSITE SHOWCASE */}
      <section className="py-20 sm:py-28 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <AccentHeading
              text="A website that **converts.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
              accentColor="text-[#D4A014]"
            />
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-lg text-brand-muted max-w-2xl leading-relaxed">
                We designed and built a new website that positions Cube Printing
                as a premium partner for the med-tech industry &mdash; clean,
                professional, and conversion-focused.
              </p>
            </AnimatedSection>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <TiltCard>
                <BrowserMockup
                  url="cube.irish"
                  screenshot="/images/cube-desktop.png"
                />
              </TiltCard>
            </div>

            <div className="absolute -bottom-12 right-4 sm:right-12 z-20 hidden md:block">
              <PhoneMockup screenshot="/images/cube-mobile.png" />
            </div>

            <div className="mt-8 flex justify-center md:hidden">
              <PhoneMockup screenshot="/images/cube-mobile.png" float={false} />
            </div>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Responsive Design", desc: "Mobile-first, optimised for every device and screen size." },
                { title: "SEO Optimised", desc: "Built for search visibility in the med-tech printing space." },
                { title: "Conversion Focused", desc: "Clear CTAs, trust signals, and inquiry forms throughout." },
              ].map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <h4 className="text-sm font-bold text-[#D4A014] mb-2">
                    {f.title}
                  </h4>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 7. DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4A014]/30 to-transparent" />

      {/* 8. VIDEO PRODUCTION */}
      <section className="py-20 sm:py-28 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="Content that builds **trust.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
              accentColor="text-[#D4A014]"
            />
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
                We produced three professional video series to showcase
                Cube&apos;s expertise, build credibility, and give prospects
                confidence.
              </p>
            </AnimatedSection>
          </div>

          <VideoShowcase />

          <AnimatedSection delay={0.3}>
            <p className="mt-12 text-center text-sm text-brand-muted max-w-lg mx-auto">
              All content distributed across cube.irish, social media channels,
              and email campaigns for maximum reach.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 9. SOCIAL MEDIA */}
      <section className="py-20 sm:py-28 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="Building a brand **presence.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
              accentColor="text-[#D4A014]"
            />
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
                Ongoing social media management to maintain brand visibility,
                share content, and engage with the med-tech community across
                every major platform.
              </p>
            </AnimatedSection>
          </div>

          <SocialMediaGrid />
        </div>
      </section>

      {/* 10. OUTBOUND & AI */}
      <section className="py-20 sm:py-28 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AccentHeading
                text="Outbound at **scale.**"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
                accentColor="text-[#D4A014]"
              />
              <AnimatedSection delay={0.2}>
                <p className="mt-6 text-brand-muted leading-relaxed">
                  We built a custom prospect database of 115 med-tech companies
                  with 900+ verified contacts. Then we launched personalised B2B
                  email sequences and deployed AI-powered outbound calling to
                  follow up, qualify leads, and book meetings at scale.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <span className="flex items-center gap-2 text-sm text-brand-muted">
                    <Mail size={16} className="text-[#D4A014]" />
                    B2B Email Sequences
                  </span>
                  <span className="flex items-center gap-2 text-sm text-brand-muted">
                    <Phone size={16} className="text-[#D4A014]" />
                    AI Outbound Calling
                  </span>
                  <span className="flex items-center gap-2 text-sm text-brand-muted">
                    <Target size={16} className="text-[#D4A014]" />
                    Custom Prospect Lists
                  </span>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.3}>
              <div className="space-y-4">
                {funnelSteps.map((step) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <div
                      className="h-14 rounded-xl bg-gradient-to-r from-[#D4A014]/20 to-[#D4A014]/5 border border-[#D4A014]/25 flex items-center px-5"
                      style={{ width: step.width }}
                    >
                      <span className="text-lg font-bold text-[#D4A014] font-display mr-3">
                        {step.display ? (
                          step.display
                        ) : (
                          <CountUp end={step.value} suffix={step.suffix || ""} />
                        )}
                      </span>
                      <span className="text-xs text-brand-muted whitespace-nowrap">
                        {step.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 11. TIMELINE */}
      <section className="py-20 sm:py-28 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="The **journey.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
              accentColor="text-[#D4A014]"
            />
          </div>

          <div className="max-w-2xl mx-auto">
            <TimelineStep steps={timelineSteps} />
          </div>
        </div>
      </section>

      {/* 12. OUTCOME */}
      <section className="py-20 sm:py-28 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#D4A014]/10 to-[#D4A014]/5 border border-[#D4A014]/25">
              <div className="flex items-start gap-4">
                <CheckCircle2
                  className="text-[#D4A014] flex-shrink-0 mt-1"
                  size={32}
                />
                <div>
                  <h3 className="text-2xl font-bold text-brand-text">
                    The Outcome
                  </h3>
                  <p className="mt-4 text-brand-muted leading-relaxed text-lg">
                    Through our integrated approach, Cube Printing secured new
                    business in the med-tech sector, built a professional brand
                    presence across web and social, and established a repeatable
                    outbound system that continues to generate pipeline. This is
                    what full-spectrum business development delivers &mdash; not
                    just one piece of the puzzle, but the entire picture.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#D4A014]/15 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/30 border border-[#D4A014]/15">
                  <TrendingUp className="text-[#D4A014] flex-shrink-0" size={18} />
                  <span className="text-sm font-medium text-brand-text">New MedTech Revenue</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/30 border border-[#D4A014]/15">
                  <Globe className="text-[#D4A014] flex-shrink-0" size={18} />
                  <span className="text-sm font-medium text-brand-text">Professional Brand Presence</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/30 border border-[#D4A014]/15">
                  <Zap className="text-[#D4A014] flex-shrink-0" size={18} />
                  <span className="text-sm font-medium text-brand-text">Repeatable Pipeline</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 13. CTA — Outpace branding */}
      <section className="relative py-24 sm:py-32 bg-brand-darkest overflow-hidden">
        <GlowOrb color="rgba(34, 211, 238, 0.06)" size={400} top="-100px" right="-100px" />
        <GlowOrb color="rgba(52, 211, 153, 0.04)" size={350} bottom="-100px" left="-100px" delay={3} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AccentHeading
            text="Want results like **these?**"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
          />
          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Every engagement starts with a conversation. Let&apos;s talk about
              your business and where the biggest opportunities are.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="mt-10">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-lg shadow-lg shadow-brand-cyan/25 transition-all duration-200 inline-flex items-center gap-2 text-lg"
                >
                  Book a Discovery Call
                  <ArrowRight size={20} />
                </Link>
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
