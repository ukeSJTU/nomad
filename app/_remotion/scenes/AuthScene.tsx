import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { LoginFormVisual } from "../components/visual/LoginFormVisual";

/**
 * 认证场景 - 展示登录流程
 * 总时长: 约 8 秒 (240 frames @ 30fps)
 *
 * 时间轴:
 * 0-30: 背景淡入
 * 20-50: Logo/标题出现
 * 40-80: 表单容器滑入
 * 60-90: 账号输入框填充
 * 100-130: 密码输入框填充
 * 140-160: 勾选协议
 * 170-200: 登录按钮高亮
 * 200-240: 场景保持
 */

export const AuthScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 背景淡入动画
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo/标题动画
  const titleSpring = spring({
    fps,
    frame: frame - 20,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [-30, 0]);

  // 表单容器滑入动画
  const formSpring = spring({
    fps,
    frame: frame - 40,
    config: {
      damping: 100,
      stiffness: 180,
    },
  });
  const formOpacity = interpolate(formSpring, [0, 1], [0, 1]);
  const formY = interpolate(formSpring, [0, 1], [50, 0]);
  const formScale = interpolate(formSpring, [0, 1], [0.95, 1]);

  // 账号输入框填充动画
  const accountProgress = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const accountText = "user@example.com";
  const accountValue = accountText.substring(
    0,
    Math.floor(accountText.length * accountProgress)
  );

  // 密码输入框填充动画
  const passwordProgress = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const passwordLength = 8;
  const passwordValue = "•".repeat(
    Math.floor(passwordLength * passwordProgress)
  );

  // 协议勾选动画
  const termsChecked = frame >= 140;

  // 登录按钮高亮动画
  const buttonHighlight = frame >= 170 && frame < 200;

  return (
    <AbsoluteFill
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      style={{ opacity: bgOpacity }}
    >
      <div className="flex items-center justify-center w-full h-full px-4">
        <div className="w-full max-w-lg">
          {/* Logo/标题区域 */}
          <div
            className="text-center mb-8"
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              欢迎来到 Nomad
            </h2>
            <p className="text-xl text-gray-600">您的航空旅行专家</p>
          </div>

          {/* 登录表单 */}
          <div
            className="bg-white rounded-2xl shadow-2xl p-8"
            style={{
              opacity: formOpacity,
              transform: `translateY(${formY}px) scale(${formScale})`,
              boxShadow: buttonHighlight
                ? "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <LoginFormVisual
              type="password"
              accountValue={accountValue}
              passwordValue={passwordValue}
              termsChecked={termsChecked}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
