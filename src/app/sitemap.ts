import type { MetadataRoute } from "next";
import { getAllProjects, getAllTags, getAllWriting } from "@/lib/content/source";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = ["", "/projects", "/writing", "/now", "/resume", "/contact", "/privacy", "/colophon"];

  const staticEntries = baseRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const projectEntries = getAllProjects().map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(project.publishedAt),
  }));

  const writingEntries = getAllWriting().map((post) => ({
    url: `${siteConfig.url}/writing/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }));

  const tagEntries = getAllTags().map((tag) => ({
    url: `${siteConfig.url}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...projectEntries, ...writingEntries, ...tagEntries];
}