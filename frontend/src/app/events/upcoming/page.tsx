"use client";

import React, { useState, useEffect } from "react";
import { ContentPageLayout } from "@/components/layout/Templates";
import { ContentCard } from "@/components/layout/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { eventsApi, EventApiDto } from "@/lib/api/events";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventApiDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    eventsApi.getUpcomingEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("REST API connection unavailable. Using mock fallback.", err);
        setLoading(false);
      });
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  // Static Fallback Event (used if H2 database is empty or connection fails)
  const fallbackEvent: EventApiDto = {
    id: 0,
    title: "Symbiotic Signals: Plant & Code",
    slug: "symbiotic-signals",
    description: "How do we write code that cooperates with biological rhythms? In this two-hour open seminar, the Ecological Futures Lab demonstrates our flora transducers, displaying live signal visualizations and mapping cellular voltage shifts into spatial digital audio. We will close with an open panel on anthropomorphic biases in hardware design.",
    eventType: "Seminar & Workshop",
    startDateTime: "2026-08-12T18:00:00",
    endDateTime: "2026-08-12T20:00:00",
    location: "Zoom & Discord Webcast",
    online: true,
    status: "UPCOMING",
    createdAt: "",
    updatedAt: ""
  };

  const activeEvents = events.length > 0 ? events : [fallbackEvent];
  const isUsingFallback = events.length === 0;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }) + " at " + d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }) + " UTC";
    } catch {
      return dateStr;
    }
  };

  return (
    <ContentPageLayout
      tag="Upcoming"
      title="UPCOMING EVENTS"
      subtitle="Register for online discussions, workshops, and physical gather sessions."
      parentLabel="Events"
      parentHref="/events"
    >
      <div className="space-y-12">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 space-y-4">
            <span className="font-mono text-xs text-bone-200/40 animate-pulse uppercase tracking-widest block">
              Fetching network telemetry...
            </span>
          </div>
        )}

        {/* Status Notification Alerts */}
        {!loading && (
          <div className="space-y-8">
            {isUsingFallback && (
              <div className="p-4 rounded-lg bg-bone-100 border border-carbon-950/10 text-xs font-mono text-carbon-900 leading-relaxed max-w-xl font-bold">
                ⚠️ [DEMO MODE] REST API database is empty or offline. Showing static conceptual event below. Active registry will be restored upon local server connection.
              </div>
            )}

            {activeEvents.map((evt) => (
              <div key={evt.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-carbon-950/10 dark:border-bone-50/12 pb-12 last:border-0 last:pb-0">
                {/* Event Detail */}
                <div className="lg:col-span-7 space-y-6">
                  <Reveal className="space-y-4">
                    <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-widest block">
                      {evt.eventType}
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-carbon-950 dark:text-bone-50 leading-tight">
                      {evt.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-carbon-900 dark:text-bone-200 font-bold">
                      <span>📅 {formatDate(evt.startDateTime)}</span>
                      <span>•</span>
                      <span>📍 {evt.location || (evt.online ? "Online Webcast" : "Physical Venue")}</span>
                    </div>
                    <p className="font-sans text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium pt-2">
                      {evt.description}
                    </p>
                  </Reveal>
                </div>

                {/* Booking Form */}
                <div className="lg:col-span-5">
                  <ContentCard className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 shadow-md hover:shadow-xl p-6">
                    {isBooked ? (
                      <div className="space-y-4 text-center py-6">
                        <span className="font-mono text-2xl text-earth-600 dark:text-earth-400 font-bold">✓</span>
                        <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50">Registration Confirmed</h3>
                        <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                          Thank you for booking. The access links and setup instructions have been sent to your email.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleRegister} className="space-y-6">
                        <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50">Reserve Your Spot</h3>
                        
                        <div className="space-y-2">
                          <label htmlFor={`name-field-${evt.id}`} className="font-mono text-xs text-carbon-900 dark:text-bone-200 uppercase font-bold tracking-widest block">
                            Full Name
                          </label>
                          <input
                            id={`name-field-${evt.id}`}
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            className="w-full bg-bone-50 dark:bg-carbon-950 border border-carbon-950/15 dark:border-bone-50/20 rounded-lg px-4 py-2.5 text-xs text-carbon-950 dark:text-bone-100 placeholder-carbon-700 dark:placeholder-bone-300 font-medium focus:border-earth-600 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor={`email-field-${evt.id}`} className="font-mono text-xs text-carbon-900 dark:text-bone-200 uppercase font-bold tracking-widest block">
                            Email Address
                          </label>
                          <input
                            id={`email-field-${evt.id}`}
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="w-full bg-bone-50 dark:bg-carbon-950 border border-carbon-950/15 dark:border-bone-50/20 rounded-lg px-4 py-2.5 text-xs text-carbon-950 dark:text-bone-100 placeholder-carbon-700 dark:placeholder-bone-300 font-medium focus:border-earth-600 focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 text-xs font-sans tracking-widest uppercase font-bold text-bone-50 bg-[#120e0c] dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 transition-colors rounded-lg focus:outline-none cursor-pointer shadow-md"
                        >
                          Book My Ticket
                        </button>
                      </form>
                    )}
                  </ContentCard>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ContentPageLayout>
  );
}
