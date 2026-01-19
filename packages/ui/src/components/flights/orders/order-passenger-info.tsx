import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../primitives/card";

export type PassengerInfo = {
  name: string;
  idType: "passport" | "id_card" | "other";
  idNumber: string;
};

export type OrderPassengerInfoProps = {
  passengers: PassengerInfo[];
  getIdentityTypeName?: (idType: "passport" | "id_card" | "other") => string;
};

const defaultGetIdentityTypeName = (
  identityType: "passport" | "id_card" | "other"
): string => {
  const typeNames = {
    passport: "护照",
    id_card: "身份证",
    other: "其他",
  };
  return typeNames[identityType];
};

/**
 * Order Passenger Information Card Component
 *
 * Displays information for all passengers in the order
 *
 * 携程对于待付款类型订单会在"出行人信息"后面显示"修改姓名"和"修改证件"两个按钮，我们不做实现
 * 这里的所有证件号码都不打码
 */
export function OrderPassengerInfo({
  passengers,
  getIdentityTypeName = defaultGetIdentityTypeName,
}: OrderPassengerInfoProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>出行人信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {passengers.map((passenger, idx) => (
            <div key={idx} className="space-y-2">
              <div className="font-medium text-base">{passenger.name}</div>
              <div className="text-sm text-gray-600">
                {getIdentityTypeName(passenger.idType)}: {passenger.idNumber}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
