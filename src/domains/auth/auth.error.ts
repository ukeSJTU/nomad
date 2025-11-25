import type { ErrorConfigMap } from "@/domains/_errors/types";

export const authErrorConfigs: ErrorConfigMap = {
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
};
