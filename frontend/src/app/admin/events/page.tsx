"use client";

import { useState, useEffect } from "react";
import type { EventApiDto } from "@/lib/api/events";
import { eventsApi } from "@/lib/api/events";
import { slugify } from "@/lib/slugify";
import { AdminActionNotice } from "@/components/admin/AdminActionNotice";
import { LivePreviewLink } from "@/components/admin/LivePreviewLink";
import { Plus, Trash2, AlertTriangle } from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventApiDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<{
    message: string;
    href?: string;
  } | null>(null);

  const [showNewModal, setShowNewModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    eventType: "Workshop",
    startDateTime: "",
    endDateTime: "",
    location: "Online Webcast",
    online: true,
  });

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  }>({ isOpen: false, title: "", description: "", onConfirm: async () => {} });

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await eventsApi.getAllAdminEvents();
      setEvents(res);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEvents();
  }, []);

  const triggerFeedback = (message: string, href?: string) => {
    setActionFeedback({ message, href });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      {actionFeedback && (
        <AdminActionNotice message={actionFeedback.message} href={actionFeedback.href} />
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase">
            Events & Gatherings Catalog
          </h2>
          <p className="font-sans text-xs text-bone-200 font-medium">
            Manage upcoming physical retreats, seminars, and virtual masterclasses.
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase tracking-wider font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
              <tr>
                <th className="p-4">Event Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-carbon-950/40 transition-colors">
                  <td className="p-4 font-semibold text-bone-50">{e.title}</td>
                  <td className="p-4 uppercase text-[10px] font-mono text-earth-400 font-bold">
                    {e.eventType}
                  </td>
                  <td className="p-4 text-bone-200/70">{e.location || "Online Webcast"}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-[9px] font-mono rounded-full uppercase tracking-wider font-bold ${
                        e.status === "UPCOMING"
                          ? "bg-moss-500/20 text-moss-400 border border-moss-500/30"
                          : "bg-carbon-950 text-bone-200/50"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <LivePreviewLink href="/events" />
                    <button
                      onClick={() => {
                        setConfirmModal({
                          isOpen: true,
                          title: "Delete Event",
                          description: `Delete event "${e.title}"?`,
                          onConfirm: async () => {
                            await eventsApi.deleteEvent(e.id);
                            triggerFeedback("Event deleted.");
                            loadEvents();
                          },
                        });
                      }}
                      className="p-1.5 text-earth-400 hover:text-earth-300 cursor-pointer inline-block"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest"
                  >
                    No events cataloged.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Event Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-bone-50/15 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-bone-50 uppercase">Create Event</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Event Type (e.g. Workshop, Seminar)"
                value={newEvent.eventType}
                onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none"
              />
              <textarea
                rows={4}
                placeholder="Event Description & Agenda"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none resize-none"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 bg-carbon-950 border border-bone-50/15 text-bone-200 text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!newEvent.title) return;
                  const now = new Date();
                  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                  await eventsApi.createEvent({
                    ...newEvent,
                    slug: slugify(newEvent.title),
                    startDateTime: nextWeek.toISOString(),
                    endDateTime: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000).toISOString(),
                    status: "UPCOMING",
                  });
                  setShowNewModal(false);
                  setNewEvent({
                    title: "",
                    description: "",
                    eventType: "Workshop",
                    startDateTime: "",
                    endDateTime: "",
                    location: "Online Webcast",
                    online: true,
                  });
                  triggerFeedback("Event created.", "/events");
                  loadEvents();
                }}
                className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 font-bold text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-bone-50/15 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-earth-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg font-bold text-bone-50 uppercase">
                {confirmModal.title}
              </h3>
            </div>
            <p className="font-sans text-xs text-bone-200 leading-relaxed font-medium">
              {confirmModal.description}
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                className="px-4 py-2 bg-carbon-950 border border-bone-50/15 text-bone-200 text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await confirmModal.onConfirm();
                  setConfirmModal({ ...confirmModal, isOpen: false });
                }}
                className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 font-mono text-xs uppercase font-bold rounded-xl cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
