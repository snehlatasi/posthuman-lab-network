"use client";

import React, { useState } from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { contactApi } from "@/lib/api/contact";
import { membershipApi } from "@/lib/api/membership";
import { publicationsApi } from "@/lib/api/publications";

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

    setLoading(true);
    setStatusMsg(null);
    setIsSuccess(false);

    try {
      if (formType === "submission") {
        const rawTitle = formData.title || "Untitled Paper";
        const generatedSlug = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        
        let typeVal: "ARTICLE" | "ESSAY" | "RESEARCH" | "CREATIVE_WORK" = "ARTICLE";
        if (formData.category === "essays") typeVal = "ESSAY";
        if (formData.category === "research") typeVal = "RESEARCH";
        if (formData.category === "creative-work") typeVal = "CREATIVE_WORK";

        await publicationsApi.submitPublication({
          title: rawTitle,
          slug: generatedSlug,
          summary: formData.message || "Public draft submission.",
          content: formData.message || "Submitted for peer review.",
          authorDisplayName: formData.name,
          publicationType: typeVal,
          status: "DRAFT"
        });
        setStatusMsg("Your publication draft has been submitted to the editorial review pipeline.");
      } else if (formType === "membership") {
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
    <div className="bg-carbon-900 p-8 rounded-2xl border border-bone-200/20 shadow-2xl max-w-xl mx-auto space-y-6 relative overflow-hidden">
      {/* Decorative organic radial glow */}
      <div className="absolute top-[-30%] right-[-30%] w-[60%] h-[60%] organic-radial-glow opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 space-y-2">
        <h3 className="font-serif text-2xl font-bold text-bone-50 uppercase tracking-wide">
          {formType === "contact" && "General Inquiry"}
          {formType === "collaboration" && "Collaboration Proposal"}
          {formType === "membership" && "Membership Inquiry"}
          {formType === "submission" && "Journal Submission"}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-bone-100 leading-relaxed font-normal">
          Provide your details below to engage with our distributed coordinators.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-5" noValidate>
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-mono tracking-widest uppercase font-bold text-bone-200">
            Full Name <span className="text-earth-400">*</span>
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
            className={`w-full px-4 py-3 bg-carbon-950 border text-sm text-bone-50 placeholder-bone-200/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-400 transition-colors ${
              errors.name ? "border-earth-400" : "border-bone-200/20 focus:border-earth-400"
            }`}
            placeholder="Elena Rostova"
          />
          {errors.name && (
            <span id="name-error" className="block text-xs font-mono text-earth-400 font-bold">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-mono tracking-widest uppercase font-bold text-bone-200">
            Email Address <span className="text-earth-400">*</span>
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
            className={`w-full px-4 py-3 bg-carbon-950 border text-sm text-bone-50 placeholder-bone-200/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-400 transition-colors ${
              errors.email ? "border-earth-400" : "border-bone-200/20 focus:border-earth-400"
            }`}
            placeholder="elena@posthuman.net"
          />
          {errors.email && (
            <span id="email-error" className="block text-xs font-mono text-earth-400 font-bold">
              {errors.email}
            </span>
          )}
        </div>

        {/* Dynamic Fields by Form Type */}
        {formType === "collaboration" && (
          <div className="space-y-1.5">
            <label htmlFor="organization" className="block text-xs font-mono tracking-widest uppercase font-bold text-bone-200">
              Organization / Collective <span className="text-earth-400">*</span>
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
              className={`w-full px-4 py-3 bg-carbon-950 border text-sm text-bone-50 placeholder-bone-200/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-400 transition-colors ${
                errors.organization ? "border-earth-400" : "border-bone-200/20 focus:border-earth-400"
              }`}
              placeholder="Symbiotic Labs Collective"
            />
            {errors.organization && (
              <span id="org-error" className="block text-xs font-mono text-earth-400 font-bold">
                {errors.organization}
              </span>
            )}
          </div>
        )}

        {formType === "submission" && (
          <>
            <div className="space-y-1.5">
              <label htmlFor="title" className="block text-xs font-mono tracking-widest uppercase font-bold text-bone-200">
                Paper / Artwork Title <span className="text-earth-400">*</span>
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
                className={`w-full px-4 py-3 bg-carbon-950 border text-sm text-bone-50 placeholder-bone-200/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-400 transition-colors ${
                  errors.title ? "border-earth-400" : "border-bone-200/20 focus:border-earth-400"
                }`}
                placeholder="Agential Topologies"
              />
              {errors.title && (
                <span id="title-error" className="block text-xs font-mono text-earth-400 font-bold">
                  {errors.title}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="category" className="block text-xs font-mono tracking-widest uppercase font-bold text-bone-200">
                Submission Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category || "articles"}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-carbon-950 border border-bone-200/20 text-sm text-bone-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-400 focus:border-earth-400 transition-colors"
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
            <label htmlFor="membershipType" className="block text-xs font-mono tracking-widest uppercase font-bold text-bone-200">
              Affiliation Type
            </label>
            <select
              id="membershipType"
              name="membershipType"
              value={formData.membershipType || "learner"}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-carbon-950 border border-bone-200/20 text-sm text-bone-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-400 focus:border-earth-400 transition-colors"
            >
              <option value="learner">Learner Member</option>
              <option value="researcher">Researcher Member</option>
              <option value="creative">Creative Collaborator</option>
            </select>
          </div>
        )}

        {/* Message / Scope Text Area */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-xs font-mono tracking-widest uppercase font-bold text-bone-200">
            Description / Context
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-carbon-950 border border-bone-200/20 text-sm text-bone-50 placeholder-bone-200/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-earth-400 focus:border-earth-400 transition-colors resize-none"
            placeholder="Outline your research parameters or proposal goals here..."
          />
        </div>

        {/* Disclaimer / Info banner */}
        <div className="p-4 rounded-lg bg-carbon-950 border border-bone-200/15 flex items-start space-x-3">
          <HelpCircle className="w-4 h-4 text-moss-300 shrink-0 mt-0.5" />
          <p className="text-xs font-sans text-bone-200 leading-relaxed font-normal">
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
