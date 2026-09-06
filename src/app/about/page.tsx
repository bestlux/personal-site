import { AboutContent } from "@/components/distance/content";
import { DistancePage } from "@/components/distance/page";
import { distanceMetadata } from "@/lib/distance-metadata";

export const metadata = distanceMetadata(
  "About",
  "Software engineer. San Francisco, Earth.",
  "/about",
);

export default function AboutPage() {
  return (
    <DistancePage>
      <span className="distance-eyebrow">01</span>
      <h1>About</h1>
      <AboutContent />
    </DistancePage>
  );
}
