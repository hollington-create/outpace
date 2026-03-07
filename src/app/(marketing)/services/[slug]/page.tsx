import { notFound } from "next/navigation";
import { SERVICE_CONFIGS } from "@/lib/service-page-configs";
import ServicePageContent from "./ServicePageContent";
import type { Metadata } from "next";

/* ───── Static generation ───── */
export function generateStaticParams() {
  return Object.keys(SERVICE_CONFIGS).map((slug) => ({ slug }));
}

/* ───── SEO metadata ───── */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const config = SERVICE_CONFIGS[params.slug];
  if (!config) return {};

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      type: "website",
    },
  };
}

/* ───── Page ───── */
export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const config = SERVICE_CONFIGS[params.slug];

  if (!config) {
    notFound();
  }

  /* ── FAQPage structured data for rich results ── */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicePageContent config={config} />
    </>
  );
}
