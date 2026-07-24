"use client";

import React from "react";
import { ContentPageLayout } from "@/components/layout/Templates";
import { ContentCard } from "@/components/layout/Primitives";
import { Reveal, StaggerItem } from "@/components/ui/Reveal";

export default function BecomeMemberPage() {
  return (
    <ContentPageLayout
      tag="Become a Member"
      title="MEMBERSHIP PATHWAYS"
      subtitle="Find the dynamic entry point that fits your study focus and practice."
      parentLabel="Membership"
      parentHref="/membership"
    >
      <div className="space-y-12">
        <Reveal className="max-w-2xl space-y-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-carbon-950">
            Co-Creating the Living Lab Ecosystem
          </h2>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed font-sans font-medium">
            Our membership categories are designed to align with various levels of research, creative contribution, and time commitment. We encourage emerging writers, independent researchers, and creative thinkers to apply.
          </p>
        </Reveal>

        <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StaggerItem>
            <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300 p-6">
              <div className="space-y-4">
                <span className="font-mono text-xs text-earth-600 font-bold uppercase tracking-widest block">Pathway A</span>
                <h3 className="font-serif text-xl font-bold text-carbon-950">Learner Member</h3>
                <p className="text-xs sm:text-sm text-carbon-800 leading-relaxed font-sans font-medium">
                  Best for students and self-directed learners looking to access class materials, study packs, and recorded masterclasses without ongoing research obligations.
                </p>
              </div>
            </ContentCard>
          </StaggerItem>

          <StaggerItem>
            <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300 p-6">
              <div className="space-y-4">
                <span className="font-mono text-xs text-earth-600 font-bold uppercase tracking-widest block">Pathway B</span>
                <h3 className="font-serif text-xl font-bold text-carbon-950">Creative Collaborator</h3>
                <p className="text-xs sm:text-sm text-carbon-800 leading-relaxed font-sans font-medium">
                  Designed for designers, visual media practitioners, and writers who wish to submit their artworks and speculative diaries to our journal.
                </p>
              </div>
            </ContentCard>
          </StaggerItem>
        </Reveal>
      </div>
    </ContentPageLayout>
  );
}
