export type ErrorType = "warning" | "error" | "info";

export interface ErrorConfig {
  title: string;
  message: string;
  actionLabel: string;
  actionHref: string;
  type?: ErrorType;
  showBackButton?: boolean;
}

export type ErrorConfigMap = Record<string, ErrorConfig>;
