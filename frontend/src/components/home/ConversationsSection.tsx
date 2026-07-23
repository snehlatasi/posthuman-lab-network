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
    <section id="conversations" className="py-24 md:py-32 border-t border-bone-200/5 bg-carbon-950/40 relative">
      <Container className="space-y-16">
        {/* Section Title */}
        <div className="max-w-2xl space-y-4">
          <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest block">
            Current Focus
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-bone-50">
            Current Global Conversations
          </h2>
          <p className="font-sans text-sm text-bone-200/60 leading-relaxed">
            The core threads framing our research, essays, and physical retreat workshops.
          </p>
        </div>

        {/* Row List */}
        <Reveal staggerChildren={0.12} className="border-t border-bone-200/10">
          {conversationsList.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <StaggerItem key={item.title} yOffset={24}>
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-bone-200/10 group focus:outline-none transition-colors relative"
                >
                  {/* Sliding hover background accent */}
                  <div 
                    className={`absolute inset-0 bg-carbon-900/30 -z-10 pointer-events-none transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  
                  {/* Left Column: Number, Title, Category */}
                  <div className="flex items-center space-x-6 md:space-x-12">
                    <span className="font-mono text-xs text-bone-200/30 group-hover:text-moss-500 transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                        {item.tag}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-bone-100 group-hover:translate-x-1.5 transition-transform duration-300">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Center Column: Description (fades/stretches on hover/viewport) */}
                  <div className="mt-4 md:mt-0 md:max-w-md lg:max-w-xl flex-grow md:px-8">
                    <p className="font-sans text-xs sm:text-sm text-bone-200/50 group-hover:text-bone-200/80 transition-colors leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Column: Arrow indicator */}
                  <div className="mt-4 md:mt-0 flex justify-end">
                    <div className="p-3 rounded-full bg-carbon-900 group-hover:bg-moss-500 text-bone-200/20 group-hover:text-bone-50 transition-all border border-bone-200/5 group-hover:border-transparent">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
