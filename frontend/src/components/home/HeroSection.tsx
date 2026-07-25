"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { MagneticButton } from "../ui/Magnetic";
import { SplitText } from "../ui/Reveal";
import { Container } from "../layout/Primitives";

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useSafeReducedMotion();

  const elementVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: customDelay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-28 pb-12 transition-colors duration-300"
    >
      {/* Dynamic Theme Atmospheric Background Overlay */}
      <div className="absolute inset-0 organic-mesh opacity-20 z-0 pointer-events-none" />

      {/* Side Gradient Mask for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-carbon-950/88 via-carbon-950/30 to-transparent z-10 pointer-events-none transition-colors duration-500" />

      {/* Vertical Scroll Indicator */}
      <div className="absolute left-6 bottom-24 hidden xl:flex flex-col items-center space-y-4 z-20 select-none pointer-events-none">
        <span
          className="font-mono text-[10px] tracking-[0.25em] text-[#3a2e28] dark:text-[#9e988b] font-bold uppercase"
          style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
        >
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#120e0c]/40 dark:from-bone-100/40 to-transparent relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-earth-600 dark:bg-earth-400 animate-pulse" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex-grow flex items-center relative z-20 py-12">
        <Container className="grid grid-cols-12 gap-8 items-center w-full">
          <div className="col-span-12 lg:col-span-6 space-y-6 text-left max-w-xl pr-4">
            <motion.span
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-mono text-xs text-[#ff9a76] font-bold uppercase tracking-[0.25em] block mb-2"
            >
              A GLOBAL COLLABORATIVE SPACE FOR
            </motion.span>

            <SplitText
              text="POSTHUMAN FUTURES"
              as="h1"
              delay={0.2}
              stagger={0.06}
              className="font-serif-display text-5xl sm:text-6xl md:text-7xl font-bold text-[#f8fdff] leading-[0.92] tracking-tight uppercase"
            />

            <motion.p
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="font-sans text-base md:text-lg text-[#d9e8ee] leading-relaxed font-medium"
            >
              Connecting thought, creativity, education and research across boundaries. Together we
              question, imagine and create more livable futures.
            </motion.p>

            <motion.div
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              custom={0.55}
              className="pt-6 flex flex-wrap gap-4 items-center"
            >
              <MagneticButton strength={0.35}>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-sans tracking-widest uppercase font-semibold text-carbon-950 bg-bone-50 hover:bg-[#9ff8ff] transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-300/50 shadow-md"
                >
                  Explore the Network
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <button
                  type="button"
                  onClick={() => {
                    const target = document.getElementById("about-us");
                    if (target) {
                      target.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
                    }
                  }}
                  className="inline-flex items-center space-x-2.5 px-6 py-3.5 text-xs font-sans tracking-widest uppercase font-semibold text-[#f8fdff] hover:text-[#9ff8ff] transition-colors focus:outline-none cursor-pointer"
                >
                  <div className="p-2 border border-bone-50/20 rounded-full bg-carbon-950/70 shadow-sm">
                    <Play className="w-3 h-3 fill-[#f8fdff] text-[#f8fdff]" />
                  </div>
                  <span>Watch Intro</span>
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-6 relative h-[35vh] lg:hidden w-full flex items-center justify-center pointer-events-none" />
        </Container>
      </div>
    </section>
  );
};
