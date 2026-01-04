"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nomad/ui/components/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nomad/ui/components/primitives/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nomad/ui/components/primitives/form";
import { Input } from "@nomad/ui/components/primitives/input";
import { Wallet } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { rechargeBalanceAction } from "@/app/_actions/user";
import { formatCurrency } from "@/lib/format";
import {
  type RechargeBalanceData,
  rechargeBalanceSchema,
} from "@/types/validations";

interface WalletPageClientProps {
  initialBalance: string;
}

export function WalletPageClient({ initialBalance }: WalletPageClientProps) {
  const [balance, setBalance] = useState(initialBalance);
  const [isPending, startTransition] = useTransition();

  const form = useForm<RechargeBalanceData>({
    resolver: zodResolver(rechargeBalanceSchema),
    defaultValues: {
      amount: undefined,
    },
    mode: "onChange", // Enable real-time validation
  });

  const handleSubmit = async (data: RechargeBalanceData) => {
    startTransition(async () => {
      try {
        const result = await rechargeBalanceAction(data);

        if (result.success && result.data) {
          setBalance(result.data.newBalance);
          form.reset();
          toast.success(`已成功充值 ${formatCurrency(data.amount)}`);
        } else {
          toast.error(result.error || "充值失败，请稍后重试");
        }
      } catch (_error) {
        toast.error("网络错误，请稍后重试");
      }
    });
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">我的钱包</h1>
        <p className="text-muted-foreground mt-2">管理您的账户余额</p>
      </div>

      {/* Balance Display Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            当前余额
          </CardTitle>
          <CardDescription>您的账户可用余额</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">
            {formatCurrency(balance)}
          </div>
        </CardContent>
      </Card>

      {/* Recharge Card */}
      <Card>
        <CardHeader>
          <CardTitle>充值</CardTitle>
          <CardDescription>一次充值金额范围：¥1 - ¥10,000</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>充值金额（元）</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="请输入充值金额"
                        min={1}
                        max={10000}
                        step={0.01}
                        disabled={isPending}
                        {...field}
                        onChange={e => {
                          const value = e.target.value;
                          const numValue =
                            value === "" ? undefined : parseFloat(value);
                          field.onChange(numValue);
                          // Trigger validation immediately
                          if (numValue !== undefined) {
                            form.trigger("amount");
                          }
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full"
                size="lg"
              >
                {isPending ? "充值中..." : "立即充值"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
