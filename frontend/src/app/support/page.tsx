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
          <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 tracking-wider font-bold uppercase block">
                  {item.tag}
                </span>
                <span className="font-sans text-xs text-carbon-900 uppercase font-bold tracking-wider block">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 leading-relaxed font-medium">
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
