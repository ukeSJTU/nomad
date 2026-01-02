"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@nomad/ui/components/card";
import { Label } from "@nomad/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@nomad/ui/components/radio-group";
import { CreditCard, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  userBalance: string;
  onPaymentMethodChange: (method: string) => void;
}

export function PaymentMethodSelector({
  paymentMethod,
  userBalance,
  onPaymentMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">支付方式</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="balance" id="balance" />
            <Label
              htmlFor="balance"
              className="flex-1 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">平台余额</div>
                  <div className="text-sm text-gray-500">
                    可用余额: {formatCurrency(userBalance)}
                  </div>
                </div>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 opacity-50">
            <RadioGroupItem value="wechat" id="wechat" disabled />
            <Label
              htmlFor="wechat"
              className="flex-1 cursor-not-allowed flex items-center gap-3"
            >
              <CreditCard className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">微信支付</div>
                <div className="text-sm text-gray-500">暂不可用</div>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 opacity-50">
            <RadioGroupItem value="alipay" id="alipay" disabled />
            <Label
              htmlFor="alipay"
              className="flex-1 cursor-not-allowed flex items-center gap-3"
            >
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">支付宝</div>
                <div className="text-sm text-gray-500">暂不可用</div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
