"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from "react";
import { cmsApi, ConversationDto } from "@/lib/api/cms";
import { Plus, Trash2 } from "lucide-react";

export default function AdminConversationsPage() {
  const [conversations, setConversations] = useState<ConversationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newConv, setNewConv] = useState({ title: "", category: "Ethical AI", shortDescription: "", displayNumber: "01" });

  const loadConversations = async () => {
    setLoading(true);
    try {
      const res = await cmsApi.getConversationsAdmin();
      setConversations(res);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase tracking-tight">
            Current Global Conversations
          </h2>
          <p className="font-sans text-xs text-bone-200 font-medium">Manage featured research themes displayed across the network homepage.</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Conversation</span>
        </button>
      </div>

      <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
              <tr>
                <th className="p-4">No.</th>
                <th className="p-4">Theme Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
              {conversations.map((c) => (
                <tr key={c.id} className="hover:bg-carbon-950/40 transition-colors">
                  <td className="p-4 font-mono text-earth-400 font-bold">{c.displayNumber || "01"}</td>
                  <td className="p-4 font-semibold text-bone-50">{c.title}</td>
                  <td className="p-4 uppercase text-[10px] font-mono text-moss-400 font-bold">{c.category}</td>
                  <td className="p-4 max-w-xs truncate text-bone-200/70">{c.shortDescription}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={async () => {
                        await cmsApi.deleteConversation(c.id);
                        loadConversations();
                      }}
                      className="p-1.5 text-earth-400 hover:text-earth-300 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {conversations.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase">
                    No global conversations cataloged.
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
            <h3 className="font-serif text-xl font-bold text-bone-50 uppercase">New Global Conversation</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Display Number (e.g. 01)"
                value={newConv.displayNumber}
                onChange={(e) => setNewConv({ ...newConv, displayNumber: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50"
              />
              <input
                type="text"
                placeholder="Conversation Title"
                value={newConv.title}
                onChange={(e) => setNewConv({ ...newConv, title: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50"
              />
              <input
                type="text"
                placeholder="Category (e.g. Bio-Art, Ecological Ethics)"
                value={newConv.category}
                onChange={(e) => setNewConv({ ...newConv, category: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50"
              />
              <textarea
                rows={3}
                placeholder="Short Description"
                value={newConv.shortDescription}
                onChange={(e) => setNewConv({ ...newConv, shortDescription: e.target.value })}
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
                  if (!newConv.title) return;
                  await cmsApi.createConversation(newConv);
                  setShowNewModal(false);
                  loadConversations();
                }}
                className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 font-bold text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Save Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
