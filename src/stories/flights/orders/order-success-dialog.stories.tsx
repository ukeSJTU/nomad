import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { OrderSuccessDialog } from "@/components/flights/orders/order-success-dialog";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof OrderSuccessDialog> = {
  title: "Flights/Orders/OrderSuccessDialog",
  component: OrderSuccessDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderSuccessDialog>;

/**
 * 订单成功提示对话框
 *
 * 点击按钮查看成功提示对话框。对话框包含：
 * - 标题和成功消息
 * - 单个确认按钮
 * - 点击确认后关闭
 */
export const Default: Story = {
  render: args => {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
      setOpen(false);
      console.log("Dialog confirmed and closed");
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)}>显示成功提示</Button>
        <p className="text-sm text-muted-foreground">
          点击按钮打开订单成功提示对话框
        </p>
        <OrderSuccessDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          onConfirm={handleConfirm}
        />
      </div>
    );
  },
  args: {},
};
