"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { learningPathwaysList } from "@/data/homepage";
import { Container, ContentCard } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";

export const LearningHubSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 border-t border-carbon-950/8 dark:border-bone-50/12 bg-transparent relative transition-colors duration-300">
      <Container className="space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.25em] block">
              EDUCATIONAL MISSION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-carbon-950 dark:text-bone-50 uppercase leading-tight">
              &ldquo;Knowledge should be accessible, not exclusive.&rdquo;
            </h2>
          </div>
          
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/learning"
              className="group inline-flex items-center justify-center px-6 py-3.5 text-xs font-sans tracking-widest uppercase font-bold text-bone-50 bg-[#120e0c] dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 transition-colors rounded-full focus:outline-none shadow-md"
            >
              <span>Enter Learning Hub</span>
            </Link>
          </div>
        </div>

        {/* Pathways Grid */}
        <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {learningPathwaysList.map((path) => (
            <StaggerItem key={path.title}>
              <ContentCard href={path.href} className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 hover:border-earth-600 dark:hover:border-earth-400 h-full flex flex-col justify-between p-8 min-h-[280px] shadow-md hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-bone-100 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 flex items-center justify-center text-earth-600 dark:text-earth-400 transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50 group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors">
                      {path.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                      {path.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-carbon-950/10 dark:border-bone-50/12 flex items-center justify-between text-xs font-sans font-bold tracking-wider text-carbon-950 dark:text-bone-50 uppercase group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors">
                  <span>Start Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </ContentCard>
            </StaggerItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
};
