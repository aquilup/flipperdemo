"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useModelLoad } from "@/components/providers/ModelLoadProvider";

const FRAME_COUNT = 46;
const FRAME_MS = 200; // meta.txt frame rate: 5 fps
const MIN_VISIBLE_MS = 1200;

const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/loading/frame_${String(i).padStart(2, "0")}.png`,
);

export function LoadingScreen() {
  const { modelReady } = useModelLoad();
  const [frame, setFrame] = useState(0);
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [imagesReady, setImagesReady] = useState(false);

  // Preload animation frames
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      FRAMES.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setImagesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setMinTimeDone(true), MIN_VISIBLE_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!imagesReady) return;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % FRAME_COUNT);
    }, FRAME_MS);
    return () => window.clearInterval(id);
  }, [imagesReady]);

  useEffect(() => {
    if (modelReady && minTimeDone && imagesReady) {
      const t = window.setTimeout(() => setVisible(false), 180);
      return () => window.clearTimeout(t);
    }
  }, [modelReady, minTimeDone, imagesReady]);

  // Safety: never block forever if model fails
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), 45000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-live="polite"
          aria-busy={!modelReady}
          aria-label="Loading Flipper Zero 3D experience"
        >
          <div className="flex flex-col items-center gap-6 px-6">
            <div className="rounded-xl border border-black/10 bg-[#0a0a0a] p-3 shadow-[0_20px_60px_rgba(255,130,0,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FRAMES[frame]}
                alt=""
                width={256}
                height={128}
                className="h-[128px] w-[256px] image-rendering-pixelated"
                style={{ imageRendering: "pixelated" }}
                draggable={false}
              />
            </div>
            <p className="font-[family-name:var(--font-space)] text-xs tracking-[0.35em] text-[#FF8200] uppercase">
              {modelReady ? "Ready" : "Loading 3D model"}
            </p>
            <div className="h-[2px] w-44 overflow-hidden rounded-full bg-black/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF8200] via-[#FF9A33] to-[#FF8200]"
                initial={{ width: "8%" }}
                animate={{
                  width: modelReady ? "100%" : ["12%", "72%", "55%", "88%"],
                }}
                transition={
                  modelReady
                    ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                    : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
