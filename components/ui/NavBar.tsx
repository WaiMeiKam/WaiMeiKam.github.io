"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { UXToggle } from "@/components/features/UXToggle";
import { cx } from "@/lib/utils/cx";
import { useUXMode } from "@/lib/hooks/useUXMode";
import { useIntro } from "@/lib/context/IntroContext";

const LINKS = [
  { href: "/get-to-know-kim", label: "Get to Know Kim", icon: "❓" },
  { href: "/thinking-about", label: "Thinking About", icon: "🧠" },
  { href: "/noodling-on", label: "Noodling On", icon: "🗒️" },
  { href: "/tinkered-and-delivered", label: "Tinkered & Delivered", icon: "🔧" },
] as const;

export function NavBar() {
  const pathname = usePathname();
  const { mode } = useUXMode();
  const { introActive } = useIntro();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (introActive) return null;

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  if (mode === "bad") {
    return (
      <div className="sticky top-0 z-50">
        <div className="overflow-hidden bg-[var(--semantic-primary)] text-white">
          <div className="flex w-[200%] gap-8 whitespace-nowrap px-2 py-1 text-[10px] font-black uppercase tracking-[0.25em]"
               style={{ animation: "kimsWorldMarquee 8s linear infinite" }}>
            <span>
              Principal Product Designer • CLICK HERE • LIMITED TIME OFFER • COOKIE BONUS •
            </span>
            <span>
              Principal Product Designer • CLICK HERE • LIMITED TIME OFFER • COOKIE BONUS •
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 bg-white/10 px-2 py-2 text-[var(--semantic-text)] backdrop-blur">
          <nav aria-label="Mystery meat navigation" className="flex flex-1 gap-2 overflow-x-auto">
            <Link
              href="/"
              className={cx(
                "grid h-8 w-8 place-items-center rounded bg-black/20 text-xs outline-none",
                "focus-visible:ring-2 focus-visible:ring-white/60",
              )}
              aria-label="Home"
            >
              🏠
            </Link>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "grid h-8 w-8 place-items-center rounded bg-black/20 text-xs outline-none",
                  pathname === link.href ? "ring-2 ring-white/60" : "opacity-70 hover:opacity-100",
                  "focus-visible:ring-2 focus-visible:ring-white/60",
                )}
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </nav>

          <UXToggle size="sm" className="opacity-60 hover:opacity-90" />
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[color-mix(in_srgb,var(--semantic-background)_75%,white_25%)] backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
        >
          <span className="text-sm font-semibold tracking-tight text-[var(--semantic-heading)]">
            Kim&rsquo;s World
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "rounded-[var(--radius-full)] px-3 py-2 text-sm font-medium outline-none",
                  active
                    ? "bg-black/8 text-[var(--semantic-heading)]"
                    : "text-[var(--semantic-text)] opacity-80 hover:opacity-100 hover:bg-black/5",
                  "focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <UXToggle size="sm" />

          <button
            type="button"
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] bg-black/5 text-[var(--semantic-heading)] outline-none hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Open navigation menu"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div id="mobile-nav" className="sm:hidden border-t border-black/5 bg-[var(--semantic-background)]">
          <nav aria-label="Mobile" className="mx-auto w-full max-w-6xl px-4 py-3">
            <div className="grid gap-2">
              {LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cx(
                      "rounded-[var(--radius-md)] px-4 py-3 text-sm font-semibold outline-none",
                      active
                        ? "bg-[var(--semantic-surface)] text-[var(--semantic-heading)] ring-1 ring-black/10"
                        : "bg-black/3 text-[var(--semantic-text)] hover:bg-black/5",
                      "focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

