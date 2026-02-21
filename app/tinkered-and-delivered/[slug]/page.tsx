import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getProjectBySlug, getAllProjectSlugs } from "@/lib/utils/projects";
import { caseStudyMdxComponents } from "@/components/features/CaseStudyComponents";
import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — Kim's World`,
    description: `${project.role} · ${project.company}`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main id="main-content" className="min-h-screen bg-[var(--semantic-background)] text-[var(--semantic-text)] px-6 py-10 sm:py-14">
      <article className="mx-auto w-full max-w-2xl">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/tinkered-and-delivered"
            className="inline-flex items-center gap-1 rounded text-sm font-medium text-[var(--semantic-primary)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
          >
            ← All projects
          </Link>
        </nav>

        <header className="mb-10">
          {project.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
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
            {project.title}
          </h1>

          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-75">
            {project.role && (
              <div className="flex gap-1.5">
                <dt className="font-semibold">Role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            {project.timeline && (
              <div className="flex gap-1.5">
                <dt className="font-semibold">Timeline</dt>
                <dd>{project.timeline}</dd>
              </div>
            )}
            {project.company && (
              <div className="flex gap-1.5">
                <dt className="font-semibold">Company</dt>
                <dd>{project.company}</dd>
              </div>
            )}
          </dl>
        </header>

        <div className="mb-8">
          <IllustrationSpot
            name={`project-${slug}`}
            alt=""
            width={800}
            height={400}
          />
        </div>

        <div className="case-study-body">
          <MDXRemote
            source={project.content}
            components={caseStudyMdxComponents}
          />
        </div>

        <footer className="mt-16 border-t border-black/10 pt-8 text-center">
          <p className="text-base leading-relaxed opacity-75">
            This is one of many. I&rsquo;d love to walk you through the rest.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@kimsworld.com"
              className="rounded text-sm font-semibold text-[var(--semantic-primary)] underline underline-offset-2 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
            >
              Get in touch
            </a>
            <Link
              href="/tinkered-and-delivered"
              className="rounded text-sm font-medium text-[var(--semantic-primary)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--semantic-background)]"
            >
              ← Back to all projects
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
