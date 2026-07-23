"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // OBJ is large (~34MB); keep splash up a bit longer on first load
    const t = window.setTimeout(() => setVisible(false), 4200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-live="polite"
          aria-label="Loading Flipper Zero experience"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="h-16 w-16 rounded-2xl border border-[#FF8200]/40 bg-gradient-to-br from-[#FF8200]/25 to-black/5 shadow-[0_0_60px_rgba(255,130,0,0.35)]"
              initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="font-[family-name:var(--font-space)] text-sm tracking-[0.35em] text-[#FF8200] uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Flipper Zero
            </motion.p>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-black/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF8200] via-[#FF9A33] to-[#FF8200]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
