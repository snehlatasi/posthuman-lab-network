"use client";

import React, { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { useTheme } from "@/context/ThemeContext";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  speed: number;
  angleOffset: number;
}

interface ConceptNode3D {
  label: string;
  angle: number;
  speed: number;
  heightOffset: number;
  currentScale: number;
  currentOpacity: number;
  projectedX: number;
  projectedY: number;
  projectedZ: number;
}

export const HeroNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useSafeReducedMotion();
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const scrollRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const activeTapNodeRef = useRef<{ index: number; expires: number } | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;

    let animationId: number | null = null;
    let dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const fov = 420;
    let yaw = 0;
    let pitch = 0;
    let targetYaw = 0;
    let targetPitch = 0;

    const conceptLabels = [
      "HUMAN", "AI", "NONHUMAN", "ECOLOGY", "NATURE",
      "TECHNOLOGY", "ART", "KNOWLEDGE", "RESEARCH",
      "COMMUNITY", "CREATIVITY"
    ];

    const organismPoints: Point3D[] = [];
    const organismPointCount = isMobile ? 55 : 180;
    
    for (let i = 0; i < organismPointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / organismPointCount);
      const theta = Math.sqrt(organismPointCount * Math.PI) * phi;
      const baseR = 100 + (i % 2 === 0 ? 12 : -12);

      const x = baseR * Math.sin(phi) * Math.cos(theta);
      const y = baseR * Math.sin(phi) * Math.sin(theta);
      const z = baseR * Math.cos(phi);

      organismPoints.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        speed: 0.2 + Math.random() * 0.3,
        angleOffset: Math.random() * Math.PI * 2
      });
    }

    const atmosphericPoints: Point3D[] = [];
    const dustCount = isMobile ? 30 : 120;
    
    for (let i = 0; i < dustCount; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 220 + Math.random() * 250;

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      atmosphericPoints.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        speed: 0.15 + Math.random() * 0.15,
        angleOffset: Math.random() * Math.PI * 2
      });
    }

    const conceptNodes: ConceptNode3D[] = conceptLabels.map((label, idx) => {
      return {
        label,
        angle: (idx / conceptLabels.length) * Math.PI * 2,
        speed: 0.005 + (idx % 2 === 0 ? 0.002 : -0.002),
        heightOffset: -60 + Math.random() * 120,
        currentScale: 1.0,
        currentOpacity: 0.6,
        projectedX: 0,
        projectedY: 0,
        projectedZ: 0
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!parent || e.touches.length === 0) return;
      const rect = parent.getBoundingClientRect();
      const tx = e.touches[0].clientX - rect.left;
      const ty = e.touches[0].clientY - rect.top;

      mouseRef.current.x = tx;
      mouseRef.current.y = ty;
      mouseRef.current.active = true;

      let closestIdx = -1;
      let minDist = 110;

      conceptNodes.forEach((node, idx) => {
        const dx = node.projectedX - tx;
        const dy = node.projectedY - ty;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });

      if (closestIdx !== -1) {
        activeTapNodeRef.current = {
          index: closestIdx,
          expires: Date.now() + 3000
        };
      }
    };

    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
      parent.addEventListener("touchstart", handleTouchStart, { passive: true });
      parent.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
          const rect = parent.getBoundingClientRect();
          mouseRef.current.x = e.touches[0].clientX - rect.left;
          mouseRef.current.y = e.touches[0].clientY - rect.top;
        }
      }, { passive: true });
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const isDark = themeRef.current === "dark";

      organismPoints.forEach((pt, idx) => {
        if (idx % 3 !== 0) return;
        const scale = fov / (fov + pt.z);
        const drawX = centerX + pt.x * scale;
        const drawY = centerY + pt.y * scale;

        ctx.fillStyle = isDark ? "rgba(243, 235, 217, 0.35)" : "rgba(229, 226, 217, 0.25)";
        ctx.beginPath();
        ctx.arc(drawX, drawY, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = isDark ? "rgba(243, 235, 217, 0.12)" : "rgba(229, 226, 217, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < organismPoints.length; i += 8) {
        const p1 = organismPoints[i];
        for (let j = i + 8; j < organismPoints.length; j += 12) {
          const p2 = organismPoints[j];
          const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (dist < 80) {
            const scale1 = fov / (fov + p1.z);
            const scale2 = fov / (fov + p2.z);
            ctx.beginPath();
            ctx.moveTo(centerX + p1.x * scale1, centerY + p1.y * scale1);
            ctx.lineTo(centerX + p2.x * scale2, centerY + p2.y * scale2);
            ctx.stroke();
          }
        }
      }
    };

    if (shouldReduceMotion) {
      drawStatic();
      return;
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const time = Date.now();
      const scrollY = scrollRef.current;
      const scrollFade = Math.max(0, 1 - scrollY / 700);
      const isDark = themeRef.current === "dark";

      if (scrollFade <= 0.01) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = time - startTimeRef.current;
      const introFactor = Math.min(1.0, elapsed / 2200);
      
      const centerX = width / 2;
      const centerY = height / 2;

      if (mouseRef.current.active) {
        targetYaw = (mouseRef.current.x - centerX) * 0.0008;
        targetPitch = (mouseRef.current.y - centerY) * 0.0008;
      } else {
        targetYaw = time * 0.00015;
        targetPitch = Math.sin(time * 0.00025) * 0.15;
      }

      yaw += (targetYaw - yaw) * 0.08;
      pitch += (targetPitch - pitch) * 0.08;

      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);

      const scrollScale = Math.max(0.4, 1 - scrollY / 850) * introFactor;
      const scrollDispersion = scrollY * 0.28;
      const breathe = Math.sin(time * 0.0016) * 12;

      const projectedOrganism = organismPoints.map((pt, idx) => {
        const ptOffset = Math.sin(time * 0.002 * pt.speed + pt.angleOffset) * 6;
        const radialFactor = 1 + (Math.sin(idx + time * 0.002) * 0.08);
        const bx = pt.baseX * radialFactor * scrollScale;
        const by = pt.baseY * radialFactor * scrollScale;
        const bz = pt.baseZ * radialFactor * scrollScale;

        const x1 = bx * cosYaw - bz * sinYaw;
        const z1 = bx * sinYaw + bz * cosYaw;
        const y2 = by * cosPitch - z1 * sinPitch;
        const z2 = by * sinPitch + z1 * cosPitch + ptOffset;

        const cameraZ = z2 + fov + (scrollY * 0.5);
        const projScale = fov / Math.max(10, cameraZ);

        return {
          x: centerX + x1 * projScale,
          y: centerY + y2 * projScale,
          z: cameraZ,
          scale: projScale,
          rawZ: z2
        };
      });

      const depthSortedIndices = [...Array(projectedOrganism.length).keys()].sort(
        (a, b) => projectedOrganism[b].z - projectedOrganism[a].z
      );

      ctx.lineWidth = 0.45;
      for (let i = 0; i < projectedOrganism.length; i += 3) {
        const p1 = projectedOrganism[i];
        let connectionCount = 0;
        
        for (let j = i + 1; j < projectedOrganism.length; j++) {
          if (connectionCount > 2) break;
          const p2 = projectedOrganism[j];
          const dist3D = Math.sqrt(
            (organismPoints[i].x - organismPoints[j].x) ** 2 +
            (organismPoints[i].y - organismPoints[j].y) ** 2 +
            (organismPoints[i].z - organismPoints[j].z) ** 2
          );

          if (dist3D < 65) {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist2D = Math.sqrt(dx * dx + dy * dy);

            let alpha = (1 - dist2D / 120) * (isDark ? 0.28 : 0.16) * scrollFade * introFactor;

            const dxCenter = ((p1.x + p2.x) / 2) - centerX;
            const dyCenter = ((p1.y + p2.y) / 2) - centerY;
            const safetyRadius = (dxCenter / (width * 0.35)) ** 2 + (dyCenter / 100) ** 2;
            if (safetyRadius < 1.0) {
              alpha *= (0.05 + 0.95 * safetyRadius);
            }

            if (alpha > 0.01) {
              ctx.strokeStyle = isDark ? `rgba(138, 166, 135, ${alpha})` : `rgba(229, 226, 217, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              connectionCount++;
            }
          }
        }
      }

      depthSortedIndices.forEach((origIdx) => {
        const pt = projectedOrganism[origIdx];
        const depthOpacity = Math.max(0.1, 1 - (pt.rawZ + 120) / 240);
        let alpha = depthOpacity * (isDark ? 0.85 : 0.65) * scrollFade * introFactor;

        const dxCenter = pt.x - centerX;
        const dyCenter = pt.y - centerY;
        const safetyRadius = (dxCenter / (width * 0.35)) ** 2 + (dyCenter / 100) ** 2;
        if (safetyRadius < 1.0) {
          alpha *= (0.05 + 0.95 * safetyRadius);
        }

        if (alpha <= 0.01) return;

        const greenFactor = Math.floor(Math.max(0, Math.min(255, 140 - pt.rawZ * 0.5)));
        if (isDark) {
          ctx.fillStyle = `rgba(138, ${greenFactor + 20}, 135, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(${160 + (origIdx % 30)}, ${greenFactor}, 123, ${alpha})`;
        }

        ctx.beginPath();
        const radius = Math.max(0.6, pt.scale * 1.5);
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      atmosphericPoints.forEach((pt) => {
        const driftX = pt.baseX;
        const driftY = pt.baseY + Math.sin(time * 0.001 * pt.speed + pt.angleOffset) * 15;
        const driftZ = pt.baseZ + scrollDispersion;

        const x1 = driftX * cosYaw - driftZ * sinYaw;
        const z1 = driftX * sinYaw + driftZ * cosYaw;
        const y2 = driftY * cosPitch - z1 * sinPitch;
        const z2 = (driftY * sinPitch + z1 * cosPitch) * scrollScale;

        const cameraZ = z2 + fov;
        const projScale = fov / Math.max(10, cameraZ);
        
        const dx = centerX + x1 * projScale;
        const dy = centerY + y2 * projScale;

        let alpha = (isDark ? 0.38 : 0.25) * scrollFade * introFactor;
        
        let radius = 1.0;
        if (z2 < -120) {
          radius = Math.max(2.0, projScale * 6);
          alpha *= 0.45;
        } else if (z2 > 120) {
          radius = 0.7;
          alpha *= 0.3;
        } else {
          radius = Math.max(1.0, projScale * 2.2);
          alpha *= 0.6;
        }

        const dxCenter = dx - centerX;
        const dyCenter = dy - centerY;
        const safetyRadius = (dxCenter / (width * 0.35)) ** 2 + (dyCenter / 100) ** 2;
        if (safetyRadius < 1.0) {
          alpha *= (0.05 + 0.95 * safetyRadius);
        }

        if (alpha > 0.01 && dx >= 0 && dx <= width && dy >= 0 && dy <= height) {
          ctx.fillStyle = isDark ? `rgba(243, 235, 217, ${alpha})` : `rgba(229, 226, 217, ${alpha})`;
          ctx.beginPath();
          ctx.arc(dx, dy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const mobileCycleIdx = Math.floor(time / 4000) % conceptNodes.length;
      const isTapActive = activeTapNodeRef.current && activeTapNodeRef.current.expires > time;

      conceptNodes.forEach((node, idx) => {
        const currentAngle = node.angle + (time * node.speed);
        
        const orbitRadius = (200 + breathe) * scrollScale;
        const ox = orbitRadius * Math.cos(currentAngle);
        const oy = node.heightOffset * scrollScale;
        const oz = orbitRadius * Math.sin(currentAngle);

        const x1 = ox * cosYaw - oz * sinYaw;
        const z1 = ox * sinYaw + oz * cosYaw;
        const y2 = oy * cosPitch - z1 * sinPitch;
        const z2 = (oy * sinPitch + z1 * cosPitch) * scrollScale;

        const cameraZ = z2 + fov;
        const projScale = fov / Math.max(10, cameraZ);

        node.projectedX = centerX + x1 * projScale;
        node.projectedY = centerY + y2 * projScale;
        node.projectedZ = cameraZ;

        let targetScale = 1.0;
        let targetOpacity = 0.45;

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.projectedX;
          const dy = mouseRef.current.y - node.projectedY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const activeRadius = 140;

          if (dist < activeRadius) {
            const factor = (activeRadius - dist) / activeRadius;
            targetScale = 1.0 + factor * 1.6;
            targetOpacity = 0.5 + factor * 0.5;
          }
        }

        if (isMobile) {
          if (isTapActive && activeTapNodeRef.current?.index === idx) {
            targetScale = 1.8;
            targetOpacity = 0.9;
          } else if (!isTapActive && idx === mobileCycleIdx) {
            const pulse = Math.sin(time * 0.0018) * 0.5 + 0.5;
            targetScale = 1.0 + pulse * 0.65;
            targetOpacity = 0.45 + pulse * 0.45;
          }
        }

        node.currentScale += (targetScale - node.currentScale) * 0.12;
        node.currentOpacity += (targetOpacity - node.currentOpacity) * 0.12;

        let finalOpacity = node.currentOpacity * scrollFade * introFactor;
        
        const dxCenter = node.projectedX - centerX;
        const dyCenter = node.projectedY - centerY;
        const safetyRadius = (dxCenter / (width * 0.35)) ** 2 + (dyCenter / 100) ** 2;
        if (safetyRadius < 1.0) {
          finalOpacity *= (0.05 + 0.95 * safetyRadius);
        }

        if (finalOpacity <= 0.01) return;

        if (node.currentScale > 1.1) {
          const glowGrad = ctx.createRadialGradient(
            node.projectedX, node.projectedY, 0,
            node.projectedX, node.projectedY, projScale * 14 * node.currentScale
          );
          glowGrad.addColorStop(0, isDark ? `rgba(138, 166, 135, ${finalOpacity * 0.6})` : `rgba(122, 148, 123, ${finalOpacity * 0.5})`);
          glowGrad.addColorStop(0.5, isDark ? `rgba(100, 140, 135, ${finalOpacity * 0.3})` : `rgba(74, 110, 110, ${finalOpacity * 0.2})`);
          glowGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.projectedX, node.projectedY, projScale * 14 * node.currentScale, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = isDark ? `rgba(243, 235, 217, ${finalOpacity * 0.95})` : `rgba(229, 226, 217, ${finalOpacity * 0.95})`;
        ctx.beginPath();
        const baseRadius = 3.2 * projScale * node.currentScale;
        ctx.arc(node.projectedX, node.projectedY, Math.max(1.5, baseRadius), 0, Math.PI * 2);
        ctx.fill();

        let textOpacity = 0;
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.projectedX;
          const dy = mouseRef.current.y - node.projectedY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            textOpacity = (110 - dist) / 110;
          }
        }

        if (isMobile) {
          if (isTapActive && activeTapNodeRef.current?.index === idx) {
            textOpacity = 0.95;
          } else if (!isTapActive && idx === mobileCycleIdx) {
            textOpacity = Math.sin(time * 0.0018) * 0.4 + 0.4;
          }
        }

        const finalLabelOpacity = textOpacity * finalOpacity;
        if (finalLabelOpacity > 0.02) {
          ctx.fillStyle = isDark ? `rgba(243, 235, 217, ${finalLabelOpacity})` : `rgba(229, 226, 217, ${finalLabelOpacity})`;
          ctx.font = "bold 9px monospace";
          ctx.letterSpacing = "1.5px";
          ctx.textAlign = "center";
          ctx.fillText(node.label, node.projectedX, node.projectedY - (Math.max(1.5, baseRadius) + 8));
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    let isVisible = true;

    const startLoop = () => {
      if (animationId === null) {
        animationId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !shouldReduceMotion) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible && !shouldReduceMotion) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
        parent.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
};
