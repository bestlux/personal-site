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

      <section className="space-y-4 py-4">
        <p className="font-mono text-xs uppercase tracking-widest text-text-dim flex items-center gap-2">
          // SYS.TAGS
        </p>
        <ul className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="px-2 py-1 border border-border/50 text-text-dim hover:text-text hover:border-text transition-colors bg-bg-soft"
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
