"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useState,
} from "react";

type FlipCardProps = {
  frontContent: ReactNode;
  backContent: ReactNode;
  flipDirection?: "horizontal" | "vertical";
  flipTrigger?: "hover" | "click";
  animationDuration?: number;
  easingFunction?: string;
  perspective?: number;
  backgroundColor?: string;
  borderRadius?: number;
  shadow?: boolean;
  autoFlip?: boolean;
  autoFlipInterval?: number;
  style?: CSSProperties;
};

export function FlipCard({
  frontContent,
  backContent,
  flipDirection = "horizontal",
  flipTrigger = "hover",
  animationDuration = 0.6,
  easingFunction = "ease-in-out",
  perspective = 1000,
  backgroundColor = "#FFFFFF",
  borderRadius = 12,
  shadow = true,
  autoFlip = false,
  autoFlipInterval = 3,
  style,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isHorizontal = flipDirection === "horizontal";
  const rotate = isHorizontal ? "rotateY" : "rotateX";

  useEffect(() => {
    if (!autoFlip || flipTrigger !== "click") return;

    const interval = window.setInterval(() => {
      setIsFlipped((current) => !current);
    }, autoFlipInterval * 1000);

    return () => window.clearInterval(interval);
  }, [autoFlip, autoFlipInterval, flipTrigger]);

  const faceStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    backgroundColor,
    borderRadius,
    boxShadow: shadow ? "0 24px 80px rgba(0, 0, 0, 0.35)" : "none",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    overflow: "hidden",
  };

  return (
    <div
      style={{
        width: "min(82vw, 520px)",
        height: "min(54vw, 340px)",
        minWidth: 260,
        minHeight: 180,
        perspective,
        cursor: flipTrigger === "click" ? "pointer" : "default",
        ...style,
      }}
      onClick={() => {
        if (flipTrigger === "click") {
          setIsFlipped((current) => !current);
        }
      }}
      onMouseEnter={() => {
        if (flipTrigger === "hover") setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (flipTrigger === "hover") setIsFlipped(false);
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `${rotate}(${isFlipped ? 180 : 0}deg)`,
          transition: `transform ${animationDuration}s ${easingFunction}`,
        }}
      >
        <div style={faceStyle}>{frontContent}</div>
        <div
          style={{
            ...faceStyle,
            transform: `${rotate}(180deg)`,
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}

