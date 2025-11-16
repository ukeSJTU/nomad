import type { OrderDetailsWithAirports } from "@/app/(frontend)/(with-sidebar)/orders/[orderId]/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getIdentityTypeName } from "./utils";

export type OrderPassengerInfoProps = {
  passengers: OrderDetailsWithAirports["passengers"];
};

/**
 * Order Passenger Information Card Component
 *
 * Displays information for all passengers in the order
 */
export function OrderPassengerInfo({ passengers }: OrderPassengerInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>乘机人信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {passengers.map((passenger, idx) => (
            <div
              key={passenger.id}
              className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="space-y-1">
                <div className="font-medium">
                  乘客 {idx + 1}: {passenger.name}
                </div>
                <div className="text-sm text-gray-600">
                  {getIdentityTypeName(passenger.identityType)}:{" "}
                  {passenger.identityNumber}
                </div>
                {passenger.phone && (
                  <div className="text-sm text-gray-600">
                    手机号: {passenger.phone}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
