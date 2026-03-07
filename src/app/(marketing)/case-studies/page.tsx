import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import AccentHeading from "@/components/AccentHeading";
import GlowOrb from "@/components/GlowOrb";
import { ArrowRight, Factory, MapPin, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | Outpace",
  description:
    "See how Outpace delivers full-spectrum business development results for clients across Ireland and beyond.",
};

const cases = [
  {
    slug: "cube",
    name: "Cube Printing",
    tagline: "From local printer to med-tech powerhouse",
    description:
      "How we helped a Limerick-based printing company break into the med-tech market with outbound, video, web, social, and AI.",
    icon: "/images/cube-icon-new.png",
    tags: ["MedTech", "ISO 9001", "Limerick"],
    tagIcons: [Factory, Shield, MapPin],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-brand-darkest overflow-hidden">
        <GlowOrb color="rgba(34, 211, 238, 0.05)" size={400} top="-100px" right="-150px" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Our Work
            </p>
          </AnimatedSection>
          <AccentHeading
            as="h1"
            text="Case **Studies.**"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text"
          />
          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-lg text-brand-muted max-w-2xl leading-relaxed">
              Real results from real engagements. See how we help companies
              grow with full-spectrum business development.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Case study cards */}
      <section className="py-20 sm:py-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {cases.map((cs) => (
              <AnimatedSection key={cs.slug}>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group block p-8 sm:p-10 rounded-2xl bg-brand-darkest/60 border border-brand-border/50 hover:border-brand-cyan/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#D4A014] flex-shrink-0">
                      <Image
                        src={cs.icon}
                        alt={cs.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-brand-text group-hover:text-brand-cyan-bright transition-colors">
                        {cs.name}
                      </h2>
                      <p className="text-brand-cyan-bright text-sm font-medium mt-1">
                        {cs.tagline}
                      </p>
                      <p className="text-brand-muted leading-relaxed mt-3 max-w-2xl">
                        {cs.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {cs.tags.map((tag, i) => {
                          const Icon = cs.tagIcons[i];
                          return (
                            <span
                              key={tag}
                              className="flex items-center gap-1.5 text-xs text-brand-muted px-3 py-1.5 rounded-full border border-brand-border/30"
                            >
                              <Icon size={12} />
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <ArrowRight
                      size={24}
                      className="text-brand-muted group-hover:text-brand-cyan-bright group-hover:translate-x-1 transition-all flex-shrink-0 hidden sm:block"
                    />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <p className="mt-16 text-center text-brand-muted">
              More case studies coming soon.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
