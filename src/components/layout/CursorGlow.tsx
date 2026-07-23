"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF8200]/15 blur-3xl md:block"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}
