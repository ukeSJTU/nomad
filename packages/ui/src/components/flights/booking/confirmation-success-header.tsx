import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../../primitives/card";

export interface ConfirmationSuccessHeaderProps {
  orderNumber: string;
}

export function ConfirmationSuccessHeader({
  orderNumber,
}: ConfirmationSuccessHeaderProps) {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-green-900 mb-2">
              预订成功！
            </h1>
            <p className="text-green-700">
              您的订单已确认，我们已向您填写的联系方式发送订单详情
            </p>
          </div>
          <div className="bg-card px-6 py-3 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">订单号</div>
            <div className="text-xl font-mono font-bold text-foreground">
              {orderNumber}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
