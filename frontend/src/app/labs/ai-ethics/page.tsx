"use client";

import React from "react";
import { EditorialPageLayout } from "@/components/layout/Templates";

const labsSidebar = [
  { label: "Research Labs", href: "/labs/research" },
  { label: "Creative Labs", href: "/labs/creative" },
  { label: "Ecological Futures", href: "/labs/ecological-futures" },
  { label: "AI Ethics & Tech", href: "/labs/ai-ethics", active: true },
  { label: "Experimental Media", href: "/labs/experimental-media" },
  { label: "Collective Practice", href: "/labs/collective-practice" },
  { label: "Community Research", href: "/labs/community-research" },
  { label: "Open Collaboration", href: "/labs/open-collaboration" }
];

export default function AIEthicsLabPage() {
  return (
    <EditorialPageLayout
      tag="AI Ethics"
      title="AI ETHICS & TECHNOLOGY"
      subtitle="Auditing algorithmic systems, synthetic mind structures, and human-machine symbiotic relationships."
      parentLabel="Labs"
      parentHref="/labs"
      sidebarTitle="Labs Menu"
      sidebarLinks={labsSidebar}
      nextPageLabel="Ecological Futures"
      nextPageHref="/labs/ecological-futures"
    >
      <div className="space-y-8 font-sans">
        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-bone-50 leading-tight">
            The Philosophy of Machine Symbiosis
          </h3>
          <p className="text-sm md:text-base text-bone-200/70 leading-relaxed">
            We reject the narrative of a hostile AI takeover, as well as the standard corporate optimization models. We view artificial intelligence as a new category of nonhuman cognitive agency—a synthetic partner that reflects and reshapes human discourse. Our research frames machine learning models as collaborators in posthuman knowledge production.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-bone-50 leading-tight">
            Key Focus Area: Algorithmic Audits & Open Weights
          </h3>
          <p className="text-sm md:text-base text-bone-200/70 leading-relaxed">
            We build open-source tools to inspect biases in generative neural nets and audit datasets for historical, cultural, and environmental bias. By promoting transparent weights and decentralized AI systems, we work to protect digital assets from corporate capture.
          </p>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
