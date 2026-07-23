"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Volume2, VolumeX } from "lucide-react";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
};

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => undefined,
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const toggle = useCallback(() => setEnabled((v) => !v), []);
  const value = useMemo(() => ({ enabled, toggle }), [enabled, toggle]);

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}

export function SoundToggle() {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-black/5 text-[#FF9A33] backdrop-blur transition hover:border-[#FF8200]/40 hover:bg-[#FF8200]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8200]"
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
