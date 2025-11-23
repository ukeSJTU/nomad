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
      <Clock className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>请在规定时间内完成支付，超时订单将自动取消</span>
        <span
          className={`font-mono text-lg font-bold ${
            timeLeft <= 60 ? "text-red-500" : "text-orange-500"
          }`}
        >
          {formatTime(timeLeft)}
        </span>
      </AlertDescription>
    </Alert>
  );
}
