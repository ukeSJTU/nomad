import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { SignUpFormVisual } from "../components/visual/SignUpFormVisual";

/**
 * 注册流程子场景
 * 总时长: 15秒 (450 frames @ 30fps)
 *
 * 时间轴:
 * Step 1: 邮箱验证 (0-210帧 / 0-7秒)
 * - 0-30: 页面淡入
 * - 30-60: 邮箱输入动画
 * - 60-75: 点击发送验证码按钮
 * - 75-195: 验证码输入动画(逐个填充)
 * - 195-210: 点击下一步
 *
 * Step 2: 设置密码 (210-330帧 / 7-11秒)
 * - 210-240: 页面过渡(表单向上滑出/滑入)
 * - 240-270: 密码输入动画
 * - 270-300: 确认密码输入动画
 * - 300-330: 点击下一步
 *
 * Step 3: 完成 (330-450帧 / 11-15秒)
 * - 330-360: 页面过渡
 * - 360-390: 成功图标放大动画
 * - 390-420: 显示成功文字
 * - 420-450: 准备淡出
 */

export const SignUpSubScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ==========================================
  // 确定当前步骤
  // ==========================================
  let currentStep: 1 | 2 | 3 = 1;
  if (frame >= 210 && frame < 330) {
    currentStep = 2;
  } else if (frame >= 330) {
    currentStep = 3;
  }

  // ==========================================
  // 背景和容器动画
  // ==========================================

  // 初始淡入 (0-30帧)
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 表单容器动画
  const formSpring = spring({
    fps,
    frame: frame - 20,
    config: {
      damping: 100,
      stiffness: 180,
    },
  });
  const formOpacity = interpolate(formSpring, [0, 1], [0, 1]);
  const formY = interpolate(formSpring, [0, 1], [30, 0]);

  // ==========================================
  // Step 1: 邮箱验证动画
  // ==========================================

  // 邮箱输入动画 (30-60帧)
  const emailProgress = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const emailText = "user@example.com";
  const emailValue = emailText.substring(
    0,
    Math.floor(emailText.length * emailProgress)
  );

  // 验证码按钮点击 (60-75帧)
  const codeSent = frame >= 75;
  const countdown = Math.max(60 - Math.floor((frame - 75) / 30), 0);

  // 验证码输入动画 (75-195帧,每个数字20帧间隔)
  let codeValue = "";
  const codeDigits = "123456";
  for (let i = 0; i < 6; i++) {
    const digitStartFrame = 75 + i * 20;
    if (frame >= digitStartFrame) {
      codeValue += codeDigits[i];
    }
  }

  // ==========================================
  // Step 过渡动画
  // ==========================================

  // Step 1 → Step 2 过渡 (210-240帧)
  const step1ToStep2Spring = spring({
    fps,
    frame: frame - 210,
    config: {
      damping: 80,
      stiffness: 150,
    },
    durationInFrames: 30,
  });

  // Step 2 → Step 3 过渡 (330-360帧)
  const step2ToStep3Spring = spring({
    fps,
    frame: frame - 330,
    config: {
      damping: 80,
      stiffness: 150,
    },
    durationInFrames: 30,
  });

  // 计算表单内容的Y偏移(用于过渡动画)
  let contentY = 0;
  let contentOpacity = 1;

  if (frame >= 210 && frame < 240) {
    // Step 1 滑出
    contentY = interpolate(step1ToStep2Spring, [0, 1], [0, -50]);
    contentOpacity = interpolate(step1ToStep2Spring, [0, 1], [1, 0]);
  } else if (frame >= 330 && frame < 360) {
    // Step 2 滑出
    contentY = interpolate(step2ToStep3Spring, [0, 1], [0, -50]);
    contentOpacity = interpolate(step2ToStep3Spring, [0, 1], [1, 0]);
  }

  // ==========================================
  // Step 2: 密码设置动画
  // ==========================================

  // 密码输入动画 (240-270帧)
  const passwordProgress = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const passwordLength = 8;
  const passwordValue = "•".repeat(
    Math.floor(passwordLength * passwordProgress)
  );

  // 确认密码输入动画 (270-300帧)
  const confirmPasswordProgress = interpolate(frame, [270, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const confirmPasswordValue = "•".repeat(
    Math.floor(passwordLength * confirmPasswordProgress)
  );

  // ==========================================
  // Step 3: 成功动画
  // ==========================================

  // 成功图标显示 (360帧开始)
  const showSuccess = frame >= 360;

  return (
    <AbsoluteFill className="bg-background">
      {/* 渐变背景 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-purple-50/60"
        style={{ opacity: bgOpacity }}
      />

      {/* 主内容区域 - 左右布局 */}
      <div className="absolute inset-0 flex">
        {/* 左侧 50%: 注册表单 */}
        <div
          className="w-1/2 flex items-center justify-center px-8"
          style={{
            opacity: formOpacity,
            transform: `translateY(${formY}px)`,
          }}
        >
          <div className="w-full max-w-md">
            <div
              className="bg-card rounded-2xl shadow-2xl p-8"
              style={{
                transform: `translateY(${contentY}px)`,
                opacity: contentOpacity,
              }}
            >
              <SignUpFormVisual
                currentStep={currentStep}
                emailValue={emailValue}
                codeValue={codeValue}
                codeSent={codeSent}
                countdown={countdown}
                passwordValue={passwordValue}
                confirmPasswordValue={confirmPasswordValue}
                showSuccess={showSuccess}
              />
            </div>
          </div>
        </div>

        {/* 右侧 50%: Logo + 品牌展示 */}
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
      </div>
    </AbsoluteFill>
  );
};
