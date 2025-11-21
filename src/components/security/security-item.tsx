import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Security status enum
 * - verified: Set and verified/bound
 * - unverified: Set but not verified/bound
 * - notSet: Not set at all
 */
export type SecurityStatus = "verified" | "unverified" | "notSet";

type SecurityItemProps = {
  title: string;
  description: string;
  status: SecurityStatus;
  value?: string;
  actionHref: string;
  actionLabel: string;
};

/**
 * Get status display configuration
 */
function getStatusConfig(status: SecurityStatus, value?: string) {
  switch (status) {
    case "verified":
      return {
        icon: <CheckCircle className="size-5 text-green-600" />,
        text: `已绑定${value ? ` ${value}` : ""}`,
        textClassName: "text-green-600 font-medium",
      };
    case "unverified":
      return {
        icon: <AlertCircle className="size-5 text-orange-600" />,
        text: `已设置但未验证${value ? ` ${value}` : ""}`,
        textClassName: "text-orange-600 font-medium",
      };
    case "notSet":
      return {
        icon: <XCircle className="size-5 text-gray-400" />,
        text: "未设置",
        textClassName: "text-gray-500 font-medium",
      };
  }
}

export default function SecurityItem({
  title,
  description,
  status,
  value,
  actionHref,
  actionLabel,
}: SecurityItemProps) {
  const config = getStatusConfig(status, value);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="mt-1">{config.icon}</div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className={config.textClassName}>{config.text}</p>
              <p className="mt-2">{description}</p>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Button variant="outline" size="sm" asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
