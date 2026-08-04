"use client";

import { useEffect, useState } from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";
import type { MediaAssetDto } from "@/lib/api/cms";
import { cmsApi } from "@/lib/api/cms";

interface MediaItem {
  title: string;
  tag: string;
  description: string;
  href: string;
}

const mediaFiles: MediaItem[] = [
  {
    title: "Posthuman Subjectivities in the Anthropocene",
    tag: "Recorded Lecture / Video",
    description:
      "Opening keynote exploring biological citizenship, cybernetic links, and non-anthropocentric futures.",
    href: "/media/youtube-lectures",
  },
  {
    title: "Eco-Acoustics & Trans-Species Listening",
    tag: "Podcast / Audio",
    description:
      "Podcast Episode 12: An exploration of sub-soil soundscapes, microphone ethics, and forest recordings.",
    href: "/media/recorded-sessions",
  },
  {
    title: "Digital Moss: Generative Art Synthesis",
    tag: "Visual Essay / Multimedia",
    description:
      "A generative browser simulation mapping simulated lichen growth patterns based on environmental grids.",
    href: "/media/youtube-lectures",
  },
];

export default function MediaArchiveMainPage() {
  const [publishedMedia, setPublishedMedia] = useState<MediaAssetDto[]>([]);

  useEffect(() => {
    cmsApi
      .getMedia()
      .then(setPublishedMedia)
      .catch(() => setPublishedMedia([]));
  }, []);

  const latestVideo = publishedMedia.find((item) => item.provider === "YOUTUBE");
  const visibleMedia = latestVideo
    ? [
        {
          title: latestVideo.title || "Published YouTube Lecture",
          tag: `${latestVideo.category || "Lecture"} / Published Video`,
          description:
            latestVideo.caption ||
            "A published video from the Posthuman Lab Network media library.",
          href: "/media/youtube-lectures",
        },
        ...mediaFiles.slice(1),
      ]
    : mediaFiles;

  return (
    <ListingPageLayout
      tag="Media"
      title="YOUTUBE & MEDIA ARCHIVE"
      subtitle="Open-source video masterclasses, critical audio logs, visual essays, and code art."
    >
      {visibleMedia.map((media) => (
        <StaggerItem key={media.title}>
          <ContentCard className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 shadow-md hover:shadow-xl hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 dark:text-earth-400 tracking-wider font-bold uppercase block">
                  {media.tag}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50">
                  {media.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                  {media.description}
                </p>
              </div>
              <div className="pt-4">
                <AnimatedLink href={media.href}>View Media</AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
