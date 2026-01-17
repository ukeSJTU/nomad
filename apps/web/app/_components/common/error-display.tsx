"use client";

import {
  ErrorDisplay as ErrorDisplayUI,
  type ErrorDisplayProps as ErrorDisplayUIProps,
} from "@nomad/ui/components/common";

type ErrorDisplayProps = ErrorDisplayUIProps;

export type { ErrorType } from "@nomad/ui/components/common";

export function ErrorDisplay({ showBackButton, ...props }: ErrorDisplayProps) {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <ErrorDisplayUI
      {...props}
      showBackButton={showBackButton}
      onBackClick={handleBackClick}
    />
  );
}
