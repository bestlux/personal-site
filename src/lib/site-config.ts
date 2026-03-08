export const siteConfig = {
  name: "iomancer",
  title: "iomancer | living systems, projects, and ideas",
  description:
    "A living hub for projects, writing, experiments, and technical reflections.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iomancer.dev",
  emailParts: {
    user: "hello",
    host: "iomancer",
    tld: "dev",
  },
  social: {
    x: "https://x.com/iomancer",
    github: "https://github.com/bestlux",
  },
} as const;

export const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/now", label: "Now" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
