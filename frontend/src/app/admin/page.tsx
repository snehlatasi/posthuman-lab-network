"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken, fetchJson } from "@/lib/api/apiClient";
import { authApi } from "@/lib/api/auth";
import { blogApi, BlogPost } from "@/lib/api/blog";
import { eventsApi, EventApiDto } from "@/lib/api/events";
import { publicationsApi, PublicationApiDto } from "@/lib/api/publications";
import { membershipApi, MembershipInterestResponseDto } from "@/lib/api/membership";
import { contactApi, ContactResponseDto } from "@/lib/api/contact";
import { collaborationApi, CollaborationResponseDto } from "@/lib/api/collaboration";

import {
  Users,
  FileText,
  Calendar,
  BookOpen,
  Mail,
  Handshake,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw
} from "lucide-react";

interface AdminStats {
  totalBlogPosts: number;
  publishedBlogPosts: number;
  totalEvents: number;
  upcomingEvents: number;
  totalPublications: number;
  pendingMemberships: number;
  totalContactMessages: number;
  totalCollaborationRequests: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "memberships" | "blog" | "events" | "publications" | "messages">("stats");

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [memberships, setMemberships] = useState<MembershipInterestResponseDto[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [events, setEvents] = useState<EventApiDto[]>([]);
  const [publications, setPublications] = useState<PublicationApiDto[]>([]);
  const [messages, setMessages] = useState<ContactResponseDto[]>([]);
  const [collaborations, setCollaborations] = useState<CollaborationResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  // New Content Forms State
  const [showNewBlogModal, setShowNewBlogModal] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", excerpt: "", content: "", author: "Admin Coordinator" });

  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", eventType: "Workshop", startDateTime: "", endDateTime: "", location: "Online Webcast", online: true });

  const [showNewPubModal, setShowNewPubModal] = useState(false);
  const [newPub, setNewPub] = useState({ title: "", summary: "", content: "", authorDisplayName: "Admin Researcher", publicationType: "ARTICLE" as const });

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    setAuthorized(true);
    loadAllAdminData();
  }, [router]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const statsRes = await fetchJson<AdminStats>("/api/admin/stats").catch(() => null);
      if (statsRes) setStats(statsRes);

      const memRes = await membershipApi.getAllInterests().catch(() => []);
      setMemberships(memRes);

      const blogRes = await blogApi.getAllBlogPostsAdmin().catch(() => []);
      setBlogPosts(blogRes);

      const eventRes = await eventsApi.getAllAdminEvents().catch(() => []);
      setEvents(eventRes);

      const pubRes = await publicationsApi.getAllAdminPublications().catch(() => []);
      setPublications(pubRes);

      const msgRes = await contactApi.getAllMessages().catch(() => []);
      setMessages(msgRes);

      const collabRes = await collaborationApi.getAllRequests().catch(() => []);
      setCollaborations(collabRes);
    } catch {
      // Auth or network error fallback
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    router.push("/admin/login");
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-carbon-950 text-bone-100 flex flex-col font-sans">
      {/* Top Navigation Header */}
      <header className="border-b border-bone-200/10 bg-carbon-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-moss-500 animate-pulse" />
          <span className="font-serif font-bold text-lg text-bone-50">
            Posthuman Lab Network — Admin Command
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={loadAllAdminData}
            className="p-2 rounded-lg bg-carbon-900 hover:bg-carbon-800 text-bone-200/70 hover:text-bone-50 transition-colors border border-bone-200/10 cursor-pointer"
            title="Refresh Telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-earth-500/20 hover:bg-earth-500/40 text-earth-400 border border-earth-500/30 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-bone-200/10 gap-2">
          {[
            { id: "stats", label: "Overview", icon: BookOpen },
            { id: "memberships", label: `Memberships (${memberships.length})`, icon: Users },
            { id: "blog", label: `Blog (${blogPosts.length})`, icon: FileText },
            { id: "events", label: `Events (${events.length})`, icon: Calendar },
            { id: "publications", label: `Publications (${publications.length})`, icon: BookOpen },
            { id: "messages", label: `Inquiries (${messages.length + collaborations.length})`, icon: Mail }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`inline-flex items-center space-x-2 px-4 py-3 text-xs font-mono uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-earth-400 text-earth-400 bg-carbon-900"
                    : "border-transparent text-bone-200 hover:text-bone-50 hover:border-bone-200/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === "stats" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Blog Posts", val: stats?.totalBlogPosts ?? blogPosts.length, sub: `${stats?.publishedBlogPosts ?? 0} Published`, icon: FileText },
                { title: "Scheduled Events", val: stats?.totalEvents ?? events.length, sub: `${stats?.upcomingEvents ?? 0} Upcoming`, icon: Calendar },
                { title: "Publications Catalog", val: stats?.totalPublications ?? publications.length, sub: "Peer Reviewed", icon: BookOpen },
                { title: "Pending Memberships", val: stats?.pendingMemberships ?? memberships.length, sub: "Awaiting Cell Review", icon: Users }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="glass-panel p-6 rounded-xl border border-bone-200/10 space-y-3">
                    <div className="flex justify-between items-center text-bone-200/40">
                      <span className="font-mono text-[10px] tracking-widest uppercase">{s.title}</span>
                      <Icon className="w-4 h-4 text-moss-500" />
                    </div>
                    <div className="font-serif text-3xl font-bold text-bone-50">{s.val}</div>
                    <div className="font-sans text-xs text-moss-400">{s.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Bar */}
            <div className="p-6 rounded-xl bg-carbon-900/40 border border-bone-200/10 space-y-4">
              <h3 className="font-serif text-lg font-bold text-bone-100">Quick Administrative Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowNewBlogModal(true)}
                  className="px-4 py-2.5 bg-moss-500 hover:bg-moss-400 text-carbon-950 font-mono text-xs uppercase tracking-wider font-bold rounded-lg flex items-center space-x-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Blog Article</span>
                </button>
                <button
                  onClick={() => setShowNewEventModal(true)}
                  className="px-4 py-2.5 bg-bone-100 hover:bg-bone-200 text-carbon-950 font-mono text-xs uppercase tracking-wider font-bold rounded-lg flex items-center space-x-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Live Event</span>
                </button>
                <button
                  onClick={() => setShowNewPubModal(true)}
                  className="px-4 py-2.5 bg-carbon-800 hover:bg-carbon-700 text-bone-100 font-mono text-xs uppercase tracking-wider font-bold rounded-lg border border-bone-200/20 flex items-center space-x-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Publication Entry</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEMBERSHIPS */}
        {activeTab === "memberships" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold text-bone-50">Membership Applications</h2>
              <span className="text-xs font-mono text-bone-200/40">Total: {memberships.length}</span>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden border border-bone-200/10">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-carbon-900 border-b border-bone-200/10 font-mono uppercase text-[10px] text-bone-200/50 tracking-widest">
                  <tr>
                    <th className="p-4">Applicant</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Area of Interest</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Submitted</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bone-200/5 text-bone-200/80">
                  {memberships.map((m) => (
                    <tr key={m.id} className="hover:bg-carbon-900/40 transition-colors">
                      <td className="p-4 font-semibold text-bone-100">{m.name}</td>
                      <td className="p-4 font-mono text-[11px] text-bone-200/60">{m.email}</td>
                      <td className="p-4 uppercase text-[10px] font-mono text-moss-400">{m.areaOfInterest}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 text-[9px] font-mono rounded uppercase tracking-wider ${
                          m.status === "NEW" ? "bg-moss-500/20 text-moss-400 border border-moss-500/30" : "bg-carbon-800 text-bone-200/50"
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[10px] text-bone-200/40">{m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "Recent"}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={async () => {
                            await membershipApi.updateInterestStatus(m.id, "ACCEPTED");
                            loadAllAdminData();
                          }}
                          className="px-2 py-1 bg-moss-500/20 hover:bg-moss-500/40 text-moss-400 text-[10px] font-mono rounded uppercase cursor-pointer"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                  {memberships.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest">
                        No pending membership applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BLOG POSTS */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold text-bone-50">Blog Posts Catalog</h2>
              <button
                onClick={() => setShowNewBlogModal(true)}
                className="px-3 py-1.5 bg-moss-500 hover:bg-moss-400 text-carbon-950 text-xs font-mono uppercase tracking-wider font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Article</span>
              </button>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden border border-bone-200/10">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-carbon-900 border-b border-bone-200/10 font-mono uppercase text-[10px] text-bone-200/50 tracking-widest">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Slug</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bone-200/5 text-bone-200/80">
                  {blogPosts.map((b) => (
                    <tr key={b.id} className="hover:bg-carbon-900/40 transition-colors">
                      <td className="p-4 font-semibold text-bone-100">{b.title}</td>
                      <td className="p-4 font-mono text-[10px] text-bone-200/50">{b.slug}</td>
                      <td className="p-4">{b.author || "Admin"}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 text-[9px] font-mono rounded uppercase tracking-wider ${
                          b.status === "PUBLISHED" ? "bg-moss-500/20 text-moss-400 border border-moss-500/30" : "bg-earth-500/20 text-earth-400"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {b.status === "PUBLISHED" ? (
                          <button
                            onClick={async () => {
                              await blogApi.unpublishBlogPost(b.id);
                              loadAllAdminData();
                            }}
                            className="px-2 py-1 bg-earth-500/20 hover:bg-earth-500/40 text-earth-400 text-[10px] font-mono rounded uppercase cursor-pointer"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              await blogApi.publishBlogPost(b.id);
                              loadAllAdminData();
                            }}
                            className="px-2 py-1 bg-moss-500/20 hover:bg-moss-500/40 text-moss-400 text-[10px] font-mono rounded uppercase cursor-pointer"
                          >
                            Publish
                          </button>
                        )}
                        <button
                          onClick={async () => {
                            if (confirm("Delete this blog article?")) {
                              await blogApi.deleteBlogPost(b.id);
                              loadAllAdminData();
                            }
                          }}
                          className="p-1 text-earth-400 hover:text-earth-300 cursor-pointer inline-block align-middle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {blogPosts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest">
                        No blog posts available in system database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: EVENTS */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold text-bone-50">Events & Meetups Catalog</h2>
              <button
                onClick={() => setShowNewEventModal(true)}
                className="px-3 py-1.5 bg-bone-100 hover:bg-bone-200 text-carbon-950 text-xs font-mono uppercase tracking-wider font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Event</span>
              </button>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden border border-bone-200/10">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-carbon-900 border-b border-bone-200/10 font-mono uppercase text-[10px] text-bone-200/50 tracking-widest">
                  <tr>
                    <th className="p-4">Event Title</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bone-200/5 text-bone-200/80">
                  {events.map((e) => (
                    <tr key={e.id} className="hover:bg-carbon-900/40 transition-colors">
                      <td className="p-4 font-semibold text-bone-100">{e.title}</td>
                      <td className="p-4 uppercase text-[10px] font-mono text-moss-400">{e.eventType}</td>
                      <td className="p-4 text-bone-200/60">{e.location || "Online Webcast"}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 text-[9px] font-mono rounded uppercase tracking-wider ${
                          e.status === "UPCOMING" ? "bg-moss-500/20 text-moss-400 border border-moss-500/30" : "bg-carbon-800 text-bone-200/50"
                        }`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={async () => {
                            if (confirm("Delete event?")) {
                              await eventsApi.deleteEvent(e.id);
                              loadAllAdminData();
                            }
                          }}
                          className="p-1 text-earth-400 hover:text-earth-300 cursor-pointer inline-block"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {events.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest">
                        No events cataloged in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PUBLICATIONS */}
        {activeTab === "publications" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold text-bone-50">Publications & Peer Review</h2>
              <button
                onClick={() => setShowNewPubModal(true)}
                className="px-3 py-1.5 bg-carbon-800 hover:bg-carbon-700 text-bone-100 border border-bone-200/20 text-xs font-mono uppercase tracking-wider font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Publication</span>
              </button>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden border border-bone-200/10">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-carbon-900 border-b border-bone-200/10 font-mono uppercase text-[10px] text-bone-200/50 tracking-widest">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bone-200/5 text-bone-200/80">
                  {publications.map((p) => (
                    <tr key={p.id} className="hover:bg-carbon-900/40 transition-colors">
                      <td className="p-4 font-semibold text-bone-100">{p.title}</td>
                      <td className="p-4 text-bone-200/60">{p.authorDisplayName}</td>
                      <td className="p-4 uppercase text-[10px] font-mono text-moss-400">{p.publicationType}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 text-[9px] font-mono rounded uppercase tracking-wider ${
                          p.status === "PUBLISHED" ? "bg-moss-500/20 text-moss-400 border border-moss-500/30" : "bg-earth-500/20 text-earth-400"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {p.status === "PUBLISHED" ? (
                          <button
                            onClick={async () => {
                              await publicationsApi.unpublishPublication(p.id);
                              loadAllAdminData();
                            }}
                            className="px-2 py-1 bg-earth-500/20 hover:bg-earth-500/40 text-earth-400 text-[10px] font-mono rounded uppercase cursor-pointer"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              await publicationsApi.publishPublication(p.id);
                              loadAllAdminData();
                            }}
                            className="px-2 py-1 bg-moss-500/20 hover:bg-moss-500/40 text-moss-400 text-[10px] font-mono rounded uppercase cursor-pointer"
                          >
                            Publish
                          </button>
                        )}
                        <button
                          onClick={async () => {
                            if (confirm("Delete publication?")) {
                              await publicationsApi.deletePublication(p.id);
                              loadAllAdminData();
                            }
                          }}
                          className="p-1 text-earth-400 hover:text-earth-300 cursor-pointer inline-block"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {publications.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest">
                        No publications cataloged.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: INQUIRIES & PROPOSALS */}
        {activeTab === "messages" && (
          <div className="space-y-8">
            {/* Contact Messages */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-bone-50">General Inquiries ({messages.length})</h3>
              <div className="glass-panel rounded-xl overflow-hidden border border-bone-200/10">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-carbon-900 border-b border-bone-200/10 font-mono uppercase text-[10px] text-bone-200/50 tracking-widest">
                    <tr>
                      <th className="p-4">Sender</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Message</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-bone-200/5 text-bone-200/80">
                    {messages.map((m) => (
                      <tr key={m.id}>
                        <td className="p-4 font-semibold text-bone-100">{m.name}</td>
                        <td className="p-4 font-mono text-[10px] text-bone-200/60">{m.email}</td>
                        <td className="p-4">{m.subject}</td>
                        <td className="p-4 max-w-xs truncate text-bone-200/70">{m.message}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={async () => {
                              await contactApi.deleteMessage(m.id);
                              loadAllAdminData();
                            }}
                            className="p-1 text-earth-400 hover:text-earth-300 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {messages.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center font-mono text-xs text-bone-200/40 uppercase">No contact inquiries.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Collaboration Proposals */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-bone-50">Collaboration Proposals ({collaborations.length})</h3>
              <div className="glass-panel rounded-xl overflow-hidden border border-bone-200/10">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-carbon-900 border-b border-bone-200/10 font-mono uppercase text-[10px] text-bone-200/50 tracking-widest">
                    <tr>
                      <th className="p-4">Proposer</th>
                      <th className="p-4">Organization</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Proposal</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-bone-200/5 text-bone-200/80">
                    {collaborations.map((c) => (
                      <tr key={c.id}>
                        <td className="p-4 font-semibold text-bone-100">{c.name}</td>
                        <td className="p-4 text-moss-400 font-mono text-[10px]">{c.organization}</td>
                        <td className="p-4 uppercase text-[10px] font-mono">{c.collaborationType}</td>
                        <td className="p-4 max-w-xs truncate text-bone-200/70">{c.message}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={async () => {
                              await collaborationApi.deleteRequest(c.id);
                              loadAllAdminData();
                            }}
                            className="p-1 text-earth-400 hover:text-earth-300 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {collaborations.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center font-mono text-xs text-bone-200/40 uppercase">No collaboration proposals.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: NEW BLOG POST */}
        {showNewBlogModal && (
          <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-panel p-6 rounded-2xl border border-bone-200/10 max-w-lg w-full space-y-4">
              <h3 className="font-serif text-lg font-bold text-bone-50">Create New Blog Post</h3>
              <div className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Article Title"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Author Name"
                  value={newBlog.author}
                  onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Short Excerpt"
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
                />
                <textarea
                  rows={5}
                  placeholder="Full Article Content (paragraphs separated by empty lines)"
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none resize-none"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowNewBlogModal(false)}
                  className="px-4 py-2 bg-carbon-800 text-bone-200 text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const generatedSlug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                    await blogApi.createBlogPost({ ...newBlog, slug: generatedSlug, status: "PUBLISHED" });
                    setShowNewBlogModal(false);
                    setNewBlog({ title: "", excerpt: "", content: "", author: "Admin Coordinator" });
                    loadAllAdminData();
                  }}
                  className="px-4 py-2 bg-moss-500 text-carbon-950 font-bold text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: NEW EVENT */}
        {showNewEventModal && (
          <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-panel p-6 rounded-2xl border border-bone-200/10 max-w-lg w-full space-y-4">
              <h3 className="font-serif text-lg font-bold text-bone-50">Create Live Event</h3>
              <div className="space-y-3 text-xs">
                <input
                  type="text"
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
                  placeholder="Event Description & Agenda Details"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none resize-none"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowNewEventModal(false)}
                  className="px-4 py-2 bg-carbon-800 text-bone-200 text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const generatedSlug = newEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                    const now = new Date();
                    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                    await eventsApi.createEvent({
                      ...newEvent,
                      slug: generatedSlug,
                      startDateTime: nextWeek.toISOString(),
                      endDateTime: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000).toISOString(),
                      status: "UPCOMING"
                    });
                    setShowNewEventModal(false);
                    setNewEvent({ title: "", description: "", eventType: "Workshop", startDateTime: "", endDateTime: "", location: "Online Webcast", online: true });
                    loadAllAdminData();
                  }}
                  className="px-4 py-2 bg-bone-100 text-carbon-950 font-bold text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: NEW PUBLICATION */}
        {showNewPubModal && (
          <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-panel p-6 rounded-2xl border border-bone-200/10 max-w-lg w-full space-y-4">
              <h3 className="font-serif text-lg font-bold text-bone-50">Add Publication Catalog Entry</h3>
              <div className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Publication Title"
                  value={newPub.title}
                  onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Author Display Name"
                  value={newPub.authorDisplayName}
                  onChange={(e) => setNewPub({ ...newPub, authorDisplayName: e.target.value })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
                />
                <select
                  value={newPub.publicationType}
                  onChange={(e) => setNewPub({ ...newPub, publicationType: e.target.value as any })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
                >
                  <option value="ARTICLE">Academic Article</option>
                  <option value="ESSAY">Speculative Essay</option>
                  <option value="RESEARCH">Research Telemetry Log</option>
                  <option value="CREATIVE_WORK">Creative Work / Sound Art</option>
                </select>
                <input
                  type="text"
                  placeholder="Summary"
                  value={newPub.summary}
                  onChange={(e) => setNewPub({ ...newPub, summary: e.target.value })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none"
                />
                <textarea
                  rows={4}
                  placeholder="Full Publication Content"
                  value={newPub.content}
                  onChange={(e) => setNewPub({ ...newPub, content: e.target.value })}
                  className="w-full p-3 bg-carbon-900 border border-bone-200/10 rounded-lg text-bone-100 focus:outline-none resize-none"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowNewPubModal(false)}
                  className="px-4 py-2 bg-carbon-800 text-bone-200 text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const generatedSlug = newPub.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                    await publicationsApi.createPublication({
                      ...newPub,
                      slug: generatedSlug,
                      status: "PUBLISHED"
                    });
                    setShowNewPubModal(false);
                    setNewPub({ title: "", summary: "", content: "", authorDisplayName: "Admin Researcher", publicationType: "ARTICLE" });
                    loadAllAdminData();
                  }}
                  className="px-4 py-2 bg-moss-500 text-carbon-950 font-bold text-xs font-mono uppercase rounded-lg cursor-pointer"
                >
                  Publish Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
