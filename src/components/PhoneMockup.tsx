"use client";

import { ReactNode } from "react";

interface PhoneMockupProps {
  children?: ReactNode;
  className?: string;
  float?: boolean;
}

export default function PhoneMockup({
  children,
  className = "",
  float = true,
}: PhoneMockupProps) {
  return (
    <div className={`${float ? "animate-float-slow" : ""} ${className}`}>
      <div className="relative w-[220px] sm:w-[260px] rounded-[2.5rem] border-[3px] border-brand-border/60 bg-brand-darkest shadow-2xl shadow-black/50 p-2">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-brand-darkest rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden aspect-[9/19.5] bg-gradient-to-br from-[#0f1629] via-[#121a30] to-[#0a0f1a]">
          {children || (
            <div className="w-full h-full flex flex-col items-center justify-center px-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4A014]/20 flex items-center justify-center mb-3">
                <span className="text-[#D4A014] font-extrabold text-lg">C</span>
              </div>
              <div className="w-3/4 h-2 bg-brand-border/30 rounded-full mb-2" />
              <div className="w-1/2 h-2 bg-brand-border/20 rounded-full mb-6" />
              <div className="w-full space-y-3">
                <div className="h-16 rounded-lg bg-brand-border/10" />
                <div className="h-16 rounded-lg bg-brand-border/10" />
                <div className="h-16 rounded-lg bg-brand-border/10" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
