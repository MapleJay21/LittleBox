"use client";

import { useRouter } from "next/navigation";
import { FlipCard } from "./flip-card";
import { PixelButton } from "./pixel-button";
import { StarCloud } from "./star-cloud";
import { WebglParticleText } from "./webgl-particle-text";
import { WireframeGlobe } from "./wireframe-globe";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <StarCloud width="100%" height="100%" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center">
        <div className="h-[220px] w-full max-w-4xl">
          <WebglParticleText
            text="Build wild ideas"
            particleColor="#FFFFFF"
            fontSize={104}
            density={2}
            particleSize={1.1}
            idleSpeed={3.0}
            mouseRadius={150}
          />
        </div>

        {/*<div className="h-[300px] w-[300px]">*/}
          {/*<WireframeGlobe*/}
          {/*  oceanColor="#050505"*/}
          {/*  lineColor="#FFFFFF"*/}
          {/*  dotColor="#9CA3AF"*/}
          {/*  rotationSpeed={0.9}*/}
          {/*  dotCount={900}*/}
          {/*  dotSize={0.55}*/}
          {/*  graticuleStep={16}*/}
          {/*/>*/}
        {/*</div>*/}

        <FlipCard
          flipTrigger="hover"
          animationDuration={0.7}
          borderRadius={28}
          backgroundColor="rgba(255, 255, 255, 0.92)"
          shadow
          frontContent={
            <div className="flex h-full w-full flex-col items-center justify-center bg-white px-8 text-center text-neutral-950">
              <span className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
                Hover card
              </span>
              <h1 className="font-display text-5xl leading-none md:text-7xl">
                Build wild ideas
              </h1>
            </div>
          }
          backContent={
            <div className="flex h-full w-full flex-col items-center justify-center bg-white px-8 text-center text-neutral-950">
              <p className="max-w-md text-xl leading-relaxed md:text-2xl">
                Flip the surface, reveal the next layer, and keep the motion playful.
              </p>
            </div>
          }
          style={{
            color: "#111111",
          }}
        />

        <PixelButton
          text="Start creating"
          onClick={() => router.push("/example")}
          colors={{
            background: "#FFFFFF",
            borderColor: "#111111",
            text: "#111111",
            beamColor1: "#0B5F55",
            beamColor2: "#00D8C0",
            glowColor: "#00D8C0",
          }}
          pixelColors={["#0B5F55", "#00D8C0", "#111111"]}
        />
      </div>
    </section>
  );
}
