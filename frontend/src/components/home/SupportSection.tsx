"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/Primitives";
import { Reveal } from "../ui/Reveal";

export const SupportSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 border-t border-carbon-950/8 dark:border-bone-50/12 bg-transparent relative transition-colors duration-300">
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Description text */}
        <div className="md:col-span-8 space-y-3">
          <Reveal className="space-y-2">
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.25em] block">
              SUSTAINABILITY
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-carbon-950 dark:text-bone-50 leading-tight uppercase">
              Help keep knowledge open and accessible.
            </h3>
            <p className="font-sans text-xs md:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed max-w-lg font-medium">
              We operate as a CC-licensed non-commercial academy. Your contributions support carbon-offset hosting fees and emerging student research grants.
            </p>
          </Reveal>
        </div>

        {/* CTA link */}
        <div className="md:col-span-4 flex md:justify-end">
          <Reveal delay={0.2}>
            <Link
              href="/support"
              className="group inline-flex items-center space-x-3 text-xs font-sans tracking-widest uppercase font-bold text-carbon-950 dark:text-bone-100 hover:text-earth-600 dark:hover:text-earth-400 transition-colors focus:outline-none"
            >
              <span>Support Network</span>
              <div className="p-3 bg-bone-50 dark:bg-carbon-900 group-hover:bg-earth-600 dark:group-hover:bg-earth-500 text-carbon-950 dark:text-bone-100 group-hover:text-bone-50 transition-colors rounded-full border border-carbon-950/10 dark:border-bone-50/15">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
