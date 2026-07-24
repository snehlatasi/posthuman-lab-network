"use client";

import React from "react";
import { EditorialPageLayout } from "@/components/layout/Templates";

const communitySidebar = [
  { label: "Reflections", href: "/community/reflections" },
  { label: "Global Voices", href: "/community/global-voices", active: true },
  { label: "Reading Circles", href: "/community/reading-circles" },
  { label: "Discussions", href: "/community/discussions" },
  { label: "Future Diaries", href: "/community/future-diaries" },
  { label: "Creative Showcase", href: "/community/creative-showcase" },
  { label: "Shared Experiences", href: "/community/shared-experiences" },
  { label: "Projects", href: "/community/projects" }
];

export default function GlobalVoicesPage() {
  return (
    <EditorialPageLayout
      tag="Global Voices"
      title="DIARIES FROM A CONCRETE FOREST"
      subtitle="Speculative diaries tracking the interactions of biological lichen and city infrastructure."
      parentLabel="Community"
      parentHref="/community"
      sidebarTitle="Community Menu"
      sidebarLinks={communitySidebar}
      nextPageLabel="Reflections"
      nextPageHref="/community/reflections"
    >
      <div className="space-y-8 font-sans">
        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 dark:text-bone-50 leading-tight">
            Milestone 1: The Colonization of Concrete
          </h3>
          <p className="text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
            Concrete is often viewed as a symbol of human dominance over nature. Yet, on any highway barrier or city wall, micro-colonies of lichen and moss gradually dissolve the calcium carbonate, reclaiming the structure. This speculative diary monitors this slow, persistent bio-activity, exploring concrete as a host.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 dark:text-bone-50 leading-tight">
            Lived Reflections
          </h3>
          <p className="text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
            By shifting our attention from the fast speed of city traffic to the slow growth of local lichens, we explore alternative timescales, repositioning human life within deep geological epochs.
          </p>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
