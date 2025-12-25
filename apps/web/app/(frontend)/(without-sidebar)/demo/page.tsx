"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";

import { BusinessShowcase } from "@/app/_remotion/compositions/BusinessShowcase";
import {
  TOTAL_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/app/_remotion/constants";

const Home: NextPage = () => {
  return (
    <div>
      <div className="max-w-screen-md m-auto mb-5">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          <Player
            component={BusinessShowcase}
            durationInFrames={TOTAL_FRAMES}
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
            Nomad 航空订票系统 - 完整业务展示
          </h2>
          <p className="text-gray-600 mb-4">
            这个动画展示了 Nomad
            航空订票系统的完整功能流程，从用户注册到订单管理:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-gray-600 max-w-2xl mx-auto">
            {/* Scene 1: Intro */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">
                🎬 场景 1: 品牌开场 (3秒)
              </h3>
              <ul className="text-sm space-y-1">
                <li>✈️ Logo 飞入动画</li>
                <li>📝 品牌名称展示</li>
                <li>💫 Slogan 呈现</li>
              </ul>
            </div>

            {/* Scene 2: Auth */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">
                🔐 场景 2: 用户认证 (25秒)
              </h3>
              <ul className="text-sm space-y-1">
                <li>📧 邮箱注册流程 (3步骤)</li>
                <li>🎥 水平过渡动画</li>
                <li>🔑 登录流程 (含摄像机运镜)</li>
              </ul>
            </div>

            {/* Scene 3: Search */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">
                🔍 场景 3: 航班搜索 (30秒)
              </h3>
              <ul className="text-sm space-y-1">
                <li>🗓️ 搜索表单填写</li>
                <li>💰 7天价格比较</li>
                <li>✈️ 航班列表展示</li>
                <li>🎫 舱位选择</li>
              </ul>
            </div>

            {/* Scene 4: Order */}
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">
                📝 场景 4: 订票流程 (40秒)
              </h3>
              <ul className="text-sm space-y-1">
                <li>👥 灵活的旅客选择</li>
                <li>📞 联系信息填写</li>
                <li>🎒 附加服务选择</li>
                <li>💳 支付流程</li>
              </ul>
            </div>

            {/* Scene 5: Home */}
            <div className="bg-green-50 p-4 rounded-lg col-span-1 md:col-span-2">
              <h3 className="font-bold text-gray-800 mb-2">
                🏠 场景 5: 个人中心 (30秒)
              </h3>
              <ul className="text-sm space-y-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                <li>👤 个人信息管理</li>
                <li>🔒 账号安全设置</li>
                <li>✈️ 常用旅客管理</li>
                <li>📦 订单查看</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            总时长: 128秒 (3840帧 @ 30fps) | 含场景过渡、摄像机运镜、Spring
            弹性动画
          </p>
          <p className="text-gray-400 text-xs mt-2">
            ✅ 已实现: Intro Scene | 🚧 进行中: Auth/Search/Order/Home Scenes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
