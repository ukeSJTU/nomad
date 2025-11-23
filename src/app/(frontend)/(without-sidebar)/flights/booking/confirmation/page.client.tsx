"use client";

import { FileText, Home, Plane } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  ConfirmationBookingInfo,
  ConfirmationFlightDetails,
  ConfirmationNoticeCard,
  ConfirmationPaymentSummary,
  ConfirmationSuccessHeader,
} from "@/components/flights/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ConfirmationPageOrderDTO } from "@/types/dto";

export default function ConfirmationPageClient({
  order,
}: {
  order: ConfirmationPageOrderDTO;
}) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <ConfirmationSuccessHeader orderNumber={order.orderNumber} />

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plane className="h-5 w-5" />
              订单详情
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ConfirmationFlightDetails
              outboundFlight={order.outboundFlight}
              inboundFlight={order.inboundFlight}
            />

            <Separator />

            <ConfirmationBookingInfo
              passengers={order.passengers}
              contactPhone={order.contactPhone}
              contactEmail={order.contactEmail}
              ancillaryDetails={order.ancillaryDetails}
            />

            <Separator />

            <ConfirmationPaymentSummary
              baseAmount={order.baseAmount}
              ancillaryAmount={order.ancillaryAmount}
              totalAmount={order.totalAmount}
              payment={order.payment}
            />
          </CardContent>
        </Card>

        <ConfirmationNoticeCard />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            返回首页
          </Button>
          <Button
            size="lg"
            onClick={() => router.push(`/orders/${order.id}`)}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            查看订单详情
          </Button>
        </div>
      </div>
    </div>
  );
}
