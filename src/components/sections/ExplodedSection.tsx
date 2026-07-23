"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ExplodedScene = dynamic(
  () =>
    import("@/components/three/ExplodedScene").then((m) => m.ExplodedScene),
  { ssr: false },
);

export function ExplodedSection() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "+=140%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => setProgress(self.progress),
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="exploded"
      ref={ref}
      className="relative px-6 py-20"
      aria-labelledby="exploded-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs tracking-[0.35em] text-[#FF8200]/80 uppercase">
            Exploded view
          </p>
          <h2
            id="exploded-title"
            className="mt-4 font-[family-name:var(--font-space)] text-4xl font-bold text-black md:text-5xl"
          >
            Layers of a pocket lab
          </h2>
          <p className="mt-4 text-black/55">
            Scroll to separate display, PCB, battery, controls, and case —
            each component glowing as it drifts apart.
          </p>
        </div>
        <ExplodedScene progress={progress} />
      </div>
    </section>
  );
}
