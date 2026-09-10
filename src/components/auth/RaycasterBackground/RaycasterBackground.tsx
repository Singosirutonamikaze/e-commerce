"use client";

import React, { useEffect, useRef } from "react";

function getRandomFloat(): number {
  if (typeof window !== "undefined" && window.crypto) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / 0xffffffff;
  }
  return 0.5;
}

/**
 * The 3D Raycaster animated background simulation for authentication pages.
 *
 * @returns The background canvas component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */
export function RaycasterBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const RAY_COUNT = 80;
    const SPHERE_RADIUS = 130;

    interface Ray {
      angleX: number;
      angleY: number;
      speed: number;
      orbitRadius: number;
    }

    const rays: Ray[] = [];
    for (let i = 0; i < RAY_COUNT; i++) {
      rays.push({
        angleX: getRandomFloat() * Math.PI * 2,
        angleY: (getRandomFloat() - 0.5) * Math.PI,
        speed: (getRandomFloat() * 0.003 + 0.002) * (getRandomFloat() > 0.5 ? 1 : -1),
        orbitRadius: getRandomFloat() * 70 + 320,
      });
    }

    let rotY = 0;
    let rotX = 0.2;

    const render = () => {
      ctx.fillStyle = "#0B1120";
      ctx.fillRect(0, 0, width, height);

      rotY += 0.003;
      rotX += 0.001;

      const centerX = width / 2;
      const centerY = height / 2;

      ctx.strokeStyle = "rgba(30, 58, 138, 0.12)";
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(centerX, centerY);

      const nodes = 16;
      const corePoints: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < nodes; i++) {
        const theta = (i / nodes) * Math.PI * 2;
        for (let j = -2; j <= 2; j++) {
          const phi = (j / 3) * (Math.PI / 2.5);
          const r = SPHERE_RADIUS * Math.cos(phi);
          const rawX = r * Math.cos(theta);
          const rawY = SPHERE_RADIUS * Math.sin(phi);
          const rawZ = r * Math.sin(theta);

          const x1 = rawX * Math.cos(rotY) - rawZ * Math.sin(rotY);
          const z1 = rawX * Math.sin(rotY) + rawZ * Math.cos(rotY);
          const y1 = rawY * Math.cos(rotX) - z1 * Math.sin(rotX);
          const z2 = rawY * Math.sin(rotX) + z1 * Math.cos(rotX);

          corePoints.push({ x: x1, y: y1, z: z2 });
        }
      }

      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < corePoints.length; i += 3) {
        const p1 = corePoints[i];
        const p2 = corePoints[(i + 1) % corePoints.length];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      corePoints.forEach((pt) => {
        if (pt.z > -120) {
          const alpha = (pt.z + 150) / 300;
          ctx.fillStyle = `rgba(148, 163, 184, ${Math.max(0.1, alpha * 0.5)})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      rays.forEach((ray, i) => {
        ray.angleX += ray.speed;
        ray.angleY += ray.speed * 0.5;

        const ox = ray.orbitRadius * Math.cos(ray.angleX) * Math.cos(ray.angleY);
        const oy = ray.orbitRadius * Math.sin(ray.angleY);
        const oz = ray.orbitRadius * Math.sin(ray.angleX) * Math.cos(ray.angleY);

        const rx = ox * Math.cos(rotY) - oz * Math.sin(rotY);
        const rz = ox * Math.sin(rotY) + oz * Math.cos(rotY);
        const ry = oy * Math.cos(rotX) - rz * Math.sin(rotX);

        const hitDistance = SPHERE_RADIUS * (0.9 + Math.sin(i + rotY * 2) * 0.1);
        const ratio = hitDistance / ray.orbitRadius;
        const hitX = rx * ratio;
        const hitY = ry * ratio;

        ctx.fillStyle = "rgba(148, 163, 184, 0.5)";
        ctx.beginPath();
        ctx.arc(rx, ry, 2, 0, Math.PI * 2);
        ctx.fill();

        const grad = ctx.createLinearGradient(rx, ry, hitX, hitY);
        grad.addColorStop(0, "rgba(56, 189, 248, 0.35)");
        grad.addColorStop(1, "rgba(225, 29, 72, 0.85)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(hitX, hitY);
        ctx.stroke();

        ctx.fillStyle = "#F43F5E";
        ctx.beginPath();
        ctx.arc(hitX, hitY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
