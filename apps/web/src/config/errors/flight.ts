import type { ErrorConfigMap } from "./types";

export const flightErrorConfigs: ErrorConfigMap = {
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
};
