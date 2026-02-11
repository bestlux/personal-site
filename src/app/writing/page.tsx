import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { PostCard } from "@/components/post-card";
import { getAllTags, getAllWriting } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description: "Essays and notes on AI, systems, and product thinking.",
  path: "/writing",
});

export default function WritingPage() {
  const posts = getAllWriting();
  const tags = getAllTags();

  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageIntro
        eyebrow="Signal Log"
        title="Writing"
        summary="Thoughtful technical essays on building, AI, and long-term systems thinking."
      />

      <section className="panel space-y-3 p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-text-dim">Tags</p>
        <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.12em]">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex h-11 min-w-11 items-center border border-border px-3 text-text-dim hover:border-accent-cyan hover:text-accent-cyan"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </Container>
  );
}