"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMMUNITY_STATS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AVATARS = ["FZ", "OS", "RF", "HW", "DX", "SEC", "LAB", "DEV"];

function Stat({
  label,
  value,
  suffix,
  active,
}: {
  label: string;
  value: number;
  suffix: string;
  active: boolean;
}) {
  const decimals = Number.isInteger(value) ? 0 : 1;
  const n = useCountUp(value, active, 1600, decimals);
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur">
      <p className="font-[family-name:var(--font-space)] text-4xl text-[#FF9A33] md:text-5xl">
        {n}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-black/50">{label}</p>
    </div>
  );
}

export function Community() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 70%",
        onEnter: () => setActive(true),
      });
      gsap.from(".community-copy", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref },
  );

  useEffect(() => {
    if (!active) return;
    gsap.to(".avatar-orb", {
      y: "random(-12, 12)",
      x: "random(-8, 8)",
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1,
    });
  }, [active]);

  return (
    <section
      id="community"
      ref={ref}
      className="relative overflow-hidden px-6 py-28"
      aria-labelledby="community-title"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        {AVATARS.map((a, i) => (
          <motion.div
            key={a}
            className="avatar-orb absolute flex h-12 w-12 items-center justify-center rounded-full border border-[#FF8200]/30 bg-[#FF8200]/10 text-[10px] font-semibold tracking-wider text-[#FFB366]"
            style={{
              left: `${10 + (i % 4) * 22}%`,
              top: `${15 + Math.floor(i / 4) * 55}%`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {a}
          </motion.div>
        ))}
      </div>

      <div className="community-copy relative z-10 mx-auto max-w-7xl">
        <p className="text-xs tracking-[0.35em] text-[#FF8200]/80 uppercase">
          Community
        </p>
        <h2
          id="community-title"
          className="mt-4 max-w-3xl font-[family-name:var(--font-space)] text-4xl font-bold text-black md:text-5xl"
        >
          Built by researchers. Extended by everyone.
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY_STATS.map((s) => (
            <Stat
              key={s.label}
              label={s.label}
              value={s.value}
              suffix={s.suffix}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
