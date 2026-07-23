"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

// Pure Seeded PRNG for 100% deterministic, render-safe pseudo-random numbers
function createPRNG(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// 7 Primary Concept Nodes Definition
interface ConceptNodeDef {
  id: string;
  label: string;
  color: string;
  radius: number;
  speed: number;
  tiltX: number;
  tiltY: number;
  related: string[];
}

const CONCEPT_NODES: ConceptNodeDef[] = [
  { id: "human", label: "HUMAN", color: "#e5e2d9", radius: 3.5, speed: 0.04, tiltX: 0.2, tiltY: 0.1, related: ["ai", "nature", "creativity"] },
  { id: "ai", label: "AI", color: "#e0b86c", radius: 3.9, speed: 0.055, tiltX: -0.25, tiltY: 0.3, related: ["human", "technology", "knowledge"] },
  { id: "nature", label: "NATURE", color: "#7a947b", radius: 4.3, speed: 0.035, tiltX: 0.4, tiltY: -0.2, related: ["human", "ecology"] },
  { id: "technology", label: "TECHNOLOGY", color: "#688d8e", radius: 3.3, speed: 0.065, tiltX: -0.15, tiltY: 0.25, related: ["ai"] },
  { id: "ecology", label: "ECOLOGY", color: "#7a947b", radius: 4.1, speed: 0.038, tiltX: 0.3, tiltY: 0.4, related: ["nature"] },
  { id: "creativity", label: "CREATIVITY", color: "#e0b86c", radius: 3.7, speed: 0.048, tiltX: 0.1, tiltY: -0.35, related: ["human"] },
  { id: "knowledge", label: "KNOWLEDGE", color: "#e5e2d9", radius: 4.0, speed: 0.042, tiltX: -0.2, tiltY: -0.25, related: ["ai"] }
];

// Pre-computed connection pairs for storytelling lines
const CONNECTION_PAIRS = (() => {
  const pairs: { from: string; to: string }[] = [];
  CONCEPT_NODES.forEach((node) => {
    node.related.forEach((targetId) => {
      const exists = pairs.some(
        (p) => (p.from === node.id && p.to === targetId) || (p.from === targetId && p.to === node.id)
      );
      if (!exists) {
        pairs.push({ from: node.id, to: targetId });
      }
    });
  });
  return pairs;
})();

// Data structure for particles
interface ParticlePoint {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  size: number;
  speed: number;
  color: string;
}

// 1. Background Particle Cloud (Depth Layer 1)
const BackgroundParticles: React.FC<{ shouldReduceMotion: boolean }> = ({ shouldReduceMotion }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesData = useMemo(() => {
    const rng = createPRNG(42);
    const count = 55;
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorOptions = [
      new THREE.Color("#7a947b"),
      new THREE.Color("#e5e2d9"),
      new THREE.Color("#1e2d20"),
      new THREE.Color("#d4af37")
    ];

    for (let i = 0; i < count; i++) {
      const r = 6 + rng() * 10;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = -3 - rng() * 5;

      const c = colorOptions[Math.floor(rng() * colorOptions.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { pos, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current && !shouldReduceMotion) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlesData.pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[particlesData.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.22}
        sizeAttenuation
      />
    </points>
  );
};

// 2. Foreground Floating Particles (Depth Layer 3)
const ForegroundParticles: React.FC<{ shouldReduceMotion: boolean }> = ({ shouldReduceMotion }) => {
  const groupRef = useRef<THREE.Group>(null);

  const fgData = useMemo(() => {
    const rng = createPRNG(99);
    const count = 10;
    const items: ParticlePoint[] = [];

    for (let i = 0; i < count; i++) {
      const x = (rng() - 0.5) * 16;
      const y = (rng() - 0.5) * 10;
      const z = 3 + rng() * 3;
      items.push({
        x, y, z, ox: x, oy: y, oz: z,
        size: 0.06 + rng() * 0.06,
        speed: 0.1 + rng() * 0.2,
        color: rng() > 0.5 ? "#7a947b" : "#e5e2d9"
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current && !shouldReduceMotion) {
      const t = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        const item = fgData[i];
        child.position.y = item.oy + Math.sin(t * item.speed + item.ox) * 0.4;
        child.position.x = item.ox + Math.cos(t * item.speed * 0.7 + item.oy) * 0.25;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {fgData.map((item, idx) => (
        <mesh key={idx} position={[item.x, item.y, item.z]}>
          <sphereGeometry args={[item.size, 8, 8]} />
          <meshBasicMaterial color={item.color} transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

// 3. Central 3D Neural-Organic Organism
const CentralOrganism: React.FC<{ shouldReduceMotion: boolean }> = ({ shouldReduceMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.LineSegments>(null);

  const organismData = useMemo(() => {
    const rng = createPRNG(1337);
    const pointCount = 320;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const pointsVec: THREE.Vector3[] = [];

    const moss = new THREE.Color("#7a947b");
    const ivory = new THREE.Color("#e5e2d9");
    const gold = new THREE.Color("#d4af37");
    const sage = new THREE.Color("#a3b899");

    for (let i = 0; i < pointCount; i++) {
      const u = rng();
      const v = rng();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // Deformed organic noise displacement
      const noise = Math.sin(theta * 3) * Math.cos(phi * 3) * 0.35 + Math.sin(theta * 6) * 0.12;
      const r = 1.55 + noise;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      pointsVec.push(new THREE.Vector3(x, y, z));

      const pick = rng();
      const c = pick < 0.45 ? moss : pick < 0.75 ? sage : pick < 0.9 ? ivory : gold;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    // Interconnecting fine neural web lines
    const linePositions: number[] = [];
    const lineThreshold = 0.62;

    for (let i = 0; i < pointCount; i++) {
      for (let j = i + 1; j < pointCount; j++) {
        const dist = pointsVec[i].distanceTo(pointsVec[j]);
        if (dist < lineThreshold) {
          linePositions.push(
            pointsVec[i].x, pointsVec[i].y, pointsVec[i].z,
            pointsVec[j].x, pointsVec[j].y, pointsVec[j].z
          );
        }
      }
    }

    return {
      positions,
      colors,
      linePositions: new Float32Array(linePositions)
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current && !shouldReduceMotion) {
      const t = state.clock.getElapsedTime();
      // Organic slow rotation
      groupRef.current.rotation.y = t * 0.045;
      groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.08;

      // Slow 6-8s breathing scaling
      const breath = 1.00 + Math.sin(t * 0.9) * 0.012;
      groupRef.current.scale.set(breath, breath, breath);
    }
  });

  return (
    <group ref={groupRef}>
      {/* High-contrast core point cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[organismData.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[organismData.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Interconnecting fine neural web lines */}
      <lineSegments ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[organismData.linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7a947b" transparent opacity={0.25} />
      </lineSegments>

      {/* Soft inner warm core light */}
      <pointLight position={[0, 0, 0]} intensity={3.8} color="#e0b86c" distance={5} decay={1.5} />
      
      {/* Inner glowing aura sphere for high contrast */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial color="#7a947b" transparent opacity={0.12} />
      </mesh>
    </group>
  );
};

// 4. Individual Concept Node Component
const ConceptNodeItem: React.FC<{
  def: ConceptNodeDef;
  isActive: boolean;
  isRelated: boolean;
  onHover: (id: string) => void;
  onUnhover: () => void;
}> = ({ def, isActive, isRelated, onHover, onUnhover }) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const hoverLerp = useRef(0);

  useFrame((state, delta) => {
    // Lerp scale and glow on active/hover state
    const target = isActive ? 1.0 : isRelated ? 0.35 : 0.0;
    hoverLerp.current += (target - hoverLerp.current) * Math.min(delta * 8.0, 1.0);
    const h = hoverLerp.current;

    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      const angle = t * def.speed + def.radius;

      let x = def.radius * Math.cos(angle);
      let z = def.radius * Math.sin(angle);
      let y = Math.sin(angle * 2.0) * 0.7;

      const cosX = Math.cos(def.tiltX);
      const sinX = Math.sin(def.tiltX);
      const tempY = y;
      y = tempY * cosX - z * sinX;
      z = tempY * sinX + z * cosX;

      const cosY = Math.cos(def.tiltY);
      const sinY = Math.sin(def.tiltY);
      const tempX = x;
      x = tempX * cosY + z * sinY;

      const currentScale = 1.0 + h * 0.45;
      groupRef.current.position.set(x, y, z);
      groupRef.current.scale.set(currentScale, currentScale, currentScale);
    }

    if (glowMeshRef.current) {
      const glowScale = 1.0 + h * 0.6;
      glowMeshRef.current.scale.set(glowScale, glowScale, glowScale);
      (glowMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.25 + h * 0.4;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(def.id);
      }}
      onPointerOut={() => {
        onUnhover();
      }}
    >
      {/* Tiny bright center core */}
      <mesh>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Subtle outer sage glow */}
      <mesh ref={glowMeshRef}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial
          color={def.color}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* HTML Monospace Label (Fades in on active/hover) */}
      <Html distanceFactor={10} position={[0, 0.3, 0]} center>
        <span
          className={`font-mono text-[9px] tracking-widest px-2.5 py-0.5 bg-carbon-950/95 border border-bone-200/10 text-bone-100 rounded transition-all duration-500 pointer-events-none uppercase whitespace-nowrap select-none ${
            isActive ? "opacity-100 translate-y-0 text-moss-400 font-semibold" : "opacity-0 translate-y-1.5"
          }`}
        >
          ● {def.label}
        </span>
      </Html>
    </group>
  );
};

// 5. Connection Line Renderer for Active Concept Relationships
const ConnectionLineItem: React.FC<{
  fromId: string;
  toId: string;
  activeId: string | null;
}> = ({ fromId, toId, activeId }) => {
  const opacityLerp = useRef(0);

  const lineObject = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
    const mat = new THREE.LineBasicMaterial({ color: "#e0b86c", transparent: true, opacity: 0 });
    return new THREE.Line(geo, mat);
  }, []);

  // eslint-disable-next-line react-hooks/immutability
  useFrame((state, delta) => {
    const isConnectedToActive =
      activeId !== null &&
      ((activeId === fromId && CONCEPT_NODES.find((n) => n.id === activeId)?.related.includes(toId)) ||
       (activeId === toId && CONCEPT_NODES.find((n) => n.id === activeId)?.related.includes(fromId)));

    const targetOpacity = isConnectedToActive ? 0.55 : 0.0;
    opacityLerp.current += (targetOpacity - opacityLerp.current) * Math.min(delta * 6.0, 1.0);

    const t = state.clock.getElapsedTime();
    const fromDef = CONCEPT_NODES.find((n) => n.id === fromId)!;
    const toDef = CONCEPT_NODES.find((n) => n.id === toId)!;

    // Compute fromPos
    const a1 = t * fromDef.speed + fromDef.radius;
    const x1 = fromDef.radius * Math.cos(a1);
    const z1 = fromDef.radius * Math.sin(a1);
    const y1 = Math.sin(a1 * 2.0) * 0.7;
    const ty1 = y1 * Math.cos(fromDef.tiltX) - z1 * Math.sin(fromDef.tiltX);
    const tz1 = y1 * Math.sin(fromDef.tiltX) + z1 * Math.cos(fromDef.tiltX);
    const tx1 = x1 * Math.cos(fromDef.tiltY) + tz1 * Math.sin(fromDef.tiltY);

    // Compute toPos
    const a2 = t * toDef.speed + toDef.radius;
    const x2 = toDef.radius * Math.cos(a2);
    const z2 = toDef.radius * Math.sin(a2);
    const y2 = Math.sin(a2 * 2.0) * 0.7;
    const ty2 = y2 * Math.cos(toDef.tiltX) - z2 * Math.sin(toDef.tiltX);
    const tz2 = y2 * Math.sin(toDef.tiltX) + z2 * Math.cos(toDef.tiltX);
    const tx2 = x2 * Math.cos(toDef.tiltY) + tz2 * Math.sin(toDef.tiltY);

    const pos = lineObject.geometry.attributes.position;
    pos.setXYZ(0, tx1, ty1, tz1);
    pos.setXYZ(1, tx2, ty2, tz2);
    // eslint-disable-next-line react-hooks/immutability
    pos.needsUpdate = true;

    (lineObject.material as THREE.LineBasicMaterial).opacity = opacityLerp.current;
  });

  return <primitive object={lineObject} />;
};

// 6. Main WebGL Scene Coordinator
const SceneCoordinator: React.FC<{ shouldReduceMotion: boolean }> = ({ shouldReduceMotion }) => {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);
  const [autoConceptIdx, setAutoConceptIdx] = useState<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const unhoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatic Storytelling Loop (cycles every 3.5s when unhovered)
  useEffect(() => {
    if (hoveredConcept !== null) return;

    const interval = setInterval(() => {
      setAutoConceptIdx((prev) => (prev + 1) % CONCEPT_NODES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [hoveredConcept]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleHover = (id: string) => {
    if (unhoverTimerRef.current) clearTimeout(unhoverTimerRef.current);
    setHoveredConcept(id);
  };

  const handleUnhover = () => {
    if (unhoverTimerRef.current) clearTimeout(unhoverTimerRef.current);
    unhoverTimerRef.current = setTimeout(() => {
      setHoveredConcept(null);
    }, 1000);
  };

  // Determine active concept & related IDs
  const activeId = hoveredConcept !== null ? hoveredConcept : CONCEPT_NODES[autoConceptIdx].id;
  const activeDef = CONCEPT_NODES.find((n) => n.id === activeId);
  const relatedIds = activeDef ? activeDef.related : [];

  useFrame(() => {
    if (groupRef.current && !shouldReduceMotion) {
      // Subtle mouse camera depth parallax (Background ~2px, Organism ~4px)
      const targetX = mouseRef.current.x * 0.28;
      const targetY = mouseRef.current.y * 0.18;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.04;
    }
  });

  const isDesktop = viewport.width > 7;
  const positionX = isDesktop ? viewport.width * 0.23 : 0;
  const positionY = isDesktop ? 0 : -viewport.height * 0.12;

  return (
    <group ref={groupRef} position={[positionX, positionY, 0]}>
      {/* 3D Scene Ambient & Point Lighting */}
      <ambientLight intensity={0.25} color="#e5e2d9" />
      <directionalLight position={[6, 10, 8]} intensity={1.5} color="#e5e2d9" />
      <pointLight position={[-8, -5, -8]} intensity={1.2} color="#7a947b" />

      {/* Layer 1: Background microscopic dust */}
      <BackgroundParticles shouldReduceMotion={shouldReduceMotion} />

      {/* Layer 2: Central 3D Neural Organism */}
      <CentralOrganism shouldReduceMotion={shouldReduceMotion} />

      {/* Layer 2: Interconnecting concept relationship lines */}
      {CONNECTION_PAIRS.map((pair, idx) => (
        <ConnectionLineItem
          key={idx}
          fromId={pair.from}
          toId={pair.to}
          activeId={activeId}
        />
      ))}

      {/* Layer 2: 7 Primary Concept Energy Nodes */}
      {CONCEPT_NODES.map((def) => (
        <ConceptNodeItem
          key={def.id}
          def={def}
          isActive={activeId === def.id}
          isRelated={relatedIds.includes(def.id)}
          onHover={handleHover}
          onUnhover={handleUnhover}
        />
      ))}

      {/* Layer 3: Foreground floating blurred particles */}
      <ForegroundParticles shouldReduceMotion={shouldReduceMotion} />
    </group>
  );
};

export const ImmersiveHero3D: React.FC = () => {
  const shouldReduceMotion = useSafeReducedMotion();
  const [webGLSupport, setWebGLSupport] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        const supported = !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
        setWebGLSupport(supported);
      } catch {
        setWebGLSupport(false);
      }
    };
    checkWebGL();
  }, []);

  if (webGLSupport === false) {
    return (
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center bg-carbon-950"
        aria-hidden="true"
      >
        <div className="w-48 h-48 rounded-full border border-moss-500/10 bg-moss-500/5 animate-pulse flex items-center justify-center">
          <span className="text-[10px] font-mono text-moss-500 uppercase tracking-widest text-center px-4">
            Ecosystem Seed Active
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 72% 48%, rgba(122, 148, 123, 0.15) 0%, rgba(30, 45, 32, 0.06) 35%, transparent 70%)"
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ pointerEvents: "auto", width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true }}
      >
        <SceneCoordinator shouldReduceMotion={shouldReduceMotion} />
      </Canvas>
    </div>
  );
};

export default ImmersiveHero3D;
