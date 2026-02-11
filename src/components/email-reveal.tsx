"use client";

import { useMemo, useState } from "react";

interface EmailRevealProps {
  user: string;
  host: string;
  tld: string;
}

export function EmailReveal({ user, host, tld }: EmailRevealProps) {
  const [revealed, setRevealed] = useState(false);

  const email = useMemo(() => `${user}@${host}.${tld}`, [host, tld, user]);

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="h-11 min-w-11 border border-border px-4 text-sm uppercase tracking-[0.12em] transition hover:border-accent-cyan hover:text-accent-cyan"
      >
        Reveal Email
      </button>
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex h-11 min-w-11 items-center border border-accent-cyan px-4 text-sm tracking-[0.08em] text-accent-cyan"
    >
      {email}
    </a>
  );
}
