"use client";

import {
  type AncillaryCategory,
  AncillarySelection as AncillarySelectionUI,
} from "@ukesjtu/nomad-ui/components/flights/booking";
import {
  type AncillaryServiceCategory,
  getAncillaryServicesByCategory,
} from "@/db/schema/ancillary";
import { formatCurrency } from "@/lib/format";

export interface AncillarySelectionProps {
  /**
   * Array of selected service codes
   */
  selectedServices: string[];
  /**
   * Callback when a service is toggled
   */
  onToggleService: (code: string) => void;
  /**
   * Optional title for the card
   */
  title?: string;
  /**
   * Optional className for the card
   */
  className?: string;
}

/**
 * AncillarySelection Container Component
 *
 * Provides data and formatting logic for the ancillary selection UI.
 * Fetches service data by category and formats prices.
 */
export function AncillarySelection({
  selectedServices,
  onToggleService,
  title = "选择增值服务",
  className,
}: AncillarySelectionProps) {
  // Fetch services by category from data source
  const categories: AncillaryCategory[] = [
    {
      category: "INSURANCE" as AncillaryServiceCategory,
      services: getAncillaryServicesByCategory("INSURANCE"),
    },
    {
      category: "AIRPORT_PICKUP" as AncillaryServiceCategory,
      services: getAncillaryServicesByCategory("AIRPORT_PICKUP"),
    },
    {
      category: "MEAL" as AncillaryServiceCategory,
      services: getAncillaryServicesByCategory("MEAL"),
    },
  ];

  return (
    <AncillarySelectionUI
      selectedServices={selectedServices}
      onToggleService={onToggleService}
      categories={categories}
      formatPrice={formatCurrency}
      title={title}
      className={className}
    />
  );
}
