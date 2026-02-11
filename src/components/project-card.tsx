import Link from "next/link";
import type { Project } from "@/lib/content/schemas";
import { formatDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="panel group space-y-4 p-5">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-accent-green">
          {project.status} · {formatDate(project.publishedAt)}
        </p>
        <h2 className="font-display text-2xl uppercase tracking-[0.04em] text-text">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent-orange">
            {project.title}
          </Link>
        </h2>
      </header>
      <p className="text-sm leading-relaxed text-text-dim">{project.summary}</p>
      <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.1em] text-accent-cyan">
        {project.categories.map((category) => (
          <li key={category} className="border border-border px-2 py-1">
            {category}
          </li>
        ))}
      </ul>
    </article>
  );
}
