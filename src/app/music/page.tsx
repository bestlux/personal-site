import Link from "next/link";
import { DistancePage } from "@/components/distance/page";
import { getMusicNotes } from "@/lib/content/music";
import { distanceMetadata } from "@/lib/distance-metadata";

export const metadata = distanceMetadata(
  "Music",
  "Songs, listening, and a few thoughts.",
  "/music",
);

export default function MusicPage() {
  const notes = getMusicNotes();
  return (
    <DistancePage>
      <span className="distance-eyebrow">03</span>
      <h1>Music</h1>
      <div className="distance-copy">
        <p>Songs, listening, and a few thoughts.</p>
        {notes.length ? (
          <ol className="distance-books">
            {notes.map((note, index) => (
              <li key={note.slug}>
                <Link href={`/music/${note.slug}`}>
                  <span className="distance-book-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{note.title}</strong>
                    {note.artist && <small>{note.artist}</small>}
                  </span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="distance-footnote">More soon.</p>
        )}
      </div>
    </DistancePage>
  );
}
