"use client";

import Image from "next/image";

interface PhoneMockupProps {
  screenshot?: string;
  className?: string;
  float?: boolean;
}

export default function PhoneMockup({
  screenshot,
  className = "",
  float = true,
}: PhoneMockupProps) {
  return (
    <div className={`${float ? "animate-float-slow" : ""} ${className}`}>
      <div className="relative w-[220px] sm:w-[260px] rounded-[2.5rem] border-[3px] border-[#333] bg-[#111] shadow-2xl shadow-black/50 p-2">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-[#111] rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden aspect-[9/19.5]">
          {screenshot ? (
            <div className="relative w-full h-full bg-[#111]">
              <Image
                src={screenshot}
                alt="Mobile website screenshot"
                fill
                className="object-contain object-top"
                sizes="260px"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#151515] via-[#1a1a1a] to-[#111] flex flex-col items-center justify-center px-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4A014]/20 flex items-center justify-center mb-3">
                <span className="text-[#D4A014] font-extrabold text-lg">C</span>
              </div>
              <div className="w-3/4 h-2 bg-white/[0.08] rounded-full mb-2" />
              <div className="w-1/2 h-2 bg-white/[0.05] rounded-full mb-6" />
              <div className="w-full space-y-3">
                <div className="h-16 rounded-lg bg-white/[0.04]" />
                <div className="h-16 rounded-lg bg-white/[0.04]" />
                <div className="h-16 rounded-lg bg-white/[0.04]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
