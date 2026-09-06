import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

const bookSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  author: z.string().min(1),
  order: z.number().int().default(0),
  notesPublished: z.boolean().default(false),
  updatedAt: z.string().date().optional(),
});

export type Book = z.infer<typeof bookSchema> & {
  body: string;
  minutes: number;
};

export function getBooks(): Book[] {
  const directory = path.join(process.cwd(), "content", "reading");
  const books = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(directory, file), "utf8"),
      );
      const book = bookSchema.parse(data);
      // Unpublished notes never leave the server, including via the index props.
      const body = book.notesPublished ? content.trim() : "";
      if (book.notesPublished && !body)
        throw new Error(`Published book has no notes: ${book.slug}`);
      return {
        ...book,
        body,
        minutes: body ? Math.max(1, Math.round(readingTime(body).minutes)) : 0,
      };
    });
  if (new Set(books.map((book) => book.slug)).size !== books.length)
    throw new Error("Duplicate reading slug");
  return books.sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title),
  );
}

export function getBook(slug: string) {
  return getBooks().find((book) => book.slug === slug);
}
