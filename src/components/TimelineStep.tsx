"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface TimelineStepProps {
  steps: Step[];
}

export default function TimelineStep({ steps }: TimelineStepProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-cyan via-brand-emerald to-brand-cyan/20" />

      <div className="space-y-8 sm:space-y-12">
        {steps.map((step, i) => (
          <AnimatedSection key={step.number} delay={i * 0.1}>
            <div className="relative flex gap-5 sm:gap-8">
              {/* Dot */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-darkest border-2 border-brand-cyan/50 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                >
                  <step.icon className="text-brand-cyan-bright" size={18} />
                </motion.div>
              </div>

              {/* Content */}
              <div className="pb-2">
                <span className="text-xs font-mono text-brand-cyan/60 uppercase tracking-wider">
                  Phase {step.number}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-brand-text mt-1">
                  {step.title}
                </h4>
                <p className="text-sm text-brand-muted mt-2 leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
