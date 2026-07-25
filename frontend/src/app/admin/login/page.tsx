"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, X } from "lucide-react";
import { authApi } from "@/lib/api/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@posthumanlab.org");
  const [password, setPassword] = useState("AdminSecret123!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await authApi.login({ email, password });
      if (res?.token) {
        router.push("/admin");
      } else {
        setErrorMsg("Unable to sign in with those credentials.");
      }
    } catch {
      setErrorMsg(
        "Unable to sign in with those credentials. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#10120f] text-bone-50 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Restrained ambient background detail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] organic-radial-glow opacity-25 pointer-events-none rounded-full blur-3xl" />

      {/* Subtle Network Topography SVG Grid */}
      <div className="absolute inset-0 digital-grid opacity-20 pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10 my-8">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3.5 rounded-2xl bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 text-earth-400 shadow-xl backdrop-blur-md">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.1em] text-bone-50 block uppercase">
              POSTHUMAN
            </span>
            <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-earth-400 uppercase block">
              Lab Network
            </span>
          </div>

          <div className="pt-2 space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-bone-50 tracking-tight uppercase">
              Administration
            </h1>
            <p className="font-sans text-xs text-bone-200 font-medium max-w-xs mx-auto leading-relaxed">
              Private Network Console — Secure access for authorized administrators and editorial
              staff.
            </p>
          </div>
        </div>

        {/* Login Form Panel */}
        <div className="bg-carbon-900/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-carbon-950/10 dark:border-bone-50/15 shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {/* Email / Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-xs font-mono tracking-widest uppercase text-bone-200 font-bold"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-bone-200/60" />
                <input
                  id="admin-email"
                  name="username"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-xs text-bone-50 placeholder-bone-200/40 focus:border-earth-400 focus:outline-none transition-all shadow-inner"
                  placeholder="admin@posthumanlab.org"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-pass"
                  className="block text-xs font-mono tracking-widest uppercase text-bone-200 font-bold"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-sans text-earth-400 hover:text-earth-300 transition-colors focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-bone-200/60" />
                <input
                  id="admin-pass"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-xs text-bone-50 placeholder-bone-200/40 focus:border-earth-400 focus:outline-none transition-all shadow-inner"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-bone-200/60 hover:text-bone-50 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-carbon-950 border-bone-50/20 text-earth-500 focus:ring-earth-400 cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="text-xs text-bone-200 font-sans cursor-pointer select-none"
              >
                Remember me on this browser
              </label>
            </div>

            {/* Error Feedback */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-earth-600/15 border border-earth-600/30 text-earth-400 text-xs font-sans font-medium leading-relaxed">
                {errorMsg}
              </div>
            )}

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-earth-600 hover:bg-earth-500 text-bone-50 font-sans text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-lg focus:outline-none focus:ring-2 focus:ring-earth-400/50"
            >
              <span>{loading ? "SIGNING IN..." : "SIGN IN TO ADMIN"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="pt-4 border-t border-bone-50/10 text-center">
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wider text-bone-200 hover:text-earth-400 transition-colors inline-flex items-center space-x-1"
            >
              <span>← Return to Network Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-bone-50/15 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-bone-50/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-bone-50">
                Administrative Account Recovery
              </h3>
              <button
                onClick={() => setShowForgotModal(false)}
                className="p-1 text-bone-200 hover:text-bone-50 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="font-sans text-xs text-bone-200 leading-relaxed font-medium">
              Password recovery for administrative accounts requires super-administrator
              authorization. Please contact the network coordinator at{" "}
              <span className="text-earth-400 font-mono">admin@posthumanlab.org</span> to reset
              credentials.
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase tracking-wider font-bold rounded-lg cursor-pointer"
              >
                Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
