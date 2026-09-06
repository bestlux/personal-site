import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Cormorant_Garamond,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/lib/site-config";
import { distanceImage } from "@/lib/distance-metadata";
import "./globals.css";
import "@/components/distance/distance.css";

const distanceSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--plex",
});
const distanceMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--mono",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono-ui",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | iomancer",
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [distanceImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [distanceImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} ${distanceSans.variable} ${distanceMono.variable} bg-bg text-text antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
