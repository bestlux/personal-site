"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, siteConfig } from "@/lib/site-config";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function SiteHeader() {
  const pathname = usePathname();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        }) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      {/* Top utility bar - extremely thin, pure data */}
      <div className="hidden md:flex h-6 w-full border-b border-border/50 bg-bg px-4 items-center justify-between font-mono text-[10px] uppercase tracking-widest text-text-dim">
        <div className="flex gap-4">
          <span>SYS.VER: 1.0.4</span>
          <span className="text-accent-secondary hidden lg:inline-block">ENV: PRODUCTION</span>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-secondary"></span>
            </span>
            NETWORK_OK
          </span>
          <span className="w-24 text-right">{time || "00:00:00 UTC"}</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="h-5 w-5 border border-text flex items-center justify-center group-hover:bg-text transition-colors">
              <div className="h-1.5 w-1.5 bg-text group-hover:bg-bg transition-colors" />
            </div>
            <span className="font-mono font-semibold text-sm uppercase tracking-[0.2em] text-text">
              iomancer
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex flex-1 items-center justify-center">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                        isActive ? "text-text font-semibold" : "text-text-dim hover:text-text"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span 
                          layoutId="nav-indicator"
                          className="absolute -bottom-[19px] left-0 right-0 h-[2px] bg-text" 
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="hidden md:flex items-center gap-2 font-mono text-[10px] text-text-dim border border-border/50 px-2 py-1 rounded-sm hover:text-text hover:border-text transition-colors bg-bg-soft"
              title="Open Command Palette"
            >
              <Terminal size={12} />
              <span>⌘K</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
