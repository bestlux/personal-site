import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="pb-8 pt-10">
      <Container>
        <div className="signal-rule mb-6 h-px" />
        <section className="panel flex flex-col gap-4 p-4 text-sm text-text-dim sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p>
            {new Date().getFullYear()} {siteConfig.name}. Built in public, iterated monthly.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link className="signal-chip inline-flex h-11 min-w-11 items-center px-3" href="/privacy">
              Privacy
            </Link>
            <Link className="signal-chip inline-flex h-11 min-w-11 items-center px-3" href="/colophon">
              Colophon
            </Link>
            <a
              className="signal-chip inline-flex h-11 min-w-11 items-center px-3"
              href={siteConfig.social.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </section>
      </Container>
    </footer>
  );
}
