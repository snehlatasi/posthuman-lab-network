"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface ContactTopic {
  title: string;
  topic: string;
  description: string;
  tag: string;
}

const contactTopicsList: ContactTopic[] = [
  {
    title: "Research Collaboration",
    topic: "Institutional Partnerships",
    tag: "Pitch / Labs",
    description: "Submit proposals for transdisciplinary research joint-ventures, biological sensors sharing, or computational audits."
  },
  {
    title: "Invite a Speaker",
    topic: "Presentations & Lectures",
    tag: "Lectures / Seminars",
    description: "Book our research leads, designers, or writers to speak at academic events, design weeks, or conferences."
  },
  {
    title: "General Inquiries",
    topic: "Media / Support",
    tag: "Info / Help",
    description: "Questions about membership guidelines, volunteering chapters, or general open-source data access."
  }
];

export default function ContactMainPage() {
  return (
    <ListingPageLayout
      tag="Contact"
      title="COLLABORATION & CONTACT"
      subtitle="Connect with our global research cells, editors, and event managers."
    >
      {contactTopicsList.map((item) => (
        <StaggerItem key={item.title}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {item.tag}
                </span>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  {item.topic}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-4">
                <AnimatedLink href="/contact/collaboration">
                  Send Inquiry
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
