import type { MDXComponents } from "mdx/types";
import { AlertCircle, Info, Terminal } from "lucide-react";
import React from "react";

const Callout = ({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "error" }) => {
  const styles = {
    info: "border-accent-secondary text-text",
    warning: "border-accent-warning text-text",
    error: "border-accent-primary text-text",
  };
  
  const icons = {
    info: <Info size={16} className="text-accent-secondary" />,
    warning: <AlertCircle size={16} className="text-accent-warning" />,
    error: <Terminal size={16} className="text-accent-primary" />
  };

  return (
    <div className={`panel my-6 flex gap-4 p-4 border-l-2 ${styles[type]}`}>
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="text-sm leading-relaxed [&>p]:mt-0">{children}</div>
    </div>
  );
};

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className="mt-16 mb-6 font-mono text-xl uppercase tracking-widest text-text border-b border-border/50 pb-4"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-12 mb-4 font-mono text-lg uppercase tracking-wider text-text-dim"
    />
  ),
  p: (props) => <p {...props} className="mt-6 text-base leading-relaxed text-text-dim [&:not(:first-child)]:mt-6" />,
  a: (props) => (
    <a
      {...props}
      className="font-medium underline decoration-border underline-offset-4 transition-colors hover:text-text hover:decoration-text"
    />
  ),
  ul: (props) => <ul {...props} className="mt-6 list-square space-y-3 pl-6 text-base text-text-dim marker:text-accent-muted" />,
  ol: (props) => <ol {...props} className="mt-6 list-decimal space-y-3 pl-6 text-base text-text-dim marker:text-accent-muted" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="panel my-8 border-l-2 border-accent-secondary p-6 text-text italic"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="rounded-none border border-border/50 bg-bg-soft px-1.5 py-0.5 font-mono text-[13px] text-text"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="panel my-8 overflow-x-auto p-6 font-mono text-[13px] leading-relaxed relative group"
    />
  ),
  Callout,
};
