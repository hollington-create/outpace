"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ParticleField from "@/components/ParticleField";
import GlowOrb from "@/components/GlowOrb";
import MagneticButton from "@/components/MagneticButton";

/* ── Heading words (** = accent) ── */
const headingWords = [
  "We", "don\u2019t", "just", "market", "your",
  "business.", "We", "**grow**", "it.",
];

/* ── Framer variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.9 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.3, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 100, damping: 15, mass: 0.8 },
  },
};

const growWordVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.3, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 80, damping: 12, mass: 1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

const subtitleLetterVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.03, delay: 0.6 + i * 0.02 },
  }),
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms for geometric layer
  const geoX = useTransform(mouseX, [-500, 500], [15, -15]);
  const geoY = useTransform(mouseY, [-500, 500], [15, -15]);
  // Lighter parallax for content
  const contentX = useTransform(mouseX, [-500, 500], [5, -5]);
  const contentY = useTransform(mouseY, [-500, 500], [5, -5]);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (isTouch) return;

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const subtitle = "FULL-SPECTRUM BUSINESS DEVELOPMENT";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Layer 0: Dark base ── */}
      <div className="absolute inset-0 bg-brand-darkest" />

      {/* ── Layer 1: Gradient mesh blobs ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-[-20%] left-[-15%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)] animate-morph" />
        <div className="absolute bottom-[-25%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.06)_0%,transparent_70%)] animate-morph" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.07)_0%,transparent_70%)] animate-morph" style={{ animationDelay: "-5s" }} />
      </motion.div>

      {/* ── Layer 2: Particle field ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        <ParticleField />
      </motion.div>

      {/* ── Layer 3: Geometric rings + orbiting dots ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{ x: geoX, y: geoY }}
      >
        {/* Outer ring */}
        <svg
          className="absolute w-[600px] h-[600px] sm:w-[750px] sm:h-[750px] lg:w-[900px] lg:h-[900px] animate-spin-slow"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle
            cx="200" cy="200" r="190"
            stroke="rgba(34, 211, 238, 0.06)"
            strokeWidth="0.5"
            strokeDasharray="8 12"
          />
        </svg>

        {/* Inner ring (counter-rotate) */}
        <svg
          className="absolute w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px]"
          style={{ animation: "spin-slow 30s linear infinite reverse" }}
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle
            cx="200" cy="200" r="190"
            stroke="rgba(52, 211, 153, 0.05)"
            strokeWidth="0.5"
            strokeDasharray="4 16"
          />
        </svg>

        {/* Accent line — draws from center */}
        <motion.div
          className="absolute w-[200px] sm:w-[300px] lg:w-[400px] h-[1px]"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{ top: "38%" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
        </motion.div>

        {/* Orbiting dots */}
        <div className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] lg:w-[800px] lg:h-[800px] animate-orbit-1">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-cyan/40 shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
        </div>
        <div className="absolute w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] lg:w-[700px] lg:h-[700px] animate-orbit-2">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-emerald/40 shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
        </div>
        <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] animate-orbit-3">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 rounded-full bg-[#D4A014]/50 shadow-[0_0_6px_rgba(212,160,20,0.4)]" />
        </div>
      </motion.div>

      {/* ── Layer 4: GlowOrbs ── */}
      <GlowOrb color="rgba(34, 211, 238, 0.12)" size={600} top="-20%" left="-10%" duration={10} />
      <GlowOrb color="rgba(52, 211, 153, 0.08)" size={500} bottom="-20%" right="-10%" delay={2} duration={12} />
      <GlowOrb color="rgba(8, 145, 178, 0.1)" size={300} top="40%" right="20%" delay={4} duration={9} />

      {/* ── Layer 4.5: Giant "OUTPACE" — cinematic reveal then fade behind ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0.12],
          scale: [0.6, 1, 1, 1.15],
          filter: [
            "blur(20px)",
            "blur(0px)",
            "blur(0px)",
            "blur(4px)",
          ],
        }}
        transition={{
          duration: 3.2,
          times: [0, 0.25, 0.55, 1],
          ease: "easeInOut",
          delay: 0.1,
        }}
        style={{ x: geoX, y: geoY }}
      >
        <span
          className="text-[20vw] sm:text-[18vw] lg:text-[16vw] font-black tracking-tighter select-none whitespace-nowrap"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(34,211,238,0.9) 0%, rgba(52,211,153,0.6) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          OUTPACE
        </span>
      </motion.div>

      {/* ── Layer 5: Content ── */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-20"
        style={{ x: contentX, y: contentY }}
      >
        {/* Subtitle — letter-by-letter reveal */}
        <div className="mb-6 overflow-hidden" aria-label={subtitle}>
          {subtitle.split("").map((char, i) => (
            <motion.span
              key={i}
              className="text-brand-cyan-bright font-semibold text-sm tracking-widest uppercase inline-block"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={subtitleLetterVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Main heading — word-by-word fly-in */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold font-display tracking-tight leading-[1.1] text-brand-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {headingWords.map((word, i) => {
            const isAccent = word.startsWith("**") && word.endsWith("**");
            const cleanWord = isAccent ? word.slice(2, -2) : word;

            if (isAccent) {
              return (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em] relative"
                  variants={growWordVariants}
                >
                  <span className="relative">
                    <span className="bg-gradient-to-r from-brand-cyan-bright via-brand-emerald to-brand-cyan-bright bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                      {cleanWord}
                    </span>
                    {/* Glow burst behind the word */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-brand-cyan-bright to-brand-emerald bg-clip-text text-transparent blur-[20px] pointer-events-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0, 0.8, 0.3], scale: [0.8, 1.2, 1] }}
                      transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
                      aria-hidden
                    >
                      {cleanWord}
                    </motion.span>
                  </span>
                </motion.span>
              );
            }

            return (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                variants={wordVariants}
              >
                {cleanWord}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-8 text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed"
          custom={1.8}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          Strategy, lead generation, sales enablement, content, retention, and digital
          presence — all under one roof. One partner. One pipeline. Real revenue.
        </motion.p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div
            custom={2.1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <MagneticButton>
              <Link
                href="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 text-lg shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40 hover:scale-[1.02] btn-ripple"
              >
                Book a Discovery Call
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
          </motion.div>
          <motion.div
            custom={2.3}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <MagneticButton>
              <Link
                href="/what-we-do"
                className="px-8 py-4 border border-brand-border hover:border-brand-cyan/50 text-brand-muted hover:text-white font-semibold rounded-lg transition-all duration-300 text-lg hover:bg-white/5"
              >
                Explore Services
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-border rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-muted rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
