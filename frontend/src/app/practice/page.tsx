"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface GatheringItem {
  title: string;
  category: string;
  description: string;
  tag: string;
}

const practicesList: GatheringItem[] = [
  {
    title: "Woodland Retreats",
    category: "Physical Gatherings",
    tag: "Woodlands / Off-Grid",
    description: "Multi-day off-grid reading sessions, software audits, and group meals in forested environments."
  },
  {
    title: "Embodied Sensing Workshops",
    category: "Sensory Exercises",
    tag: "Retreats / Interactive",
    description: "Practicing somatic awareness, environmental listening walks, and tracking botanical volt-fluctuations."
  },
  {
    title: "Local Meetup Councils",
    category: "Regional Meetups",
    tag: "Chapters / Local",
    description: "Decentralized local chapters meeting physically in cities to organize citizen science audits."
  }
];

export default function PracticeMainPage() {
  return (
    <ListingPageLayout
      tag="Practice"
      title="PRACTICE & PHYSICAL GATHERINGS"
      subtitle="Decentering the digital. Translating theories into local embodied actions."
    >
      {practicesList.map((item) => (
        <StaggerItem key={item.title}>
          <ContentCard className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 shadow-md hover:shadow-xl hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 dark:text-earth-400 tracking-wider font-bold uppercase block">
                  {item.tag}
                </span>
                <span className="font-sans text-xs text-carbon-900 dark:text-bone-200 uppercase font-bold tracking-wider block">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
              <div className="pt-4">
                <AnimatedLink href="/practice/workshops">
                  View Gathering Details
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
