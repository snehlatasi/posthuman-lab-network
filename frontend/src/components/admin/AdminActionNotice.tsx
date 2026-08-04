import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface AdminActionNoticeProps {
  message: string;
  href?: string;
  label?: string;
}

export function AdminActionNotice({ message, href, label = "View live" }: AdminActionNoticeProps) {
  return (
    <div className="p-4 rounded-xl bg-moss-500/20 border border-moss-500/30 text-moss-400 text-xs font-mono uppercase font-bold flex flex-wrap items-center justify-between gap-3">
      <span>{message}</span>
      {href && (
        <Link
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 text-bone-50 hover:text-moss-200"
        >
          <span>{label}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
