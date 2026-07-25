import { noiseShader } from "../common/noise";

export const streamVertexShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uMouse;
uniform float uScroll;
uniform float uRotation;

attribute float aStream;
attribute float aProgress;
attribute float aSeed;

varying float vProgress;
varying float vStream;
varying float vGlow;

${noiseShader}

void main() {
  float streamPhase = aStream * 0.37 + aSeed * 5.0;
  float t = uTime * (0.07 + aSeed * 0.018) + streamPhase;
  float angle = aProgress * 6.2831853 * (1.05 + aSeed * 0.24) + t + uRotation;
  float radius = 1.35 + aStream * 0.058 + sin(aProgress * 9.0 + t * 2.0) * 0.12;
  radius += fbm(vec3(aProgress * 2.8, aSeed * 4.0, uTime * 0.08)) * 0.24;

  vec3 p = vec3(cos(angle) * radius, sin(angle) * radius * 0.62, 0.0);
  p.z = sin(angle * 1.8 + streamPhase) * 0.48 + uScroll * 0.48;
  p.xy += curlNoise(vec3(p.xy * 0.45, t)).xy * 0.32;
  p.xy *= 1.0 + uMouse * 0.04;

  vProgress = aProgress;
  vStream = aStream;
  vGlow = 0.45 + 0.55 * sin(aProgress * 3.14159);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

export const streamFragmentShader = /* glsl */ `
precision highp float;

uniform vec3 uCyan;
uniform vec3 uRose;
uniform vec3 uViolet;

varying float vProgress;
varying float vStream;
varying float vGlow;

void main() {
  vec3 color = mix(uCyan, uRose, fract(vStream * 0.19));
  color = mix(color, uViolet, smoothstep(0.35, 0.95, sin(vProgress * 6.2831853) * 0.5 + 0.5));
  float alpha = smoothstep(0.0, 0.16, vProgress) * smoothstep(1.0, 0.78, vProgress) * vGlow;
  gl_FragColor = vec4(color * (1.1 + vGlow), alpha * 0.2);
}
`;
