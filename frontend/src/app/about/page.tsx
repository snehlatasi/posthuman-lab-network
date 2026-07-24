"use client";

import React from "react";
import { ContentPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { Reveal, StaggerItem } from "@/components/ui/Reveal";

export default function AboutPage() {
  return (
    <ContentPageLayout
      tag="About"
      title="ABOUT THE NETWORK"
      subtitle="Connecting ideas, ecologies, and technology to reshape collective futures."
    >
      <div className="space-y-16">
        {/* Core Vision Intro */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-carbon-950">
              A Living Laboratory for Interdisciplinary Philosophy & Creativity
            </h2>
            <p className="font-sans text-sm md:text-base text-carbon-800 leading-relaxed">
              The Posthuman Lab Network is an open-access global community exploring the shifting boundaries of human consciousness. By integrating scientific inquiries, computational machines, and botanical agents, we work to transition traditional academic boundaries into lived, creative experiments.
            </p>
          </div>
          <div className="lg:col-span-5">
            <ContentCard className="border border-earth-500/20 bg-white/70 shadow-md">
              <span className="font-mono text-[10px] text-earth-600 uppercase tracking-widest block mb-2 font-bold">Our Stance</span>
              <p className="font-serif text-lg text-carbon-950 italic">
                &ldquo;We are not separate from the ecosystems we build or the technologies we generate. We co-evolve.&rdquo;
              </p>
            </ContentCard>
          </div>
        </Reveal>

        {/* Pillars Grid */}
        <div className="space-y-8">
          <div className="border-b border-carbon-950/10 pb-4">
            <h3 className="font-mono text-xs text-earth-600 uppercase tracking-widest font-bold">Our Key Pillars</h3>
          </div>
          
          <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300 p-6">
                <div className="space-y-4">
                  <span className="font-mono text-xl font-bold text-earth-600">01</span>
                  <h4 className="font-serif text-xl font-bold text-carbon-950">Transdisciplinary Thought</h4>
                  <p className="text-xs md:text-sm text-carbon-800 leading-relaxed font-medium">
                    Fusing philosophy, biology, software ethics, and critical art practices to establish new ways of viewing the nonhuman.
                  </p>
                </div>
              </ContentCard>
            </StaggerItem>
            
            <StaggerItem>
              <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300 p-6">
                <div className="space-y-4">
                  <span className="font-mono text-xl font-bold text-earth-600">02</span>
                  <h4 className="font-serif text-xl font-bold text-carbon-950">Open Accessibility</h4>
                  <p className="text-xs md:text-sm text-carbon-800 leading-relaxed font-medium">
                    Democratizing advanced scholarship. Academic writing, toolsets, and digital lectures are, and will always be, free.
                  </p>
                </div>
              </ContentCard>
            </StaggerItem>

            <StaggerItem>
              <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300 p-6">
                <div className="space-y-4">
                  <span className="font-mono text-xl font-bold text-earth-600">03</span>
                  <h4 className="font-serif text-xl font-bold text-carbon-950">Embodied Practice</h4>
                  <p className="text-xs md:text-sm text-carbon-800 leading-relaxed font-medium">
                    Bridging digital connectivity with real-world, physical wilderness retreats, co-design groups, and sensory workshops.
                  </p>
                </div>
              </ContentCard>
            </StaggerItem>
          </Reveal>
        </div>

        {/* Dynamic Navigation Box */}
        <Reveal className="border-t border-carbon-950/8 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-earth-600 uppercase tracking-widest block font-bold">Explore Our Story</span>
            <p className="text-sm text-carbon-800 font-medium">Trace our chronological milestones from founders to future vision.</p>
          </div>
          <AnimatedLink href="/about/our-story">
            Read Our Story
          </AnimatedLink>
        </Reveal>
      </div>
    </ContentPageLayout>
  );
}
