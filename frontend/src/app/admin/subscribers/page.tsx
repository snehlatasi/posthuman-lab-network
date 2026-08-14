"use client";

import { useEffect, useState } from "react";
import type { NewsletterSubscriberDto } from "@/lib/api/newsletter";
import { newsletterApi } from "@/lib/api/newsletter";

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriberDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadSubscribers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await newsletterApi.getSubscribers();
        if (active) {
          setSubscribers(response);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load subscribers.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadSubscribers();
    return () => {
      active = false;
    };
  }, []);

  const activeCount = subscribers.filter((subscriber) => subscriber.status === "ACTIVE").length;

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-earth-400">
            Community
          </p>
          <h1 className="font-serif text-3xl font-bold uppercase text-bone-50">
            Newsletter Subscribers
          </h1>
        </div>
        <div className="rounded-xl border border-bone-50/15 bg-carbon-900 px-4 py-3 text-xs font-bold uppercase tracking-widest text-bone-200">
          {activeCount} Active / {subscribers.length} Total
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-earth-500/30 bg-earth-500/15 p-4 text-xs font-bold text-earth-300">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-bone-50/15 bg-carbon-900/90 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-xs">
            <thead className="border-b border-bone-50/15 bg-carbon-950 font-mono text-[10px] uppercase tracking-widest text-bone-200/60">
              <tr>
                <th className="p-4">Subscriber</th>
                <th className="p-4">Email</th>
                <th className="p-4">Interests</th>
                <th className="p-4">Status</th>
                <th className="p-4">Subscribed</th>
                <th className="p-4">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 font-medium text-bone-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="transition-colors hover:bg-carbon-950/40">
                  <td className="p-4 font-semibold text-bone-50">{subscriber.name}</td>
                  <td className="p-4 font-mono text-[10px] text-bone-200/70">
                    {subscriber.email}
                  </td>
                  <td className="p-4">{subscriber.interests || "all-updates"}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase ${
                        subscriber.status === "ACTIVE"
                          ? "bg-moss-500/20 text-moss-300"
                          : "bg-bone-50/10 text-bone-200/60"
                      }`}
                    >
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="p-4 text-bone-200/70">{formatDate(subscriber.subscribedAt)}</td>
                  <td className="p-4 font-mono text-[10px] uppercase text-bone-200/60">
                    {subscriber.source}
                  </td>
                </tr>
              ))}

              {subscribers.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center font-mono text-xs uppercase text-bone-200/40"
                  >
                    No subscribers recorded.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center font-mono text-xs uppercase text-bone-200/40"
                  >
                    Loading subscribers...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
