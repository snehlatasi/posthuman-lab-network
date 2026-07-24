"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { EditorialPageLayout } from "@/components/layout/Templates";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { publicationsApi, PublicationApiDto } from "@/lib/api/publications";

const mockPublicationsFallback: Record<string, PublicationApiDto> = {
  "agential-realism-and-nonhuman-subjectivities": {
    id: 1,
    title: "Agential Realism and Nonhuman Subjectivities",
    slug: "agential-realism-and-nonhuman-subjectivities",
    summary: "Re-evaluating Karen Barad's quantum intra-actions inside forest electrical voltage grids.",
    content: "In this research paper, we trace the intersection of quantum field theory and environmental sensing. Traditional scientific methodologies view nature as an inert background to human agency. By deploying distributed transducer arrays across woodland ecosystems, we demonstrate that biological systems actively generate continuous electrical telemetry. Reading these signals through Barad's framework of agential realism reveals that data is not merely collected; it is dynamically co-constituted through ongoing relational intra-actions.",
    authorDisplayName: "Dr. Elena Rostova",
    publicationType: "ARTICLE",
    status: "PUBLISHED",
    createdAt: "2026-07-01T10:00:00",
    updatedAt: "2026-07-01T10:00:00"
  },
  "lichen-synth": {
    id: 2,
    title: "Lichen-Synth: Generative Visual Topologies",
    slug: "lichen-synth",
    summary: "A review of generative growth algorithms behaving as simulated posthuman bio-environments.",
    content: "Lichen-Synth explores cellular automata and reaction-diffusion equations styled after symbiotic lichen growth patterns. By mapping algorithmic growth rules to real-time ambient soundscapes, this project decenters human aesthetic choices. The resulting visual topologies evolve organically, providing an interactive canvas that models nonhuman longevity and slow ecological time.",
    authorDisplayName: "Marcus Vance",
    publicationType: "CREATIVE_WORK",
    status: "PUBLISHED",
    createdAt: "2026-06-15T10:00:00",
    updatedAt: "2026-06-15T10:00:00"
  },
  "algorithmic-inquiries": {
    id: 3,
    title: "Algorithmic Inquiries on Large Language Models",
    slug: "algorithmic-inquiries",
    summary: "Auditing transformer neural networks for linguistic biases and nonhuman semantic agency.",
    content: "Transformer architectures trained primarily on digitized human text carry deep anthropocentric assumptions. When queried about multi-species ethics or nonhuman agencies, these models default to human utility paradigms. We outline an auditing framework for evaluating transformer outputs, proposing alternative training objectives that integrate environmental telemetry and decentered linguistic mappers.",
    authorDisplayName: "Anya Chen",
    publicationType: "RESEARCH",
    status: "PUBLISHED",
    createdAt: "2026-05-20T10:00:00",
    updatedAt: "2026-05-20T10:00:00"
  }
};

export default function PublicationDetailPage() {
  const params = useParams();
  const slugStr = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  
  const [publication, setPublication] = useState<PublicationApiDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slugStr) return;

    publicationsApi.getPublicationBySlug(slugStr)
      .then((data) => {
        setPublication(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to static mock if backend API fails or record doesn't exist in H2 yet
        const fallback = mockPublicationsFallback[slugStr];
        if (fallback) {
          setPublication(fallback);
        }
        setLoading(false);
      });
  }, [slugStr]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-carbon-950 text-bone-200">
        <span className="font-mono text-xs animate-pulse tracking-widest uppercase">
          Loading Document Telemetry...
        </span>
      </div>
    );
  }

  const activePub = publication || mockPublicationsFallback[slugStr] || {
    id: 0,
    title: slugStr.replace(/-/g, " ").toUpperCase(),
    slug: slugStr,
    summary: "Document details retrieved from Posthuman Lab Network repository.",
    content: "Detailed research content is synchronized with the Posthuman Lab Network knowledge base.",
    authorDisplayName: "Network Scholar",
    publicationType: "ARTICLE" as const,
    status: "PUBLISHED" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const breadcrumbItems = [
    { label: "Publications", href: "/publications" },
    { label: activePub.title }
  ];

  const sidebarLinks = Object.keys(mockPublicationsFallback).map((key) => ({
    label: mockPublicationsFallback[key].title.toLowerCase(),
    href: `/publications/${key}`,
    active: key === slugStr
  }));

  return (
    <EditorialPageLayout
      tag={activePub.publicationType}
      title={activePub.title}
      subtitle={activePub.summary}
      parentLabel="Publications"
      parentHref="/publications"
      sidebarTitle="Related Documents"
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8 font-sans">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex flex-wrap gap-4 text-xs font-mono text-carbon-900 font-bold border-b border-carbon-950/10 pb-4 mb-6">
          <span className="text-carbon-950 font-bold">By {activePub.authorDisplayName}</span>
          <span>•</span>
          <span className="text-earth-600 font-bold uppercase">Category: {activePub.publicationType}</span>
          {activePub.publishedAt && (
            <>
              <span>•</span>
              <span className="text-carbon-900 font-bold">📅 {new Date(activePub.publishedAt).toLocaleDateString()}</span>
            </>
          )}
        </div>

        <div className="max-w-none text-carbon-800 leading-relaxed space-y-6 text-sm md:text-base font-medium">
          {activePub.content.split("\n\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Back Link */}
        <div className="pt-8 border-t border-carbon-950/10 mt-8">
          <Link
            href="/publications"
            className="inline-flex items-center space-x-2 text-xs font-sans tracking-wider uppercase font-bold text-carbon-950 hover:text-earth-600 transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Publications</span>
          </Link>
        </div>
      </div>
    </EditorialPageLayout>
  );
}
