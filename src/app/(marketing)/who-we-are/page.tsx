"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AccentHeading from "@/components/AccentHeading";
import TiltCard from "@/components/TiltCard";
import GlowOrb from "@/components/GlowOrb";
import {
  ArrowRight,
  Handshake,
  Eye,
  Flame,
  Lightbulb,
  MapPin,
  Globe,
  Linkedin,
} from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Partnership Over Transactions",
    desc: "We don't do one-off projects. We embed ourselves in your business and grow alongside you. Your wins are our wins.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    desc: "No jargon, no vanity metrics, no hiding behind dashboards. You'll always know exactly what we're doing and why.",
  },
  {
    icon: Flame,
    title: "Relentless Execution",
    desc: "Ideas are easy. Shipping is hard. We launch fast, test everything, and never settle for 'good enough' when there's a better version within reach.",
  },
  {
    icon: Lightbulb,
    title: "Commercial Thinking",
    desc: "Every decision runs through one filter: does this generate revenue? If it doesn't move the needle, we don't do it.",
  },
];

const team = [
  {
    name: "Colm Ring",
    role: "Co-Founder & CEO",
    initials: "CR",
    bio: "Colm's background is in business strategy, operations, and commercial development. He's built and scaled systems that actually drive revenue — and he runs Outpace with the same operator's mindset: if it doesn't move the needle, it doesn't make the cut.",
    linkedin: "https://www.linkedin.com/in/colm-ring",
    gradient: "from-brand-cyan to-brand-teal",
  },
  {
    name: "Holly Purnell",
    role: "Co-Founder & CMO",
    initials: "HP",
    bio: "Holly runs Outpace's marketing engine — digital marketing, brand building, content strategy, and campaign execution. She's the reason clients don't just get a strategy deck, they get campaigns that actually reach the right people and convert.",
    linkedin: "https://www.linkedin.com/in/holly-purnell",
    gradient: "from-brand-emerald to-brand-cyan",
  },
];

export default function WhoWeArePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-brand-darkest overflow-hidden">
        <GlowOrb color="rgba(34, 211, 238, 0.08)" size={600} top="-20%" left="-10%" duration={10} />
        <GlowOrb color="rgba(52, 211, 153, 0.06)" size={400} bottom="-10%" right="-5%" delay={2} duration={12} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Who We Are
            </p>
          </AnimatedSection>
          <AccentHeading
            as="h1"
            text="We're not an agency. We're your **growth engine.**"
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-display text-brand-text max-w-4xl leading-tight"
            delay={0.1}
          />
          <AnimatedSection delay={0.3}>
            <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl leading-relaxed">
              Outpace is a full-stack business development partner that handles
              everything from strategy and lead generation to systems, content,
              and digital presence — so you can focus on what you do best.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-brand-text">
                Built from frustration with the status quo
              </h2>
              <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
                <p>
                  We started Outpace because we saw the same pattern everywhere:
                  ambitious companies spending a fortune on disconnected services
                  that never delivered real growth.
                </p>
                <p>
                  A web agency here, an SEO consultant there, a CRM vendor
                  somewhere else — none of them talking to each other, and nobody
                  owning the outcome. Leads fell through the cracks, systems didn&apos;t
                  integrate, and the only thing growing was the vendor bill.
                </p>
                <p>
                  We built Outpace to be the partner we wished existed: one team
                  that understands the entire business development lifecycle and
                  owns it end-to-end. From the first prospect touchpoint to the
                  closed deal and beyond.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <TiltCard className="relative">
                  <div className="p-6 rounded-2xl glass glass-hover card-shine">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                        <MapPin className="text-brand-cyan-bright" size={20} />
                      </div>
                      <h3 className="font-semibold text-brand-text">
                        Based in Limerick
                      </h3>
                    </div>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      Our home is in the heart of Ireland&apos;s Mid-West — a city
                      with a thriving business community and a tradition of
                      punching above its weight.
                    </p>
                  </div>
                </TiltCard>
                <TiltCard className="relative">
                  <div className="p-6 rounded-2xl glass glass-hover card-shine">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                        <Globe className="text-brand-cyan-bright" size={20} />
                      </div>
                      <h3 className="font-semibold text-brand-text">
                        Working Globally
                      </h3>
                    </div>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      While we&apos;re proudly Irish, our clients and campaigns
                      span across the UK, Europe, and beyond. Geography doesn&apos;t
                      limit growth.
                    </p>
                  </div>
                </TiltCard>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                Our Values
              </p>
              <AccentHeading
                text="How we **operate.**"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <TiltCard className="relative h-full">
                  <div className="p-8 rounded-2xl glass glass-hover card-shine h-full">
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-4">
                      <v.icon className="text-brand-cyan-bright" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-text">
                      {v.title}<span className="text-brand-cyan-bright">.</span>
                    </h3>
                    <p className="mt-3 text-brand-muted leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24 sm:py-32 bg-brand-darkest overflow-hidden">
        <GlowOrb color="rgba(34, 211, 238, 0.06)" size={500} top="10%" right="-15%" delay={1} />
        <GlowOrb color="rgba(52, 211, 153, 0.05)" size={400} bottom="5%" left="-10%" delay={3} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                The Founders
              </p>
              <AccentHeading
                text="The people behind **Outpace.**"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
              />
              <p className="mt-6 text-lg text-brand-muted">
                Two founders with complementary expertise across business
                development, marketing, and technology — driving growth for
                ambitious companies.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.15}>
                <TiltCard className="relative h-full">
                  <div className="p-8 rounded-2xl glass card-shine h-full group hover:border-brand-cyan/30 transition-all duration-500" style={{ border: '1px solid rgba(51, 65, 85, 0.5)' }}>
                    {/* Avatar with grayscale→color effect */}
                    <div className="relative mx-auto w-28 h-28 mb-6">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${t.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse-glow`} />
                      <div className="relative w-28 h-28 rounded-full bg-brand-dark border-2 border-brand-border group-hover:border-brand-cyan-bright transition-all duration-500 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0">
                        <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                        <span className="relative text-3xl font-bold text-shimmer">
                          {t.initials}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-brand-text">
                        {t.name}
                      </h3>
                      <p className="text-sm font-semibold text-brand-cyan-bright mt-1">
                        {t.role}
                      </p>
                      <p className="mt-4 text-sm text-brand-muted leading-relaxed">
                        {t.bio}
                      </p>

                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-lg bg-brand-cyan/10 text-brand-cyan-bright text-sm font-medium hover:bg-brand-cyan/20 hover:scale-105 transition-all duration-200"
                      >
                        <Linkedin size={16} />
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-32 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <AccentHeading
              text="Want to see how we **work?**"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-text"
            />
            <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Our proven four-step framework turns insight into revenue.
              See exactly how we take you from stuck to scaling.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/how-we-do-it"
                className="group px-8 py-4 border-2 border-brand-cyan/50 hover:border-brand-cyan text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 text-lg hover:bg-brand-cyan/10"
              >
                See Our Process
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-lg shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40 transition-all duration-300 inline-flex items-center gap-2 text-lg btn-ripple"
              >
                Get in Touch
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
