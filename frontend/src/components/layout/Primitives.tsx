import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SplitText } from "../ui/Reveal";

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
              <span className="font-mono text-[11px] text-earth-600 font-semibold uppercase tracking-[0.22em] block">
                {tag}
              </span>
            )}
            {title && (
              <SplitText
                text={title}
                as="h2"
                className="font-serif-display text-4xl md:text-5xl font-semibold tracking-tight text-carbon-950 text-balance leading-[1.02]"
              />
            )}
            {description && (
              <p className="font-sans text-sm md:text-lg text-carbon-700 leading-relaxed font-medium">
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
    <div className="pt-32 pb-18 border-b border-carbon-950/8 bg-gradient-to-b from-bone-50/80 via-bone-50/55 to-transparent relative overflow-hidden">
      <div className="absolute inset-0 organic-mesh opacity-35 z-0 pointer-events-none" />
      <div className="absolute inset-x-[8%] bottom-0 h-px ink-rule z-0 pointer-events-none" />
      <Container className="relative z-10 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono tracking-[0.22em] uppercase text-carbon-900 font-bold">
          <Link href="/" className="hover:text-earth-600 transition-colors">Home</Link>
          {parentLabel && parentHref && (
            <>
              <span>/</span>
              <Link href={parentHref} className="hover:text-earth-600 transition-colors">{parentLabel}</Link>
            </>
          )}
          <span>/</span>
          <span className="text-earth-600 font-bold">{tag}</span>
        </div>

        <SplitText
          text={title}
          as="h1"
          delay={0.1}
          stagger={0.04}
          className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-carbon-950 max-w-4xl leading-[0.96] text-balance uppercase"
        />
        
        {subtitle && (
          <p className="font-sans text-base md:text-xl text-carbon-800 leading-relaxed max-w-2xl pt-2 font-medium">
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
    <div className={`glass-panel glass-panel-hover p-6 md:p-8 rounded-[28px] h-full flex flex-col justify-between ${className}`}>
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
      className={`group inline-flex items-center space-x-1.5 text-xs md:text-sm font-sans font-bold tracking-[0.16em] uppercase text-carbon-950 hover:text-earth-600 transition-colors focus:outline-none ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 text-carbon-700/40 group-hover:text-earth-600 group-hover:translate-x-1 transition-all duration-300" />
    </Link>
  );
};
