"use client";

import React from "react";
import { EditorialPageLayout } from "@/components/layout/Templates";

const aboutSidebarLinks = [
  { label: "Our Story", href: "/about/our-story", active: true },
  { label: "What is Posthumanism?", href: "/about/what-is-posthumanism" },
  { label: "Why We Created This Network", href: "/about/why-we-created-this-network" },
  { label: "Digital to Real Practice", href: "/about/digital-to-real-practice" },
  { label: "Founders & Collaborators", href: "/about/founders-collaborators" },
  { label: "Future Vision", href: "/about/future-vision" }
];

export default function OurStoryPage() {
  return (
    <EditorialPageLayout
      tag="Our Story"
      title="THE EVOLUTION OF OUR LAB"
      subtitle="How a decentralized research collective became a living ecosystem for ecological and technological philosophy."
      parentLabel="About"
      parentHref="/about"
      sidebarTitle="About the Network"
      sidebarLinks={aboutSidebarLinks}
      nextPageLabel="What is Posthumanism?"
      nextPageHref="/about/what-is-posthumanism"
    >
      <div className="space-y-8 font-sans">
        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-bone-50 leading-tight">
            Origins: The Posthuman Educator Experience
          </h3>
          <p className="text-sm md:text-base text-bone-200/70 leading-relaxed">
            The inspiration for the Posthuman Lab Network emerged directly from the Posthuman Educator experience. It arose from the realization that critical, interdisciplinary discussions on posthumanism should not be locked behind institutional walls. We saw a clear need to make posthuman conversations more accessible, interactive, creative, and community-oriented, giving emerging scholars and independent artists a platform to collaborate.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-bone-50 leading-tight">
            Expansion: Bounded Laboratories (2024)
          </h3>
          <p className="text-sm md:text-base text-bone-200/70 leading-relaxed">
            By 2024, our community grew. We recognized that digital conversations, while powerful, were insufficient. We formally set up three collaborative labs—the *Ecological Futures Lab*, *AI Ethics Unit*, and *Experimental Media Studio*—as digital-organic testing workspaces. Each lab focused on practical coding experiments, from tracking local tree-root voltages to auditing large language models.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-bone-50 leading-tight">
            Integration: Embodied Exchange (2025)
          </h3>
          <p className="text-sm md:text-base text-bone-200/70 leading-relaxed">
            Fusing our digital work with local real-world actions, we initiated physical meetups and wilderness retreat programs. Philosophers, developers, and artists met off-grid to write code, touch clay, cook together, and critique modern technologies away from the hyper-connected noise of traditional university spaces.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-bone-50 leading-tight">
            Today: A Living Laboratory
          </h3>
          <p className="text-sm md:text-base text-bone-200/70 leading-relaxed">
            Today, the Posthuman Lab Network functions as a **&ldquo;Living Digital Laboratory&rdquo;**. Over 300 active contributors link their research data, publish papers, share recorded lectures, and organize monthly meetups. We run entirely on open-source, lightweight technical codebases (like the Spring Boot modular monolith and Next.js setup you are looking at now), keeping our digital footprint carbon-conscious and accessible to all.
          </p>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
