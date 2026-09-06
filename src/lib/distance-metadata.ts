import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export const distanceImage = {
  url: "/images/pale-blue-dot.jpg",
  width: 5230,
  height: 5175,
  alt: "Pale Blue Dot — NASA/JPL-Caltech",
};

export function distanceMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: [distanceImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [distanceImage],
    },
  };
}
