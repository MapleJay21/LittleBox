"use client";

import { useEffect, useMemo, useRef } from "react";

type WebGLParticleTextProps = {
  text?: string;
  className?: string;
  particleColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  density?: number;
  particleSize?: number;
  jitter?: number;
  idleSpeed?: number;
  maxDrift?: number;
  returnForce?: number;
  mouseForce?: number;
  mouseRadius?: number;
};

type Particle = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  seed: number;
  driftRadius: number;
};

export function WebglParticleText({
  text = "Build wild ideas",
  className,
  particleColor = "#FFFFFF",
  fontFamily = "Inter, system-ui, sans-serif",
  fontSize = 120,
  fontWeight = 700,
  density = 4,
  particleSize = 1.2,
  jitter = 0.06,
  idleSpeed = 1,
  maxDrift = 2.0,
  returnForce = 0.025,
  mouseForce = 1.2,
  mouseRadius = 140,
}: WebGLParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const dprRef = useRef(1);
  const sizeRef = useRef({ width: 0, height: 0 });
  const timeRef = useRef(0);

  const clampedDensity = useMemo(() => Math.max(1, Math.floor(density)), [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      sizeRef.current = { width: rect.width, height: rect.height };

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles();
    };

    const initParticles = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height } = canvas;
      const dpr = dprRef.current;
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = width;
      sampleCanvas.height = height;
      const sampleCtx = sampleCanvas.getContext("2d");
      if (!sampleCtx) return;

      sampleCtx.clearRect(0, 0, width, height);
      sampleCtx.fillStyle = "#fff";
      sampleCtx.textAlign = "center";
      sampleCtx.textBaseline = "middle";
      sampleCtx.font = `${fontWeight} ${fontSize * dpr}px ${fontFamily}`;
      sampleCtx.fillText(text, width / 2, height / 2);

      const image = sampleCtx.getImageData(0, 0, width, height).data;
      const next: Particle[] = [];
      const step = Math.max(2, Math.floor(clampedDensity * dpr));

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = image[(y * width + x) * 4 + 3];
          if (alpha > 100) {
            next.push({
              x,
              y,
              ox: x,
              oy: y,
              vx: 0,
              vy: 0,
              seed: Math.random() * Math.PI * 2,
              driftRadius: (0.6 + Math.random() * 1.6) * dpr,
            });
          }
        }
      }

      particlesRef.current = next;
      ctx.clearRect(0, 0, width, height);
    };

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) * dprRef.current,
        y: (event.clientY - rect.top) * dprRef.current,
      };
    };

    const onLeave = () => {
      mouseRef.current = null;
    };

    const animate = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = particleColor;
      const mouse = mouseRef.current;
      const radius = mouseRadius * dprRef.current;
      const radiusSq = radius * radius;
      const size = particleSize * dprRef.current;
      const driftLimit = maxDrift * dprRef.current;
      const driftLimitSq = driftLimit * driftLimit;

      timeRef.current += 0.016;

      for (const p of particlesRef.current) {
        const idleFx =
          Math.cos(timeRef.current * 1.4 * idleSpeed + p.seed) * 0.045 * p.driftRadius;
        const idleFy =
          Math.sin(timeRef.current * 1.1 * idleSpeed + p.seed * 1.7) * 0.045 * p.driftRadius;

        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq) {
            const dist = Math.max(1, Math.sqrt(distSq));
            const factor = (1 - dist / radius) * mouseForce;
            p.vx += (dx / dist) * factor;
            p.vy += (dy / dist) * factor;
          }
        }

        p.vx += idleFx;
        p.vy += idleFy;
        p.vx += (p.ox - p.x) * returnForce;
        p.vy += (p.oy - p.y) * returnForce;
        p.vx += (Math.random() - 0.5) * jitter;
        p.vy += (Math.random() - 0.5) * jitter;

        if (!mouse) {
          const fromOriginX = p.x - p.ox;
          const fromOriginY = p.y - p.oy;
          const distSq = fromOriginX * fromOriginX + fromOriginY * fromOriginY;
          if (distSq > driftLimitSq) {
            const dist = Math.sqrt(distSq);
            const over = dist - driftLimit;
            const pull = 0.12 + over * 0.04;
            p.vx += (-fromOriginX / dist) * pull;
            p.vy += (-fromOriginY / dist) * pull;
          }

          const maxVelocity = 1.7 * dprRef.current;
          const velocitySq = p.vx * p.vx + p.vy * p.vy;
          if (velocitySq > maxVelocity * maxVelocity) {
            const scale = maxVelocity / Math.sqrt(velocitySq);
            p.vx *= scale;
            p.vy *= scale;
          }
        }

        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillRect(p.x, p.y, size, size);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(() => resize());
    observer.observe(parent);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    resize();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [
    clampedDensity,
    fontFamily,
    fontSize,
    fontWeight,
    jitter,
    idleSpeed,
    maxDrift,
    mouseForce,
    mouseRadius,
    particleColor,
    particleSize,
    returnForce,
    text,
  ]);

  return <canvas ref={canvasRef} className={className} aria-label={text} />;
}
