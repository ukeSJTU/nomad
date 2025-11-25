import { ErrorDisplay } from "@/components/common";
import {
  DEFAULT_ERROR_CONFIG,
  ERROR_CONFIGS,
  type ErrorConfig,
} from "@/constants/errors";

interface ErrorPageProps {
  searchParams: Promise<{
    type?: string;
    message?: string;
    title?: string;
  }>;
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;

  // Get predefined config or use default
  let config: ErrorConfig = params.type
    ? ERROR_CONFIGS[params.type] || DEFAULT_ERROR_CONFIG
    : DEFAULT_ERROR_CONFIG;

  // Allow URL params to override specific fields
  if (params.title || params.message) {
    config = {
      ...config,
      ...(params.title && { title: params.title }),
      ...(params.message && { message: params.message }),
    };
  }

  return <ErrorDisplay {...config} />;
}
