import type { MetadataRoute } from "next";
import {
  getAllProjects,
  getAllTags,
  getAllWriting,
} from "@/lib/content/source";
import { siteConfig } from "@/lib/site-config";
import { getBooks } from "@/lib/content/reading";
import { getMusicNotes } from "@/lib/content/music";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = [
    "",
    "/about",
    "/reading",
    "/music",
    "/projects",
    "/writing",
    "/now",
    "/resume",
    "/contact",
    "/privacy",
    "/colophon",
  ];

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

  const bookEntries = getBooks().map((book) => ({
    url: `${siteConfig.url}/reading/${book.slug}`,
    ...(book.updatedAt ? { lastModified: new Date(book.updatedAt) } : {}),
  }));
  const musicEntries = getMusicNotes().map((note) => ({
    url: `${siteConfig.url}/music/${note.slug}`,
    lastModified: new Date(note.updatedAt),
  }));
  return [
    ...staticEntries,
    ...bookEntries,
    ...musicEntries,
    ...projectEntries,
    ...writingEntries,
    ...tagEntries,
  ];
}
