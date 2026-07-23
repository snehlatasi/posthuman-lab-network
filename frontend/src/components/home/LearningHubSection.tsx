"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { learningPathwaysList } from "@/data/homepage";
import { Container, ContentCard } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";

export const LearningHubSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 border-t border-bone-200/5 bg-carbon-950/40 relative">
      <Container className="space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest block">
              Educational Mission
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-bone-50 uppercase leading-none">
              &ldquo;Knowledge should be accessible, not exclusive.&rdquo;
            </h2>
          </div>
          
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/learning"
              className="group inline-flex items-center justify-center px-6 py-3.5 text-xs font-sans tracking-widest uppercase font-semibold text-carbon-950 bg-bone-100 hover:bg-moss-500 hover:text-bone-50 transition-colors rounded-full focus:outline-none"
            >
              <span>Enter Learning Hub</span>
            </Link>
          </div>
        </div>

        {/* Pathways Grid */}
        <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {learningPathwaysList.map((path) => (
            <StaggerItem key={path.title}>
              <ContentCard href={path.href} className="border border-bone-200/5 bg-carbon-900/10 h-full flex flex-col justify-between p-8 min-h-[280px]">
                <div className="space-y-6">
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between text-bone-200/30">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-mono text-xs font-semibold">{path.number}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-bone-50 group-hover:text-moss-400 transition-colors">
                      {path.title}
                    </h3>
                    <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                      {path.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-bone-200/5 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-bone-200/30 group-hover:text-moss-400 transition-colors">
                  <span>Enter Course</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </ContentCard>
            </StaggerItem>
          ))}
        </Reveal>
        
      </Container>
    </section>
  );
};
