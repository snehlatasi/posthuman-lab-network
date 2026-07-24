"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { learningPathwaysList } from "@/data/homepage";
import { Container, ContentCard } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";

export const LearningHubSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 border-t border-bone-200/10 bg-carbon-950 relative">
      <Container className="space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs text-moss-300 font-bold uppercase tracking-widest block">
              Educational Mission
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-bone-50 uppercase leading-none">
              &ldquo;Knowledge should be accessible, not exclusive.&rdquo;
            </h2>
          </div>
          
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/learning"
              className="group inline-flex items-center justify-center px-6 py-3.5 text-xs font-sans tracking-widest uppercase font-bold text-carbon-950 bg-bone-50 hover:bg-earth-600 hover:text-bone-50 transition-colors rounded-full focus:outline-none shadow-md"
            >
              <span>Enter Learning Hub</span>
            </Link>
          </div>
        </div>

        {/* Pathways Grid */}
        <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {learningPathwaysList.map((path) => (
            <StaggerItem key={path.title}>
              <ContentCard href={path.href} className="border border-bone-200/20 bg-carbon-900 hover:bg-carbon-800 h-full flex flex-col justify-between p-8 min-h-[280px] shadow-xl hover:border-earth-400 transition-all duration-300">
                <div className="space-y-6">
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between text-earth-400">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-mono text-xs font-bold text-bone-200">{path.number}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-bone-50 group-hover:text-earth-400 transition-colors">
                      {path.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-bone-100 leading-relaxed font-normal">
                      {path.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-bone-200/20 flex items-center justify-between text-xs font-sans font-bold tracking-widest uppercase text-bone-100 group-hover:text-earth-400 transition-colors">
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
