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

  return <ServicePageContent config={config} />;
}
