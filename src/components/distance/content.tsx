import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { Book } from "@/lib/content/reading";
import type { getMusicNotes } from "@/lib/content/music";

export function MusicList({
  notes,
}: {
  notes: ReturnType<typeof getMusicNotes>;
}) {
  return (
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
  );
}

export const emailHref = `mailto:${siteConfig.emailParts.user}@${siteConfig.emailParts.host}.${siteConfig.emailParts.tld}`;
export const photoSource =
  "https://science.nasa.gov/photojournal/pale-blue-dot-revisited/";

export function AboutContent() {
  return (
    <div className="distance-copy">
      <p className="distance-lead">
        Software engineer.
        <br />
        San Francisco.
      </p>
      <div className="distance-links">
        <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a href={emailHref}>
          Say hello <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

export function BookList({ books }: { books: Book[] }) {
  return (
    <div className="distance-copy">
      <p>
        I want to write about books to understand them better—and figure out
        which ideas to carry with me.
      </p>
      <ol className="distance-books">
        {books.map((book, index) => (
          <li key={book.slug}>
            <Link href={`/reading/${book.slug}`}>
              <span className="distance-book-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{book.title}</strong>
                <small>{book.author}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </Link>
          </li>
        ))}
      </ol>
      {books.every((book) => !book.notesPublished) && (
        <p className="distance-footnote">Book notes to come.</p>
      )}
    </div>
  );
}
