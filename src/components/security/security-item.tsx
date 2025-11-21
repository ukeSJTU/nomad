import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type SecurityItemProps = {
  title: string;
  description: string;
  isSet: boolean;
  value?: string;
  actionHref: string;
  actionLabel: string;
};

export default function SecurityItem({
  title,
  description,
  isSet,
  value,
  actionHref,
  actionLabel,
}: SecurityItemProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="mt-1">
            {isSet ? (
              <CheckCircle className="size-5 text-green-600" />
            ) : (
              <AlertCircle className="size-5 text-yellow-600" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p
                className={
                  isSet
                    ? "text-green-600 font-medium"
                    : "text-yellow-600 font-medium"
                }
              >
                {isSet ? `已绑定${value || ""}` : "未绑定"}
              </p>
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
