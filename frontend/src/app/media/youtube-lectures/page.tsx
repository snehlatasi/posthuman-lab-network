"use client";

import { useEffect, useState } from "react";
import { ContentPageLayout } from "@/components/layout/Templates";
import { Reveal } from "@/components/ui/Reveal";
import type { MediaAssetDto } from "@/lib/api/cms";
import { cmsApi } from "@/lib/api/cms";

export default function YouTubeLecturesPage() {
  const [videos, setVideos] = useState<MediaAssetDto[]>([]);

  useEffect(() => {
    cmsApi
      .getMedia()
      .then((items) => {
        setVideos(items.filter((item) => item.provider === "YOUTUBE"));
      })
      .catch(() => setVideos([]));
  }, []);

  return (
    <ContentPageLayout
      tag="Lectures"
      title="YOUTUBE LECTURES"
      subtitle="Free, open-access video masterclasses and presentations on critical philosophy."
      parentLabel="Media"
      parentHref="/media"
    >
      <div className="space-y-12">
        <Reveal className="max-w-2xl">
          <p className="text-sm md:text-base text-bone-200/70 leading-relaxed">
            All our video assets are hosted openly to encourage broad academic participation.
            Published admin videos appear here after review.
          </p>
        </Reveal>

        {videos.length > 0 ? (
          <div className="space-y-10">
            {videos.map((video) => (
              <Reveal
                key={video.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-8 aspect-video w-full rounded-xl bg-carbon-900 border border-bone-200/10 overflow-hidden">
                  <iframe
                    src={video.url}
                    className="w-full h-full"
                    title={video.title || "YouTube Lecture"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest">
                    {video.category || "Published"}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-bone-50">
                    {video.title || video.filename}
                  </h3>
                  <p className="text-xs text-bone-200/60 leading-relaxed font-sans">
                    {video.caption || "Published video from the Posthuman Lab media library."}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="rounded-xl bg-carbon-900 border border-bone-200/10 p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-bone-200/50">
              No published YouTube lectures are available yet.
            </p>
          </Reveal>
        )}
      </div>
    </ContentPageLayout>
  );
}
