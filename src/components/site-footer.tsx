import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-bg pb-8 pt-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Identity Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 border border-text-dim flex items-center justify-center">
                <div className="h-1 w-1 bg-text-dim" />
              </div>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text">
                iomancer
              </span>
            </div>
            <p className="max-w-xs font-mono text-xs leading-relaxed text-text-dim uppercase tracking-wider">
              High-performance systems engineering.
              Built in public, iterated meticulously.
            </p>
          </div>

          {/* Links Columns */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-text">Directory</h3>
            <ul className="space-y-2 font-mono text-xs uppercase tracking-wider text-text-dim">
              <li><Link href="/" className="hover:text-text transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-text transition-colors">Projects</Link></li>
              <li><Link href="/writing" className="hover:text-text transition-colors">Writing</Link></li>
              <li><Link href="/now" className="hover:text-text transition-colors">Now</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-text">System</h3>
            <ul className="space-y-2 font-mono text-xs uppercase tracking-wider text-text-dim">
              <li><Link href="/resume" className="hover:text-text transition-colors">Resume</Link></li>
              <li><Link href="/colophon" className="hover:text-text transition-colors">Colophon</Link></li>
              <li><Link href="/privacy" className="hover:text-text transition-colors">Privacy</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-text">External</h3>
            <ul className="space-y-2 font-mono text-xs uppercase tracking-wider text-text-dim">
              <li><a href={siteConfig.social.github} target="_blank" rel="noreferrer" className="hover:text-text transition-colors">GitHub</a></li>
              <li><a href={siteConfig.social.x} target="_blank" rel="noreferrer" className="hover:text-text transition-colors">X / Twitter</a></li>
              <li><Link href="/contact" className="hover:text-text transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-border/50 pt-8 font-mono text-[10px] uppercase tracking-widest text-text-dim">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="mt-4 flex sm:mt-0 gap-4">
            <span>TERMINAL_ID: 4A-99B</span>
            <span className="hidden sm:inline-block text-accent-muted">{"//"}</span>
            <span className="hidden sm:inline-block">RENDER_MODE: STATIC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
