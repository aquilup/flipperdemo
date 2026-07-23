"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPECS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { GlassCard } from "@/components/ui/glass-card";
import { Activity, Box, Bluetooth, Scale } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function SpecValue({
  numeric,
  suffix,
  fallback,
  active,
}: {
  numeric: number | null;
  suffix: string;
  fallback: string;
  active: boolean;
}) {
  const decimals = numeric !== null && !Number.isInteger(numeric) ? 1 : 0;
  const counted = useCountUp(
    numeric ?? 0,
    active && numeric !== null,
    1400,
    decimals,
  );
  if (numeric === null) return <>{fallback}</>;
  return (
    <>
      {counted}
      {suffix}
    </>
  );
}

export function Specs() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".spec-card");
      if (!cards.length) return;

      gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform" });

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => setActive(true),
          },
        },
      );
    },
    { scope: ref },
  );

  useEffect(() => {
    const icons = ref.current?.querySelectorAll(".spec-icon");
    if (!icons || !active) return;
    gsap.fromTo(
      icons,
      { rotate: 0 },
      {
        rotate: 360,
        duration: 1.2,
        stagger: 0.05,
        ease: "power2.inOut",
      },
    );
  }, [active]);

  return (
    <section
      id="specs"
      ref={ref}
      className="relative px-6 py-28"
      aria-labelledby="specs-title"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs tracking-[0.35em] text-[#FF8200]/80 uppercase">
          Specifications
        </p>
        <h2
          id="specs-title"
          className="mt-4 font-[family-name:var(--font-space)] text-4xl font-bold text-black md:text-5xl"
        >
          Specs that feel alive
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECS.map((spec, i) => (
            <GlassCard key={spec.label} className="spec-card">
              <div className="flex items-start justify-between">
                <p className="text-xs tracking-[0.25em] text-black/40 uppercase">
                  {spec.label}
                </p>
                <span className="spec-icon text-[#FF8200]">
                  {i % 4 === 0 ? (
                    <Activity size={16} />
                  ) : i % 4 === 1 ? (
                    <Box size={16} />
                  ) : i % 4 === 2 ? (
                    <Bluetooth size={16} />
                  ) : (
                    <Scale size={16} />
                  )}
                </span>
              </div>
              <p className="mt-4 font-[family-name:var(--font-space)] text-3xl text-black">
                <SpecValue
                  numeric={spec.numeric}
                  suffix={spec.suffix}
                  fallback={spec.value}
                  active={active}
                />
              </p>
              {spec.numeric !== null && (
                <p className="mt-1 text-sm text-black/40">{spec.value}</p>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
