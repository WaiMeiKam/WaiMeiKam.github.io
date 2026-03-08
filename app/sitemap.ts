import type { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/lib/utils/articles";
import { getAllProjectSlugs } from "@/lib/utils/projects";

export const dynamic = "force-static";

const BASE = "https://kimsworld.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE}/thinking-about/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/tinkered-and-delivered/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/get-to-know-kim/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/noodling-on/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const articleRoutes = getAllArticleSlugs().map((slug) => ({
    url: `${BASE}/thinking-about/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectRoutes = getAllProjectSlugs().map((slug) => ({
    url: `${BASE}/tinkered-and-delivered/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes, ...projectRoutes];
}
