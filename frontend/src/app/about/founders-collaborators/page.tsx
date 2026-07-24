"use client";

import React from "react";
import { ContentPageLayout } from "@/components/layout/Templates";
import { ContentCard } from "@/components/layout/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export default function FoundersCollaboratorsPage() {
  return (
    <ContentPageLayout
      tag="Founders & Collaborators"
      title="FOUNDERS & COLLABORATORS"
      subtitle="The philosophers, developers, and practitioners steering our living laboratory."
      parentLabel="About"
      parentHref="/about"
    >
      <div className="space-y-12">
        <Reveal className="max-w-2xl">
          <p className="text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
            Our network functions horizontally. We are steered by a core operational team and an international advisory board of writers, researchers, and creative thinkers.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-6 max-w-xl">
          <ContentCard className="border border-carbon-950/8 dark:border-bone-50/15 bg-white/80 dark:bg-carbon-900/90 shadow-md">
            <div className="space-y-4 p-4 text-center">
              <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-widest block">
                Operational Framework
              </span>
              <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50">
                Founders & Collaborators Index
              </h3>
              <p className="text-xs md:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                Specific founder biographies, collaborator portraits, and advisory roles will be updated by the Posthuman Lab Network team. The operational structure is designed to function horizontally, linking regional coordinators across educational cells.
              </p>
              <p className="text-xs font-mono text-carbon-700 dark:text-bone-300 leading-relaxed pt-2 border-t border-carbon-950/8 dark:border-bone-50/12 font-medium">
                If you would like to volunteer or suggest an advisory affiliation, please query our coordinators using the <Link href="/contact/collaboration" className="text-earth-600 dark:text-earth-400 hover:text-earth-500 font-bold underline">Collaboration Contact Portal</Link>.
              </p>
            </div>
          </ContentCard>
        </Reveal>
      </div>
    </ContentPageLayout>
  );
}
