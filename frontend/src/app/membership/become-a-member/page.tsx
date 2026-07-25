"use client";

import { useState } from "react";
import Link from "next/link";
import { ContentPageLayout } from "@/components/layout/Templates";
import { useMember } from "@/context/MemberContext";
import { memberAuthApi } from "@/lib/api/memberAuth";
import { ShieldCheck, Clock, XCircle, LogOut, ArrowRight, UserCheck } from "lucide-react";

type AuthMode = "signup" | "signin";

interface AuthForm {
  fullName: string;
  email: string;
  password: string;
  otp: string;
}

export default function BecomeMemberPage() {
  const { member, signup, signin, verifyOtp, logoutMember, updateMemberStatus } = useMember();
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [otpRequested, setOtpRequested] = useState(false);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [authForm, setAuthForm] = useState<AuthForm>({
    fullName: "",
    email: "",
    password: "",
    otp: "",
  });

  // Application Form State
  const [formData, setFormData] = useState({
    affiliation: "",
    role: "Researcher",
    country: "",
    areasOfInterest: "",
    bio: "",
    motivation: "",
    website: "",
    agreeToTerms: false,
  });

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authForm.email.trim() || !authForm.password) {
      setFormError("Enter your email and password to continue.");
      return;
    }

    if (authMode === "signup" && !authForm.fullName.trim()) {
      setFormError("Enter your full name to create your member account.");
      return;
    }

    setLoading(true);
    setFormError(null);
    setDevOtp(null);

    try {
      const response =
        authMode === "signup"
          ? await signup({
              fullName: authForm.fullName.trim(),
              email: authForm.email.trim(),
              password: authForm.password,
            })
          : await signin({
              email: authForm.email.trim(),
              password: authForm.password,
            });

      setOtpRequested(true);
      setDevOtp(response.devOtp || null);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to continue. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authForm.otp.trim()) {
      setFormError("Enter the 6-digit OTP sent to your email.");
      return;
    }

    setLoading(true);
    setFormError(null);

    try {
      await verifyOtp({
        email: authForm.email.trim(),
        otp: authForm.otp.trim(),
      });
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    if (!formData.areasOfInterest.trim() || !formData.agreeToTerms) {
      setFormError("Please state your areas of interest and accept community terms.");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      await memberAuthApi.submitApplication({
        googleSubjectId: member.accountSubjectId,
        email: member.email,
        fullName: member.fullName,
        profileImageUrl: member.profileImageUrl,
        affiliation: formData.affiliation.trim(),
        role: formData.role,
        country: formData.country.trim(),
        areasOfInterest: formData.areasOfInterest.trim(),
        bio: formData.bio.trim(),
        motivation: formData.motivation.trim(),
        website: formData.website.trim(),
      });
      updateMemberStatus("PENDING");
    } catch {
      setFormError("Unable to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContentPageLayout
      tag="Become a Member"
      title="MEMBERSHIP APPLICATIONS"
      subtitle="Join an international network of researchers, artists, and independent scholars."
      parentLabel="Membership"
      parentHref="/membership"
    >
      <div className="max-w-3xl mx-auto space-y-8 font-sans">
        {/* STEP 1: Member account authentication */}
        {!member && (
          <div className="bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-earth-600/10 dark:bg-earth-500/20 border border-earth-500/30 flex items-center justify-center text-earth-600 dark:text-earth-400">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-carbon-950 dark:text-bone-50 uppercase">
                Member Account Required
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed max-w-lg mx-auto font-medium">
                Create an account or sign in with email and password. We verify your email with a
                one-time code before opening the membership application.
              </p>
            </div>

            {!otpRequested && (
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-bone-100 p-1 dark:bg-carbon-950">
                {(["signup", "signin"] as AuthMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setAuthMode(mode);
                      setFormError(null);
                    }}
                    className={`rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition ${
                      authMode === mode
                        ? "bg-earth-600 text-bone-50 shadow-md"
                        : "text-carbon-700 hover:text-carbon-950 dark:text-bone-200/70 dark:hover:text-bone-50"
                    }`}
                  >
                    {mode === "signup" ? "Sign Up" : "Sign In"}
                  </button>
                ))}
              </div>
            )}

            {formError && (
              <div className="p-3.5 rounded-xl bg-earth-600/15 border border-earth-600/30 text-earth-600 dark:text-earth-400 text-xs font-medium">
                {formError}
              </div>
            )}

            {!otpRequested ? (
              <form onSubmit={handleAuthSubmit} className="space-y-4 text-left" noValidate>
                {authMode === "signup" && (
                  <label className="space-y-1.5 block">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-carbon-700 dark:text-bone-200/70">
                      Full Name
                    </span>
                    <input
                      type="text"
                      value={authForm.fullName}
                      onChange={(event) =>
                        setAuthForm((current) => ({ ...current, fullName: event.target.value }))
                      }
                      className="w-full rounded-xl border border-carbon-950/10 bg-bone-100 p-3 text-xs text-carbon-950 focus:border-earth-400 focus:outline-none dark:border-bone-50/15 dark:bg-carbon-950 dark:text-bone-50"
                      placeholder="Your full name"
                    />
                  </label>
                )}

                <label className="space-y-1.5">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-carbon-700 dark:text-bone-200/70">
                    Email
                  </span>
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={(event) =>
                      setAuthForm((current) => ({ ...current, email: event.target.value }))
                    }
                    className="w-full rounded-xl border border-carbon-950/10 bg-bone-100 p-3 text-xs text-carbon-950 focus:border-earth-400 focus:outline-none dark:border-bone-50/15 dark:bg-carbon-950 dark:text-bone-50"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="space-y-1.5 block">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-carbon-700 dark:text-bone-200/70">
                    Password
                  </span>
                  <input
                    type="password"
                    value={authForm.password}
                    onChange={(event) =>
                      setAuthForm((current) => ({ ...current, password: event.target.value }))
                    }
                    className="w-full rounded-xl border border-carbon-950/10 bg-bone-100 p-3 text-xs text-carbon-950 focus:border-earth-400 focus:outline-none dark:border-bone-50/15 dark:bg-carbon-950 dark:text-bone-50"
                    placeholder="Minimum 8 characters"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#120e0c] dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 text-bone-50 transition-all duration-200 font-sans text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {loading ? "SENDING VERIFICATION CODE..." : "CONTINUE"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4 text-left" noValidate>
                <label className="space-y-1.5 block">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-carbon-700 dark:text-bone-200/70">
                    One-Time Code
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={authForm.otp}
                    onChange={(event) =>
                      setAuthForm((current) => ({ ...current, otp: event.target.value }))
                    }
                    className="w-full rounded-xl border border-carbon-950/10 bg-bone-100 p-3 text-center font-mono text-lg tracking-[0.35em] text-carbon-950 focus:border-earth-400 focus:outline-none dark:border-bone-50/15 dark:bg-carbon-950 dark:text-bone-50"
                    placeholder="000000"
                  />
                </label>

                {devOtp && (
                  <div className="rounded-xl border border-earth-500/25 bg-earth-500/10 p-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-earth-600 dark:text-earth-400">
                    Local OTP: {devOtp}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-earth-600 hover:bg-earth-500 text-bone-50 transition-all duration-200 font-sans text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {loading ? "VERIFYING CODE..." : "VERIFY AND CONTINUE"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOtpRequested(false);
                    setAuthForm((current) => ({ ...current, otp: "" }));
                    setDevOtp(null);
                    setFormError(null);
                  }}
                  className="w-full text-center text-xs font-mono font-bold uppercase tracking-widest text-carbon-600 hover:text-earth-600 dark:text-bone-200/60 dark:hover:text-earth-400"
                >
                  Use a different email
                </button>
              </form>
            )}

            <p className="text-[11px] font-mono text-carbon-600 dark:text-bone-200/50 pt-2">
              Passwords are encrypted and email access is verified before application submission.
            </p>
          </div>
        )}

        {/* STEP 2: Authenticated member account — NOT APPLIED YET */}
        {member && member.status === "NOT_APPLIED" && (
          <div className="bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-carbon-950/10 dark:border-bone-50/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-earth-600 text-bone-50 font-bold flex items-center justify-center text-sm font-mono">
                  {member.fullName.charAt(0)}
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-carbon-950 dark:text-bone-50 block leading-tight">
                    {member.fullName}
                  </span>
                  <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-medium block">
                    {member.email} • OTP Verified
                  </span>
                </div>
              </div>

              <button
                onClick={logoutMember}
                className="text-xs font-mono text-carbon-600 dark:text-bone-200/60 hover:text-earth-600 dark:hover:text-earth-400 flex items-center space-x-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-carbon-950 dark:text-bone-50 uppercase">
                Membership Application Form
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                Please complete your application details below. Your submission will be reviewed by
                the Posthuman Lab Network administration.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono tracking-widest uppercase text-carbon-950 dark:text-bone-200 font-bold">
                    Affiliation / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.affiliation}
                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    className="w-full p-3 bg-bone-100 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 rounded-xl text-xs text-carbon-950 dark:text-bone-50 focus:border-earth-400 focus:outline-none"
                    placeholder="e.g. Center for Critical Posthumanism"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono tracking-widest uppercase text-carbon-950 dark:text-bone-200 font-bold">
                    Primary Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-3 bg-bone-100 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 rounded-xl text-xs text-carbon-950 dark:text-bone-50 focus:border-earth-400 focus:outline-none"
                  >
                    <option value="Researcher">Researcher</option>
                    <option value="Student">Student</option>
                    <option value="Educator">Educator</option>
                    <option value="Artist / Creative Practitioner">
                      Artist / Creative Practitioner
                    </option>
                    <option value="Independent Scholar">Independent Scholar</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono tracking-widest uppercase text-carbon-950 dark:text-bone-200 font-bold">
                  Location / Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full p-3 bg-bone-100 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 rounded-xl text-xs text-carbon-950 dark:text-bone-50 focus:border-earth-400 focus:outline-none"
                  placeholder="e.g. Germany / International"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono tracking-widest uppercase text-carbon-950 dark:text-bone-200 font-bold">
                  Areas of Interest *
                </label>
                <input
                  type="text"
                  required
                  value={formData.areasOfInterest}
                  onChange={(e) => setFormData({ ...formData, areasOfInterest: e.target.value })}
                  className="w-full p-3 bg-bone-100 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 rounded-xl text-xs text-carbon-950 dark:text-bone-50 focus:border-earth-400 focus:outline-none"
                  placeholder="e.g. Technology Ethics, Bio-Art, Ecological Telemetry"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono tracking-widest uppercase text-carbon-950 dark:text-bone-200 font-bold">
                  Short Bio & Research Background
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-3 bg-bone-100 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 rounded-xl text-xs text-carbon-950 dark:text-bone-50 focus:border-earth-400 focus:outline-none resize-none"
                  placeholder="Describe your current academic or creative focus..."
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="w-4 h-4 rounded text-earth-600 focus:ring-earth-400 cursor-pointer"
                />
                <label
                  htmlFor="agree-terms"
                  className="text-xs text-carbon-800 dark:text-bone-200 font-sans cursor-pointer font-medium"
                >
                  I agree to the Posthuman Lab Network community guidelines & open-access charter.
                </label>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-earth-600/15 border border-earth-600/30 text-earth-600 dark:text-earth-400 text-xs font-medium">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-earth-600 hover:bg-earth-500 text-bone-50 font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>
                  {submitting ? "SUBMITTING APPLICATION..." : "SUBMIT APPLICATION FOR REVIEW"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: APPLICATION PENDING REVIEW */}
        {member && member.status === "PENDING" && (
          <div className="bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-earth-600/10 dark:bg-earth-500/20 border border-earth-500/30 flex items-center justify-center text-earth-600 dark:text-earth-400">
              <Clock className="w-7 h-7 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-widest block">
                STATUS: PENDING REVIEW
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-carbon-950 dark:text-bone-50 uppercase">
                Application Received
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed max-w-lg mx-auto font-medium">
                Thank you for applying to the Posthuman Lab Network,{" "}
                <span className="font-bold text-carbon-950 dark:text-bone-50">
                  {member.fullName}
                </span>
                . Your application is currently under review by our administrative coordinators.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-bone-100 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 max-w-md mx-auto space-y-1 text-left">
              <span className="font-mono text-[10px] text-earth-600 dark:text-earth-400 font-bold uppercase tracking-wider block">
                Application ID
              </span>
              <span className="font-mono text-xs text-carbon-950 dark:text-bone-50 font-bold block">
                {member.email}
              </span>
            </div>

            <div className="pt-2 flex justify-center space-x-4">
              <button
                onClick={logoutMember}
                className="px-6 py-2.5 bg-bone-100 dark:bg-carbon-950 hover:bg-bone-200 text-carbon-950 dark:text-bone-200 text-xs font-mono uppercase tracking-wider font-bold rounded-xl cursor-pointer border border-carbon-950/10 dark:border-bone-50/15"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: APPROVED MEMBER EXPERIENCE */}
        {member && member.status === "APPROVED" && (
          <div className="bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-moss-500/20 border border-moss-500/30 flex items-center justify-center text-moss-400">
              <UserCheck className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-moss-400 font-bold uppercase tracking-widest block">
                STATUS: APPROVED NETWORK MEMBER
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-carbon-950 dark:text-bone-50 uppercase">
                Welcome Back, {member.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed max-w-lg mx-auto font-medium">
                Your membership is active. You have full access to study materials, collaborative
                research calls, and live seminar discussions.
              </p>
            </div>

            <div className="flex justify-center space-x-4 pt-2">
              <Link
                href="/learning"
                className="px-6 py-3 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase tracking-wider font-bold rounded-xl cursor-pointer shadow-md"
              >
                Access Learning Hub
              </Link>
              <button
                onClick={logoutMember}
                className="px-6 py-3 bg-bone-100 dark:bg-carbon-950 hover:bg-bone-200 text-carbon-950 dark:text-bone-200 text-xs font-mono uppercase tracking-wider font-bold rounded-xl cursor-pointer border border-carbon-950/10 dark:border-bone-50/15"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REJECTED EXPERIENCE */}
        {member && member.status === "REJECTED" && (
          <div className="bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-earth-600/10 border border-earth-600/30 flex items-center justify-center text-earth-600">
              <XCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-carbon-950 dark:text-bone-50 uppercase">
                Application Status Update
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed max-w-lg mx-auto font-medium">
                Thank you for your interest in the Posthuman Lab Network. At this time, our
                committee is unable to approve new applications for this cohort.
              </p>
            </div>

            <button
              onClick={logoutMember}
              className="px-6 py-2.5 bg-bone-100 dark:bg-carbon-950 text-carbon-950 dark:text-bone-200 text-xs font-mono uppercase font-bold rounded-xl cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </ContentPageLayout>
  );
}
