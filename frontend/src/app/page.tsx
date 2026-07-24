"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

// Homepage Sections
import { HeroSection } from "@/components/home/HeroSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { VisionSection } from "@/components/home/VisionSection";
import { ConversationsSection } from "@/components/home/ConversationsSection";
import { LabsSection } from "@/components/home/LabsSection";
import { Virtual360LabViewer } from "@/components/home/Virtual360LabViewer";
import { FeaturedLectureSection } from "@/components/home/FeaturedLectureSection";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { LearningHubSection } from "@/components/home/LearningHubSection";
import { PublicationsSection } from "@/components/home/PublicationsSection";
import { GlobalVoicesSection } from "@/components/home/GlobalVoicesSection";
import { JoinNetworkSection } from "@/components/home/JoinNetworkSection";
import { SupportSection } from "@/components/home/SupportSection";

const homeSections = [
  { id: "hero", label: "Intro" },
  { id: "about-us", label: "Who We Are" },
  { id: "pillars", label: "Our Pillars" },
  { id: "conversations", label: "Themes" },
  { id: "labs", label: "Labs" },
  { id: "events", label: "Events" }
];

export default function HomePage() {
  const shouldReduceMotion = useSafeReducedMotion();
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const winHeight = window.innerHeight;
          let currentActive = "hero";

          for (const sec of homeSections) {
            const el = document.getElementById(sec.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              // Section is active if it covers the vertical center of viewport
              if (rect.top <= winHeight / 2 && rect.bottom >= winHeight / 2) {
                currentActive = sec.id;
                break;
              }
            }
          }
          setActiveSection(currentActive);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on initial mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSectionClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth"
      });
    }
  };

  return (
    <>
      {/* Sticky Global Navigation */}
      <Header />

      {/* Right-Side Circular Section Indicators */}
      <div 
        className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col space-y-4 z-40"
        role="navigation"
        aria-label="Section indicators"
      >
        {homeSections.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredIdx === idx;
          return (
            <div 
              key={sec.id}
              className="relative flex items-center justify-end group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => handleSectionClick(sec.id)}
            >
              {/* Tooltip Label */}
              <span 
                className={`mr-3 font-mono text-[9px] tracking-widest text-carbon-950 uppercase transition-all duration-300 pointer-events-none select-none bg-bone-50/90 px-2 py-0.5 border border-carbon-950/8 rounded ${
                  isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                }`}
              >
                {sec.label}
              </span>
              
              {/* Dot */}
              <div 
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? "bg-earth-500 border-earth-500 scale-110 shadow-lg shadow-earth-500/30" 
                    : "border-carbon-950/20 bg-bone-50/40 group-hover:border-carbon-950/60"
                }`}
                aria-label={`Scroll to ${sec.label}`}
              />
            </div>
          );
        })}
      </div>

      {/* Main Page Layout / Scroll Storytelling */}
      <main className="flex-grow">
        {/* 1. Immersive Interactive Node-Network Hero */}
        <HeroSection />

        {/* 2. Who We Are Section (Nature Portal) */}
        <ManifestoSection />

        {/* 3. Our Pillars Section (Building Future) */}
        <VisionSection />

        {/* 4. Interactive Conversation Themes (AI, Ecology, Nonhumans) */}
        <ConversationsSection />

        {/* 5. Exploration Labs Cards */}
        <LabsSection />

        {/* 5.5 Interactive 360 Virtual Lab Tour */}
        <Virtual360LabViewer />

        {/* 6. Cinematic Video Placeholder Lecture */}
        <FeaturedLectureSection />

        {/* 7. Cultural Agenda Schedule Meetings */}
        <UpcomingEventsSection />

        {/* 8. Open Access Learning pathways */}
        <LearningHubSection />

        {/* 9. High-Contrast Publications index */}
        <PublicationsSection />

        {/* 10. Digital-Grid Chapter chapters map */}
        <GlobalVoicesSection />

        {/* 11. Immersive CTA Registration Banner */}
        <JoinNetworkSection />

        {/* 12. Supporting Ethics Callout */}
        <SupportSection />
      </main>

      {/* Reusable Footer Component */}
      <Footer />
    </>
  );
}
