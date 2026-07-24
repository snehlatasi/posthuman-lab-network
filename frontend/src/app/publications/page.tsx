"use client";

import React, { useState, useEffect } from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";
import { publicationsApi, PublicationApiDto } from "@/lib/api/publications";
import { useAuth } from "@/context/AuthContext";
import { Plus, Trash2, ShieldCheck, X } from "lucide-react";

export default function PublicationsMainPage() {
  const { isAdmin } = useAuth();
  const [publications, setPublications] = useState<PublicationApiDto[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin Create Publication Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPub, setNewPub] = useState({
    title: "",
    summary: "",
    content: "",
    authorDisplayName: "Lab Fellow",
    publicationType: "ARTICLE" as const
  });

  const loadPubs = () => {
    setLoading(true);
    publicationsApi.getPublishedPublications()
      .then((data) => {
        setPublications(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPubs();
  }, []);

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

  const handleDelete = async (id: number) => {
    if (confirm("Delete this publication entry?")) {
      await publicationsApi.deletePublication(id);
      loadPubs();
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newPub.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    await publicationsApi.createPublication({
      ...newPub,
      slug,
      status: "PUBLISHED"
    });
    setShowAddModal(false);
    setNewPub({
      title: "",
      summary: "",
      content: "",
      authorDisplayName: "Lab Fellow",
      publicationType: "ARTICLE"
    });
    loadPubs();
  };

  return (
    <ListingPageLayout
      tag="Publications"
      title="PUBLICATIONS & JOURNAL"
      subtitle="Critical writing, philosophical journals, and creative essays from emerging voices."
    >
      {/* Admin Banner Bar */}
      {isAdmin && (
        <div className="col-span-12">
          <div className="p-4 rounded-xl bg-moss-950/40 border border-moss-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-moss-300 font-mono text-xs">
              <ShieldCheck className="w-4 h-4 text-moss-400" />
              <span>Admin Mode Active: Add peer-reviewed papers or manage public publications.</span>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-carbon-800 hover:bg-carbon-700 text-bone-100 border border-bone-200/20 font-mono text-xs uppercase tracking-wider font-bold rounded-lg flex items-center space-x-2 cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>＋ New Publication Entry</span>
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="col-span-12 text-center py-12">
          <span className="font-mono text-xs text-bone-200/40 animate-pulse uppercase tracking-widest block">
            Retrieving published telemetry...
          </span>
        </div>
      )}

      {!loading && activePublications.map((pub) => (
        <StaggerItem key={pub.id}>
          <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl hover:border-earth-600 transition-all duration-300 h-full">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 tracking-wider font-bold uppercase block">
                  Volume 04 — {pub.publicationType}
                </span>
                <span className="font-sans text-xs text-carbon-900 uppercase font-bold tracking-wider block">
                  By {pub.authorDisplayName}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950">
                  {pub.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 leading-relaxed font-medium">
                  {pub.summary}
                </p>
              </div>
              
              <div className="pt-4 flex items-center justify-between">
                <AnimatedLink href={`/publications/${pub.slug}`}>
                  Read Document
                </AnimatedLink>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(pub.id)}
                    className="p-1.5 rounded bg-earth-500/20 text-earth-600 hover:text-earth-500 hover:bg-earth-500/40 transition-colors cursor-pointer"
                    title="Delete Publication"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}

      {/* Admin Add Publication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl border border-bone-200/10 max-w-lg w-full space-y-4 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-bone-200/40 hover:text-bone-100 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-bold text-bone-50">Add Publication Catalog Entry</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Publication Title"
                value={newPub.title}
                onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
                className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Author Display Name"
                value={newPub.authorDisplayName}
                onChange={(e) => setNewPub({ ...newPub, authorDisplayName: e.target.value })}
                className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
              />
              <select
                value={newPub.publicationType}
                onChange={(e) => setNewPub({ ...newPub, publicationType: e.target.value as any })}
                className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
              >
                <option value="ARTICLE">Academic Article</option>
                <option value="ESSAY">Speculative Essay</option>
                <option value="RESEARCH">Research Telemetry Log</option>
                <option value="CREATIVE_WORK">Creative Work / Sound Art</option>
              </select>
              <input
                type="text"
                placeholder="Summary"
                value={newPub.summary}
                onChange={(e) => setNewPub({ ...newPub, summary: e.target.value })}
                className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
              />
              <textarea
                rows={4}
                required
                placeholder="Full Publication Text Content"
                value={newPub.content}
                onChange={(e) => setNewPub({ ...newPub, content: e.target.value })}
                className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none resize-none"
              />
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-carbon-800 text-bone-200 text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-moss-500 text-carbon-950 font-bold text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Publish Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ListingPageLayout>
  );
}
