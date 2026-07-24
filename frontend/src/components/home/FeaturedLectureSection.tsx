"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, X, Sparkles } from "lucide-react";
import { Container } from "../layout/Primitives";
import { Reveal } from "../ui/Reveal";

export const FeaturedLectureSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 md:py-32 border-t border-bone-200/10 bg-carbon-950 relative">
      <Container className="space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-moss-300 font-bold uppercase tracking-widest block">
            Archived Knowledge
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-bone-50">
            Featured Masterclass & Live Telemetry
          </h2>
        </div>

        {/* Visual player block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <Reveal className="col-span-12 lg:col-span-8 w-full" yOffset={32}>
            <div
              onClick={() => setIsPlaying(true)}
              className="aspect-video w-full rounded-xl bg-carbon-900 border border-bone-200/15 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl"
            >
              <Image
                src="/posthuman_sculpture.jpg"
                alt="Masterclass Presentation"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/40 to-transparent" />
              
              {/* Glowing Play circle */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-moss-500 text-bone-50 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 border-2 border-bone-50/70">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>

              {/* Atmospheric overlay */}
              <span className="font-mono text-[10px] text-bone-50 font-bold tracking-widest uppercase absolute bottom-6 left-6 z-10 flex items-center space-x-2 bg-carbon-950/90 px-3.5 py-2 rounded-lg border border-bone-200/20">
                <Sparkles className="w-3.5 h-3.5 text-moss-300" />
                <span>Watch Recorded Masterclass (48 Min)</span>
              </span>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Reveal delay={0.2} className="space-y-2">
              <span className="font-mono text-[10px] text-moss-300 font-bold uppercase tracking-wider block">
                Recorded Masterclass
              </span>
              <h3 className="font-serif text-2xl font-bold text-bone-50 leading-tight">
                Subjectivities in the Anthropocene
              </h3>
              <span className="font-mono text-xs text-bone-200 font-semibold block">
                By Dr. Elena Rostova — 48 minutes
              </span>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-sans text-xs sm:text-sm text-bone-100 leading-relaxed font-normal">
                Exploring posthuman subjectivity, agential realism, and biological citizenship. Elena Rostova analyzes Karen Barad&apos;s physical theories and Donna Haraway&apos;s planetary co-dependence models.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <Link
                href="/media/youtube-lectures"
                className="group inline-flex items-center space-x-3 text-xs font-sans tracking-widest uppercase font-bold text-bone-50 hover:text-moss-300 transition-colors focus:outline-none"
              >
                <span>Browse Full Video Library</span>
                <div className="p-2.5 bg-carbon-900 group-hover:bg-moss-500 text-bone-50 transition-colors rounded-full border border-bone-200/20">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Video Modal Popup */}
      {isPlaying && (
        <div className="fixed inset-0 bg-carbon-950/90 backdrop-blur-xl z-[150] flex items-center justify-center p-4">
          <div className="max-w-4xl w-full space-y-4 relative">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute -top-10 right-0 text-bone-200/60 hover:text-bone-50 flex items-center space-x-1 font-mono text-xs cursor-pointer"
            >
              <X className="w-5 h-5" />
              <span>Close Video Player</span>
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-bone-200/20 bg-carbon-900 shadow-2xl relative">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Posthuman Masterclass"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
