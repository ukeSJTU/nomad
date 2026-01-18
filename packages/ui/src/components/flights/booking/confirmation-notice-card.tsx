import { Card, CardContent, CardHeader } from "../../primitives/card";

export interface ConfirmationNoticeCardProps {
  title?: string;
  notices?: string[];
}

export function ConfirmationNoticeCard({
  title = "温馨提示",
  notices = [
    "请至少提前2小时到达机场办理值机手续",
    "请携带有效身份证件原件",
    "如需改签或退票，请在航班起飞前联系客服",
    "订单详情已发送至您的邮箱，请注意查收",
  ],
}: ConfirmationNoticeCardProps) {
  return (
    <Card className="bg-accent">
      <CardHeader>
        <h2 className="font-semibold text-accent-foreground">{title}</h2>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm text-accent-foreground">
          {notices.map((notice, index) => (
            <li key={index}>• {notice}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
