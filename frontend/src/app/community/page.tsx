"use client";

import React from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface PostItem {
  title: string;
  author: string;
  tag: string;
  description: string;
}

const communityFeed: PostItem[] = [
  {
    title: "Diaries from a Concrete Forest",
    author: "Elena Rostova",
    tag: "Reflections / Germany",
    description: "Speculative diary entries on moss colonization across city concrete structures and architectural decay."
  },
  {
    title: "Entangled Voices: Sub-soil Listening",
    author: "Kojo Boateng",
    tag: "Speculative / Ghana",
    description: "Listening exercises detailing sub-soil insect activity and localized rain-drainage systems."
  },
  {
    title: "Algorithmic Subjectivities: AI Symbiosis",
    author: "Anya Chen",
    tag: "Research Notes / Global",
    description: "A short review of conversational interactions with language models behaving as digital companions."
  }
];

export default function CommunityMainPage() {
  return (
    <ListingPageLayout
      tag="Community"
      title="COMMUNITY SPACE"
      subtitle="Open discussions, reading circles, speculative diaries, and shared project spaces."
    >
      {communityFeed.map((post) => (
        <StaggerItem key={post.title}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  {post.tag}
                </span>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  By {post.author}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {post.title}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                  {post.description}
                </p>
              </div>
              <div className="pt-4">
                <AnimatedLink href="/community/global-voices">
                  Read Reflections
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
