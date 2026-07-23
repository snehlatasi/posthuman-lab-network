"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { navigationConfig, NavigationGroup } from "@/lib/navigation";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useSafeReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on page navigation
  useEffect(() => {
    setIsOpen(false);
    setActiveGroup(null);
  }, [pathname]);

  // Track scrolling to toggle glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility: Close on Escape key
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

  // Handle outside click to close active mega menu
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
    }, 150); // slight delay to prevent menu flickering
  };

  const toggleGroupClick = (label: string) => {
    if (activeGroup === label) {
      setActiveGroup(null);
    } else {
      setActiveGroup(label);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || activeGroup || isOpen
          ? "bg-carbon-950/80 backdrop-blur-md border-b border-bone-200/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="editorial-container flex items-center justify-between">
        {/* Branding Logo */}
        <Link 
          href="/" 
          className="group flex flex-col focus:outline-none"
          aria-label="Posthuman Lab Network Homepage"
          onClick={() => setActiveGroup(null)}
        >
          <span className="font-serif text-lg md:text-xl font-bold tracking-wider leading-none text-bone-100 group-hover:text-moss-400 transition-colors">
            POSTHUMAN
          </span>
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] font-medium text-bone-200/50 leading-none mt-1 uppercase">
            Lab Network
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav 
          className="hidden lg:flex items-center space-x-2"
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
                  className={`px-3 py-1.5 text-xs font-sans tracking-widest uppercase transition-all duration-300 relative ${
                    isActive ? "text-moss-400 font-semibold" : "text-bone-200/60 hover:text-bone-50"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-moss-500" />
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
                    className={`flex items-center space-x-1 px-4 py-2 text-sm font-sans tracking-wide uppercase transition-all duration-300 rounded-md hover:bg-carbon-900 focus:outline-none ${
                      isDropdownActive ? "text-moss-400 bg-carbon-900" : "text-bone-100"
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown 
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isDropdownActive ? "rotate-180 text-moss-400" : "text-bone-200/40"
                      }`}
                    />
                  </button>
                </div>
              );
            })
          )}
        </nav>

        {/* Action Button & Mobile Trigger */}
        <div className="flex items-center space-x-4">
          <Link
            href="/membership/become-a-member"
            onClick={() => setActiveGroup(null)}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-sans tracking-widest uppercase font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-moss-500/50 ${
              pathname === "/"
                ? "text-bone-100 border border-bone-200/20 hover:border-moss-500 hover:text-moss-400"
                : "text-carbon-950 bg-bone-100 hover:bg-moss-500 hover:text-bone-50"
            }`}
          >
            Join the Network
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-2 text-bone-100 hover:text-moss-400 focus:outline-none rounded-md hover:bg-carbon-900"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu Container */}
      <AnimatePresence>
        {activeGroup && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-full left-0 right-0 bg-carbon-950/95 backdrop-blur-xl border-b border-bone-200/10 shadow-2xl overflow-hidden z-40"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="editorial-container py-12 grid grid-cols-12 gap-8">
              {/* Mega-Menu Left Banner */}
              <div className="col-span-4 border-r border-bone-200/5 pr-8">
                {navigationConfig.map((group) => {
                  if (group.label !== activeGroup) return null;
                  return (
                    <div key={group.label} className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest">{group.number}</span>
                        <div className="h-[1px] w-8 bg-moss-500/30" />
                      </div>
                      <h2 className="font-serif text-3xl font-bold tracking-tight text-bone-50">
                        {group.label.toUpperCase()}
                      </h2>
                      <p className="text-sm text-bone-200/60 leading-relaxed font-sans max-w-xs">
                        {group.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mega-Menu Links Grid */}
              <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-6 pl-8">
                {navigationConfig
                  .find((group) => group.label === activeGroup)
                  ?.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveGroup(null)}
                      className="group flex flex-col justify-between p-4 rounded-lg bg-carbon-900/30 hover:bg-carbon-900 border border-transparent hover:border-moss-500/10 transition-all duration-300"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-base font-semibold text-bone-100 group-hover:text-moss-400 transition-colors">
                            {item.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-bone-200/20 group-hover:text-moss-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-xs text-bone-200/50 leading-relaxed font-sans pr-4">
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

      {/* Mobile Animated Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-carbon-950/95 backdrop-blur-xl border-t border-bone-200/5 overflow-y-auto z-40"
          >
            <div className="editorial-container py-8 space-y-6">
              {navigationConfig.map((group) => (
                <MobileAccordionGroup 
                  key={group.label} 
                  group={group} 
                  onClose={() => setIsOpen(false)}
                />
              ))}

              <div className="pt-6 border-t border-bone-200/5 flex flex-col space-y-4">
                <Link
                  href="/membership/become-a-member"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-sm font-sans tracking-widest uppercase font-semibold text-carbon-950 bg-bone-100 hover:bg-moss-500 hover:text-bone-50 transition-colors rounded-lg"
                >
                  Join the Network
                </Link>
                
                <div className="flex justify-center space-x-6 text-[10px] tracking-wider uppercase font-mono text-bone-200/40">
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

/* Helper Accordion Group for Mobile Menu */
const MobileAccordionGroup: React.FC<{
  group: NavigationGroup;
  onClose: () => void;
}> = ({ group, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <div className="border-b border-bone-200/5 pb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 text-left focus:outline-none"
      >
        <div className="space-y-1">
          <span className="font-mono text-[10px] text-moss-500 tracking-wider uppercase block">{group.number}</span>
          <span className="font-serif text-lg font-bold text-bone-100">{group.label}</span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-bone-200/40 transition-transform duration-300 ${
            isExpanded ? "rotate-180 text-moss-400" : ""
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
                  <span className="font-sans text-sm font-semibold text-bone-100 group-hover:text-moss-400 transition-colors">
                    {item.label}
                  </span>
                  <span className="font-sans text-[11px] text-bone-200/40 pr-4 leading-relaxed">
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
