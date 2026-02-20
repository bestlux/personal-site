"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/content/schemas";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

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
    <div className="space-y-8">
      <div className="panel space-y-6 p-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-2">
          <Filter size={14} className="text-accent-muted" />
          <p className="font-mono text-xs uppercase tracking-widest text-text-dim">
            SYS.FILTER_CONFIG
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-muted">Category_Select</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={cn(
                  "px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition-colors",
                  activeCategory === category
                    ? "border-text bg-text text-bg font-semibold"
                    : "border-border/50 text-text-dim hover:text-text hover:border-text bg-bg-soft",
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-muted">Status_Select</p>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                className={cn(
                  "px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition-colors",
                  activeStatus === status
                    ? "border-text bg-text text-bg font-semibold"
                    : "border-border/50 text-text-dim hover:text-text hover:border-text bg-bg-soft",
                )}
                onClick={() => setActiveStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-border/50 flex justify-end">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-secondary flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-secondary"></span>
            </span>
            RESULTS_FOUND: {filtered.length}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
