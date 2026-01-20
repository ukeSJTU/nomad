import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ukesjtu/nomad-ui/components/primitives/card";
import { Skeleton } from "@ukesjtu/nomad-ui/components/primitives/skeleton";
import { Wallet } from "lucide-react";

export default function WalletLoading() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-6">
        <Skeleton className="h-9 w-32 mb-2" />
        <Skeleton className="h-5 w-48" />
      </div>

      {/* Balance Display Card Skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            当前余额
          </CardTitle>
          <CardDescription>您的账户可用余额</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-40" />
        </CardContent>
      </Card>

      {/* Recharge Card Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>充值</CardTitle>
          <CardDescription>一次充值金额范围：¥1 - ¥10,000</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-11 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
