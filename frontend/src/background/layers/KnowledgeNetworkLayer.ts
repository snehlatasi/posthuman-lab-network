import * as THREE from "three";
import type { UniverseConfig } from "../config/animation";

interface OrbitNodeState {
  mesh: THREE.Mesh;
  halo: THREE.Mesh;
  baseAngle: number;
  radius: number;
  yScale: number;
  speed: number;
  seed: number;
}

interface PulsePacketState {
  mesh: THREE.Mesh;
  baseAngle: number;
  radius: number;
  yScale: number;
  speed: number;
  phase: number;
}

type Disposable = { dispose: () => void };

function seeded(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export class KnowledgeNetworkLayer {
  readonly group = new THREE.Group();

  private readonly orbitNodes: OrbitNodeState[] = [];
  private readonly pulsePackets: PulsePacketState[] = [];
  private readonly config: UniverseConfig;
  private readonly lowPower: boolean;
  private readonly disposables: Disposable[];

  constructor(config: UniverseConfig, lowPower: boolean, disposables: Disposable[]) {
    this.config = config;
    this.lowPower = lowPower;
    this.disposables = disposables;
    this.create();
  }

  update(t: number, pointerEnergy: number, pointerX: number, pointerY: number) {
    this.group.rotation.z = t * -0.026 + Math.sin(t * 0.2) * 0.018;
    this.group.rotation.x = Math.sin(t * 0.16) * 0.04 + pointerY * 0.025;
    this.group.rotation.y = Math.cos(t * 0.14) * 0.035 + pointerX * 0.035;
    this.group.scale.setScalar(1 + Math.sin(t * 0.68) * 0.018 + pointerEnergy * 0.02);

    this.orbitNodes.forEach(({ mesh, halo, baseAngle, radius, yScale, speed, seed }) => {
      const angle = baseAngle + t * speed;
      const pulse = 0.78 + Math.sin(t * 1.05 + seed * 8.0) * 0.22 + pointerEnergy * 0.14;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * yScale,
        0.22 + Math.sin(t * 0.44 + seed * 5.0) * 0.16
      );
      halo.position.copy(mesh.position);
      mesh.scale.setScalar(pulse);
      halo.scale.setScalar(0.86 + pulse * 0.34);

      (mesh.material as THREE.MeshBasicMaterial).opacity = 0.68 + pulse * 0.2;
      (halo.material as THREE.MeshBasicMaterial).opacity = 0.16 + pulse * 0.09;
    });

    this.pulsePackets.forEach(({ mesh, baseAngle, radius, yScale, speed, phase }) => {
      const cycle = (t * speed + phase) % 1;
      const angle = baseAngle + cycle * Math.PI * 2;
      const fade = Math.sin(cycle * Math.PI);
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * yScale,
        0.34 + Math.sin(angle * 2.0 + t * 0.22) * 0.08
      );
      mesh.scale.setScalar(0.58 + fade * 1.25 + pointerEnergy * 0.22);
      (mesh.material as THREE.MeshBasicMaterial).opacity = 0.14 + fade * 0.72;
    });
  }

  private create() {
    const palette = this.createPalette();
    const network = this.config.knowledgeNetwork;
    this.group.position.z = 0.12;

    const arcCount = this.lowPower ? network.lowPowerArcCount : network.arcCount;
    for (let index = 0; index < arcCount; index++) {
      const radius = network.arcBaseRadius + index * network.arcRadiusStep;
      const yScale = 0.48 + index * 0.055;
      const opacity = this.lowPower ? 0.12 : 0.16 + index * 0.018;
      const arc = this.createEllipseArc(radius, yScale, palette[index % palette.length], opacity);
      arc.rotation.z = index * 0.42;
      arc.rotation.x = (index - 2) * 0.11;
      arc.position.z = -0.28 - index * 0.04;
      this.group.add(arc);
    }

    this.createOrbitNodes(palette);
    this.createPulsePackets(palette);
  }

  private createPalette() {
    const palette = this.config.palette;
    return [
      new THREE.Color(palette.cyan),
      new THREE.Color(palette.rose),
      new THREE.Color(palette.moss),
      new THREE.Color(palette.amber),
      new THREE.Color(palette.violet),
      new THREE.Color(palette.white),
    ];
  }

  private createOrbitNodes(palette: THREE.Color[]) {
    const network = this.config.knowledgeNetwork;
    const nodeCount = this.lowPower ? network.lowPowerNodeCount : network.nodeCount;
    const nodeGeometry = new THREE.SphereGeometry(
      0.048,
      this.lowPower ? 10 : 16,
      this.lowPower ? 10 : 16
    );
    const haloGeometry = new THREE.SphereGeometry(
      0.145,
      this.lowPower ? 12 : 20,
      this.lowPower ? 12 : 20
    );
    this.disposables.push(nodeGeometry, haloGeometry);

    for (let index = 0; index < nodeCount; index++) {
      const color = palette[index % palette.length];
      const nodeMaterial = this.createBasicMaterial(color, 0.86);
      const haloMaterial = this.createBasicMaterial(color, 0.24);
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      const seed = seeded(index + 191.4);
      const radius = network.nodeBaseRadius + (index % 3) * 0.28 + seed * 0.08;
      const yScale = 0.56 + seeded(index + 204.2) * 0.12;
      const baseAngle = (index / nodeCount) * Math.PI * 2 + seed * 0.18;
      const speed = (index % 2 === 0 ? 0.018 : -0.014) * (0.75 + seed * 0.5);

      this.group.add(halo, mesh);
      this.orbitNodes.push({ mesh, halo, baseAngle, radius, yScale, speed, seed });
      this.disposables.push(nodeMaterial, haloMaterial);
    }
  }

  private createPulsePackets(palette: THREE.Color[]) {
    const network = this.config.knowledgeNetwork;
    const pulseGeometry = new THREE.SphereGeometry(0.032, this.lowPower ? 8 : 14, this.lowPower ? 8 : 14);
    const pulseCount = this.lowPower ? network.lowPowerPulseCount : network.pulseCount;
    this.disposables.push(pulseGeometry);

    for (let index = 0; index < pulseCount; index++) {
      const material = this.createBasicMaterial(palette[(index + 1) % palette.length], 0.46);
      const mesh = new THREE.Mesh(pulseGeometry, material);
      const seed = seeded(index + 241.8);
      this.group.add(mesh);
      this.pulsePackets.push({
        mesh,
        baseAngle: seed * Math.PI * 2,
        radius: network.pulseBaseRadius + (index % 3) * 0.36,
        yScale: 0.52 + seeded(index + 258.5) * 0.18,
        speed: 0.04 + seed * 0.028,
        phase: seed,
      });
      this.disposables.push(material);
    }
  }

  private createEllipseArc(radius: number, yScale: number, color: THREE.Color, opacity: number) {
    const pointCount = this.lowPower ? 96 : 160;
    const points: THREE.Vector3[] = [];
    for (let index = 0; index <= pointCount; index++) {
      const angle = (index / pointCount) * Math.PI * 2;
      const wave = Math.sin(angle * 3.0) * 0.035;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * (radius + wave),
          Math.sin(angle) * radius * yScale,
          Math.sin(angle * 2.0) * 0.08
        )
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.disposables.push(geometry, material);
    return new THREE.Line(geometry, material);
  }

  private createBasicMaterial(color: THREE.Color, opacity: number) {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }
}
