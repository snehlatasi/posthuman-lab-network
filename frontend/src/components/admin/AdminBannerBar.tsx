"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Settings, LogOut, ExternalLink } from "lucide-react";

export const AdminBannerBar: React.FC = () => {
  const { isAdmin, adminEmail, logout } = useAuth();

  if (!isAdmin) return null;

  return (
    <div className="bg-moss-950 border-b border-moss-500/30 text-moss-300 px-4 py-2 text-xs font-mono flex flex-wrap items-center justify-between z-[60] relative">
      <div className="flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-moss-400 shrink-0" />
        <span className="font-semibold uppercase tracking-wider text-moss-200">
          Admin Control Mode
        </span>
        <span className="text-moss-400/60 hidden sm:inline">•</span>
        <span className="text-moss-300/80 text-[11px] hidden sm:inline">
          {adminEmail}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/admin"
          className="inline-flex items-center space-x-1 hover:text-bone-50 transition-colors underline"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Full Dashboard</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        <button
          onClick={logout}
          className="inline-flex items-center space-x-1 text-earth-400 hover:text-earth-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin</span>
        </button>
      </div>
    </div>
  );
};
