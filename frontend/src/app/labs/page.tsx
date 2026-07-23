"use client";

import React, { useState } from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface LabItem {
  name: string;
  category: "theory" | "creative" | "applied";
  description: string;
  tag: string;
  href: string;
}

const labsList: LabItem[] = [
  {
    name: "Ecological Futures Lab",
    category: "applied",
    tag: "Applied / Ecology",
    description: "Monitoring environmental changes and botanical communication pathways through creative biosensors.",
    href: "/labs/ecological-futures"
  },
  {
    name: "AI Ethics & Technology Unit",
    category: "theory",
    tag: "Theory / AI",
    description: "Philosophical audits on algorithmic biases, artificial agency, and synthetic consciousness.",
    href: "/labs/ai-ethics"
  },
  {
    name: "Experimental Media Studio",
    category: "creative",
    tag: "Creative / Audio-Visual",
    description: "Investigating sound art, new media aesthetics, and immersive virtual topologies.",
    href: "/labs/experimental-media"
  },
  {
    name: "Collective Practice Network",
    category: "applied",
    tag: "Applied / Social",
    description: "Designing frameworks for decentralized community action, citizen science, and open data.",
    href: "/labs/collective-practice"
  },
  {
    name: "Creative Writing Sanctuary",
    category: "creative",
    tag: "Creative / Narrative",
    description: "Speculative fiction diaries, posthuman poetry, and collaborative scripts.",
    href: "/community/global-voices"
  },
  {
    name: "Embodied Gatherings Council",
    category: "applied",
    tag: "Applied / Physical",
    description: "Structuring outdoor workspace setups, sensory disconnect practices, and woodland workshops.",
    href: "/practice/workshops"
  }
];

export default function LabsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "theory" | "creative" | "applied">("all");

  const filteredLabs = labsList.filter(
    (lab) => activeFilter === "all" || lab.category === activeFilter
  );

  const filters = [
    { label: "All Labs", active: activeFilter === "all", onClick: () => setActiveFilter("all") },
    { label: "Theory & Ethics", active: activeFilter === "theory", onClick: () => setActiveFilter("theory") },
    { label: "Creative & Media", active: activeFilter === "creative", onClick: () => setActiveFilter("creative") },
    { label: "Applied & Social", active: activeFilter === "applied", onClick: () => setActiveFilter("applied") }
  ];

  return (
    <ListingPageLayout
      tag="Labs"
      title="GLOBAL LAB NETWORKS"
      subtitle="Distributed collaborative clusters tackling critical posthuman questions."
      filters={filters}
    >
      {filteredLabs.map((lab) => (
        <StaggerItem key={lab.name}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase">
                  {lab.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {lab.name}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                  {lab.description}
                </p>
              </div>
              
              <div className="pt-4">
                <AnimatedLink href={lab.href}>
                  Enter Space
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
