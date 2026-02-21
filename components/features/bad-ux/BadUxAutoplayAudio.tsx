"use client";

import * as React from "react";

function createAnnoyingLoop(ctx: AudioContext) {
  const master = ctx.createGain();
  master.gain.value = 0.03;
  master.connect(ctx.destination);

  const osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.value = 440;

  const gain = ctx.createGain();
  gain.gain.value = 0;

  osc.connect(gain);
  gain.connect(master);
  osc.start();

  let tick = 0;
  const interval = window.setInterval(() => {
    const now = ctx.currentTime;
    const beep = (tick % 8) !== 5; // a "wrong" rhythm
    const freq = [440, 659.25, 523.25, 880][tick % 4];

    osc.frequency.setValueAtTime(freq, now);
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(beep ? 0.9 : 0.0, now + 0.01);
    gain.gain.linearRampToValueAtTime(0.0, now + 0.09);

    tick += 1;
  }, 140);

  return () => {
    window.clearInterval(interval);
    try {
      osc.stop();
    } catch {
      // no-op
    }
    master.disconnect();
  };
}

export function BadUxAutoplayAudio() {
  const ctxRef = React.useRef<AudioContext | null>(null);
  const stopRef = React.useRef<null | (() => void)>(null);
  const [isMuted, setIsMuted] = React.useState(false);
  const [needsGesture, setNeedsGesture] = React.useState(false);

  const start = React.useCallback(async () => {
    if (ctxRef.current) return;
    const win = window as Window & { webkitAudioContext?: typeof AudioContext };
    const AudioContextCtor = window.AudioContext ?? win.webkitAudioContext;
    if (!AudioContextCtor) return;

    const ctx = new AudioContextCtor();
    ctxRef.current = ctx;

    try {
      if (ctx.state !== "running") await ctx.resume();
      stopRef.current = createAnnoyingLoop(ctx);
      setNeedsGesture(false);
    } catch {
      setNeedsGesture(true);
    }
  }, []);

  const stop = React.useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    ctxRef.current?.close().catch(() => undefined);
    ctxRef.current = null;
  }, []);

  React.useEffect(() => {
    if (!isMuted) void start();

    const handleGesture = () => {
      if (!isMuted && needsGesture) void start();
    };

    window.addEventListener("pointerdown", handleGesture, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      stop();
    };
  }, [isMuted, needsGesture, start, stop]);

  return (
    <button
      type="button"
      onClick={() => {
        setIsMuted((v) => {
          const next = !v;
          if (next) stop();
          else void start();
          return next;
        });
      }}
      className="fixed right-1 top-1 z-[9998] h-2 w-2 rounded bg-white/20 text-[6px] leading-none text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      aria-label={isMuted ? "Unmute annoying audio" : "Mute annoying audio"}
      title={needsGesture ? "Click anywhere to start the music" : undefined}
    >
      {isMuted ? "🔇" : "🔊"}
    </button>
  );
}

