"use client";

import { useState, useEffect } from "react";
import type { LabContentDto } from "@/lib/api/cms";
import { cmsApi } from "@/lib/api/cms";
import { AdminActionNotice } from "@/components/admin/AdminActionNotice";
import { LivePreviewLink } from "@/components/admin/LivePreviewLink";
import { Plus, Trash2 } from "lucide-react";

export default function AdminLabsPage() {
  const [labs, setLabs] = useState<LabContentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newLab, setNewLab] = useState({
    name: "",
    researchFocus: "AI & Bio-Ethics",
    shortDescription: "",
    leadName: "Dr. Alex Rivera",
  });

  const loadLabs = async () => {
    setLoading(true);
    try {
      const res = await cmsApi.getLabsAdmin();
      setLabs(res);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadLabs();
  }, []);

  return (
    <div className="space-y-6 font-sans">
      {actionFeedback && <AdminActionNotice message={actionFeedback} href="/labs" />}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase">
            Research Labs Catalog
          </h2>
          <p className="font-sans text-xs text-bone-200 font-medium">
            Manage research focus areas, lab leads, and experimental clusters.
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Research Lab</span>
        </button>
      </div>

      <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
              <tr>
                <th className="p-4">Lab Name</th>
                <th className="p-4">Research Focus</th>
                <th className="p-4">Lab Lead</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
              {labs.map((l) => (
                <tr key={l.id} className="hover:bg-carbon-950/40 transition-colors">
                  <td className="p-4 font-semibold text-bone-50">{l.name}</td>
                  <td className="p-4 uppercase text-[10px] font-mono text-earth-400 font-bold">
                    {l.researchFocus}
                  </td>
                  <td className="p-4 text-bone-200/70">{l.leadName || "Lab Coordinator"}</td>
                  <td className="p-4 text-right space-x-2">
                    <LivePreviewLink href="/labs" />
                    <button
                      onClick={async () => {
                        await cmsApi.deleteLab(l.id);
                        loadLabs();
                      }}
                      className="p-1.5 text-earth-400 hover:text-earth-300 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {labs.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase"
                  >
                    No research labs cataloged.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showNewModal && (
        <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-bone-50/15 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-bone-50 uppercase">
              New Research Lab
            </h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Lab Name"
                value={newLab.name}
                onChange={(e) => setNewLab({ ...newLab, name: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50"
              />
              <input
                type="text"
                placeholder="Research Focus"
                value={newLab.researchFocus}
                onChange={(e) => setNewLab({ ...newLab, researchFocus: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50"
              />
              <input
                type="text"
                placeholder="Lab Lead Name"
                value={newLab.leadName}
                onChange={(e) => setNewLab({ ...newLab, leadName: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50"
              />
              <textarea
                rows={3}
                placeholder="Short Overview"
                value={newLab.shortDescription}
                onChange={(e) => setNewLab({ ...newLab, shortDescription: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 resize-none"
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
                  if (!newLab.name) return;
                  await cmsApi.createLab(newLab);
                  setShowNewModal(false);
                  setActionFeedback("Research lab saved.");
                  setTimeout(() => setActionFeedback(null), 4000);
                  loadLabs();
                }}
                className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 font-bold text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Save Lab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
