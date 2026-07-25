import * as THREE from "three";
import type { UniverseConfig } from "./config/animation";
import type { PointerState, ScrollState } from "./types";
import { nebulaFragmentShader, nebulaVertexShader } from "./shaders/background/nebula";
import { flowerFragmentShader, flowerVertexShader } from "./shaders/flower/flower";
import { particleFragmentShader, particleVertexShader } from "./shaders/particles/particles";
import { streamFragmentShader, streamVertexShader } from "./shaders/streams/streams";

interface RendererOptions {
  canvas: HTMLCanvasElement;
  config: UniverseConfig;
  pointer: PointerState;
  scroll: ScrollState;
  reducedMotion: boolean;
  lowPower: boolean;
}

const PETAL_COUNT = 42;

interface PetalMeshState {
  mesh: THREE.Mesh;
  baseAngle: number;
  baseScale: number;
  layer: number;
  seed: number;
}

function seeded(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function createParticleGeometry(count: number, colors: string[]) {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const colorAttr = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const lives = new Float32Array(count);
  const sizes = new Float32Array(count);
  const types = new Float32Array(count);
  const palette = colors.map((color) => new THREE.Color(color));

  for (let i = 0; i < count; i++) {
    const radius = 1.1 + Math.pow(seeded(i + 1.5), 0.5) * 10.5;
    const angle = seeded(i + 7.2) * Math.PI * 2 + radius * 0.18;
    positions.set(
      [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * (0.56 + seeded(i + 2.2) * 0.45),
        (seeded(i + 4.8) - 0.5) * 9,
      ],
      i * 3
    );
    velocities.set(
      [
        (seeded(i + 9.3) - 0.5) * 1.9,
        (seeded(i + 12.7) - 0.5) * 1.4,
        (seeded(i + 16.1) - 0.5) * 2.2,
      ],
      i * 3
    );

    const color = palette[Math.floor(seeded(i + 21.4) * palette.length)];
    const whiteMix = seeded(i + 24.1) * 0.32;
    colorAttr.set(
      [
        color.r + (1 - color.r) * whiteMix,
        color.g + (1 - color.g) * whiteMix,
        color.b + (1 - color.b) * whiteMix,
      ],
      i * 3
    );

    seeds[i] = seeded(i + 31.1);
    lives[i] = 5.5 + seeded(i + 33.7) * 13;
    sizes[i] = 0.015 + Math.pow(seeded(i + 41.2), 2.8) * 0.115;
    types[i] = Math.floor(seeded(i + 48.8) * 5);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aVelocity", new THREE.BufferAttribute(velocities, 3));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colorAttr, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aLife", new THREE.BufferAttribute(lives, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aType", new THREE.BufferAttribute(types, 1));
  return geometry;
}

function createStreamGeometry(streamCount: number, segments: number) {
  const vertexCount = streamCount * (segments - 1) * 2;
  const positions = new Float32Array(vertexCount * 3);
  const streams = new Float32Array(vertexCount);
  const progress = new Float32Array(vertexCount);
  const seeds = new Float32Array(vertexCount);
  let cursor = 0;

  for (let stream = 0; stream < streamCount; stream++) {
    const seed = seeded(stream + 61.7);
    for (let segment = 0; segment < segments - 1; segment++) {
      for (const value of [segment / (segments - 1), (segment + 1) / (segments - 1)]) {
        positions.set([0, 0, 0], cursor * 3);
        streams[cursor] = stream;
        progress[cursor] = value;
        seeds[cursor] = seed;
        cursor++;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aStream", new THREE.BufferAttribute(streams, 1));
  geometry.setAttribute("aProgress", new THREE.BufferAttribute(progress, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

function createPetalGeometry(index: number) {
  const geometry = new THREE.PlaneGeometry(0.92, 1.52, 24, 52);
  geometry.translate(0, 0.58, 0);

  const count = geometry.attributes.position.count;
  const petals = new Float32Array(count);
  const seeds = new Float32Array(count);
  petals.fill(index / PETAL_COUNT);
  seeds.fill(seeded(index + 81.3));
  geometry.setAttribute("aPetal", new THREE.BufferAttribute(petals, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

export class UniverseRenderer {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly screenScene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80);
  private readonly screenCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly clock = new THREE.Clock();
  private readonly disposables: Array<{ dispose: () => void }> = [];
  private animationId: number | null = null;
  private visible = true;
  private reducedMotion: boolean;
  private readonly lowPower: boolean;
  private readonly pointer: PointerState;
  private readonly scroll: ScrollState;
  private readonly config: UniverseConfig;
  private readonly nebulaMaterial: THREE.ShaderMaterial;
  private readonly flowerMaterials: THREE.ShaderMaterial[] = [];
  private readonly particleMaterial: THREE.ShaderMaterial;
  private readonly streamMaterial: THREE.ShaderMaterial;
  private readonly coreMaterial: THREE.ShaderMaterial;
  private readonly corneaMaterial: THREE.ShaderMaterial;
  private readonly coreLight: THREE.PointLight;
  private readonly root = new THREE.Group();
  private readonly outlineGroup = new THREE.Group();
  private readonly petalMeshes: PetalMeshState[] = [];
  private readonly outlineMaterials: THREE.ShaderMaterial[] = [];
  private readonly waveMaterials: THREE.ShaderMaterial[] = [];

  constructor(options: RendererOptions) {
    this.config = options.config;
    this.pointer = options.pointer;
    this.scroll = options.scroll;
    this.reducedMotion = options.reducedMotion;
    this.lowPower = options.lowPower;

    this.renderer = new THREE.WebGLRenderer({
      canvas: options.canvas,
      alpha: false,
      antialias: !options.lowPower,
      depth: true,
      stencil: false,
      powerPreference: "high-performance",
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = options.lowPower ? 0.96 : 1.15;
    this.renderer.setClearColor(new THREE.Color(this.config.palette.void), 1);

    this.camera.position.set(0, 0, 7.6);
    this.scene.add(this.root);

    this.nebulaMaterial = this.createNebula();
    this.createDust();
    this.createRays();
    this.streamMaterial = this.createStreams();
    this.createFlower();
    this.createEnergyWaves();
    const core = this.createCore();
    this.coreMaterial = core.material;
    this.corneaMaterial = core.corneaMaterial;
    this.coreLight = core.light;
    this.particleMaterial = this.createParticles();

    this.resize();
    window.addEventListener("resize", this.resize);
  }

  setReducedMotion(value: boolean) {
    this.reducedMotion = value;
  }

  setVisible(value: boolean) {
    this.visible = value;
    if (value) {
      if (this.animationId === null) this.start();
      return;
    }

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  start() {
    if (this.animationId !== null || !this.visible) return;
    const tick = () => {
      if (!this.visible) return;
      this.render();
      this.animationId = requestAnimationFrame(tick);
    };
    this.animationId = requestAnimationFrame(tick);
  }

  dispose() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
    this.animationId = null;
    window.removeEventListener("resize", this.resize);
    this.disposables.forEach((item) => item.dispose());
    this.renderer.dispose();
  }

  private readonly resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxDpr = this.lowPower ? this.config.lowPowerMaxDpr : this.config.maxDpr;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / Math.max(height, 1);
    this.camera.updateProjectionMatrix();
    this.nebulaMaterial.uniforms.uAspect.value = this.camera.aspect;
  };

  private render() {
    const t =
      this.clock.getElapsedTime() * this.config.animationSpeed * (this.reducedMotion ? 0.08 : 1);

    this.camera.position.x = THREE.MathUtils.lerp(
      this.camera.position.x,
      this.pointer.x * this.config.mouseSensitivity,
      0.035
    );
    this.camera.position.y = THREE.MathUtils.lerp(
      this.camera.position.y,
      this.pointer.y * this.config.mouseSensitivity * 0.58,
      0.035
    );
    this.camera.position.z = THREE.MathUtils.lerp(
      this.camera.position.z,
      7.6 - this.scroll.progress * 1.15,
      0.025
    );
    this.camera.lookAt(0, 0, 0);

    const pointerEnergy = Math.min(
      1,
      this.pointer.velocity * 0.9 + Math.hypot(this.pointer.x, this.pointer.y) * 0.75
    );
    const scrollSurge = Math.min(1, Math.abs(this.scroll.velocity) * 9.5);
    this.pointer.velocity *= 0.9;
    this.scroll.velocity *= 0.88;

    this.root.rotation.z =
      t * 0.045 + Math.sin(t * 0.24) * 0.026 + this.scroll.progress * 0.12 + pointerEnergy * 0.025;
    this.root.rotation.x = this.pointer.y * 0.045 + this.scroll.progress * 0.04;
    this.root.rotation.y = this.pointer.x * 0.055 + Math.sin(t * 0.18) * 0.035;
    this.outlineGroup.rotation.z =
      Math.sin(t * 0.52) * 0.105 + scrollSurge * 0.12 + pointerEnergy * 0.08;
    this.outlineGroup.scale.setScalar(
      1 + Math.sin(t * 1.1) * 0.045 + scrollSurge * 0.07 + pointerEnergy * 0.04
    );

    this.petalMeshes.forEach(({ mesh, baseAngle, baseScale, layer, seed }) => {
      const independentBreath = Math.sin(t * (0.62 + layer * 0.08) + baseAngle * 2.0);
      const cosmicPull = Math.sin(t * 0.28 + layer * 1.7) * Math.cos(t * 0.22 + baseAngle);
      const hoverWave = Math.sin(t * 2.8 + seed * 21.0) * pointerEnergy;
      const unfurl =
        1 + independentBreath * 0.075 + cosmicPull * 0.045 + scrollSurge * 0.1 + hoverWave * 0.06;
      const round = 1 + Math.cos(t * (0.54 + layer * 0.07) + baseAngle) * 0.05;
      mesh.rotation.z =
        baseAngle +
        Math.sin(t * (0.35 + layer * 0.06) + baseAngle * 1.5) * 0.045 +
        scrollSurge * 0.08 +
        hoverWave * 0.04;
      mesh.rotation.x =
        0.06 +
        layer * 0.06 +
        Math.sin(t * (0.42 + layer * 0.06) + baseAngle) * 0.08 +
        scrollSurge * 0.08 +
        pointerEnergy * 0.04;
      mesh.rotation.y =
        Math.cos(t * (0.44 + layer * 0.05) + baseAngle) * 0.07 + this.pointer.x * 0.045;
      mesh.scale.set(baseScale * round, baseScale * unfurl * (layer === 0 ? 1.12 : 0.98), 1);
    });

    this.nebulaMaterial.uniforms.uTime.value = t;
    this.nebulaMaterial.uniforms.uPointer.value.set(this.pointer.x, this.pointer.y);
    this.nebulaMaterial.uniforms.uScroll.value = this.scroll.progress;

    this.flowerMaterials.forEach((material) => {
      material.uniforms.uTime.value = t;
      material.uniforms.uPointer.value.set(this.pointer.x, this.pointer.y);
      material.uniforms.uScroll.value = this.scroll.progress;
      material.uniforms.uScrollVelocity.value = scrollSurge;
      material.uniforms.uPointerEnergy.value = pointerEnergy;
      material.uniforms.uReduced.value = this.reducedMotion ? 1 : 0;
    });

    this.outlineMaterials.forEach((material) => {
      material.uniforms.uTime.value = t;
      material.uniforms.uScrollVelocity.value = scrollSurge;
      material.uniforms.uPointerEnergy.value = pointerEnergy;
    });

    this.waveMaterials.forEach((material) => {
      material.uniforms.uTime.value = t;
      material.uniforms.uScrollVelocity.value = scrollSurge;
      material.uniforms.uPointerEnergy.value = pointerEnergy;
    });

    this.particleMaterial.uniforms.uTime.value = t;
    this.particleMaterial.uniforms.uPixelRatio.value = this.renderer.getPixelRatio();
    this.particleMaterial.uniforms.uPointer.value.set(this.pointer.x, this.pointer.y);
    this.particleMaterial.uniforms.uScroll.value = this.scroll.progress;
    this.particleMaterial.uniforms.uTurbulence.value = this.reducedMotion
      ? 0.18
      : this.config.turbulence;

    this.streamMaterial.uniforms.uTime.value = t;
    this.streamMaterial.uniforms.uMouse.value = this.pointer.velocity;
    this.streamMaterial.uniforms.uScroll.value = this.scroll.progress;
    this.streamMaterial.uniforms.uRotation.value = this.scroll.progress * 0.55;

    this.coreMaterial.uniforms.uTime.value = t;
    this.coreMaterial.uniforms.uPointerEnergy.value = pointerEnergy;
    this.coreMaterial.uniforms.uScrollVelocity.value = scrollSurge;
    this.corneaMaterial.uniforms.uTime.value = t;
    this.corneaMaterial.uniforms.uPointerEnergy.value = pointerEnergy;
    this.corneaMaterial.uniforms.uScrollVelocity.value = scrollSurge;
    this.coreLight.intensity =
      this.config.energyEmission *
      (this.reducedMotion
        ? 1.2
        : 3.2 + Math.sin(t * 3.8) * 1.05 + pointerEnergy * 1.7 + scrollSurge * 1.4);

    this.renderer.autoClear = true;
    this.renderer.render(this.screenScene, this.screenCamera);
    this.renderer.autoClear = false;
    this.renderer.render(this.scene, this.camera);
  }

  private createNebula() {
    const palette = this.config.palette;
    const material = new THREE.ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: this.config.backgroundOpacity },
        uAspect: { value: 1 },
        uPointer: { value: new THREE.Vector2() },
        uScroll: { value: 0 },
        uVoid: { value: new THREE.Color(palette.void) },
        uNebulaA: { value: new THREE.Color(palette.nebulaA) },
        uNebulaB: { value: new THREE.Color(palette.nebulaB) },
        uCyan: { value: new THREE.Color(palette.cyan) },
        uRose: { value: new THREE.Color(palette.rose) },
      },
      depthTest: false,
      depthWrite: false,
      transparent: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    this.screenScene.add(mesh);
    this.disposables.push(mesh.geometry, material);
    return material;
  }

  private createFlower() {
    for (let index = 0; index < PETAL_COUNT; index++) {
      const material = new THREE.ShaderMaterial({
        vertexShader: flowerVertexShader,
        fragmentShader: flowerFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScale: { value: this.config.flowerScale },
          uTurbulence: { value: this.config.turbulence },
          uPointer: { value: new THREE.Vector2() },
          uScroll: { value: 0 },
          uScrollVelocity: { value: 0 },
          uPointerEnergy: { value: 0 },
          uCyan: { value: new THREE.Color(this.config.palette.cyan) },
          uRose: { value: new THREE.Color(this.config.palette.rose) },
          uViolet: { value: new THREE.Color(this.config.palette.violet) },
          uGlow: { value: this.config.glowIntensity },
          uReduced: { value: this.reducedMotion ? 1 : 0 },
        },
        side: THREE.DoubleSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(createPetalGeometry(index), material);
      const layerSize = PETAL_COUNT / 3;
      const layer = Math.floor(index / layerSize);
      const localIndex = index % layerSize;
      const angle = (localIndex / layerSize) * Math.PI * 2 + layer * (Math.PI / layerSize);
      const scale = layer === 0 ? 1.02 : layer === 1 ? 0.76 : 0.56;
      const seed = seeded(index + 81.3);
      mesh.rotation.set(0.06 + layer * 0.06, 0, angle);
      mesh.scale.set(scale, scale * (layer === 0 ? 1.08 : 0.98), 1);
      mesh.position.z = -0.28 + layer * 0.12;
      this.root.add(mesh);
      this.petalMeshes.push({ mesh, baseAngle: angle, baseScale: scale, layer, seed });
      this.flowerMaterials.push(material);
      this.disposables.push(mesh.geometry, material);
    }
    this.createPetalOutlines();
  }

  private createPetalOutlines() {
    const layers = [
      { count: 14, length: 2.12, width: 0.54, opacity: 0.36, z: -0.08 },
      { count: 14, length: 1.55, width: 0.4, opacity: 0.3, z: 0.02 },
      { count: 14, length: 1.05, width: 0.3, opacity: 0.24, z: 0.12 },
    ];
    const cyan = new THREE.Color(this.config.palette.cyan);
    const rose = new THREE.Color(this.config.palette.rose);

    for (const [layerIndex, layer] of layers.entries()) {
      for (let index = 0; index < layer.count; index++) {
        const angle = (index / layer.count) * Math.PI * 2 + layerIndex * (Math.PI / layer.count);
        const direction = new THREE.Vector3(Math.cos(angle), Math.sin(angle) * 0.68, 0);
        const tangent = new THREE.Vector3(-Math.sin(angle), Math.cos(angle) * 0.68, 0);
        const points: THREE.Vector3[] = [];

        for (let step = 0; step <= 28; step++) {
          points.push(
            this.getPetalOutlinePoint(
              step / 28,
              1,
              layer.length,
              layer.width,
              direction,
              tangent,
              layer.z
            )
          );
        }
        for (let step = 28; step >= 0; step--) {
          points.push(
            this.getPetalOutlinePoint(
              step / 28,
              -1,
              layer.length,
              layer.width,
              direction,
              tangent,
              layer.z
            )
          );
        }
        points.push(points[0].clone());

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const progress = new Float32Array(points.length);
        const sides = new Float32Array(points.length);
        const seeds = new Float32Array(points.length);
        points.forEach((_, pointIndex) => {
          progress[pointIndex] =
            pointIndex <= 28 ? pointIndex / 28 : (points.length - 1 - pointIndex) / 28;
          sides[pointIndex] = pointIndex <= 28 ? 1 : -1;
          seeds[pointIndex] = seeded(index * 3.1 + layerIndex * 11.7);
        });
        geometry.setAttribute("aProgress", new THREE.BufferAttribute(progress, 1));
        geometry.setAttribute("aSide", new THREE.BufferAttribute(sides, 1));
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        const isRosePetal = (index + layerIndex) % 2 === 0;
        const color = isRosePetal ? rose : cyan;
        const material = new THREE.ShaderMaterial({
          vertexShader: `
            precision highp float;
            uniform float uTime;
            uniform float uScrollVelocity;
            uniform float uPointerEnergy;
            attribute float aProgress;
            attribute float aSide;
            attribute float aSeed;
            varying float vAlpha;
            void main() {
              vec3 p = position;
              float body = sin(aProgress * 3.14159265);
              float breath = sin(uTime * 0.72 + aSeed * 16.0) * 0.045;
              float wave = sin(uTime * 1.1 + aProgress * 6.2 + aSeed * 23.0);
              vec2 radial = normalize(p.xy + 0.0001);
              vec2 orbit = vec2(-radial.y, radial.x);
              p.xy *= 1.0 + breath * body + uScrollVelocity * 0.08 + uPointerEnergy * 0.05;
              p.xy += orbit * wave * body * aSide * (0.04 + uPointerEnergy * 0.06);
              p.z += cos(uTime * 0.78 + aProgress * 6.28 + aSeed * 12.0) * body * 0.06;
              p.z += uPointerEnergy * body * 0.06;
              vAlpha = body;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
          `,
          fragmentShader: `
            precision highp float;
            uniform vec3 uColor;
            uniform float uOpacity;
            varying float vAlpha;
            void main() {
              gl_FragColor = vec4(uColor * (1.25 + vAlpha), uOpacity * (0.45 + vAlpha * 0.85));
            }
          `,
          uniforms: {
            uTime: { value: 0 },
            uScrollVelocity: { value: 0 },
            uPointerEnergy: { value: 0 },
            uColor: { value: color },
            uOpacity: { value: layer.opacity * (isRosePetal ? 1.18 : 1) },
          },
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const outline = new THREE.Line(geometry, material);
        this.outlineGroup.add(outline);
        this.outlineMaterials.push(material);
        this.disposables.push(geometry, material);
      }
    }

    this.root.add(this.outlineGroup);
  }

  private getPetalOutlinePoint(
    progress: number,
    side: number,
    length: number,
    width: number,
    direction: THREE.Vector3,
    tangent: THREE.Vector3,
    z: number
  ) {
    const taper = Math.pow(Math.sin(progress * Math.PI), 0.78);
    const flare = width * taper * (0.82 + progress * 0.26);
    const curve = Math.sin(progress * Math.PI * 1.45) * width * 0.1;
    return direction
      .clone()
      .multiplyScalar(progress * length)
      .add(tangent.clone().multiplyScalar(side * flare + curve))
      .setZ(z + Math.sin(progress * Math.PI) * 0.08);
  }

  private createEnergyWaves() {
    const ringCount = this.lowPower ? 3 : 6;
    const pointCount = 160;
    const basePositions = new Float32Array((pointCount + 1) * 3);
    const angleAttr = new Float32Array(pointCount + 1);

    for (let point = 0; point <= pointCount; point++) {
      const angle = (point / pointCount) * Math.PI * 2;
      basePositions.set([Math.cos(angle), Math.sin(angle) * 0.68, 0], point * 3);
      angleAttr[point] = angle;
    }

    for (let ring = 0; ring < ringCount; ring++) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(basePositions, 3));
      geometry.setAttribute("aAngle", new THREE.BufferAttribute(angleAttr, 1));
      const material = new THREE.ShaderMaterial({
        vertexShader: `
          precision highp float;
          uniform float uTime;
          uniform float uSeed;
          uniform float uScrollVelocity;
          uniform float uPointerEnergy;
          attribute float aAngle;
          varying float vAlpha;
          void main() {
            float cycle = fract(uTime * (0.12 + uSeed * 0.028) + uSeed);
            float radius = mix(0.38, 3.35, cycle) + uScrollVelocity * 0.52 + uPointerEnergy * 0.22;
            float wobble = sin(aAngle * 7.0 + uTime * 1.4 + uSeed * 13.0) * 0.035;
            vec3 p = position * (radius + wobble);
            p.z = -0.18 - cycle * 0.65;
            vAlpha = smoothstep(0.0, 0.16, cycle) * smoothstep(1.0, 0.42, cycle);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          uniform vec3 uCyan;
          uniform vec3 uRose;
          uniform float uPointerEnergy;
          varying float vAlpha;
          void main() {
            vec3 color = mix(uCyan, uRose, vAlpha * 0.55);
            gl_FragColor = vec4(color * (1.1 + vAlpha + uPointerEnergy * 0.65), vAlpha * (0.24 + uPointerEnergy * 0.12));
          }
        `,
        uniforms: {
          uTime: { value: 0 },
          uSeed: { value: seeded(ring + 137.4) },
          uScrollVelocity: { value: 0 },
          uPointerEnergy: { value: 0 },
          uCyan: { value: new THREE.Color(this.config.palette.cyan) },
          uRose: { value: new THREE.Color(this.config.palette.rose) },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const wave = new THREE.Line(geometry, material);
      this.root.add(wave);
      this.waveMaterials.push(material);
      this.disposables.push(geometry, material);
    }
  }

  private createCore() {
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform float uPulse;
        uniform float uPointerEnergy;
        uniform float uScrollVelocity;
        uniform vec3 uCyan;
        uniform vec3 uWhite;
        uniform vec3 uRose;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.4);
          float blink = pow(0.5 + 0.5 * sin(uTime * 4.6), 4.0);
          float pulse = 0.62 + sin(uTime * uPulse) * 0.26 + sin(uTime * 2.7) * 0.1;
          pulse += blink * 0.34 + uPointerEnergy * 0.45 + uScrollVelocity * 0.36;
          float center = 1.0 - smoothstep(0.0, 0.95, length(vPosition));
          vec3 color = mix(uCyan, uWhite, center) + uRose * fresnel * 0.9;
          gl_FragColor = vec4(color * (2.4 + pulse * 4.1 + fresnel), 0.18 + center * 0.4 + fresnel * 0.2);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uPulse: { value: this.config.pulseFrequency },
        uPointerEnergy: { value: 0 },
        uScrollVelocity: { value: 0 },
        uCyan: { value: new THREE.Color(this.config.palette.cyan) },
        uWhite: { value: new THREE.Color(this.config.palette.white) },
        uRose: { value: new THREE.Color(this.config.palette.rose) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.48, 64, 64), material);
    const bloom = new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 48, 48),
      new THREE.MeshBasicMaterial({
        color: this.config.palette.cyan,
        transparent: true,
        opacity: 0.11 * this.config.bloomIntensity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const corneaMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform float uPointerEnergy;
        uniform float uScrollVelocity;
        uniform vec3 uCyan;
        uniform vec3 uRose;
        uniform vec3 uWhite;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          float r = length(uv);
          float angle = atan(uv.y, uv.x);
          float eyelid = 0.92 + sin(uTime * 3.8) * 0.07 + pow(sin(uTime * 1.05) * 0.5 + 0.5, 7.0) * 0.12;
          eyelid += uPointerEnergy * 0.08 + uScrollVelocity * 0.08;
          float eyeMask = smoothstep(eyelid, eyelid - 0.22, abs(uv.y));
          float iris = exp(-r * 4.2);
          float pupil = exp(-r * 18.0);
          float ring = exp(-abs(r - 0.48 - sin(uTime * 2.0) * 0.04) * 22.0);
          float spokes = pow(1.0 - abs(sin(angle * 18.0 + uTime * 2.7)), 8.0) * smoothstep(0.72, 0.12, r);
          float blinkGlow = pow(0.5 + 0.5 * sin(uTime * 5.6), 6.0);
          vec3 color = mix(uCyan, uRose, ring * 0.62 + spokes * 0.38);
          color = mix(color, uWhite, iris * 0.32 + pupil * 0.82 + blinkGlow * 0.24);
          float alpha = smoothstep(0.98, 0.08, r) * eyeMask;
          float eyelight = 2.4 + iris * 2.4 + ring * 2.4 + spokes * 1.7 + blinkGlow * 2.2 + uPointerEnergy;
          gl_FragColor = vec4(color * eyelight, alpha * (0.78 + ring * 0.22));
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uPointerEnergy: { value: 0 },
        uScrollVelocity: { value: 0 },
        uCyan: { value: new THREE.Color(this.config.palette.cyan) },
        uRose: { value: new THREE.Color(this.config.palette.rose) },
        uWhite: { value: new THREE.Color(this.config.palette.white) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const whitePoint = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.92, 1, 1), corneaMaterial);
    whitePoint.position.z = 0.2;
    const whiteBloom = new THREE.Mesh(
      new THREE.SphereGeometry(0.78, 48, 48),
      new THREE.MeshBasicMaterial({
        color: this.config.palette.white,
        transparent: true,
        opacity: 0.34,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const light = new THREE.PointLight(this.config.palette.cyan, 4, 10, 1.8);
    this.root.add(bloom, whiteBloom, mesh, whitePoint, light);
    this.disposables.push(
      mesh.geometry,
      bloom.geometry,
      whiteBloom.geometry,
      whitePoint.geometry,
      material,
      corneaMaterial
    );
    this.disposables.push(bloom.material as THREE.Material, whiteBloom.material as THREE.Material);
    return { material, corneaMaterial, light };
  }

  private createParticles() {
    const count = this.reducedMotion
      ? this.config.reducedMotionParticleCount
      : this.lowPower
        ? this.config.mobileParticleCount
        : this.config.particleCount;
    const geometry = createParticleGeometry(count, [
      this.config.palette.cyan,
      this.config.palette.rose,
      this.config.palette.violet,
      this.config.palette.white,
    ]);
    const material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uTurbulence: { value: this.config.turbulence },
        uEnergy: { value: this.config.energyEmission },
        uPointer: { value: new THREE.Vector2() },
        uScroll: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    this.root.add(points);
    this.disposables.push(geometry, material);
    return material;
  }

  private createStreams() {
    const geometry = createStreamGeometry(this.config.streamCount, this.config.streamSegments);
    const material = new THREE.ShaderMaterial({
      vertexShader: streamVertexShader,
      fragmentShader: streamFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: 0 },
        uScroll: { value: 0 },
        uRotation: { value: 0 },
        uCyan: { value: new THREE.Color(this.config.palette.cyan) },
        uRose: { value: new THREE.Color(this.config.palette.rose) },
        uViolet: { value: new THREE.Color(this.config.palette.violet) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(geometry, material);
    lines.frustumCulled = false;
    this.root.add(lines);
    this.disposables.push(geometry, material);
    return material;
  }

  private createRays() {
    const geometry = new THREE.BufferGeometry();
    const rayCount = 142;
    const positions = new Float32Array(rayCount * 2 * 3);
    const colors = new Float32Array(rayCount * 2 * 3);
    const cyan = new THREE.Color(this.config.palette.cyan);
    const rose = new THREE.Color(this.config.palette.rose);
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2 + (seeded(i + 4.4) - 0.5) * 0.035;
      const length = 5.2 + Math.pow(seeded(i + 18.8), 0.65) * 5.7;
      const yScale = 0.58 + seeded(i + 12.1) * 0.18;
      const startRadius = 0.18 + seeded(i + 7.3) * 0.28;
      positions.set(
        [
          Math.cos(angle) * startRadius,
          Math.sin(angle) * startRadius * 0.68,
          -1.05,
          Math.cos(angle) * length,
          Math.sin(angle) * length * yScale,
          -2.1 - seeded(i + 3.2) * 1.5,
        ],
        i * 6
      );
      const color = i % 3 === 0 ? rose : cyan;
      colors.set([color.r, color.g, color.b, color.r, color.g, color.b], i * 6);
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const rays = new THREE.LineSegments(geometry, material);
    this.root.add(rays);
    this.disposables.push(geometry, material);
  }

  private createDust() {
    const count = this.lowPower ? Math.floor(this.config.dustCount * 0.45) : this.config.dustCount;
    const geometry = createParticleGeometry(count, [
      this.config.palette.cyan,
      this.config.palette.white,
    ]);
    const material = new THREE.PointsMaterial({
      size: 0.014,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(geometry, material);
    dust.scale.setScalar(1.35);
    this.root.add(dust);
    this.disposables.push(geometry, material);
  }
}
