"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { MagneticButton } from "../ui/Magnetic";
import { Container } from "../layout/Primitives";

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-28 md:pt-32 pb-12 transition-colors duration-300"
    >
      {/* Dynamic Theme Atmospheric Background Overlay */}
      <div className="absolute inset-0 organic-mesh opacity-20 z-0 pointer-events-none" />

      {/* Side Gradient Mask for text legibility */}
      <div className="absolute inset-0 hero-readability-mask z-10 pointer-events-none transition-colors duration-500" />

      {/* Vertical Scroll Indicator */}
      <div className="absolute left-6 bottom-24 hidden xl:flex flex-col items-center space-y-4 z-20 select-none pointer-events-none">
        <span
          className="font-mono text-[10px] tracking-[0.25em] text-bone-100/70 font-bold uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
          style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
        >
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-bone-100/45 to-transparent relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#9ff8ff] animate-pulse shadow-[0_0_18px_rgba(159,248,255,0.8)]" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex-grow flex items-center relative z-20 py-10 md:py-14">
        <Container className="grid grid-cols-12 gap-8 items-center w-full">
          <div className="col-span-12 lg:col-span-6 space-y-6 text-left max-w-[39rem] pr-0 lg:pr-6">
            <span className="font-mono text-[11px] sm:text-xs text-[#ffb08f] font-bold uppercase tracking-[0.22em] block mb-2">
              A GLOBAL COLLABORATIVE SPACE FOR
            </span>

            <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl font-bold text-[#fbfeff] leading-[1] uppercase text-balance drop-shadow-[0_10px_34px_rgba(0,0,0,0.42)]">
              POSTHUMAN FUTURES
            </h1>

            <p className="font-sans text-base md:text-lg text-[#e3f0f3] leading-[1.75] font-medium max-w-[34rem] drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
              Connecting thought, creativity, education and research across boundaries. Together we
              question, imagine and create more livable futures.
            </p>

            <div className="pt-5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
              <MagneticButton strength={0.35}>
                <Link
                  href="/about"
                  className="inline-flex min-h-12 items-center justify-center px-6 py-3 text-xs font-sans tracking-widest uppercase font-bold text-carbon-950 bg-bone-50 hover:bg-[#9ff8ff] transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-300/50 shadow-[0_18px_40px_-26px_rgba(155,248,255,0.8)]"
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
                  className="inline-flex min-h-12 items-center space-x-2.5 px-1 sm:px-4 py-3 text-xs font-sans tracking-widest uppercase font-bold text-[#f8fdff] hover:text-[#9ff8ff] transition-colors focus:outline-none cursor-pointer"
                >
                  <div className="p-2 border border-bone-50/20 rounded-full bg-carbon-950/70 shadow-sm">
                    <Play className="w-3 h-3 fill-[#f8fdff] text-[#f8fdff]" />
                  </div>
                  <span>Watch Intro</span>
                </button>
              </MagneticButton>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 relative h-[35vh] lg:hidden w-full flex items-center justify-center pointer-events-none" />
        </Container>
      </div>
    </section>
  );
};
