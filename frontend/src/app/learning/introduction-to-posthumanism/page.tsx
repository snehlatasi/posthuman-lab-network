"use client";

import React from "react";
import { EditorialPageLayout } from "@/components/layout/Templates";

const learningSidebar = [
  { label: "Introduction to Posthumanism", href: "/learning/introduction-to-posthumanism", active: true },
  { label: "Beginner Pathways", href: "/learning/beginner-pathways" },
  { label: "Recorded Lectures", href: "/learning/recorded-lectures" },
  { label: "Foundational Concepts", href: "/learning/foundational-concepts" },
  { label: "Reading Lists", href: "/learning/reading-lists" },
  { label: "Study Materials", href: "/learning/study-materials" },
  { label: "Downloads", href: "/learning/downloads" },
  { label: "Archive", href: "/learning/archive" },
  { label: "FAQ", href: "/learning/faq" }
];

export default function IntroToPosthumanismPage() {
  return (
    <EditorialPageLayout
      tag="Introduction"
      title="INTRODUCTION TO POSTHUMANISM"
      subtitle="Module 1: The Historical Context and Philosophical Underpinnings of Post-Anthropocentric Thought."
      parentLabel="Learning"
      parentHref="/learning"
      sidebarTitle="Learning Hub Menu"
      sidebarLinks={learningSidebar}
      nextPageLabel="Foundational Concepts"
      nextPageHref="/learning/foundational-concepts"
    >
      <div className="space-y-8 font-sans">
        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-bone-50 leading-tight">
            Class Overview
          </h3>
          <p className="text-sm md:text-base text-bone-200/70 leading-relaxed">
            This module provides a critical introduction to posthuman thought. Students will examine key texts that critique classical humanism, tracing the roots of human exceptionalism and exploring how modern technology, environmental changes, and scientific revelations reshape our understanding of what it means to be human.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-bone-50 leading-tight">
            Key Readings Include:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-bone-200/60 leading-relaxed">
            <li>*The Posthuman* by Rosi Braidotti (2013) — Mapping posthuman subjectivity and ethics.</li>
            <li>*Staying with the Trouble* by Donna Haraway (2016) — Sympoiesis and co-existence on a damaged planet.</li>
            <li>*Meeting the Universe Halfway* by Karen Barad (2007) — Agential realism and quantum entanglement.</li>
          </ul>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
