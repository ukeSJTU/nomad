import type { ErrorConfig, ErrorConfigMap } from "./types";

export const commonErrorConfigs: ErrorConfigMap = {
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
  invalid_data: {
    type: "warning",
    title: "数据格式错误",
    message: "提交的数据格式不正确，请检查后重试。",
    actionLabel: "返回",
    actionHref: "/",
    showBackButton: true,
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
