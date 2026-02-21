import type { Metadata } from "next";
import Link from "next/link";

import projects from "@/content/projects.json";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";

export const metadata: Metadata = {
  title: "What I've Tinkered and Delivered",
  description:
    "A selection of projects I've led — the ones I can show and the ones I'd love to chat about.",
  openGraph: {
    title: "What I've Tinkered and Delivered — Kim's World",
    description: "A selection of projects I've led — the ones I can show and the ones I'd love to chat about.",
  },
};

export default function TinkeredAndDelivered() {
  const unlocked = projects.filter((p) => !p.locked);
  const locked = projects.filter((p) => p.locked);

  return (
    <main id="main-content" className="min-h-screen bg-[var(--semantic-background)] text-[var(--semantic-text)] px-6 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded text-sm font-medium text-[var(--semantic-primary)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
          >
            ← Home
          </Link>
        </nav>

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide opacity-75">
            The work
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--semantic-heading)] sm:text-4xl">
            What I&rsquo;ve Tinkered and Delivered
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed opacity-75">
            A mix of deep dives and locked-down projects. The unlocked ones have the full
            story. For the rest, I&rsquo;d love to walk you through them over a chat.
          </p>
        </header>

        {unlocked.length > 0 && (
          <section aria-label="Case studies" className="mb-12">
            <h2 className="sr-only">Case studies</h2>
            <div className="grid gap-4">
              {unlocked.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  teaser={project.teaser}
                  locked={false}
                />
              ))}
            </div>
          </section>
        )}

        {locked.length > 0 && (
          <section aria-label="NDA projects">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-black/8" />
              <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
                Under NDA
              </p>
              <div className="h-px flex-1 bg-black/8" />
            </div>

            <div className="grid gap-4">
              {locked.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  teaser={project.teaser}
                  locked
                />
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 text-center">
          <div className="mx-auto mb-4 w-full max-w-[180px] opacity-80">
            <IllustrationSpot name="work-wave" alt="" width={360} height={200} />
          </div>
          <p className="text-sm leading-relaxed opacity-75">
            This is one of many. I&rsquo;d love to walk you through the rest.
          </p>
          <a
            href="mailto:hello@kimsworld.com"
            className="mt-2 inline-block rounded text-sm font-semibold text-[var(--semantic-primary)] underline underline-offset-2 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
          >
            Let&rsquo;s chat
          </a>
        </footer>
      </div>
    </main>
  );
}
