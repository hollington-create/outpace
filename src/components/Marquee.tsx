"use client";

const defaultItems = [
  "STRATEGY",
  "LEAD GENERATION",
  "DIGITAL PRESENCE",
  "SYSTEMS",
  "CONTENT",
  "GROWTH",
  "AI-POWERED",
  "CRM",
  "OUTBOUND",
  "ANALYTICS",
];

interface MarqueeProps {
  items?: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const displayItems = items || defaultItems;
  const content = displayItems.map((item, i) => (
    <span key={i} className="flex items-center gap-8">
      <span className="text-brand-cyan-bright/20 font-display font-bold text-xl tracking-[0.2em] whitespace-nowrap">
        {item}
      </span>
      <span className="w-2 h-2 rounded-full bg-brand-cyan/30 shrink-0" />
    </span>
  ));

  return (
    <div className="relative overflow-hidden py-6 border-y border-brand-border/30 bg-brand-darkest">
      <div className="marquee-track flex items-center gap-8">
        <div className="flex items-center gap-8 animate-marquee">{content}</div>
        <div className="flex items-center gap-8 animate-marquee" aria-hidden>{content}</div>
      </div>
    </div>
  );
}
