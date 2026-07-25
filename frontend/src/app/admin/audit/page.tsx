"use client";

import React, { useState, useEffect } from "react";
import { cmsApi, AuditLogDto } from "@/lib/api/cms";

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLogDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    cmsApi.getAuditLogs()
      .then((res) => {
        if (isMounted) setLogs(res);
      })
      .catch(() => null)
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase tracking-tight">
          Administrative Audit Trail
        </h2>
        <p className="font-sans text-xs text-bone-200 font-medium">Recorded administrative actions, entity mutations, and editorial operations.</p>
      </div>

      <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Administrator</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-carbon-950/40 transition-colors">
                  <td className="p-4 font-mono text-[10px] text-bone-200/50">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-4 font-semibold text-bone-50">{log.adminEmail}</td>
                  <td className="p-4 uppercase text-[10px] font-mono text-earth-400 font-bold">{log.action}</td>
                  <td className="p-4 uppercase text-[10px] font-mono text-moss-400">{log.entityType} #{log.entityId}</td>
                  <td className="p-4 max-w-xs truncate text-bone-200/70">{log.details || "—"}</td>
                </tr>
              ))}
              {logs.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest">
                    No administrative audit records logged.
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
