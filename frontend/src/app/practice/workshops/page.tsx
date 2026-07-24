"use client";

import React from "react";
import { EditorialPageLayout } from "@/components/layout/Templates";

const practiceSidebar = [
  { label: "Posthumanism in Action", href: "/practice/posthumanism" },
  { label: "Workshops", href: "/practice/workshops", active: true },
  { label: "Collective Learning", href: "/practice/collective-learning" },
  { label: "Retreats", href: "/practice/retreats" },
  { label: "Embodied Practices", href: "/practice/embodied-practices" },
  { label: "Creative Labs", href: "/practice/creative-labs" },
  { label: "Experimental Learning", href: "/practice/experimental-learning" },
  { label: "Global Meetups", href: "/practice/global-meetups" }
];

export default function WorkshopsPage() {
  return (
    <EditorialPageLayout
      tag="Workshops"
      title="EMBODIED SENSING WORKSHOPS"
      subtitle="Fusing deep ecological awareness with technology audits. Physical workshops designed for city-based chapters."
      parentLabel="Practice"
      parentHref="/practice"
      sidebarTitle="Practice Menu"
      sidebarLinks={practiceSidebar}
      nextPageLabel="Woodland Retreats"
      nextPageHref="/practice/retreats"
    >
      <div className="space-y-8 font-sans">
        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            Workshop Concept: Decelerating Awareness
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed font-medium">
            Our urban sensing workshops are designed to break the rapid cycle of digital consumption. Participants engage in sensory walking audits, mapping local sounds, smells, and plant distributions in city parks, drawing correlations between urban development and nonhuman habitats.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            Setup: Bio-Voltage Translation
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed font-medium">
            We close our sessions with physical demonstrations of flora signal transducers. By connecting leaves and stems to simple digital nodes, we show how plants respond to human touch, recording and discussing chemical spikes.
          </p>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
