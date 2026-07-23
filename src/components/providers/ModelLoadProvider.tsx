"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ModelLoadContextValue = {
  modelReady: boolean;
  markModelReady: () => void;
};

const ModelLoadContext = createContext<ModelLoadContextValue>({
  modelReady: false,
  markModelReady: () => undefined,
});

export function ModelLoadProvider({ children }: { children: ReactNode }) {
  const [modelReady, setModelReady] = useState(false);
  const markModelReady = useCallback(() => setModelReady(true), []);
  const value = useMemo(
    () => ({ modelReady, markModelReady }),
    [modelReady, markModelReady],
  );

  return (
    <ModelLoadContext.Provider value={value}>
      {children}
    </ModelLoadContext.Provider>
  );
}

export function useModelLoad() {
  return useContext(ModelLoadContext);
}
