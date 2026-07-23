"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HARDWARE_FEATURES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HardwareScene = dynamic(
  () =>
    import("@/components/three/HardwareScene").then((m) => m.HardwareScene),
  { ssr: false },
);

export function HardwareFeatures() {
  const ref = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>("display");

  useGSAP(
    () => {
      gsap.from(".hw-copy > *", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="hardware"
      ref={ref}
      className="relative px-6 py-28 md:py-36"
      aria-labelledby="hardware-title"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="hw-copy">
          <p className="text-xs tracking-[0.35em] text-[#FF8200]/80 uppercase">
            Cinematic hardware
          </p>
          <h2
            id="hardware-title"
            className="mt-4 font-[family-name:var(--font-space)] text-4xl font-bold text-black md:text-5xl"
          >
            Every radio. Every pin. Interactive.
          </h2>
          <p className="mt-5 max-w-md text-black/55">
            Hover or select a subsystem to orbit the device, light the outline,
            and inspect what makes Flipper a pocket research platform.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {HARDWARE_FEATURES.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(f.id)}
                  className={`w-full cursor-pointer rounded-2xl border px-3 py-3 text-left text-sm transition ${
                    activeId === f.id
                      ? "border-[#FF8200]/50 bg-[#FF8200]/10 text-black"
                      : "border-black/10 bg-white text-black/60 hover:border-black/15 hover:text-black"
                  }`}
                >
                  {f.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <HardwareScene activeId={activeId} onSelect={setActiveId} />
      </div>
    </section>
  );
}
