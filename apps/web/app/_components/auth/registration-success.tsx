"use client";

import { RegistrationSuccess as RegistrationSuccessUI } from "@nomad/ui/components/auth";
import { useRouter } from "next/navigation";

export interface RegistrationSuccessProps {
  /** Success title */
  title?: string;

  /** Success description */
  description?: string;

  /** Custom className */
  className?: string;
}

/**
 * Registration success container component
 * Handles navigation for the registration success UI
 */
export default function RegistrationSuccess({
  title,
  description,
  className,
}: RegistrationSuccessProps) {
  const router = useRouter();

  const handleStartBooking = () => {
    router.push("/flights");
  };

  const handleGoToProfile = () => {
    router.push("/home/info");
  };

  return (
    <RegistrationSuccessUI
      title={title}
      description={description}
      className={className}
      onStartBooking={handleStartBooking}
      onGoToProfile={handleGoToProfile}
    />
  );
}
