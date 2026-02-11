export const siteConfig = {
  name: "iomancer",
  title: "iomancer | living systems, projects, and ideas",
  description:
    "A living hub for projects, writing, experiments, and technical reflections.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iomancer.dev",
  emailParts: {
    user: "iomancer",
    host: "lightweavelabs",
    tld: "com",
  },
  social: {
    x: "https://x.com/iomancer",
    github: "https://github.com/iomancer",
  },
} as const;

export const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/now", label: "Now" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
