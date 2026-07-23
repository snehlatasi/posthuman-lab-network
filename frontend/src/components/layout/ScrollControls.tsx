"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

export const ScrollControls: React.FC = () => {
  const shouldReduceMotion = useSafeReducedMotion();
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight;
          const winHeight = window.innerHeight;

          setShowUp(scrollY > 120);
          setShowDown(scrollY + winHeight < docHeight - 80);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getPageSections = (): number[] => {
    const selector = "section, footer, header, main > div, main > article";
    const elements = Array.from(document.querySelectorAll(selector));
    
    const offsets = elements
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
      })
      .filter((top) => top >= 0)
      .sort((a, b) => a - b);

    const uniqueOffsets: number[] = [0];
    offsets.forEach((top) => {
      const last = uniqueOffsets[uniqueOffsets.length - 1];
      if (Math.abs(top - last) > 40) {
        uniqueOffsets.push(top);
      }
    });

    return uniqueOffsets;
  };

  const scrollUp = () => {
    const sections = getPageSections();
    const currentScroll = window.scrollY;
    
    let target = 0;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i] < currentScroll - 20) {
        target = sections[i];
        break;
      }
    }

    window.scrollTo({
      top: target,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const scrollDown = () => {
    const sections = getPageSections();
    const currentScroll = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    
    let target = currentScroll + winHeight;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] > currentScroll + 20) {
        target = sections[i];
        break;
      }
    }

    if (target > docHeight - winHeight) {
      target = docHeight - winHeight;
    }

    window.scrollTo({
      top: target,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div 
      className="fixed right-6 bottom-8 z-50 flex flex-col space-y-4 pointer-events-none"
      role="navigation"
      aria-label="Vertical navigation shortcut"
    >
      {/* Scroll Up Control */}
      <button
        type="button"
        onClick={scrollUp}
        disabled={!showUp}
        className={`flex items-center space-x-2 text-left focus:outline-none pointer-events-auto group ${
          showUp ? "opacity-60 hover:opacity-100 hover:text-moss-400" : "opacity-0 pointer-events-none"
        } transition-all duration-300`}
      >
        <div className="p-2 border border-bone-200/20 group-hover:border-moss-500 rounded-full bg-carbon-950/80 transition-all duration-300">
          <ArrowUp className="w-3.5 h-3.5 text-bone-100 group-hover:text-moss-400" />
        </div>
        <span className="font-mono text-[9px] tracking-widest text-bone-200/50 group-hover:text-moss-400 uppercase hidden md:inline select-none">
          UP
        </span>
      </button>

      {/* Scroll Down Control */}
      <button
        type="button"
        onClick={scrollDown}
        disabled={!showDown}
        className={`flex items-center space-x-2 text-left focus:outline-none pointer-events-auto group ${
          showDown ? "opacity-60 hover:opacity-100 hover:text-moss-400" : "opacity-0 pointer-events-none"
        } transition-all duration-300`}
      >
        <div className="p-2 border border-bone-200/20 group-hover:border-moss-500 rounded-full bg-carbon-950/80 transition-all duration-300">
          <ArrowDown className="w-3.5 h-3.5 text-bone-100 group-hover:text-moss-400" />
        </div>
        <span className="font-mono text-[9px] tracking-widest text-bone-200/50 group-hover:text-moss-400 uppercase hidden md:inline select-none">
          DOWN
        </span>
      </button>
    </div>
  );
};
export default ScrollControls;
