"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0.35, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: node,
              containerAnimation: tween,
              start: "left 85%",
              end: "left 45%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      aria-labelledby="timeline-title"
    >
      <div className="px-6">
        <p className="text-xs tracking-[0.35em] text-[#FF8200]/80 uppercase">
          Origin story
        </p>
        <h2
          id="timeline-title"
          className="mt-4 font-[family-name:var(--font-space)] text-4xl font-bold text-black md:text-5xl"
        >
          From idea to open source
        </h2>
      </div>
      <div className="mt-16">
        <div
          ref={trackRef}
          className="flex w-max gap-8 px-6 pb-10 will-change-transform"
        >
          {TIMELINE.map((item, i) => (
            <article
              key={item.title}
              className="timeline-node relative w-[78vw] max-w-md shrink-0 rounded-[2rem] border border-black/10 bg-white/80 p-8 backdrop-blur md:w-[420px]"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FF8200]/40 bg-[#FF8200]/10 font-[family-name:var(--font-space)] text-sm text-[#FF9A33]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#FF8200]/50 to-transparent" />
              </div>
              <h3 className="font-[family-name:var(--font-space)] text-2xl text-black">
                {item.title}
              </h3>
              <p className="mt-3 text-black/55">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
