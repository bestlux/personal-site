import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="font-display text-lg uppercase tracking-[0.16em] text-accent-cyan"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="flex-1 overflow-x-auto">
          <ul className="flex min-w-max items-center justify-end gap-2 md:gap-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-11 min-w-11 items-center px-1 text-xs uppercase tracking-[0.12em] text-text-dim transition hover:text-accent-orange md:text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
