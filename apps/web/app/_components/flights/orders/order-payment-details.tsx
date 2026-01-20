import { OrderPaymentDetails as OrderPaymentDetailsUI } from "@ukesjtu/nomad-ui/components/flights/orders";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { OrderDetailFull } from "@/types/dto";

export type OrderPaymentDetailsProps = {
  paymentData: OrderDetailFull["payment"];
};

/**
 * Order Payment Details Card Container
 *
 * Provides date formatting function to UI component
 *
 * 我们的系统不考虑机建和燃油费用
 */
export function OrderPaymentDetails({ paymentData }: OrderPaymentDetailsProps) {
  // Format date using date-fns
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MM-dd HH:mm", { locale: zhCN });
  };

  return (
    <OrderPaymentDetailsUI paymentData={paymentData} formatDate={formatDate} />
  );
}
