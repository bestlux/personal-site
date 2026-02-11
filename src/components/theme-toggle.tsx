"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <button
        className="inline-flex h-11 min-w-11 items-center justify-center rounded-none border border-border px-3 text-xs uppercase tracking-[0.12em]"
        disabled
        aria-label="Theme loading"
      >
        ...
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-11 min-w-11 items-center justify-center rounded-none border border-border px-3 text-xs uppercase tracking-[0.12em] transition hover:border-accent-cyan hover:text-accent-cyan"
      aria-label="Toggle theme"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
