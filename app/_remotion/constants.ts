// ============================================
// 业务展示动画配置
// ============================================

// 视频基础配置
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

// 场景时长配置(单位: 帧数)
export const SCENE_DURATIONS = {
  // 主场景
  INTRO: 90, // 3 秒 - 开场 Logo 动画
  AUTH: 750, // 25 秒 - 认证场景(注册+过渡+登录)
  SEARCH: 900, // 30 秒 - 航班搜索场景
  ORDER: 1200, // 40 秒 - 订票流程场景
  HOME: 900, // 30 秒 - 个人中心场景

  // Auth 子场景
  AUTH_SIGNUP: 450, // 15 秒 - 注册流程
  AUTH_TRANSITION: 60, // 2 秒 - 注册到登录的过渡
  AUTH_SIGNIN: 240, // 8 秒 - 登录流程
} as const;

// 总时长: 3840 帧 (128 秒 / 2分8秒)
