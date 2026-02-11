import Link from "next/link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects, getLatestNowEntry, getAllWriting } from "@/lib/content/source";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 2);
  const latestPosts = getAllWriting().slice(0, 2);
  const now = getLatestNowEntry();

  return (
    <Container className="space-y-20 py-12 sm:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
          sameAs: [siteConfig.social.github, siteConfig.social.x],
          description: siteConfig.description,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
        }}
      />

      <section className="panel relative overflow-hidden p-6 sm:p-10">
        <p className="font-display text-xs uppercase tracking-[0.26em] text-accent-green">
          Personal Signal Interface
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-tight tracking-[0.04em] sm:text-6xl">
          Building living systems for code, thought, and AI-era craft.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text-dim">
          This is my public workspace: projects in motion, writing in progress, and monthly
          status updates on what I am building next.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex h-11 min-w-11 items-center border border-accent-cyan px-4 text-sm uppercase tracking-[0.12em] text-accent-cyan transition hover:bg-accent-cyan hover:text-bg"
          >
            Explore Projects
          </Link>
          <Link
            href="/writing"
            className="inline-flex h-11 min-w-11 items-center border border-border px-4 text-sm uppercase tracking-[0.12em] text-text-dim transition hover:border-accent-orange hover:text-accent-orange"
          >
            Read Writing
          </Link>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-3xl uppercase tracking-[0.04em]">Featured Projects</h2>
          <Link href="/projects" className="text-xs uppercase tracking-[0.16em] text-accent-cyan">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-3xl uppercase tracking-[0.04em]">Latest Writing</h2>
          <Link href="/writing" className="text-xs uppercase tracking-[0.16em] text-accent-cyan">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="panel space-y-4 p-6">
        <h2 className="font-display text-3xl uppercase tracking-[0.04em]">Now</h2>
        {now ? (
          <>
            <p className="text-sm uppercase tracking-[0.16em] text-accent-green">{now.month}</p>
            <p className="text-lg text-text-dim">{now.summary}</p>
            <ul className="list-disc space-y-2 pl-6 text-text-dim">
              {now.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/now" className="text-xs uppercase tracking-[0.16em] text-accent-cyan">
              Full now log
            </Link>
          </>
        ) : (
          <p className="text-text-dim">No now entries published yet.</p>
        )}
      </section>
    </Container>
  );
}
