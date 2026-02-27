import type { Metadata } from "next";
import "./globals.css";
import "./ux-mode.css";

import { UXModeProvider } from "@/lib/hooks/useUXMode";
import { AudioProvider } from "@/lib/hooks/useAudio";
import { IntroProvider } from "@/lib/context/IntroContext";
import { BadUxLayer } from "@/components/features/bad-ux/BadUxLayer";
import { PageTransition } from "@/components/features/PageTransition";
import { NavBar } from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: {
    default: "Kim's World — Principal Product Designer",
    template: "%s — Kim's World",
  },
  description:
    "Portfolio of Kim, a Principal Product Designer. Storyteller. Pineapple-on-pizza defender. Explore case studies, design thinking, and interactive experiments.",
  metadataBase: new URL("https://kimsworld.com"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Kim's World",
    title: "Kim's World — Principal Product Designer",
    description:
      "A cosy little hub for my work, thoughts, and whatever I'm noodling on lately.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kim's World — Principal Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kim's World — Principal Product Designer",
    description:
      "A cosy little hub for my work, thoughts, and whatever I'm noodling on lately.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/illustrations/origin-scene-01.png",
    shortcut: "/illustrations/origin-scene-01.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <UXModeProvider>
          <AudioProvider src="/audio/ambient.mp3">
            <IntroProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-md)] focus:bg-[var(--semantic-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
              >
                Skip to main content
              </a>
              <NavBar />
              <PageTransition>{children}</PageTransition>
              <BadUxLayer />
            </IntroProvider>
          </AudioProvider>
        </UXModeProvider>
      </body>
    </html>
  );
}
