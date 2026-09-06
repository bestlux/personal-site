import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getBooks } from "@/lib/content/reading";
import { getMusicNotes } from "@/lib/content/music";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = ["", "/about", "/reading", "/music"];

  const staticEntries = baseRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
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
  ];
}
