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
    <footer className="relative bg-carbon-950 border-t border-bone-200/5 mt-auto pt-16 pb-8 z-20">
      {/* Decorative gradient lines */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-bone-200/10 to-transparent" />
      
      <div className="editorial-container">
        {/* Top Section: Branding, Newsletters, Columns */}
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 pb-12 border-b border-bone-200/5">
          {/* Logo & Newsletter */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider leading-none text-bone-100">
                POSTHUMAN
              </span>
              <span className="font-sans text-[10px] tracking-[0.3em] font-medium text-bone-200/50 leading-none mt-1 uppercase">
                Lab Network
              </span>
            </div>
            
            <p className="text-xs font-sans text-bone-200/60 leading-relaxed max-w-xs">
              A digital ecosystem mapping connections between human thought, technological expansion, and nonhuman environments.
            </p>

            {/* Newsletter form placeholder */}
            <div className="space-y-2.5 max-w-sm">
              <h4 className="text-[10px] font-sans font-bold tracking-widest text-moss-400 uppercase">
                Join our mailing circle
              </h4>
              <form 
                onSubmit={(e) => e.preventDefault()} 
                className="flex items-center border border-bone-200/10 rounded-lg p-1 bg-carbon-900/30 focus-within:border-moss-500/40 transition-all duration-300"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  aria-label="Email for newsletter subscription"
                  className="bg-transparent text-xs text-bone-100 placeholder-bone-200/30 px-3 py-2 flex-grow focus:outline-none w-full"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter subscription"
                  className="p-2 text-carbon-950 bg-bone-100 hover:bg-moss-500 hover:text-bone-50 transition-colors rounded-md"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Nav Links columns */}
          <div className="col-span-12 md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {navigationConfig.map((group) => (
              <div key={group.label} className="space-y-4">
                <h3 className="font-serif text-sm font-semibold tracking-wide text-bone-200/80">
                  {group.label}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-sans text-xs text-bone-200/50 hover:text-moss-400 transition-colors inline-block py-0.5"
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

        {/* Bottom Section: Copyrights, Socials, Philosophy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-sans text-bone-200/30">
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2">
            <span>© {currentYear} Posthuman Lab Network. All rights reserved.</span>
            <span>•</span>
            <span className="hover:text-moss-400 transition-colors cursor-pointer">Ethical Guidelines</span>
            <span>•</span>
            <span className="hover:text-moss-400 transition-colors cursor-pointer">Open-Access Policy</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="p-2 bg-carbon-900 rounded-full border border-bone-200/5 hover:border-moss-500/30 hover:text-moss-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="p-2 bg-carbon-900 rounded-full border border-bone-200/5 hover:border-moss-500/30 hover:text-moss-400 transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="p-2 bg-carbon-900 rounded-full border border-bone-200/5 hover:border-moss-500/30 hover:text-moss-400 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Global Networks Directory"
              className="p-2 bg-carbon-900 rounded-full border border-bone-200/5 hover:border-moss-500/30 hover:text-moss-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
