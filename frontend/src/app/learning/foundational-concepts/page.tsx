"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface ConceptItem {
  term: string;
  definition: string;
  tag: string;
}

const conceptsList: ConceptItem[] = [
  {
    term: "Agential Realism",
    tag: "Karen Barad",
    definition: "An epistemological and ontological framework that views the universe as consisting of dynamic, entangled relations rather than separate entities."
  },
  {
    term: "Sympoiesis",
    tag: "Donna Haraway",
    definition: "Literally meaning 'making-with'. Fosters the idea that no organism or system generates or survives entirely on its own."
  },
  {
    term: "Decentering",
    tag: "Critical Theory",
    definition: "Repositioning the human observer away from the master center of universe calculations, recognizing biological and artificial partners."
  }
];

export default function FoundationalConceptsPage() {
  return (
    <ListingPageLayout
      tag="Concepts"
      title="FOUNDATIONAL CONCEPTS"
      subtitle="An open vocabulary directory defining critical terms in posthuman philosophy."
      parentLabel="Learning"
      parentHref="/learning"
    >
      {conceptsList.map((concept) => (
        <StaggerItem key={concept.term}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {concept.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {concept.term}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed pt-2">
                  {concept.definition}
                </p>
              </div>
              <div className="pt-4">
                <AnimatedLink href="/learning/introduction-to-posthumanism">
                  Explore Introduction
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
