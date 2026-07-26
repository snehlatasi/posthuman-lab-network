"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: coarse), (max-width: 767px)";

function isConstrainedDevice() {
  if (typeof navigator === "undefined") return false;

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;

  return memory <= 4 || cores <= 4;
}

function getSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia(QUERY).matches || isConstrainedDevice();
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

export function useMobilePerformanceMode() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
