import { CancelOrderDialog } from "@nomad/ui/components/flights/orders";
import { Button } from "@nomad/ui/components/primitives/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

const meta: Meta<typeof CancelOrderDialog> = {
  title: "Flights/Orders/CancelOrderDialog",
  component: CancelOrderDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CancelOrderDialog>;

export const Default: Story = {
  render: args => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      // Mock API calling
      setTimeout(() => {
        setIsLoading(false);
        setOpen(false);
      }, 2000);
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)} variant="destructive">
          取消订单
        </Button>
        <p className="text-sm text-muted-foreground">
          点击按钮打开取消订单确认对话框
        </p>
        <CancelOrderDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          onConfirm={handleConfirm}
          isLoading={isLoading}
        />
      </div>
    );
  },
  args: {},
};
