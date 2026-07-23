"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface EventItem {
  title: string;
  date: string;
  type: string;
  location: string;
  description: string;
}

const upcomingEvents: EventItem[] = [
  {
    title: "Symbiotic Signals: Plant & Code",
    date: "August 12, 2026",
    type: "Online Seminar / Interactive",
    location: "Global Zoom / Discord Hub",
    description: "An online demonstration of voltage tracking nodes and mapping plant bio-electricity into sound."
  },
  {
    title: "Embodied Philosophy Woodland Retreat",
    date: "September 18-21, 2026",
    type: "Physical Retreat",
    location: "Black Forest Wilderness, Germany",
    description: "A three-day off-grid gathering featuring wilderness walking, collective reading, and software auditing."
  },
  {
    title: "Algorithmic Ethics Open Panel",
    date: "October 05, 2026",
    type: "Hybrid Panel Discussions",
    location: "London Hub / Live Webcast",
    description: "Debating machine agency and transcolonial data storage with guest speakers from international AI hubs."
  }
];

export default function EventsMainPage() {
  return (
    <ListingPageLayout
      tag="Events"
      title="LIVE MEETINGS & DISCUSSIONS"
      subtitle="Gatherings, seminars, and woodland workshops connecting people and practices."
    >
      {upcomingEvents.map((event) => (
        <StaggerItem key={event.title}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {event.type} — {event.date}
                </span>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  📍 {event.location}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {event.title}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                  {event.description}
                </p>
              </div>
              <div className="pt-4">
                <AnimatedLink href="/events/upcoming">
                  Register For Event
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
