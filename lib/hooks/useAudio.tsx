"use client";

import * as React from "react";

type AudioContextValue = {
  isPlaying: boolean;
  toggle: () => void;
  volume: number;
  setVolume: (v: number) => void;
  audioAvailable: boolean;
};

const AudioContext = React.createContext<AudioContextValue | null>(null);

const STORAGE_KEY = "kims-world:audio-volume";
const DEFAULT_VOLUME = 0.35;

function readStoredVolume(): number {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return DEFAULT_VOLUME;
    const parsed = parseFloat(raw);
    return Number.isFinite(parsed) ? Math.max(0, Math.min(1, parsed)) : DEFAULT_VOLUME;
  } catch {
    return DEFAULT_VOLUME;
  }
}

function writeStoredVolume(v: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(v));
  } catch {
    /* noop */
  }
}

export function AudioProvider({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolumeState] = React.useState(DEFAULT_VOLUME);
  const [audioAvailable, setAudioAvailable] = React.useState(true);

  React.useEffect(() => {
    setVolumeState(readStoredVolume());
  }, []);

  React.useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;

    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleError = () => {
      setAudioAvailable(false);
      setIsPlaying(false);
    };
    const handleCanPlay = () => setAudioAvailable(true);

    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audioRef.current = null;
    };
    // Only re-create when src changes, not on volume change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    writeStoredVolume(volume);
  }, [volume]);

  const toggle = React.useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const setVolume = React.useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const value = React.useMemo<AudioContextValue>(
    () => ({ isPlaying, toggle, volume, setVolume, audioAvailable }),
    [isPlaying, toggle, volume, setVolume, audioAvailable],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const value = React.useContext(AudioContext);
  if (!value) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return value;
}
