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
          <ContentCard className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 shadow-md hover:shadow-xl hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 dark:text-earth-400 tracking-wider font-bold uppercase block">
                  {post.tag}
                </span>
                <span className="font-sans text-xs text-carbon-900 dark:text-bone-200 uppercase font-bold tracking-wider block">
                  By {post.author}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50">
                  {post.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
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
