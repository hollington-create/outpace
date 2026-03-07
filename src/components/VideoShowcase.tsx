"use client";

import { motion } from "framer-motion";
import { Play, Users, MessageSquareQuote, Factory } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import TiltCard from "@/components/TiltCard";

const videos = [
  {
    title: "Leadership Series",
    description: "Management interviews showcasing industry expertise and vision.",
    icon: Users,
    gradient: "from-brand-cyan/20 via-brand-teal/10 to-transparent",
    accentColor: "text-brand-cyan-bright",
  },
  {
    title: "Client Testimonial",
    description: "Trust-building social proof from satisfied partners.",
    icon: MessageSquareQuote,
    gradient: "from-brand-emerald/20 via-brand-teal/10 to-transparent",
    accentColor: "text-brand-emerald",
  },
  {
    title: "Facility Tour",
    description: "Demonstrating world-class printing capabilities and equipment.",
    icon: Factory,
    gradient: "from-purple-500/20 via-brand-cyan/10 to-transparent",
    accentColor: "text-purple-400",
  },
];

export default function VideoShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {videos.map((video, i) => (
        <AnimatedSection key={video.title} delay={i * 0.1}>
          <TiltCard className="h-full">
            <div className={`relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${video.gradient} border border-brand-border/50 group cursor-pointer`}>
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ scale: 1.15 }}
                >
                  <Play className="text-white ml-1" size={24} fill="currentColor" />
                </motion.div>
              </div>

              {/* Icon watermark */}
              <video.icon
                className="absolute top-4 right-4 text-white/10"
                size={40}
              />
            </div>

            <div className="mt-4 px-1">
              <h4 className={`font-bold text-lg ${video.accentColor}`}>
                {video.title}
              </h4>
              <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                {video.description}
              </p>
            </div>
          </TiltCard>
        </AnimatedSection>
      ))}
    </div>
  );
}
