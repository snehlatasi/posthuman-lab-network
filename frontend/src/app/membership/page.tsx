"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface TierItem {
  name: string;
  role: string;
  description: string;
  tag: string;
}

const membershipTiers: TierItem[] = [
  {
    name: "Learner Member",
    role: "Open Access Participant",
    tag: "Tier 01 / Free",
    description: "Access all learning hubs, digital lecture slides, reading lists, and join monthly community discussions."
  },
  {
    name: "Contributor Member",
    role: "Writer & Artist",
    tag: "Tier 02 / Active Partner",
    description: "Submit writings, creative designs, and podcast logs directly to editors, and publish in our journal."
  },
  {
    name: "Research Member",
    role: "Academic Scholar",
    tag: "Tier 03 / Specialized",
    description: "Participate directly in our core lab operations (Ecological Futures, AI Ethics) and collaborative academic works."
  }
];

export default function MembershipMainPage() {
  return (
    <ListingPageLayout
      tag="Membership"
      title="BECOME A MEMBER"
      subtitle="Join an international community of scholars, practitioners, and artists."
    >
      {membershipTiers.map((tier) => (
        <StaggerItem key={tier.name}>
          <ContentCard className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 shadow-md hover:shadow-xl hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 dark:text-earth-400 tracking-wider font-bold uppercase block">
                  {tier.tag}
                </span>
                <span className="font-sans text-xs text-carbon-900 dark:text-bone-200 uppercase font-bold tracking-wider block">
                  {tier.role}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50">
                  {tier.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                  {tier.description}
                </p>
              </div>
              <div className="pt-4">
                <AnimatedLink href="/membership/become-a-member">
                  Learn More
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
