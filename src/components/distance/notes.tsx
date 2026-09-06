import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export async function Notes({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
    },
  });
  return <div className="distance-prose">{content}</div>;
}
