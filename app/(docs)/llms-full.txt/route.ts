import { getLLMText } from "@/lib/fumadocs/get-llm-text";
import { source } from "@/lib/fumadocs/source";

// cached forever
export const revalidate = false;

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join("\n\n"));
}
