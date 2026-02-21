import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProjectFrontmatter = {
  title: string;
  role: string;
  timeline: string;
  company: string;
  tags: string[];
};

export type ProjectMeta = ProjectFrontmatter & {
  slug: string;
};

export type ProjectData = ProjectMeta & {
  content: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getProjectBySlug(slug: string): ProjectData | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    role: data.role ?? "",
    timeline: data.timeline ?? "",
    company: data.company ?? "",
    tags: data.tags ?? [],
    content,
  };
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
