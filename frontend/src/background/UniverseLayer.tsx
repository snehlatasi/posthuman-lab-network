"use client";

import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { AnimatedUniverse } from "./AnimatedUniverse";
import { StaticUniverseFallback } from "./StaticUniverseFallback";
import { logWarning } from "@/lib/logger";

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
      return <StaticUniverseFallback />;
    }

    return this.props.children;
  }
}

export function UniverseLayer() {
  return (
    <UniverseErrorBoundary>
      <AnimatedUniverse />
    </UniverseErrorBoundary>
  );
}