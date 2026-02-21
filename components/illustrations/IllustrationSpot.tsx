"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cx, type ClassValue } from "@/lib/utils/cx";

type IllustrationSpotProps = {
  name: string;
  alt?: string;
  className?: ClassValue;
  width?: number;
  height?: number;
  priority?: boolean;
  /** Enable subtle floating animation. Defaults to true. */
  breathing?: boolean;
};

const EXTENSIONS = ["png", "webp", "jpg", "jpeg", "gif", "apng"] as const;

function isAnimated(src: string) {
  return src.endsWith(".gif") || src.endsWith(".apng");
}

function BreatheWrapper({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  if (!enabled) return <>{children}</>;

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function IllustrationSpot({
  name,
  alt,
  className,
  width = 560,
  height = 560,
  priority,
  breathing = true,
}: IllustrationSpotProps) {
  const [resolvedSrc, setResolvedSrc] = React.useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const shouldBreathe = breathing && !reduceMotion;

  React.useEffect(() => {
    let cancelled = false;

    async function resolve() {
      setResolvedSrc(null);

      for (const ext of EXTENSIONS) {
        const src = `/illustrations/${name}.${ext}`;
        const img = new window.Image();

        const loaded = await new Promise<boolean>((done) => {
          img.onload = () => done(true);
          img.onerror = () => done(false);
          img.src = src;
        });

        if (cancelled) return;
        if (loaded) {
          setResolvedSrc(src);
          return;
        }
      }
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (!resolvedSrc) {
    return (
      <BreatheWrapper enabled={shouldBreathe}>
        <div
          aria-label={alt ?? name}
          role="img"
          className={cx(
            "w-full",
            "relative overflow-hidden rounded-[var(--radius-lg)]",
            "bg-[linear-gradient(110deg,rgba(0,0,0,0.04),rgba(0,0,0,0.02),rgba(0,0,0,0.04))]",
            "animate-pulse",
            className,
          )}
          style={{ aspectRatio: `${width}/${height}` }}
        >
          <div
            className={cx(
              "absolute inset-0",
              "bg-[radial-gradient(circle_at_50%_35%,rgba(233,196,106,0.25)_0%,transparent_60%)]",
            )}
          />
        </div>
      </BreatheWrapper>
    );
  }

  if (isAnimated(resolvedSrc)) {
    return (
      <BreatheWrapper enabled={shouldBreathe}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolvedSrc}
          alt={alt ?? ""}
          width={width}
          height={height}
          className={cx("block h-auto w-full", className)}
          loading={priority ? "eager" : "lazy"}
        />
      </BreatheWrapper>
    );
  }

  return (
    <BreatheWrapper enabled={shouldBreathe}>
      <Image
        src={resolvedSrc}
        alt={alt ?? ""}
        width={width}
        height={height}
        priority={priority}
        className={cx("block h-auto w-full", className)}
      />
    </BreatheWrapper>
  );
}
