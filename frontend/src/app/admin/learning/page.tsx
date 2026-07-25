"use client";

import React, { useState, useEffect } from "react";
import type { LearningResourceDto } from "@/lib/api/cms";
import { cmsApi } from "@/lib/api/cms";
import { Plus, Trash2 } from "lucide-react";

export default function AdminLearningPage() {
  const [resources, setResources] = useState<LearningResourceDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newRes, setNewRes] = useState({
    title: "",
    instructor: "Dr. Sarah Chen",
    description: "",
    videoUrl: "",
  });

  const loadLearning = async () => {
    setLoading(true);
    try {
      const res = await cmsApi.getLearningAdmin();
      setResources(res);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadLearning();
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase tracking-tight">
            Masterclasses & Learning Hub
          </h2>
          <p className="font-sans text-xs text-bone-200 font-medium">
            Manage masterclasses, courses, study guides, and video resources.
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Masterclass</span>
        </button>
      </div>

      <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Instructor</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
              {resources.map((r) => (
                <tr key={r.id} className="hover:bg-carbon-950/40 transition-colors">
                  <td className="p-4 font-semibold text-bone-50">{r.title}</td>
                  <td className="p-4 uppercase text-[10px] font-mono text-earth-400 font-bold">
                    {r.resourceType}
                  </td>
                  <td className="p-4 text-bone-200/70">{r.instructor || "Network Lead"}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={async () => {
                        await cmsApi.deleteLearningResource(r.id);
                        loadLearning();
                      }}
                      className="p-1.5 text-earth-400 hover:text-earth-300 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {resources.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase"
                  >
                    No learning resources cataloged.
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
            <h3 className="font-serif text-xl font-bold text-bone-50 uppercase">New Masterclass</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Masterclass Title"
                value={newRes.title}
                onChange={(e) => setNewRes({ ...newRes, title: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50"
              />
              <input
                type="text"
                placeholder="Instructor Name"
                value={newRes.instructor}
                onChange={(e) => setNewRes({ ...newRes, instructor: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50"
              />
              <input
                type="url"
                placeholder="YouTube / Video Embed URL"
                value={newRes.videoUrl}
                onChange={(e) => setNewRes({ ...newRes, videoUrl: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50"
              />
              <textarea
                rows={3}
                placeholder="Description & Agenda"
                value={newRes.description}
                onChange={(e) => setNewRes({ ...newRes, description: e.target.value })}
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
                  if (!newRes.title) return;
                  await cmsApi.createLearningResource({ ...newRes, resourceType: "MASTERCLASS" });
                  setShowNewModal(false);
                  loadLearning();
                }}
                className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 font-bold text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Save Masterclass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
