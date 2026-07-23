import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Container component
export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => {
  return <div className={`editorial-container ${className}`}>{children}</div>;
};

// Section component with grids & tags
export const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  tag?: string;
  title?: string;
  description?: string;
}> = ({ children, className = "", id, tag, title, description }) => {
  return (
    <section id={id} className={`py-16 md:py-24 relative ${className}`}>
      <Container>
        {(tag || title || description) && (
          <div className="mb-12 md:mb-16 space-y-4 max-w-2xl">
            {tag && (
              <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest block">
                {tag}
              </span>
            )}
            {title && (
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-bone-50">
                {title}
              </h2>
            )}
            {description && (
              <p className="font-sans text-sm md:text-base text-bone-200/60 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};

// Page Header component (For subpages)
export const PageHeader: React.FC<{
  tag: string;
  title: string;
  subtitle?: string;
  parentLabel?: string;
  parentHref?: string;
}> = ({ tag, title, subtitle, parentLabel, parentHref }) => {
  return (
    <div className="pt-32 pb-16 border-b border-bone-200/5 bg-carbon-900/10 relative overflow-hidden">
      {/* Dynamic atmospheric grid inside page headers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-carbon-950/80 z-0 pointer-events-none" />
      <Container className="relative z-10 space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-bone-200/40">
          <Link href="/" className="hover:text-moss-400 transition-colors">Home</Link>
          {parentLabel && parentHref && (
            <>
              <span>/</span>
              <Link href={parentHref} className="hover:text-moss-400 transition-colors">{parentLabel}</Link>
            </>
          )}
          <span>/</span>
          <span className="text-moss-500 font-semibold">{tag}</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-bone-50 max-w-4xl leading-[1.1]">
          {title}
        </h1>
        
        {subtitle && (
          <p className="font-sans text-base md:text-lg text-bone-200/60 leading-relaxed max-w-2xl pt-2">
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
};

// Glassmorphism Card
export const ContentCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  href?: string;
}> = ({ children, className = "", href }) => {
  const cardContent = (
    <div className={`glass-panel glass-panel-hover p-6 md:p-8 rounded-xl h-full flex flex-col justify-between ${className}`}>
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group focus:outline-none h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

// Custom animated text-link
export const AnimatedLink: React.FC<{
  children: React.ReactNode;
  href: string;
  className?: string;
}> = ({ children, href, className = "" }) => {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center space-x-1.5 text-xs md:text-sm font-sans font-bold tracking-wider uppercase text-bone-100 hover:text-moss-400 transition-colors focus:outline-none ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 text-bone-200/20 group-hover:text-moss-400 group-hover:translate-x-1 transition-all duration-300" />
    </Link>
  );
};
