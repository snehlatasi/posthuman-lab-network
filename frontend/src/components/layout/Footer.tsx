import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Learning", href: "/learning" },
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/support" },
];

const socialLinks = [
  {
    label: "Instagram Profile",
    href: "https://instagram.com",
    icon: Instagram,
  },
  {
    label: "YouTube Channel",
    href: "https://youtube.com",
    icon: Youtube,
  },
  {
    label: "Facebook Page",
    href: "https://facebook.com",
    icon: Facebook,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 mt-auto border-t border-carbon-950/8 bg-bone-50/88 py-12 backdrop-blur-md transition-colors duration-300 dark:border-bone-50/12 dark:bg-carbon-950/88">
      <div className="editorial-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(260px,0.9fr)_minmax(420px,1fr)] lg:items-start">
          <div className="max-w-xl space-y-4">
            <Link href="/" className="inline-flex flex-col focus:outline-none" aria-label="Posthuman Lab Network home">
              <span className="font-serif text-2xl font-bold leading-none tracking-[0.08em] text-carbon-950 dark:text-bone-100">
                POSTHUMAN
              </span>
              <span className="mt-1 font-sans text-[9px] font-bold uppercase leading-none tracking-[0.3em] text-carbon-900 dark:text-bone-200">
                Lab Network
              </span>
            </Link>
            <p className="max-w-xl font-sans text-sm font-medium leading-relaxed text-carbon-800 dark:text-bone-200">
              A collaborative space for posthuman thought, ecological futures, technology ethics,
              learning, and interdisciplinary practice.
            </p>
          </div>

          <div className="space-y-3 lg:justify-self-end">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-earth-600 dark:text-earth-400">
              Explore
            </p>
            <nav
              aria-label="Footer navigation"
              className="grid max-w-[560px] grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-5"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-1 font-sans text-sm font-bold text-carbon-900 transition-colors hover:text-earth-600 dark:text-bone-200 dark:hover:text-earth-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 grid gap-5 border-t border-carbon-950/8 pt-8 dark:border-bone-50/12 lg:grid-cols-[minmax(220px,0.42fr)_minmax(420px,0.58fr)] lg:items-start">
          <div className="space-y-1">
            <p className="font-serif text-xl font-bold uppercase text-carbon-950 dark:text-bone-50">
              Subscribe for Updates
            </p>
            <p className="max-w-sm font-sans text-sm font-medium leading-relaxed text-carbon-800 dark:text-bone-200">
              Receive blogs, newsletters, media releases, and event notes from the network.
            </p>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <NewsletterSignup />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-carbon-950/8 pt-6 text-xs font-medium text-carbon-900 dark:border-bone-50/12 dark:text-bone-200 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>&copy; {currentYear} Posthuman Lab Network</span>
            <Link href="/admin" className="font-mono uppercase tracking-wider text-earth-600 hover:underline dark:text-earth-400">
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-carbon-950/8 bg-white/70 p-2.5 text-carbon-950 transition-colors hover:border-earth-500/30 hover:text-earth-600 dark:border-bone-50/15 dark:bg-carbon-900/70 dark:text-bone-100 dark:hover:text-earth-400"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
