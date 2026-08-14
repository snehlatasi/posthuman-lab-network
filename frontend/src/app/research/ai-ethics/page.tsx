"use client";

import { EditorialPageLayout } from "@/components/layout/Templates";

const researchSidebar = [
  { label: "Research Cells", href: "/research/research" },
  { label: "Creative Research", href: "/research/creative" },
  { label: "Ecological Futures", href: "/research/ecological-futures" },
  { label: "AI Ethics & Tech", href: "/research/ai-ethics", active: true },
  { label: "Experimental Media", href: "/research/experimental-media" },
  { label: "Collective Practice", href: "/research/collective-practice" },
  { label: "Community Research", href: "/research/community-research" },
  { label: "Open Collaboration", href: "/research/open-collaboration" },
];

export default function AIEthicsResearchPage() {
  return (
    <EditorialPageLayout
      tag="AI Ethics"
      title="AI ETHICS & TECHNOLOGY"
      subtitle="Auditing algorithmic systems, synthetic mind structures, and human-machine symbiotic relationships."
      parentLabel="Research"
      parentHref="/research"
      sidebarTitle="Research Menu"
      sidebarLinks={researchSidebar}
      nextPageLabel="Ecological Futures"
      nextPageHref="/research/ecological-futures"
    >
      <div className="space-y-8 font-sans">
        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 dark:text-bone-50 leading-tight">
            The Philosophy of Machine Symbiosis
          </h3>
          <p className="text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
            We reject the narrative of a hostile AI takeover, as well as the standard corporate
            optimization models. We view artificial intelligence as a new category of nonhuman
            cognitive agency—a synthetic partner that reflects and reshapes human discourse. Our
            research frames machine learning models as collaborators in posthuman knowledge
            production.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 dark:text-bone-50 leading-tight">
            Key Focus Area: Algorithmic Audits & Open Weights
          </h3>
          <p className="text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
            We build open-source tools to inspect biases in generative neural nets and audit
            datasets for historical, cultural, and environmental bias. By promoting transparent
            weights and decentralized AI systems, we work to protect digital assets from corporate
            capture.
          </p>
        </section>
      </div>
    </EditorialPageLayout>
  );
}

