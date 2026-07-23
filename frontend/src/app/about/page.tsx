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
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-bone-50">
              A Living Laboratory for Interdisciplinary Philosophy & Creativity
            </h2>
            <p className="font-sans text-sm md:text-base text-bone-200/70 leading-relaxed">
              The Posthuman Lab Network is an open-access global community exploring the shifting boundaries of human consciousness. By integrating scientific inquiries, computational machines, and botanical agents, we work to transition traditional academic boundaries into lived, creative experiments.
            </p>
          </div>
          <div className="lg:col-span-5">
            <ContentCard className="border border-moss-500/10 bg-moss-500/5">
              <span className="font-mono text-[10px] text-moss-400 uppercase tracking-widest block mb-2">Our Stance</span>
              <p className="font-serif text-lg text-bone-100 italic">
                &ldquo;We are not separate from the ecosystems we build or the technologies we generate. We co-evolve.&rdquo;
              </p>
            </ContentCard>
          </div>
        </Reveal>

        {/* Pillars Grid */}
        <div className="space-y-8">
          <div className="border-b border-bone-200/5 pb-4">
            <h3 className="font-mono text-xs text-moss-500 uppercase tracking-widest font-semibold">Our Key Pillars</h3>
          </div>
          
          <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <ContentCard>
                <div className="space-y-4">
                  <span className="font-mono text-xl font-bold text-moss-500">01</span>
                  <h4 className="font-serif text-lg font-bold text-bone-100">Transdisciplinary Thought</h4>
                  <p className="text-xs text-bone-200/55 leading-relaxed">
                    Fusing philosophy, biology, software ethics, and critical art practices to establish new ways of viewing the nonhuman.
                  </p>
                </div>
              </ContentCard>
            </StaggerItem>
            
            <StaggerItem>
              <ContentCard>
                <div className="space-y-4">
                  <span className="font-mono text-xl font-bold text-moss-500">02</span>
                  <h4 className="font-serif text-lg font-bold text-bone-100">Open Accessibility</h4>
                  <p className="text-xs text-bone-200/55 leading-relaxed">
                    Democratizing advanced scholarship. Academic writing, toolsets, and digital lectures are, and will always be, free.
                  </p>
                </div>
              </ContentCard>
            </StaggerItem>

            <StaggerItem>
              <ContentCard>
                <div className="space-y-4">
                  <span className="font-mono text-xl font-bold text-moss-500">03</span>
                  <h4 className="font-serif text-lg font-bold text-bone-100">Embodied Practice</h4>
                  <p className="text-xs text-bone-200/55 leading-relaxed">
                    Bridging digital connectivity with real-world, physical wilderness retreats, co-design groups, and sensory workshops.
                  </p>
                </div>
              </ContentCard>
            </StaggerItem>
          </Reveal>
        </div>

        {/* Dynamic Navigation Box */}
        <Reveal className="border-t border-bone-200/5 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-bone-200/40 uppercase tracking-widest block">Explore Our Story</span>
            <p className="text-sm text-bone-200/70">Trace our chronological milestones from founders to future vision.</p>
          </div>
          <AnimatedLink href="/about/our-story">
            Read Our Story
          </AnimatedLink>
        </Reveal>
      </div>
    </ContentPageLayout>
  );
}
