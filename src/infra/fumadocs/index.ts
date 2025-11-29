import "server-only";

// Compatibility re-exports; primary sources now live under src/config/docs
export { baseOptions, getLLMText, getPageImage, source } from "@/config/docs";
export {
  ProvideAIAnnotationsToolSchema,
  ProvideLinksToolSchema,
} from "@/config/docs/inkeep-qa-schema";
