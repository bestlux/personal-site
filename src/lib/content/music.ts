import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

const musicSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  artist: z.string().optional(),
  listenUrl: z
    .string()
    .url()
    .refine(
      (value) => new URL(value).protocol === "https:",
      "Use an HTTPS music link",
    )
    .optional(),
  notesPublished: z.boolean().default(false),
  updatedAt: z.string().date(),
});

export function getMusicNotes() {
  const directory = path.join(process.cwd(), "content", "music");
  const notes = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .flatMap((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(directory, file), "utf8"),
      );
      const note = musicSchema.parse(data);
      if (!note.notesPublished) return [];
      const body = content.trim();
      if (!body && !note.listenUrl)
        throw new Error(
          `Music entry needs notes or a listening link: ${note.slug}`,
        );
      return [
        {
          ...note,
          body,
          minutes: body
            ? Math.max(1, Math.round(readingTime(body).minutes))
            : 0,
        },
      ];
    });
  if (new Set(notes.map((note) => note.slug)).size !== notes.length)
    throw new Error("Duplicate music slug");
  return notes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getMusicNote(slug: string) {
  return getMusicNotes().find((note) => note.slug === slug);
}
