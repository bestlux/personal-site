export const siteConfig = {
  name: "iomancer",
  title: "iomancer",
  description:
    "Software engineer. San Francisco, Earth. Books, notes, and a place to say hello.",
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
