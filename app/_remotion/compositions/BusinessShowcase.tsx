import React from "react";
import { AbsoluteFill, Sequence } from "remotion";

import { SCENE_DURATIONS } from "../constants";
import { AuthScene } from "../scenes/AuthScene";
import { IntroScene } from "../scenes/IntroScene";

/**
 * 主业务展示动画 - 完整版
 * 总时长: 128秒 (3840 frames @ 30fps)
 *
 * 场景顺序:
 * 1. Intro (0-90): 品牌开场
 * 2. Auth (90-840): 用户认证 (注册+登录)
 * 3. Search (840-1740): 航班搜索
 * 4. Order (1740-2940): 订票流程
 * 5. Home (2940-3840): 个人中心
 */

// 占位符场景组件 - 用于尚未实现的场景
const PlaceholderScene: React.FC<{ title: string; duration: string }> = ({
  title,
  duration,
}) => {
  return (
    <AbsoluteFill className="bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl">🚧</div>
        <h2 className="text-4xl font-bold text-foreground">{title}</h2>
        <p className="text-xl text-muted-foreground">即将实现 ({duration})</p>
      </div>
    </AbsoluteFill>
  );
};

export const BusinessShowcase: React.FC = () => {
  // 计算每个场景的起始帧
  let currentFrame = 0;

  const introStart = currentFrame;
  currentFrame += SCENE_DURATIONS.INTRO;

  const authStart = currentFrame;
  currentFrame += SCENE_DURATIONS.AUTH;

  const searchStart = currentFrame;
  currentFrame += SCENE_DURATIONS.SEARCH;

  const orderStart = currentFrame;
  currentFrame += SCENE_DURATIONS.ORDER;

  const homeStart = currentFrame;
  // currentFrame += SCENE_DURATIONS.HOME; // 最后一个场景

  return (
    <AbsoluteFill>
      {/* Scene 1: Intro - 品牌开场 (0-90帧) */}
      <Sequence from={introStart} durationInFrames={SCENE_DURATIONS.INTRO}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Auth - 用户认证 (90-840帧) */}
      <Sequence from={authStart} durationInFrames={SCENE_DURATIONS.AUTH}>
        {/* 暂时使用现有的AuthScene作为占位 */}
        <AuthScene />
      </Sequence>

      {/* Scene 3: Search - 航班搜索 (840-1740帧) */}
      <Sequence from={searchStart} durationInFrames={SCENE_DURATIONS.SEARCH}>
        <PlaceholderScene title="航班搜索场景" duration="30秒" />
      </Sequence>

      {/* Scene 4: Order - 订票流程 (1740-2940帧) */}
      <Sequence from={orderStart} durationInFrames={SCENE_DURATIONS.ORDER}>
        <PlaceholderScene title="订票流程场景" duration="40秒" />
      </Sequence>

      {/* Scene 5: Home - 个人中心 (2940-3840帧) */}
      <Sequence from={homeStart} durationInFrames={SCENE_DURATIONS.HOME}>
        <PlaceholderScene title="个人中心场景" duration="30秒" />
      </Sequence>
    </AbsoluteFill>
  );
};
