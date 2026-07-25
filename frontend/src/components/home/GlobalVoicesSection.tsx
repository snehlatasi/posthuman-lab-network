"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/Primitives";
import { WorldMapSvg } from "./WorldMapSvg";
import type { NetworkLocation } from "@/lib/data/locations";

export const GlobalVoicesSection: React.FC = () => {
  const [selectedLocId, setSelectedLocId] = useState<string | null>(null);

  const handleSelectLocation = (loc: NetworkLocation) => {
    setSelectedLocId(loc.id);
  };

  return (
    <section
      id="global-connection"
      className="py-20 md:py-28 xl:py-32 border-t border-carbon-950/8 dark:border-bone-50/12 bg-transparent relative overflow-hidden transition-colors duration-300"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column: Asymmetric Editorial Content (38% width) */}
          <div className="lg:col-span-4 lg:pl-1">
            <div className="max-w-[34rem] border-l border-earth-600/40 dark:border-earth-400/30 pl-6 md:pl-7 space-y-7">
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.28em] block">
                  GLOBAL CONNECTION
                </span>
                <h2 className="font-serif-display text-[2.8rem] sm:text-5xl xl:text-[3.65rem] font-bold text-carbon-950 dark:text-bone-50 leading-[1.08] text-balance">
                  Many voices.
                  <span className="block italic font-normal text-earth-600 dark:text-earth-400">
                    No single center.
                  </span>
                </h2>
              </div>

              <p className="font-sans text-[0.95rem] md:text-base text-carbon-800 dark:text-bone-200 leading-[1.82] font-medium">
                We operate as a distributed research network. Our international chapters collaborate
                across geographical boundaries to conduct workshops, translate critical texts, and
                audit ecological bio-signals.
              </p>

              <Link
                href="/community/global-voices"
                className="group inline-flex items-center space-x-3 text-xs font-sans tracking-widest uppercase font-bold text-carbon-950 dark:text-bone-50 hover:text-earth-600 dark:hover:text-earth-400 transition-colors focus:outline-none pt-1"
              >
                <span>Explore Global Voices</span>
                <div className="p-2.5 bg-bone-100/90 dark:bg-carbon-950/70 group-hover:bg-earth-600 dark:group-hover:bg-earth-500 text-carbon-950 dark:text-bone-50 group-hover:text-bone-50 transition-colors rounded-full border border-carbon-950/10 dark:border-bone-50/15 shadow-sm backdrop-blur-sm">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: World Map Visual (62% width) */}
          <div className="lg:col-span-8 w-full">
            <WorldMapSvg
              onSelectLocation={handleSelectLocation}
              selectedLocationId={selectedLocId}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
