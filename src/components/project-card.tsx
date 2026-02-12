import Link from "next/link";
import type { Project } from "@/lib/content/schemas";
import { formatDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="panel panel-interactive group reveal-up space-y-5 p-5">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-accent-green">
          {project.status} · {formatDate(project.publishedAt)}
        </p>
        <h2 className="font-display text-2xl uppercase tracking-[0.04em] text-text">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 transition group-hover:text-accent-orange"
          >
            {project.title}
            <span aria-hidden className="text-base text-accent-orange/80 transition group-hover:translate-x-0.5">
              &gt;
            </span>
          </Link>
        </h2>
      </header>
      <p className="text-base leading-relaxed text-text-dim">{project.summary}</p>
      <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.1em] text-accent-cyan">
        {project.categories.map((category) => (
          <li key={category} className="signal-chip px-2 py-1">
            {category}
          </li>
        ))}
      </ul>
      <p className="text-xs uppercase tracking-[0.14em] text-accent-cyan">Open project file</p>
    </article>
  );
}
