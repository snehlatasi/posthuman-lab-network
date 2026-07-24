"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { upcomingMeetingsList } from "@/data/homepage";
import { Container } from "../layout/Primitives";
import { Reveal, StaggerItem } from "../ui/Reveal";

export const UpcomingEventsSection: React.FC = () => {
  return (
    <section id="events" className="py-24 md:py-32 border-t border-carbon-950/8 dark:border-bone-50/12 bg-transparent relative transition-colors duration-300">
      <Container className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
          <div className="space-y-4">
            <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-[0.25em] block">
              MEETING SCHEDULE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-carbon-950 dark:text-bone-50 leading-tight uppercase">
              Upcoming Gatherings
            </h2>
            <p className="font-sans text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed max-w-xl font-medium">
              Physical retreats, decentralized chapter councils, and online seminars. Book tickets to reserve your spot.
            </p>
          </div>
          <Link
            href="/events"
            className="group inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-wider uppercase text-carbon-950 dark:text-bone-50 hover:text-earth-600 dark:hover:text-earth-400 transition-colors focus:outline-none"
          >
            <span>View Calendar</span>
            <ArrowRight className="w-4 h-4 text-carbon-950 dark:text-bone-50 group-hover:text-earth-600 dark:group-hover:text-earth-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Schedule List */}
        <Reveal staggerChildren={0.12} className="border-t border-carbon-950/10 dark:border-bone-50/15">
          {upcomingMeetingsList.map((event) => (
            <StaggerItem key={event.title}>
              <Link
                href={event.href}
                className="flex flex-col md:flex-row md:items-center justify-between py-6 px-6 my-3 rounded-2xl bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 shadow-sm hover:shadow-md hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300 group focus:outline-none"
              >
                {/* Left: Date grid */}
                <div className="flex items-center space-x-6 md:space-x-10">
                  <div className="flex flex-col items-center justify-center p-3 w-16 h-16 rounded-xl bg-bone-50 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 text-center group-hover:border-earth-600 dark:group-hover:border-earth-400 transition-all duration-300">
                    <span className="font-mono text-2xl font-bold text-carbon-950 dark:text-bone-100 group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors leading-none">
                      {event.day}
                    </span>
                    <span className="font-mono text-[10px] text-carbon-900 dark:text-bone-200 uppercase font-bold tracking-widest mt-1">
                      {event.month}
                    </span>
                  </div>

                  <div className="space-y-1 max-w-md lg:max-w-xl">
                    <span className="font-mono text-[10px] text-earth-600 dark:text-earth-400 tracking-wider font-bold uppercase block">
                      {event.type}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-carbon-950 dark:text-bone-100 group-hover:text-earth-600 dark:group-hover:text-earth-400 group-hover:translate-x-1 transition-all duration-300">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Center: Location */}
                <div className="mt-4 md:mt-0 font-sans text-xs font-bold tracking-wider text-carbon-950 dark:text-bone-200 uppercase md:text-right pr-6">
                  📍 {event.location}
                </div>

                {/* Right: Booking Trigger */}
                <div className="mt-4 md:mt-0 flex justify-end">
                  <div className="p-2.5 bg-bone-50 dark:bg-carbon-950 group-hover:bg-earth-600 dark:group-hover:bg-earth-500 text-carbon-950 dark:text-bone-100 group-hover:text-bone-50 transition-colors rounded-full border border-carbon-950/10 dark:border-bone-50/15">
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
