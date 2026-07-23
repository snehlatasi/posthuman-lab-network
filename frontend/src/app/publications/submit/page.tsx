"use client";

import React, { useState } from "react";
import { ContentPageLayout } from "@/components/layout/Templates";
import { ContentCard } from "@/components/layout/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export default function SubmitWorkPage() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In later phases, this will hit POST /api/v1/publications/submit
    setSubmitted(true);
  };

  return (
    <ContentPageLayout
      tag="Submit"
      title="SUBMIT YOUR WORK"
      subtitle="Share your research papers, critical reflections, or multimedia essays with our editors."
      parentLabel="Publications"
      parentHref="/publications"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Guidelines */}
        <div className="lg:col-span-6 space-y-6">
          <Reveal className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-bone-50 leading-tight">
              Submission Guidelines
            </h2>
            <p className="text-xs md:text-sm text-bone-200/70 leading-relaxed font-sans">
              We seek transdisciplinary writings bridging plant bio-communications, critical algorithms audits, cybernetic architecture, and eco-art aesthetics.
            </p>
            <ul className="list-decimal pl-4 space-y-2 text-xs text-bone-200/50 leading-relaxed font-mono">
              <li>Open Access: Approved works are published under CC BY-NC 4.0.</li>
              <li>Boilerplates: Abstract must not exceed 250 words.</li>
              <li>Anonymity: Authors must submit clean files without names in text.</li>
            </ul>
          </Reveal>
        </div>

        {/* Submit Form */}
        <div className="lg:col-span-6">
          <ContentCard className="border border-bone-200/5 bg-carbon-900/10">
            {submitted ? (
              <div className="space-y-4 text-center py-6">
                <span className="font-mono text-xl text-moss-400">✓</span>
                <h3 className="font-serif text-lg font-bold text-bone-50">Submission Received</h3>
                <p className="text-xs text-bone-200/60 leading-relaxed font-sans">
                  Your draft has been submitted to the editorial queue. You can track updates in your profile dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-bone-50">Upload Draft</h3>
                
                <div className="space-y-2">
                  <label htmlFor="pub-title" className="font-mono text-[10px] text-bone-200/50 uppercase tracking-widest block">
                    Document Title
                  </label>
                  <input
                    id="pub-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="w-full bg-carbon-950 border border-bone-200/10 rounded-lg px-4 py-2.5 text-xs text-bone-100 placeholder-bone-200/30 focus:border-moss-500/40 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pub-abstract" className="font-mono text-[10px] text-bone-200/50 uppercase tracking-widest block">
                    Abstract / Summary
                  </label>
                  <textarea
                    id="pub-abstract"
                    required
                    rows={4}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Enter abstract"
                    className="w-full bg-carbon-950 border border-bone-200/10 rounded-lg px-4 py-2.5 text-xs text-bone-100 placeholder-bone-200/30 focus:border-moss-500/40 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-sans tracking-widest uppercase font-semibold text-carbon-950 bg-bone-100 hover:bg-moss-500 hover:text-bone-50 transition-colors rounded-lg focus:outline-none"
                >
                  Submit Paper
                </button>
              </form>
            )}
          </ContentCard>
        </div>
      </div>
    </ContentPageLayout>
  );
}
