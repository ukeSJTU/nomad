import { z } from "zod";

// ============================================
// 示例组件配置 (MyComp)
// ============================================
export const COMP_NAME = "MyComp";

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Next.js and Remotion",
};

// ============================================
// 业务展示动画配置
// ============================================

// 视频基础配置
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

// 场景时长配置(单位: 帧数)
export const SCENE_DURATIONS = {
  AUTH: 240, // 8 秒 - 认证场景
  FLIGHT_SEARCH: 360, // 12 秒 - 航班搜索场景
  BOOKING: 450, // 15 秒 - 预订流程场景
  DASHBOARD: 300, // 10 秒 - 个人中心场景
} as const;

// 旧的配置(保持向后兼容)
export const DURATION_IN_FRAMES = 200;
