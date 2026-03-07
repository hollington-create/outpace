"use client";

import { cloneElement } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { BrandLogoEntry } from "@/lib/brand-logos";

interface LogoCloudProps {
  logos: BrandLogoEntry[];
  title?: string;
  size?: number;
}

export default function LogoCloud({
  logos,
  title,
  size = 28,
}: LogoCloudProps) {
  return (
    <AnimatedSection>
      <div className="text-center">
        {title && (
          <p className="text-xs sm:text-sm text-brand-muted/60 uppercase tracking-[0.2em] mb-8 font-medium">
            {title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              className="group relative flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileHover={{ scale: 1.2, y: -3 }}
              title={logo.name}
            >
              <div
                className="transition-all duration-300"
                style={{
                  fontSize: size,
                  color: "rgb(148 163 184 / 0.4)",
                  filter: "grayscale(1) brightness(0.7)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = logo.brandColor;
                  el.style.filter = "grayscale(0) brightness(1)";
                  el.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "rgb(148 163 184 / 0.4)";
                  el.style.filter = "grayscale(1) brightness(0.7)";
                  el.style.opacity = "";
                }}
              >
                {cloneElement(logo.icon, { size } as Record<string, unknown>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
