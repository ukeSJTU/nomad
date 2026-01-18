import { OrderContactInfo as OrderContactInfoUI } from "@nomad/ui/components/flights/orders";
import type { OrderDetailFull } from "@/types/dto";

export type OrderContactInfoProps = {
  contactInfo: OrderDetailFull["contact"];
};

/**
 * Order Contact Information Card Container
 *
 * Maps DTO type to UI component props
 */
export function OrderContactInfo({ contactInfo }: OrderContactInfoProps) {
  return <OrderContactInfoUI contactInfo={contactInfo} />;
}
