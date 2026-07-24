"use client";

import React, { useState } from "react";
import { ContentPageLayout } from "@/components/layout/Templates";
import { ContentCard } from "@/components/layout/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactCollaborationPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // In later phases, this will hit POST /api/v1/contact
    setSent(true);
  };

  return (
    <ContentPageLayout
      tag="Collaboration"
      title="COLLABORATION INQUIRIES"
      subtitle="Pitch structural partnerships, joint research, or coordinate shared resources."
      parentLabel="Contact"
      parentHref="/contact"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Intro */}
        <div className="lg:col-span-6 space-y-6">
          <Reveal className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-carbon-950 leading-tight">
              Let&apos;s Build Together
            </h2>
            <p className="text-xs md:text-sm text-carbon-800 leading-relaxed font-sans font-medium">
              We coordinate with botanical labs, algorithmic research units, cultural institutions, and alternative schools globally. Submit your contact details and outline your collaborative proposal.
            </p>
          </Reveal>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-6">
          <ContentCard className="border border-carbon-950/10 bg-white shadow-md hover:shadow-xl p-6">
            {sent ? (
              <div className="space-y-4 text-center py-6">
                <span className="font-mono text-2xl text-earth-600 font-bold">✓</span>
                <h3 className="font-serif text-xl font-bold text-carbon-950">Message Sent</h3>
                <p className="text-xs sm:text-sm text-carbon-800 leading-relaxed font-sans font-medium">
                  Thank you for reaching out. An operational coordinator will inspect your proposal and respond within three business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-carbon-950">Pitch Your Project</h3>
                
                <div className="space-y-2">
                  <label htmlFor="collab-email" className="font-mono text-xs text-carbon-900 uppercase font-bold tracking-widest block">
                    Your Email
                  </label>
                  <input
                    id="collab-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full bg-bone-50 border border-carbon-950/15 rounded-lg px-4 py-2.5 text-xs text-carbon-950 placeholder-carbon-700 font-medium focus:border-earth-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="collab-msg" className="font-mono text-xs text-carbon-900 uppercase font-bold tracking-widest block">
                    Proposal Outline
                  </label>
                  <textarea
                    id="collab-msg"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Outline your partnership concept"
                    className="w-full bg-bone-50 border border-carbon-950/15 rounded-lg px-4 py-2.5 text-xs text-carbon-950 placeholder-carbon-700 font-medium focus:border-earth-600 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-sans tracking-widest uppercase font-bold text-bone-50 bg-carbon-950 hover:bg-earth-600 transition-colors rounded-lg focus:outline-none cursor-pointer shadow-md"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </ContentCard>
        </div>
      </div>
    </ContentPageLayout>
  );
}
