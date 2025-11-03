"use client";

import { Car, Check, Plane, Shield, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock flight data
const MOCK_FLIGHT = {
  airline: "中国东方航空",
  flightNumber: "MU5137",
  price: 850,
  passengerCount: 1,
};

// Mock ancillary services based on our schema
const MOCK_ANCILLARY_SERVICES = {
  insurance: [
    {
      code: "INSURANCE_BASIC",
      name: "基础旅行险",
      description: "提供基本的旅行意外保障,包括意外伤害和医疗费用",
      price: 50,
      features: ["意外伤害保障", "医疗费用报销", "24小时紧急救援"],
    },
    {
      code: "INSURANCE_PREMIUM",
      name: "高级旅行险",
      description:
        "提供全面的旅行保障,包括意外伤害、医疗费用、行李丢失和航班延误",
      price: 120,
      features: [
        "意外伤害保障",
        "医疗费用报销",
        "行李丢失赔偿",
        "航班延误补偿",
        "24小时紧急救援",
      ],
    },
    {
      code: "INSURANCE_FAMILY",
      name: "家庭旅行险",
      description: "适合全家出行,提供全面的家庭旅行保障",
      price: 200,
      features: [
        "全家成员保障",
        "意外伤害保障",
        "医疗费用报销",
        "行李丢失赔偿",
        "航班延误补偿",
      ],
    },
  ],
  pickup: [
    {
      code: "PICKUP_ECONOMY",
      name: "经济型接送机",
      description: "舒适的经济型车辆接送机服务",
      price: 80,
      features: ["舒适车辆", "专业司机", "准时接送"],
    },
    {
      code: "PICKUP_BUSINESS",
      name: "商务型接送机",
      description: "高端商务车辆接送机服务,提供更舒适的乘坐体验",
      price: 150,
      features: ["豪华商务车", "专业司机", "免费等待30分钟", "免费矿泉水"],
    },
    {
      code: "PICKUP_LUXURY",
      name: "豪华型接送机",
      description: "豪华车辆接送机服务,享受尊贵出行体验",
      price: 300,
      features: [
        "豪华轿车",
        "金牌司机",
        "免费等待60分钟",
        "车载WiFi",
        "免费饮品",
      ],
    },
  ],
  meal: [
    {
      code: "MEAL_STANDARD",
      name: "标准餐食",
      description: "提供标准的机上餐食,包括主食、小吃和饮料",
      price: 30,
      features: ["主食", "小吃", "饮料"],
    },
    {
      code: "MEAL_VEGETARIAN",
      name: "素食餐",
      description: "提供健康的素食餐食选择",
      price: 35,
      features: ["素食主食", "新鲜蔬菜", "饮料"],
    },
    {
      code: "MEAL_HALAL",
      name: "清真餐",
      description: "符合清真标准的餐食",
      price: 35,
      features: ["清真认证", "主食", "饮料"],
    },
    {
      code: "MEAL_PREMIUM",
      name: "高级餐食",
      description: "提供精选的高级餐食,包括多道菜品和优质饮料",
      price: 80,
      features: ["多道菜品", "优质食材", "精选饮料", "甜点"],
    },
  ],
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
      const service = [
        ...MOCK_ANCILLARY_SERVICES.insurance,
        ...MOCK_ANCILLARY_SERVICES.pickup,
        ...MOCK_ANCILLARY_SERVICES.meal,
      ].find(s => s.code === code);
      if (service) {
        total += service.price;
      }
    });
    return total;
  };

  const handleNext = () => {
    router.push("/flights/booking/payment");
  };

  const renderServiceCard = (service: {
    code: string;
    name: string;
    description: string;
    price: number;
    features: string[];
  }) => {
    const isSelected = selectedServices.includes(service.code);

    return (
      <Card
        key={service.code}
        className={cn(
          "cursor-pointer transition-all hover:shadow-md",
          isSelected && "border-primary border-2"
        )}
        onClick={() => handleToggleService(service.code)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Checkbox checked={isSelected} className="mt-1" />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-base">{service.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-bold text-orange-500">
                    ¥{service.price}
                  </div>
                </div>
              </div>
              <ul className="space-y-1 mt-3">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-600 flex items-center gap-2"
                  >
                    <Check className="h-3 w-3 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Insurance Services */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold">旅行保险</h3>
          </div>
          <div className="space-y-3">
            {MOCK_ANCILLARY_SERVICES.insurance.map(service =>
              renderServiceCard(service)
            )}
          </div>
        </div>

        {/* Airport Pickup Services */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold">接送机服务</h3>
          </div>
          <div className="space-y-3">
            {MOCK_ANCILLARY_SERVICES.pickup.map(service =>
              renderServiceCard(service)
            )}
          </div>
        </div>

        {/* Meal Services */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold">机上餐食</h3>
          </div>
          <div className="space-y-3">
            {MOCK_ANCILLARY_SERVICES.meal.map(service =>
              renderServiceCard(service)
            )}
          </div>
        </div>

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
                    const service = [
                      ...MOCK_ANCILLARY_SERVICES.insurance,
                      ...MOCK_ANCILLARY_SERVICES.pickup,
                      ...MOCK_ANCILLARY_SERVICES.meal,
                    ].find(s => s.code === code);
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
