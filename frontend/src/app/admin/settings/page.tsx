"use client";

import { Database, Server } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase tracking-tight">
          System & Console Configuration
        </h2>
        <p className="font-sans text-xs text-bone-200 font-medium">
          Operational system telemetry, database persistence settings, and security status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-carbon-900/90 border border-bone-50/15 space-y-4 shadow-md">
          <div className="flex items-center space-x-3 text-earth-400">
            <Server className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold text-bone-50 uppercase">
              Backend Server Telemetry
            </h3>
          </div>
          <div className="space-y-2 text-xs font-mono text-bone-200">
            <div className="flex justify-between py-1 border-b border-bone-50/10">
              <span>Framework:</span>
              <span className="text-bone-50 font-bold">Spring Boot 3.4.2</span>
            </div>
            <div className="flex justify-between py-1 border-b border-bone-50/10">
              <span>Java Runtime:</span>
              <span className="text-bone-50 font-bold">Java 17 LTS / Java 8 Contract</span>
            </div>
            <div className="flex justify-between py-1 border-b border-bone-50/10">
              <span>API Security:</span>
              <span className="text-moss-400 font-bold">Stateless JWT + Spring Security</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-carbon-900/90 border border-bone-50/15 space-y-4 shadow-md">
          <div className="flex items-center space-x-3 text-earth-400">
            <Database className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold text-bone-50 uppercase">
              Database Persistence
            </h3>
          </div>
          <div className="space-y-2 text-xs font-mono text-bone-200">
            <div className="flex justify-between py-1 border-b border-bone-50/10">
              <span>Database Engine:</span>
              <span className="text-bone-50 font-bold">H2 Embedded / File DB</span>
            </div>
            <div className="flex justify-between py-1 border-b border-bone-50/10">
              <span>ORM & Persistence:</span>
              <span className="text-bone-50 font-bold">Spring Data JPA / Hibernate</span>
            </div>
            <div className="flex justify-between py-1 border-b border-bone-50/10">
              <span>Member Auth Mode:</span>
              <span className="text-earth-400 font-bold">Google OAuth 2.0 Only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
