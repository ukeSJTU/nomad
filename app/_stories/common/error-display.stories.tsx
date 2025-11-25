import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ErrorDisplay } from "@/components/common/error-display";
import { ERROR_CONFIGS } from "@/constants/errors";

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
  },
};

// ========== Flight Search Errors ==========

export const MissingFlight: Story = {
  args: ERROR_CONFIGS.missing_flight,
  parameters: {
    docs: {
      description: {
        story: "用户未选择航班就尝试进入预订流程时显示。",
      },
    },
  },
};

export const FlightNotFound: Story = {
  args: ERROR_CONFIGS.flight_not_found,
  parameters: {
    docs: {
      description: {
        story: "选择的航班已不存在或被取消时显示。",
      },
    },
  },
};

export const NoSearchResults: Story = {
  args: ERROR_CONFIGS.no_search_results,
  parameters: {
    docs: {
      description: {
        story: "搜索未找到任何符合条件的航班时显示。",
      },
    },
  },
};

export const InvalidSearchParams: Story = {
  args: ERROR_CONFIGS.invalid_search_params,
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
  args: ERROR_CONFIGS.booking_failed,
  parameters: {
    docs: {
      description: {
        story: "预订过程中发生错误时显示。",
      },
    },
  },
};

export const SeatUnavailable: Story = {
  args: ERROR_CONFIGS.seat_unavailable,
  parameters: {
    docs: {
      description: {
        story: "选择的舱位座位已满时显示。",
      },
    },
  },
};

export const PassengerLimitExceeded: Story = {
  args: ERROR_CONFIGS.passenger_limit_exceeded,
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
  args: ERROR_CONFIGS.payment_failed,
  parameters: {
    docs: {
      description: {
        story: "支付处理失败时显示。",
      },
    },
  },
};

export const InsufficientBalance: Story = {
  args: ERROR_CONFIGS.insufficient_balance,
  parameters: {
    docs: {
      description: {
        story: "账户余额不足以完成支付时显示。",
      },
    },
  },
};

export const PaymentTimeout: Story = {
  args: ERROR_CONFIGS.payment_timeout,
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
  args: ERROR_CONFIGS.order_not_found,
  parameters: {
    docs: {
      description: {
        story: "订单不存在或用户无权访问时显示。",
      },
    },
  },
};

export const OrderExpired: Story = {
  args: ERROR_CONFIGS.order_expired,
  parameters: {
    docs: {
      description: {
        story: "订单支付时限已过时显示。",
      },
    },
  },
};

export const OrderCancelled: Story = {
  args: ERROR_CONFIGS.order_cancelled,
  parameters: {
    docs: {
      description: {
        story: "订单已被取消时显示。",
      },
    },
  },
};

// ========== Authentication Errors ==========

export const Unauthorized: Story = {
  args: ERROR_CONFIGS.unauthorized,
  parameters: {
    docs: {
      description: {
        story: "需要登录才能访问页面时显示。",
      },
    },
  },
};

export const SessionExpired: Story = {
  args: ERROR_CONFIGS.session_expired,
  parameters: {
    docs: {
      description: {
        story: "用户会话已过期时显示。",
      },
    },
  },
};

export const Forbidden: Story = {
  args: ERROR_CONFIGS.forbidden,
  parameters: {
    docs: {
      description: {
        story: "用户无权访问资源时显示。",
      },
    },
  },
};

// ========== General Errors ==========

export const NotFound: Story = {
  args: ERROR_CONFIGS.not_found,
  parameters: {
    docs: {
      description: {
        story: "页面或资源不存在时显示。",
      },
    },
  },
};

export const ServerError: Story = {
  args: ERROR_CONFIGS.server_error,
  parameters: {
    docs: {
      description: {
        story: "服务器内部错误时显示。",
      },
    },
  },
};

export const NetworkError: Story = {
  args: ERROR_CONFIGS.network_error,
  parameters: {
    docs: {
      description: {
        story: "网络连接失败时显示。",
      },
    },
  },
};

export const Maintenance: Story = {
  args: ERROR_CONFIGS.maintenance,
  parameters: {
    docs: {
      description: {
        story: "系统维护期间显示。",
      },
    },
  },
};

// ========== Edge Cases ==========

export const LongTitle: Story = {
  args: {
    type: "error",
    title: "这是一个非常非常非常非常非常非常非常非常非常长的错误标题",
    message: "错误消息",
    actionLabel: "返回",
    actionHref: "/",
  },
};

export const LongMessage: Story = {
  args: {
    type: "error",
    title: "错误",
    message:
      "这是一个非常非常非常非常非常非常非常非常非常长的错误消息。它包含了大量的文本内容，用于测试组件如何处理长文本。在实际应用中，错误消息可能会包含详细的错误信息、建议的解决方案以及相关的帮助链接等内容。",
    actionLabel: "返回",
    actionHref: "/",
    showBackButton: true,
  },
};
