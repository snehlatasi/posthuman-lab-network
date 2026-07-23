"use client";

import React, { useState } from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface CourseItem {
  title: string;
  category: "course" | "guide" | "bibliography";
  tag: string;
  description: string;
  href: string;
}

const educationalResources: CourseItem[] = [
  {
    title: "Introduction to Posthumanism",
    category: "course",
    tag: "Core Course / 4 Modules",
    description: "A comprehensive academic entry point reviewing humanity, environment, and computational frameworks.",
    href: "/learning/introduction-to-posthumanism"
  },
  {
    title: "Beginner Pathways",
    category: "guide",
    tag: "Practical Guide",
    description: "Step-by-step reading routes and basic terminology overviews for self-directed learning.",
    href: "/learning/beginner-pathways"
  },
  {
    title: "Recorded Masterclasses",
    category: "guide",
    tag: "Media Archive",
    description: "Visual lectures and discussions from guest speakers on technological and biological networks.",
    href: "/learning/recorded-lectures"
  },
  {
    title: "Foundational Bibliography",
    category: "bibliography",
    tag: "Academic References",
    description: "Curated list of primary literature, philosophical essays, and scientific research publications.",
    href: "/learning/reading-lists"
  },
  {
    title: "Study Material PDF Packs",
    category: "bibliography",
    tag: "Downloads / Open Access",
    description: "Downloadable syllabi, lecture slides, and open-source worksheets for reading groups.",
    href: "/learning/study-materials"
  },
  {
    title: "H2 Database Integration Guide",
    category: "guide",
    tag: "Engineering Guide",
    description: "Documentation detailing the file-based embedded H2 integration used in our monolith.",
    href: "/learning/faq"
  }
];

export default function LearningPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "course" | "guide" | "bibliography">("all");

  const filteredResources = educationalResources.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const filters = [
    { label: "All Materials", active: activeFilter === "all", onClick: () => setActiveFilter("all") },
    { label: "Full Courses", active: activeFilter === "course", onClick: () => setActiveFilter("course") },
    { label: "Practical Guides", active: activeFilter === "guide", onClick: () => setActiveFilter("guide") },
    { label: "Bibliographies & Papers", active: activeFilter === "bibliography", onClick: () => setActiveFilter("bibliography") }
  ];

  return (
    <ListingPageLayout
      tag="Learning"
      title="FREE LEARNING HUB"
      subtitle="Open access knowledge resources mapping the intersections of humanity, tech, and nature."
      filters={filters}
    >
      {filteredResources.map((item) => (
        <StaggerItem key={item.title}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase">
                  {item.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className="pt-4">
                <AnimatedLink href={item.href}>
                  Access Materials
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
