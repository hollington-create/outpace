import { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ArrowRight,
  Handshake,
  Eye,
  Flame,
  Lightbulb,
  MapPin,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Outpace is a full-spectrum business development partner based in Limerick, Ireland — not another marketing agency. We own your growth pipeline from strategy to execution.",
};

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
    desc: "Strategy without execution is a slideshow. We ship fast, iterate faster, and never settle for 'good enough.'",
  },
  {
    icon: Lightbulb,
    title: "Commercial Thinking",
    desc: "Every decision runs through one filter: does this generate revenue? If it doesn't move the needle, we don't do it.",
  },
];

const team = [
  {
    name: "Coming Soon",
    role: "Founder & Managing Director",
    bio: "Details coming soon.",
  },
  {
    name: "Coming Soon",
    role: "Head of Growth",
    bio: "Details coming soon.",
  },
  {
    name: "Coming Soon",
    role: "Creative Director",
    bio: "Details coming soon.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              About Outpace
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text max-w-4xl leading-tight">
              We&apos;re not an agency. We&apos;re your growth engine.
            </h1>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-text">
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
                <div className="p-6 rounded-2xl bg-brand-dark/80 border border-brand-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="text-brand-cyan-bright" size={20} />
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
                <div className="p-6 rounded-2xl bg-brand-dark/80 border border-brand-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="text-brand-cyan-bright" size={20} />
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
                How we operate
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-brand-dark/80 border border-brand-border/50 hover:border-brand-cyan/30 transition-colors h-full">
                  <v.icon className="text-brand-cyan-bright mb-4" size={28} />
                  <h3 className="text-xl font-bold text-brand-text">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-brand-muted leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                The Team
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
                The people behind Outpace
              </h2>
              <p className="mt-6 text-lg text-brand-muted">
                A lean, senior team with deep expertise across business
                development, technology, and creative.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-brand-dark/80 border border-brand-border/50 text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-cyan/10 mx-auto mb-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-cyan-bright">
                      {t.name[0]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-text">
                    {t.name}
                  </h3>
                  <p className="text-sm text-brand-cyan mt-1">{t.role}</p>
                  <p className="mt-3 text-sm text-brand-muted">{t.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
              Want to know more?
            </h2>
            <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
              We&apos;d love to hear about your business and explore how Outpace
              can help you grow.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-lg shadow-lg shadow-brand-cyan/25 transition-all duration-200 inline-flex items-center gap-2 text-lg"
              >
                Get in Touch
                <ArrowRight size={20} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
