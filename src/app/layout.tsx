import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: {
    default: "Outpace | Full-Spectrum Business Development",
    template: "%s | Outpace",
  },
  description:
    "Outpace is a full-spectrum business development partner based in Limerick, Ireland. We handle strategy, lead generation, digital presence, systems, and content — so you can focus on growth.",
  keywords: [
    "business development",
    "lead generation",
    "digital marketing",
    "CRM implementation",
    "Limerick",
    "Ireland",
    "B2B",
    "growth partner",
  ],
  authors: [{ name: "Outpace" }],
  creator: "Outpace",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://outpace.ie",
    siteName: "Outpace",
    title: "Outpace | Full-Spectrum Business Development",
    description:
      "Your full-spectrum business development partner. Strategy, lead generation, digital presence, systems, and content — all under one roof.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outpace | Full-Spectrum Business Development",
    description:
      "Your full-spectrum business development partner. Strategy, lead generation, digital presence, systems, and content — all under one roof.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
