"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/content/schemas";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  projects: Project[];
}

export function ProjectFilters({ projects }: ProjectFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeStatus, setActiveStatus] = useState<string>("all");

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(projects.flatMap((project) => project.categories.map((entry) => entry.toLowerCase()))),
    ];
  }, [projects]);

  const statuses = ["all", "active", "prototype", "archived"];

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch =
        activeCategory === "all" ||
        project.categories.map((item) => item.toLowerCase()).includes(activeCategory);
      const statusMatch = activeStatus === "all" || project.status === activeStatus;
      return categoryMatch && statusMatch;
    });
  }, [activeCategory, activeStatus, projects]);

  return (
    <div className="space-y-6">
      <div className="panel space-y-4 p-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-text-dim">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={cn(
                  "h-11 min-w-11 border px-3 text-xs uppercase tracking-[0.12em] transition",
                  activeCategory === category
                    ? "border-accent-cyan text-accent-cyan"
                    : "border-border text-text-dim hover:border-accent-cyan",
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-text-dim">Status</p>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                className={cn(
                  "h-11 min-w-11 border px-3 text-xs uppercase tracking-[0.12em] transition",
                  activeStatus === status
                    ? "border-accent-orange text-accent-orange"
                    : "border-border text-text-dim hover:border-accent-orange",
                )}
                onClick={() => setActiveStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
