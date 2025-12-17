"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";

import {
  SCENE_DURATIONS,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/app/_remotion/constants";
import { AuthScene } from "@/app/_remotion/scenes/AuthScene";

const Home: NextPage = () => {
  return (
    <div>
      <div className="max-w-screen-md m-auto mb-5">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          <Player
            component={AuthScene}
            durationInFrames={SCENE_DURATIONS.AUTH}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
              // but not over inline styles
              width: "100%",
            }}
            controls
            autoPlay
            loop
          />
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            认证场景 - 登录流程展示
          </h2>
          <p className="text-gray-600 mb-2">
            这个动画展示了用户登录的完整流程:
          </p>
          <ul className="text-left text-gray-600 space-y-1 max-w-md mx-auto">
            <li>✨ 背景淡入和品牌展示</li>
            <li>📝 登录表单平滑滑入</li>
            <li>⌨️ 账号和密码逐字填充动画</li>
            <li>✅ 协议勾选交互</li>
            <li>🚀 登录按钮高亮效果</li>
          </ul>
          <p className="text-gray-500 text-sm mt-4">
            时长: 8秒 (240帧 @ 30fps)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
