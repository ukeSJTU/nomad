import { Banner } from "fumadocs-ui/components/banner";
import { GithubInfo } from "fumadocs-ui/components/github-info";
import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { Construction } from "lucide-react";

import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner id="global-banner" variant="rainbow">
        <Construction />
        This site is under construction.
      </Banner>
      <DocsLayout {...docsOptions}>{children}</DocsLayout>
    </>
  );
}
