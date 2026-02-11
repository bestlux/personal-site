import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { PostCard } from "@/components/post-card";
import { getAllTags, getPostsByTag } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo";
import { kebabToTitle } from "@/lib/utils";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return buildMetadata({
    title: `Tag: ${kebabToTitle(tag)}`,
    description: `Posts tagged with ${tag}.`,
    path: `/tags/${tag}`,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageIntro
        eyebrow="Tag Archive"
        title={kebabToTitle(tag)}
        summary={`Posts related to ${kebabToTitle(tag)}.`}
      />
      <section className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </Container>
  );
}