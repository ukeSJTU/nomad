import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@nomad/ui/components/primitives/card";
import { OrderDetailFull } from "@/types/dto";

export type OrderContactInfoProps = {
  contactInfo: OrderDetailFull["contact"];
};

/**
 * Order Contact Information Card Component
 *
 * Displays contact phone and email information
 */
export function OrderContactInfo({ contactInfo }: OrderContactInfoProps) {
  const hasContactInfo = contactInfo.contactPhone || contactInfo.contactEmail;

  return (
    <Card>
      <CardHeader>
        <CardTitle>联系信息</CardTitle>
      </CardHeader>
      <CardContent>
        {hasContactInfo ? (
          <div className="space-y-3">
            {contactInfo.contactPhone && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">手机号：</span>
                <span className="font-medium">{contactInfo.contactPhone}</span>
              </div>
            )}
            {contactInfo.contactEmail && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">邮箱地址：</span>
                <span className="font-medium">{contactInfo.contactEmail}</span>
              </div>
            )}
          </div>
        ) : (
          /**
           * Edge case fallback
           * Note: Order creation requires either phone or email,
           * this should not occur under normal circumstances
           */
          <div className="text-sm text-muted-foreground">暂无联系信息</div>
        )}
      </CardContent>
    </Card>
  );
}
