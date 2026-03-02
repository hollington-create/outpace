import { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ArrowRight,
  Mail,
  Video,
  Globe,
  Phone,
  Share2,
  Search,
  Building2,
  MapPin,
  Factory,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how Outpace helped Cube Printing break into the med-tech market with outbound campaigns, video content, a new website, and AI-powered calling.",
};

const results = [
  { value: "115", label: "Companies Targeted" },
  { value: "900+", label: "Contacts Reached" },
  { value: "3", label: "Video Series Produced" },
  { value: "New", label: "Website Launched" },
];

const deliverables = [
  {
    icon: Search,
    title: "Consultative Business Analysis",
    desc: "We spent time with the Cube Printing team documenting their unique selling points, understanding their capabilities, and identifying the med-tech sector as a high-value target market.",
  },
  {
    icon: Mail,
    title: "Targeted Email Campaigns",
    desc: "We built a custom prospect list of 115 med-tech companies across 900+ contacts and ran personalised B2B email sequences that secured meetings and opened doors.",
  },
  {
    icon: Video,
    title: "Professional Video Content",
    desc: "We produced three distinct video series: management interviews showcasing expertise, a client testimonial building trust, and a facility tour demonstrating capabilities.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "We designed and developed a new website that positions Cube Printing as a premium printing partner for the med-tech industry — clean, professional, conversion-focused.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Ongoing social media management to maintain brand visibility, share content, and engage with the target market across key platforms.",
  },
  {
    icon: Phone,
    title: "AI Outbound Calling",
    desc: "We implemented an AI-powered outbound calling service to follow up on email campaigns, qualify leads, and book meetings at scale.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Case Studies
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text max-w-4xl leading-tight">
              Real work. Real results.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl leading-relaxed">
              We don&apos;t talk in hypotheticals. Here&apos;s what full-spectrum
              business development looks like in practice.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Cube Printing Case Study */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Client Header */}
          <AnimatedSection>
            <div className="p-8 sm:p-12 rounded-2xl bg-brand-dark/80 border border-brand-border/50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                      <Building2 className="text-brand-cyan-bright" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-brand-text">
                        Cube Printing
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-brand-muted">
                        <MapPin size={14} />
                        <span>Limerick, Ireland</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Factory className="text-brand-cyan-bright" size={16} />
                    <span className="text-sm text-brand-cyan font-medium">
                      Med-Tech Printing Specialists
                    </span>
                  </div>
                  <p className="text-brand-muted leading-relaxed max-w-2xl">
                    Cube Printing is a Limerick-based printing company with deep
                    expertise in the med-tech sector. They needed a partner who
                    could help them break into new markets, generate qualified
                    leads, and build a brand that matched the quality of their
                    work.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Results Grid */}
          <AnimatedSection delay={0.1}>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map((r) => (
                <div
                  key={r.label}
                  className="p-6 rounded-2xl bg-brand-dark/80 border border-brand-border/50 text-center"
                >
                  <p className="text-3xl sm:text-4xl font-extrabold text-brand-cyan">
                    {r.value}
                  </p>
                  <p className="mt-2 text-sm text-brand-muted">{r.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* What We Delivered */}
          <div className="mt-20">
            <AnimatedSection>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-text text-center mb-12">
                What We Delivered
              </h3>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((d, i) => (
                <AnimatedSection key={d.title} delay={i * 0.08}>
                  <div className="p-8 rounded-2xl bg-brand-dark/80 border border-brand-border/50 hover:border-brand-cyan/30 transition-colors h-full">
                    <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-4">
                      <d.icon className="text-brand-cyan-bright" size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-brand-text">
                      {d.title}
                    </h4>
                    <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <AnimatedSection delay={0.2}>
            <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-brand-cyan/10 to-brand-emerald/5 border border-brand-cyan/20">
              <div className="flex items-start gap-4">
                <CheckCircle2
                  className="text-brand-cyan-bright flex-shrink-0 mt-1"
                  size={28}
                />
                <div>
                  <h3 className="text-xl font-bold text-brand-text">
                    The Outcome
                  </h3>
                  <p className="mt-3 text-brand-muted leading-relaxed">
                    Through our integrated approach, Cube Printing secured new
                    business in the med-tech sector, built a professional brand
                    presence across web and social, and established a repeatable
                    outbound system that continues to generate pipeline. This
                    is what full-spectrum business development delivers — not
                    just one piece of the puzzle, but the entire picture.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
              Want results like these?
            </h2>
            <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Every engagement starts with a conversation. Let&apos;s talk about
              your business and where the biggest opportunities are.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-lg shadow-lg shadow-brand-cyan/25 transition-all duration-200 inline-flex items-center gap-2 text-lg"
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
