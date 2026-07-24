"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conversationsList } from "@/data/homepage";
import { Container } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";

export const ConversationsSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="conversations" className="py-24 md:py-32 border-t border-carbon-950/8 dark:border-bone-50/12 bg-transparent relative transition-colors duration-300">
      <Container className="space-y-16">
        {/* Section Header - Standardized Layout & Typography */}
        <div className="max-w-xl space-y-4">
          <Reveal delay={0.1}>
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.25em] block">
              CURRENT FOCUS
            </span>
          </Reveal>
          <Reveal delay={0.25}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-carbon-950 dark:text-bone-50 leading-tight uppercase">
              Current Global Conversations
            </h2>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="font-sans text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium max-w-xl">
              The core threads framing our research, essays, and physical retreat workshops.
            </p>
          </Reveal>
        </div>

        {/* Structured Row List - 12 Column Aligned Grid */}
        <Reveal staggerChildren={0.12} className="border-t border-carbon-950/10 dark:border-bone-50/12 pt-2">
          {conversationsList.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <StaggerItem key={item.title} yOffset={20}>
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="grid grid-cols-12 gap-4 items-center py-6 px-6 my-3 rounded-2xl bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 shadow-sm hover:shadow-md hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300 group focus:outline-none relative"
                >
                  {/* Column 1: Index Number */}
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-mono text-xs text-carbon-900 dark:text-bone-200 group-hover:text-earth-600 dark:group-hover:text-earth-400 font-bold transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Column 2: Category Tag & Topic Title */}
                  <div className="col-span-10 sm:col-span-4 lg:col-span-4 space-y-1">
                    <span className="font-mono text-[10px] text-earth-600 dark:text-earth-400 tracking-wider font-bold uppercase block">
                      {item.tag}
                    </span>
                    <h3 className={`font-serif text-lg sm:text-xl md:text-2xl font-bold leading-snug transition-colors duration-300 ${
                      isHovered ? "text-earth-600 dark:text-earth-400" : "text-carbon-950 dark:text-bone-50"
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Column 3: Description - Aligned X Start & Controlled Max-Width */}
                  <div className="col-span-12 sm:col-span-6 lg:col-span-6 mt-2 sm:mt-0">
                    <p className="font-sans text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium max-w-xl">
                      {item.description}
                    </p>
                  </div>

                  {/* Column 4: Action Arrow */}
                  <div className="col-span-12 sm:col-span-1 lg:col-span-1 flex justify-end mt-2 sm:mt-0">
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

