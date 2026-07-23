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
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {tier.tag}
                </span>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  {tier.role}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {tier.name}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
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
