import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  summary: string;
  className?: string;
}

export function PageIntro({ eyebrow, title, summary, className }: PageIntroProps) {
  return (
    <header className={cn("space-y-6 border-b border-border pb-8", className)}>
      <div className="flex items-center justify-between">
        {eyebrow && (
          <p className="font-mono flex items-center gap-2 text-xs uppercase tracking-widest text-accent-muted">
            <Terminal size={14} /> // {eyebrow}
          </p>
        )}
      </div>
      <h1 className="max-w-5xl font-mono text-4xl uppercase tracking-widest text-text sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-3xl text-base leading-relaxed text-text-dim sm:text-lg">
        {summary}
      </p>
    </header>
  );
}
