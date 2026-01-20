import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorDisplay } from "@ukesjtu/nomad-ui/components/common";

const meta = {
  title: "Common/ErrorDisplay",
  component: ErrorDisplay,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========== Basic Examples ==========

export const DefaultError: Story = {
  args: {
    type: "error",
    title: "出错了",
    message: "发生了意外错误，请稍后重试。",
    actionLabel: "返回首页",
    actionHref: "/",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "需要注意",
    message: "此操作需要您的确认。",
    actionLabel: "继续",
    actionHref: "/",
  },
};

export const Info: Story = {
  args: {
    type: "info",
    title: "温馨提示",
    message: "这是一条重要信息。",
    actionLabel: "了解更多",
    actionHref: "/",
  },
};

export const WithBackButton: Story = {
  args: {
    type: "error",
    title: "操作失败",
    message: "无法完成该操作，请返回上一页重试。",
    actionLabel: "返回首页",
    actionHref: "/",
    showBackButton: true,
    onBackClick: () => {},
  },
};

// ========== Flight Search Errors ==========

export const MissingFlight: Story = {
  args: {
    type: "warning",
    title: "未选择航班",
    message: "请先选择航班后再继续。",
    actionLabel: "返回搜索",
    actionHref: "/flights/search",
  },
  parameters: {
    docs: {
      description: {
        story: "用户未选择航班就尝试进入预订流程时显示。",
      },
    },
  },
};

export const FlightNotFound: Story = {
  args: {
    type: "error",
    title: "航班不存在",
    message: "您选择的航班已不存在或被取消。",
    actionLabel: "返回搜索",
    actionHref: "/flights/search",
  },
  parameters: {
    docs: {
      description: {
        story: "选择的航班已不存在或被取消时显示。",
      },
    },
  },
};

export const NoSearchResults: Story = {
  args: {
    type: "info",
    title: "未找到航班",
    message: "没有找到符合条件的航班,请尝试修改搜索条件。",
    actionLabel: "重新搜索",
    actionHref: "/flights/search",
  },
  parameters: {
    docs: {
      description: {
        story: "搜索未找到任何符合条件的航班时显示。",
      },
    },
  },
};

export const InvalidSearchParams: Story = {
  args: {
    type: "warning",
    title: "搜索参数错误",
    message: "搜索参数不完整或格式错误，请重新搜索。",
    actionLabel: "返回搜索",
    actionHref: "/flights/search",
  },
  parameters: {
    docs: {
      description: {
        story: "搜索参数不完整或格式错误时显示。",
      },
    },
  },
};

// ========== Booking Errors ==========

export const BookingFailed: Story = {
  args: {
    type: "error",
    title: "预订失败",
    message: "预订过程中发生错误，请稍后重试。",
    actionLabel: "返回搜索",
    actionHref: "/flights/search",
    showBackButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: "预订过程中发生错误时显示。",
      },
    },
  },
};

export const SeatUnavailable: Story = {
  args: {
    type: "warning",
    title: "座位不可用",
    message: "您选择的舱位座位已满，请选择其他舱位。",
    actionLabel: "返回搜索",
    actionHref: "/flights/search",
  },
  parameters: {
    docs: {
      description: {
        story: "选择的舱位座位已满时显示。",
      },
    },
  },
};

export const PassengerLimitExceeded: Story = {
  args: {
    type: "warning",
    title: "超出乘客限制",
    message: "单次预订最多支持9位乘客。",
    actionLabel: "返回搜索",
    actionHref: "/flights/search",
  },
  parameters: {
    docs: {
      description: {
        story: "乘客数量超过单次预订限制时显示。",
      },
    },
  },
};

// ========== Payment Errors ==========

export const PaymentFailed: Story = {
  args: {
    type: "error",
    title: "支付失败",
    message: "支付处理失败，请检查支付信息后重试。",
    actionLabel: "重新支付",
    actionHref: "/orders/pending",
    showBackButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: "支付处理失败时显示。",
      },
    },
  },
};

export const InsufficientBalance: Story = {
  args: {
    type: "warning",
    title: "余额不足",
    message: "账户余额不足以完成支付，请充值或选择其他支付方式。",
    actionLabel: "去充值",
    actionHref: "/account/balance",
  },
  parameters: {
    docs: {
      description: {
        story: "账户余额不足以完成支付时显示。",
      },
    },
  },
};

export const PaymentTimeout: Story = {
  args: {
    type: "error",
    title: "支付超时",
    message: "支付超时，订单已取消。",
    actionLabel: "返回首页",
    actionHref: "/",
  },
  parameters: {
    docs: {
      description: {
        story: "支付超时，订单已取消时显示。",
      },
    },
  },
};

// ========== Order Errors ==========

export const OrderNotFound: Story = {
  args: {
    type: "error",
    title: "订单不存在",
    message: "订单不存在或您无权访问此订单。",
    actionLabel: "返回首页",
    actionHref: "/",
  },
  parameters: {
    docs: {
      description: {
        story: "订单不存在或用户无权访问时显示。",
      },
    },
  },
};

export const OrderExpired: Story = {
  args: {
    type: "warning",
    title: "订单已过期",
    message: "订单支付时限已过，订单已自动取消。",
    actionLabel: "重新搜索",
    actionHref: "/flights/search",
  },
  parameters: {
    docs: {
      description: {
        story: "订单支付时限已过时显示。",
      },
    },
  },
};

// ========== Edge Cases ==========

export const LongTitle: Story = {
  args: {
    type: "error",
    title:
      "这是一个非常非常非常非常非常长的标题文本用于测试组件的文本溢出处理能力",
    message: "测试长标题的显示效果。",
    actionLabel: "返回",
    actionHref: "/",
  },
};

export const LongMessage: Story = {
  args: {
    type: "info",
    title: "长消息测试",
    message:
      "这是一个非常非常非常非常非常长的消息文本，用于测试组件在处理大量文本内容时的显示效果和布局是否合理。我们需要确保在各种情况下，组件都能正确地显示所有信息，并且不会出现布局错乱的情况。同时也要测试文本的自动换行功能是否正常工作。",
    actionLabel: "了解更多",
    actionHref: "/",
  },
};

export const CustomCallback: Story = {
  args: {
    type: "info",
    title: "自定义回调",
    message: "测试自定义返回按钮回调功能。",
    actionLabel: "继续",
    actionHref: "/",
    showBackButton: true,
    onBackClick: () => {
      // eslint-disable-next-line no-alert
      alert("自定义返回按钮被点击！");
    },
  },
};
