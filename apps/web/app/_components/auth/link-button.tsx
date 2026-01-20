"use client";

import { LinkButton as LinkButtonUI } from "@ukesjtu/nomad-ui/components/auth/link-button";
import { useState } from "react";
import { toast } from "sonner";
import { linkSocialAccountAction } from "@/app/_actions/auth";
import { createClientLogger } from "@/infra/logging/client-logger";

const logger = createClientLogger({ module: "link-button" });

/**
 * Props for LinkButton container component
 */
interface LinkButtonProps {
  /** Social provider identifier */
  providerId: "github" | "google";
  /** Display name of the provider for error messages */
  providerName: string;
}

/**
 * LinkButton Container Component
 *
 * Wraps the pure UI LinkButton component with OAuth linking logic.
 * Handles server actions, OAuth redirects, error handling, and notifications.
 *
 * This component must be a Client Component because:
 * - Browser must perform the redirect after receiving the URL from the server
 * - Cannot be called from Server Components
 *
 * @example
 * ```tsx
 * <LinkButton providerId="github" providerName="GitHub" />
 * ```
 */
export function LinkButton({ providerId, providerName }: LinkButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle linking a social account
   * Initiates OAuth flow via better-auth
   */
  const handleLink = async () => {
    setIsLoading(true);
    try {
      // Initiate OAuth flow for linking account
      const result = await linkSocialAccountAction(
        providerId,
        "/home/accounts"
      );

      if (!result.success || !result.data?.url) {
        logger.error(
          { error: result.error, providerId },
          `Failed to link ${providerId}`
        );
        toast.error(`Failed to link ${providerName} account`, {
          description: result.error || "Please try again later",
        });
        setIsLoading(false);
        return;
      }

      window.location.href = result.data.url;
      // OAuth redirect will happen automatically if successful
    } catch (error) {
      logger.error({ err: error, providerId }, "Error linking account");
      toast.error(`Error linking ${providerName} account`, {
        description: "An unexpected error occurred",
      });
      setIsLoading(false);
    }
  };

  return <LinkButtonUI onClick={handleLink} loading={isLoading} />;
}
