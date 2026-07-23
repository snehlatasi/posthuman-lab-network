"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface LectureItem {
  title: string;
  speaker: string;
  tag: string;
  duration: string;
}

const recordedLectures: LectureItem[] = [
  {
    title: "Subjectivities in the Anthropocene",
    speaker: "Dr. Elena Rostova",
    tag: "Masterclass / Keynote",
    duration: "48 mins"
  },
  {
    title: "Algorithmic Inquiries and LLM Biases",
    speaker: "Anya Chen",
    tag: "Audit Seminar",
    duration: "35 mins"
  },
  {
    title: "Decentered Listening: Bio-Signals",
    speaker: "Marcus Vance",
    tag: "Workshop Presentation",
    duration: "28 mins"
  }
];

export default function RecordedLecturesPage() {
  return (
    <ListingPageLayout
      tag="Lectures"
      title="RECORDED LECTURES"
      subtitle="Watch past masterclasses, seminars, and panels recorded live by our researchers."
      parentLabel="Learning"
      parentHref="/learning"
    >
      {recordedLectures.map((lecture) => (
        <StaggerItem key={lecture.title}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {lecture.tag} — {lecture.duration}
                </span>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  By {lecture.speaker}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {lecture.title}
                </h3>
              </div>
              <div className="pt-4">
                <AnimatedLink href="/media/youtube-lectures">
                  Stream Lecture
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
