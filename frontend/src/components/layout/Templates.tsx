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
            <aside className="col-span-12 lg:col-span-4 space-y-8 lg:sticky lg:top-28 lg:h-fit self-start">
              <div className="editorial-surface p-6 rounded-[28px] space-y-6">
                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.22em] text-earth-600 uppercase font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{sidebarTitle}</span>
                </div>
                <nav className="flex flex-col space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-xs font-sans font-bold tracking-[0.12em] uppercase py-3 px-4 rounded-full transition-colors focus:outline-none ${
                        link.active
                          ? "bg-earth-500/15 text-earth-600 font-bold shadow-sm"
                          : "text-carbon-900 hover:bg-bone-50 hover:text-earth-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="col-span-12 lg:col-span-8 space-y-12">
              <div className="editorial-surface rounded-[32px] p-8 md:p-12 border border-carbon-950/8 shadow-md">
                <Reveal className="prose max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-carbon-950 prose-p:font-sans prose-p:text-carbon-900 prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base prose-a:text-earth-600 hover:prose-a:text-earth-500 prose-strong:text-carbon-950 font-medium">
                  {children}
                </Reveal>
              </div>

              {nextPageLabel && nextPageHref && (
                <div className="pt-8 border-t border-carbon-950/8 flex justify-end">
                  <Link
                    href={nextPageHref}
                    className="group inline-flex items-center space-x-3 text-right focus:outline-none"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-carbon-700 uppercase tracking-widest block">Read Next</span>
                      <span className="font-serif text-lg font-semibold text-carbon-950 group-hover:text-earth-600 transition-colors">
                        {nextPageLabel}
                      </span>
                    </div>
                    <div className="p-3 bg-white/75 group-hover:bg-earth-600 text-carbon-700 group-hover:text-bone-50 transition-all rounded-full border border-carbon-950/8 group-hover:border-transparent">
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
            {filters.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-4 border-b border-carbon-950/8">
                {filters.map((filter, idx) => (
                  <button
                    key={idx}
                    onClick={filter.onClick}
                    className={`px-4 py-2 text-xs font-mono tracking-[0.16em] uppercase font-semibold rounded-full border transition-all focus:outline-none ${
                      filter.active
                        ? "bg-carbon-950 text-bone-50 border-carbon-950"
                        : "bg-white/45 text-carbon-700 border-carbon-950/10 hover:border-earth-500/30 hover:text-earth-600"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}

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
