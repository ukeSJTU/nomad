"use client";

import {
  type PassengerFormCardProps,
  PassengerFormCard as PassengerFormCardUI,
  type PassengerFormData,
  type SavedPassenger,
} from "@ukesjtu/nomad-ui/components/flights/booking";
import { shouldShowDeleteButton } from "@/hooks/use-passenger-forms";

export type { PassengerFormData, SavedPassenger };

/**
 * Container component for PassengerFormCard
 * Provides the showDeleteButton logic from use-passenger-forms hook
 */
export function PassengerFormCard(props: PassengerFormCardProps) {
  return (
    <PassengerFormCardUI {...props} showDeleteButton={shouldShowDeleteButton} />
  );
}
