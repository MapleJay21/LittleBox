"use client";

import {
  type CSSProperties,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  id: number;
};

type StarCloudProps = {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  starCount?: number;
  starSize?: number;
  starColor?: string;
  cloudSize?: number;
  baseSpeed?: number;
  variant?: "desktop" | "phone";
};

export function StarCloud({
  width = "100%",
  height = "100%",
  style,
  starCount = 200,
  starSize = 2,
  starColor = "#FFFFFF",
  cloudSize = 1000,
  baseSpeed = 1,
  variant = "desktop",
}: StarCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const centerRef = useRef({ x: 0, y: 0 });
  const [stars, setStars] = useState<Star[]>([]);

  const initialStars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        x: (Math.random() - 0.5) * cloudSize,
        y: (Math.random() - 0.5) * cloudSize,
        z: Math.random() * cloudSize,
        id: i,
      })),
    [cloudSize, starCount],
  );

  useEffect(() => {
    setStars(initialStars);
  }, [initialStars]);

  useEffect(() => {
    const updateCenter = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };

    updateCenter();
    window.addEventListener("resize", updateCenter);

    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  useEffect(() => {
    if (variant === "phone") return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [variant]);

  useEffect(() => {
    const animate = () => {
      let moveX = 0;
      let moveY = 0;
      let moveZ = 0;

      if (variant === "phone") {
        moveZ = baseSpeed * 10;
      } else {
        const mouse = mouseRef.current;
        const center = centerRef.current;
        const dx = mouse.x - center.x;
        const dy = mouse.y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const centerZone = 50;
        const transitionZone = 150;

        if (distance < centerZone) {
          moveZ = baseSpeed * 10;
        } else if (distance < centerZone + transitionZone) {
          const blendFactor = (distance - centerZone) / transitionZone;
          const easedBlend = blendFactor * blendFactor * (3 - 2 * blendFactor);
          moveZ = baseSpeed * 10 * (1 - easedBlend);

          const directionalSpeed = baseSpeed * (1200 / distance) * easedBlend;
          moveX = (-dx / distance) * directionalSpeed;
          moveY = (-dy / distance) * directionalSpeed;
        } else {
          const speed = baseSpeed * (1200 / distance);
          moveX = (-dx / distance) * speed;
          moveY = (-dy / distance) * speed;
        }
      }

      startTransition(() => {
        setStars((prevStars) =>
          prevStars.map((star) => {
            let newX = star.x + moveX;
            let newY = star.y + moveY;
            let newZ = star.z + moveZ;

            if (newX > cloudSize / 2) newX = -cloudSize / 2;
            if (newX < -cloudSize / 2) newX = cloudSize / 2;
            if (newY > cloudSize / 2) newY = -cloudSize / 2;
            if (newY < -cloudSize / 2) newY = cloudSize / 2;
            if (newZ > cloudSize) newZ = 0;
            if (newZ < 0) newZ = cloudSize;

            return { ...star, x: newX, y: newY, z: newZ };
          }),
        );
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [baseSpeed, cloudSize, variant]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        backgroundColor: "#000000",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {stars.map((star) => {
        const scale = 300 / (300 + star.z);
        const x = star.x * scale;
        const y = star.y * scale;
        const size = starSize * scale;
        const opacity = Math.max(0.1, 1 - star.z / cloudSize);

        return (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              backgroundColor: starColor,
              borderRadius: "50%",
              transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
              opacity,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}

