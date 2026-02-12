import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { renderMdx } from "@/lib/content/mdx";
import { getAllWriting, getWritingBySlug } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface WritingPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllWriting().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Post Not Found",
      description: "The requested post does not exist.",
      path: `/writing/${slug}`,
    });
  }

  return buildMetadata({
    title: post.seo.title ?? post.title,
    description: post.seo.description ?? post.excerpt,
    path: `/writing/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    tags: post.tags,
  });
}

export default async function WritingDetailPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = await renderMdx(post.body);

  return (
    <Container className="space-y-10 py-12 sm:py-16">
      <header className="panel reveal-up space-y-4 p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-accent-green">
          {formatDate(post.publishedAt)} · {post.computedReadingTime} min read
        </p>
        <h1 className="font-display text-4xl uppercase tracking-[0.04em] sm:text-5xl">{post.title}</h1>
        <p className="max-w-3xl text-lg text-text-dim">{post.excerpt}</p>
      </header>

      <article className="panel reveal-up delay-1 p-6">{content}</article>
    </Container>
  );
}
