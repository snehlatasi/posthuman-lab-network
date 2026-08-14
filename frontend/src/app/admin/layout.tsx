"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getStoredToken, fetchJson } from "@/lib/api/apiClient";
import { authApi } from "@/lib/api/auth";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  Calendar,
  BookOpen,
  Mail,
  Settings,
  LogOut,
  RefreshCw,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  Video,
  MessageSquare,
  Award,
  FlaskConical,
  UserPlus,
  SlidersHorizontal,
  History,
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

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [authorized, setAuthorized] = useState<boolean>(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loadingTelemetry, setLoadingTelemetry] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const emptySubscribe = useCallback(() => () => {}, []);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (pathname === "/admin/login") return;

    const token = getStoredToken();
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthorized(false);
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!mounted || !authorized) {
    return (
      <div className="min-h-screen bg-[#10120f] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-bone-50">
          <RefreshCw className="w-5 h-5 animate-spin text-earth-400" />
          <span className="font-mono text-xs uppercase tracking-widest">
            Verifying Authorization...
          </span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    authApi.logout();
    router.push("/admin/login");
  };

  const navGroups = [
    {
      group: "OVERVIEW",
      items: [{ href: "/admin/overview", label: "Dashboard", icon: LayoutDashboard }],
    },
    {
      group: "CONTENT",
      items: [
        { href: "/admin/conversations", label: "Conversations", icon: MessageSquare },
        { href: "/admin/blog", label: "Blog Articles", icon: FileText },
        { href: "/admin/curation", label: "Homepage Curation", icon: SlidersHorizontal },
      ],
    },
    {
      group: "PROGRAMS",
      items: [
        { href: "/admin/events", label: "Events & Gatherings", icon: Calendar },
        { href: "/admin/learning", label: "Masterclasses & Learning", icon: Award },
        { href: "/admin/labs", label: "Research Catalog", icon: FlaskConical },
      ],
    },
    {
      group: "RESEARCH",
      items: [
        { href: "/admin/publications", label: "Publications Catalog", icon: BookOpen },
        { href: "/admin/people", label: "People & Researchers", icon: UserPlus },
      ],
    },
    {
      group: "MEDIA",
      items: [{ href: "/admin/media", label: "Media & YouTube", icon: Video }],
    },
    {
      group: "COMMUNITY",
      items: [
        { href: "/admin/memberships", label: "Applications", icon: Users },
        { href: "/admin/members", label: "Approved Members", icon: UserCheck },
        { href: "/admin/subscribers", label: "Subscribers", icon: Mail },
        { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
      ],
    },
    {
      group: "SYSTEM",
      items: [
        { href: "/admin/settings", label: "Settings", icon: Settings },
        { href: "/admin/audit", label: "Audit Log", icon: History },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#10120f] text-bone-50 flex flex-col xl:flex-row font-sans">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-carbon-900 border border-moss-500/40 text-bone-50 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-moss-400 shrink-0" />
          <span className="font-sans text-xs font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Persistent Sidebar Navigation */}
      <aside
        className={`xl:w-72 bg-carbon-900/90 border-r border-carbon-950/10 dark:border-bone-50/12 flex flex-col justify-between shrink-0 transition-all z-40 overflow-y-auto max-h-screen ${
          isMobileMenuOpen ? "fixed inset-0 z-50 bg-[#10120f]" : "hidden xl:flex"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-serif text-lg font-bold tracking-[0.1em] text-bone-50 uppercase block leading-none">
                POSTHUMAN
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-earth-400 uppercase font-bold block">
                CMS CONSOLE
              </span>
            </div>
            {isMobileMenuOpen && (
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="xl:hidden p-1 text-bone-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Grouped Navigation Items */}
          <nav className="space-y-5" role="navigation">
            {navGroups.map((g, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <span className="font-mono text-[9px] text-bone-200/40 font-bold uppercase tracking-[0.2em] px-2 block">
                  {g.group}
                </span>
                <div className="space-y-1">
                  {g.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/admin/overview" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] font-mono tracking-wider uppercase transition-all duration-200 ${
                          isActive
                            ? "bg-carbon-950 border border-earth-500/40 text-earth-400 font-bold shadow-sm"
                            : "text-bone-200/80 hover:text-bone-50 hover:bg-carbon-950/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon
                            className={`w-3.5 h-3.5 ${isActive ? "text-earth-400" : "text-bone-200/50"}`}
                          />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Authenticated Administrator Profile Card */}
        <div className="p-5 border-t border-carbon-950/10 dark:border-bone-50/10 space-y-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-earth-600/20 border border-earth-500/30 flex items-center justify-center font-mono text-xs font-bold text-earth-400">
              SA
            </div>
            <div className="space-y-0.5 truncate">
              <span className="font-serif text-xs font-bold text-bone-50 block truncate">
                System Administrator
              </span>
              <span className="font-mono text-[9px] text-bone-200/60 block truncate">
                posthumanlabnetwork@gmail.com
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-carbon-950 hover:bg-earth-600/20 text-earth-400 border border-earth-500/30 text-[10px] font-mono tracking-wider uppercase font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Operational Body Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="border-b border-carbon-950/10 dark:border-bone-50/12 bg-carbon-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-2 text-bone-200 hover:text-bone-50 bg-carbon-900 rounded-lg border border-bone-50/10"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-moss-500 animate-pulse" />
              <h1 className="font-serif font-bold text-lg text-bone-50 uppercase">POSTHUMAN CMS</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-carbon-950 hover:bg-carbon-900 text-bone-200 hover:text-bone-50 border border-bone-50/10 text-xs font-mono tracking-wider uppercase transition-colors"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={async () => {
                setLoadingTelemetry(true);
                await fetchJson<AdminStats>("/api/admin/stats").catch(() => null);
                setLoadingTelemetry(false);
                setToastMsg("CMS Telemetry updated.");
                setTimeout(() => setToastMsg(null), 3000);
              }}
              className="p-2 rounded-xl bg-carbon-950 hover:bg-carbon-900 text-bone-200 hover:text-bone-50 border border-bone-50/10 transition-colors cursor-pointer"
              title="Refresh CMS Telemetry"
            >
              <RefreshCw
                className={`w-4 h-4 ${loadingTelemetry ? "animate-spin text-earth-400" : ""}`}
              />
            </button>
          </div>
        </header>

        {/* Dynamic Route Content Region */}
        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
