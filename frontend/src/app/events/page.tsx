"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ListingPageLayout } from "@/components/layout/Templates";
import { ContentCard, AnimatedLink } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";
import { eventsApi, EventApiDto } from "@/lib/api/events";
import { useAuth } from "@/context/AuthContext";
import { Plus, Trash2, ShieldCheck, X } from "lucide-react";

interface EventItem {
  id?: number;
  title: string;
  date: string;
  type: string;
  location: string;
  description: string;
}

const fallbackEvents: EventItem[] = [
  {
    id: 1,
    title: "Symbiotic Signals: Plant & Code",
    date: "August 12, 2026",
    type: "Online Seminar / Interactive",
    location: "Global Zoom / Discord Hub",
    description: "An online demonstration of voltage tracking nodes and mapping plant bio-electricity into sound."
  },
  {
    id: 2,
    title: "Embodied Philosophy Woodland Retreat",
    date: "September 18-21, 2026",
    type: "Physical Retreat",
    location: "Black Forest Wilderness, Germany",
    description: "A three-day off-grid gathering featuring wilderness walking, collective reading, and software auditing."
  },
  {
    id: 3,
    title: "Algorithmic Ethics Open Panel",
    date: "October 05, 2026",
    type: "Hybrid Panel Discussions",
    location: "London Hub / Live Webcast",
    description: "Debating machine agency and transcolonial data storage with guest speakers from international AI hubs."
  }
];

export default function EventsMainPage() {
  const { isAdmin } = useAuth();
  const [eventsList, setEventsList] = useState<EventItem[]>(fallbackEvents);
  const [loading, setLoading] = useState(true);

  // Admin Create Event Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", eventType: "Workshop", location: "Online Webcast" });

  const loadEvents = useCallback(() => {
    eventsApi.getUpcomingEvents()
      .then((data: EventApiDto[]) => {
        if (data && data.length > 0) {
          const mapped: EventItem[] = data.map((e) => ({
            id: e.id,
            title: e.title,
            date: e.startDateTime ? new Date(e.startDateTime).toLocaleDateString() : "Upcoming",
            type: e.eventType,
            location: e.location || "Online Webcast",
            description: e.description || "Join us for this lab session."
          }));
          setEventsList(mapped);
        } else {
          setEventsList(fallbackEvents);
        }
      })
      .catch(() => {
        setEventsList(fallbackEvents);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleDelete = async (id?: number) => {
    if (id && confirm("Delete this event entry?")) {
      await eventsApi.deleteEvent(id);
      loadEvents();
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    await eventsApi.createEvent({
      ...newEvent,
      slug,
      startDateTime: nextWeek.toISOString(),
      endDateTime: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      online: true,
      status: "UPCOMING"
    });
    setShowAddModal(false);
    setNewEvent({ title: "", description: "", eventType: "Workshop", location: "Online Webcast" });
    loadEvents();
  };

  return (
    <ListingPageLayout
      tag="Events"
      title="LIVE MEETINGS & DISCUSSIONS"
      subtitle="Gatherings, seminars, and woodland workshops connecting people and practices."
    >
      {/* Admin Control Bar */}
      {isAdmin && (
        <div className="col-span-12">
          <div className="p-4 rounded-xl bg-moss-950/40 border border-moss-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-moss-300 font-mono text-xs">
              <ShieldCheck className="w-4 h-4 text-moss-400" />
              <span>Admin Mode Active: Schedule live events directly on the public schedule.</span>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-bone-100 hover:bg-moss-500 text-carbon-950 hover:text-bone-50 font-mono text-xs uppercase tracking-wider font-bold rounded-lg flex items-center space-x-2 cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>＋ Schedule New Event</span>
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="col-span-12 text-center py-12">
          <span className="font-mono text-xs text-bone-200/40 animate-pulse uppercase tracking-widest block">
            Retrieving scheduled events...
          </span>
        </div>
      )}

      {!loading && eventsList.map((event, idx) => (
        <StaggerItem key={event.id || idx}>
          <ContentCard className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 shadow-md hover:shadow-xl hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300">
            <div className="space-y-6 h-full flex flex-col justify-between p-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-earth-600 dark:text-earth-400 tracking-wider font-bold uppercase block">
                  {event.type} — {event.date}
                </span>
                <span className="font-sans text-xs text-carbon-900 dark:text-bone-200 uppercase font-bold tracking-wider block">
                  📍 {event.location}
                </span>
                <h3 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50">
                  {event.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                  {event.description}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <AnimatedLink href="/events/upcoming">
                  Register For Event
                </AnimatedLink>

                {isAdmin && event.id && (
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-1.5 rounded bg-earth-500/20 text-earth-600 dark:text-earth-400 hover:text-earth-500 hover:bg-earth-500/40 transition-colors cursor-pointer"
                    title="Delete Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </ContentCard>
        </StaggerItem>
      ))}

      {/* Admin Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl border border-bone-200/10 max-w-lg w-full space-y-4 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-bone-200/40 hover:text-bone-100 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-bold text-bone-50">Create Live Event</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Event Type (e.g. Workshop, Seminar, Retreat)"
                value={newEvent.eventType}
                onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value })}
                className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Location (e.g. Zoom & Discord / Black Forest)"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
              />
              <textarea
                rows={4}
                required
                placeholder="Event Agenda & Details"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none resize-none"
              />
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-carbon-800 text-bone-200 text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-bone-100 text-carbon-950 font-bold text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ListingPageLayout>
  );
}
