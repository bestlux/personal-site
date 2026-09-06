import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getBooks } from "@/lib/content/reading";
import { getMusicNote, getMusicNotes } from "@/lib/content/music";

describe("Distance content publication", () => {
  let directory: string;
  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), "distance-content-"));
    fs.mkdirSync(path.join(directory, "content", "reading"), {
      recursive: true,
    });
    fs.mkdirSync(path.join(directory, "content", "music"), { recursive: true });
    vi.spyOn(process, "cwd").mockReturnValue(directory);
  });
  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(directory, { recursive: true, force: true });
  });
  function write(
    collection: string,
    name: string,
    frontmatter: string,
    body = "",
  ) {
    fs.writeFileSync(
      path.join(directory, "content", collection, `${name}.mdx`),
      `---\n${frontmatter}\n---\n${body}`,
    );
  }
  it("keeps a book on the shelf without exposing its private draft", () => {
    write(
      "reading",
      "book",
      "slug: a-book\ntitle: A book\nauthor: An author\nnotesPublished: false",
      "PRIVATE DRAFT",
    );
    const books = getBooks();
    expect(books).toHaveLength(1);
    expect(books[0].body).toBe("");
    expect(books[0].minutes).toBe(0);
    expect(JSON.stringify(books)).not.toContain("PRIVATE DRAFT");
  });
  it("publishes long book notes with a reading time", () => {
    write(
      "reading",
      "book",
      "slug: a-book\ntitle: A book\nauthor: An author\nnotesPublished: true",
      "A thought. ".repeat(600),
    );
    expect(getBooks()[0].minutes).toBeGreaterThan(1);
    expect(getBooks()[0].body).toContain("A thought.");
  });
  it("omits unpublished music from the index and direct lookup", () => {
    write(
      "music",
      "song",
      'slug: a-song\ntitle: A song\nupdatedAt: "2026-09-05"\nnotesPublished: false',
      "PRIVATE DRAFT",
    );
    expect(getMusicNotes()).toEqual([]);
    expect(getMusicNote("a-song")).toBeUndefined();
  });
  it("supports a listening link without requiring an essay", () => {
    write(
      "music",
      "song",
      'slug: a-song\ntitle: A song\nupdatedAt: "2026-09-05"\nnotesPublished: true\nlistenUrl: https://example.com/song',
    );
    expect(getMusicNote("a-song")?.listenUrl).toBe("https://example.com/song");
  });
  it("rejects unsafe listening URLs", () => {
    write(
      "music",
      "song",
      'slug: a-song\ntitle: A song\nupdatedAt: "2026-09-05"\nnotesPublished: true\nlistenUrl: javascript:alert(1)',
    );
    expect(() => getMusicNotes()).toThrow();
  });
  it("rejects duplicate book URLs", () => {
    const metadata = "slug: a-book\ntitle: A book\nauthor: An author";
    write("reading", "one", metadata);
    write("reading", "two", metadata);
    expect(() => getBooks()).toThrow("Duplicate reading slug");
  });
});
