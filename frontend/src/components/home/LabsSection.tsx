"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredLabsList } from "@/data/homepage";
import { Container, ContentCard } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";

export const LabsSection: React.FC = () => {
  return (
    <section id="labs" className="py-24 md:py-32 border-t border-bone-200/5 bg-carbon-900/5">
      <Container className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
          <div className="space-y-4">
            <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest block">
              Active Cells
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-bone-50">
              Explore Our Labs
            </h2>
            <p className="font-sans text-sm text-bone-200/60 leading-relaxed max-w-xl">
              Collaborative spaces linking critical philosophy and creative practice. Select a cell to explore active research projects.
            </p>
          </div>
          <Link
            href="/labs"
            className="group inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-wider uppercase text-bone-100 hover:text-moss-400 transition-colors focus:outline-none"
          >
            <span>View All Labs</span>
            <ArrowRight className="w-4 h-4 text-bone-200/20 group-hover:text-moss-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Labs Grid */}
        <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredLabsList.map((lab) => (
            <StaggerItem key={lab.name}>
              <ContentCard href={lab.href} className="border border-bone-200/5 bg-carbon-900/10 h-full flex flex-col justify-between p-8 min-h-[300px]">
                <div className="space-y-6">
                  {/* Number & Category */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-wider block">
                      {lab.tag}
                    </span>
                    <span className="font-serif text-2xl font-bold text-bone-200/10">
                      {lab.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-bone-50 group-hover:text-moss-400 transition-colors">
                      {lab.name}
                    </h3>
                    <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                      {lab.description}
                    </p>
                  </div>
                </div>

                {/* Card CTA arrow */}
                <div className="pt-6 border-t border-bone-200/5 flex justify-between items-center text-xs font-mono tracking-wider text-bone-200/30 group-hover:text-moss-400 transition-colors">
                  <span>Enter Cell</span>
                  <div className="p-2 bg-carbon-950 group-hover:bg-moss-500 text-bone-200/30 group-hover:text-bone-50 transition-colors rounded-full">
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
