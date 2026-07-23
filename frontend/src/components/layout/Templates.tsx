import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageHeader, Container } from "./Primitives";
import { Reveal } from "../ui/Reveal";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

// 1. EDITORIAL PAGE LAYOUT (Philosophical reading, narratives, details)
interface EditorialSidebarItem {
  label: string;
  href: string;
  active?: boolean;
}

interface EditorialPageLayoutProps {
  tag: string;
  title: string;
  subtitle?: string;
  parentLabel?: string;
  parentHref?: string;
  sidebarTitle?: string;
  sidebarLinks: EditorialSidebarItem[];
  children: React.ReactNode;
  nextPageLabel?: string;
  nextPageHref?: string;
}

export const EditorialPageLayout: React.FC<EditorialPageLayoutProps> = ({
  tag,
  title,
  subtitle,
  parentLabel,
  parentHref,
  sidebarTitle = "In this section",
  sidebarLinks,
  children,
  nextPageLabel,
  nextPageHref
}) => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <PageHeader
          tag={tag}
          title={title}
          subtitle={subtitle}
          parentLabel={parentLabel}
          parentHref={parentHref}
        />

        <div className="py-16 md:py-24 relative">
          <Container className="grid grid-cols-12 gap-8 lg:gap-16">
            {/* Left Sidebar Navigation */}
            <aside className="col-span-12 lg:col-span-4 space-y-8 lg:sticky lg:top-28 lg:h-fit self-start">
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-moss-500 uppercase font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{sidebarTitle}</span>
                </div>
                <nav className="flex flex-col space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-xs font-sans font-semibold tracking-wide uppercase py-2.5 px-3 rounded-lg transition-colors focus:outline-none ${
                        link.active
                          ? "bg-moss-500/10 text-moss-400 font-bold"
                          : "text-bone-200/50 hover:bg-carbon-900 hover:text-bone-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <article className="col-span-12 lg:col-span-8 space-y-12">
              <Reveal className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:font-sans prose-p:text-bone-200/70 prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base prose-a:text-moss-400 hover:prose-a:text-moss-300">
                {children}
              </Reveal>

              {/* Next Page Link */}
              {nextPageLabel && nextPageHref && (
                <div className="pt-8 border-t border-bone-200/5 flex justify-end">
                  <Link
                    href={nextPageHref}
                    className="group inline-flex items-center space-x-3 text-right focus:outline-none"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-bone-200/40 uppercase tracking-widest block">Read Next</span>
                      <span className="font-serif text-base font-bold text-bone-100 group-hover:text-moss-400 transition-colors">
                        {nextPageLabel}
                      </span>
                    </div>
                    <div className="p-3 bg-carbon-900 group-hover:bg-moss-500 text-bone-200/40 group-hover:text-bone-50 transition-all rounded-full border border-bone-200/5 group-hover:border-transparent">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </div>
              )}
            </article>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
};

// 2. LISTING PAGE LAYOUT (Directory listings, grids, search placeholders)
interface ListingFilterItem {
  label: string;
  active: boolean;
  onClick?: () => void;
}

interface ListingPageLayoutProps {
  tag: string;
  title: string;
  subtitle?: string;
  parentLabel?: string;
  parentHref?: string;
  filters?: ListingFilterItem[];
  children: React.ReactNode;
}

export const ListingPageLayout: React.FC<ListingPageLayoutProps> = ({
  tag,
  title,
  subtitle,
  parentLabel,
  parentHref,
  filters = [],
  children
}) => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <PageHeader
          tag={tag}
          title={title}
          subtitle={subtitle}
          parentLabel={parentLabel}
          parentHref={parentHref}
        />

        <div className="py-16 md:py-24">
          <Container className="space-y-12">
            {/* Filter buttons */}
            {filters.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-4 border-b border-bone-200/5">
                {filters.map((filter, idx) => (
                  <button
                    key={idx}
                    onClick={filter.onClick}
                    className={`px-4 py-2 text-xs font-mono tracking-wider uppercase font-semibold rounded-full border transition-all focus:outline-none ${
                      filter.active
                        ? "bg-bone-100 text-carbon-950 border-bone-100"
                        : "bg-transparent text-bone-200/50 border-bone-200/10 hover:border-moss-500/30 hover:text-bone-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}

            {/* Listing grid */}
            <Reveal staggerChildren={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {children}
              </div>
            </Reveal>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
};

// 3. CONTENT PAGE LAYOUT (Profile lists, team cards, custom forms)
interface ContentPageLayoutProps {
  tag: string;
  title: string;
  subtitle?: string;
  parentLabel?: string;
  parentHref?: string;
  children: React.ReactNode;
}

export const ContentPageLayout: React.FC<ContentPageLayoutProps> = ({
  tag,
  title,
  subtitle,
  parentLabel,
  parentHref,
  children
}) => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <PageHeader
          tag={tag}
          title={title}
          subtitle={subtitle}
          parentLabel={parentLabel}
          parentHref={parentHref}
        />
        <div className="py-16 md:py-24">
          <Container>{children}</Container>
        </div>
      </main>
      <Footer />
    </>
  );
};
