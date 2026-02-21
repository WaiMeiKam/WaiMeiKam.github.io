"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { useUXMode } from "@/lib/hooks/useUXMode";

const BadUxAutoplayAudio = dynamic(() => import("@/components/features/bad-ux/BadUxAutoplayAudio").then((m) => m.BadUxAutoplayAudio), { ssr: false });
const BadUxChatWidget = dynamic(() => import("@/components/features/bad-ux/BadUxChatWidget").then((m) => m.BadUxChatWidget), { ssr: false });
const BadUxCookieWall = dynamic(() => import("@/components/features/bad-ux/BadUxCookieWall").then((m) => m.BadUxCookieWall), { ssr: false });
const BadUxCursorTrail = dynamic(() => import("@/components/features/bad-ux/BadUxCursorTrail").then((m) => m.BadUxCursorTrail), { ssr: false });
const BadUxExitIntent = dynamic(() => import("@/components/features/bad-ux/BadUxExitIntent").then((m) => m.BadUxExitIntent), { ssr: false });
const BadUxPopupStack = dynamic(() => import("@/components/features/bad-ux/BadUxPopupStack").then((m) => m.BadUxPopupStack), { ssr: false });
const BadUxVisitorCounter = dynamic(() => import("@/components/features/bad-ux/BadUxVisitorCounter").then((m) => m.BadUxVisitorCounter), { ssr: false });

export function BadUxLayer() {
  const { mode } = useUXMode();

  if (mode !== "bad") return null;

  return (
    <>
      <BadUxCursorTrail />
      <BadUxAutoplayAudio />
      <BadUxVisitorCounter />
      <BadUxChatWidget />
      <BadUxPopupStack />
      <BadUxExitIntent />
      <BadUxCookieWall />
    </>
  );
}

