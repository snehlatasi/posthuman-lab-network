import { noiseShader } from "../common/noise";

export const particleVertexShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uPixelRatio;
uniform float uTurbulence;
uniform float uEnergy;
uniform vec2 uPointer;
uniform float uScroll;

attribute vec3 aVelocity;
attribute float aSeed;
attribute float aLife;
attribute float aSize;
attribute float aType;
attribute vec3 aColor;

varying vec3 vColor;
varying float vAlpha;
varying float vType;

${noiseShader}

void main() {
  float age = fract(uTime / aLife + aSeed);
  float fadeIn = smoothstep(0.0, 0.12, age);
  float fadeOut = smoothstep(1.0, 0.72, age);
  float lifeAlpha = fadeIn * fadeOut;

  vec3 p = position + aVelocity * (age - 0.5) * aLife * 0.28;
  vec3 curl = curlNoise(p * 0.34 + vec3(aSeed * 8.0, uTime * 0.08, -uTime * 0.05));
  p += curl * uTurbulence * (0.28 + aType * 0.07);

  float coreDistance = length(p.xy);
  float gravity = exp(-coreDistance * 0.9) * uEnergy;
  p.xy += normalize(p.xy + 0.0001) * sin(uTime * 1.4 + aSeed * 18.0) * gravity * 0.1;

  vec2 pointer = uPointer * vec2(7.0, 4.0);
  float cursorDistance = length(p.xy - pointer);
  p.xy += normalize(pointer - p.xy + 0.0001) * exp(-cursorDistance * 0.5) * 0.18;
  p.z += uScroll * (0.4 + aType * 0.14);

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  float depthFade = smoothstep(18.0, 2.0, -mvPosition.z);

  gl_PointSize = aSize * uPixelRatio * (280.0 / max(-mvPosition.z, 0.8));
  gl_Position = projectionMatrix * mvPosition;

  vColor = aColor;
  vAlpha = lifeAlpha * depthFade;
  vType = aType;
}
`;

export const particleFragmentShader = /* glsl */ `
precision highp float;

varying vec3 vColor;
varying float vAlpha;
varying float vType;

void main() {
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float radius = dot(uv, uv);
  float soft = exp(-radius * mix(3.8, 9.0, step(2.5, vType)));
  float spark = smoothstep(0.92, 0.05, radius);
  vec3 color = vColor * (0.6 + soft * 1.8 + spark * 0.4);

  gl_FragColor = vec4(color, vAlpha * soft);
}
`;
