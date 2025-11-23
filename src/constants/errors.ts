export interface ErrorConfig {
  title: string;
  message: string;
  actionLabel: string;
  actionHref: string;
  type?: "warning" | "error" | "info";
  showBackButton?: boolean;
}

export const ERROR_CONFIGS: Record<string, ErrorConfig> = {
  // ========== 航班搜索相关错误 ==========
  missing_flight: {
    type: "warning",
    title: "未选择航班",
    message: "请先选择航班后再进入预订流程。",
    actionLabel: "搜索航班",
    actionHref: "/flights",
    showBackButton: true,
  },
  flight_not_found: {
    type: "error",
    title: "航班不存在",
    message: "您选择的航班已不存在，可能已售罄或被取消。",
    actionLabel: "重新搜索",
    actionHref: "/flights",
  },
  no_search_results: {
    type: "info",
    title: "未找到航班",
    message: "抱歉，没有找到符合条件的航班。请尝试调整搜索条件。",
    actionLabel: "修改搜索",
    actionHref: "/flights",
    showBackButton: true,
  },
  invalid_search_params: {
    type: "warning",
    title: "搜索参数无效",
    message: "搜索参数不完整或无效，请重新填写搜索条件。",
    actionLabel: "返回搜索",
    actionHref: "/flights",
  },
  search_failed: {
    type: "error",
    title: "搜索失败",
    message: "航班搜索服务暂时不可用，请稍后重试。",
    actionLabel: "返回首页",
    actionHref: "/",
    showBackButton: true,
  },

  // ========== 预订流程相关错误 ==========
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

  // ========== 订单相关错误 ==========
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

  // ========== 支付相关错误 ==========
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

  // ========== 身份验证相关错误 ==========
  unauthorized: {
    type: "warning",
    title: "需要登录",
    message: "请登录后访问此页面。",
    actionLabel: "立即登录",
    actionHref: "/auth/sign-in",
  },
  session_expired: {
    type: "warning",
    title: "会话已过期",
    message: "您的登录会话已过期，请重新登录。",
    actionLabel: "重新登录",
    actionHref: "/auth/sign-in",
  },
  forbidden: {
    type: "error",
    title: "访问被拒绝",
    message: "您没有权限访问此资源。",
    actionLabel: "返回首页",
    actionHref: "/",
  },
  invalid_credentials: {
    type: "error",
    title: "登录失败",
    message: "用户名或密码错误，请重试。",
    actionLabel: "重新登录",
    actionHref: "/auth/sign-in",
  },

  // ========== 通用错误 ==========
  not_found: {
    type: "info",
    title: "页面不存在",
    message: "您访问的页面不存在或已被移除。",
    actionLabel: "返回首页",
    actionHref: "/",
    showBackButton: true,
  },
  server_error: {
    type: "error",
    title: "服务器错误",
    message: "服务器遇到错误，请稍后重试。",
    actionLabel: "返回首页",
    actionHref: "/",
    showBackButton: true,
  },
  network_error: {
    type: "error",
    title: "网络错误",
    message: "网络连接失败，请检查您的网络连接后重试。",
    actionLabel: "重试",
    actionHref: "/",
    showBackButton: true,
  },
  maintenance: {
    type: "info",
    title: "系统维护中",
    message: "系统正在维护，预计将在短时间内恢复。给您带来不便，敬请谅解。",
    actionLabel: "返回首页",
    actionHref: "/",
  },
  rate_limit_exceeded: {
    type: "warning",
    title: "操作过于频繁",
    message: "您的操作过于频繁，请稍后再试。",
    actionLabel: "返回",
    actionHref: "/",
    showBackButton: true,
  },

  // ========== 数据验证错误 ==========
  invalid_data: {
    type: "warning",
    title: "数据格式错误",
    message: "提交的数据格式不正确，请检查后重试。",
    actionLabel: "返回",
    actionHref: "/",
    showBackButton: true,
  },
  duplicate_booking: {
    type: "warning",
    title: "重复预订",
    message: "您已经预订过此航班，请勿重复提交。",
    actionLabel: "查看订单",
    actionHref: "/orders",
  },
};

export const DEFAULT_ERROR_CONFIG: ErrorConfig = {
  type: "error",
  title: "出错了",
  message: "发生了意外错误，请稍后重试。",
  actionLabel: "返回首页",
  actionHref: "/",
  showBackButton: true,
};
