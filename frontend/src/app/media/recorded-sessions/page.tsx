"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface SessionItem {
  title: string;
  host: string;
  tag: string;
  date: string;
}

const recordedSessions: SessionItem[] = [
  {
    title: "Woodland Retrospective and Botanical Bio-Sensors",
    host: "Ecological Futures Lab",
    tag: "Woodland Panel",
    date: "June 2026"
  },
  {
    title: "Language Weights and Decentered Cognitive Systems",
    host: "AI Ethics & Tech Unit",
    tag: "AI Seminar",
    date: "May 2026"
  }
];

export default function RecordedSessionsPage() {
  return (
    <ListingPageLayout
      tag="Recorded Sessions"
      title="RECORDED SESSIONS"
      subtitle="Decentralized chapter recordings, retreat documentation, and research seminars."
      parentLabel="Media"
      parentHref="/media"
    >
      {recordedSessions.map((session) => (
        <StaggerItem key={session.title}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {session.tag}
                </span>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  Hosted by {session.host} — {session.date}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {session.title}
                </h3>
              </div>
              <div className="pt-4">
                <AnimatedLink href="/media/youtube-lectures">
                  Stream Session
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
