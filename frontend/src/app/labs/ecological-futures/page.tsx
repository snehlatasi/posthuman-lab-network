"use client";

import React from "react";
import { EditorialPageLayout } from "@/components/layout/Templates";

const labsSidebar = [
  { label: "Research Labs", href: "/labs/research" },
  { label: "Creative Labs", href: "/labs/creative" },
  { label: "Ecological Futures", href: "/labs/ecological-futures", active: true },
  { label: "AI Ethics & Tech", href: "/labs/ai-ethics" },
  { label: "Experimental Media", href: "/labs/experimental-media" },
  { label: "Collective Practice", href: "/labs/collective-practice" },
  { label: "Community Research", href: "/labs/community-research" },
  { label: "Open Collaboration", href: "/labs/open-collaboration" }
];

export default function EcologicalFuturesLabPage() {
  return (
    <EditorialPageLayout
      tag="Ecological Futures"
      title="ECOLOGICAL FUTURES LAB"
      subtitle="Designing technologies to interface with biological agents, networks, and environmental systems."
      parentLabel="Labs"
      parentHref="/labs"
      sidebarTitle="Labs Menu"
      sidebarLinks={labsSidebar}
      nextPageLabel="AI Ethics & Technology"
      nextPageHref="/labs/ai-ethics"
    >
      <div className="space-y-8 font-sans">
        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            Active Project: Flora-Signal Transducers
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed font-medium">
            Our current research investigates plant communication. By deploying ultra-low frequency voltage sensor nodes in local woodland soils, we track electrochemical spikes in root systems caused by moisture shifts, light changes, or human proximity. This raw data is mapped into modular sound environments and virtual models.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            Decolonizing Technology from Extraction
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed font-medium">
            Most modern tech is designed around extraction—extracting data from users, minerals from the earth. The Ecological Futures Lab seeks to design collaborative devices that exist as co-inhabitants of their ecosystem, using local solar-kinetic grids and non-polluting materials.
          </p>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
