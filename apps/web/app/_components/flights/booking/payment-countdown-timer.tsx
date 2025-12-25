"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentCountdownTimerProps {
  paymentDeadline: Date;
  onTimeLeftChange?: (timeLeft: number) => void;
}

export function PaymentCountdownTimer({
  paymentDeadline,
  onTimeLeftChange,
}: PaymentCountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  // Calculate initial time left
  useEffect(() => {
    const deadline = new Date(paymentDeadline);
    const now = new Date();
    const secondsLeft = Math.max(
      0,
      Math.floor((deadline.getTime() - now.getTime()) / 1000)
    );
    setTimeLeft(secondsLeft);
    onTimeLeftChange?.(secondsLeft);
  }, [paymentDeadline, onTimeLeftChange]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newValue = prev <= 1 ? 0 : prev - 1;
        onTimeLeftChange?.(newValue);
        if (newValue === 0) {
          clearInterval(timer);
        }
        return newValue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeLeftChange]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Alert>
      <AlertDescription>
        <div className="flex items-center justify-between gap-4">
          <Clock className="h-4 w-4" />
          <span className="text-sm leading-relaxed">
            请在最晚支付时间前完成支付，超时订单将自动取消
          </span>
          <span
            className={`font-mono text-lg font-semibold shrink-0 ${
              timeLeft <= 60 ? "text-destructive" : "text-secondary"
            }`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
      </AlertDescription>
    </Alert>
  );
}
