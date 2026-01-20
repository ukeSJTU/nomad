import { RefundOrderDialog as RefundOrderDialogUI } from "@ukesjtu/nomad-ui/components/flights/orders";

export type RefundOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  refundAmount?: string;
};

/**
 * Refund Order Confirmation Dialog Container
 *
 * Simple re-export of UI component - no additional container logic needed
 */
export function RefundOrderDialog(props: RefundOrderDialogProps) {
  return <RefundOrderDialogUI {...props} />;
}
