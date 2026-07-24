"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React from "react";
import Link from "next/link";
import { navigationConfig } from "@/lib/navigation";
import { ArrowRight, Github, Twitter, Youtube, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-bone-50/80 dark:bg-carbon-950/85 border-t border-carbon-950/8 dark:border-bone-50/12 mt-auto pt-16 pb-8 z-20 backdrop-blur-md transition-colors duration-300">
      <div className="absolute top-0 left-[10%] right-[10%] h-px ink-rule" />

      <div className="editorial-container">
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 pb-12 border-b border-carbon-950/8 dark:border-bone-50/12">
          <div className="col-span-12 md:col-span-4 space-y-6">
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-[0.08em] leading-none text-carbon-950 dark:text-bone-100">
                POSTHUMAN
              </span>
              <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-carbon-900 dark:text-bone-200 leading-none mt-1 uppercase">
                Lab Network
              </span>
            </div>

            <p className="text-sm font-sans text-carbon-800 dark:text-bone-200 leading-relaxed max-w-xs font-normal">
              A digital ecosystem mapping connections between human thought, technological expansion, and nonhuman environments.
            </p>

            <div className="space-y-2.5 max-w-sm">
              <h4 className="text-[10px] font-sans font-bold tracking-widest text-earth-600 dark:text-earth-400 uppercase">
                Join our mailing circle
              </h4>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center border border-carbon-950/20 dark:border-bone-50/15 rounded-full p-1 bg-white dark:bg-carbon-900 focus-within:border-earth-500 transition-all duration-300 shadow-md"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  aria-label="Email for newsletter subscription"
                  className="bg-transparent text-sm text-carbon-950 dark:text-bone-100 placeholder-carbon-700 dark:placeholder-bone-300 font-medium px-4 py-2.5 flex-grow focus:outline-none w-full"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter subscription"
                  className="p-3 text-bone-50 bg-carbon-950 dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 transition-colors rounded-full cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {navigationConfig.map((group) => (
              <div key={group.label} className="space-y-4">
                <h3 className="font-serif text-lg font-bold tracking-wide text-carbon-950 dark:text-bone-100">
                  {group.label}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-sans text-sm text-carbon-900 dark:text-bone-200 font-semibold hover:text-earth-600 dark:hover:text-earth-400 transition-colors inline-block py-0.5"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-sans text-carbon-900 dark:text-bone-200 font-medium">
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2">
            <span>© {currentYear} Posthuman Lab Network. All rights reserved.</span>
            <span>•</span>
            <span className="hover:text-earth-600 dark:hover:text-earth-400 transition-colors cursor-pointer">Ethical Guidelines</span>
            <span>•</span>
            <span className="hover:text-earth-600 dark:hover:text-earth-400 transition-colors cursor-pointer">Open-Access Policy</span>
            <span>•</span>
            <Link href="/admin" className="text-earth-600 dark:text-earth-400 font-mono uppercase tracking-wider hover:underline">
              Coordinator Admin Portal
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="p-2.5 bg-white/70 dark:bg-carbon-900/70 text-carbon-950 dark:text-bone-100 rounded-full border border-carbon-950/8 dark:border-bone-50/15 hover:border-earth-500/30 hover:text-earth-600 dark:hover:text-earth-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="p-2.5 bg-white/70 dark:bg-carbon-900/70 text-carbon-950 dark:text-bone-100 rounded-full border border-carbon-950/8 dark:border-bone-50/15 hover:border-earth-500/30 hover:text-earth-600 dark:hover:text-earth-400 transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="p-2.5 bg-white/70 dark:bg-carbon-900/70 text-carbon-950 dark:text-bone-100 rounded-full border border-carbon-950/8 dark:border-bone-50/15 hover:border-earth-500/30 hover:text-earth-600 dark:hover:text-earth-400 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Global Networks Directory"
              className="p-2.5 bg-white/70 dark:bg-carbon-900/70 text-carbon-950 dark:text-bone-100 rounded-full border border-carbon-950/8 dark:border-bone-50/15 hover:border-earth-500/30 hover:text-earth-600 dark:hover:text-earth-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
