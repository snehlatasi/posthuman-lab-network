"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface MediaItem {
  title: string;
  type: "video" | "podcast" | "art";
  tag: string;
  description: string;
  href: string;
}

const mediaFiles: MediaItem[] = [
  {
    title: "Posthuman Subjectivities in the Anthropocene",
    type: "video",
    tag: "Recorded Lecture / Video",
    description: "Opening keynote exploring biological citizenship, cybernetic links, and non-anthropocentric futures.",
    href: "/media/youtube-lectures"
  },
  {
    title: "Eco-Acoustics & Trans-Species Listening",
    type: "podcast",
    tag: "Podcast / Audio",
    description: "Podcast Episode 12: An exploration of sub-soil soundscapes, microphone ethics, and forest recordings.",
    href: "/media/recorded-sessions"
  },
  {
    title: "Digital Moss: Generative Art Synthesis",
    type: "art",
    tag: "Visual Essay / Multimedia",
    description: "A generative browser simulation mapping simulated lichen growth patterns based on environmental grids.",
    href: "/media/youtube-lectures"
  }
];

export default function MediaArchiveMainPage() {
  return (
    <ListingPageLayout
      tag="Media"
      title="YOUTUBE & MEDIA ARCHIVE"
      subtitle="Open-source video masterclasses, critical audio logs, visual essays, and code art."
    >
      {mediaFiles.map((media) => (
        <StaggerItem key={media.title}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {media.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {media.title}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                  {media.description}
                </p>
              </div>
              <div className="pt-4">
                <AnimatedLink href={media.href}>
                  View Media
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
