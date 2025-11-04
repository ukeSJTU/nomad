"use client";

import { Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AncillarySelection } from "@/components/flights/ancillary-selection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getAncillaryServiceByCode,
  getAncillaryServicesByCategory,
} from "@/lib/schema/ancillary";

// Mock flight data
const MOCK_FLIGHT = {
  airline: "中国东方航空",
  flightNumber: "MU5137",
  price: 850,
  passengerCount: 1,
};

export default function BookingAncillaryPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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
    let total = MOCK_FLIGHT.price * MOCK_FLIGHT.passengerCount;
    selectedServices.forEach(code => {
      const service = getAncillaryServiceByCode(code);
      if (service) {
        total += service.price;
      }
    });
    return total;
  };

  const handleNext = () => {
    router.push("/flights/booking/payment");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <AncillarySelection
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
        />

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/flights/booking/passengers")}
          >
            上一步
          </Button>
          <Button onClick={handleNext} size="lg">
            下一步：确认支付
          </Button>
        </div>
      </div>

      {/* Right Sidebar - Order Summary */}
      <div className="lg:col-span-1">
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
              <div className="font-medium">{MOCK_FLIGHT.flightNumber}</div>
              <div className="text-sm text-gray-600">{MOCK_FLIGHT.airline}</div>
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">机票</span>
                <span>
                  ¥{MOCK_FLIGHT.price} × {MOCK_FLIGHT.passengerCount}
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
                        <span>¥{service.price}</span>
                      </div>
                    );
                  })}
                </>
              )}

              <Separator />
              <div className="flex items-center justify-between text-lg font-bold">
                <span>总计</span>
                <span className="text-orange-500">¥{calculateTotal()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
