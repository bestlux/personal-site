import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-xl">
      <Container className="py-3">
        <div className="panel flex min-h-14 items-center gap-3 px-3 sm:px-4">
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-11 items-center gap-2 text-accent-cyan"
          >
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full bg-accent-green shadow-[0_0_12px_var(--accent-green)]"
            />
            <span className="font-display text-base uppercase tracking-[0.15em] sm:text-lg">
              {siteConfig.name}
            </span>
          </Link>

          <nav aria-label="Primary" className="flex-1 overflow-x-auto">
            <ul className="flex min-w-max items-center justify-end gap-1 sm:gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="signal-chip inline-flex h-11 min-w-11 items-center px-3 text-xs uppercase tracking-[0.12em] text-text-dim sm:text-sm"
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
        </div>
      </Container>
    </header>
  );
}
