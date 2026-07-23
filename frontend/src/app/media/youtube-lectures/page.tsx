"use client";

import React from "react";
import { ContentPageLayout } from "@/components/layout/Templates";
import { Reveal } from "@/components/ui/Reveal";

export default function YouTubeLecturesPage() {
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
            All our video assets are hosted openly to encourage broad academic participation. Below is our featured recording from the current volume.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Mock Video Player */}
          <div className="lg:col-span-8 aspect-video w-full rounded-xl bg-carbon-900 border border-bone-200/10 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 digital-grid opacity-30" />
            <div className="absolute w-16 h-16 rounded-full bg-bone-100/10 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform cursor-pointer border border-bone-100/20 group">
              <span className="text-bone-100 ml-1">▶</span>
            </div>
            <span className="font-mono text-[9px] text-bone-200/30 tracking-widest uppercase absolute bottom-4">
              Stream Video (YouTube Mock Interface)
            </span>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest">Featured</span>
            <h3 className="font-serif text-2xl font-bold text-bone-50">Subjectivities in the Anthropocene</h3>
            <p className="text-xs text-bone-200/60 leading-relaxed font-sans">
              Recorded live at the London Hub during our summer panel. Elena Rostova explores posthuman ethics, agential realism, and ecological survival.
            </p>
          </div>
        </Reveal>
      </div>
    </ContentPageLayout>
  );
}
