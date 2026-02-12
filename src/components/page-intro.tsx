import { cn } from "@/lib/utils";

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  summary: string;
  className?: string;
}

export function PageIntro({ eyebrow, title, summary, className }: PageIntroProps) {
  return (
    <header className={cn("panel reveal-up space-y-4 p-6 sm:p-8", className)}>
      {eyebrow ? (
        <p className="font-display text-xs uppercase tracking-[0.24em] text-accent-green">
          {eyebrow}
        </p>
      ) : null}
      <div className="signal-rule h-px w-full max-w-40" />
      <h1 className="max-w-5xl font-display text-4xl uppercase tracking-[0.04em] text-text sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-3xl text-base leading-relaxed text-text-dim sm:text-lg">{summary}</p>
    </header>
  );
}
