import { Clock } from "lucide-react";
import { Alert, AlertDescription } from "../../primitives/alert";

export interface PaymentCountdownTimerProps {
  /**
   * Remaining time in seconds
   */
  remainingSeconds: number;

  /**
   * Callback when timer expires (reaches 0)
   */
  onExpire?: () => void;

  /**
   * Warning message text
   * @default "请在最晚支付时间前完成支付，超时订单将自动取消"
   */
  warningText?: string;

  /**
   * Threshold in seconds to show warning style (red text)
   * @default 60
   */
  warningThreshold?: number;
}

export function PaymentCountdownTimer({
  remainingSeconds,
  onExpire,
  warningText = "请在最晚支付时间前完成支付，超时订单将自动取消",
  warningThreshold = 60,
}: PaymentCountdownTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Call onExpire when time reaches 0
  if (remainingSeconds === 0 && onExpire) {
    onExpire();
  }

  const isWarning = remainingSeconds <= warningThreshold;

  return (
    <Alert>
      <AlertDescription>
        <div className="flex items-center justify-between gap-4">
          <Clock className="h-4 w-4" />
          <span className="text-sm leading-relaxed">{warningText}</span>
          <span
            className={`font-mono text-lg font-semibold shrink-0 ${
              isWarning ? "text-destructive" : "text-secondary"
            }`}
          >
            {formatTime(remainingSeconds)}
          </span>
        </div>
      </AlertDescription>
    </Alert>
  );
}
