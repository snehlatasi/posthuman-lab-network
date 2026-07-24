"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredLabsList } from "@/data/homepage";
import { Container, ContentCard } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";

export const LabsSection: React.FC = () => {
  return (
    <section id="labs" className="py-24 md:py-32 border-t border-carbon-950/8 dark:border-bone-50/12 bg-gradient-to-b from-[var(--section-gradient-from)] to-[var(--section-gradient-to)] relative transition-colors duration-300">
      <Container className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
          <div className="space-y-4">
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-widest block">
              Active Cells
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-carbon-950 dark:text-bone-100">
              Explore Our Labs
            </h2>
            <p className="font-sans text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed max-w-xl font-medium">
              Collaborative spaces linking critical philosophy and creative practice. Select a cell to explore active research projects.
            </p>
          </div>
          <Link
            href="/labs"
            className="group inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-wider uppercase text-carbon-950 dark:text-bone-100 hover:text-earth-600 dark:hover:text-earth-400 transition-colors focus:outline-none"
          >
            <span>View All Labs</span>
            <ArrowRight className="w-4 h-4 text-carbon-950 dark:text-bone-100 group-hover:text-earth-600 dark:group-hover:text-earth-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Labs Grid */}
        <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredLabsList.map((lab) => (
            <StaggerItem key={lab.name}>
              <ContentCard href={lab.href} className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 hover:border-earth-600 dark:hover:border-earth-400 h-full flex flex-col justify-between p-8 min-h-[300px] shadow-md hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  {/* Number & Category */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-wider block">
                      {lab.tag}
                    </span>
                    <span className="font-mono text-lg font-bold text-carbon-950 dark:text-bone-100">
                      {lab.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 dark:text-bone-100 group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors">
                      {lab.name}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-carbon-900 dark:text-bone-200 leading-relaxed font-semibold">
                      {lab.description}
                    </p>
                  </div>
                </div>

                {/* Card CTA arrow */}
                <div className="pt-6 border-t border-carbon-950/8 dark:border-bone-50/12 flex justify-between items-center text-xs font-sans font-bold tracking-wider text-carbon-950 dark:text-bone-100 group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors">
                  <span>Enter Cell</span>
                  <div className="p-2 bg-bone-50 dark:bg-carbon-950 group-hover:bg-earth-600 dark:group-hover:bg-earth-500 text-carbon-950 dark:text-bone-100 group-hover:text-bone-50 transition-colors rounded-full border border-carbon-950/10 dark:border-bone-50/15">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </ContentCard>
            </StaggerItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
};
