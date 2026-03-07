"use client";

import { motion } from "framer-motion";

interface AccentHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}

/**
 * Renders headings with strategic bold/accent formatting.
 * Words wrapped in **double asterisks** get the accent color.
 * Usage: <AccentHeading text="What We **Do.**" />
 */
export default function AccentHeading({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: AccentHeadingProps) {
  // Parse text into segments: normal text and **accented** text
  const segments: { text: string; accent: boolean }[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), accent: false });
    }
    segments.push({ text: match[1], accent: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), accent: false });
  }

  // Split into individual words preserving accent state
  const words: { word: string; accent: boolean }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").filter(Boolean).forEach((word) => {
      words.push({ word, accent: seg.accent });
    });
  });

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {words.map((item, i) => (
          <motion.span
            key={i}
            className={`inline-block mr-[0.25em] ${
              item.accent ? "text-brand-cyan-bright" : ""
            }`}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.4,
                  delay: delay + i * 0.05,
                  ease: "easeOut",
                },
              },
            }}
          >
            {item.word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
