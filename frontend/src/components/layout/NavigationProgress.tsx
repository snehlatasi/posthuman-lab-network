"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const finish = () => {
      setIsNavigating(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const currentPath = `${window.location.pathname}${window.location.search}`;
      const nextPath = `${url.pathname}${url.search}`;
      if (nextPath === currentPath && url.hash) return;
      if (nextPath === currentPath) return;

      setIsNavigating(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsNavigating(false), 2400);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("pageshow", finish);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("pageshow", finish);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsNavigating(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`fixed left-0 top-0 z-[120] h-0.5 bg-earth-500 shadow-[0_0_18px_rgba(152,78,50,0.55)] transition-all duration-500 ${
        isNavigating ? "w-2/3 opacity-100" : "w-0 opacity-0"
      }`}
    />
  );
}
