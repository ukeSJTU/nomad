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
 * 总时长: 约 10 秒 (300 frames @ 30fps)
 *
 * 摄像机动画时间轴:
 * 0-40: 背景淡入 + Logo/标题出现
 * 40-80: 表单容器滑入
 * 80-120: 摄像机聚焦并放大到账号输入框
 * 100-140: 账号输入动画
 * 140-170: 摄像机平移到密码输入框
 * 160-200: 密码输入动画
 * 200-230: 摄像机缩小回正常大小,显示完整表单
 * 230-250: 勾选协议
 * 250-280: 登录按钮高亮
 * 280-300: 场景保持
 */

export const AuthScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 背景淡入动画
  const bgOpacity = interpolate(frame, [0, 40], [0, 1], {
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

      {/* 摄像机容器 - 实现缩放和平移效果 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
          transformOrigin: "center center",
        }}
      >
        <div className="w-full max-w-lg px-4">
          {/* Logo/标题区域 */}
          <div
            className="text-center mb-8"
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              欢迎来到 Nomad
            </h2>
            <p className="text-xl text-muted-foreground">您的航空旅行专家</p>
          </div>

          {/* 登录表单 */}
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
    </AbsoluteFill>
  );
};
