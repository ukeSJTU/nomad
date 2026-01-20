"use client";

import {
  OrderCard as OrderCardUI,
  type OrderListItem,
} from "@ukesjtu/nomad-ui/components/user";
import { useRouter } from "next/navigation";

export interface OrderCardProps {
  order: OrderListItem;

  // UI control
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  onDelete: () => void;
  onActionClick?: () => void; // For "Resend Confirmation" or "Go to Payment"
}

/**
 * OrderCard Container Component
 *
 * @description
 * Container component that wraps the UI component from @nomad/ui.
 * Handles Next.js-specific navigation logic.
 *
 * @remarks
 * - Manages navigation to order details page
 * - Passes through UI state and callbacks to the UI component
 */
export default function OrderCard({
  order,
  isChecked,
  onCheckChange,
  onDelete,
  onActionClick,
}: OrderCardProps) {
  const router = useRouter();

  const handleOrderClick = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <OrderCardUI
      order={order}
      isChecked={isChecked}
      onCheckChange={onCheckChange}
      onDelete={onDelete}
      onActionClick={onActionClick}
      onOrderClick={handleOrderClick}
    />
  );
}
