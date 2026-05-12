"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type WireframeGlobeProps = {
  className?: string;
  rotationSpeed?: number;
  oceanColor?: string;
  lineColor?: string;
  dotColor?: string;
  dotCount?: number;
  dotSize?: number;
  lineWidth?: number;
  globeScale?: number;
  graticuleStep?: number;
};

type Dot3D = { x: number; y: number; z: number };
type LonLat = [number, number];
type PolygonRings = LonLat[][];
type Feature = {
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: PolygonRings[] | PolygonRings;
  };
};
type FeatureCollection = { features: Feature[] };

export function WireframeGlobe({
  className,
  rotationSpeed = 0.25,
  oceanColor = "#0A0A0A",
  lineColor = "#FFFFFF",
  dotColor = "#A3A3A3",
  dotCount = 900,
  dotSize = 0.7,
  lineWidth = 1,
  globeScale = 0.86,
  graticuleStep = 20,
}: WireframeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const rotationRef = useRef({ yaw: 0, pitch: 0 });
  const draggingRef = useRef(false);
  const scaleRef = useRef(1);
  const [land, setLand] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        );
        if (!response.ok) return;
        const data = (await response.json()) as FeatureCollection;
        if (active) setLand(data);
      } catch {
        // Keep globe rendering even when network fails.
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const pointInRing = (point: LonLat, ring: LonLat[]) => {
    const [x, y] = point;
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersects) inside = !inside;
    }
    return inside;
  };

  const pointInFeature = (point: LonLat, feature: Feature) => {
    if (feature.geometry.type === "Polygon") {
      const rings = feature.geometry.coordinates as PolygonRings;
      if (!pointInRing(point, rings[0])) return false;
      for (let i = 1; i < rings.length; i += 1) {
        if (pointInRing(point, rings[i])) return false;
      }
      return true;
    }

    const polygons = feature.geometry.coordinates as PolygonRings[];
    for (const poly of polygons) {
      if (!pointInRing(point, poly[0])) continue;
      let hole = false;
      for (let i = 1; i < poly.length; i += 1) {
        if (pointInRing(point, poly[i])) {
          hole = true;
          break;
        }
      }
      if (!hole) return true;
    }
    return false;
  };

  const dots = useMemo<Dot3D[]>(() => {
    if (!land) return [];
    const arr: Dot3D[] = [];
    const step = Math.max(1.2, 260 / dotCount);
    for (let lng = -180; lng <= 180; lng += step) {
      for (let lat = -85; lat <= 85; lat += step) {
        const point: LonLat = [lng, lat];
        let onLand = false;
        for (const f of land.features) {
          if (pointInFeature(point, f)) {
            onLand = true;
            break;
          }
        }
        if (!onLand) continue;
        const lon = (lng * Math.PI) / 180;
        const phi = (lat * Math.PI) / 180;
        arr.push({
          x: Math.cos(phi) * Math.cos(lon),
          y: Math.sin(phi),
          z: Math.cos(phi) * Math.sin(lon),
        });
      }
    }
    return arr;
  }, [dotCount, land]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const size = Math.max(120, Math.floor(Math.min(rect.width, rect.height)));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rotateY = (p: Dot3D, a: number): Dot3D => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    };

    const rotateX = (p: Dot3D, a: number): Dot3D => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    };

    const project = (p: Dot3D, radius: number, center: number) => {
      const depth = 2.5;
      const k = depth / (depth - p.z);
      return { x: center + p.x * radius * k, y: center + p.y * radius * k, k };
    };

    const drawGraticule = (radius: number, center: number) => {
      ctx.save();
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = lineWidth;

      for (let lat = -80; lat <= 80; lat += graticuleStep) {
        const latR = (lat * Math.PI) / 180;
        ctx.beginPath();
        let started = false;
        for (let lng = 0; lng <= 360; lng += 4) {
          const lngR = (lng * Math.PI) / 180;
          const p0 = {
            x: Math.cos(latR) * Math.cos(lngR),
            y: Math.sin(latR),
            z: Math.cos(latR) * Math.sin(lngR),
          };
          const p1 = rotateX(rotateY(p0, rotationRef.current.yaw), rotationRef.current.pitch);
          if (p1.z < 0) {
            started = false;
            continue;
          }
          const p2 = project(p1, radius, center);
          if (!started) {
            ctx.moveTo(p2.x, p2.y);
            started = true;
          } else {
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();
      }

      for (let lng = 0; lng < 360; lng += graticuleStep) {
        const lngR = (lng * Math.PI) / 180;
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const latR = (lat * Math.PI) / 180;
          const p0 = {
            x: Math.cos(latR) * Math.cos(lngR),
            y: Math.sin(latR),
            z: Math.cos(latR) * Math.sin(lngR),
          };
          const p1 = rotateX(rotateY(p0, rotationRef.current.yaw), rotationRef.current.pitch);
          if (p1.z < 0) {
            started = false;
            continue;
          }
          const p2 = project(p1, radius, center);
          if (!started) {
            ctx.moveTo(p2.x, p2.y);
            started = true;
          } else {
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawLandBorders = (radius: number, center: number) => {
      if (!land) return;
      ctx.save();
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = 0.95;
      ctx.lineWidth = Math.max(0.7, lineWidth);

      const drawRing = (ring: LonLat[]) => {
        let started = false;
        ctx.beginPath();
        for (const [lng, lat] of ring) {
          const lon = (lng * Math.PI) / 180;
          const phi = (lat * Math.PI) / 180;
          const p0 = {
            x: Math.cos(phi) * Math.cos(lon),
            y: Math.sin(phi),
            z: Math.cos(phi) * Math.sin(lon),
          };
          const p1 = rotateX(rotateY(p0, rotationRef.current.yaw), rotationRef.current.pitch);
          if (p1.z < 0) {
            started = false;
            continue;
          }
          const p2 = project(p1, radius, center);
          if (!started) {
            ctx.moveTo(p2.x, p2.y);
            started = true;
          } else {
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();
      };

      for (const feature of land.features) {
        if (feature.geometry.type === "Polygon") {
          const rings = feature.geometry.coordinates as PolygonRings;
          drawRing(rings[0]);
        } else {
          const polys = feature.geometry.coordinates as PolygonRings[];
          for (const poly of polys) drawRing(poly[0]);
        }
      }
      ctx.restore();
    };

    const render = () => {
      const size = canvas.width / (window.devicePixelRatio || 1);
      const center = size / 2;
      const radius = center * globeScale * scaleRef.current;

      if (!draggingRef.current) {
        rotationRef.current.yaw += rotationSpeed * 0.01;
      }

      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = oceanColor;
      ctx.fill();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = 0.9;
      ctx.stroke();

      drawGraticule(radius, center);
      drawLandBorders(radius, center);

      ctx.fillStyle = dotColor;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      for (const d of dots) {
        const r = rotateX(rotateY(d, rotationRef.current.yaw), rotationRef.current.pitch);
        if (r.z < 0) continue;
        const p = project(r, radius, center);
        const dotR = Math.max(0.35, dotSize * p.k);
        ctx.moveTo(p.x + dotR, p.y);
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(render);
    };

    const onMouseDown = (event: MouseEvent) => {
      draggingRef.current = true;
      const startX = event.clientX;
      const startY = event.clientY;
      const start = { ...rotationRef.current };

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        rotationRef.current.yaw = start.yaw + dx * 0.01;
        rotationRef.current.pitch = Math.max(-1.2, Math.min(1.2, start.pitch + dy * 0.01));
      };
      const onUp = () => {
        draggingRef.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      scaleRef.current *= event.deltaY > 0 ? 0.94 : 1.06;
      scaleRef.current = Math.max(0.7, Math.min(1.45, scaleRef.current));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    rafRef.current = requestAnimationFrame(render);

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      observer.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("wheel", onWheel);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [
    dotColor,
    dots,
    dotSize,
    globeScale,
    graticuleStep,
    land,
    lineColor,
    lineWidth,
    oceanColor,
    rotationSpeed,
  ]);

  return <canvas ref={canvasRef} className={className} aria-label="Wireframe globe" />;
}
