import { GithubInfo } from "fumadocs-ui/components/github-info";
import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";

import { baseOptions } from "@/integrations/fumadocs/layout.shared";
import { source } from "@/integrations/fumadocs/source";

const docsOptions: DocsLayoutProps = {
  ...baseOptions(),
  tree: source.pageTree,
  links: [
    {
      type: "custom",
      children: (
        <GithubInfo owner="ukeSJTU" repo="nomad" className="lg:-mx-2" />
      ),
    },
  ],
};

export default function Layout({ children }: LayoutProps<"/docs">) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
