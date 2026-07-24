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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || activeGroup || isOpen
          ? "bg-bone-50/86 backdrop-blur-xl border-b border-carbon-950/8 py-4 shadow-[0_14px_40px_-30px_rgba(23,20,18,0.35)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="editorial-container flex items-center justify-between">
        <Link
          href="/"
          className="group flex flex-col focus:outline-none"
          aria-label="Posthuman Lab Network Homepage"
          onClick={() => setActiveGroup(null)}
        >
          <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.08em] leading-none text-carbon-950 group-hover:text-earth-600 transition-colors">
            POSTHUMAN
          </span>
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.32em] font-bold text-carbon-900 leading-none mt-1 uppercase">
            Lab Network
          </span>
        </Link>

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
                    isActive ? "text-earth-600 font-bold" : "text-carbon-900 font-semibold hover:text-earth-600"
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
                    className={`flex items-center space-x-1 px-4 py-2 text-sm font-sans tracking-wide uppercase transition-all duration-300 rounded-full focus:outline-none ${
                      isDropdownActive
                        ? "text-earth-600 bg-bone-50/92 border border-carbon-950/8"
                        : "text-carbon-950 hover:bg-bone-50/80"
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isDropdownActive ? "rotate-180 text-earth-600" : "text-carbon-700/60"
                      }`}
                    />
                  </button>
                </div>
              );
            })
          )}
        </nav>

        <div className="flex items-center space-x-3">
          {!isAdmin && (
            <button
              onClick={openLoginModal}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-mono tracking-[0.18em] uppercase text-carbon-700 hover:text-earth-600 border border-carbon-950/10 hover:border-earth-500/40 rounded-full transition-colors cursor-pointer bg-bone-50/65"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>
          )}

          <Link
            href="/membership/become-a-member"
            onClick={() => setActiveGroup(null)}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-sans tracking-widest uppercase font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-earth-500/40 ${
              pathname === "/"
                ? "text-carbon-950 border border-carbon-950/15 bg-bone-50/70 hover:border-earth-500 hover:text-earth-600"
                : "text-bone-50 bg-carbon-950 hover:bg-earth-600 hover:text-bone-50"
            }`}
          >
            Join the Network
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-2 text-carbon-950 hover:text-earth-600 focus:outline-none rounded-md hover:bg-bone-50/80"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeGroup && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-full left-0 right-0 bg-bone-50/92 backdrop-blur-xl border-b border-carbon-950/8 shadow-[0_28px_70px_-36px_rgba(23,20,18,0.32)] overflow-hidden z-40"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="editorial-container py-12 grid grid-cols-12 gap-8">
              <div className="col-span-4 border-r border-carbon-950/10 pr-8">
                {navigationConfig.map((group) => {
                  if (group.label !== activeGroup) return null;
                  return (
                    <div key={group.label} className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs text-earth-600 font-bold uppercase tracking-widest">{group.number}</span>
                        <div className="h-[1px] w-8 bg-earth-500/40" />
                      </div>
                      <h2 className="font-serif text-4xl font-bold tracking-tight text-carbon-950">
                        {group.label.toUpperCase()}
                      </h2>
                      <p className="text-sm text-carbon-900 leading-relaxed font-sans max-w-xs font-medium">
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
                      className="group flex flex-col justify-between p-5 rounded-[24px] bg-white hover:bg-bone-50/80 border border-carbon-950/10 hover:border-earth-600 shadow-sm transition-all duration-300"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-xl font-bold text-carbon-950 group-hover:text-earth-600 transition-colors">
                            {item.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-carbon-950 group-hover:text-earth-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-xs text-carbon-900 leading-relaxed font-sans pr-4 font-medium">
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-bone-50/98 backdrop-blur-xl border-t border-carbon-950/10 overflow-y-auto z-40"
          >
            <div className="editorial-container py-8 space-y-6">
              {navigationConfig.map((group) => (
                <MobileAccordionGroup
                  key={group.label}
                  group={group}
                  onClose={() => setIsOpen(false)}
                />
              ))}

              <div className="pt-6 border-t border-carbon-950/10 flex flex-col space-y-4">
                <Link
                  href="/membership/become-a-member"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-sm font-sans tracking-widest uppercase font-bold text-bone-50 bg-carbon-950 hover:bg-earth-600 transition-colors rounded-full shadow-md"
                >
                  Join the Network
                </Link>

                <div className="flex justify-center space-x-6 text-xs tracking-wider uppercase font-mono text-carbon-900 font-bold">
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
    <div className="border-b border-carbon-950/10 pb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 text-left focus:outline-none"
      >
        <div className="space-y-1">
          <span className="font-mono text-xs text-earth-600 tracking-wider uppercase font-bold block">{group.number}</span>
          <span className="font-serif text-2xl font-bold text-carbon-950">{group.label}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-carbon-950 transition-transform duration-300 ${
            isExpanded ? "rotate-180 text-earth-600" : ""
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
                  <span className="font-sans text-sm font-bold text-carbon-950 group-hover:text-earth-600 transition-colors">
                    {item.label}
                  </span>
                  <span className="font-sans text-xs text-carbon-900 pr-4 leading-relaxed font-medium">
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
