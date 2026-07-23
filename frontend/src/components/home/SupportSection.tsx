"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/Primitives";
import { Reveal } from "../ui/Reveal";

export const SupportSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 border-t border-bone-200/5 bg-carbon-950/20 relative">
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Description text */}
        <div className="md:col-span-8 space-y-3">
          <Reveal className="space-y-1">
            <span className="font-mono text-[9px] text-moss-500 font-semibold uppercase tracking-widest block">
              Sustainability
            </span>
            <h3 className="font-serif text-2xl font-bold text-bone-50 leading-tight">
              Help keep knowledge open and accessible.
            </h3>
            <p className="font-sans text-xs text-bone-200/50 leading-relaxed max-w-lg">
              We operate as a CC-licensed non-commercial academy. Your contributions support carbon-offset hosting fees and emerging student research grants.
            </p>
          </Reveal>
        </div>

        {/* CTA link */}
        <div className="md:col-span-4 flex md:justify-end">
          <Reveal delay={0.2}>
            <Link
              href="/support"
              className="group inline-flex items-center space-x-3 text-xs font-sans tracking-widest uppercase font-bold text-bone-100 hover:text-moss-400 transition-colors focus:outline-none"
            >
              <span>Support Network</span>
              <div className="p-3 bg-carbon-900 group-hover:bg-moss-500 text-bone-200/30 group-hover:text-bone-50 transition-colors rounded-full border border-bone-200/5 group-hover:border-transparent">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
