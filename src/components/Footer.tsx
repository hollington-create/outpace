"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LogoCloud from "@/components/LogoCloud";
import { FOOTER_LOGOS } from "@/lib/brand-logos";
import PartnerBadges from "@/components/PartnerBadges";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "What We Do", href: "/what-we-do" },
      { label: "Who We Are", href: "/who-we-are" },
      { label: "How We Do It", href: "/how-we-do-it" },
      { label: "Case Studies", href: "/case-studies/cube" },
    ],
  },
];

const serviceLinksLeft = [
  { label: "Business Analysis", href: "/services/business-analysis" },
  { label: "Lead Generation", href: "/services/lead-generation" },
  { label: "Digital Presence", href: "/services/digital-presence" },
  { label: "Systems & Operations", href: "/services/systems-operations" },
  { label: "Content & Video", href: "/services/content-video" },
];

const serviceLinksRight = [
  { label: "AI Growth Tools", href: "/services/ai-growth-tools" },
  { label: "Sales Enablement", href: "/services/sales-enablement" },
  { label: "Customer Retention", href: "/services/customer-retention" },
  { label: "Brand Positioning", href: "/services/brand-positioning" },
  { label: "Partnerships", href: "/services/partnerships" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-darkest border-t border-brand-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl tracking-tight text-shimmer inline-block">
              <span className="font-extrabold">OUT</span><span className="font-light">PACE</span><span className="text-brand-cyan-bright font-extrabold">.</span>
            </Link>
            <p className="mt-4 text-brand-muted max-w-md leading-relaxed">
              Full-spectrum business development for companies that want to grow
              strategically, not just spend more on marketing.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-brand-muted">
              <span>Unit B3, Eastway Business Park, Ballysimon, Co. Limerick V94 AX99, Ireland</span>
              <a
                href="mailto:hello@outpace.ie"
                className="hover:text-brand-cyan-bright transition-colors"
              >
                hello@outpace.ie
              </a>
              <a
                href="tel:+353874405321"
                className="hover:text-brand-cyan-bright transition-colors"
              >
                +353 87 440 5321
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-brand-text uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-muted hover:text-brand-cyan-bright transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Services — split across two columns */}
          <div>
            <h3 className="text-sm font-semibold text-brand-text uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinksLeft.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-cyan-bright transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-text uppercase tracking-wider md:invisible">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinksRight.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-cyan-bright transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <LogoCloud
              logos={FOOTER_LOGOS}
              title="Integrated With"
              size={20}
            />
            <div>
              <p className="text-xs text-brand-muted uppercase tracking-wider mb-3">Certified Partner</p>
              <PartnerBadges />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-muted">
            &copy; {new Date().getFullYear()} Outpace. All rights reserved.
          </p>
          <p className="text-sm text-brand-muted">
            Based in Limerick. Working globally.
          </p>
        </div>
      </div>
    </footer>
  );
}
