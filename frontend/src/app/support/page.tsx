"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface SupportItem {
  title: string;
  category: string;
  description: string;
  tag: string;
}

const supportTiersList: SupportItem[] = [
  {
    title: "Sustain Open Access",
    category: "Financial Support",
    tag: "Open Access / Academic",
    description: "Help us keep all classes, study guides, data logs, and research archives completely free and unrestricted."
  },
  {
    title: "Carbon-Conscious Tech",
    category: "Infrastructure Funding",
    tag: "Green Server Hosting",
    description: "Support our efforts to host this website on servers powered by local renewable energy grids."
  },
  {
    title: "Emerging Scholars Fund",
    category: "Mentorship Support",
    tag: "Sponsorship / Education",
    description: "Provide travel grants and hardware node kits for emerging scholars and writers in developing regions."
  }
];

export default function SupportMainPage() {
  return (
    <ListingPageLayout
      tag="Support"
      title="SUPPORT & SUSTAINABILITY"
      subtitle="Fostering open-access, sustainable, carbon-conscious academic exchange."
    >
      {supportTiersList.map((item) => (
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
                <AnimatedLink href="/support/why-support">
                  View Ethics Roadmap
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
