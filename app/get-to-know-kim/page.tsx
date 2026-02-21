import Link from "next/link";

import { PollGame } from "@/components/features/PollGame";
import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";
import rawPolls from "@/content/polls.json";

const polls = rawPolls as Array<{
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  kimsAnswer: "a" | "b";
  quip?: string;
}>;

export const metadata = {
  title: "Get to Know Kim",
  description: "A game of polls. Pick your side and see if you match with Kim.",
  openGraph: {
    title: "Get to Know Kim — Kim's World",
    description: "A game of polls. Pick your side and see if you match with Kim.",
  },
};

export default function GetToKnowKim() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--semantic-background)] text-[var(--semantic-text)] px-6 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded text-sm font-medium text-[var(--semantic-primary)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
          >
            ← Back to the campfire
          </Link>
        </nav>

        <header className="mb-10 text-center">
          <div className="mx-auto mb-5 w-24">
            <IllustrationSpot
              name="poll-pineapple"
              alt=""
              width={192}
              height={192}
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--semantic-heading)] sm:text-4xl">
            Get to Know Kim
          </h1>
          <p className="mt-3 text-base opacity-70 sm:text-lg">
            Pick your side on each question and see if we&rsquo;re on the same page.
          </p>
        </header>

        <PollGame polls={polls} />
      </div>
    </main>
  );
}
