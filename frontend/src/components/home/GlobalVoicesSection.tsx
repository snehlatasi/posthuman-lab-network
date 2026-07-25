"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/Primitives";
import { Reveal } from "../ui/Reveal";
import { WorldMapSvg } from "./WorldMapSvg";
import { NetworkLocation } from "@/lib/data/locations";

export const GlobalVoicesSection: React.FC = () => {
  const [selectedLocId, setSelectedLocId] = useState<string | null>(null);

  const handleSelectLocation = (loc: NetworkLocation) => {
    setSelectedLocId(loc.id);
  };

  return (
    <section id="global-connection" className="py-20 md:py-28 border-t border-carbon-950/8 dark:border-bone-50/12 bg-transparent relative overflow-hidden transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Asymmetric Editorial Content (38% width) */}
          <div className="lg:col-span-5 space-y-8 pt-2">
            <Reveal className="space-y-4">
              <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.25em] block">
                GLOBAL CONNECTION
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-carbon-950 dark:text-bone-50 leading-[1.05] uppercase">
                Many Voices.<br />
                <span className="italic font-normal text-earth-600 dark:text-earth-400">No Single</span> Center.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-sans text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium max-w-md">
                We operate as a distributed research network. Our international chapters collaborate across geographical boundaries to conduct workshops, translate critical texts, and audit ecological bio-signals.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/community/global-voices"
                className="group inline-flex items-center space-x-3 text-xs font-sans tracking-widest uppercase font-bold text-carbon-950 dark:text-bone-50 hover:text-earth-600 dark:hover:text-earth-400 transition-colors focus:outline-none pt-2"
              >
                <span>Explore Global Voices</span>
                <div className="p-2.5 bg-bone-100 dark:bg-carbon-950 group-hover:bg-earth-600 dark:group-hover:bg-earth-500 text-carbon-950 dark:text-bone-50 group-hover:text-bone-50 transition-colors rounded-full border border-carbon-950/10 dark:border-bone-50/15">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </Reveal>
          </div>

          {/* Right Column: World Map Visual (62% width) */}
          <div className="lg:col-span-7 w-full">
            <Reveal yOffset={24}>
              <WorldMapSvg
                onSelectLocation={handleSelectLocation}
                selectedLocationId={selectedLocId}
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
