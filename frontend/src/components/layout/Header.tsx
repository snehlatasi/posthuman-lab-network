"use client";

import type { FC } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMobilePerformanceMode } from "@/hooks/useMobilePerformanceMode";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { Menu, X, ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import type { NavigationGroup } from "@/lib/navigation";
import { navigationConfig } from "@/lib/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMember } from "@/context/MemberContext";
import { useTheme } from "@/context/ThemeContext";
import { ThemeSelector } from "@/components/ui/ThemeSelector";

export const Header: FC = () => {
  const { isAdmin, openLoginModal } = useAuth();
  const { member } = useMember();
  const { resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const pathname = usePathname();
  const shouldReduceMotion = useSafeReducedMotion();
  const mobilePerformanceMode = useMobilePerformanceMode();
  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emptySubscribe = useCallback(() => () => {}, []);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setActiveGroup(null);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const updateScrolled = () => {
      setIsScrolled((current) => {
        const next = window.scrollY > 20;
        return current === next ? current : next;
      });
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      setHeaderHeight(Math.ceil(header.getBoundingClientRect().height));
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const nextHeight = Math.ceil(header.getBoundingClientRect().height);
    setHeaderHeight((current) => (current === nextHeight ? current : nextHeight));
  }, [activeGroup, isOpen, isScrolled]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveGroup(null);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveGroup(null);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveGroup(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveGroup(null);
    }, 150);
  };

  const toggleGroupClick = (label: string) => {
    setActiveGroup((current) => (current === label ? null : label));
  };

  const isOverlayingHero =
    resolvedTheme === "dark" && pathname === "/" && !isScrolled && !activeGroup && !isOpen;
  const brandTextClass = isOverlayingHero
    ? "text-bone-50 drop-shadow-[0_5px_20px_rgba(0,0,0,0.55)] group-hover:text-[#9ff8ff]"
    : "text-[#120e0c] dark:text-[#f3ebd9] group-hover:text-earth-600 dark:group-hover:text-earth-400";
  const brandSubTextClass = isOverlayingHero
    ? "text-bone-100/85 drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)]"
    : "text-[#1b1613] dark:text-[#d5d0c4]";
  const ctaClass = isOverlayingHero
    ? "text-carbon-950 bg-bone-50 hover:bg-[#9ff8ff] shadow-[0_12px_34px_rgba(159,248,255,0.18)]"
    : "text-bone-50 bg-[#120e0c] dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 shadow-sm";
  const mobileToggleClass = isOverlayingHero
    ? "text-bone-50 hover:text-[#9ff8ff] hover:bg-bone-50/10"
    : "text-[#120e0c] dark:text-bone-100 hover:text-earth-600 hover:bg-bone-200/50 dark:hover:bg-carbon-900/80";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || activeGroup || isOpen
          ? "bg-bone-50/90 dark:bg-carbon-950/90 backdrop-blur-xl border-b border-carbon-950/10 dark:border-bone-50/12 py-4 shadow-md dark:shadow-[0_14px_40px_-30px_rgba(0,0,0,0.7)]"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-3 xl:gap-4 2xl:gap-6">
        {/* Group 1: Brand Logo */}
        <Link
          suppressHydrationWarning
          href="/"
          className="group flex flex-col focus:outline-none shrink-0"
          aria-label="Posthuman Lab Network Homepage"
          onClick={() => setActiveGroup(null)}
        >
          <span
            className={`font-serif text-base sm:text-lg md:text-xl xl:text-xl 2xl:text-2xl font-bold tracking-[0.08em] leading-none transition-colors ${brandTextClass}`}
          >
            POSTHUMAN
          </span>
          <span
            className={`font-sans text-[7.5px] sm:text-[8px] md:text-[9px] 2xl:text-[10px] tracking-[0.3em] font-bold leading-none mt-1 uppercase ${brandSubTextClass}`}
          >
            Lab Network
          </span>
        </Link>

        {/* Group 2: Main Desktop Primary Navigation */}
        <nav
          className="hidden xl:flex items-center space-x-1 xl:space-x-1.5 2xl:space-x-2.5 shrink-0 whitespace-nowrap"
          role="navigation"
          aria-label="Main Desktop Navigation"
        >
          {pathname === "/"
            ? [
                { label: "HOME", href: "/" },
                { label: "ABOUT", href: "/about" },
                { label: "LABS", href: "/labs" },
                { label: "LEARNING", href: "/learning" },
                { label: "EVENTS", href: "/events" },
                { label: "MEDIA", href: "/media" },
                { label: "COMMUNITY", href: "/community" },
                { label: "BLOG", href: "/blog" },
                { label: "SUPPORT", href: "/support" },
              ].map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    suppressHydrationWarning
                    key={link.label}
                    href={link.href}
                    className={`px-1.5 xl:px-2 2xl:px-2.5 py-1 text-[11px] xl:text-[11.5px] 2xl:text-xs font-sans tracking-wider uppercase transition-all duration-200 relative whitespace-nowrap ${
                      isActive
                        ? isOverlayingHero
                          ? "text-[#9ff8ff] font-bold drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]"
                          : "text-earth-600 dark:text-earth-400 font-bold"
                        : isOverlayingHero
                          ? "text-bone-100/82 font-semibold hover:text-[#9ff8ff] drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]"
                          : "text-[#1b1613] dark:text-[#d5d0c4] font-semibold hover:text-earth-600 dark:hover:text-earth-400"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-earth-500" />
                    )}
                  </Link>
                );
              })
            : navigationConfig.map((group) => {
                const isDropdownActive = activeGroup === group.label;
                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(group.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      suppressHydrationWarning
                      onClick={() => toggleGroupClick(group.label)}
                      aria-expanded={isDropdownActive}
                      aria-haspopup="true"
                      className={`flex items-center space-x-1 px-2 xl:px-2.5 2xl:px-3 py-1.5 text-xs font-sans tracking-wide uppercase transition-all duration-200 rounded-full focus:outline-none cursor-pointer whitespace-nowrap ${
                        isDropdownActive
                          ? "text-earth-600 dark:text-earth-400 bg-bone-200/50 dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15"
                          : "text-[#120e0c] dark:text-[#f3ebd9] hover:bg-bone-200/40 dark:hover:bg-carbon-900/50"
                      }`}
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isDropdownActive
                            ? "rotate-180 text-earth-600 dark:text-earth-400"
                            : "text-[#594e46] dark:text-bone-300"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
        </nav>

        {/* Group 3: Header Actions (Theme Selector + Admin Login + Join CTA + Mobile Toggle) */}
        <div className="flex items-center space-x-2 xl:space-x-3 2xl:space-x-4 shrink-0">
          {/* Segmented Theme Preference Control */}
          <div className="hidden md:block">
            <ThemeSelector variant="pills" />
          </div>

          {mounted && !isAdmin && (
            <button
              suppressHydrationWarning
              onClick={openLoginModal}
              className={`hidden xl:inline-flex items-center space-x-1 px-2.5 py-1.5 2xl:px-3 2xl:py-2 text-[10.5px] xl:text-[11px] 2xl:text-xs font-mono tracking-wider uppercase border rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isOverlayingHero
                  ? "text-bone-100 hover:text-[#9ff8ff] border-bone-50/20 hover:border-[#9ff8ff]/45 bg-carbon-950/45"
                  : "text-[#3a2e28] dark:text-[#d5d0c4] hover:text-earth-600 dark:hover:text-earth-400 border-[#120e0c]/15 dark:border-bone-50/20 hover:border-earth-500/40 bg-bone-100/80 dark:bg-carbon-900/80"
              }`}
            >
              <ShieldCheck className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
              <span>Admin Login</span>
            </button>
          )}

          {/* Member State Indicator */}
          {mounted && member && (
            <Link
              suppressHydrationWarning
              href="/membership/become-a-member"
              className="hidden xl:inline-flex items-center space-x-1.5 px-2.5 py-1.5 text-[10.5px] font-mono tracking-wider uppercase bg-earth-500/15 border border-earth-500/30 text-earth-600 dark:text-earth-400 rounded-full hover:bg-earth-500/25 transition-colors shrink-0 whitespace-nowrap"
            >
              <div className="w-2 h-2 rounded-full bg-earth-500 animate-pulse" />
              <span>{member.status === "APPROVED" ? "MEMBER" : "APPLICANT"}</span>
            </Link>
          )}

          <Link
            suppressHydrationWarning
            href="/membership/become-a-member"
            onClick={() => setActiveGroup(null)}
            className={`hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 xl:px-4 xl:py-1.5 2xl:px-5 2xl:py-2 text-[10.5px] xl:text-[11px] 2xl:text-xs font-sans tracking-widest uppercase font-semibold transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-earth-500/40 shrink-0 whitespace-nowrap ${ctaClass}`}
          >
            {mounted && member ? "Member Account" : "Join the Network"}
          </Link>

          <button
            suppressHydrationWarning
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Mobile Menu"
            className={`xl:hidden p-1.5 focus:outline-none rounded-md cursor-pointer transition-colors ${mobileToggleClass}`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Submenu Dropdown */}
      <AnimatePresence>
        {activeGroup && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden xl:block absolute top-full left-0 right-0 bg-bone-50/95 dark:bg-carbon-950/95 backdrop-blur-xl border-b border-carbon-950/10 dark:border-bone-50/15 shadow-xl overflow-hidden z-40"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full max-w-[1720px] mx-auto px-8 xl:px-10 py-12 grid grid-cols-12 gap-8">
              <div className="col-span-4 border-r border-carbon-950/10 dark:border-bone-50/10 pr-8">
                {navigationConfig.map((group) => {
                  if (group.label !== activeGroup) return null;
                  return (
                    <div key={group.label} className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-widest">
                          {group.number}
                        </span>
                        <div className="h-[1px] w-8 bg-earth-500/40" />
                      </div>
                      <h2 className="font-serif text-4xl font-bold text-[#120e0c] dark:text-[#f3ebd9] leading-[1.05]">
                        {group.label.toUpperCase()}
                      </h2>
                      <p className="text-sm text-[#1b1613] dark:text-[#d5d0c4] leading-relaxed font-sans max-w-xs font-medium">
                        {group.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-6 pl-8">
                {navigationConfig
                  .find((group) => group.label === activeGroup)
                  ?.items.map((item) => (
                    <Link
                      suppressHydrationWarning
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveGroup(null)}
                      className="group flex flex-col justify-between p-5 rounded-lg bg-white dark:bg-carbon-900/90 hover:bg-bone-100 dark:hover:bg-carbon-900 border border-carbon-950/10 dark:border-bone-50/15 hover:border-earth-600 dark:hover:border-earth-400 shadow-sm transition-all duration-200"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-xl font-bold text-[#120e0c] dark:text-[#f3ebd9] group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors">
                            {item.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#120e0c] dark:text-[#d5d0c4] group-hover:text-earth-600 dark:group-hover:text-earth-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-xs text-[#1b1613] dark:text-[#9e988b] leading-relaxed font-sans pr-4 font-medium">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion || mobilePerformanceMode ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion || mobilePerformanceMode ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              top: `${headerHeight}px`,
              height: `calc(100dvh - ${headerHeight}px)`,
            }}
            data-testid="mobile-navigation-drawer"
            className="xl:hidden fixed left-0 right-0 bottom-0 bg-bone-50/98 dark:bg-carbon-950/98 md:backdrop-blur-xl border-t border-carbon-950/10 dark:border-bone-50/15 overflow-y-auto overscroll-contain z-40"
          >
            <div className="px-6 py-8 space-y-6">
              {/* Theme Preference in Mobile Drawer */}
              <div className="flex flex-col items-center space-y-2 pb-4 border-b border-carbon-950/10 dark:border-bone-50/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#594e46] dark:text-[#9e988b]">
                  Theme Preference
                </span>
                <ThemeSelector variant="pills" />
              </div>

              {navigationConfig.map((group) => (
                <MobileAccordionGroup
                  key={group.label}
                  group={group}
                  onClose={() => setIsOpen(false)}
                />
              ))}

              <div className="pt-6 border-t border-carbon-950/10 dark:border-bone-50/15 flex flex-col space-y-4">
                <Link
                  suppressHydrationWarning
                  href="/membership/become-a-member"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-sm font-sans tracking-widest uppercase font-bold text-bone-50 bg-[#120e0c] dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 transition-colors rounded-full shadow-md"
                >
                  Join the Network
                </Link>

                <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs tracking-wider uppercase font-mono text-[#1b1613] dark:text-[#d5d0c4] font-bold">
                  <span>Open Access</span>
                  <span className="text-earth-600 dark:text-earth-400">/</span>
                  <span>Sustainable Tech</span>
                  <span className="text-earth-600 dark:text-earth-400">/</span>
                  <span>Embodied Gatherings</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const MobileAccordionGroup: FC<{
  group: NavigationGroup;
  onClose: () => void;
}> = ({ group, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useSafeReducedMotion();
  const mobilePerformanceMode = useMobilePerformanceMode();

  return (
    <div className="border-b border-carbon-950/10 dark:border-bone-50/10 pb-4">
      <button
        suppressHydrationWarning
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 text-left focus:outline-none cursor-pointer"
      >
        <div className="space-y-1">
          <span className="font-mono text-xs text-earth-600 dark:text-earth-400 tracking-wider uppercase font-bold block">
            {group.number}
          </span>
          <span className="font-serif text-2xl font-bold text-[#120e0c] dark:text-[#f3ebd9]">
            {group.label}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[#120e0c] dark:text-[#f3ebd9] transition-transform duration-300 ${
            isExpanded ? "rotate-180 text-earth-600 dark:text-earth-400" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={shouldReduceMotion || mobilePerformanceMode ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion || mobilePerformanceMode ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: mobilePerformanceMode ? 0 : 0.24, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 pl-2 flex flex-col space-y-4 pt-1">
              {group.items.map((item) => (
                <Link
                  suppressHydrationWarning
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex flex-col space-y-1 group"
                >
                  <span className="font-sans text-sm font-bold text-[#120e0c] dark:text-[#f3ebd9] group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors">
                    {item.label}
                  </span>
                  <span className="font-sans text-xs text-[#1b1613] dark:text-[#9e988b] pr-4 leading-relaxed font-medium">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
