import { OrderPassengerInfo as OrderPassengerInfoUI } from "@nomad/ui/components/flights/orders";
import type { OrderDetailFull } from "@/types/dto";

import { getIdentityTypeName } from "./utils";

export type OrderPassengerInfoProps = {
  passengers: OrderDetailFull["passengers"];
};

/**
 * Order Passenger Information Card Container
 *
 * Maps DTO type to UI component and provides utility function
 *
 * 携程对于待付款类型订单会在"出行人信息"后面显示"修改姓名"和"修改证件"两个按钮，我们不做实现
 * 这里的所有证件号码都不打码
 */
export function OrderPassengerInfo({ passengers }: OrderPassengerInfoProps) {
  return (
    <OrderPassengerInfoUI
      passengers={passengers}
      getIdentityTypeName={getIdentityTypeName}
    />
  );
}
