export interface UniversePalette {
  void: string;
  nebulaA: string;
  nebulaB: string;
  cyan: string;
  violet: string;
  rose: string;
  white: string;
  moss: string;
  amber: string;
}

export interface KnowledgeNetworkConfig {
  arcCount: number;
  lowPowerArcCount: number;
  nodeCount: number;
  lowPowerNodeCount: number;
  pulseCount: number;
  lowPowerPulseCount: number;
  arcBaseRadius: number;
  arcRadiusStep: number;
  nodeBaseRadius: number;
  pulseBaseRadius: number;
}

export interface UniverseConfig {
  particleCount: number;
  mobileParticleCount: number;
  reducedMotionParticleCount: number;
  dustCount: number;
  streamCount: number;
  streamSegments: number;
  bloomIntensity: number;
  animationSpeed: number;
  turbulence: number;
  glowIntensity: number;
  backgroundOpacity: number;
  mouseSensitivity: number;
  flowerScale: number;
  pulseFrequency: number;
  energyEmission: number;
  maxDpr: number;
  lowPowerMaxDpr: number;
  palette: UniversePalette;
  knowledgeNetwork: KnowledgeNetworkConfig;
}

export const universeConfig: UniverseConfig = {
  particleCount: 3200,
  mobileParticleCount: 900,
  reducedMotionParticleCount: 700,
  dustCount: 900,
  streamCount: 14,
  streamSegments: 72,
  bloomIntensity: 2.8,
  animationSpeed: 0.74,
  turbulence: 0.52,
  glowIntensity: 2.85,
  backgroundOpacity: 0.88,
  mouseSensitivity: 0.28,
  flowerScale: 2.05,
  pulseFrequency: 0.92,
  energyEmission: 3.2,
  maxDpr: 1.35,
  lowPowerMaxDpr: 1,
  palette: {
    void: "#020713",
    nebulaA: "#061b38",
    nebulaB: "#1f153f",
    cyan: "#45ecff",
    violet: "#7c7dff",
    rose: "#ff79cf",
    white: "#ffffff",
    moss: "#9cb394",
    amber: "#e0b86c",
  },
  knowledgeNetwork: {
    arcCount: 5,
    lowPowerArcCount: 3,
    nodeCount: 8,
    lowPowerNodeCount: 6,
    pulseCount: 7,
    lowPowerPulseCount: 4,
    arcBaseRadius: 2.35,
    arcRadiusStep: 0.34,
    nodeBaseRadius: 2.56,
    pulseBaseRadius: 2.22,
  },
};
