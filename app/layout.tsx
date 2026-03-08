import type { Metadata } from "next";
import "./globals.css";
import "./ux-mode.css";

import { AudioProvider } from "@/lib/hooks/useAudio";
import { IntroProvider } from "@/lib/context/IntroContext";
import { PageTransition } from "@/components/features/PageTransition";
import { NavBar } from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: {
    default: "Kim's World — Principal Product Designer",
    template: "%s — Kim's World",
  },
  description:
    "Kimberley Kam is a Principal Product Designer and Design Strategist based in Melbourne, Australia. Specialising in AI product design, design systems, and product strategy. Available for new opportunities — remote-friendly.",
  metadataBase: new URL("https://kimsworld.com"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Kim's World",
    title: "Kim's World — Principal Product Designer",
    description:
      "Portfolio of Kimberley Kam — Principal Product Designer and Design Strategist. AI product design, design systems, UX craft, and case studies. Based in Melbourne, open to remote.",
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
      "Portfolio of Kimberley Kam — Principal Product Designer and Design Strategist based in Melbourne. AI product design, design systems, and UX craft.",
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

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://kimsworld.com/#kim",
      name: "Kimberley Kam",
      alternateName: "Kim Kam",
      jobTitle: "Principal Product Designer",
      url: "https://kimsworld.com",
      email: "hello@kimsworld.com",
      description:
        "Kimberley Kam is a Principal Product Designer and Design Strategist based in Melbourne, Australia. She specialises in AI product design, design systems, UX craft, product strategy, and systems thinking. Available for in-house and consulting roles — remote-friendly.",
      homeLocation: {
        "@type": "Place",
        name: "Melbourne, Australia",
      },
      sameAs: ["https://www.linkedin.com/in/kimberley-kam/"],
      knowsAbout: [
        "AI Product Design",
        "Product Design",
        "Design Strategy",
        "UX Design",
        "Design Systems",
        "Systems Thinking",
        "Product Strategy",
        "User Research",
        "Interaction Design",
        "Design Leadership",
        "UX Writing",
        "Accessibility",
        "Product Ownership",
        "Design Operations",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://kimsworld.com/#website",
      name: "Kim's World",
      url: "https://kimsworld.com",
      description:
        "Portfolio of Kimberley Kam, a Principal Product Designer and Design Strategist based in Melbourne, Australia. Case studies, design thinking, and interactive experiments.",
      author: { "@id": "https://kimsworld.com/#kim" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="antialiased">
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
          </IntroProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
