import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

interface MetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og-default.png",
  type = "website",
  publishedTime,
  tags,
}: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = new URL(image, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview image`,
        },
      ],
      ...(publishedTime
        ? {
            publishedTime,
          }
        : {}),
      ...(tags?.length
        ? {
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
