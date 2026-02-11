import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className="mt-10 font-display text-2xl uppercase tracking-[0.04em] text-accent-cyan"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-8 font-display text-xl uppercase tracking-[0.04em] text-accent-orange"
    />
  ),
  p: (props) => <p {...props} className="mt-4 leading-relaxed text-text-dim" />,
  a: (props) => (
    <a {...props} className="underline decoration-accent-cyan underline-offset-4" />
  ),
  ul: (props) => <ul {...props} className="mt-4 list-disc space-y-2 pl-6 text-text-dim" />,
  ol: (props) => <ol {...props} className="mt-4 list-decimal space-y-2 pl-6 text-text-dim" />,
  blockquote: (props) => (
    <blockquote {...props} className="mt-6 border-l-2 border-accent-green pl-4 text-text" />
  ),
  code: (props) => (
    <code
      {...props}
      className="rounded-none border border-border bg-bg-soft px-1 py-0.5 font-mono text-sm"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="mt-6 overflow-x-auto border border-border bg-bg-soft p-4 font-mono text-sm"
    />
  ),
};
