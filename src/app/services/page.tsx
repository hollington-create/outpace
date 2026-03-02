import { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From consultative business analysis to AI-powered outbound calling — explore the full range of business development services Outpace delivers.",
};

const pillars = [
  {
    id: "analysis",
    number: "01",
    title: "Consultative Business Analysis",
    subtitle: "Understand before you act",
    desc: "Before we launch a single campaign, we sit with your team and learn your business inside-out. We document your unique selling points, map your competitive landscape, and identify the markets where you'll win.",
    features: [
      {
        icon: Search,
        text: "Deep-dive business audit and USP documentation",
      },
      {
        icon: Users,
        text: "Target market identification and segmentation",
      },
      {
        icon: BarChart3,
        text: "Competitive landscape analysis",
      },
      {
        icon: CheckCircle2,
        text: "Growth opportunity roadmap with clear priorities",
      },
    ],
  },
  {
    id: "leads",
    number: "02",
    title: "Outbound Lead Generation",
    subtitle: "Fill your pipeline with qualified prospects",
    desc: "We build and execute multi-channel outbound campaigns that put your offer in front of the right decision-makers. From scraped prospect lists to AI-powered calling, we handle the entire top-of-funnel.",
    features: [
      {
        icon: Mail,
        text: "B2B email sequences with personalised copy",
      },
      {
        icon: Phone,
        text: "AI-powered outbound calling at scale",
      },
      {
        icon: Users,
        text: "Scraped and verified prospect lists",
      },
      {
        icon: CalendarCheck,
        text: "Meeting booking and handoff to your sales team",
      },
    ],
  },
  {
    id: "digital",
    number: "03",
    title: "Digital Presence",
    subtitle: "Look as good as you are",
    desc: "Your digital presence should work as hard as your sales team. We build high-converting websites, run targeted ad campaigns, manage your social channels, and make sure you're found when prospects search for what you do.",
    features: [
      {
        icon: Globe,
        text: "Website development and landing pages",
      },
      {
        icon: FileCode,
        text: "Search engine optimisation (SEO)",
      },
      {
        icon: Megaphone,
        text: "Paid advertising (Google, LinkedIn, Meta)",
      },
      {
        icon: Share2,
        text: "Social media management and content",
      },
    ],
  },
  {
    id: "systems",
    number: "04",
    title: "Systems & Operations",
    subtitle: "Build the machine that scales",
    desc: "Growth without systems is chaos. We implement CRMs, streamline your customer service, and build operational processes that let your team focus on what matters — closing deals and serving clients.",
    features: [
      {
        icon: Settings,
        text: "CRM implementation and customisation",
      },
      {
        icon: HeadphonesIcon,
        text: "Customer service consulting and training",
      },
      {
        icon: Workflow,
        text: "Process mapping and efficiency improvements",
      },
      {
        icon: BarChart3,
        text: "Reporting dashboards and KPI tracking",
      },
    ],
  },
  {
    id: "content",
    number: "05",
    title: "Content & Video",
    subtitle: "Tell your story with impact",
    desc: "People buy from companies they trust. We produce professional video content — management interviews, client testimonials, facility tours — and build a content strategy that positions you as the authority in your space.",
    features: [
      {
        icon: Mic,
        text: "Management interview series",
      },
      {
        icon: Video,
        text: "Client testimonial videos",
      },
      {
        icon: Camera,
        text: "Facility tours and brand films",
      },
      {
        icon: Share2,
        text: "Brand storytelling and content strategy",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-brand-cyan-bright font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Our Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text max-w-4xl leading-tight">
              Everything you need to grow. Nothing you don&apos;t.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl leading-relaxed">
              Five integrated service pillars that cover the entire business
              development lifecycle — from understanding your market to filling
              your pipeline to closing deals.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Pillars */}
      {pillars.map((pillar, idx) => (
        <section
          key={pillar.id}
          id={pillar.id}
          className="py-24 sm:py-32 bg-brand-dark"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <AnimatedSection>
                <span className="text-6xl font-extrabold text-brand-cyan/10">
                  {pillar.number}
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-brand-text">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-brand-cyan-bright font-medium">
                  {pillar.subtitle}
                </p>
                <p className="mt-6 text-brand-muted leading-relaxed text-lg">
                  {pillar.desc}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="space-y-4">
                  {pillar.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 rounded-xl bg-brand-dark/80 border border-brand-border/30 hover:border-brand-cyan/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex-shrink-0 flex items-center justify-center">
                        <f.icon className="text-brand-cyan-bright" size={20} />
                      </div>
                      <p className="text-brand-text font-medium pt-1.5">
                        {f.text}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text">
              Not sure what you need?
            </h2>
            <p className="mt-6 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
              That&apos;s exactly why we start with a discovery call. We&apos;ll
              figure out where the biggest opportunities are and build a plan
              around them.
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
