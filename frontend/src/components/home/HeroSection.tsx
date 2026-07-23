"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import dynamic from "next/dynamic";
import { Container } from "../layout/Primitives";

// Dynamically import Three.js scene with SSR disabled
const ImmersiveHero3D = dynamic(
  () => import("./ImmersiveHero3D").then((mod) => mod.ImmersiveHero3D),
  { ssr: false }
);

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
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    })
  };

  return (
    <section 
      id="hero"
      className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-28 pb-12 bg-carbon-950"
    >
      {/* Layer 1: Technical & Organic Mesh overlay */}
      <div className="absolute inset-0 organic-mesh opacity-30 z-0 pointer-events-none" />

      {/* Layer 2: Floating slow organic radial glows */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[8%] w-[45vw] h-[45vw] rounded-full bg-moss-600/5 blur-[120px] animate-glow-1" />
          <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-moss-500/10 blur-[130px] animate-glow-2" />
        </div>
      )}

      {/* Layer 3: High-DPI dynamic WebGL 3D Ecosystem */}
      <ImmersiveHero3D />

      {/* Layer 5: Soft ambient darkness gradients for headline safety */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon-950/25 via-transparent to-carbon-950 z-10 pointer-events-none" />

      {/* Left Vertical Scroll Indicator */}
      <div className="absolute left-6 bottom-24 hidden xl:flex flex-col items-center space-y-4 z-20 select-none pointer-events-none">
        <span 
          className="font-mono text-[9px] tracking-[0.25em] text-bone-200/40 uppercase"
          style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
        >
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-bone-200/20 to-transparent relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-moss-500 animate-pulse" />
        </div>
      </div>

      {/* Layer 6: Hero text details wrapper */}
      <div className="flex-grow flex items-center relative z-20 py-12">
        <Container className="grid grid-cols-12 gap-8 items-center w-full">
          {/* Left Column (40% width on desktop) */}
          <div className="col-span-12 lg:col-span-6 space-y-6 text-left max-w-xl pr-4">
            <motion.span
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-[0.25em] block mb-2"
            >
              A GLOBAL COLLABORATIVE SPACE FOR
            </motion.span>

            <motion.h1
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              custom={0.25}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-bone-50 leading-[1.02] uppercase"
            >
              POSTHUMAN<br />FUTURES
            </motion.h1>

            <motion.p
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="font-sans text-sm md:text-base text-bone-200/65 leading-relaxed"
            >
              Connecting thought, creativity, education and research across boundaries. Together we question, imagine and create more livable futures.
            </motion.p>

            {/* CTA Buttons Row */}
            <motion.div
              variants={elementVariants}
              initial="hidden"
              animate="visible"
              custom={0.55}
              className="pt-6 flex flex-wrap gap-4 items-center"
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-sans tracking-widest uppercase font-semibold text-carbon-950 bg-bone-100 hover:bg-moss-500 hover:text-bone-50 transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-moss-500/50"
              >
                Explore the Network
              </Link>
              
              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById("about-us");
                  if (target) {
                    target.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
                  }
                }}
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 text-xs font-sans tracking-widest uppercase font-semibold text-bone-100 hover:text-moss-400 transition-colors focus:outline-none"
              >
                <div className="p-2 border border-bone-200/20 rounded-full bg-carbon-900/40">
                  <Play className="w-3 h-3 fill-bone-100 text-bone-100" />
                </div>
                <span>Watch Intro</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column Spacer for Mobile spacing */}
          <div className="col-span-12 lg:col-span-6 relative h-[35vh] lg:hidden w-full flex items-center justify-center pointer-events-none" />
        </Container>
      </div>
    </section>
  );
};
