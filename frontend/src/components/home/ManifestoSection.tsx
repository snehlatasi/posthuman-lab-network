"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "../layout/Primitives";
import { Reveal } from "../ui/Reveal";

export const ManifestoSection: React.FC = () => {
  return (
    <section 
      id="about-us"
      className="py-24 md:py-36 border-t border-carbon-950/8 dark:border-bone-50/12 relative bg-transparent transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative vertical thread & subtle Emerald atmospheric glow */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-carbon-950/10 dark:from-bone-200/10 via-earth-500/20 to-transparent pointer-events-none hidden md:block" />
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl pointer-events-none" />

      <Container className="grid grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column - Content */}
        <div className="col-span-12 lg:col-span-6 space-y-8 max-w-xl">
          <Reveal delay={0.1} yOffset={20}>
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.25em] block">
              WHO WE ARE
            </span>
          </Reveal>

          <Reveal delay={0.25} yOffset={30} className="space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-carbon-950 dark:text-bone-50 leading-[1.05] uppercase tracking-tight">
              Beyond Human.<br />Beyond Boundaries.
            </h2>
            <p className="font-sans text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
              Posthumanism should not remain limited to institutions, journals, or inaccessible academic spaces. The Posthuman Lab Network is an open-access global community exploring the shifting boundaries of human consciousness, technology, and ecology. By connecting researchers, students, and creative practitioners, we work to transition critical thought into active, lived experiments.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <Link
              href="/about"
              className="group inline-flex items-center space-x-3 text-xs font-sans tracking-widest uppercase font-bold text-carbon-950 dark:text-bone-50 hover:text-earth-600 dark:hover:text-earth-400 transition-colors focus:outline-none"
            >
              <span>Learn More</span>
              <div className="p-2.5 bg-bone-100 dark:bg-carbon-950 group-hover:bg-earth-600 dark:group-hover:bg-earth-500 text-carbon-950 dark:text-bone-100 group-hover:text-bone-50 transition-colors rounded-full border border-carbon-950/10 dark:border-bone-50/15">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </Reveal>
        </div>

        {/* Right Column - Circular Portal */}
        <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end">
          <Reveal delay={0.3} className="w-full max-w-md lg:max-w-lg">
            <div className="relative aspect-square w-full rounded-full overflow-hidden border border-bone-200/10 group cursor-pointer shadow-2xl">
              <Image 
                src="/circular_nature_portal.jpg" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.8] contrast-[1.05]" 
                alt="Nature Portal entering another way of thinking" 
              />
              {/* Inner ambient shadows */}
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/40 via-transparent to-carbon-950/40 z-10" />
              {/* Circular play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="p-5 rounded-full bg-carbon-950/80 border border-bone-200/10 text-moss-400 group-hover:bg-moss-500 group-hover:text-bone-50 group-hover:scale-110 transition-all duration-500">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
export default ManifestoSection;
