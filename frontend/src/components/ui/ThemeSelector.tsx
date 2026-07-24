"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, ThemePreference } from "@/context/ThemeContext";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";

interface ThemeSelectorProps {
  variant?: "dropdown" | "pills" | "compact";
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ variant = "pills", className = "" }) => {
  const { theme, setTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const options: { value: ThemePreference; label: string; icon: React.ReactNode }[] = [
    { value: "system", label: "System", icon: <Monitor className="w-3 h-3 2xl:w-3.5 2xl:h-3.5" /> },
    { value: "light", label: "Light", icon: <Sun className="w-3 h-3 2xl:w-3.5 2xl:h-3.5" /> },
    { value: "dark", label: "Dark", icon: <Moon className="w-3 h-3 2xl:w-3.5 2xl:h-3.5" /> },
  ];

  if (!mounted) {
    return (
      <div className={`h-7 w-20 bg-carbon-950/5 dark:bg-bone-50/5 rounded-full animate-pulse ${className}`} />
    );
  }

  if (variant === "pills") {
    return (
      <div 
        className={`inline-flex items-center p-0.5 rounded-full bg-bone-100/90 dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 shadow-sm backdrop-blur-md shrink-0 ${className}`}
        role="radiogroup"
        aria-label="Theme preference selector"
      >
        {options.map((opt) => {
          const isActive = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`Set theme to ${opt.label}`}
              onClick={() => setTheme(opt.value)}
              className={`inline-flex items-center justify-center px-1.5 py-1 2xl:px-2 text-[9px] 2xl:text-[10px] font-sans font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-earth-500 gap-1 ${
                isActive
                  ? "bg-earth-600 dark:bg-earth-500 text-bone-50 shadow-sm"
                  : "text-carbon-800 dark:text-bone-200 hover:text-earth-600 dark:hover:text-earth-400 hover:bg-bone-200/50 dark:hover:bg-carbon-800/60"
              }`}
              title={`Switch to ${opt.label} theme`}
            >
              {opt.icon}
              <span className="inline text-[9px] 2xl:text-[10px]">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "compact") {
    const activeOpt = options.find((o) => o.value === theme) || options[0];
    return (
      <div className={`relative inline-block text-left shrink-0 ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-1.5 text-carbon-950 dark:text-bone-100 hover:text-earth-600 dark:hover:text-earth-400 border border-carbon-950/10 dark:border-bone-50/15 bg-bone-100/90 dark:bg-carbon-900/90 rounded-full focus:outline-none transition-colors backdrop-blur-md cursor-pointer"
          aria-expanded={isOpen}
          aria-label={`Current theme: ${activeOpt.label}. Click to change theme`}
          title={`Theme: ${activeOpt.label}`}
        >
          {activeOpt.icon}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-32 rounded-2xl bg-bone-50 dark:bg-carbon-950 border border-carbon-950/10 dark:border-bone-50/15 shadow-xl py-1.5 z-50 backdrop-blur-xl">
            {options.map((opt) => {
              const isActive = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setTheme(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-1.5 text-xs font-sans font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? "text-earth-600 dark:text-earth-400 font-bold bg-earth-500/10"
                      : "text-carbon-800 dark:text-bone-200 hover:bg-carbon-950/5 dark:hover:bg-bone-50/5"
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const activeOpt = options.find((o) => o.value === theme) || options[0];
  return (
    <div className={`relative inline-block text-left shrink-0 ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-1.5 px-3 py-1 text-xs font-sans font-semibold uppercase tracking-wider text-carbon-950 dark:text-bone-100 bg-bone-100/90 dark:bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 rounded-full hover:border-earth-500 focus:outline-none transition-all duration-200 shadow-sm backdrop-blur-md cursor-pointer"
        aria-expanded={isOpen}
      >
        {activeOpt.icon}
        <span className="text-[11px]">{activeOpt.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180 text-earth-600" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-2xl bg-bone-50/95 dark:bg-carbon-950/95 border border-carbon-950/10 dark:border-bone-50/15 shadow-xl py-1.5 z-50 backdrop-blur-xl">
          {options.map((opt) => {
            const isActive = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setTheme(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? "text-earth-600 dark:text-earth-400 font-bold bg-earth-500/10"
                    : "text-carbon-800 dark:text-bone-200 hover:bg-carbon-950/5 dark:hover:bg-bone-50/5"
                }`}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
