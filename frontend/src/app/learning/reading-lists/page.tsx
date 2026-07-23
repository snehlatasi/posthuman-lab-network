"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface BibliographyItem {
  title: string;
  author: string;
  tag: string;
  relevance: string;
}

const bibliographies: BibliographyItem[] = [
  {
    title: "The Posthuman",
    author: "Rosi Braidotti (2013)",
    tag: "Core Literature",
    relevance: "Primary reference text exploring posthuman subjectivity and affirmative ethics."
  },
  {
    title: "Staying with the Trouble",
    author: "Donna Haraway (2016)",
    tag: "Ecological Co-existence",
    relevance: "Investigates planetary damage, sympoiesis, and inter-species collaboration."
  },
  {
    title: "Meeting the Universe Halfway",
    author: "Karen Barad (2007)",
    tag: "Agential Realism",
    relevance: "Establishes quantum intra-actions and decents the human observer."
  }
];

export default function ReadingListsPage() {
  return (
    <ListingPageLayout
      tag="Reading Lists"
      title="READING LISTS & BIBLIOGRAPHIES"
      subtitle="Curated lists of primary literature, research papers, and core posthuman philosophy."
      parentLabel="Learning"
      parentHref="/learning"
    >
      {bibliographies.map((book) => (
        <StaggerItem key={book.title}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {book.tag}
                </span>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  {book.author}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {book.title}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed pt-2">
                  {book.relevance}
                </p>
              </div>
              <div className="pt-4">
                <AnimatedLink href="/learning/introduction-to-posthumanism">
                  View Course Details
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
