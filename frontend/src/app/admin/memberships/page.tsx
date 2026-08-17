"use client";

import { useState, useEffect } from "react";
import type { MemberDto, MembershipApplicationResponseDto } from "@/lib/api/memberAuth";
import { memberAuthApi } from "@/lib/api/memberAuth";
import { AlertTriangle, Trash2 } from "lucide-react";

export default function AdminMembershipsPage() {
  const [applications, setApplications] = useState<MembershipApplicationResponseDto[]>([]);
  const [members, setMembers] = useState<MemberDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  }>({ isOpen: false, title: "", description: "", onConfirm: async () => {} });

  const loadApplications = async () => {
    setLoading(true);
    try {
      const [applicationRes, memberRes] = await Promise.all([
        memberAuthApi.getAdminApplications(),
        memberAuthApi.getAdminMembersList(),
      ]);
      setApplications(applicationRes);
      setMembers(memberRes);
    } catch {
      // API fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadApplications();
  }, []);

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      {actionFeedback && (
        <div className="p-4 rounded-xl bg-moss-500/20 border border-moss-500/30 text-moss-400 text-xs font-mono uppercase tracking-wider font-bold">
          {actionFeedback}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase">
            Membership Applications
          </h2>
          <p className="font-sans text-xs text-bone-200 font-medium">
            Review, approve, or reject incoming verified member applications.
          </p>
        </div>
        <span className="font-mono text-xs text-earth-400 font-bold uppercase">
          Total: {applications.length}
        </span>
      </div>

      <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[800px]">
            <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
              <tr>
                <th className="p-4">Applicant</th>
                <th className="p-4">Email</th>
                <th className="p-4">Affiliation / Role</th>
                <th className="p-4">Areas of Interest</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-carbon-950/40 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-bone-50 block">{app.fullName}</span>
                    <span className="font-mono text-[10px] text-bone-200/50 block">
                      {app.country || "International"}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-bone-200/70">{app.email}</td>
                  <td className="p-4">
                    <span className="text-earth-400 font-mono text-[10px] font-bold block uppercase">
                      {app.role || "Researcher"}
                    </span>
                    <span className="text-bone-200/60 text-[11px] block">
                      {app.affiliation || "Independent"}
                    </span>
                  </td>
                  <td className="p-4 max-w-xs text-bone-200/70 truncate">{app.areasOfInterest}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-[9px] font-mono rounded-full uppercase tracking-wider font-bold ${
                        app.status === "PENDING"
                          ? "bg-earth-500/20 text-earth-400 border border-earth-500/30 animate-pulse"
                          : app.status === "APPROVED"
                            ? "bg-moss-500/20 text-moss-400 border border-moss-500/30"
                            : "bg-carbon-950 text-bone-200/40 border border-bone-50/10"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {app.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: "Approve Membership Application",
                              description: `Approve application for ${app.fullName}? This will activate their network Member record.`,
                              onConfirm: async () => {
                                await memberAuthApi.approveApplication(app.id);
                                triggerFeedback(`Approved application for ${app.fullName}`);
                                loadApplications();
                              },
                            });
                          }}
                          className="px-3 py-1 bg-moss-500/20 hover:bg-moss-500/40 text-moss-400 text-[10px] font-mono rounded-lg uppercase font-bold cursor-pointer transition-colors border border-moss-500/30"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: "Reject Membership Application",
                              description: `Reject application for ${app.fullName}?`,
                              onConfirm: async () => {
                                await memberAuthApi.rejectApplication(app.id);
                                triggerFeedback(`Rejected application for ${app.fullName}`);
                                loadApplications();
                              },
                            });
                          }}
                          className="px-3 py-1 bg-earth-600/20 hover:bg-earth-600/40 text-earth-400 text-[10px] font-mono rounded-lg uppercase font-bold cursor-pointer transition-colors border border-earth-500/30"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setConfirmModal({
                          isOpen: true,
                          title: "Delete Membership Application",
                          description: `Permanently delete application for ${app.fullName}? This removes the application record from the admin queue.`,
                          onConfirm: async () => {
                            await memberAuthApi.deleteApplication(app.id);
                            triggerFeedback(`Deleted application for ${app.fullName}`);
                            loadApplications();
                          },
                        });
                      }}
                      className="inline-flex rounded-lg p-1.5 text-earth-400 transition-colors hover:bg-earth-600/20 hover:text-earth-300"
                      title="Delete application"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest"
                  >
                    No membership applications recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase">Approved Members</h2>
          <p className="font-sans text-xs text-bone-200 font-medium">
            Deactivate members that were approved by mistake or should no longer have access.
          </p>
        </div>
        <span className="font-mono text-xs text-earth-400 font-bold uppercase">
          Total: {members.length}
        </span>
      </div>

      <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[760px]">
            <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
              <tr>
                <th className="p-4">Member</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role / Country</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-carbon-950/40 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-bone-50 block">{member.fullName}</span>
                    <span className="font-mono text-[10px] text-bone-200/50 block">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-bone-200/70">{member.email}</td>
                  <td className="p-4">
                    <span className="text-earth-400 font-mono text-[10px] font-bold block uppercase">
                      {member.role || "Researcher"}
                    </span>
                    <span className="text-bone-200/60 text-[11px] block">
                      {member.country || "International"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-[9px] font-mono rounded-full uppercase tracking-wider font-bold ${
                        member.status === "ACTIVE"
                          ? "bg-moss-500/20 text-moss-400 border border-moss-500/30"
                          : "bg-carbon-950 text-bone-200/40 border border-bone-50/10"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {member.status === "ACTIVE" && (
                      <button
                        onClick={() => {
                          setConfirmModal({
                            isOpen: true,
                            title: "Deactivate Member",
                            description: `Deactivate ${member.fullName}? They will be removed from active membership access and public member listings.`,
                            onConfirm: async () => {
                              await memberAuthApi.deactivateMember(member.id);
                              triggerFeedback(`Deactivated member ${member.fullName}`);
                              loadApplications();
                            },
                          });
                        }}
                        className="px-3 py-1 bg-earth-600/20 hover:bg-earth-600/40 text-earth-400 text-[10px] font-mono rounded-lg uppercase font-bold cursor-pointer transition-colors border border-earth-500/30"
                      >
                        Deactivate
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setConfirmModal({
                          isOpen: true,
                          title: "Delete Member",
                          description: `Permanently delete ${member.fullName}? This removes their member record completely.`,
                          onConfirm: async () => {
                            await memberAuthApi.deleteMember(member.id);
                            triggerFeedback(`Deleted member ${member.fullName}`);
                            loadApplications();
                          },
                        });
                      }}
                      className="ml-2 inline-flex rounded-lg p-1.5 text-earth-400 transition-colors hover:bg-earth-600/20 hover:text-earth-300"
                      title="Delete member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest"
                  >
                    No approved members recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
