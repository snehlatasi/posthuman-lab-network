"use client";

import { useState, useEffect } from "react";
import type { MemberDto } from "@/lib/api/memberAuth";
import { memberAuthApi } from "@/lib/api/memberAuth";
import { AlertTriangle, Search, Trash2 } from "lucide-react";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MemberDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  }>({ isOpen: false, title: "", description: "", onConfirm: async () => {} });

  const loadMembers = async () => {
    setLoading(true);
    try {
      const res = await memberAuthApi.getAdminMembersList();
      setMembers(res);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMembers();
  }, []);

  const filteredMembers = members.filter(
    (m) =>
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.affiliation && m.affiliation.toLowerCase().includes(search.toLowerCase()))
  );

  const triggerFeedback = (message: string) => {
    setActionFeedback(message);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      {actionFeedback && (
        <div className="rounded-xl border border-moss-500/30 bg-moss-500/20 p-4 text-xs font-bold uppercase tracking-widest text-moss-300">
          {actionFeedback}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase">
            Approved Network Members
          </h2>
          <p className="font-sans text-xs text-bone-200 font-medium">
            Catalog of active scholars, researchers, and creative practitioners in the network.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone-200/50" />
          <input
            type="text"
            placeholder="Search member catalog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 bg-carbon-900 border border-bone-50/15 rounded-xl text-xs text-bone-50 placeholder-bone-200/40 focus:border-earth-400 focus:outline-none w-full sm:w-64"
          />
        </div>
      </div>

      <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
              <tr>
                <th className="p-4">Member</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role & Institution</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-carbon-950/40 transition-colors">
                  <td className="p-4 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-earth-600/20 border border-earth-500/30 flex items-center justify-center font-mono text-xs text-earth-400 font-bold">
                      {m.fullName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-bone-50 block">{m.fullName}</span>
                      <span className="font-mono text-[10px] text-bone-200/50 block">
                        {m.country || "International"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-bone-200/70">{m.email}</td>
                  <td className="p-4">
                    <span className="text-earth-400 font-mono text-[10px] font-bold block uppercase">
                      {m.role || "Scholar"}
                    </span>
                    <span className="text-bone-200/60 text-[11px] block">
                      {m.affiliation || "Independent Lab"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-[9px] font-mono rounded-full uppercase tracking-wider font-bold bg-moss-500/20 text-moss-400 border border-moss-500/30">
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[10px] text-bone-200/50">
                    {m.joinedAt ? new Date(m.joinedAt).toLocaleDateString() : "Recent"}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      {m.status === "ACTIVE" && (
                        <button
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: "Deactivate Member",
                              description: `Deactivate ${m.fullName}? They will be removed from active membership access and public member listings.`,
                              onConfirm: async () => {
                                await memberAuthApi.deactivateMember(m.id);
                                triggerFeedback(`Deactivated member ${m.fullName}`);
                                await loadMembers();
                              },
                            });
                          }}
                          className="rounded-lg border border-earth-500/30 bg-earth-600/20 px-3 py-1 text-[10px] font-bold uppercase text-earth-300 transition-colors hover:bg-earth-600/40"
                        >
                          Deactivate
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setConfirmModal({
                            isOpen: true,
                            title: "Delete Member",
                            description: `Permanently delete ${m.fullName}? This removes their member record completely.`,
                            onConfirm: async () => {
                              await memberAuthApi.deleteMember(m.id);
                              triggerFeedback(`Deleted member ${m.fullName}`);
                              await loadMembers();
                            },
                          });
                        }}
                        className="rounded-lg p-1.5 text-earth-400 transition-colors hover:bg-earth-600/20 hover:text-earth-300"
                        title="Delete member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest"
                  >
                    No approved members found in directory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon-950/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-md space-y-4 rounded-2xl border border-bone-50/15 bg-carbon-900 p-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-earth-400">
              <AlertTriangle className="h-6 w-6 shrink-0" />
              <h3 className="font-serif text-lg font-bold uppercase text-bone-50">
                {confirmModal.title}
              </h3>
            </div>
            <p className="text-xs font-medium leading-relaxed text-bone-200">
              {confirmModal.description}
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                className="rounded-xl border border-bone-50/15 bg-carbon-950 px-4 py-2 font-mono text-xs uppercase text-bone-200"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await confirmModal.onConfirm();
                  setConfirmModal({ ...confirmModal, isOpen: false });
                }}
                className="rounded-xl bg-earth-600 px-4 py-2 font-mono text-xs font-bold uppercase text-bone-50 hover:bg-earth-500"
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
