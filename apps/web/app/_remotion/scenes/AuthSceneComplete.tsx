import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { LoginFormVisual } from "../components/visual/LoginFormVisual";
import { SCENE_DURATIONS } from "../constants";
import { SignUpSubScene } from "./SignUpSubScene";

/**
 * 完整认证场景
 * 总时长: 25秒 (750 frames @ 30fps)
 *
 * 场景顺序:
 * 1. SignUp SubScene (0-450): 注册流程 (15秒)
 * 2. Transition (450-510): 水平过渡动画 (2秒)
 * 3. SignIn SubScene (510-750): 登录流程 (8秒)
 */

/**
 * 登录子场景 (重用之前的AuthScene逻辑)
 */
const SignInSubScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 背景淡入动画
  const bgOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

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

  // ==========================================
  // 摄像机动画
  // ==========================================

  // 1. 聚焦到账号输入框 (80-120帧)
  const focusAccountSpring = spring({
    fps,
    frame: frame - 80,
    config: {
      damping: 80,
      stiffness: 120,
    },
    durationInFrames: 40,
  });

  // 2. 平移到密码输入框 (140-170帧)
  const moveToPwdSpring = spring({
    fps,
    frame: frame - 140,
    config: {
      damping: 60,
      stiffness: 100,
    },
    durationInFrames: 30,
  });

  // 3. 缩小到正常大小 (200-230帧)
  const zoomOutSpring = spring({
    fps,
    frame: frame - 200,
    config: {
      damping: 80,
      stiffness: 120,
    },
    durationInFrames: 30,
  });

  // 计算摄像机的缩放和位置
  let cameraScale = 1;
  let cameraY = 0;

  if (frame >= 80 && frame < 140) {
    // 阶段1: 聚焦账号输入框 - 放大1.3倍,向上移动
    cameraScale = interpolate(focusAccountSpring, [0, 1], [1, 1.3]);
    cameraY = interpolate(focusAccountSpring, [0, 1], [0, -80]);
  } else if (frame >= 140 && frame < 200) {
    // 阶段2: 平移到密码框 - 保持1.3倍,继续向下移动
    cameraScale = 1.3;
    cameraY = interpolate(moveToPwdSpring, [0, 1], [-80, -20]);
  } else if (frame >= 200 && frame < 230) {
    // 阶段3: 缩小到正常 - 回到1倍,居中
    cameraScale = interpolate(zoomOutSpring, [0, 1], [1.3, 1]);
    cameraY = interpolate(zoomOutSpring, [0, 1], [-20, 0]);
  } else if (frame >= 230) {
    // 阶段4: 保持正常视图
    cameraScale = 1;
    cameraY = 0;
  }

  // ==========================================
  // 内容动画
  // ==========================================

  // 账号输入框填充动画 (100-140帧)
  const accountProgress = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const accountText = "user@example.com";
  const accountValue = accountText.substring(
    0,
    Math.floor(accountText.length * accountProgress)
  );

  // 密码输入框填充动画 (160-200帧)
  const passwordProgress = interpolate(frame, [160, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const passwordLength = 8;
  const passwordValue = "•".repeat(
    Math.floor(passwordLength * passwordProgress)
  );

  // 协议勾选动画 (230帧)
  const termsChecked = frame >= 230;

  // 登录按钮高亮动画 (250-280帧)
  const buttonHighlight = frame >= 250 && frame < 280;

  return (
    <AbsoluteFill className="bg-background">
      {/* 渐变背景层 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-purple-50/60"
        style={{ opacity: bgOpacity }}
      />

      {/* 主内容区域 - 左右布局 */}
      <div className="absolute inset-0 flex">
        {/* 左侧 50%: Logo + 品牌展示 */}
        <div
          className="w-1/2 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"
          style={{
            opacity: formOpacity,
          }}
        >
          <div className="text-center space-y-6">
            {/* 飞机图标 */}
            <div className="flex justify-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                  fill="hsl(var(--primary))"
                  className="transition-colors"
                />
              </svg>
            </div>

            {/* 品牌名称 */}
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Nomad
            </h1>

            {/* Slogan */}
            <p className="text-xl text-muted-foreground max-w-sm">
              让每一次飞行，都成为美好回忆
            </p>

            {/* 装饰性元素 */}
            <div className="flex justify-center gap-2 pt-4">
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
              <div className="w-2 h-2 rounded-full bg-secondary/40"></div>
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
            </div>
          </div>
        </div>

        {/* 右侧 50%: 登录表单 */}
        <div className="w-1/2 flex items-center justify-center px-8">
          {/* 摄像机容器 - 实现缩放和平移效果 */}
          <div
            style={{
              transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
              transformOrigin: "center center",
            }}
          >
            <div className="w-full max-w-md">
              <div
                className="bg-card rounded-2xl shadow-2xl p-8"
                style={{
                  opacity: formOpacity,
                  transform: `translateY(${formY}px)`,
                  boxShadow: buttonHighlight
                    ? "0 25px 50px -12px hsl(var(--primary) / 0.25)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
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
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * 过渡动画组件 - SignUp → SignIn 水平滑动
 */
const TransitionAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 水平滑动动画 (60帧 = 2秒)
  const transitionSpring = spring({
    fps,
    frame,
    config: {
      damping: 80,
      stiffness: 120,
    },
  });

  // 计算各元素的位置
  // 注册表单从左侧50%滑出到左侧-50%(完全离开屏幕)
  const signupX = interpolate(transitionSpring, [0, 1], [0, -100]);

  // Logo从右侧50%移动到左侧50%
  const logoX = interpolate(transitionSpring, [0, 1], [50, 0]);

  // 登录表单从右侧100%(屏幕外)滑入到右侧50%
  const signinX = interpolate(transitionSpring, [0, 1], [100, 50]);

  return (
    <AbsoluteFill className="bg-background overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-purple-50/60" />

      {/* 注册表单 - 向左滑出 */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center px-8"
        style={{
          transform: `translateX(${signupX}%)`,
        }}
      >
        <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground">注册成功！</h2>
          </div>
        </div>
      </div>

      {/* Logo - 从右向左移动 */}
      <div
        className="absolute top-0 w-1/2 h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"
        style={{
          left: `${logoX}%`,
        }}
      >
        <div className="text-center space-y-6">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="hsl(var(--primary))"
            />
          </svg>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Nomad
          </h1>
          <p className="text-xl text-muted-foreground max-w-sm">
            让每一次飞行，都成为美好回忆
          </p>
        </div>
      </div>

      {/* 登录表单 - 从右侧滑入 */}
      <div
        className="absolute top-0 w-1/2 h-full flex items-center justify-center px-8"
        style={{
          left: `${signinX}%`,
        }}
      >
        <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
          <LoginFormVisual type="password" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * 主认证场景 - 组合所有子场景
 */
export const AuthSceneComplete: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 1. 注册流程 (0-450帧) */}
      <Sequence
        from={0}
        durationInFrames={SCENE_DURATIONS.AUTH_SIGNUP}
        name="SignUp"
      >
        <SignUpSubScene />
      </Sequence>

      {/* 2. 过渡动画 (450-510帧) */}
      <Sequence
        from={SCENE_DURATIONS.AUTH_SIGNUP}
        durationInFrames={SCENE_DURATIONS.AUTH_TRANSITION}
        name="Transition"
      >
        <TransitionAnimation />
      </Sequence>

      {/* 3. 登录流程 (510-750帧) */}
      <Sequence
        from={SCENE_DURATIONS.AUTH_SIGNUP + SCENE_DURATIONS.AUTH_TRANSITION}
        durationInFrames={SCENE_DURATIONS.AUTH_SIGNIN}
        name="SignIn"
      >
        <SignInSubScene />
      </Sequence>
    </AbsoluteFill>
  );
};
