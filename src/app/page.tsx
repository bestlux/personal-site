import Link from "next/link";
import { Container } from "@/components/container";
import { CathedralSigil } from "@/components/cathedral-sigil";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { TextScramble } from "@/components/text-scramble";
import { getFeaturedProjects, getLatestNowEntry, getAllWriting } from "@/lib/content/source";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const latestPosts = getAllWriting().slice(0, 3);
  const now = getLatestNowEntry();

  const flagshipProject = featuredProjects.find((project) => project.slug === "boundless") ?? featuredProjects[0];
  const secondaryProjects = featuredProjects.filter((project) => project.slug !== flagshipProject?.slug).slice(0, 3);

  return (
    <>
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

      <section className="relative isolate overflow-hidden border-b border-border/80">
        <div
          aria-hidden="true"
          className="absolute left-[8%] top-[10%] h-[320px] w-[320px] rounded-full bg-accent-primary/12 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-8%] right-[18%] h-[220px] w-[220px] rounded-full bg-accent-secondary/10 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: [
              "radial-gradient(circle at 18% 18%, rgba(192,138,74,0.22), transparent 0 28%)",
              "radial-gradient(circle at 82% 22%, rgba(192,138,74,0.1), transparent 0 18%)",
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "auto, auto, 96px 96px, 96px 96px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-[9%] hidden w-px bg-gradient-to-b from-transparent via-accent-primary/60 to-transparent lg:block"
        />

        <Container className="relative grid min-h-[calc(100svh-4rem)] items-end gap-16 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_220px] lg:py-24">
          <div className="max-w-4xl space-y-10 pb-6">
            <div className="space-y-5">
              <p className="section-kicker flex items-center gap-3">
                <CathedralSigil className="text-accent-secondary" />
                operator-grade systems
              </p>

              <h1 className="max-w-4xl font-display text-[3.6rem] leading-[0.88] text-text [text-shadow:0_0_24px_rgba(192,138,74,0.08)] sm:text-[4.9rem] lg:text-[6.6rem]">
                A machine cathedral for software, systems, and engineered emergence.
              </h1>

              <div className="max-w-3xl space-y-4">
                <p className="text-lg leading-8 text-text sm:text-xl">
                  I build desktop systems, local-first tooling, and operator surfaces for software
                  that has to stay legible when the system is under pressure.
                </p>
                <p className="max-w-2xl font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">
                  <TextScramble text="WPF // Rust // infrastructure // incident tooling // dispatch archive" duration={1200} />
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="signal-chip h-12 px-6 text-[11px]"
              >
                Enter the archive
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-3 border border-border/70 px-6 text-sm text-text-dim transition-colors hover:border-accent-primary/55 hover:text-text"
              >
                Open a channel
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-5 border-t border-border/70 pt-6 sm:grid-cols-3">
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-secondary">active track</p>
                <p className="text-sm leading-6 text-text-dim">Boundless, Pulse, and a writing cadence built to stay honest.</p>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-secondary">working surfaces</p>
                <p className="text-sm leading-6 text-text-dim">Desktop systems, distributed tooling, home lab infrastructure, and human-readable software.</p>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-secondary">doctrine</p>
                <p className="text-sm leading-6 text-text-dim">Build the apparatus. Keep it elegant. Make the system tell the truth.</p>
              </div>
            </div>
          </div>

          <aside className="content-shell self-stretch px-5 py-6 lg:py-10">
            <div className="flex h-full flex-col justify-between gap-10">
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="section-kicker">signal rail</p>
                  <p className="text-sm leading-7 text-text-dim">
                    An active archive of apparatus, dispatches, and field rites from the edge of software and engineered emergence.
                  </p>
                </div>

                <dl className="space-y-5">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">active apparatus</dt>
                    <dd className="mt-2 text-lg text-text">0{featuredProjects.length}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">last dispatch</dt>
                    <dd className="mt-2 text-lg text-text">{now?.month ?? "pending"}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">base vector</dt>
                    <dd className="mt-2 text-lg text-text">Chicago // US</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3 border-t border-border/60 pt-5">
                <p className="section-kicker flex items-center gap-2">
                  <CathedralSigil className="text-accent-secondary" />
                  emerging signal
                </p>
                <p className="text-sm leading-7 text-text-dim">
                  The work here circles around operator trust, local control, and software that can survive the next wave of intelligence without becoming inscrutable.
                </p>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <Container className="space-y-24 py-16 sm:py-20">
        {flagshipProject ? (
          <section className="space-y-8">
            <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
              <div className="space-y-2">
                <p className="section-kicker flex items-center gap-2">
                  <CathedralSigil className="text-accent-secondary" />
                  apparatus prime
                </p>
                <h2 className="font-display text-4xl leading-none text-text sm:text-5xl">
                  {flagshipProject.title}
                </h2>
              </div>
              <Link href={`/projects/${flagshipProject.slug}`} className="cathedral-link text-sm text-text-dim hover:text-text">
                Open dossier
              </Link>
            </div>

            <article className="panel overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
                <div className="relative min-h-[300px] overflow-hidden border-b border-border/70 lg:min-h-[420px] lg:border-b-0 lg:border-r">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundImage: [
                        "radial-gradient(circle at 24% 30%, rgba(192,138,74,0.26), transparent 0 22%)",
                        "radial-gradient(circle at 58% 52%, rgba(224,184,137,0.14), transparent 0 16%)",
                        "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 48%)",
                        "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
                        "linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                      ].join(","),
                      backgroundSize: "auto, auto, 72px 72px, 72px 72px",
                    }}
                  />
                  <div className="absolute inset-8 flex flex-col justify-between">
                    <p className="section-kicker">operator topology</p>
                    <div className="relative flex-1">
                      <div
                        aria-hidden="true"
                        className="absolute left-[18%] top-[30%] h-20 w-20 rounded-full bg-accent-primary/18 blur-[42px]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute left-[20%] right-[18%] top-[42%] h-px bg-gradient-to-r from-transparent via-accent-primary/60 to-transparent"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute left-[49%] top-[19%] h-[44%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent-primary/40 to-transparent"
                      />

                      <div className="absolute left-[8%] top-[43%] flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-accent-secondary shadow-[0_0_14px_rgba(224,184,137,0.55)]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">daemon</span>
                      </div>
                      <div className="absolute right-[8%] top-[43%] flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">operator</span>
                        <span className="h-2.5 w-2.5 rounded-full bg-accent-secondary shadow-[0_0_14px_rgba(224,184,137,0.55)]" />
                      </div>
                      <div className="absolute left-[50%] top-[13%] flex -translate-x-1/2 flex-col items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full border border-accent-primary/80 bg-bg shadow-[0_0_16px_rgba(192,138,74,0.35)]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">control plane</span>
                      </div>
                      <div className="absolute left-[50%] bottom-[14%] flex -translate-x-1/2 flex-col items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">tray / cli</span>
                        <span className="h-2.5 w-2.5 rounded-full border border-accent-primary/80 bg-bg shadow-[0_0_16px_rgba(192,138,74,0.35)]" />
                      </div>

                      <div className="absolute left-[50%] top-[40%] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent-primary/45 bg-[radial-gradient(circle,rgba(224,184,137,0.16),rgba(0,0,0,0)_68%)]">
                        <div className="h-12 w-12 rounded-full border border-accent-primary/55 bg-bg/80 shadow-[0_0_28px_rgba(192,138,74,0.18)]" />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 grid gap-4 border-t border-border/60 pt-5 sm:grid-cols-3">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-secondary">pairing</p>
                          <p className="mt-2 text-xs leading-6 text-text-dim">Nearby machines, explicit topology, no mystery state.</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-secondary">control</p>
                          <p className="mt-2 text-xs leading-6 text-text-dim">Daemon, tray, and CLI surfaces aligned to one operator model.</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-secondary">recovery</p>
                          <p className="mt-2 text-xs leading-6 text-text-dim">Reconnects, diagnostics, and safe reset flows built into the apparatus.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-10 p-8 sm:p-10">
                  <div className="space-y-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-secondary">
                      {flagshipProject.status} {"//"} flagship system
                    </p>
                    <p className="font-display text-3xl leading-none text-text sm:text-4xl">
                      Windows-first multi-PC control, built around daemon, tray, and CLI surfaces.
                    </p>
                    <p className="text-lg leading-8 text-text-dim">
                      {flagshipProject.summary}
                    </p>
                    <p className="max-w-2xl text-sm leading-7 text-text-dim">
                      A local-first multi-PC control system in Rust, built to make nearby machines
                      feel explicit, reliable, and operator-readable instead of magical.
                    </p>
                  </div>

                  <div className="space-y-5 border-t border-border/60 pt-5">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-secondary">state</p>
                        <p className="mt-2 text-sm text-text-dim">public alpha</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-secondary">focus</p>
                        <p className="mt-2 text-sm text-text-dim">packaging + recovery</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-secondary">surface</p>
                        <p className="mt-2 text-sm text-text-dim">operator-readable</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {flagshipProject.tech.slice(0, 5).map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
        ) : null}

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
            <div className="space-y-2">
              <p className="section-kicker">apparatus archive</p>
              <h2 className="font-display text-4xl leading-none text-text sm:text-5xl">Apparatus in active orbit</h2>
            </div>
            <Link href="/projects" className="cathedral-link text-sm text-text-dim hover:text-text">
              View all projects
            </Link>
          </div>
          <div className="divide-y divide-border/70 border-b border-border/70">
            {secondaryProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
            <div className="space-y-2">
              <p className="section-kicker flex items-center gap-2">
                <CathedralSigil className="text-accent-secondary" />
                dispatch archive
              </p>
              <h2 className="font-display text-4xl leading-none text-text sm:text-5xl">Dispatches from the active field</h2>
            </div>
            <Link href="/writing" className="cathedral-link text-sm text-text-dim hover:text-text">
              Open all dispatches
            </Link>
          </div>
          <div className="divide-y divide-border/70 border-b border-border/70">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="content-shell grid gap-8 py-10 sm:grid-cols-[minmax(0,1fr)_320px] sm:py-12">
          <div className="space-y-5 pr-0 sm:pr-10">
            <p className="section-kicker">current rite</p>
            <h2 className="font-display text-4xl leading-none text-text sm:text-5xl">
              {now?.month ? `Current rite / ${now.month}` : "Current rite"}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-text-dim">
              {now?.summary ?? "No live dispatch is currently loaded."}
            </p>
          </div>

          <div className="space-y-4 border-t border-border/70 pt-6 sm:border-l sm:border-t-0 sm:pt-0 sm:pl-8">
            <p className="section-kicker">active tracks</p>
            {now ? (
              <ul className="space-y-4 text-sm leading-7 text-text-dim">
                {now.items.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-7 text-text-dim">Awaiting the next dispatch.</p>
            )}
          </div>
        </section>

        <section className="content-shell flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-12">
          <div className="space-y-3">
            <p className="section-kicker">threshold</p>
            <h2 className="font-display text-4xl leading-none text-text sm:text-5xl">Enter the next chamber.</h2>
            <p className="max-w-2xl text-base leading-8 text-text-dim">
              For collaboration, systems work, or a technical conversation worth having.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="signal-chip h-12 px-6 text-[11px]">
              Open a channel
            </Link>
            <Link href="/resume" className="inline-flex h-12 items-center gap-3 border border-border/70 px-6 text-sm text-text-dim transition-colors hover:border-accent-primary/55 hover:text-text">
              Review capabilities
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
