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
      <div className="panel reveal-up space-y-5 p-4 sm:p-5">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-text-dim">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={cn(
                  "signal-chip h-11 min-w-11 px-3 text-xs uppercase tracking-[0.12em]",
                  activeCategory === category
                    ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                    : "text-text-dim",
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
                  "signal-chip h-11 min-w-11 px-3 text-xs uppercase tracking-[0.12em]",
                  activeStatus === status
                    ? "border-accent-orange bg-accent-orange/10 text-accent-orange"
                    : "text-text-dim",
                )}
                onClick={() => setActiveStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.14em] text-accent-cyan">
          Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
