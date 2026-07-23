"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMouseParallax } from "@/hooks/useMouseParallax";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-white" /> },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const parallax = useMouseParallax(reduced ? 0 : 14);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: reduced ? false : 1,
          snap: reduced ? undefined : { snapTo: [0, 0.5, 1], duration: 0.4 },
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      if (textRef.current) {
        tl.to(
          textRef.current,
          {
            opacity: 0,
            y: -80,
            filter: "blur(12px)",
            ease: "none",
          },
          0,
        );
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Flipper Zero hero"
    >
      <HeroScene progress={progress} />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#ffffff_75%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#ffffff] to-transparent"
        aria-hidden
      />

      <div
        ref={textRef}
        className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-24 text-center md:justify-center md:pb-0"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
        }}
      >
        <p className="mb-4 text-xs tracking-[0.4em] text-[#FF9A33]/80 uppercase">
          Open-source hardware lab
        </p>
        <h1 className="font-[family-name:var(--font-space)] text-5xl font-bold tracking-tight text-black sm:text-7xl md:text-8xl">
          Flipper{" "}
          <span className="bg-gradient-to-r from-[#FF9A33] via-[#FF8200] to-[#FFB366] bg-clip-text text-transparent">
            Zero
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-black/60 sm:text-lg">
          {SITE.tagline}
        </p>
        <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <a href={SITE.buyUrl} target="_blank" rel="noreferrer">
              Buy Now
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#hardware">Explore</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
