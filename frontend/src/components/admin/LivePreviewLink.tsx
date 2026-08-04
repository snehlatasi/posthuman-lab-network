import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface LivePreviewLinkProps {
  href: string;
  label?: string;
}

export function LivePreviewLink({ href, label = "View Live" }: LivePreviewLinkProps) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center gap-1 px-2.5 py-1 bg-carbon-950 hover:bg-carbon-800 text-bone-200 text-[10px] font-mono rounded-lg uppercase font-bold cursor-pointer border border-bone-50/15"
    >
      <span>{label}</span>
      <ExternalLink className="w-3 h-3" />
    </Link>
  );
}
