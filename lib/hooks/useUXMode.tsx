"use client";

import * as React from "react";

export type UXMode = "good" | "bad";

type UXModeContextValue = {
  mode: UXMode;
  setMode: (mode: UXMode) => void;
  toggleMode: () => void;
};

const UXModeContext = React.createContext<UXModeContextValue | null>(null);

const STORAGE_KEY = "kims-world:ux-mode";

function readStoredMode(): UXMode | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === "bad" || raw === "good" ? raw : null;
  } catch {
    return null;
  }
}

function writeStoredMode(mode: UXMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Ignore storage errors (private mode, blocked, etc.)
  }
}

export function UXModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<UXMode>("good");

  React.useEffect(() => {
    const stored = readStoredMode();
    if (stored) setModeState(stored);
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.uxMode = mode;
    writeStoredMode(mode);
  }, [mode]);

  const value = React.useMemo<UXModeContextValue>(() => {
    return {
      mode,
      setMode: setModeState,
      toggleMode: () => setModeState((prev) => (prev === "good" ? "bad" : "good")),
    };
  }, [mode]);

  return <UXModeContext.Provider value={value}>{children}</UXModeContext.Provider>;
}

export function useUXMode() {
  const value = React.useContext(UXModeContext);
  if (!value) {
    throw new Error("useUXMode must be used within UXModeProvider");
  }
  return value;
}

