"use client";

import dynamic from "next/dynamic";
import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { StaticUniverseFallback } from "./StaticUniverseFallback";

const AnimatedUniverse = dynamic(
  () => import("./AnimatedUniverse").then((module) => module.AnimatedUniverse),
  {
    ssr: false,
    loading: () => <StaticUniverseFallback />,
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
    console.warn("Universe background disabled: React boundary caught an error.", {
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
