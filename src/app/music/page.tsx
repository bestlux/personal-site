import { DistancePage } from "@/components/distance/page";
import { MusicList } from "@/components/distance/content";
import { getMusicNotes } from "@/lib/content/music";
import { distanceMetadata } from "@/lib/distance-metadata";

export const metadata = distanceMetadata(
  "Music",
  "Songs, listening, and a few thoughts.",
  "/music",
);

export default function MusicPage() {
  return (
    <DistancePage>
      <span className="distance-eyebrow">03</span>
      <h1>Music</h1>
      <MusicList notes={getMusicNotes()} />
    </DistancePage>
  );
}
