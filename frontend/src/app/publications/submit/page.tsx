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
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-carbon-950 leading-tight">
              Submission Guidelines
            </h2>
            <p className="text-xs md:text-sm text-carbon-800 leading-relaxed font-sans font-medium">
              We seek transdisciplinary writings bridging plant bio-communications, critical algorithms audits, cybernetic architecture, and eco-art aesthetics.
            </p>
            <ul className="list-decimal pl-4 space-y-2 text-xs text-carbon-900 leading-relaxed font-mono font-bold">
              <li>Open Access: Approved works are published under CC BY-NC 4.0.</li>
              <li>Boilerplates: Abstract must not exceed 250 words.</li>
              <li>Anonymity: Authors must submit clean files without names in text.</li>
            </ul>
          </Reveal>
        </div>

        {/* Submit Form */}
        <div className="lg:col-span-6">
          <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl p-6">
            {submitted ? (
              <div className="space-y-4 text-center py-6">
                <span className="font-mono text-2xl text-earth-600 font-bold">✓</span>
                <h3 className="font-serif text-xl font-bold text-carbon-950">Submission Received</h3>
                <p className="text-xs sm:text-sm text-carbon-800 leading-relaxed font-sans font-medium">
                  Your draft has been submitted to the editorial queue. You can track updates in your profile dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-carbon-950">Upload Draft</h3>
                
                <div className="space-y-2">
                  <label htmlFor="pub-title" className="font-mono text-xs text-carbon-900 uppercase font-bold tracking-widest block">
                    Document Title
                  </label>
                  <input
                    id="pub-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="w-full bg-bone-50 border border-carbon-950/15 rounded-lg px-4 py-2.5 text-xs text-carbon-950 placeholder-carbon-700 font-medium focus:border-earth-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pub-abstract" className="font-mono text-xs text-carbon-900 uppercase font-bold tracking-widest block">
                    Abstract / Summary
                  </label>
                  <textarea
                    id="pub-abstract"
                    required
                    rows={4}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Enter abstract"
                    className="w-full bg-bone-50 border border-carbon-950/15 rounded-lg px-4 py-2.5 text-xs text-carbon-950 placeholder-carbon-700 font-medium focus:border-earth-600 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-sans tracking-widest uppercase font-bold text-bone-50 bg-carbon-950 hover:bg-earth-600 transition-colors rounded-lg focus:outline-none cursor-pointer shadow-md"
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
