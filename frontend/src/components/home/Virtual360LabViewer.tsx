"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Leaf, Microscope, Mountain, NotebookTabs } from "lucide-react";

const spaces = [
  {
    title: "Research Studio",
    eyebrow: "Urban Node",
    description:
      "A quiet editorial workspace for reading groups, annotation sessions, ethics audits, and small interdisciplinary seminars.",
    imageSrc: "/posthuman_lab_360.jpg",
    icon: Microscope,
    bullets: ["Reading circles", "Editorial workshops", "Critical AI review"]
  },
  {
    title: "Forest Retreat",
    eyebrow: "Embodied Practice",
    description:
      "A slower field setting for ecological sensing, clay practice, collective writing, and physically grounded reflection.",
    imageSrc: "/retreat_black_forest.jpg",
    icon: Mountain,
    bullets: ["Field observation", "Ecological listening", "Off-grid gatherings"]
  }
];

export const Virtual360LabViewer: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden border-t border-carbon-950/8 dark:border-bone-50/12 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--section-gradient-from)] via-transparent to-[var(--section-gradient-to)] pointer-events-none" />
      <Container>
        <Reveal>
          <div className="max-w-3xl space-y-4 mb-12">
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.24em] block">
              03.5 • Spaces of Practice
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-carbon-950 dark:text-bone-100 text-balance">
              THE NETWORK LIVES IN REAL SPACES, NOT JUST INTERFACES
            </h2>
            <p className="font-sans text-base md:text-lg text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
              Instead of an abstract 360 demo, this section now shows the two environments that actually shape the project:
              the studio for study and discussion, and the retreat for embodied, ecological work.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <div className="grid md:grid-cols-2 gap-6">
              {spaces.map((space) => {
                const Icon = space.icon;
                return (
                  <article
                    key={space.title}
                    className="bg-white dark:bg-carbon-900/90 rounded-[30px] overflow-hidden border border-carbon-950/10 dark:border-bone-50/15 shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={space.imageSrc}
                        alt={space.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/65 via-carbon-950/20 to-transparent" />
                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 dark:bg-carbon-950/90 px-3 py-1.5 border border-carbon-950/10 dark:border-bone-50/15 shadow-sm">
                        <Icon className="w-3.5 h-3.5 text-earth-600 dark:text-earth-400" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-carbon-950 dark:text-bone-100 font-bold">
                          {space.eyebrow}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="font-serif text-3xl font-bold text-carbon-950 dark:text-bone-100">{space.title}</h3>
                      <p className="font-sans text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">{space.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {space.bullets.map((bullet) => (
                          <span
                            key={bullet}
                            className="inline-flex items-center rounded-full bg-bone-50 dark:bg-carbon-950 px-3 py-1.5 border border-carbon-950/10 dark:border-bone-50/15 font-mono text-[10px] uppercase tracking-[0.16em] text-carbon-900 dark:text-bone-200 font-bold"
                          >
                            {bullet}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="editorial-surface rounded-[32px] p-8 md:p-10 space-y-6 border border-carbon-950/10 dark:border-bone-50/15 shadow-md">
              <div className="inline-flex items-center gap-2 rounded-full bg-earth-500/15 px-3.5 py-1.5 border border-earth-500/30">
                <NotebookTabs className="w-4 h-4 text-earth-600 dark:text-earth-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-earth-600 dark:text-earth-400 font-bold">
                  Why this works better
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-bold text-carbon-950 dark:text-bone-100 text-balance">
                A clearer story, a calmer interface, and visuals that actually belong here.
              </h3>

              <div className="space-y-4 text-carbon-800 dark:text-bone-200 font-sans text-sm leading-relaxed font-medium">
                <p>
                  The previous 360 interaction felt more like a generic tech showcase than a meaningful expression of posthuman research,
                  ecological study, and embodied gathering.
                </p>
                <p>
                  This new section keeps the visual richness, but turns it into editorial context. It helps visitors understand the project
                  through place, rhythm, and practice rather than through an interface trick.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-[24px] bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 p-5 space-y-3 shadow-sm">
                  <Leaf className="w-5 h-5 text-moss-600 dark:text-moss-300" />
                  <h4 className="font-serif text-2xl font-bold text-carbon-950 dark:text-bone-100">More relevant</h4>
                  <p className="font-sans text-sm text-carbon-800 dark:text-bone-200 font-medium">
                    Aligns the visuals with scholarship, ecology, workshops, and retreat culture.
                  </p>
                </div>
                <div className="rounded-[24px] bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 p-5 space-y-3 shadow-sm">
                  <Microscope className="w-5 h-5 text-earth-600 dark:text-earth-400" />
                  <h4 className="font-serif text-2xl font-bold text-carbon-950 dark:text-bone-100">More readable</h4>
                  <p className="font-sans text-sm text-carbon-800 dark:text-bone-200 font-medium">
                    Uses stronger tonal separation and calmer composition so text stays easy to scan.
                  </p>
                </div>
              </div>

              <Link
                href="/events"
                className="group inline-flex items-center gap-2 pt-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-carbon-950 dark:text-bone-100 hover:text-earth-600 dark:hover:text-earth-400 transition-colors"
              >
                <span>See Upcoming Gatherings</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
