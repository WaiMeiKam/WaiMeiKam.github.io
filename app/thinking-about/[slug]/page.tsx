import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getArticleBySlug, getAllArticleSlugs } from "@/lib/utils/articles";
import { mdxComponents } from "@/components/features/ArticleComponents";
import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";
import { ScrollReveal } from "@/lib/hooks/useScrollReveal";

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: `${article.title} — Kim's World`,
    description: article.teaser,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <main id="main-content" className="min-h-screen bg-[var(--semantic-background)] text-[var(--semantic-text)] px-6 py-10 sm:py-14">
      <article className="mx-auto w-full max-w-2xl">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/thinking-about"
            className="inline-flex items-center gap-1 rounded text-sm font-medium text-[var(--semantic-primary)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
          >
            ← All articles
          </Link>
        </nav>

        <ScrollReveal direction="up">
          <header className="mb-10">
            {article.tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[var(--radius-full)] bg-[var(--semantic-primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--semantic-primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-[var(--semantic-heading)] sm:text-4xl">
              {article.title}
            </h1>
            {article.teaser && (
              <p className="mt-3 text-lg leading-relaxed opacity-70">
                {article.teaser}
              </p>
            )}
            {article.date && (
              <time
                dateTime={article.date}
                className="mt-3 block text-sm opacity-75"
              >
                {new Date(article.date).toLocaleDateString("en-AU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-8">
            <IllustrationSpot
              name={`article-${slug}`}
              alt=""
              width={800}
              height={400}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="article-body">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <footer className="mt-16 border-t border-black/10 pt-8 text-center">
            <p className="text-sm opacity-75">
              Thanks for reading. Got thoughts?{" "}
              <a
                href="mailto:hello@kimsworld.com"
                className="rounded font-medium text-[var(--semantic-primary)] underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
              >
                Drop me a line
              </a>
              .
            </p>
            <Link
              href="/thinking-about"
              className="mt-4 inline-block rounded text-sm font-medium text-[var(--semantic-primary)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
            >
              ← Back to all articles
            </Link>
          </footer>
        </ScrollReveal>
      </article>
    </main>
  );
}
