"use client";

import React, { useState } from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { contactApi } from "@/lib/api/contact";
import { membershipApi } from "@/lib/api/membership";

interface DynamicFormProps {
  formType: "contact" | "collaboration" | "submission" | "membership";
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ formType }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name?.trim()) nextErrors.name = "Name is required";
    if (!formData.email?.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Please specify a valid email address";
    }

    if (formType === "submission" && !formData.title?.trim()) {
      nextErrors.title = "Submission title is required";
    }

    if (formType === "collaboration" && !formData.organization?.trim()) {
      nextErrors.organization = "Organization/Collective name is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (formType === "submission") {
      setStatusMsg(
        "This form is currently a frontend prototype. Submission functionality will be enabled in a later backend phase when publication storage is integrated."
      );
      setIsSuccess(true);
      return;
    }

    setLoading(true);
    setStatusMsg(null);
    setIsSuccess(false);

    try {
      if (formType === "membership") {
        await membershipApi.submitMembershipInterest({
          name: formData.name,
          email: formData.email,
          areaOfInterest: formData.membershipType || "learner",
          message: formData.message || ""
        });
        setStatusMsg("Your expression of interest has been recorded. The cell coordinators will contact you shortly.");
      } else {
        // "contact" or "collaboration"
        await contactApi.submitContactMessage({
          name: formData.name,
          email: formData.email,
          subject: formType === "collaboration" 
            ? `Collaboration - ${formData.organization || "Independent"}` 
            : formData.subject || "General Inquiry",
          message: formData.message || ""
        });
        setStatusMsg("Your message has been sent successfully. Thank you for engaging with the network.");
      }
      setIsSuccess(true);
      setFormData({});
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "An unexpected network error occurred. Please verify your connection.";
      setStatusMsg(errMsg);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 rounded-xl max-w-xl mx-auto space-y-6 relative overflow-hidden">
      {/* Decorative organic radial glow */}
      <div className="absolute top-[-30%] right-[-30%] w-[60%] h-[60%] organic-radial-glow opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 space-y-2">
        <h3 className="font-serif text-xl font-bold text-bone-50 uppercase tracking-wide">
          {formType === "contact" && "General Inquiry"}
          {formType === "collaboration" && "Collaboration Proposal"}
          {formType === "membership" && "Membership Inquiry"}
          {formType === "submission" && "Journal Submission"}
        </h3>
        <p className="font-sans text-xs text-bone-200/50 leading-relaxed">
          Provide your details below to engage with our distributed coordinators.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-5" noValidate>
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-[10px] font-mono tracking-widest uppercase font-semibold text-bone-200/60">
            Full Name <span className="text-moss-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-4 py-3 bg-carbon-950 border text-sm text-bone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-moss-500/30 transition-colors ${
              errors.name ? "border-earth-600/50" : "border-bone-200/10 focus:border-moss-500/30"
            }`}
            placeholder="Elena Rostova"
          />
          {errors.name && (
            <span id="name-error" className="block text-[10px] font-mono text-earth-400">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-[10px] font-mono tracking-widest uppercase font-semibold text-bone-200/60">
            Email Address <span className="text-moss-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-4 py-3 bg-carbon-950 border text-sm text-bone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-moss-500/30 transition-colors ${
              errors.email ? "border-earth-600/50" : "border-bone-200/10 focus:border-moss-500/30"
            }`}
            placeholder="elena@posthuman.net"
          />
          {errors.email && (
            <span id="email-error" className="block text-[10px] font-mono text-earth-400">
              {errors.email}
            </span>
          )}
        </div>

        {/* Dynamic Fields by Form Type */}
        {formType === "collaboration" && (
          <div className="space-y-1.5">
            <label htmlFor="organization" className="block text-[10px] font-mono tracking-widest uppercase font-semibold text-bone-200/60">
              Organization / Collective <span className="text-moss-500">*</span>
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization || ""}
              onChange={handleInputChange}
              aria-required="true"
              aria-invalid={!!errors.organization}
              aria-describedby={errors.organization ? "org-error" : undefined}
              className={`w-full px-4 py-3 bg-carbon-950 border text-sm text-bone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-moss-500/30 transition-colors ${
                errors.organization ? "border-earth-600/50" : "border-bone-200/10 focus:border-moss-500/30"
              }`}
              placeholder="Symbiotic Labs Collective"
            />
            {errors.organization && (
              <span id="org-error" className="block text-[10px] font-mono text-earth-400">
                {errors.organization}
              </span>
            )}
          </div>
        )}

        {formType === "submission" && (
          <>
            <div className="space-y-1.5">
              <label htmlFor="title" className="block text-[10px] font-mono tracking-widest uppercase font-semibold text-bone-200/60">
                Paper / Artwork Title <span className="text-moss-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                aria-required="true"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
                className={`w-full px-4 py-3 bg-carbon-950 border text-sm text-bone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-moss-500/30 transition-colors ${
                  errors.title ? "border-earth-600/50" : "border-bone-200/10 focus:border-moss-500/30"
                }`}
                placeholder="Agential Topologies"
              />
              {errors.title && (
                <span id="title-error" className="block text-[10px] font-mono text-earth-400">
                  {errors.title}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="category" className="block text-[10px] font-mono tracking-widest uppercase font-semibold text-bone-200/60">
                Submission Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category || "articles"}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-carbon-950 border border-bone-200/10 text-sm text-bone-200/70 rounded-lg focus:outline-none focus:ring-1 focus:ring-moss-500/30 focus:border-moss-500/30 transition-colors"
              >
                <option value="articles">Academic Article</option>
                <option value="essays">Speculative Essay</option>
                <option value="research">Research telemetry Logs</option>
                <option value="creative-work">Creative / Sound Art</option>
              </select>
            </div>
          </>
        )}

        {formType === "membership" && (
          <div className="space-y-1.5">
            <label htmlFor="membershipType" className="block text-[10px] font-mono tracking-widest uppercase font-semibold text-bone-200/60">
              Affiliation Type
            </label>
            <select
              id="membershipType"
              name="membershipType"
              value={formData.membershipType || "learner"}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-carbon-950 border border-bone-200/10 text-sm text-bone-200/70 rounded-lg focus:outline-none focus:ring-1 focus:ring-moss-500/30 focus:border-moss-500/30 transition-colors"
            >
              <option value="learner">Learner Member</option>
              <option value="researcher">Researcher Member</option>
              <option value="creative">Creative Collaborator</option>
            </select>
          </div>
        )}

        {/* Message / Scope Text Area */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-[10px] font-mono tracking-widest uppercase font-semibold text-bone-200/60">
            Description / Context
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-carbon-950 border border-bone-200/10 text-sm text-bone-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-moss-500/30 focus:border-moss-500/30 transition-colors resize-none"
            placeholder="Outline your research parameters or proposal goals here..."
          />
        </div>

        {/* Disclaimer / Info banner */}
        <div className="p-4 rounded-lg bg-carbon-950 border border-bone-200/5 flex items-start space-x-3">
          <HelpCircle className="w-4 h-4 text-moss-500 shrink-0 mt-0.5" />
          <p className="text-[10px] font-sans text-bone-200/40 leading-relaxed">
            All submitted communications are processed horizontally by regional cell coordinators. No data is shared with external advertising entities.
          </p>
        </div>

        {/* Form CTA Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full group inline-flex items-center justify-center py-3.5 text-xs font-sans tracking-widest uppercase font-bold text-carbon-950 bg-bone-100 hover:bg-moss-500 hover:text-bone-50 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{loading ? "Processing..." : "Submit Request"}</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Submission notification status */}
        {statusMsg && (
          <div className={`p-4 rounded-lg border text-xs font-sans leading-relaxed transition-all ${
            isSuccess 
              ? "bg-moss-500/10 border-moss-500/20 text-moss-400" 
              : "bg-earth-500/10 border-earth-500/20 text-earth-400"
          }`}>
            {statusMsg}
          </div>
        )}
      </form>
    </div>
  );
};
