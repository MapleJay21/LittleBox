"use client";

import { FlipCard } from "./flip-card";
import { PixelButton } from "./pixel-button";
import { StarCloud } from "./star-cloud";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <StarCloud width="100%" height="100%" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center">
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

      
      {/* Subtle grid lines */}
      {/*<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">*/}
      {/*  {[...Array(8)].map((_, i) => (*/}
      {/*    <div*/}
      {/*      key={`h-${i}`}*/}
      {/*      className="absolute h-px bg-foreground/10"*/}
      {/*      style={{*/}
      {/*        top: `${12.5 * (i + 1)}%`,*/}
      {/*        left: 0,*/}
      {/*        right: 0,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*  {[...Array(12)].map((_, i) => (*/}
      {/*    <div*/}
      {/*      key={`v-${i}`}*/}
      {/*      className="absolute w-px bg-foreground/10"*/}
      {/*      style={{*/}
      {/*        left: `${8.33 * (i + 1)}%`,*/}
      {/*        top: 0,*/}
      {/*        bottom: 0,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
      
      {/*<div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">*/}
      {/*  /!* Eyebrow *!/*/}
      {/*  <div */}
      {/*    className={`mb-8 transition-all duration-700 ${*/}
      {/*      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"*/}
      {/*    }`}*/}
      {/*  >*/}
      {/*    <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">*/}
      {/*      <span className="w-8 h-px bg-foreground/30" />*/}
      {/*      The platform for modern teams*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*  */}
      {/*  /!* Main headline *!/*/}
      {/*  <div className="mb-12">*/}
      {/*    <h1 */}
      {/*      className={`text-[clamp(3rem,12vw,10rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${*/}
      {/*        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"*/}
      {/*      }`}*/}
      {/*    >*/}
      {/*      <span className="block">The platform</span>*/}
      {/*      <span className="block">*/}
      {/*        to{" "}*/}
      {/*        <span className="relative inline-block">*/}
      {/*          <span */}
      {/*            key={wordIndex}*/}
      {/*            className="inline-flex"*/}
      {/*          >*/}
      {/*            {words[wordIndex].split("").map((char, i) => (*/}
      {/*              <span*/}
      {/*                key={`${wordIndex}-${i}`}*/}
      {/*                className="inline-block animate-char-in"*/}
      {/*                style={{*/}
      {/*                  animationDelay: `${i * 50}ms`,*/}
      {/*                }}*/}
      {/*              >*/}
      {/*                {char}*/}
      {/*              </span>*/}
      {/*            ))}*/}
      {/*          </span>*/}
      {/*          <span className="absolute -bottom-2 left-0 right-0 h-3 bg-foreground/10" />*/}
      {/*        </span>*/}
      {/*      </span>*/}
      {/*    </h1>*/}
      {/*  </div>*/}
      {/*  */}
      {/*  /!* Description *!/*/}
      {/*  <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">*/}
      {/*    <p */}
      {/*      className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${*/}
      {/*        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"*/}
      {/*      }`}*/}
      {/*    >*/}
      {/*      Your toolkit to stop configuring and start innovating. */}
      {/*      Securely build, deploy, and scale the best experiences.*/}
      {/*    </p>*/}
      {/*    */}
      {/*    /!* CTAs *!/*/}
      {/*    <div */}
      {/*      className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${*/}
      {/*        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"*/}
      {/*      }`}*/}
      {/*    >*/}
      {/*      <Button */}
      {/*        size="lg" */}
      {/*        className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"*/}
      {/*      >*/}
      {/*        Start free trial*/}
      {/*        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />*/}
      {/*      </Button>*/}
      {/*      <Button */}
      {/*        size="lg" */}
      {/*        variant="outline" */}
      {/*        className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"*/}
      {/*      >*/}
      {/*        Watch demo*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  */}
      {/*</div>*/}
      
      {/* Stats marquee - full width outside container */}
      {/*<div */}
      {/*  className={`absolute bottom-24 left-0 right-0 transition-all duration-700 delay-500 ${*/}
      {/*    isVisible ? "opacity-100" : "opacity-0"*/}
      {/*  }`}*/}
      {/*>*/}
      {/*  <div className="flex gap-16 marquee whitespace-nowrap">*/}
      {/*    {[...Array(2)].map((_, i) => (*/}
      {/*      <div key={i} className="flex gap-16">*/}
      {/*        {[*/}
      {/*          { value: "20 days", label: "saved on builds", company: "NETFLIX" },*/}
      {/*          { value: "98%", label: "faster deployment", company: "STRIPE" },*/}
      {/*          { value: "300%", label: "throughput increase", company: "LINEAR" },*/}
      {/*          { value: "6x", label: "faster to ship", company: "NOTION" },*/}
      {/*        ].map((stat) => (*/}
      {/*          <div key={`${stat.company}-${i}`} className="flex items-baseline gap-4">*/}
      {/*            <span className="text-4xl lg:text-5xl font-display">{stat.value}</span>*/}
      {/*            <span className="text-sm text-muted-foreground">*/}
      {/*              {stat.label}*/}
      {/*              <span className="block font-mono text-xs mt-1">{stat.company}</span>*/}
      {/*            </span>*/}
      {/*          </div>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
      
      {/* Scroll indicator */}
      
    </section>
  );
}
