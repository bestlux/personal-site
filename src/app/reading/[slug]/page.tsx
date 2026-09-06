import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Notes } from "@/components/distance/notes";
import { DistancePage } from "@/components/distance/page";
import { getBook, getBooks } from "@/lib/content/reading";
import { distanceMetadata } from "@/lib/distance-metadata";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return getBooks().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = getBook((await params).slug);
  if (!book) notFound();
  return distanceMetadata(
    book.title,
    `Notes on ${book.title} by ${book.author}.`,
    `/reading/${book.slug}`,
  );
}

export default async function BookPage({ params }: Props) {
  const book = getBook((await params).slug);
  if (!book) notFound();
  return (
    <DistancePage back="/reading" backLabel="Reading">
      <article>
        <header className="distance-book-heading">
          <span className="distance-eyebrow">
            Reading / {book.notesPublished ? "Book notes" : "On the shelf"}
          </span>
          <h1>{book.title}</h1>
          <p className="distance-author">{book.author}</p>
          {book.notesPublished && (
            <p className="distance-footnote">
              {book.minutes} min read
              {book.updatedAt && (
                <>
                  {" "}
                  · Updated{" "}
                  <time dateTime={book.updatedAt}>{book.updatedAt}</time>
                </>
              )}
            </p>
          )}
        </header>
        {book.body ? (
          <Notes source={book.body} />
        ) : (
          <p className="distance-pending">
            One of the first books I want to write about. Notes to come.
          </p>
        )}
        <footer className="distance-essay-footer">
          <Link href="/reading">← Back to Reading</Link>
        </footer>
      </article>
    </DistancePage>
  );
}
