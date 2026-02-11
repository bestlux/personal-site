import Link from "next/link";
import type { Writing } from "@/lib/content/schemas";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Writing;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="panel space-y-4 p-5">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-accent-green">
          {formatDate(post.publishedAt)} · {post.computedReadingTime} min read
        </p>
        <h2 className="font-display text-2xl uppercase tracking-[0.04em] text-text">
          <Link href={`/writing/${post.slug}`} className="hover:text-accent-orange">
            {post.title}
          </Link>
        </h2>
      </header>
      <p className="text-sm leading-relaxed text-text-dim">{post.excerpt}</p>
      <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.1em] text-accent-cyan">
        {post.tags.map((tag) => (
          <li key={tag} className="border border-border px-2 py-1">
            <Link href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
