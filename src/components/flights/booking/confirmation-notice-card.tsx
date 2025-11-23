import { Card, CardContent } from "@/components/ui/card";

export function ConfirmationNoticeCard() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="pt-6">
        <h3 className="font-semibold text-blue-900 mb-2">温馨提示</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• 请至少提前2小时到达机场办理值机手续</li>
          <li>• 请携带有效身份证件原件</li>
          <li>• 如需改签或退票，请在航班起飞前联系客服</li>
          <li>• 订单详情已发送至您的邮箱，请注意查收</li>
        </ul>
      </CardContent>
    </Card>
  );
}
