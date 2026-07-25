export interface UniversePalette {
  void: string;
  nebulaA: string;
  nebulaB: string;
  cyan: string;
  violet: string;
  rose: string;
  white: string;
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
}

export const universeConfig: UniverseConfig = {
  particleCount: 4600,
  mobileParticleCount: 2200,
  reducedMotionParticleCount: 700,
  dustCount: 1300,
  streamCount: 18,
  streamSegments: 96,
  bloomIntensity: 2.8,
  animationSpeed: 0.74,
  turbulence: 0.52,
  glowIntensity: 2.85,
  backgroundOpacity: 0.88,
  mouseSensitivity: 0.28,
  flowerScale: 2.05,
  pulseFrequency: 0.92,
  energyEmission: 3.2,
  maxDpr: 1.65,
  lowPowerMaxDpr: 1,
  palette: {
    void: "#020713",
    nebulaA: "#061b38",
    nebulaB: "#1f153f",
    cyan: "#45ecff",
    violet: "#7c7dff",
    rose: "#ff79cf",
    white: "#ffffff",
  },
};
