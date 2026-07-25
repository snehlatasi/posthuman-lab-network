import type { UniverseConfig } from "./config/animation";

export interface PointerState {
  x: number;
  y: number;
  velocity: number;
}

export interface ScrollState {
  progress: number;
  velocity: number;
}

export interface UniverseRuntime {
  config: UniverseConfig;
  reducedMotion: boolean;
  lowPower: boolean;
  pointer: PointerState;
  scroll: ScrollState;
}
