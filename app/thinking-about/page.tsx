import Link from "next/link";

import { getAllArticles } from "@/lib/utils/articles";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { ScrollReveal } from "@/lib/hooks/useScrollReveal";

export const metadata = {
  title: "What I'm Thinking About",
  description: "Stories, ideas, and design thinking from a Principal Product Designer.",
  openGraph: {
    title: "What I'm Thinking About — Kim's World",
    description: "Stories, ideas, and design thinking from a Principal Product Designer.",
  },
};

export default function ThinkingAbout() {
  const articles = getAllArticles();

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

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--semantic-heading)] sm:text-4xl">
            What I&rsquo;m Thinking About
          </h1>
          <p className="mt-3 text-base opacity-70 sm:text-lg">
            Long-form ideas on design, product thinking, and the craft of making things people love.
          </p>
        </header>

        {articles.length > 0 ? (
          <section aria-label="Articles">
            <div className="divide-y divide-transparent">
              {articles.map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 0.06} direction="up">
                  <ArticleCard
                    href={`/thinking-about/${article.slug}`}
                    title={article.title}
                    teaser={article.teaser}
                    date={article.date}
                    tags={article.tags}
                  />
                </ScrollReveal>
              ))}
            </div>
          </section>
        ) : (
          <p className="py-12 text-center opacity-75">
            Articles are brewing. Check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
