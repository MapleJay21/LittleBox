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
  depth?: number;
  speed?: number;
  spread?: number;
  variant?: "desktop" | "phone";
  backgroundColor?: string;
};

export function StarCloud({
  width = "100%",
  height = "100%",
  style,
  starCount = 200,
  starSize = 2,
  starColor = "#FFFFFF",
  depth = 1000,
  speed = 1,
  spread = 1.35,
  variant = "desktop",
  backgroundColor = "#000000",
}: StarCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const centerRef = useRef({ x: 0, y: 0 });
  const boundsRef = useRef({ x: 600, y: 400 });
  const [stars, setStars] = useState<Star[]>([]);
  const [sizeTick, setSizeTick] = useState(0);

  const initialStars = useMemo(
    () => {
      const maxX = boundsRef.current.x;
      const maxY = boundsRef.current.y;
      return Array.from({ length: starCount }, (_, i) => ({
        x: (Math.random() - 0.5) * maxX * 2,
        y: (Math.random() - 0.5) * maxY * 2,
        z: Math.random() * depth,
        id: i,
      }));
    },
    [depth, sizeTick, starCount],
  );

  useEffect(() => {
    setStars(initialStars);
  }, [initialStars]);

  useEffect(() => {
    const updateCenter = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      boundsRef.current = {
        x: Math.max(200, (rect.width * spread) / 2),
        y: Math.max(200, (rect.height * spread) / 2),
      };
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      setSizeTick((prev) => prev + 1);
    };

    updateCenter();
    window.addEventListener("resize", updateCenter);

    return () => window.removeEventListener("resize", updateCenter);
  }, [spread]);

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
      const maxX = boundsRef.current.x;
      const maxY = boundsRef.current.y;

      if (variant === "phone") {
        moveZ = speed * 10;
      } else {
        const mouse = mouseRef.current;
        const center = centerRef.current;
        const dx = mouse.x - center.x;
        const dy = mouse.y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const centerZone = 50;
        const transitionZone = 150;

        if (distance < centerZone) {
          moveZ = speed * 10;
        } else if (distance < centerZone + transitionZone) {
          const blendFactor = (distance - centerZone) / transitionZone;
          const easedBlend = blendFactor * blendFactor * (3 - 2 * blendFactor);
          moveZ = speed * 10 * (1 - easedBlend);

          const directionalSpeed = speed * (1200 / distance) * easedBlend;
          moveX = (-dx / distance) * directionalSpeed;
          moveY = (-dy / distance) * directionalSpeed;
        } else {
          const directionalSpeed = speed * (1200 / distance);
          moveX = (-dx / distance) * directionalSpeed;
          moveY = (-dy / distance) * directionalSpeed;
        }
      }

      startTransition(() => {
        setStars((prevStars) =>
          prevStars.map((star) => {
            let newX = star.x + moveX;
            let newY = star.y + moveY;
            let newZ = star.z + moveZ;

            if (newX > maxX) newX = -maxX;
            if (newX < -maxX) newX = maxX;
            if (newY > maxY) newY = -maxY;
            if (newY < -maxY) newY = maxY;
            if (newZ > depth) newZ = 0;
            if (newZ < 0) newZ = depth;

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
  }, [depth, speed, variant]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        backgroundColor,
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
        const opacity = Math.max(0.1, 1 - star.z / depth);

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

