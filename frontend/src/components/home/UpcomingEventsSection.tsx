"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { upcomingMeetingsList } from "@/data/homepage";
import { Container } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";

export const UpcomingEventsSection: React.FC = () => {
  return (
    <section id="events" className="py-24 md:py-32 border-t border-bone-200/5 bg-carbon-900/5">
      <Container className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
          <div className="space-y-4">
            <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest block">
              Meeting Schedule
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-bone-50">
              Upcoming Gatherings
            </h2>
            <p className="font-sans text-sm text-bone-200/60 leading-relaxed max-w-xl">
              Physical retreats, decentralized chapter councils, and online seminars. Book tickets to reserve your spot.
            </p>
          </div>
          <Link
            href="/events"
            className="group inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-wider uppercase text-bone-100 hover:text-moss-400 transition-colors focus:outline-none"
          >
            <span>View Calendar</span>
            <ArrowRight className="w-4 h-4 text-bone-200/20 group-hover:text-moss-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Schedule List */}
        <Reveal staggerChildren={0.12} className="border-t border-bone-200/10">
          {upcomingMeetingsList.map((event) => (
            <StaggerItem key={event.title}>
              <Link
                href={event.href}
                className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-bone-200/10 group focus:outline-none"
              >
                {/* Left: Date grid */}
                <div className="flex items-center space-x-6 md:space-x-10">
                  <div className="flex flex-col items-center justify-center p-3 w-16 h-16 rounded-xl bg-carbon-900 border border-bone-200/5 text-center group-hover:border-moss-500/30 transition-all duration-300">
                    <span className="font-mono text-2xl font-bold text-bone-50 group-hover:text-moss-400 transition-colors leading-none">
                      {event.day}
                    </span>
                    <span className="font-mono text-[9px] text-bone-200/40 uppercase tracking-widest mt-1">
                      {event.month}
                    </span>
                  </div>

                  <div className="space-y-1 max-w-md lg:max-w-xl">
                    <span className="font-mono text-[9px] text-moss-500 tracking-wider font-semibold uppercase block">
                      {event.type}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-bone-100 group-hover:translate-x-1 transition-transform duration-300">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Center: Location */}
                <div className="mt-4 md:mt-0 font-mono text-[10px] tracking-wider text-bone-200/40 uppercase md:text-right pr-6">
                  📍 {event.location}
                </div>

                {/* Right: Booking Trigger */}
                <div className="mt-4 md:mt-0 flex justify-end">
                  <div className="p-2.5 bg-carbon-900 group-hover:bg-moss-500 text-bone-200/30 group-hover:text-bone-50 transition-colors rounded-full">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
};
