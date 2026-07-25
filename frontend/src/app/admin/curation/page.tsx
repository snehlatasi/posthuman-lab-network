"use client";

import React, { useState, useEffect } from "react";
import { cmsApi, HomepageCurationDto } from "@/lib/api/cms";
import { CheckCircle2 } from "lucide-react";

export default function AdminCurationPage() {
  const [curation, setCuration] = useState<HomepageCurationDto>({
    id: 1,
    announcementTitle: "Call for Research Papers 2026",
    announcementMessage: "Submissions are open for our upcoming ecological futures journal edition.",
    announcementLink: "/publications/submit",
    announcementActive: true
  });
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    cmsApi.getCurationSettings()
      .then((res) => {
        if (res) setCuration(res);
      })
      .catch(() => null);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await cmsApi.updateCurationSettings(curation);
      setFeedback("Homepage curation settings updated successfully.");
      setTimeout(() => setFeedback(null), 4000);
    } catch {
      setFeedback("Unable to update curation settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase tracking-tight">
          Homepage Curation & Announcements
        </h2>
        <p className="font-sans text-xs text-bone-200 font-medium">Control featured content slots and site-wide announcement banners.</p>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-moss-500/20 border border-moss-500/30 text-moss-400 text-xs font-mono uppercase font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-carbon-900/90 border border-bone-50/15 p-6 sm:p-8 rounded-3xl space-y-6 shadow-md max-w-2xl">
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-bone-50 uppercase">Network Announcement Banner</h3>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-bone-200 font-bold">Announcement Title</label>
            <input
              type="text"
              value={curation.announcementTitle || ""}
              onChange={(e) => setCuration({ ...curation, announcementTitle: e.target.value })}
              className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-xs text-bone-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-bone-200 font-bold">Message Content</label>
            <textarea
              rows={3}
              value={curation.announcementMessage || ""}
              onChange={(e) => setCuration({ ...curation, announcementMessage: e.target.value })}
              className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-xs text-bone-50 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-bone-200 font-bold">Target Link URL</label>
            <input
              type="text"
              value={curation.announcementLink || ""}
              onChange={(e) => setCuration({ ...curation, announcementLink: e.target.value })}
              className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-xs text-bone-50"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              id="active-announcement"
              type="checkbox"
              checked={curation.announcementActive}
              onChange={(e) => setCuration({ ...curation, announcementActive: e.target.checked })}
              className="w-4 h-4 rounded text-earth-600 focus:ring-earth-400 cursor-pointer"
            />
            <label htmlFor="active-announcement" className="text-xs text-bone-200 font-sans font-medium cursor-pointer">
              Enable active announcement banner across public site header
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-bone-50/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase font-bold rounded-xl shadow-md cursor-pointer"
          >
            {saving ? "SAVING..." : "SAVE CURATION SETTINGS"}
          </button>
        </div>
      </form>
    </div>
  );
}
