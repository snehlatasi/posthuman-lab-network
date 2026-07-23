"use client";

import React, { useState } from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";

interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  category: "POSTHUMANISM" | "AI & TECHNOLOGY" | "ECOLOGY" | "ART & CREATIVITY" | "RESEARCH" | "COMMUNITY" | "REFLECTIONS";
  summary: string;
  author: string;
  date: string;
  readTime: string;
}

// Development-only template records (labeled cleanly as prospective logs)
const blogArticleFeed: BlogArticle[] = [
  {
    id: 1,
    title: "Speculative Soil: Mapping Forest Bio-Telemetry",
    slug: "speculative-soil-mapping-forest-bio-telemetry",
    category: "ECOLOGY",
    summary: "Reflections on translating underground root voltage shifts into spatial digital canvas configurations.",
    author: "Network Coordinator",
    date: "July 12, 2026",
    readTime: "6 min read"
  },
  {
    id: 2,
    title: "Linguistic Gateways in Machine Architectures",
    slug: "linguistic-gateways-in-machine-architectures",
    category: "AI & TECHNOLOGY",
    summary: "Auditing LLMs for anthropocentric vocabulary limits and exploring nonhuman semantic structures.",
    author: "Technical Coordinator",
    date: "June 28, 2026",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Embodied Clay: The Digital-to-Real Wilderness Retreat",
    slug: "embodied-clay-digital-to-real-retreat",
    category: "COMMUNITY",
    summary: "Reflections from our off-grid coding and clay sculpting retreat in the Black Forest.",
    author: "Practice Coordinator",
    date: "May 19, 2026",
    readTime: "5 min read"
  }
];

export default function BlogLandingPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  const categories = [
    "ALL",
    "POSTHUMANISM",
    "AI & TECHNOLOGY",
    "ECOLOGY",
    "ART & CREATIVITY",
    "RESEARCH",
    "COMMUNITY",
    "REFLECTIONS"
  ];

  const filteredArticles = selectedFilter === "ALL" 
    ? blogArticleFeed 
    : blogArticleFeed.filter((art) => art.category === selectedFilter);

  const filters = categories.map((cat) => ({
    label: cat,
    active: selectedFilter === cat,
    onClick: () => setSelectedFilter(cat)
  }));

  return (
    <ListingPageLayout
      tag="Blog"
      title="IDEAS & REFLECTIONS"
      subtitle="Speculative writing, research diaries, conversations, and emerging perspectives from the Posthuman Lab Network."
      filters={filters}
    >
      {/* Editorial coming-soon disclaimer banner */}
      <div className="col-span-12">
        <div className="p-4 rounded-lg bg-carbon-900 border border-bone-200/5 text-[10px] font-mono text-bone-200/40 leading-relaxed max-w-xl">
          💡 [DEMO FEED] Client articles and personal diaries will be published here soon. The templates below show planned formatting.
        </div>
      </div>

      {filteredArticles.map((post) => (
        <StaggerItem key={post.id}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10 h-full flex flex-col justify-between p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-moss-500 uppercase font-semibold">
                  <span>{post.category}</span>
                  <span className="text-bone-200/30">{post.readTime}</span>
                </div>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  By {post.author} — {post.date}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {post.title}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4">
                <AnimatedLink href={`/blog/${post.slug}`}>
                  Read Article
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}

      {filteredArticles.length === 0 && (
        <div className="col-span-12 text-center py-16">
          <p className="font-mono text-xs text-bone-200/40 uppercase tracking-widest">
            No items found under this concept category.
          </p>
        </div>
      )}
    </ListingPageLayout>
  );
}
