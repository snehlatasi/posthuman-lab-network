import React from "react";
import { notFound } from "next/navigation";
import { pagesContentMap } from "@/data/pagesContent";
import { EditorialPageLayout, ListingPageLayout, ContentPageLayout } from "@/components/layout/Templates";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DynamicForm } from "@/components/layout/DynamicForm";
import { ContentCard } from "@/components/layout/Primitives";
import { StaggerItem } from "@/components/ui/Reveal";
import { Metadata } from "next";

interface RouteParams {
  section: string;
  subpage: string;
}

// 1. Generate static metadata dynamically for search crawlers
export async function generateMetadata({
  params
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { section, subpage } = await params;
  const slug = `${section}/${subpage}`;
  const page = pagesContentMap[slug];

  if (!page) {
    return {
      title: "Page Not Found | Posthuman Lab Network"
    };
  }

  return {
    title: `${page.title} | Posthuman Lab Network`,
    description: page.description
  };
}

// 2. Yield all static parameters for Next.js build prerendering
export async function generateStaticParams() {
  return Object.keys(pagesContentMap).map((key) => {
    const [section, subpage] = key.split("/");
    return { section, subpage };
  });
}

// 3. Centralized Page Composer
export default async function DynamicSubpage({
  params
}: {
  params: Promise<RouteParams>;
}) {
  const { section, subpage } = await params;
  const slug = `${section}/${subpage}`;
  const page = pagesContentMap[slug];

  if (!page) {
    notFound();
  }

  // Build breadcrumb items hierarchy
  const breadcrumbItems = [
    { label: page.parentLabel || "Section", href: page.parentHref },
    { label: page.title }
  ];

  // Sidebar links context for Editorial Layouts (reusing related links)
  const sidebarLinks = page.relatedLinks
    ? page.relatedLinks.map((link) => ({
        label: link.label,
        href: link.href,
        active: false
      }))
    : [];

  // A. EDITORIAL LAYOUT
  if (page.layout === "editorial") {
    return (
      <EditorialPageLayout
        tag={page.eyebrow}
        title={page.title}
        subtitle={page.description}
        parentLabel={page.parentLabel}
        parentHref={page.parentHref}
        sidebarTitle="Related Navigation"
        sidebarLinks={sidebarLinks}
      >
        <div className="space-y-8">
          <Breadcrumb items={breadcrumbItems} />

          {page.editorialSections?.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-carbon-950 dark:text-bone-50 leading-tight">
                {sec.heading}
              </h3>
              <p className="font-sans text-sm md:text-base text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                {sec.content}
              </p>
            </section>
          ))}
        </div>
      </EditorialPageLayout>
    );
  }

  // B. LISTING LAYOUT
  if (page.layout === "listing") {
    return (
      <ListingPageLayout
        tag={page.eyebrow}
        title={page.title}
        subtitle={page.description}
        parentLabel={page.parentLabel}
        parentHref={page.parentHref}
      >
        {/* Full-width breadcrumb placed before grid items in page header context */}
        <div className="col-span-12 md:col-span-2 lg:col-span-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {page.items?.map((item, idx) => (
          <StaggerItem key={idx}>
            <ContentCard className="border border-carbon-950/10 dark:border-bone-50/15 bg-white dark:bg-carbon-900/90 hover:bg-white dark:hover:bg-carbon-900 shadow-md hover:shadow-xl hover:border-earth-600 dark:hover:border-earth-400 transition-all duration-300 h-full flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono tracking-widest text-earth-600 dark:text-earth-400 uppercase font-bold">
                  <span>{item.tag || "Index"}</span>
                  {item.date && <span className="text-carbon-900 dark:text-bone-200 font-bold">{item.date}</span>}
                </div>
                <h4 className="font-serif text-xl font-bold text-carbon-950 dark:text-bone-50 leading-tight">
                  {item.title}
                </h4>
                <p className="font-sans text-xs md:text-sm text-carbon-800 dark:text-bone-200 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </ContentCard>
          </StaggerItem>
        ))}
      </ListingPageLayout>
    );
  }

  // C. FORM LAYOUT
  if (page.layout === "form") {
    return (
      <ContentPageLayout
        tag={page.eyebrow}
        title={page.title}
        subtitle={page.description}
        parentLabel={page.parentLabel}
        parentHref={page.parentHref}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <Breadcrumb items={breadcrumbItems} />
          {page.formType && <DynamicForm formType={page.formType} />}
        </div>
      </ContentPageLayout>
    );
  }

  // Fallback to 404
  notFound();
}
