"use client";

import Link from "next/link";
import type { Writing } from "@/lib/content/schemas";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

interface PostCardProps {
  post: Writing;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <motion.article 
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="panel group flex flex-col justify-between p-6 cursor-pointer"
    >
      <Link href={`/writing/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read post {post.title}</span>
      </Link>
      
      <div className="space-y-4">
        <header className="flex justify-between items-start border-b border-border/50 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-accent-muted" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                {formatDate(post.publishedAt)}
              </p>
            </div>
            <h2 className="font-mono text-xl uppercase tracking-wider text-text font-semibold group-hover:text-accent-primary transition-colors">
              {post.title}
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 text-accent-muted">
            {post.computedReadingTime} MIN
          </span>
        </header>
        
        <p className="text-sm leading-relaxed text-text-dim line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/50">
        <ul className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-text-dim">
          {post.tags.slice(0, 3).map((tag) => (
            <li key={tag} className="px-1.5 py-0.5 border border-border/50 relative z-20">
              <Link href={`/tags/${encodeURIComponent(tag.toLowerCase())}`} className="hover:text-text">
                {tag}
              </Link>
            </li>
          ))}
        </ul>
        <ArrowRight size={16} className="text-accent-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </div>
    </motion.article>
  );
}
