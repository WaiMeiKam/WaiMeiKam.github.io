import type { Metadata } from "next";

import noodlingData from "@/content/noodling.json";
import { NoodlingCanvas } from "@/components/features/NoodlingCanvas";
import type { NoodlingItem } from "@/components/features/NoodlingCanvas";

export const metadata: Metadata = {
  title: "What I'm Noodling On",
  description:
    "A FigJam-style canvas of things Kim is playing with — food, design experiments, music, and random thoughts.",
  openGraph: {
    title: "What I'm Noodling On — Kim's World",
    description: "A FigJam-style canvas of things Kim is playing with — food, design experiments, music, and random thoughts.",
  },
};

export default function NoodlingOn() {
  return (
    <main
      id="main-content"
      className="h-[calc(100dvh-3.5rem)] w-full overflow-hidden"
      aria-label="What I'm Noodling On — interactive canvas"
    >
      <h1 className="sr-only">What I&rsquo;m Noodling On</h1>
      <NoodlingCanvas items={noodlingData as NoodlingItem[]} />
    </main>
  );
}
