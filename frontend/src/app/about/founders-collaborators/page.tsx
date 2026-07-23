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
          <p className="text-sm md:text-base text-bone-200/70 leading-relaxed">
            Our network functions horizontally. We are steered by a core operational team and an international advisory board of writers, researchers, and creative thinkers.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-6 max-w-xl">
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-4 p-4 text-center">
              <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest block">
                Operational Framework
              </span>
              <h3 className="font-serif text-lg font-bold text-bone-50">
                Founders & Collaborators Index
              </h3>
              <p className="text-xs text-bone-200/60 leading-relaxed">
                Specific founder biographies, collaborator portraits, and advisory roles will be updated by the Posthuman Lab Network team. The operational structure is designed to function horizontally, linking regional coordinators across educational cells.
              </p>
              <p className="text-[10px] font-mono text-bone-200/40 leading-relaxed">
                If you would like to volunteer or suggest an advisory affiliation, please query our coordinators using the <Link href="/contact/collaboration" className="text-moss-400 hover:text-moss-300 underline">Collaboration Contact Portal</Link>.
              </p>
            </div>
          </ContentCard>
        </Reveal>
      </div>
    </ContentPageLayout>
  );
}
