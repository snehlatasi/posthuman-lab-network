"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { latestPublicationsList } from "@/data/homepage";
import { Container } from "../layout/Primitives";
import { Reveal, StaggerItem, SplitText } from "../ui/Reveal";

export const PublicationsSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 border-t border-carbon-950/8 dark:border-bone-50/12 bg-gradient-to-b from-[var(--section-gradient-from)] to-[var(--section-gradient-to)] relative transition-colors duration-300">
      <Container className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
          <div className="space-y-4">
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-widest block">
              Recent Writing
            </span>
            <SplitText
              text="Latest Publications"
              className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-carbon-950 dark:text-bone-100"
            />
          </div>
          <Link
            href="/publications"
            className="group inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-wider uppercase text-carbon-950 dark:text-bone-100 hover:text-earth-600 dark:hover:text-earth-400 transition-colors focus:outline-none"
          >
            <span>Explore Archive</span>
            <ArrowRight className="w-4 h-4 text-carbon-950 dark:text-bone-100 group-hover:text-earth-600 dark:group-hover:text-earth-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Publications rows */}
        <Reveal staggerChildren={0.12} className="border-t border-carbon-950/10 dark:border-bone-50/15">
          {latestPublicationsList.map((pub, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <StaggerItem key={pub.title} yOffset={20}>
                <Link
                  href={pub.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex flex-col md:flex-row md:items-center justify-between py-6 px-6 my-3 rounded-2xl bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 shadow-sm hover:shadow-md hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300 group focus:outline-none relative overflow-hidden"
                >
                  {/* Left: Category & title */}
                  <div className="space-y-1 md:max-w-2xl relative">
                    <span className="font-mono text-[10px] text-earth-600 dark:text-earth-400 tracking-wider font-bold uppercase block">
                      {pub.category}
                    </span>
                    <div className="relative inline-block">
                      <h3 className={`font-serif text-lg md:text-xl font-bold leading-snug transition-colors duration-300 ${
                        isHovered ? "text-earth-600 dark:text-earth-400" : "text-carbon-950 dark:text-bone-100"
                      }`}>
                        {pub.title}
                      </h3>
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 left-0 h-[1.5px] w-full bg-earth-600 dark:bg-earth-400 origin-left block"
                      />
                    </div>
                  </div>

                  {/* Center: Author & Date */}
                  <div className="mt-4 md:mt-0 font-sans text-xs font-bold tracking-wider text-carbon-950 dark:text-bone-200 uppercase">
                    By {pub.author} — {pub.date}
                  </div>

                  {/* Right: Arrow */}
                  <div className="mt-4 md:mt-0 flex justify-end">
                    <div className="p-2.5 bg-bone-50 dark:bg-carbon-950 group-hover:bg-earth-600 dark:group-hover:bg-earth-500 text-carbon-950 dark:text-bone-100 group-hover:text-bone-50 transition-colors rounded-full border border-carbon-950/10 dark:border-bone-50/15">
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
