"use client";

import dynamic from "next/dynamic";
import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { StaticUniverseFallback } from "./StaticUniverseFallback";
import { useMobilePerformanceMode } from "@/hooks/useMobilePerformanceMode";
import { logWarning } from "@/lib/logger";

const AnimatedUniverse = dynamic(
  () => import("./AnimatedUniverse").then((module) => module.AnimatedUniverse),
  {
    ssr: false,
    loading: () => <StaticUniverseFallback animated />,
  }
);

class UniverseErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logWarning("Universe background disabled: React boundary caught an error.", {
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return <StaticUniverseFallback animated />;
    }

    return this.props.children;
  }
}

export function UniverseLayer() {
  const mobilePerformanceMode = useMobilePerformanceMode();

  if (mobilePerformanceMode) {
    return <StaticUniverseFallback animated />;
  }

  return (
    <UniverseErrorBoundary>
      <AnimatedUniverse />
    </UniverseErrorBoundary>
  );
}
