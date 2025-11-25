"use client";

import { Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import {
  updateOrderAncillaryAction,
  type UpdateOrderAncillaryResult,
} from "@/app/_actions/orders";
import {
  AncillarySelection,
  PaymentCountdownTimer,
} from "@/components/flights/booking";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getAncillaryServiceByCode,
  getAncillaryServicesByCategory,
} from "@/db/schema";
import {
  addCurrency,
  formatCurrency,
  getCurrencyValue,
  parseCurrency,
} from "@/lib/currency";
import type { AncillaryPageOrder } from "@/types/dto";

interface BookingAncillaryPageClientProps {
  order: AncillaryPageOrder;
}

export function BookingAncillaryPageClient({
  order,
}: BookingAncillaryPageClientProps) {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [state, setState] = useState<UpdateOrderAncillaryResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [_timeLeft, setTimeLeft] = useState(0);

  // Navigate to payment page on successful submission
  useEffect(() => {
    if (state?.success) {
      router.push(`/flights/booking/payment?orderId=${order.id}`);
    }
  }, [state, router, order.id]);

  const handleToggleService = (code: string) => {
    setSelectedServices(prevSelected => {
      // If already selected, deselect it
      if (prevSelected.includes(code)) {
        return prevSelected.filter(c => c !== code);
      }

      // Get the service being selected
      const service = getAncillaryServiceByCode(code);
      if (!service) return prevSelected;

      // Get all services in the same category
      const categoryServices = getAncillaryServicesByCategory(service.category);
      const categoryServiceCodes = categoryServices.map(s => s.code);

      // Remove any previously selected service from the same category
      const filteredServices = prevSelected.filter(
        c => !categoryServiceCodes.includes(c)
      );

      // Add the new service
      return [...filteredServices, code];
    });
  };

  const calculateTotal = () => {
    let total = parseCurrency(order.baseAmount);
    selectedServices.forEach(code => {
      const service = getAncillaryServiceByCode(code);
      if (service) {
        total = addCurrency(getCurrencyValue(total), service.price);
      }
    });
    return getCurrencyValue(total);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateOrderAncillaryAction({
        orderId: order.id,
        ancillaryServiceCodes: selectedServices,
      });
      setState(result);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <AncillarySelection
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
        />

        {/* Error Message */}
        {state && !state.success && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <form onSubmit={handleNext}>
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
            >
              上一步
            </Button>
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "更新订单中..." : "下一步：确认支付"}
            </Button>
          </div>
        </form>
      </div>

      {/* Right Sidebar - Order Summary */}
      <div className="lg:col-span-1 flex flex-col space-y-2">
        <PaymentCountdownTimer
          paymentDeadline={order.paymentDeadline}
          onTimeLeftChange={setTimeLeft}
        />
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plane className="h-5 w-5" />
              订单摘要
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Flight Info */}
            <div>
              <div className="font-medium">
                {order.outboundFlight.flightNumber}
              </div>
              <div className="text-sm text-gray-600">
                {order.outboundFlight.airline.name}
              </div>
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">机票</span>
                <span>
                  {formatCurrency(order.pricePerTicket)} ×{" "}
                  {order.passengerCount}
                </span>
              </div>

              {selectedServices.length > 0 && (
                <>
                  <Separator />
                  <div className="text-sm font-medium">增值服务</div>
                  {selectedServices.map(code => {
                    const service = getAncillaryServiceByCode(code);
                    if (!service) return null;
                    return (
                      <div
                        key={code}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{service.name}</span>
                        <span>{formatCurrency(service.price)}</span>
                      </div>
                    );
                  })}
                </>
              )}

              <Separator />
              <div className="flex items-center justify-between text-lg font-bold">
                <span>总计</span>
                <span className="text-orange-500">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
