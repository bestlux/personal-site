import { DistanceHome } from "@/components/distance/home";
import {
  AboutContent,
  BookList,
  MusicList,
} from "@/components/distance/content";
import { getMusicNotes } from "@/lib/content/music";
import { JsonLd } from "@/components/json-ld";
import { getBooks } from "@/lib/content/reading";
import { siteConfig } from "@/lib/site-config";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
          sameAs: [siteConfig.social.github],
          description: "Software engineer. San Francisco, Earth.",
        }}
      />
      <DistanceHome
        about={<AboutContent />}
        reading={<BookList books={getBooks()} />}
        music={<MusicList notes={getMusicNotes()} />}
      />
    </>
  );
}
