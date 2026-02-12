import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { renderMdx } from "@/lib/content/mdx";
import { getAllNowEntries } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo";
import { formatMonth } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Now",
  description: "Monthly updates on what I am building, exploring, and focusing on.",
  path: "/now",
});

export default async function NowPage() {
  const entries = getAllNowEntries();

  const renderedEntries = await Promise.all(
    entries.map(async (entry) => ({
      ...entry,
      content: await renderMdx(entry.body),
    })),
  );

  return (
    <Container className="space-y-8 py-12 sm:py-16">
      <PageIntro
        eyebrow="Monthly Status"
        title="Now"
        summary="A compact monthly log of current focus areas and active tracks."
      />

      <div className="space-y-6">
        {renderedEntries.map((entry) => (
          <article key={entry.month} className="panel reveal-up space-y-4 p-6">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-accent-green">
                {formatMonth(entry.month)}
              </p>
              <h2 className="font-display text-3xl uppercase tracking-[0.04em]">{entry.title}</h2>
              <p className="text-text-dim">{entry.summary}</p>
            </header>
            <div>{entry.content}</div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-text-dim">Focus</p>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.1em] text-accent-cyan">
                {entry.focus.map((focusItem) => (
                  <li key={focusItem} className="signal-chip px-2 py-1">
                    {focusItem}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
