import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { getResume } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description: "Experience, projects, and capabilities.",
  path: "/resume",
});

export default function ResumePage() {
  const resume = getResume();

  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageIntro eyebrow="Capabilities" title="Resume" summary={resume.headline} />

      <section className="panel space-y-6 p-6">
        <p className="text-lg text-text-dim">{resume.summary}</p>

        <div className="space-y-4">
          <h2 className="font-display text-2xl uppercase tracking-[0.04em]">Experience</h2>
          {resume.experience.map((entry) => (
            <article key={`${entry.org}-${entry.role}`} className="space-y-2 border-l border-border pl-4">
              <p className="text-xs uppercase tracking-[0.16em] text-accent-green">{entry.period}</p>
              <h3 className="font-display text-xl uppercase tracking-[0.04em]">
                {entry.role} · {entry.org}
              </h3>
              <ul className="list-disc space-y-1 pl-6 text-text-dim">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-2xl uppercase tracking-[0.04em]">Skills</h2>
          <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.1em] text-accent-cyan">
            {resume.skills.map((skill) => (
              <li key={skill} className="border border-border px-2 py-1">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/resume.pdf"
            className="inline-flex h-11 min-w-11 items-center border border-accent-cyan px-4 text-sm uppercase tracking-[0.12em] text-accent-cyan hover:bg-accent-cyan hover:text-bg"
          >
            Download PDF
          </Link>
          {resume.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 min-w-11 items-center border border-border px-4 text-sm uppercase tracking-[0.12em] text-text-dim hover:border-accent-orange hover:text-accent-orange"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </Container>
  );
}