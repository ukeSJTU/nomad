"use client";

import { Car, Plane, Shield, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  type AncillaryService,
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
    if (selectedServices.includes(code)) {
      setSelectedServices(selectedServices.filter(c => c !== code));
    } else {
      setSelectedServices([...selectedServices, code]);
    }
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

  const renderServiceOption = (service: AncillaryService) => {
    const isSelected = selectedServices.includes(service.code);

    return (
      <div
        key={service.code}
        className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
        onClick={() => handleToggleService(service.code)}
      >
        <Checkbox
          id={service.code}
          checked={isSelected}
          onCheckedChange={() => handleToggleService(service.code)}
          className="mt-1"
        />
        <div className="flex-1 space-y-1">
          <Label
            htmlFor={service.code}
            className="text-base font-medium cursor-pointer"
          >
            {service.name}
          </Label>
          {service.description && (
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-orange-500">
            ¥{service.price}
          </div>
        </div>
      </div>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "INSURANCE":
        return <Shield className="h-5 w-5" />;
      case "AIRPORT_PICKUP":
        return <Car className="h-5 w-5" />;
      case "MEAL":
        return <Utensils className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "INSURANCE":
        return "旅行保险";
      case "AIRPORT_PICKUP":
        return "接送机服务";
      case "MEAL":
        return "机上餐食";
      default:
        return category;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>选择增值服务</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              {/* Insurance Services */}
              <AccordionItem value="insurance">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon("INSURANCE")}
                    <span className="font-semibold">
                      {getCategoryTitle("INSURANCE")}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {getAncillaryServicesByCategory("INSURANCE").map(service =>
                      renderServiceOption(service)
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Airport Pickup Services */}
              <AccordionItem value="airport-pickup">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon("AIRPORT_PICKUP")}
                    <span className="font-semibold">
                      {getCategoryTitle("AIRPORT_PICKUP")}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {getAncillaryServicesByCategory("AIRPORT_PICKUP").map(
                      service => renderServiceOption(service)
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Meal Services */}
              <AccordionItem value="meal">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon("MEAL")}
                    <span className="font-semibold">
                      {getCategoryTitle("MEAL")}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {getAncillaryServicesByCategory("MEAL").map(service =>
                      renderServiceOption(service)
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

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
