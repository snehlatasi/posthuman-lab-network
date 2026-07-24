"use client";

import React from "react";
import { EditorialPageLayout } from "@/components/layout/Templates";

const supportSidebar = [
  { label: "Why Support?", href: "/support/why-support", active: true },
  { label: "Ways to Contribute", href: "/support/contribute" }
];

export default function WhySupportPage() {
  return (
    <EditorialPageLayout
      tag="Support"
      title="FOUNDATIONAL FUNDING GOALS"
      subtitle="A transparent breakdown of our initial estimated operating expenses."
      parentLabel="Support"
      parentHref="/support"
      sidebarTitle="Support Menu"
      sidebarLinks={supportSidebar}
      nextPageLabel="Ways to Contribute"
      nextPageHref="/support/contribute"
    >
      <div className="space-y-8 font-sans">
        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            Initial Operational Estimate
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed font-medium">
            The Posthuman Lab Network is currently in its foundational stage. To build a robust digital presence, coordinate interdisciplinary content, and host open-access meetings, we have calculated an initial estimated funding goal of **₹40,000 to ₹50,000**.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            Funding Priority Allocations
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed font-medium">
            All received support goes directly toward the operational components required to coordinate a horizontal global space:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-carbon-900 leading-relaxed font-medium">
            <li><strong>Website Design & Development:</strong> Establishing our dynamic React, Tailwind, and Spring Boot laboratory frameworks.</li>
            <li><strong>Domain & Hosting:</strong> Maintaining secure, low-latency, carbon-conscious server instances.</li>
            <li><strong>Google Meet Premium & Recording:</strong> Facilitating and archiving monthly guest speaker events and international dialogues.</li>
            <li><strong>Branding / Logo / Visual Identity:</strong> Laying down cohesive guidelines that communicate our digital-organic philosophy.</li>
            <li><strong>Content Creation & Outreach:</strong> Formulating learning pathway manuals, reading maps, and translating core materials.</li>
            <li><strong>Technical Support:</strong> Maintaining security, database backups, and local H2 persistence tools.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 leading-tight">
            A Core Aspiration
          </h3>
          <p className="text-sm md:text-base text-carbon-800 leading-relaxed font-medium">
            These estimations are focused entirely on grassroots maintenance and technical stability. They ensure that we can provide free learning resources, publish emerging scholars, and organize online events without commercial advertising or paywalls. No payment gateways or transaction scripts are active at this phase of implementation.
          </p>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
