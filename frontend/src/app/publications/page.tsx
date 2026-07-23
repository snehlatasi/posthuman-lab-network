"use client";

import React, { useState, useEffect } from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";
import { publicationsApi, PublicationApiDto } from "@/lib/api/publications";

export default function PublicationsMainPage() {
  const [publications, setPublications] = useState<PublicationApiDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicationsApi.getPublishedPublications()
      .then((data) => {
        setPublications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("REST API connection unavailable. Using mock fallback.", err);
        setLoading(false);
      });
  }, []);

  // Static Fallback Publications (used if database is empty or connection fails)
  const fallbackPublications: PublicationApiDto[] = [
    {
      id: 1,
      title: "Agential Realism and Nonhuman Subjectivities",
      slug: "agential-realism-and-nonhuman-subjectivities",
      summary: "Re-evaluating Karen Barad's quantum intra-actions inside forest electrical voltage grids.",
      content: "",
      authorDisplayName: "Dr. Elena Rostova",
      publicationType: "ARTICLE",
      status: "PUBLISHED",
      createdAt: "",
      updatedAt: ""
    },
    {
      id: 2,
      title: "Lichen-Synth: Generative Visual Topologies",
      slug: "lichen-synth",
      summary: "A review of generative growth algorithms behaving as simulated posthuman bio-environments.",
      content: "",
      authorDisplayName: "Marcus Vance",
      publicationType: "CREATIVE_WORK",
      status: "PUBLISHED",
      createdAt: "",
      updatedAt: ""
    },
    {
      id: 3,
      title: "Algorithmic Inquiries on Large Language Models",
      slug: "algorithmic-inquiries",
      summary: "Auditing transformer neural networks for linguistic biases and nonhuman semantic agency.",
      content: "",
      authorDisplayName: "Anya Chen",
      publicationType: "RESEARCH",
      status: "PUBLISHED",
      createdAt: "",
      updatedAt: ""
    }
  ];

  const activePublications = publications.length > 0 ? publications : fallbackPublications;
  const isUsingFallback = publications.length === 0;

  return (
    <ListingPageLayout
      tag="Publications"
      title="PUBLICATIONS & JOURNAL"
      subtitle="Critical writing, philosophical journals, and creative essays from emerging voices."
    >
      {/* Loading Indicator */}
      {loading && (
        <div className="col-span-12 text-center py-12">
          <span className="font-mono text-xs text-bone-200/40 animate-pulse uppercase tracking-widest block">
            Retrieving published telemetry...
          </span>
        </div>
      )}

      {/* Offline Fallback Notice */}
      {!loading && isUsingFallback && (
        <div className="col-span-12">
          <div className="p-4 rounded-lg bg-carbon-900 border border-bone-200/5 text-[10px] font-mono text-bone-200/40 leading-relaxed max-w-xl">
            ⚠️ [DEMO MODE] REST API database is empty or offline. Showing static conceptual articles below. Active search will be restored upon local server connection.
          </div>
        </div>
      )}

      {/* Grid Items */}
      {!loading && activePublications.map((pub) => (
        <StaggerItem key={pub.id}>
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10 h-full">
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                  Volume 04 — {pub.publicationType}
                </span>
                <span className="font-mono text-[8px] text-bone-200/30 uppercase tracking-widest block">
                  By {pub.authorDisplayName}
                </span>
                <h3 className="font-serif text-lg font-bold text-bone-100">
                  {pub.title}
                </h3>
                <p className="font-sans text-xs text-bone-200/60 leading-relaxed">
                  {pub.summary}
                </p>
              </div>
              
              <div className="pt-4">
                <AnimatedLink href={`/publications/slug/${pub.slug}`}>
                  Read Document
                </AnimatedLink>
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}
    </ListingPageLayout>
  );
}
