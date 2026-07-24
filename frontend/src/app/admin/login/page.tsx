"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@posthumanlab.org");
  const [password, setPassword] = useState("AdminSecret123!");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      await authApi.login({ email, password });
      router.push("/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed. Please verify credentials.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-carbon-950 text-bone-100 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 organic-radial-glow opacity-20 pointer-events-none rounded-full blur-3xl" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-xl bg-carbon-900 border border-moss-500/20 text-moss-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-bone-50 tracking-tight">
            Coordinators Gateway
          </h1>
          <p className="font-sans text-xs sm:text-sm text-bone-100 font-medium">
            Posthuman Lab Network — Backoffice Administrative Portal
          </p>
        </div>

        <div className="bg-carbon-900 p-8 rounded-2xl border border-bone-200/20 shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="block text-xs font-mono tracking-widest uppercase text-bone-200 font-bold">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-bone-200" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-carbon-950 border border-bone-200/20 rounded-lg text-xs text-bone-50 placeholder-bone-200/60 focus:border-earth-400 focus:outline-none transition-colors"
                  placeholder="admin@posthumanlab.org"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="admin-pass" className="block text-xs font-mono tracking-widest uppercase text-bone-200 font-bold">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-bone-200" />
                <input
                  id="admin-pass"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-carbon-950 border border-bone-200/20 rounded-lg text-xs text-bone-50 placeholder-bone-200/60 focus:border-earth-400 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-earth-500/10 border border-earth-500/30 text-earth-400 text-xs font-sans font-medium">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-bone-50 hover:bg-earth-600 text-carbon-950 hover:text-bone-50 transition-colors font-sans text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 shadow-md"
            >
              <span>{loading ? "Authenticating..." : "Authorize Access"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-bone-200/10 text-center">
            <Link href="/" className="text-xs font-mono uppercase tracking-widest text-bone-200 font-bold hover:text-earth-400 transition-colors">
              ← Return to Network Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
