import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { renderMdx } from "@/lib/content/mdx";
import { getAllProjects, getProjectBySlug } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project Not Found",
      description: "The requested project does not exist.",
      path: `/projects/${slug}`,
    });
  }

  return buildMetadata({
    title: project.seo.title ?? project.title,
    description: project.seo.description ?? project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const content = await renderMdx(project.body);

  return (
    <Container className="space-y-10 py-12 sm:py-16">
      <header className="panel reveal-up space-y-4 p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-accent-green">
          {project.status} · {formatDate(project.publishedAt)}
        </p>
        <h1 className="font-display text-4xl uppercase tracking-[0.04em] sm:text-5xl">
          {project.title}
        </h1>
        <p className="max-w-3xl text-lg text-text-dim">{project.summary}</p>
        <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.1em] text-accent-cyan">
          {project.tech.map((item) => (
            <li key={item} className="signal-chip px-2 py-1">
              {item}
            </li>
          ))}
        </ul>
      </header>

      <article className="panel reveal-up delay-1 p-6">{content}</article>
    </Container>
  );
}
