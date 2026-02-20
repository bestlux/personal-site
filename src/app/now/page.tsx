import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { renderMdx } from "@/lib/content/mdx";
import { getAllNowEntries } from "@/lib/content/source";
import { buildMetadata } from "@/lib/seo";
import { formatMonth } from "@/lib/utils";
import { Activity, Target, Clock, CheckCircle2, Circle } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Now",
  description: "Monthly updates on what I am building, exploring, and focusing on.",
  path: "/now",
});

export default async function NowPage() {
  const entries = getAllNowEntries();

  if (entries.length === 0) {
    return (
      <Container className="space-y-8 py-12 sm:py-16">
        <PageIntro eyebrow="System Log" title="Now" summary="No telemetry data found." />
      </Container>
    );
  }

  const [latestEntry, ...historyEntries] = entries;
  const renderedLatestContent = await renderMdx(latestEntry.body);

  return (
    <Container className="space-y-12 py-12 sm:py-16">
      <PageIntro
        eyebrow="Live Telemetry"
        title="Now Dashboard"
        summary="Real-time(ish) status of my current engineering focus, active tracks, and learning vectors."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Status Panel */}
        <div className="panel lg:col-span-2 p-6 flex flex-col justify-between space-y-6">
          <header className="border-b border-border/50 pb-4 flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-secondary"></span>
                </span>
                <p className="font-mono text-xs uppercase tracking-widest text-accent-secondary">
                  STATUS: ACTIVE
                </p>
              </div>
              <h2 className="font-mono text-2xl uppercase tracking-wider text-text font-semibold">
                {latestEntry.title}
              </h2>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs uppercase tracking-widest text-text-dim">LOG_DATE</p>
              <p className="font-mono text-sm uppercase tracking-widest text-text mt-1">{formatMonth(latestEntry.month)}</p>
            </div>
          </header>

          <p className="text-lg leading-relaxed text-text-dim flex-1">
            {latestEntry.summary}
          </p>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <h3 className="font-mono flex items-center gap-2 text-xs uppercase tracking-widest text-accent-muted">
              <Activity size={14} /> // ACTIVE_TRACKS
            </h3>
            <ul className="space-y-3 font-mono text-sm">
              {latestEntry.items.map((item, idx) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-accent-secondary mt-0.5 shrink-0" />
                  <span className="text-text-dim leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Side Metrics */}
        <div className="flex flex-col gap-6">
          <div className="panel p-6 space-y-4">
            <h3 className="font-mono flex items-center gap-2 text-xs uppercase tracking-widest text-accent-muted border-b border-border/50 pb-2">
              <Target size={14} /> // CURRENT_VECTORS
            </h3>
            <ul className="flex flex-wrap gap-2 pt-2">
              {latestEntry.focus.map((focusItem) => (
                <li 
                  key={focusItem} 
                  className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest border border-border text-text bg-bg-soft"
                >
                  {focusItem}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-6 flex-1">
            <h3 className="font-mono flex items-center gap-2 text-xs uppercase tracking-widest text-accent-muted border-b border-border/50 pb-2">
              <Clock size={14} /> // SYSTEM_UPTIME
            </h3>
            <div className="pt-6 space-y-4">
              <div>
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-text-dim mb-1">
                  <span>Current Cycle</span>
                  <span className="text-accent-primary">IN_PROGRESS</span>
                </div>
                <div className="h-1.5 w-full bg-bg-soft border border-border/50 overflow-hidden">
                  <div className="h-full bg-accent-primary w-2/3 animate-pulse"></div>
                </div>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim leading-relaxed">
                DATA_COLLECTION_ONGOING. REPORT_COMPILED_MONTHLY.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Extended Notes */}
      <div className="panel p-6 sm:p-10">
        <h3 className="font-mono text-xs uppercase tracking-widest text-accent-muted border-b border-border/50 pb-4 mb-6">
          // COMPILED_NOTES
        </h3>
        <div className="prose-custom max-w-none">
          {renderedLatestContent}
        </div>
      </div>

      {/* Historical Logs */}
      {historyEntries.length > 0 && (
        <div className="space-y-6 pt-8">
          <h2 className="font-mono text-sm uppercase tracking-widest text-text flex items-center gap-2">
            <Circle size={10} className="text-text-dim fill-current" /> ARCHIVED_LOGS
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {historyEntries.map((entry) => (
              <div key={entry.month} className="panel p-5 space-y-4 group opacity-80 hover:opacity-100 transition-opacity">
                <header className="flex justify-between items-start border-b border-border/50 pb-3">
                  <h3 className="font-mono text-sm uppercase tracking-wider text-text font-semibold group-hover:text-accent-secondary transition-colors">
                    {formatMonth(entry.month)}
                  </h3>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-accent-muted px-1.5 py-0.5 border border-border/50 bg-bg-soft">
                    ARCHIVED
                  </span>
                </header>
                <p className="text-sm text-text-dim line-clamp-3 leading-relaxed">
                  {entry.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
