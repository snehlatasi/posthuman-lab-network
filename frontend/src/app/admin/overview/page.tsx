"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchJson } from "@/lib/api/apiClient";
import { FileText, Calendar, BookOpen, Users, Plus, ArrowRight } from "lucide-react";

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

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    fetchJson<AdminStats>("/api/admin/stats")
      .then((res) => setStats(res))
      .catch(() => null);
  }, []);

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-carbon-900/80 border border-bone-50/15 shadow-xl space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 organic-radial-glow opacity-30 pointer-events-none" />
        <span className="font-mono text-xs text-earth-400 font-bold uppercase tracking-[0.25em] block">
          OPERATIONAL OVERVIEW
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-bone-50 uppercase tracking-tight">
          Welcome Back, Administrator
        </h2>
        <p className="font-sans text-xs sm:text-sm text-bone-200 leading-relaxed font-medium max-w-xl">
          Real-time database metrics and operational telemetry for the Posthuman Lab Network
          console.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Blog Articles",
            val: stats?.totalBlogPosts ?? 0,
            sub: `${stats?.publishedBlogPosts ?? 0} Published`,
            icon: FileText,
            href: "/admin/blog",
          },
          {
            title: "Scheduled Events",
            val: stats?.totalEvents ?? 0,
            sub: `${stats?.upcomingEvents ?? 0} Upcoming`,
            icon: Calendar,
            href: "/admin/events",
          },
          {
            title: "Publications Catalog",
            val: stats?.totalPublications ?? 0,
            sub: "Peer Reviewed Papers",
            icon: BookOpen,
            href: "/admin/publications",
          },
          {
            title: "Pending Memberships",
            val: stats?.pendingMemberships ?? 0,
            sub: "Applications Review",
            icon: Users,
            href: "/admin/memberships",
          },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              href={s.href}
              className="p-6 rounded-2xl bg-carbon-900/90 border border-bone-50/15 hover:border-earth-500/50 shadow-md space-y-3 block transition-all group"
            >
              <div className="flex justify-between items-center text-bone-200/50">
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold">
                  {s.title}
                </span>
                <Icon className="w-4 h-4 text-earth-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-serif text-3xl font-bold text-bone-50">{s.val}</div>
              <div className="flex items-center justify-between font-sans text-xs text-moss-400 font-medium">
                <span>{s.sub}</span>
                <ArrowRight className="w-3.5 h-3.5 text-earth-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Navigation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-carbon-900/80 border border-bone-50/15 space-y-4 shadow-md">
        <h3 className="font-serif text-xl font-bold text-bone-50 uppercase tracking-tight">
          Quick Action Shortcuts
        </h3>
        <div className="flex flex-wrap gap-4 pt-1">
          <Link
            href="/admin/blog"
            className="px-5 py-3 bg-earth-600 hover:bg-earth-500 text-bone-50 font-mono text-xs uppercase tracking-wider font-bold rounded-xl flex items-center space-x-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Blog Articles</span>
          </Link>
          <Link
            href="/admin/events"
            className="px-5 py-3 bg-carbon-950 hover:bg-carbon-800 text-bone-50 border border-bone-50/15 font-mono text-xs uppercase tracking-wider font-bold rounded-xl flex items-center space-x-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Events</span>
          </Link>
          <Link
            href="/admin/memberships"
            className="px-5 py-3 bg-carbon-950 hover:bg-carbon-800 text-bone-50 border border-bone-50/15 font-mono text-xs uppercase tracking-wider font-bold rounded-xl flex items-center space-x-2 transition-all shadow-md"
          >
            <Users className="w-4 h-4" />
            <span>Review Applications</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
