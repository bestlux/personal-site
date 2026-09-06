import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DistancePage } from "@/components/distance/page";
import { Notes } from "@/components/distance/notes";
import { getMusicNote, getMusicNotes } from "@/lib/content/music";
import { distanceMetadata } from "@/lib/distance-metadata";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return getMusicNotes().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getMusicNote((await params).slug);
  if (!note) notFound();
  return distanceMetadata(
    note.title,
    note.artist
      ? `Listening notes: ${note.title} — ${note.artist}.`
      : note.title,
    `/music/${note.slug}`,
  );
}

export default async function MusicNotePage({ params }: Props) {
  const note = getMusicNote((await params).slug);
  if (!note) notFound();
  return (
    <DistancePage back="/music" backLabel="Music">
      <article>
        <header className="distance-book-heading">
          <span className="distance-eyebrow">Music / Listening notes</span>
          <h1>{note.title}</h1>
          {note.artist && <p className="distance-author">{note.artist}</p>}
          <p className="distance-footnote">
            {note.minutes > 0 && <>{note.minutes} min read · </>}
            <time dateTime={note.updatedAt}>{note.updatedAt}</time>
          </p>
          {note.listenUrl && (
            <div className="distance-links">
              <a href={note.listenUrl} target="_blank" rel="noreferrer">
                Listen <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </header>
        {note.body && <Notes source={note.body} />}
        <footer className="distance-essay-footer">
          <Link href="/music">← Back to Music</Link>
        </footer>
      </article>
    </DistancePage>
  );
}
