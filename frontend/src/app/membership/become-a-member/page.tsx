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
          <h2 className="font-serif text-2xl font-bold text-bone-50">
            Co-Creating the Living Lab Ecosystem
          </h2>
          <p className="text-sm text-bone-200/70 leading-relaxed font-sans">
            Our membership categories are designed to align with various levels of research, creative contribution, and time commitment. We encourage emerging writers, independent researchers, and creative thinkers to apply.
          </p>
        </Reveal>

        <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StaggerItem>
            <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-moss-500 uppercase tracking-widest block">Pathway A</span>
                <h3 className="font-serif text-xl font-bold text-bone-50">Learner Member</h3>
                <p className="text-xs text-bone-200/60 leading-relaxed font-sans">
                  Best for students and self-directed learners looking to access class materials, study packs, and recorded masterclasses without ongoing research obligations.
                </p>
              </div>
            </ContentCard>
          </StaggerItem>

          <StaggerItem>
            <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-moss-500 uppercase tracking-widest block">Pathway B</span>
                <h3 className="font-serif text-xl font-bold text-bone-50">Creative Collaborator</h3>
                <p className="text-xs text-bone-200/60 leading-relaxed font-sans">
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
