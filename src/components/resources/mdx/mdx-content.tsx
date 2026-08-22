import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Callout } from "@/components/resources/mdx/callout";
import { Step, Steps } from "@/components/resources/mdx/steps";
import { VideoEmbed } from "@/components/resources/video-embed";
import { toResourcesHref } from "@/lib/resources/href";

/** Internal links get client-side navigation; external ones open safely. */
function MdxLink({ href = "", ...props }: React.ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return <Link href={toResourcesHref(href)} {...props} />;
  }
  if (href.startsWith("#")) {
    return <a href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/** Wide tables scroll inside themselves rather than widening the page. */
function MdxTable(props: React.ComponentProps<"table">) {
  return (
    <div className="table-scroll">
      <table {...props} />
    </div>
  );
}

const components = {
  a: MdxLink,
  table: MdxTable,
  Callout,
  Steps,
  Step,
  /** Lets an article drop an extra video mid-body, beyond the header one. */
  Video: VideoEmbed,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "append",
                properties: { ariaHidden: true, tabIndex: -1 },
                content: {
                  type: "element",
                  tagName: "span",
                  properties: {},
                  children: [{ type: "text", value: "#" }],
                },
              },
            ],
          ],
        },
      }}
    />
  );
}
