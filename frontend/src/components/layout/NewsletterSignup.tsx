"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { newsletterApi } from "@/lib/api/newsletter";

const emailPattern = /\S+@\S+\.\S+/;

export function NewsletterSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextName = name.trim();
    const nextEmail = email.trim();

    if (!nextName || !nextEmail) {
      setStatus("error");
      setMessage("Name and email are required.");
      return;
    }

    if (!emailPattern.test(nextEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    if (!acceptedTerms) {
      setStatus("error");
      setMessage("Please accept the terms and conditions.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await newsletterApi.subscribe({
        name: nextName,
        email: nextEmail,
        interests: "blogs-newsletters-media-events",
        termsAccepted: acceptedTerms,
        source: "footer",
      });
      setName("");
      setEmail("");
      setAcceptedTerms(false);
      setStatus("success");
      setMessage(response.message);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to subscribe right now.");
    }
  };

  return (
    <div className="space-y-3">
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-3"
        noValidate
      >
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Name"
            placeholder="Name"
            suppressHydrationWarning
            className="min-h-11 min-w-0 rounded-full border border-carbon-950/10 bg-white/80 px-4 text-sm font-medium text-carbon-950 outline-none transition focus:border-earth-500 dark:border-bone-50/15 dark:bg-carbon-900/80 dark:text-bone-50"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Email address"
            placeholder="Email address"
            suppressHydrationWarning
            className="min-h-11 min-w-0 rounded-full border border-carbon-950/10 bg-white/80 px-4 text-sm font-medium text-carbon-950 outline-none transition focus:border-earth-500 dark:border-bone-50/15 dark:bg-carbon-900/80 dark:text-bone-50"
          />
        </div>

        <label className="flex items-start gap-3 text-left font-sans text-xs font-semibold leading-relaxed text-carbon-800 dark:text-bone-200">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            suppressHydrationWarning
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-carbon-950/20 accent-earth-600 dark:border-bone-50/20"
          />
          <span>
            I agree to the{" "}
            <a
              href="https://automattic.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-earth-700 underline decoration-earth-500/40 underline-offset-4 transition hover:text-earth-600 dark:text-earth-400 dark:hover:text-earth-300"
            >
              terms and conditions
            </a>{" "}
            and want to receive network updates.
          </span>
        </label>

        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            suppressHydrationWarning
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-carbon-950 px-6 text-xs font-bold uppercase tracking-widest text-bone-50 transition hover:bg-earth-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-earth-600 dark:hover:bg-earth-500"
          >
            <span>{status === "loading" ? "Subscribing" : "Subscribe"}</span>
            <SendHorizonal className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`text-xs font-bold ${
            status === "success"
              ? "text-earth-700 dark:text-earth-400"
              : "text-red-700 dark:text-red-300"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </div>
  );
}
