"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useModelLoad } from "@/components/providers/ModelLoadProvider";

const LOADING_GIF = "https://cdn.flipper.net/zero_landing_what-is_flipper.gif";
const MIN_VISIBLE_MS = 1200;

export function LoadingScreen() {
  const { modelReady } = useModelLoad();
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [gifReady, setGifReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setGifReady(true);
    img.onerror = () => setGifReady(true);
    img.src = LOADING_GIF;
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setMinTimeDone(true), MIN_VISIBLE_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (modelReady && minTimeDone && gifReady) {
      const t = window.setTimeout(() => setVisible(false), 180);
      return () => window.clearTimeout(t);
    }
  }, [modelReady, minTimeDone, gifReady]);

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
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#0a0a0a] shadow-[0_20px_60px_rgba(255,130,0,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOADING_GIF}
                alt="Flipper Zero loading"
                width={480}
                height={270}
                className="h-auto w-[min(80vw,480px)] object-contain"
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
