"use client";

import * as React from "react";

type IntroContextValue = {
  introActive: boolean;
  setIntroActive: (active: boolean) => void;
};

const IntroContext = React.createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introActive, setIntroActive] = React.useState(false);

  const value = React.useMemo(
    () => ({ introActive, setIntroActive }),
    [introActive],
  );

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = React.useContext(IntroContext);
  if (!ctx) {
    throw new Error("useIntro must be used within IntroProvider");
  }
  return ctx;
}
