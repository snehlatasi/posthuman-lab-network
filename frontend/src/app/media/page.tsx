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
          <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 tracking-wider font-bold uppercase block">
                  {media.tag}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950">
                  {media.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 leading-relaxed font-medium">
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
