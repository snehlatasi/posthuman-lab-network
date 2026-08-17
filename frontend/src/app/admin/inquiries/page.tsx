"use client";

import { useState, useEffect } from "react";
import type { ContactResponseDto } from "@/lib/api/contact";
import { contactApi } from "@/lib/api/contact";
import type { CollaborationResponseDto } from "@/lib/api/collaboration";
import { collaborationApi } from "@/lib/api/collaboration";
import { Archive, CheckCircle2, Trash2, AlertTriangle } from "lucide-react";

export default function AdminInquiriesPage() {
  const [messages, setMessages] = useState<ContactResponseDto[]>([]);
  const [collaborations, setCollaborations] = useState<CollaborationResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  }>({ isOpen: false, title: "", description: "", onConfirm: async () => {} });

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const msgRes = await contactApi.getAllMessages().catch(() => []);
      setMessages(msgRes);
      const collabRes = await collaborationApi.getAllRequests().catch(() => []);
      setCollaborations(collabRes);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadInquiries();
  }, []);

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="space-y-8 font-sans">
      {actionFeedback && (
        <div className="p-4 rounded-xl bg-moss-500/20 border border-moss-500/30 text-moss-400 text-xs font-mono uppercase font-bold">
          {actionFeedback}
        </div>
      )}

      {/* General Contact Messages */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase">
          General Inquiries ({messages.length})
        </h2>
        <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans min-w-[700px]">
              <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
                <tr>
                  <th className="p-4">Sender</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
                {messages.map((m) => (
                  <tr key={m.id} className="hover:bg-carbon-950/40 transition-colors">
                    <td className="p-4 font-semibold text-bone-50">{m.name}</td>
                    <td className="p-4 font-mono text-[10px] text-bone-200/70">{m.email}</td>
                    <td className="p-4">{m.subject}</td>
                    <td className="p-4 max-w-xs truncate text-bone-200/70">{m.message}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${
                          m.status === "NEW"
                            ? "border-earth-500/30 bg-earth-500/20 text-earth-400"
                            : m.status === "READ"
                              ? "border-moss-500/30 bg-moss-500/20 text-moss-400"
                              : "border-bone-50/10 bg-carbon-950 text-bone-200/40"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {m.status === "NEW" && (
                          <button
                            onClick={async () => {
                              await contactApi.updateMessageStatus(m.id, "READ");
                              triggerFeedback("Inquiry marked read.");
                              loadInquiries();
                            }}
                            className="p-1.5 text-moss-400 hover:bg-moss-500/20 hover:text-moss-300"
                            title="Mark read"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        )}
                        {m.status !== "ARCHIVED" && (
                          <button
                            onClick={async () => {
                              await contactApi.updateMessageStatus(m.id, "ARCHIVED");
                              triggerFeedback("Inquiry archived.");
                              loadInquiries();
                            }}
                            className="p-1.5 text-bone-200/60 hover:bg-bone-50/10 hover:text-bone-100"
                            title="Archive inquiry"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: "Delete Inquiry",
                              description: `Permanently delete message from ${m.name}?`,
                              onConfirm: async () => {
                                await contactApi.deleteMessage(m.id);
                                triggerFeedback("Inquiry deleted.");
                                loadInquiries();
                              },
                            });
                          }}
                          className="p-1.5 text-earth-400 hover:text-earth-300 cursor-pointer"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-6 text-center font-mono text-xs text-bone-200/40 uppercase"
                    >
                      No contact inquiries.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Collaboration Proposals */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase">
          Collaboration Proposals ({collaborations.length})
        </h2>
        <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans min-w-[700px]">
              <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
                <tr>
                  <th className="p-4">Proposer</th>
                  <th className="p-4">Organization</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Proposal</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
                {collaborations.map((c) => (
                  <tr key={c.id} className="hover:bg-carbon-950/40 transition-colors">
                    <td className="p-4 font-semibold text-bone-50">{c.name}</td>
                    <td className="p-4 text-earth-400 font-mono text-[10px] font-bold">
                      {c.organization}
                    </td>
                    <td className="p-4 uppercase text-[10px] font-mono">{c.collaborationType}</td>
                    <td className="p-4 max-w-xs truncate text-bone-200/70">{c.message}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${
                          c.status === "NEW"
                            ? "border-earth-500/30 bg-earth-500/20 text-earth-400"
                            : c.status === "REVIEWED"
                              ? "border-moss-500/30 bg-moss-500/20 text-moss-400"
                              : "border-bone-50/10 bg-carbon-950 text-bone-200/40"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {c.status === "NEW" && (
                          <button
                            onClick={async () => {
                              await collaborationApi.updateRequestStatus(c.id, "REVIEWED");
                              triggerFeedback("Proposal marked reviewed.");
                              loadInquiries();
                            }}
                            className="p-1.5 text-moss-400 hover:bg-moss-500/20 hover:text-moss-300"
                            title="Mark reviewed"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        )}
                        {c.status !== "ARCHIVED" && (
                          <button
                            onClick={async () => {
                              await collaborationApi.updateRequestStatus(c.id, "ARCHIVED");
                              triggerFeedback("Proposal archived.");
                              loadInquiries();
                            }}
                            className="p-1.5 text-bone-200/60 hover:bg-bone-50/10 hover:text-bone-100"
                            title="Archive proposal"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: "Delete Proposal",
                              description: `Permanently delete proposal from ${c.name}?`,
                              onConfirm: async () => {
                                await collaborationApi.deleteRequest(c.id);
                                triggerFeedback("Proposal deleted.");
                                loadInquiries();
                              },
                            });
                          }}
                          className="p-1.5 text-earth-400 hover:text-earth-300 cursor-pointer"
                          title="Delete proposal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {collaborations.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-6 text-center font-mono text-xs text-bone-200/40 uppercase"
                    >
                      No collaboration proposals.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
