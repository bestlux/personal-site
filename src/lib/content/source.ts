import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  nowSchema,
  projectSchema,
  resumeSchema,
  writingSchema,
  type NowEntry,
  type Project,
  type Resume,
  type Writing,
} from "@/lib/content/schemas";
import { slugify } from "@/lib/utils";

const contentRoot = path.join(process.cwd(), "content");

function readCollectionPaths(dir: string): string[] {
  const folder = path.join(contentRoot, dir);
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(folder, file));
}

function readMdxFile(fullPath: string): { frontmatter: unknown; body: string } {
  const source = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(source);

  return {
    frontmatter: data,
    body: content,
  };
}

function sortByDateDesc(a: string, b: string): number {
  return new Date(b).getTime() - new Date(a).getTime();
}

export function getAllProjects(): Project[] {
  return readCollectionPaths("projects")
    .map((fullPath) => {
      const { frontmatter, body } = readMdxFile(fullPath);
      const parsed = projectSchema.parse(frontmatter);
      return {
        ...parsed,
        slug: slugify(parsed.slug),
        body,
      } satisfies Project;
    })
    .sort((a, b) => sortByDateDesc(a.publishedAt, b.publishedAt));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getAllWriting(): Writing[] {
  return readCollectionPaths("writing")
    .map((fullPath) => {
      const { frontmatter, body } = readMdxFile(fullPath);
      const parsed = writingSchema.parse(frontmatter);
      const computedMinutes = Math.max(1, Math.round(readingTime(body).minutes));

      return {
        ...parsed,
        slug: slugify(parsed.slug),
        computedReadingTime: parsed.readingTime ?? computedMinutes,
        body,
      } satisfies Writing;
    })
    .filter((post) => !post.draft)
    .sort((a, b) => sortByDateDesc(a.publishedAt, b.publishedAt));
}

export function getWritingBySlug(slug: string): Writing | undefined {
  return getAllWriting().find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllWriting().forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag.toLowerCase()));
  });
  return [...tags].sort((a, b) => a.localeCompare(b));
}

export function getPostsByTag(tag: string): Writing[] {
  const target = tag.toLowerCase();
  return getAllWriting().filter((post) =>
    post.tags.map((entry) => entry.toLowerCase()).includes(target),
  );
}

export function getAllNowEntries(): NowEntry[] {
  return readCollectionPaths("now")
    .map((fullPath) => {
      const { frontmatter, body } = readMdxFile(fullPath);
      const parsed = nowSchema.parse(frontmatter);

      return {
        ...parsed,
        body,
      } satisfies NowEntry;
    })
    .sort((a, b) => b.month.localeCompare(a.month));
}

export function getLatestNowEntry(): NowEntry | undefined {
  return getAllNowEntries()[0];
}

export function getResume(): Resume {
  const fullPath = path.join(contentRoot, "pages", "resume.mdx");
  const { frontmatter, body } = readMdxFile(fullPath);
  const parsed = resumeSchema.parse(frontmatter);

  return {
    ...parsed,
    body,
  };
}
