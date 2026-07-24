"use client";

import React, { useState, useEffect } from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";
import { blogApi, BlogPost } from "@/lib/api/blog";
import { ArrowRight } from "lucide-react";

interface ArticleItem {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
}

const mockArticles: ArticleItem[] = [
  {
    slug: "speculative-soil-mapping-forest-bio-telemetry",
    title: "Speculative Soil: Mapping Forest Bio-Telemetry",
    category: "ECOLOGY",
    author: "Network Coordinator",
    date: "July 12, 2026",
    excerpt: "Exploring the translation of underground mycelium voltage signals into interactive digital canvas networks."
  },
  {
    slug: "linguistic-gateways-in-machine-architectures",
    title: "Linguistic Gateways in Machine Architectures",
    category: "AI & TECHNOLOGY",
    author: "Technical Coordinator",
    date: "June 28, 2026",
    excerpt: "Auditing transformer neural weights for anthropocentric language limits and exploring nonhuman semantic patterns."
  },
  {
    slug: "embodied-clay-digital-to-real-retreat",
    title: "Embodied Clay: The Digital-to-Real Retreat",
    category: "COMMUNITY",
    author: "Practice Coordinator",
    date: "May 19, 2026",
    excerpt: "Reflections from our off-grid coding, sculpting, and listening retreat in the Black Forest."
  }
];

export default function BlogIndexPage() {
  const [articles, setArticles] = useState<ArticleItem[]>(mockArticles);

  useEffect(() => {
    blogApi.getPublishedBlogPosts()
      .then((data: BlogPost[]) => {
        if (data && data.length > 0) {
          const mapped: ArticleItem[] = data.map((item) => ({
            slug: item.slug,
            title: item.title,
            category: "RESEARCH",
            author: item.author || "Posthuman Scholar",
            date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "Recent",
            excerpt: item.excerpt || "Research article published by the Posthuman Lab Network."
          }));
          setArticles(mapped);
        }
      })
      .catch(() => {
        // Fall back to mock articles
      });
  }, []);

  return (
    <ListingPageLayout
      tag="Blog & Articles"
      title="RESEARCH BLOG & ESSAYS"
      subtitle="Critical writing, field logs, algorithmic audits, and community reflections from network contributors."
    >
      {articles.map((item) => (
        <StaggerItem key={item.slug}>
          <ContentCard href={`/blog/${item.slug}`} className="border border-carbon-950/10 bg-white hover:bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300 h-full flex flex-col justify-between p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono tracking-widest text-earth-600 uppercase font-bold">
                <span>{item.category}</span>
                <span className="text-carbon-900 font-bold">{item.date}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-carbon-950 group-hover:text-earth-600 transition-colors leading-tight">
                {item.title}
              </h3>

              <p className="font-sans text-xs md:text-sm text-carbon-800 leading-relaxed font-medium">
                {item.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-carbon-950/10 flex justify-between items-center text-xs font-sans font-bold tracking-wider text-carbon-950 uppercase group-hover:text-earth-600 transition-colors">
              <span>Read Full Article</span>
              <div className="p-2 bg-bone-50 group-hover:bg-earth-600 text-carbon-950 group-hover:text-bone-50 transition-colors rounded-full border border-carbon-950/10">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
