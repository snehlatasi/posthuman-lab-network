import { noiseShader } from "../common/noise";

export const flowerVertexShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uScale;
uniform float uTurbulence;
uniform vec2 uPointer;
uniform float uScroll;
uniform float uScrollVelocity;
uniform float uPointerEnergy;

attribute float aPetal;
attribute float aSeed;
varying vec2 vUv;
varying float vPetal;
varying float vSeed;
varying float vPulse;
varying float vEnergy;

${noiseShader}

void main() {
  vUv = uv;
  vPetal = aPetal;
  vSeed = aSeed;

  vec3 transformed = position;
  float petalPhase = aPetal * 0.61803398875;
  float y = clamp(uv.y, 0.0, 1.0);
  float x = uv.x * 2.0 - 1.0;
  float petalBody = sin(y * 3.14159265);
  float breath = sin(uTime * 0.54 + petalPhase * 8.0) * 0.055;
  float opening = sin(uTime * 0.36 + petalPhase * 11.0) * 0.5 + 0.5;
  float ripple = snoise(vec3(position.xy * 1.12, uTime * 0.14 + aSeed * 9.0));
  float edgeLift = pow(abs(uv.x - 0.5) * 2.0, 1.45);
  float cosmicWave = sin(uTime * 1.05 + y * 7.0 + petalPhase * 13.0) * petalBody;
  float scrollEnergy = uScrollVelocity * (0.05 + petalBody * 0.12);
  float pointerPull = length(uPointer) * 0.08 + uPointerEnergy * 0.08;

  transformed.x *=
    1.0 + petalBody * (0.12 * opening + breath * 0.5 + scrollEnergy + uPointerEnergy * 0.06);
  transformed.y *= 1.0 + breath + ripple * 0.018 * uTurbulence + pointerPull + scrollEnergy;
  transformed.xy *= uScale;
  transformed.z += ripple * 0.08 + edgeLift * sin(uTime * 0.3 + petalPhase * 12.0) * 0.055;
  transformed.z += cosmicWave * (0.12 + uPointerEnergy * 0.06) +
    pow(abs(x), 1.8) * petalBody * (0.08 + opening * 0.12 + uPointerEnergy * 0.06);
  transformed.z += uScroll * 0.2 + uScrollVelocity * petalBody * 0.18;

  vPulse = breath + ripple * 0.3 + cosmicWave * 0.18;
  vEnergy = opening + uScrollVelocity + uPointerEnergy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

export const flowerFragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uCyan;
uniform vec3 uRose;
uniform vec3 uViolet;
uniform float uGlow;
uniform float uReduced;

varying vec2 vUv;
varying float vPetal;
varying float vSeed;
varying float vPulse;
varying float vEnergy;

${noiseShader}

void main() {
  float y = clamp(vUv.y, 0.0, 1.0);
  float x = vUv.x * 2.0 - 1.0;
  float aliveRound = 0.035 * sin(uTime * 0.82 + y * 4.2 + vPetal * 12.0);
  float leafWidth = pow(sin(y * 3.14159265), 0.82) * (0.54 + aliveRound);
  leafWidth *= mix(0.52, 1.08, smoothstep(0.02, 0.48, y));
  float body = smoothstep(leafWidth + 0.055, leafWidth - 0.035, abs(x));
  body *= smoothstep(0.0, 0.055, y) * smoothstep(1.0, 0.84, y);

  float edgeDistance = abs(abs(x) - leafWidth);
  float rim = exp(-edgeDistance * 28.0) * body;
  float midrib = exp(-abs(x) * 26.0) * smoothstep(0.02, 0.25, y) * smoothstep(1.0, 0.42, y);
  float filaments = pow(1.0 - abs(sin((x * 5.0 + y * 11.0) + vPetal * 17.0)), 8.0);
  filaments *= smoothstep(0.18, 0.92, y) * body;

  float veins = fbm(vec3(vec2(x * 2.6, y * 4.2), uTime * 0.08 + vPetal * 4.0));
  float energyVeins = pow(1.0 - abs(sin(y * 13.0 - uTime * 1.8 + vPetal * 8.0)), 11.0) * body;
  float shimmer = smoothstep(
    0.38,
    1.0,
    veins + filaments * 0.65 + rim * 1.1 + midrib * 0.75 + energyVeins * 0.55
  );
  float roseBand = smoothstep(0.18, 0.94, sin(vPetal * 44.0 + y * 2.4) * 0.5 + 0.5);
  vec3 color = mix(uCyan, uRose, roseBand * 0.5);
  color = mix(color, uViolet, smoothstep(-0.2, 0.8, veins) * 0.24);

  float alpha = body * (0.028 + shimmer * 0.11 + rim * 0.22 + midrib * 0.13 + energyVeins * 0.08) * uGlow;
  alpha *= mix(1.0, 0.45, uReduced);
  vec3 emissive = color * (0.38 + shimmer * 1.1 + rim * 2.0 + midrib * 1.25 + vPulse * 0.16 + vEnergy * 0.12);

  gl_FragColor = vec4(emissive, alpha);
}
`;
