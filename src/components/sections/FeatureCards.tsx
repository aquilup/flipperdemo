"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Radio,
  Cpu,
  Usb,
  HardDrive,
  GitBranch,
  BatteryCharging,
  Shield,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { FEATURE_CARDS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/glass-card";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS: Record<string, LucideIcon> = {
  Radio,
  Cpu,
  Usb,
  HardDrive,
  GitBranch,
  BatteryCharging,
  Shield,
  Code2,
};

export function FeatureCards() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");
      if (!cards.length) return;

      gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform" });

      gsap.fromTo(
        cards,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section
      id="features"
      ref={ref}
      className="relative px-6 py-28"
      aria-labelledby="features-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.35em] text-[#FF8200]/80 uppercase">
            Capability matrix
          </p>
          <h2
            id="features-title"
            className="mt-4 font-[family-name:var(--font-space)] text-4xl font-bold text-black md:text-5xl"
          >
            Floating glass. Real power.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((card) => {
            const Icon = ICONS[card.icon] ?? Cpu;
            return (
              <GlassCard key={card.title} className="feature-card min-h-[220px]">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FF8200]/25 bg-[#FF8200]/10 text-[#FF8200]">
                  <Icon size={20} aria-hidden />
                </div>
                <h3 className="font-[family-name:var(--font-space)] text-lg text-black">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">
                  {card.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
