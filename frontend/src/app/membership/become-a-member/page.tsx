"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ContentPageLayout } from "@/components/layout/Templates";
import { useMember } from "@/context/MemberContext";
import { memberAuthApi } from "@/lib/api/memberAuth";
import { ShieldCheck, Clock, XCircle, LogOut, ArrowRight, UserCheck } from "lucide-react";

export default function BecomeMemberPage() {
  const { member, loginWithGoogle, logoutMember, updateMemberStatus } = useMember();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Application Form State
  const [formData, setFormData] = useState({
    affiliation: "",
    role: "Researcher",
    country: "",
    areasOfInterest: "",
    bio: "",
    motivation: "",
    website: "",
    agreeToTerms: false
  });

  const handleSimulatedGoogleSignIn = async () => {
    setLoading(true);
    setFormError(null);
    try {
      // Simulate/trigger verified Google Identity sign-in
      const mockGoogleIdentity = {
        googleSubjectId: "google-sub-" + Math.floor(100000 + Math.random() * 900000),
        email: "scholar@university.edu",
        fullName: "Dr. Alex Rivera",
        profileImageUrl: ""
      };
      await loginWithGoogle(mockGoogleIdentity);
    } catch {
      setFormError("Google authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    if (!formData.areasOfInterest || !formData.agreeToTerms) {
      setFormError("Please state your areas of interest and accept community terms.");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      await memberAuthApi.submitApplication({
        googleSubjectId: member.googleSubjectId,
        email: member.email,
        fullName: member.fullName,
        profileImageUrl: member.profileImageUrl,
        affiliation: formData.affiliation,
        role: formData.role,
        country: formData.country,
        areasOfInterest: formData.areasOfInterest,
        bio: formData.bio,
        motivation: formData.motivation,
        website: formData.website
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
        {/* STEP 1: Not Authenticated with Google */}
        {!member && (
          <div className="bg-white dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-earth-600/10 dark:bg-earth-500/20 border border-earth-500/30 flex items-center justify-center text-earth-600 dark:text-earth-400">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-carbon-950 dark:text-bone-50 uppercase tracking-tight">
                Authentication Required
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed max-w-lg mx-auto font-medium">
                To begin your Posthuman Lab Network application, please sign in with Google. Member authentication is managed exclusively through verified Google Identity.
              </p>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-earth-600/15 border border-earth-600/30 text-earth-600 dark:text-earth-400 text-xs font-medium">
                {formError}
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={handleSimulatedGoogleSignIn}
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#120e0c] dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 text-bone-50 transition-all duration-200 font-sans text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg cursor-pointer disabled:opacity-50 space-x-3"
              >
                {/* Google Icon SVG */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887c-.58 3.407-3.418 5.86-6.887 5.86-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5c1.82 0 3.48.65 4.77 1.73l2.36-2.36C17.47 1.95 15.02 1 12.24 1 6.14 1 1.2 5.94 1.2 12s4.94 11 11.04 11c6.33 0 10.53-4.45 10.53-10.72 0-.72-.08-1.42-.2-2.005H12.24z" />
                </svg>
                <span>{loading ? "VERIFYING GOOGLE IDENTITY..." : "CONTINUE WITH GOOGLE"}</span>
              </button>
            </div>

            <p className="text-[11px] font-mono text-carbon-600 dark:text-bone-200/50 pt-2">
              Google OAuth 2.0 • Your email is used solely for identity verification and membership telemetry.
            </p>
          </div>
        )}

        {/* STEP 2: Authenticated with Google — NOT APPLIED YET */}
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
                    {member.email} • Verified Google Identity
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
              <h2 className="font-serif text-2xl font-bold text-carbon-950 dark:text-bone-50 uppercase tracking-tight">
                Membership Application Form
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                Please complete your application details below. Your submission will be reviewed by the Posthuman Lab Network administration.
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
                    <option value="Artist / Creative Practitioner">Artist / Creative Practitioner</option>
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
                <label htmlFor="agree-terms" className="text-xs text-carbon-800 dark:text-bone-200 font-sans cursor-pointer font-medium">
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
                <span>{submitting ? "SUBMITTING APPLICATION..." : "SUBMIT APPLICATION FOR REVIEW"}</span>
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
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-carbon-950 dark:text-bone-50 uppercase tracking-tight">
                Application Received
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed max-w-lg mx-auto font-medium">
                Thank you for applying to the Posthuman Lab Network, <span className="font-bold text-carbon-950 dark:text-bone-50">{member.fullName}</span>. Your application is currently under review by our administrative coordinators.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-bone-100 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 max-w-md mx-auto space-y-1 text-left">
              <span className="font-mono text-[10px] text-earth-600 dark:text-earth-400 font-bold uppercase tracking-wider block">Application ID</span>
              <span className="font-mono text-xs text-carbon-950 dark:text-bone-50 font-bold block">{member.email}</span>
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
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-carbon-950 dark:text-bone-50 uppercase tracking-tight">
                Welcome Back, {member.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed max-w-lg mx-auto font-medium">
                Your membership is active. You have full access to study materials, collaborative research calls, and live seminar discussions.
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
              <h2 className="font-serif text-2xl font-bold text-carbon-950 dark:text-bone-50 uppercase tracking-tight">
                Application Status Update
              </h2>
              <p className="text-xs sm:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed max-w-lg mx-auto font-medium">
                Thank you for your interest in the Posthuman Lab Network. At this time, our committee is unable to approve new applications for this cohort.
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
