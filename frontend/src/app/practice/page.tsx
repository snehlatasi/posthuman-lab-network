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
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {item.tag}
                </span>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
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
