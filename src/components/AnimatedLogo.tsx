"use client";

import { useState, useCallback } from "react";

interface AnimatedLogoProps {
  className?: string;
}

const letters = [
  { char: "O", bold: true },
  { char: "U", bold: true },
  { char: "T", bold: true },
  { char: "P", bold: false },
  { char: "A", bold: false },
  { char: "C", bold: false },
  { char: "E", bold: false },
  { char: ".", bold: true, accent: true },
];

export default function AnimatedLogo({ className = "" }: AnimatedLogoProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getLetterStyle = useCallback(
    (index: number) => {
      if (hoveredIndex === null) return { letterSpacing: "0px" };

      const distance = Math.abs(index - hoveredIndex);

      if (distance === 0) {
        return {
          transform: "scaleX(1.2) scaleY(1.15)",
          letterSpacing: "3px",
        };
      }
      if (distance === 1) {
        return {
          transform: "scaleX(1.1) scaleY(1.05)",
          letterSpacing: "2px",
        };
      }
      if (distance === 2) {
        return {
          letterSpacing: "1px",
        };
      }
      return { letterSpacing: "0px" };
    },
    [hoveredIndex]
  );

  return (
    <span
      className={`tracking-tight text-shimmer inline-flex ${className}`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          onMouseEnter={() => setHoveredIndex(i)}
          className={`inline-block transition-all duration-200 ease-out cursor-default ${
            letter.accent
              ? "text-brand-cyan-bright font-extrabold"
              : letter.bold
              ? "font-extrabold"
              : "font-light"
          }`}
          style={getLetterStyle(i)}
        >
          {letter.char}
        </span>
      ))}
    </span>
  );
}
