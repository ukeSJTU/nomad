import { ConfirmationSuccessHeader as UiConfirmationSuccessHeader } from "@nomad/ui/components/flights/booking";

interface ConfirmationSuccessHeaderProps {
  orderNumber: string;
}

export function ConfirmationSuccessHeader({
  orderNumber,
}: ConfirmationSuccessHeaderProps) {
  return <UiConfirmationSuccessHeader orderNumber={orderNumber} />;
}
