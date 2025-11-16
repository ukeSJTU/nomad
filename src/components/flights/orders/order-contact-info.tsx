import { Mail, Phone } from "lucide-react";

import type { OrderDetailsWithAirports } from "@/app/(frontend)/(with-sidebar)/orders/[orderId]/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type OrderContactInfoProps = {
  contactPhone: OrderDetailsWithAirports["contactPhone"];
  contactEmail: OrderDetailsWithAirports["contactEmail"];
};

/**
 * Order Contact Information Card Component
 *
 * Displays contact phone and email information
 */
export function OrderContactInfo({
  contactPhone,
  contactEmail,
}: OrderContactInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>联系人信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {contactPhone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{contactPhone}</span>
            </div>
          )}
          {contactEmail && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{contactEmail}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
