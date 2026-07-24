"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/Primitives";
import { Reveal } from "../ui/Reveal";

const activeHubLocations = [
  { region: "India", count: "12 members", top: "40%", left: "65%" },
  { region: "Europe", count: "48 members", top: "25%", left: "48%" },
  { region: "Latin America", count: "18 members", top: "60%", left: "30%" },
  { region: "East Asia", count: "15 members", top: "35%", left: "78%" },
  { region: "Africa", count: "9 members", top: "55%", left: "54%" },
  { region: "North America", count: "24 members", top: "30%", left: "22%" }
];

export const GlobalVoicesSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 border-t border-carbon-950/8 dark:border-bone-50/12 bg-transparent relative overflow-hidden transition-colors duration-300">
      
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal className="space-y-4">
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.25em] block">
              GLOBAL CONNECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-carbon-950 dark:text-bone-50 leading-tight uppercase">
              Many Voices.<br />No Single Center.
            </h2>
            <p className="font-sans text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium max-w-xl">
              We operate as a distributed network. Our researchers and artists form localized chapters to conduct workshops, translate essays, and catalog ecological observations.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              href="/community/global-voices"
              className="group inline-flex items-center space-x-3 text-xs font-sans tracking-widest uppercase font-bold text-carbon-950 dark:text-bone-50 hover:text-earth-600 dark:hover:text-earth-400 transition-colors focus:outline-none"
            >
              <span>Explore Global Voices</span>
              <div className="p-2.5 bg-bone-100 dark:bg-carbon-950 group-hover:bg-earth-600 dark:group-hover:bg-earth-500 text-carbon-950 dark:text-bone-50 group-hover:text-bone-50 transition-colors rounded-full border border-carbon-950/10 dark:border-bone-50/15">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </Reveal>
        </div>

        {/* Right column: Graphic placeholder map */}
        <div className="lg:col-span-7">
          <Reveal className="relative aspect-video w-full rounded-xl bg-carbon-900/60 border border-bone-200/15 overflow-hidden flex items-center justify-center shadow-inner" yOffset={32}>
            {/* Subtle grid background */}
            <div className="absolute inset-0 digital-grid opacity-30 pointer-events-none" />
            
            {/* Node labels */}
            {activeHubLocations.map((hub) => (
              <div
                key={hub.region}
                className="absolute flex items-center space-x-2 -translate-x-1/2 -translate-y-1/2 group cursor-default"
                style={{ top: hub.top, left: hub.left }}
              >
                {/* Pulsing ring indicator */}
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss-500 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-moss-500"></span>
                </div>
                <div className="bg-carbon-950/90 backdrop-blur px-2.5 py-1 rounded border border-bone-200/20 group-hover:border-moss-300 transition-all text-left">
                  <span className="font-serif text-[11px] font-bold text-bone-50 block">{hub.region}</span>
                  <span className="font-mono text-[9px] text-bone-200 font-medium block leading-none">{hub.count}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
