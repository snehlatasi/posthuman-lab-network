import { noiseShader } from "../common/noise";

export const nebulaVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const nebulaFragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uOpacity;
uniform float uAspect;
uniform vec2 uPointer;
uniform float uScroll;
uniform vec3 uVoid;
uniform vec3 uNebulaA;
uniform vec3 uNebulaB;
uniform vec3 uCyan;
uniform vec3 uRose;

varying vec2 vUv;

${noiseShader}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= uAspect;

  vec2 pointer = vec2(uPointer.x * uAspect, uPointer.y);
  float radius = length(uv);
  float t = uTime * 0.045;

  vec3 p = vec3(uv * 1.15, t + uScroll * 0.55);
  float field = fbm(p + curlNoise(vec3(uv * 0.65, t)) * 0.58);
  float veil = fbm(vec3(uv * 2.1 + pointer * 0.18, t * 1.7));
  float plasma = smoothstep(-0.28, 0.82, field + veil * 0.52 - radius * 0.18);

  float coreMist = exp(-radius * 1.75);
  float cursorLens = exp(-length(uv - pointer) * 4.2) * 0.18;
  float vignette = smoothstep(1.35, 0.15, radius);

  vec3 color = mix(uVoid, uNebulaA, plasma * 0.58);
  color = mix(color, uNebulaB, smoothstep(0.08, 0.85, veil) * 0.46);
  color += uCyan * pow(max(plasma, 0.0), 2.4) * 0.28;
  color += uRose * pow(max(veil, 0.0), 2.9) * 0.18;
  color += (uCyan + uRose) * coreMist * 0.1;
  color += uCyan * cursorLens;

  float alpha = uOpacity * vignette;
  gl_FragColor = vec4(color, alpha);
}
`;
