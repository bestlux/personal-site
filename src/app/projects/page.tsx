import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { ProjectFilters } from "@/components/project-filters";
import { getAllProjects } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "Active and archived projects across AI, systems, and interface design.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageIntro
        eyebrow="Project Stream"
        title="Projects"
        summary="A map of active systems, prototypes, and shipped experiments."
      />
      <ProjectFilters projects={projects} />
    </Container>
  );
}