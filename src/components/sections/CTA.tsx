"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-content > *", {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-32"
      aria-labelledby="cta-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,130,0,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,130,0,0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF8200]/20 blur-[100px]" aria-hidden />

      <div className="cta-content relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="text-xs tracking-[0.4em] text-[#FF9A33]/80 uppercase">
          Ready when you are
        </p>
        <h2
          id="cta-title"
          className="mt-6 font-[family-name:var(--font-space)] text-4xl font-bold text-black sm:text-6xl md:text-7xl"
        >
          Carry the lab.
          <br />
          <span className="bg-gradient-to-r from-[#FF8200] to-[#FF9A33] bg-clip-text text-transparent">
            Own the stack.
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-black/55">
          Flipper Zero is an open-source multi-tool for ethical research,
          education, and hardware curiosity — designed to feel inevitable.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="animate-pulse-glow">
            <a href={SITE.buyUrl} target="_blank" rel="noreferrer">
              Get Flipper Zero
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
