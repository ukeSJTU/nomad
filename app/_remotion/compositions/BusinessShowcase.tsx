import React from "react";
import { AbsoluteFill, Sequence } from "remotion";

import { SCENE_DURATIONS } from "../constants";
import { AuthSceneComplete } from "../scenes/AuthSceneComplete";
import { HomeScene } from "../scenes/HomeScene";
import { IntroScene } from "../scenes/IntroScene";
import { OrderScene } from "../scenes/OrderScene";
import { SearchScene } from "../scenes/SearchScene";

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
        <AuthSceneComplete />
      </Sequence>

      {/* Scene 3: Search - 航班搜索 (840-1740帧) */}
      <Sequence from={searchStart} durationInFrames={SCENE_DURATIONS.SEARCH}>
        <SearchScene />
      </Sequence>

      {/* Scene 4: Order - 订票流程 (1740-2940帧) */}
      <Sequence from={orderStart} durationInFrames={SCENE_DURATIONS.ORDER}>
        <OrderScene />
      </Sequence>

      {/* Scene 5: Home - 个人中心 (2940-3840帧) */}
      <Sequence from={homeStart} durationInFrames={SCENE_DURATIONS.HOME}>
        <HomeScene />
      </Sequence>
    </AbsoluteFill>
  );
};
