"use client";

import React from "react";
import Link from "next/link";
import { Container, ContentCard } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";
import { BookOpen, Sparkles, GraduationCap, Network, Leaf, ArrowUpRight } from "lucide-react";

interface PillarItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const pillars: PillarItem[] = [
  {
    icon: <BookOpen className="w-5 h-5 text-moss-400 group-hover:scale-110 transition-transform duration-300" />,
    title: "THOUGHT & RESEARCH",
    description: "Bridging academic philosophy, software algorithms, and critical posthuman theory to construct new frames of ecological mapping.",
    href: "/about/what-is-posthumanism"
  },
  {
    icon: <Sparkles className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform duration-300" />,
    title: "CREATIVITY & ART",
    description: "Creating speculative art installations, interactive digital systems, and visual essays that translate organic signals into visual code.",
    href: "/labs"
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-moss-400 group-hover:scale-110 transition-transform duration-300" />,
    title: "EDUCATION & LEARNING",
    description: "Providing free recorded guest lectures, conceptual study pathways, and foundational bibliographies to keep knowledge open.",
    href: "/learning"
  },
  {
    icon: <Network className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform duration-300" />,
    title: "COLLABORATION",
    description: "Coordinating transdisciplinary rooms, research circles, and community lab environments connecting global coordinates.",
    href: "/community"
  },
  {
    icon: <Leaf className="w-5 h-5 text-moss-400 group-hover:scale-110 transition-transform duration-300" />,
    title: "PRACTICE & ACTION",
    description: "Translating online dialogue into physical workshops, off-grid wilderness retreats, and local embodied actions.",
    href: "/practice"
  }
];

export const VisionSection: React.FC = () => {
  return (
    <section 
      id="pillars"
      className="py-24 md:py-32 border-t border-carbon-950/8 dark:border-bone-50/12 relative bg-transparent transition-colors duration-300"
    >
      <Container className="space-y-16">
        {/* Top Header */}
        <div className="max-w-2xl">
          <Reveal delay={0.1}>
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.25em] block mb-3">
              OUR PILLARS
            </span>
          </Reveal>
          <Reveal delay={0.25}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-carbon-950 dark:text-bone-50 leading-tight uppercase">
              Building the Posthuman Future Together
            </h2>
          </Reveal>
        </div>

        {/* Pillars Grid */}
        <Reveal staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title} className="h-full">
              <Link 
                href={pillar.href}
                className="group block h-full focus:outline-none"
              >
                <ContentCard className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300 flex flex-col justify-between h-full p-6 group-hover:-translate-y-1 shadow-md hover:shadow-xl">
                  <div className="space-y-6">
                    {/* Icon Box */}
                    <div className="w-10 h-10 rounded-xl bg-bone-100 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 flex items-center justify-center transition-colors">
                      {pillar.icon}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-base font-bold text-carbon-950 dark:text-bone-50 group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-xs text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-carbon-950/10 dark:border-bone-50/12 flex items-center justify-between text-[11px] font-sans font-bold tracking-wider text-carbon-950 dark:text-bone-100 group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </ContentCard>
              </Link>
            </StaggerItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
};
export default VisionSection;
