"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiFacebook, SiX, SiInstagram } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import AnimatedSection from "@/components/AnimatedSection";

const platforms = [
  {
    name: "Facebook",
    icon: SiFacebook,
    color: "#1877F2",
    url: "https://www.facebook.com/cube.irish/",
    stat: "Brand Awareness",
  },
  {
    name: "X / Twitter",
    icon: SiX,
    color: "#ffffff",
    url: "https://x.com/Cube_irish",
    stat: "Industry Updates",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    color: "#E4405F",
    url: "https://www.instagram.com/cube.irish/",
    stat: "Visual Content",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    color: "#0A66C2",
    url: "https://www.linkedin.com/company/cubeirish/",
    stat: "B2B Engagement",
  },
];

export default function SocialMediaGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {platforms.map((platform, i) => (
        <AnimatedSection key={platform.name} delay={i * 0.08}>
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div
              className="relative p-6 sm:p-8 rounded-2xl bg-brand-dark/80 border border-brand-border/50 text-center group cursor-pointer overflow-hidden"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Accent line top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: platform.color }}
              />

              <div className="flex justify-center mb-4">
                <platform.icon
                  size={32}
                  className="transition-colors duration-300"
                  style={{ color: "rgb(148 163 184 / 0.5)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as SVGElement).style.color = platform.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as SVGElement).style.color = "rgb(148 163 184 / 0.5)";
                  }}
                />
              </div>

              <p className="text-sm font-semibold text-brand-text mb-1">
                {platform.name}
              </p>
              <p className="text-xs text-brand-muted">{platform.stat}</p>

              <ExternalLink
                size={12}
                className="absolute top-3 right-3 text-brand-muted/30 group-hover:text-brand-muted/60 transition-colors"
              />
            </motion.div>
          </a>
        </AnimatedSection>
      ))}
    </div>
  );
}
