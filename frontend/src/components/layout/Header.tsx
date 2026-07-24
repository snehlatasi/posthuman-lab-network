"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { Menu, X, ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { navigationConfig, NavigationGroup } from "@/lib/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeSelector } from "@/components/ui/ThemeSelector";

export const Header: React.FC = () => {
  const { isAdmin, openLoginModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useSafeReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsOpen(false);
    setActiveGroup(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || activeGroup || isOpen
          ? "bg-bone-50/90 dark:bg-carbon-950/90 backdrop-blur-xl border-b border-carbon-950/10 dark:border-bone-50/12 py-3 md:py-4 shadow-md dark:shadow-[0_14px_40px_-30px_rgba(0,0,0,0.7)]"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 2xl:px-10 flex items-center justify-between gap-1.5 xl:gap-3 2xl:gap-4">
        {/* Zone 1: Brand Logo */}
        <Link
          href="/"
          className="group flex flex-col focus:outline-none shrink-0"
          aria-label="Posthuman Lab Network Homepage"
          onClick={() => setActiveGroup(null)}
        >
          <span className="font-serif text-base sm:text-lg md:text-xl xl:text-xl 2xl:text-2xl font-bold tracking-[0.08em] leading-none text-[#120e0c] dark:text-[#f3ebd9] group-hover:text-earth-600 dark:group-hover:text-earth-400 transition-colors">
            POSTHUMAN
          </span>
          <span className="font-sans text-[7.5px] sm:text-[8px] md:text-[9px] 2xl:text-[10px] tracking-[0.3em] font-bold text-[#1b1613] dark:text-[#d5d0c4] leading-none mt-1 uppercase">
            Lab Network
          </span>
        </Link>

        {/* Zone 2: Main Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-2 shrink min-w-0"
          role="navigation"
          aria-label="Main Desktop Navigation"
        >
          {pathname === "/" ? (
            [
              { label: "HOME", href: "/" },
              { label: "ABOUT", href: "/about" },
              { label: "LABS", href: "/labs" },
              { label: "LEARNING", href: "/learning" },
              { label: "EVENTS", href: "/events" },
              { label: "MEDIA", href: "/media" },
              { label: "COMMUNITY", href: "/community" },
              { label: "BLOG", href: "/blog" },
              { label: "SUPPORT", href: "/support" },
              { label: "CONTACT", href: "/contact" }
            ].map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-1.5 xl:px-2 2xl:px-2.5 py-1 text-[10.5px] xl:text-[11px] 2xl:text-xs font-sans tracking-wider uppercase transition-all duration-200 relative whitespace-nowrap ${
                    isActive
                      ? "text-earth-600 dark:text-earth-400 font-bold"
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
          ) : (
            navigationConfig.map((group) => {
              const isDropdownActive = activeGroup === group.label;
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
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
                        isDropdownActive ? "rotate-180 text-earth-600 dark:text-earth-400" : "text-[#594e46] dark:text-bone-300"
                      }`}
                    />
                  </button>
                </div>
              );
            })
          )}
        </nav>

        {/* Zone 3: Right Controls (Theme Selector + Admin Login + Join CTA + Mobile Toggle) */}
        <div className="flex items-center space-x-1.5 xl:space-x-2.5 2xl:space-x-3 shrink-0">
          {/* Segmented Theme Preference Control */}
          <ThemeSelector variant="pills" />

          {!isAdmin && (
            <button
              onClick={openLoginModal}
              className="hidden xl:inline-flex items-center space-x-1 px-2 py-1 xl:px-2.5 xl:py-1.5 2xl:px-3 2xl:py-2 text-[10px] xl:text-[11px] 2xl:text-xs font-mono tracking-wider uppercase text-[#3a2e28] dark:text-[#d5d0c4] hover:text-earth-600 dark:hover:text-earth-400 border border-[#120e0c]/15 dark:border-bone-50/20 hover:border-earth-500/40 rounded-full transition-colors cursor-pointer bg-bone-100/80 dark:bg-carbon-900/80 whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
              <span>Admin Login</span>
            </button>
          )}

          <Link
            href="/membership/become-a-member"
            onClick={() => setActiveGroup(null)}
            className="hidden sm:inline-flex items-center justify-center px-3 py-1.5 xl:px-3.5 xl:py-1.5 2xl:px-4.5 2xl:py-2 text-[10px] xl:text-[11px] 2xl:text-xs font-sans tracking-widest uppercase font-semibold text-bone-50 bg-[#120e0c] dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-earth-500/40 shadow-sm shrink-0 whitespace-nowrap"
          >
            Join the Network
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-1.5 text-[#120e0c] dark:text-bone-100 hover:text-earth-600 focus:outline-none rounded-md hover:bg-bone-200/50 dark:hover:bg-carbon-900/80 cursor-pointer"
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
            className="hidden lg:block absolute top-full left-0 right-0 bg-bone-50/95 dark:bg-carbon-950/95 backdrop-blur-xl border-b border-carbon-950/10 dark:border-bone-50/15 shadow-xl overflow-hidden z-40"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full max-w-[1440px] mx-auto px-8 xl:px-10 py-12 grid grid-cols-12 gap-8">
              <div className="col-span-4 border-r border-carbon-950/10 dark:border-bone-50/10 pr-8">
                {navigationConfig.map((group) => {
                  if (group.label !== activeGroup) return null;
                  return (
                    <div key={group.label} className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs text-earth-600 dark:text-earth-400 font-bold uppercase tracking-widest">{group.number}</span>
                        <div className="h-[1px] w-8 bg-earth-500/40" />
                      </div>
                      <h2 className="font-serif text-4xl font-bold tracking-tight text-[#120e0c] dark:text-[#f3ebd9]">
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
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveGroup(null)}
                      className="group flex flex-col justify-between p-5 rounded-[24px] bg-white dark:bg-carbon-900/90 hover:bg-bone-100 dark:hover:bg-carbon-900 border border-carbon-950/10 dark:border-bone-50/15 hover:border-earth-600 dark:hover:border-earth-400 shadow-sm transition-all duration-200"
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
            initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-[60px] left-0 right-0 bottom-0 bg-bone-50/98 dark:bg-carbon-950/98 backdrop-blur-xl border-t border-carbon-950/10 dark:border-bone-50/15 overflow-y-auto z-40"
          >
            <div className="px-6 py-8 space-y-6">
              {/* Theme Preference in Mobile Drawer */}
              <div className="flex flex-col items-center space-y-2 pb-4 border-b border-carbon-950/10 dark:border-bone-50/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#594e46] dark:text-[#9e988b]">Theme Preference</span>
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
                  href="/membership/become-a-member"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-sm font-sans tracking-widest uppercase font-bold text-bone-50 bg-[#120e0c] dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-500 transition-colors rounded-full shadow-md"
                >
                  Join the Network
                </Link>

                <div className="flex justify-center space-x-6 text-xs tracking-wider uppercase font-mono text-[#1b1613] dark:text-[#d5d0c4] font-bold">
                  <span>Open Access</span>
                  <span>•</span>
                  <span>Sustainable Tech</span>
                  <span>•</span>
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

const MobileAccordionGroup: React.FC<{
  group: NavigationGroup;
  onClose: () => void;
}> = ({ group, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <div className="border-b border-carbon-950/10 dark:border-bone-50/10 pb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 text-left focus:outline-none cursor-pointer"
      >
        <div className="space-y-1">
          <span className="font-mono text-xs text-earth-600 dark:text-earth-400 tracking-wider uppercase font-bold block">{group.number}</span>
          <span className="font-serif text-2xl font-bold text-[#120e0c] dark:text-[#f3ebd9]">{group.label}</span>
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
            initial={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 pl-2 flex flex-col space-y-4 pt-1">
              {group.items.map((item) => (
                <Link
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
