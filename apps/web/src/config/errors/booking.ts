import type { ErrorConfigMap } from "./types";

export const bookingErrorConfigs: ErrorConfigMap = {
  // 预订流程相关
  missing_seat_class: {
    type: "warning",
    title: "未选择舱位",
    message: "请选择舱位后继续预订。",
    actionLabel: "选择舱位",
    actionHref: "/flights/search",
    showBackButton: true,
  },
  booking_failed: {
    type: "error",
    title: "预订失败",
    message: "无法完成您的预订。请重试或联系客服。",
    actionLabel: "重试",
    actionHref: "/flights",
    showBackButton: true,
  },
  seat_unavailable: {
    type: "warning",
    title: "座位已满",
    message: "您选择的舱位座位已售罄，请选择其他舱位或航班。",
    actionLabel: "重新选择",
    actionHref: "/flights/search",
  },
  passenger_limit_exceeded: {
    type: "warning",
    title: "乘客数量超限",
    message: "单次预订最多支持9名乘客。",
    actionLabel: "返回",
    actionHref: "/flights/booking/passengers",
    showBackButton: true,
  },
  invalid_passenger_info: {
    type: "warning",
    title: "乘客信息不完整",
    message: "请填写完整的乘客信息后继续。",
    actionLabel: "返回填写",
    actionHref: "/flights/booking/passengers",
    showBackButton: true,
  },

  // 订单相关
  order_not_found: {
    type: "error",
    title: "订单不存在",
    message: "未找到该订单，或您没有访问权限。",
    actionLabel: "我的订单",
    actionHref: "/orders",
  },
  order_expired: {
    type: "warning",
    title: "订单已过期",
    message: "该订单支付时限已过，请重新预订。",
    actionLabel: "重新预订",
    actionHref: "/flights",
  },
  order_cancelled: {
    type: "info",
    title: "订单已取消",
    message: "该订单已被取消。",
    actionLabel: "返回首页",
    actionHref: "/",
  },
  invalid_order_status: {
    type: "warning",
    title: "订单状态异常",
    message: "当前订单状态不允许此操作。",
    actionLabel: "查看订单",
    actionHref: "/orders",
  },

  // 支付相关
  missing_order_id: {
    type: "warning",
    title: "订单信息缺失",
    message: "未找到订单信息，请返回上一步。",
    actionLabel: "返回",
    actionHref: "/flights/booking/passengers",
    showBackButton: true,
  },
  payment_failed: {
    type: "error",
    title: "支付失败",
    message: "支付处理失败，请检查支付信息后重试。",
    actionLabel: "返回支付",
    actionHref: "/flights/booking/payment",
    showBackButton: true,
  },
  payment_timeout: {
    type: "warning",
    title: "支付超时",
    message: "支付时间已超时，订单已自动取消。",
    actionLabel: "重新预订",
    actionHref: "/flights",
  },
  insufficient_balance: {
    type: "warning",
    title: "余额不足",
    message: "您的账户余额不足，请选择其他支付方式或充值后重试。",
    actionLabel: "返回支付",
    actionHref: "/flights/booking/payment",
    showBackButton: true,
  },
  payment_deadline_passed: {
    type: "warning",
    title: "支付截止时间已过",
    message: "该订单的支付截止时间已过，订单已自动取消。",
    actionLabel: "重新预订",
    actionHref: "/flights",
  },

  // 数据验证
  duplicate_booking: {
    type: "warning",
    title: "重复预订",
    message: "您已经预订过此航班，请勿重复提交。",
    actionLabel: "查看订单",
    actionHref: "/orders",
  },
};
