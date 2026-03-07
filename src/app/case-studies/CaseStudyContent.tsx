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
    title: "No Digital Presence",
    desc: "Outdated website that didn\u2019t reflect their capabilities. Zero social media strategy in place.",
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
      {/* 1. HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-brand-dark">
        <ParticleField />
        <GlowOrb color="rgba(34, 211, 238, 0.08)" size={600} top="-200px" left="-200px" />
        <GlowOrb color="rgba(52, 211, 153, 0.06)" size={500} bottom="-150px" right="-150px" delay={2} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28">
          <AnimatedSection>
            <Image
              src="/images/cube-logo-wide.png"
              alt="Cube Printing"
              width={180}
              height={70}
              className="mb-8"
            />
            <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              Case Study
            </p>
          </AnimatedSection>

          <AccentHeading
            as="h1"
            text="Cube Printing: From local printer to **med-tech powerhouse.**"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text max-w-5xl leading-tight"
          />

          <AnimatedSection delay={0.3}>
            <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl leading-relaxed">
              How we helped a Limerick-based printing company break into the
              med-tech market with an integrated strategy spanning outbound,
              video, web, social, and AI.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-brand-muted">
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-cyan-bright" />
                Limerick, Ireland
              </span>
              <span className="flex items-center gap-2">
                <Factory size={14} className="text-brand-cyan-bright" />
                Med-Tech Printing
              </span>
              <span className="flex items-center gap-2">
                <Shield size={14} className="text-brand-cyan-bright" />
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
      />

      {/* 3. CLIENT PROFILE */}
      <section className="py-16 sm:py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="p-8 sm:p-12 rounded-2xl bg-brand-dark/80 border border-brand-border/50 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#D4A014]/10 flex items-center justify-center">
                      <Image
                        src="/images/cube-logo.png"
                        alt="Cube Printing logo"
                        width={56}
                        height={56}
                        className="object-contain"
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
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/5 border border-brand-cyan/20 text-xs text-brand-cyan font-medium">
                    <Shield size={14} /> ISO 9001
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/5 border border-brand-cyan/20 text-xs text-brand-cyan font-medium">
                    <Factory size={14} /> MedTech Specialist
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/5 border border-brand-cyan/20 text-xs text-brand-cyan font-medium">
                    <MapPin size={14} /> Limerick, IE
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-brand-border/30">
                <a
                  href="https://cube.irish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-cyan-bright hover:underline"
                >
                  Visit cube.irish
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. THE BRIEF */}
      <section className="py-20 sm:py-28 bg-brand-darkest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="The **Brief.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
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
                  <div className="p-8 rounded-2xl bg-brand-dark/80 border border-brand-border/50 h-full">
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

      {/* 5. STATS */}
      <section className="py-20 sm:py-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="The **Numbers.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="relative p-6 sm:p-8 rounded-2xl bg-brand-dark/80 border border-brand-border/50 text-center overflow-hidden group hover:border-brand-cyan/30 transition-colors">
                  <stat.icon
                    className="absolute top-3 right-3 text-brand-cyan/10"
                    size={28}
                  />
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-brand-cyan-bright">
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
      <section className="py-20 sm:py-28 bg-brand-darkest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <AccentHeading
              text="A website that **converts.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
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
                  className="p-6 rounded-xl bg-brand-dark/50 border border-brand-border/30"
                >
                  <h4 className="text-sm font-bold text-brand-cyan-bright mb-2">
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
      <div className="gradient-divider" />

      {/* 8. VIDEO PRODUCTION */}
      <section className="py-20 sm:py-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="Content that builds **trust.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
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
      <section className="py-20 sm:py-28 bg-brand-darkest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="Building a brand **presence.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
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
      <section className="py-20 sm:py-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AccentHeading
                text="Outbound at **scale.**"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
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
                    <Mail size={16} className="text-brand-cyan-bright" />
                    B2B Email Sequences
                  </span>
                  <span className="flex items-center gap-2 text-sm text-brand-muted">
                    <Phone size={16} className="text-brand-cyan-bright" />
                    AI Outbound Calling
                  </span>
                  <span className="flex items-center gap-2 text-sm text-brand-muted">
                    <Target size={16} className="text-brand-cyan-bright" />
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
                      className="h-14 rounded-xl bg-gradient-to-r from-brand-cyan/20 to-brand-emerald/10 border border-brand-cyan/20 flex items-center px-5"
                      style={{ width: step.width }}
                    >
                      <span className="text-lg font-bold text-brand-cyan-bright font-display mr-3">
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
      <section className="py-20 sm:py-28 bg-brand-darkest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AccentHeading
              text="The **journey.**"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text"
            />
          </div>

          <div className="max-w-2xl mx-auto">
            <TimelineStep steps={timelineSteps} />
          </div>
        </div>
      </section>

      {/* 12. OUTCOME */}
      <section className="py-20 sm:py-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-brand-cyan/10 to-brand-emerald/5 border border-brand-cyan/20">
              <div className="flex items-start gap-4">
                <CheckCircle2
                  className="text-brand-cyan-bright flex-shrink-0 mt-1"
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

              <div className="mt-8 pt-8 border-t border-brand-cyan/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-darkest/50 border border-brand-cyan/10">
                  <TrendingUp className="text-brand-cyan-bright flex-shrink-0" size={18} />
                  <span className="text-sm font-medium text-brand-text">New MedTech Revenue</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-darkest/50 border border-brand-cyan/10">
                  <Globe className="text-brand-cyan-bright flex-shrink-0" size={18} />
                  <span className="text-sm font-medium text-brand-text">Professional Brand Presence</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-darkest/50 border border-brand-cyan/10">
                  <Zap className="text-brand-cyan-bright flex-shrink-0" size={18} />
                  <span className="text-sm font-medium text-brand-text">Repeatable Pipeline</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 13. CTA */}
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
