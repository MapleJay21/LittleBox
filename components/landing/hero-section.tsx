"use client";

import { FluidButton } from "./fluid-button";
import { StarCloud } from "./star-cloud";
import { WebglParticleText } from "./webgl-particle-text";

const STARFIELD_CONFIG = {
  count: 320,
  speed: 0.9,
  size: 2.1,
  depth: 1200,
  color: "#CFE8FF",
  spread: 1.5,
  backgroundColor: "#02060F",
} as const;

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute -inset-8 pointer-events-none">
        <StarCloud
          width="100%"
          height="100%"
          starCount={STARFIELD_CONFIG.count}
          speed={STARFIELD_CONFIG.speed}
          starSize={STARFIELD_CONFIG.size}
          depth={STARFIELD_CONFIG.depth}
          starColor={STARFIELD_CONFIG.color}
          spread={STARFIELD_CONFIG.spread}
          backgroundColor={STARFIELD_CONFIG.backgroundColor}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center">
        <div className="h-[220px] w-full max-w-4xl">
          <WebglParticleText
            text="MapleJay's Space"
            particleColor="#FFFFFF"
            fontSize={104}
            density={2}
            particleSize={1.1}
            idleSpeed={3.0}
            mouseRadius={150}
          />
        </div>

        <FluidButton
          text="Start Creating"
          navTo="/example"
          borderColor="rgb(250, 250, 250)"
          firstTextColor="rgb(250, 250, 250)"
          secondTextColor="rgb(1, 1, 1)"
          overlayColor="rgb(250, 250, 250)"
        />
      </div>
    </section>
  );
}
