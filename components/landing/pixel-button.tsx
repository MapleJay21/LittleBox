"use client";

import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type PixelButtonProps = {
  text?: string;
  colors?: {
    background?: string;
    borderColor?: string;
    text?: string;
    beamColor1?: string;
    beamColor2?: string;
    glowColor?: string;
  };
  pixelColors?: string[];
  pixelAnimationMode?: "always" | "onHover";
  onClick?: () => void;
  style?: CSSProperties;
};

type Pixel = {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  delay: number;
  color: string;
};

const defaultColors = {
  background: "#000000",
  borderColor: "#1a1818",
  text: "#ffffff",
  beamColor1: "#3b82f6",
  beamColor2: "#8484ff",
  glowColor: "#3b82f6",
};

export function PixelButton({
  text = "Get unlimited access",
  colors = defaultColors,
  pixelColors = ["#3b82f6", "#60a5fa", "#93c5fd"],
  pixelAnimationMode = "onHover",
  onClick,
  style,
}: PixelButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const frameRef = useRef<number | null>(null);
  const rippleRef = useRef({ active: false, x: 0, y: 0, start: 0 });
  const [isHovered, setIsHovered] = useState(pixelAnimationMode === "always");
  const [isPressed, setIsPressed] = useState(false);

  const backgroundColor = colors.background ?? defaultColors.background;
  const borderColor = colors.borderColor ?? defaultColors.borderColor;
  const textColor = colors.text ?? defaultColors.text;
  const beamColor1 = colors.beamColor1 ?? defaultColors.beamColor1;
  const beamColor2 = colors.beamColor2 ?? defaultColors.beamColor2;
  const glowColor = colors.glowColor ?? defaultColors.glowColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    if (!canvas || !button) return;

    const initializePixels = () => {
      const rect = button.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const gap = 5 * dpr;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const pixels: Pixel[] = [];

      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          const distance = Math.hypot(x - centerX, y - centerY);
          pixels.push({
            x,
            y,
            size: 0,
            maxSize: (1 + Math.random() * 2) * dpr,
            delay: distance * 0.18,
            color: pixelColors[Math.floor(Math.random() * pixelColors.length)],
          });
        }
      }

      pixelsRef.current = pixels;
    };

    initializePixels();

    const resizeObserver = new ResizeObserver(initializePixels);
    resizeObserver.observe(button);

    return () => {
      resizeObserver.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [pixelColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const shouldShow = isHovered || pixelAnimationMode === "always";
      const rippleAge = rippleRef.current.active ? time - rippleRef.current.start : Infinity;

      for (const pixel of pixelsRef.current) {
        const target = shouldShow ? pixel.maxSize : 0;
        const shimmer = shouldShow ? Math.sin((time + pixel.delay) / 260) * 0.35 : 0;
        pixel.size += (target + shimmer - pixel.size) * 0.11;

        let rippleBoost = 0;
        if (rippleAge < 700) {
          const wave = rippleAge * 0.45;
          const distance = Math.hypot(pixel.x - rippleRef.current.x, pixel.y - rippleRef.current.y);
          const proximity = Math.max(0, 1 - Math.abs(distance - wave) / 42);
          rippleBoost = proximity * proximity * 4;
        }

        const size = Math.max(0, pixel.size + rippleBoost);
        if (size < 0.1) continue;

        ctx.fillStyle = pixel.color;
        ctx.fillRect(pixel.x - size / 2, pixel.y - size / 2, size, size);
      }

      if (rippleAge >= 700) rippleRef.current.active = false;

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [isHovered, pixelAnimationMode]);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    rippleRef.current = {
      active: true,
      x: (event.clientX - rect.left) * dpr,
      y: (event.clientY - rect.top) * dpr,
      start: performance.now(),
    };
    setIsPressed(true);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onPointerDown={handlePointerDown}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(pixelAnimationMode === "always");
        setIsPressed(false);
      }}
      className="pixel-button"
      style={
        {
          "--pixel-bg": backgroundColor,
          "--pixel-border": borderColor,
          "--pixel-text": textColor,
          "--pixel-beam-1": beamColor1,
          "--pixel-beam-2": beamColor2,
          "--pixel-glow": glowColor,
          ...style,
        } as CSSProperties
      }
    >
      <canvas ref={canvasRef} className="pixel-button-canvas" />
      <span className="pixel-button-glow" data-visible={isHovered} />
      <span className="pixel-button-label" data-pressed={isPressed}>
        {text}
      </span>

      <style>{`
        .pixel-button {
          position: relative;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
          padding: 20px 40px;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: 999px;
          color: var(--pixel-text);
          background:
            linear-gradient(var(--pixel-bg), var(--pixel-bg)) padding-box,
            conic-gradient(
              from 0deg,
              transparent,
              var(--pixel-beam-1),
              var(--pixel-beam-2),
              var(--pixel-beam-1),
              transparent 35%
            ) border-box;
          box-shadow: inset 0 0 0 1px var(--pixel-border);
          cursor: pointer;
          animation: pixel-button-beam 3s linear infinite;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .pixel-button-canvas,
        .pixel-button-glow {
          position: absolute;
          inset: 1px;
          border-radius: inherit;
          pointer-events: none;
        }

        .pixel-button-canvas {
          z-index: 0;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
        }

        .pixel-button-glow {
          z-index: 1;
          box-shadow: inset 0 -1ex 2rem 4px var(--pixel-glow);
          opacity: 0;
          transition: opacity 0.45s ease;
        }

        .pixel-button-glow[data-visible="true"] {
          opacity: 1;
        }

        .pixel-button-label {
          position: relative;
          z-index: 2;
          font-family: Inter, system-ui, sans-serif;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.2;
          white-space: nowrap;
          text-shadow: 0 0 8px var(--pixel-bg), 0 0 2px var(--pixel-bg);
          transition: transform 0.14s ease;
        }

        .pixel-button-label[data-pressed="true"] {
          transform: scale(0.97);
        }

        @keyframes pixel-button-beam {
          to {
            background:
              linear-gradient(var(--pixel-bg), var(--pixel-bg)) padding-box,
              conic-gradient(
                from 360deg,
                transparent,
                var(--pixel-beam-1),
                var(--pixel-beam-2),
                var(--pixel-beam-1),
                transparent 35%
              ) border-box;
          }
        }
      `}</style>
    </button>
  );
}

