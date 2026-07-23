"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "../layout/Primitives";
import { Reveal } from "../ui/Reveal";

export const FeaturedLectureSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 border-t border-bone-200/5 bg-carbon-950/40 relative">
      <Container className="space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest block">
            Archived Knowledge
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-bone-50">
            Featured Masterclass
          </h2>
        </div>

        {/* Visual player block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <Reveal className="col-span-12 lg:col-span-8 w-full" yOffset={32}>
            <div className="aspect-video w-full rounded-xl bg-carbon-900 border border-bone-200/10 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl">
              <div className="absolute inset-0 digital-grid opacity-30 group-hover:scale-105 transition-transform duration-700" />
              
              {/* Glowing Play circle */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-bone-50 text-carbon-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-5 h-5 fill-current ml-1" />
              </div>

              {/* Atmospheric overlay */}
              <div className="absolute inset-0 bg-carbon-950/40 group-hover:bg-carbon-950/20 transition-colors duration-300" />
              
              <span className="font-mono text-[9px] text-bone-200/30 tracking-widest uppercase absolute bottom-4 z-10">
                Watch Presentation (External Link Placeholder)
              </span>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Reveal delay={0.2} className="space-y-2">
              <span className="font-mono text-[10px] text-moss-500 font-semibold uppercase tracking-wider block">
                Recorded Masterclass
              </span>
              <h3 className="font-serif text-2xl font-bold text-bone-50 leading-tight">
                Subjectivities in the Anthropocene
              </h3>
              <span className="font-mono text-[10px] text-bone-200/40 block">
                By Dr. Elena Rostova — 48 minutes
              </span>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-sans text-xs sm:text-sm text-bone-200/60 leading-relaxed">
                Exploring posthuman subjectivity, agential realism, and biological citizenship. Elena Rostova analyzes Karen Barad&apos;s physical theories and Donna Haraway&apos;s planetary co-dependence models.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <Link
                href="/media/youtube-lectures"
                className="group inline-flex items-center space-x-3 text-xs font-sans tracking-widest uppercase font-bold text-bone-100 hover:text-moss-400 transition-colors focus:outline-none"
              >
                <span>Watch Lecture</span>
                <div className="p-2.5 bg-carbon-900 group-hover:bg-moss-500 text-bone-200/30 group-hover:text-bone-50 transition-colors rounded-full">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
