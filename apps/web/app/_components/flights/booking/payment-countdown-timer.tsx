"use client";

import { PaymentCountdownTimer as PaymentCountdownTimerUI } from "@ukesjtu/nomad-ui/components/flights/booking";
import { useEffect, useState } from "react";

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

  const handleExpire = () => {
    // Timer expired, already handled by onTimeLeftChange callback
  };

  return (
    <PaymentCountdownTimerUI
      remainingSeconds={timeLeft}
      onExpire={handleExpire}
    />
  );
}
