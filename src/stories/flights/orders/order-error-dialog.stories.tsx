import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { OrderErrorDialog } from "@/components/flights/orders/order-error-dialog";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof OrderErrorDialog> = {
  title: "Flights/Orders/OrderErrorDialog",
  component: OrderErrorDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderErrorDialog>;

/**
 * 订单错误提示对话框（默认错误消息）
 *
 * 点击按钮查看错误提示对话框。对话框包含：
 * - 错误标题和默认错误消息
 * - 单个确认按钮
 * - 点击确认后关闭
 */
export const Default: Story = {
  render: args => {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
      setOpen(false);
      console.log("Error dialog confirmed and closed");
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)} variant="destructive">
          显示错误提示
        </Button>
        <p className="text-sm text-muted-foreground">
          点击按钮打开订单错误提示对话框（默认消息）
        </p>
        <OrderErrorDialog
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

/**
 * 订单错误提示对话框（自定义错误消息）
 *
 * 显示带有自定义错误消息的对话框
 */
export const CustomErrorMessage: Story = {
  render: args => {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
      setOpen(false);
      console.log("Custom error dialog confirmed and closed");
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)} variant="destructive">
          显示自定义错误
        </Button>
        <p className="text-sm text-muted-foreground">
          点击按钮打开带有自定义错误消息的对话框
        </p>
        <OrderErrorDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          onConfirm={handleConfirm}
          errorMessage="网络连接超时，请检查您的网络连接后重试。"
        />
      </div>
    );
  },
  args: {},
};
