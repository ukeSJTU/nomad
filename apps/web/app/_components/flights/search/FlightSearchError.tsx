/**
 * Flight Search Error Component
 *
 * Displays error messages when flight search fails
 */

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@nomad/ui/components/primitives/alert";
import { Button } from "@nomad/ui/components/primitives/button";
import { AlertCircle } from "lucide-react";

interface FlightSearchErrorProps {
  /**
   * Error message to display
   */
  message?: string;

  /**
   * Optional callback for retry action
   */
  onRetry?: () => void;
}

export function FlightSearchError({
  message = "搜索航班时出现错误，请稍后重试",
  onRetry,
}: FlightSearchErrorProps) {
  return (
    <Alert variant="destructive" className="mt-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>搜索失败</AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <p>{message}</p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="w-fit"
          >
            重新搜索
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
