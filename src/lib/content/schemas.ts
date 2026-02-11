import { z } from "zod";

const isoDate = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid ISO date");

const seoSchema = z
  .object({
    title: z.string().min(3),
    description: z.string().min(8),
  })
  .partial();

export const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(2),
  summary: z.string().min(8),
  publishedAt: isoDate,
  status: z.enum(["active", "archived", "prototype"]),
  categories: z.array(z.string().min(2)).min(1),
  tech: z.array(z.string()).default([]),
  links: z
    .object({
      demo: z.string().url().optional(),
      repo: z.string().url().optional(),
      external: z.string().url().optional(),
    })
    .default({}),
  featured: z.boolean().default(false),
  coverImage: z.string().optional(),
  seo: seoSchema.default({}),
});

export const writingSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(2),
  excerpt: z.string().min(8),
  publishedAt: isoDate,
  updatedAt: isoDate.optional(),
  tags: z.array(z.string().min(2)).min(1),
  readingTime: z.number().positive().optional(),
  draft: z.boolean().default(false),
  seo: seoSchema.default({}),
});

export const nowSchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/),
  title: z.string().min(3),
  summary: z.string().min(8),
  items: z.array(z.string().min(2)).min(1),
  focus: z.array(z.string().min(2)).min(1),
});

export const resumeSchema = z.object({
  headline: z.string().min(8),
  summary: z.string().min(8),
  experience: z
    .array(
      z.object({
        role: z.string().min(2),
        org: z.string().min(2),
        period: z.string().min(2),
        bullets: z.array(z.string().min(2)).min(1),
      }),
    )
    .min(1),
  projects: z.array(z.string().min(2)).min(1),
  skills: z.array(z.string().min(2)).min(1),
  links: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().url(),
      }),
    )
    .min(1),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;
export type WritingFrontmatter = z.infer<typeof writingSchema>;
export type NowFrontmatter = z.infer<typeof nowSchema>;
export type ResumeFrontmatter = z.infer<typeof resumeSchema>;

export type Project = ProjectFrontmatter & {
  body: string;
};

export type Writing = WritingFrontmatter & {
  body: string;
  computedReadingTime: number;
};

export type NowEntry = NowFrontmatter & {
  body: string;
};

export type Resume = ResumeFrontmatter & {
  body: string;
};
