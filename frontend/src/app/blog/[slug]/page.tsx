"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { EditorialPageLayout } from "@/components/layout/Templates";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogApi, BlogPost } from "@/lib/api/blog";

interface ArticleDetail {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  paragraphs: string[];
}

const mockArticleDatabase: Record<string, ArticleDetail> = {
  "speculative-soil-mapping-forest-bio-telemetry": {
    title: "SPECULATIVE SOIL: MAPPING FOREST BIO-TELEMETRY",
    category: "ECOLOGY",
    author: "Network Coordinator",
    date: "July 12, 2026",
    readTime: "6 min read",
    excerpt: "Exploring the translation of underground mycelium voltage signals into interactive digital canvas networks.",
    paragraphs: [
      "Traditional scientific logging separates soil parameters from cognitive human expressions. In our latest experiment at the Ecological Futures Lab, we deployed a small network of ESP32-based voltage probes directly into forest soil nodes.",
      "By tracking tiny electrical fluctuations between root channels and earth grids, we generate a live stream of biological telemetry. Instead of plotting this on generic industrial bar charts, we feed the raw voltage data directly into digital canvas nodes.",
      "The result is a living interface where plant voltages dictate node oscillations, sizing, and connector transparency. This decenters the human designer, allowing plant electrical signals to guide design topographies."
    ]
  },
  "linguistic-gateways-in-machine-architectures": {
    title: "LINGUISTIC GATEWAYS IN MACHINE ARCHITECTURES",
    category: "AI & TECHNOLOGY",
    author: "Technical Coordinator",
    date: "June 28, 2026",
    readTime: "8 min read",
    excerpt: "Auditing transformer neural weights for anthropocentric language limits and exploring nonhuman semantic patterns.",
    paragraphs: [
      "Most modern conversational AI is built on the assumption that human language is the supreme structure of intelligence. In this essay, we audit standard transformer models to trace how they enforce anthropocentric biases.",
      "When we prompt models to describe nonhuman actors—like lichens, rivers, or algorithmic structures—they default to human analogies. This limits our ability to conceptualize agencies that operate outside human timelines and vocabularies.",
      "We propose developing 'sympoietic mappers'—decentralized networks that utilize organic telemetry, acoustic ecology logs, and indigenous land datasets to train alternative language architectures."
    ]
  },
  "embodied-clay-digital-to-real-retreat": {
    title: "EMBODIED CLAY: THE DIGITAL-TO-REAL RETREAT",
    category: "COMMUNITY",
    author: "Practice Coordinator",
    date: "May 19, 2026",
    readTime: "5 min read",
    excerpt: "Reflections from our off-grid coding, sculpting, and listening retreat in the Black Forest.",
    paragraphs: [
      "Philosophy should not exist solely as screen text. Our digital-to-real practice vision was tested during our three-day off-grid gathering, where writers, developers, and philosophers gathered in the wilderness.",
      "During the day, we sculpted local forest clay, forming shapes that symbolized technical structures like databases and API gateways. During the night, we critiqued carbon server footprints and discussed decolonial computing guidelines.",
      "This somatic grounding is essential. It ensures that our planetary digital networking remains deeply linked to local, tangible, real-world community actions."
    ]
  }
};

export default function BlogArticleDetailPage() {
  const params = useParams();
  const slugStr = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";

  const [post, setPost] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slugStr) return;

    blogApi.getBlogPostBySlug(slugStr)
      .then((data: BlogPost) => {
        if (data) {
          setPost({
            title: data.title,
            category: "RESEARCH",
            author: data.author || "Posthuman Scholar",
            date: data.publishedAt ? new Date(data.publishedAt).toLocaleDateString() : "Recent",
            readTime: "5 min read",
            excerpt: data.excerpt || "Article details retrieved from Posthuman Lab Network.",
            paragraphs: data.content ? data.content.split("\n\n") : ["Content loading..."]
          });
        } else {
          setPost(mockArticleDatabase[slugStr] || null);
        }
        setLoading(false);
      })
      .catch(() => {
        setPost(mockArticleDatabase[slugStr] || null);
        setLoading(false);
      });
  }, [slugStr]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-carbon-950 text-bone-200">
        <span className="font-mono text-xs animate-pulse tracking-widest uppercase">
          Loading Article Telemetry...
        </span>
      </div>
    );
  }

  const activeArticle = post || mockArticleDatabase[slugStr] || {
    title: slugStr.replace(/-/g, " ").toUpperCase(),
    category: "RESEARCH",
    author: "Network Coordinator",
    date: "July 2026",
    readTime: "5 min read",
    excerpt: "Article record synced from local H2 database repository.",
    paragraphs: ["Detailed analysis content for this article is being synchronized with the network nodes."]
  };

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: activeArticle.title }
  ];

  const sidebarLinks = Object.keys(mockArticleDatabase).map((key) => ({
    label: mockArticleDatabase[key].title.toLowerCase(),
    href: `/blog/${key}`,
    active: key === slugStr
  }));

  return (
    <EditorialPageLayout
      tag={activeArticle.category}
      title={activeArticle.title}
      subtitle={activeArticle.excerpt}
      parentLabel="Blog"
      parentHref="/blog"
      sidebarTitle="Latest Articles"
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8 font-sans">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex flex-wrap gap-4 text-xs font-mono text-carbon-900 font-bold border-b border-carbon-950/10 pb-4 mb-6">
          <span>By {activeArticle.author}</span>
          <span>•</span>
          <span>📅 {activeArticle.date}</span>
          <span>•</span>
          <span>⏰ {activeArticle.readTime}</span>
        </div>

        {activeArticle.paragraphs.map((p, idx) => (
          <p key={idx} className="text-sm md:text-base text-carbon-900 leading-relaxed font-medium">
            {p}
          </p>
        ))}

        {/* Back Link */}
        <div className="pt-8 border-t border-carbon-950/8 mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-sans tracking-wider uppercase font-bold text-carbon-950 hover:text-earth-600 transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    </EditorialPageLayout>
  );
}
