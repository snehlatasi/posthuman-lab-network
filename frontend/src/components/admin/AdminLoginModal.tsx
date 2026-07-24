"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Mail, Lock, X, ArrowRight } from "lucide-react";

export const AdminLoginModal: React.FC = () => {
  const { showLoginModal, closeLoginModal, login } = useAuth();
  const [email, setEmail] = useState("admin@posthumanlab.org");
  const [password, setPassword] = useState("AdminSecret123!");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!showLoginModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      await login({ email, password });
      closeLoginModal();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-carbon-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-8 rounded-2xl border border-bone-200/10 max-w-md w-full relative space-y-6">
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-bone-200/40 hover:text-bone-100 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 text-center">
          <div className="inline-flex p-3 rounded-xl bg-carbon-900 border border-moss-500/20 text-moss-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-bone-50">
            Coordinator Login
          </h2>
          <p className="font-sans text-xs text-bone-200/50">
            Enter admin credentials to unlock content editing across the network.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="modal-admin-email" className="block text-[10px] font-mono tracking-widest uppercase text-bone-200/60">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone-200/40" />
              <input
                id="modal-admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-carbon-900 border border-bone-200/10 rounded-lg text-xs text-bone-100 focus:border-moss-500/40 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="modal-admin-pass" className="block text-[10px] font-mono tracking-widest uppercase text-bone-200/60">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone-200/40" />
              <input
                id="modal-admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-carbon-900 border border-bone-200/10 rounded-lg text-xs text-bone-100 focus:border-moss-500/40 focus:outline-none"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-earth-500/10 border border-earth-500/30 text-earth-400 text-xs font-sans">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-bone-100 hover:bg-moss-500 text-carbon-950 hover:text-bone-50 transition-colors font-sans text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
