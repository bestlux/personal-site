import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col gap-4 text-sm text-text-dim md:flex-row md:items-center md:justify-between">
        <p>
          {new Date().getFullYear()} {siteConfig.name}. Built in public, iterated monthly.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-accent-cyan" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-accent-cyan" href="/colophon">
            Colophon
          </Link>
          <a
            className="hover:text-accent-cyan"
            href={siteConfig.social.github}
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}
