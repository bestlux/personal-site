import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Colophon",
  description: "Build notes and technology choices behind this site.",
  path: "/colophon",
});

export default function ColophonPage() {
  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageIntro
        eyebrow="Build Notes"
        title="Colophon"
        summary="How this site is built and maintained."
      />

      <section className="panel space-y-5 p-6 text-text-dim">
        <p>Framework: Next.js App Router with TypeScript.</p>
        <p>Styling: Tailwind CSS v4 with a custom retro-terminal design system.</p>
        <p>Content: Local MDX files validated through Zod.</p>
        <p>Deployment: Vercel with custom domain and CI checks.</p>
      </section>
    </Container>
  );
}