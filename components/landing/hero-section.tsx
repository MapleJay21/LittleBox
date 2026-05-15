"use client";

import { useNavigate } from "react-router-dom";
// import { FlipCard } from "./flip-card";
import { FluidButton } from "./fluid-button";
import { StarCloud } from "./star-cloud";
import { WebglParticleText } from "./webgl-particle-text";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <StarCloud width="100%" height="100%" />
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
          text="(▰˘◡˘▰)"
          onClick={() => {
            navigate("/example");
            window.setTimeout(() => {
              if (window.location.pathname !== "/example") {
                window.location.assign("/example");
              }
            }, 120);
          }}
          borderColor="rgb(250, 250, 250)"
          firstTextColor="rgb(250, 250, 250)"
          secondTextColor="rgb(1, 1, 1)"
          overlayColor="rgb(250, 250, 250)"
        />
      </div>
    </section>
  );
}
