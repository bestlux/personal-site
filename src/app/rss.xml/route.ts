import { getAllWriting } from "@/lib/content/source";
import { siteConfig } from "@/lib/site-config";

export function GET() {
  const posts = getAllWriting();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/writing/${post.slug}`;
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <description><![CDATA[${post.excerpt}]]></description>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        </item>
      `;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${siteConfig.name}</title>
        <link>${siteConfig.url}</link>
        <description>${siteConfig.description}</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}