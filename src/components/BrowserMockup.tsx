"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

interface BrowserMockupProps {
  url: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
  className?: string;
}

export default function BrowserMockup({
  url,
  title,
  subtitle,
  accentColor = "#D4A014",
  className = "",
}: BrowserMockupProps) {
  return (
    <AnimatedSection>
      <div className={`rounded-2xl overflow-hidden border border-brand-border/50 shadow-2xl shadow-black/40 ${className}`}>
        {/* Browser Chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-brand-darkest border-b border-brand-border/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-md bg-brand-dark/80 text-xs text-brand-muted font-mono">
              {url}
            </div>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* Browser Content */}
        <div className="relative aspect-[16/10] bg-gradient-to-br from-[#0f1629] via-[#121a30] to-[#0a0f1a] overflow-hidden">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(${accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${accentColor}40 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Header strip */}
          <div className="h-1 w-full" style={{ backgroundColor: accentColor, opacity: 0.6 }} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
            <motion.div
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3"
              style={{ color: accentColor }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {title}
            </motion.div>
            {subtitle && (
              <motion.p
                className="text-sm sm:text-base text-brand-muted/60 font-medium tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
