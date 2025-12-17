import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Intro Scene - 品牌开场
 * 总时长: 3秒 (90 frames @ 30fps)
 *
 * 时间轴:
 * 0-30: 黑屏 → 白色淡入
 * 30-60: Logo SVG 动画 - 飞机从左侧飞入 → 停在中央
 * 60-90: 品牌元素依次出现:
 *        - "Nomad" 文字(右侧)
 *        - "让每一次飞行,都成为美好回忆" (下方)
 * 85-90: 所有元素淡出
 */

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 背景淡入动画 (0-30帧)
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 飞机飞入动画 (30-60帧)
  const planeSpring = spring({
    fps,
    frame: frame - 30,
    config: {
      damping: 80,
      stiffness: 100,
    },
    durationInFrames: 30,
  });

  const planeX = interpolate(planeSpring, [0, 1], [-200, 0]);
  const planeOpacity = interpolate(frame, [30, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Nomad" 文字出现 (60-75帧)
  const textSpring = spring({
    fps,
    frame: frame - 60,
    config: {
      damping: 100,
      stiffness: 200,
    },
    durationInFrames: 15,
  });

  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const textX = interpolate(textSpring, [0, 1], [30, 0]);

  // Slogan 出现 (68-83帧 - 稍微延迟形成错位效果)
  const sloganSpring = spring({
    fps,
    frame: frame - 68,
    config: {
      damping: 100,
      stiffness: 200,
    },
    durationInFrames: 15,
  });

  const sloganOpacity = interpolate(sloganSpring, [0, 1], [0, 1]);
  const sloganY = interpolate(sloganSpring, [0, 1], [20, 0]);

  // 整体淡出动画 (85-90帧)
  const fadeOutOpacity = interpolate(frame, [85, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-background">
      {/* 白色背景淡入 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/30"
        style={{ opacity: bgOpacity * fadeOutOpacity }}
      />

      {/* 中心内容容器 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: fadeOutOpacity }}
      >
        <div className="flex flex-col items-center gap-8">
          {/* Logo 区域: 飞机 + 文字 */}
          <div className="flex items-center gap-6">
            {/* 飞机 SVG */}
            <div
              style={{
                transform: `translateX(${planeX}px)`,
                opacity: planeOpacity,
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 飞机主体 */}
                <path
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                  fill="hsl(var(--primary))"
                  className="transition-colors"
                />
                {/* 飞机窗户装饰 */}
                <circle cx="11.5" cy="7" r="0.8" fill="white" opacity="0.6" />
                <circle cx="11.5" cy="9" r="0.8" fill="white" opacity="0.6" />
                <circle cx="11.5" cy="11" r="0.8" fill="white" opacity="0.6" />
              </svg>
            </div>

            {/* "Nomad" 文字 */}
            <div
              style={{
                opacity: textOpacity,
                transform: `translateX(${textX}px)`,
              }}
            >
              <h1 className="text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Nomad
              </h1>
            </div>
          </div>

          {/* Slogan */}
          <div
            style={{
              opacity: sloganOpacity,
              transform: `translateY(${sloganY}px)`,
            }}
          >
            <p className="text-2xl text-muted-foreground font-medium tracking-wide">
              让每一次飞行，都成为美好回忆
            </p>
          </div>
        </div>
      </div>

      {/* 装饰性元素 - 淡淡的飞行轨迹线条 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: bgOpacity * fadeOutOpacity * 0.3 }}
      >
        <svg
          className="absolute top-1/4 left-0 w-full h-1/2"
          viewBox="0 0 1280 360"
          fill="none"
        >
          <path
            d="M0 180 Q320 100, 640 180 T1280 180"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="10 20"
            opacity="0.2"
          />
          <path
            d="M0 200 Q320 280, 640 200 T1280 200"
            stroke="hsl(var(--secondary))"
            strokeWidth="2"
            strokeDasharray="15 25"
            opacity="0.15"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
