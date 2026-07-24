"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/Primitives";
import { Reveal, SplitText } from "../ui/Reveal";
import { MagneticButton } from "../ui/Magnetic";

export const JoinNetworkSection: React.FC = () => {
  return (
    <section className="py-28 md:py-36 border-t border-carbon-950/8 dark:border-bone-50/12 bg-transparent relative overflow-hidden transition-colors duration-300">
      {/* Decorative organic blurs inside background */}
      <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] organic-radial-glow opacity-30 pointer-events-none" />

      <Container className="text-center space-y-8 relative z-10 max-w-3xl">
        <Reveal delay={0.1} yOffset={20}>
          <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.25em] block">
            PARTICIPATION
          </span>
        </Reveal>

        <SplitText
          text="The Network Grows Through Participation."
          as="h2"
          delay={0.2}
          stagger={0.05}
          className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-carbon-950 dark:text-bone-50 leading-[1.05] uppercase"
        />

        <Reveal delay={0.35} yOffset={28}>
          <p className="font-sans text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed max-w-xl mx-auto font-medium">
            Whether you are a student, researcher, creative practitioner, educator, or simply curious—there is space to contribute.
          </p>
        </Reveal>

        <Reveal delay={0.5} className="pt-4">
          <MagneticButton strength={0.35}>
            <Link
              href="/membership/become-a-member"
              className="group inline-flex items-center justify-center px-8 py-4 text-xs font-sans tracking-widest uppercase font-bold text-bone-50 bg-[#120e0c] dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 transition-colors rounded-full focus:outline-none shadow-xl"
            >
              <span>Join the Network</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </MagneticButton>
        </Reveal>
      </Container>
    </section>
  );
};
