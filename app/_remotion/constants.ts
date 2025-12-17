// ============================================
// 业务展示动画配置
// ============================================

// 视频基础配置
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

// 场景时长配置(单位: 帧数)
export const SCENE_DURATIONS = {
  OPENING: 90, // 3 秒 - 开场 Logo 动画
  AUTH: 300, // 10 秒 - 认证场景(含摄像机动画)
  FLIGHT_SEARCH: 360, // 12 秒 - 航班搜索场景
  BOOKING: 450, // 15 秒 - 预订流程场景
  DASHBOARD: 300, // 10 秒 - 个人中心场景
  CLOSING: 90, // 3 秒 - 结尾场景
} as const;
