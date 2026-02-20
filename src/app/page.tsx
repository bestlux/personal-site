import Link from "next/link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { TextScramble } from "@/components/text-scramble";
import { getFeaturedProjects, getLatestNowEntry, getAllWriting } from "@/lib/content/source";
import { siteConfig } from "@/lib/site-config";
import { Terminal, Cpu, Network } from "lucide-react";

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const latestPosts = getAllWriting().slice(0, 4);
  const now = getLatestNowEntry();

  return (
    <Container className="space-y-16 py-12 sm:space-y-24 sm:py-20">
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

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <article className="panel flex flex-col justify-between p-6 sm:p-10 min-h-[400px]">
          <div className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs text-accent-muted uppercase tracking-widest">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-secondary"></span>
              </span>
              SYS.STATUS: ONLINE {"//"} CA-US
            </div>
            
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl text-text">
              <TextScramble text="Senior Software Engineer." duration={1200} /> <br />
              <span className="text-text-dim">Systems, WPF, & Infrastructure.</span>
            </h1>
            
            <p className="max-w-2xl text-lg leading-relaxed text-text-dim">
              I build mission-critical desktop and distributed systems. Deeply rooted in .NET and WPF, currently expanding into Rust, C++, and Python. Obsessed with high-performance architectures, home labs, and rigorous engineering.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-8 mt-auto border-t border-border">
            <Link
              href="/resume"
              className="signal-chip bg-text text-bg hover:bg-bg hover:text-text px-6 py-3 font-mono text-sm uppercase tracking-widest"
            >
              [ INITIALIZE_CONTACT ]
            </Link>
            <Link
              href="/projects"
              className="signal-chip px-6 py-3 font-mono text-sm uppercase tracking-widest"
            >
              ACCESS_ARCHIVE
            </Link>
          </div>
        </article>

        <aside className="flex flex-col gap-6">
          <div className="panel p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <p className="font-mono flex items-center gap-2 text-xs uppercase tracking-widest text-accent-muted border-b border-border pb-2">
                <Terminal size={14} /> {"//"} OPERATIONAL_PARAMETERS
              </p>
              <ul className="space-y-3 font-mono text-sm mt-4">
                <li className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-text-dim">PRIMARY_STACK</span>
                  <span className="text-text text-right font-semibold">.NET, C#, WPF</span>
                </li>
                <li className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-text-dim flex items-center gap-2"><Cpu size={14}/> EXPLORING</span>
                  <span className="text-text text-right">RUST, C++, PYTHON</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span className="text-text-dim flex items-center gap-2"><Network size={14}/> INFRA</span>
                  <span className="text-text text-right">PROXMOX, UNRAID</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="panel p-4 flex flex-col justify-between">
              <dt className="font-mono text-xs text-text-dim mb-2 uppercase tracking-widest border-b border-border pb-2">Active Nodes</dt>
              <dd className="font-mono text-3xl text-accent-secondary mt-2">{featuredProjects.length}</dd>
            </div>
            <div className="panel p-4 flex flex-col justify-between">
              <dt className="font-mono text-xs text-text-dim mb-2 uppercase tracking-widest border-b border-border pb-2">Data Streams</dt>
              <dd className="font-mono text-3xl text-accent-primary mt-2">{latestPosts.length}</dd>
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-8">
        <header className="flex items-end justify-between border-b border-border pb-4">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-secondary">{"//"} DEPLOYED_SYSTEMS</p>
            <h2 className="text-2xl font-semibold tracking-tight text-text">Featured Projects</h2>
          </div>
          <Link href="/projects" className="font-mono text-xs uppercase tracking-widest text-text-dim hover:text-text transition-colors">
            VIEW_ALL &#8594;
          </Link>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <header className="flex items-end justify-between border-b border-border pb-4">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-primary">{"//"} TELEMETRY_LOGS</p>
            <h2 className="text-2xl font-semibold tracking-tight text-text">Latest Writing</h2>
          </div>
          <Link href="/writing" className="font-mono text-xs uppercase tracking-widest text-text-dim hover:text-text transition-colors">
            VIEW_ALL &#8594;
          </Link>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="panel space-y-4 p-6 sm:p-10">
        <header className="border-b border-border pb-4 flex items-center justify-between">
          <h2 className="font-mono text-xl uppercase tracking-widest text-text">Current Focus [{now?.month ?? "PENDING"}]</h2>
          <Link
              href="/now"
              className="font-mono text-xs uppercase tracking-widest text-text-dim hover:text-text transition-colors"
            >
              FULL_LOG &#8594;
            </Link>
        </header>
        {now ? (
          <div className="space-y-6 pt-4">
            <p className="text-lg text-text leading-relaxed font-medium">{now.summary}</p>
            <ul className="space-y-3 font-mono text-sm text-text-dim list-square pl-4 marker:text-accent-primary">
              {now.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-text-dim font-mono">NO DATA STREAM DETECTED.</p>
        )}
      </section>
    </Container>
  );
}
