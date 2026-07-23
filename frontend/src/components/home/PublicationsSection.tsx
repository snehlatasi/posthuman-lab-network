"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { latestPublicationsList } from "@/data/homepage";
import { Container } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";

export const PublicationsSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 border-t border-bone-200/5 bg-carbon-900/5 relative">
      <Container className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
          <div className="space-y-4">
            <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest block">
              Recent Writing
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-bone-50">
              Latest Publications
            </h2>
          </div>
          <Link
            href="/publications"
            className="group inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-wider uppercase text-bone-100 hover:text-moss-400 transition-colors focus:outline-none"
          >
            <span>Explore Archive</span>
            <ArrowRight className="w-4 h-4 text-bone-200/20 group-hover:text-moss-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Publications rows */}
        <Reveal staggerChildren={0.12} className="border-t border-bone-200/10">
          {latestPublicationsList.map((pub, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <StaggerItem key={pub.title} yOffset={20}>
                <Link
                  href={pub.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-bone-200/10 group focus:outline-none transition-colors relative"
                >
                  <div 
                    className={`absolute inset-0 bg-carbon-900/30 -z-10 pointer-events-none transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Left: Category & title */}
                  <div className="space-y-1 md:max-w-2xl">
                    <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                      {pub.category}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-bone-100 group-hover:translate-x-1 transition-transform duration-300">
                      {pub.title}
                    </h3>
                  </div>

                  {/* Center: Author & Date */}
                  <div className="mt-4 md:mt-0 font-mono text-[10px] tracking-wider text-bone-200/40 uppercase">
                    By {pub.author} — {pub.date}
                  </div>

                  {/* Right: Arrow */}
                  <div className="mt-4 md:mt-0 flex justify-end">
                    <div className="p-2.5 bg-carbon-900 group-hover:bg-moss-500 text-bone-200/30 group-hover:text-bone-50 transition-colors rounded-full">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
};
