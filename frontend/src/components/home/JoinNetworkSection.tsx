"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/Primitives";
import { Reveal } from "../ui/Reveal";

export const JoinNetworkSection: React.FC = () => {
  return (
    <section className="py-28 md:py-36 border-t border-bone-200/10 bg-carbon-950 relative overflow-hidden">
      {/* Decorative organic blurs inside background */}
      <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] organic-radial-glow opacity-30 pointer-events-none" />

      <Container className="text-center space-y-8 relative z-10 max-w-3xl">
        <Reveal delay={0.1} yOffset={20}>
          <span className="font-mono text-xs text-earth-400 font-bold uppercase tracking-widest block">
            Participation
          </span>
        </Reveal>

        <Reveal delay={0.25} yOffset={28}>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-bone-50 leading-[1.1] uppercase">
            The Network Grows Through Participation.
          </h2>
        </Reveal>

        <Reveal delay={0.35} yOffset={28}>
          <p className="font-sans text-sm md:text-base text-bone-100 leading-relaxed max-w-xl mx-auto font-normal">
            Whether you are a student, researcher, creative practitioner, educator, or simply curious—there is space to contribute.
          </p>
        </Reveal>

        <Reveal delay={0.5} className="pt-4">
          <Link
            href="/membership/become-a-member"
            className="group inline-flex items-center justify-center px-8 py-4 text-xs font-sans tracking-widest uppercase font-bold text-carbon-950 bg-bone-50 hover:bg-earth-600 hover:text-bone-50 transition-colors rounded-full focus:outline-none shadow-xl"
          >
            <span>Join the Network</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
};
