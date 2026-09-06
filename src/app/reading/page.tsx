import { BookList } from "@/components/distance/content";
import { DistancePage } from "@/components/distance/page";
import { getBooks } from "@/lib/content/reading";
import { distanceMetadata } from "@/lib/distance-metadata";

export const metadata = distanceMetadata(
  "Reading",
  "Books and the ideas I want to spend time with.",
  "/reading",
);

export default function ReadingPage() {
  return (
    <DistancePage>
      <span className="distance-eyebrow">02</span>
      <h1>Reading</h1>
      <BookList books={getBooks()} />
    </DistancePage>
  );
}
