import { notFound } from "next/navigation";

import { getLLMText } from "@/integrations/fumadocs/get-llm-text";
import { source } from "@/integrations/fumadocs/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/llms.mdx/[[...slug]]">
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
