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
          <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 tracking-wider font-bold uppercase block">
                  {item.tag}
                </span>
                <span className="font-sans text-xs text-carbon-900 uppercase font-bold tracking-wider block">
                  {item.topic}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 leading-relaxed font-medium">
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
