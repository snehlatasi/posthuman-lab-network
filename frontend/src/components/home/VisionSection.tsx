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
      className="py-24 md:py-32 border-t border-bone-200/5 relative bg-carbon-900/5"
    >
      <Container className="space-y-16">
        {/* Top Header */}
        <div className="max-w-2xl">
          <Reveal delay={0.1}>
            <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-[0.25em] block mb-3">
              OUR PILLARS
            </span>
          </Reveal>
          <Reveal delay={0.25}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-bone-50 leading-tight uppercase">
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
                <ContentCard className="border border-bone-200/5 bg-carbon-900/20 hover:border-moss-500/25 transition-all duration-500 flex flex-col justify-between h-full p-6 group-hover:-translate-y-1">
                  <div className="space-y-6">
                    {/* Icon Box */}
                    <div className="p-3 bg-carbon-950/60 rounded-lg w-fit border border-bone-200/5 group-hover:border-moss-500/10 transition-all duration-300">
                      {pillar.icon}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-serif text-xs font-bold tracking-wider text-bone-100 group-hover:text-moss-400 transition-colors uppercase">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-xs text-bone-200/50 group-hover:text-bone-200/70 transition-colors leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow CTA */}
                  <div className="pt-6 flex justify-end">
                    <div className="p-2 bg-carbon-900 rounded-full border border-bone-200/5 group-hover:bg-moss-500 group-hover:text-bone-50 text-bone-200/30 transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
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
