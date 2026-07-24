"use client";

import React from "react";
import { EditorialPageLayout } from "@/components/layout/Templates";

const aboutSidebarLinks = [
  { label: "Our Story", href: "/about/our-story" },
  { label: "What is Posthumanism?", href: "/about/what-is-posthumanism", active: true },
  { label: "Why We Created This Network", href: "/about/why-we-created-this-network" },
  { label: "Digital to Real Practice", href: "/about/digital-to-real-practice" },
  { label: "Founders & Collaborators", href: "/about/founders-collaborators" },
  { label: "Future Vision", href: "/about/future-vision" }
];

export default function WhatIsPosthumanismPage() {
  return (
    <EditorialPageLayout
      tag="What is Posthumanism?"
      title="DECENTERING THE HUMAN"
      subtitle="A brief introduction to the philosophical shift that repositions humanity within ecological and technological networks."
      parentLabel="About"
      parentHref="/about"
      sidebarTitle="About the Network"
      sidebarLinks={aboutSidebarLinks}
      nextPageLabel="Founders & Collaborators"
      nextPageHref="/about/founders-collaborators"
    >
      <div className="space-y-8 font-sans">
        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            1. Challenging Human Exceptionalism
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed">
            Posthumanism is a philosophical and cultural movement that critiques the traditional anthropocentric view of human beings as separate from, superior to, and dominant over the rest of the natural world. Instead of positioning the human at the center of the universe, posthumanism views humanity as a node in an interconnected web of matter, technology, and life.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            2. The Human-Machine Link
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed">
            As artificial intelligence, cybernetics, and digital tools evolve, the traditional boundaries of what constitutes &ldquo;the human&rdquo; blur. Posthuman thought examines how tools and technologies are not mere external instruments, but active extensions of our bodies and cognition.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            3. Ecological Interdependence
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed">
            From microbiomes in our stomachs to global atmospheric carbon cycles, humans are biologically co-dependent on microscopic bacteria, plant life, and animal networks. Posthumanism highlights this deep ecological interlinkage, arguing that human flourishing cannot be separated from the health of the nonhuman biosphere.
          </p>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
