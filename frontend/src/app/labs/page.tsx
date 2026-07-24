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
          <ContentCard className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 shadow-md hover:shadow-xl hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 dark:text-earth-400 tracking-wider font-bold uppercase block">
                  {lab.tag}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50">
                  {lab.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
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
