import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

/**
 * 个人中心场景
 * 总时长: 30秒 (900 frames @ 30fps)
 *
 * 时间轴:
 * SubScene 1: 个人信息 (0-240帧 / 0-8秒)
 * - 0-30: 页面淡入,显示侧边栏 + 个人信息
 * - 30-120: 显示个人信息卡片(头像、姓名、会员等级)
 * - 120-180: 点击编辑按钮
 * - 180-240: 修改昵称并保存
 *
 * SubScene 2: 账号安全 (240-420帧 / 8-14秒)
 * - 240-270: 切换到账号安全页面
 * - 270-360: 显示安全设置列表
 * - 360-420: 点击修改密码,弹出模态框
 *
 * SubScene 3: 旅客管理 (420-660帧 / 14-22秒)
 * - 420-450: 切换到常用旅客页面
 * - 450-540: 显示3个旅客卡片
 * - 540-600: 点击编辑,卡片翻转显示编辑表单
 * - 600-660: 修改信息并保存
 *
 * SubScene 4: 订单管理 (660-900帧 / 22-30秒)
 * - 660-690: 切换到我的订单页面
 * - 690-750: 显示订单列表
 * - 750-810: 点击订单卡片,展开详情
 * - 810-870: 显示航班信息、二维码
 * - 870-900: 点击下载登机牌,淡出结束
 */

export const HomeScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ==========================================
  // 确定当前子场景
  // ==========================================
  let currentSection: "profile" | "security" | "passengers" | "orders" =
    "profile";
  if (frame >= 240 && frame < 420) {
    currentSection = "security";
  } else if (frame >= 420 && frame < 660) {
    currentSection = "passengers";
  } else if (frame >= 660) {
    currentSection = "orders";
  }

  // ==========================================
  // 通用动画
  // ==========================================

  // 背景淡入 (0-30帧)
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 侧边栏项目高亮
  const sidebarItems = [
    { key: "profile", label: "个人信息", icon: "👤" },
    { key: "security", label: "账号安全", icon: "🔒" },
    { key: "passengers", label: "常用旅客", icon: "✈️" },
    { key: "orders", label: "我的订单", icon: "📦" },
  ];

  // ==========================================
  // SubScene 1: 个人信息
  // ==========================================
  const editingProfile = frame >= 120 && frame < 240;
  const nicknameChanged = frame >= 180;

  // ==========================================
  // SubScene 2: 账号安全
  // ==========================================
  const passwordModalOpen = frame >= 360 && frame < 420;

  // ==========================================
  // SubScene 3: 旅客管理
  // ==========================================
  const passengerCardFlipped = frame >= 540 && frame < 660;

  // ==========================================
  // SubScene 4: 订单管理
  // ==========================================
  const orderExpanded = frame >= 750;
  const downloadingBoardingPass = frame >= 870;

  // 最终淡出 (870-900帧)
  const finalFadeOut = interpolate(frame, [870, 900], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-background">
      {/* 渐变背景 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-green-50/60 via-blue-50/40 to-purple-50/60"
        style={{ opacity: bgOpacity * finalFadeOut }}
      />

      {/* 主内容区域 */}
      <div className="absolute inset-0 flex" style={{ opacity: finalFadeOut }}>
        {/* 左侧导航栏 */}
        <div className="w-64 bg-card border-r border-input p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">个人中心</h2>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map(item => (
              <button
                key={item.key}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  currentSection === item.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* ==================== */}
            {/* 个人信息 */}
            {/* ==================== */}
            {currentSection === "profile" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-foreground">个人信息</h1>

                <div className="bg-card rounded-lg border border-input p-8">
                  <div className="flex items-start gap-6">
                    {/* 头像 */}
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl text-white">
                      张
                    </div>

                    {/* 信息 */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">
                          昵称
                        </label>
                        {editingProfile ? (
                          <input
                            type="text"
                            value={nicknameChanged ? "张伟001" : "张伟"}
                            className="text-2xl font-bold text-foreground border-b-2 border-primary bg-transparent focus:outline-none"
                            readOnly
                          />
                        ) : (
                          <div className="text-2xl font-bold text-foreground">
                            张伟
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            会员等级
                          </div>
                          <div className="text-lg font-semibold text-primary">
                            黄金会员
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            积分
                          </div>
                          <div className="text-lg font-semibold text-foreground">
                            12,580
                          </div>
                        </div>
                      </div>

                      {editingProfile ? (
                        <button className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors">
                          保存
                        </button>
                      ) : (
                        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                          编辑
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== */}
            {/* 账号安全 */}
            {/* ==================== */}
            {currentSection === "security" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-foreground">账号安全</h1>

                <div className="space-y-4">
                  {[
                    {
                      title: "邮箱",
                      value: "user@example.com",
                      verified: true,
                    },
                    {
                      title: "手机号",
                      value: "138****5678",
                      verified: true,
                    },
                    {
                      title: "密保问题",
                      value: "未设置",
                      verified: false,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-card rounded-lg border border-input p-6 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.verified
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {item.verified ? "✓" : "⚠️"}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {item.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.value}
                          </div>
                        </div>
                      </div>
                      <button className="text-primary hover:text-primary/90 font-medium">
                        {item.verified ? "修改" : "设置"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* 修改密码模态框 */}
                {passwordModalOpen && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card rounded-lg p-6 w-96 shadow-2xl">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        修改密码
                      </h3>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="当前密码"
                          className="w-full h-10 rounded-md border border-input bg-background px-3"
                          readOnly
                        />
                        <input
                          type="password"
                          placeholder="新密码"
                          className="w-full h-10 rounded-md border border-input bg-background px-3"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================== */}
            {/* 常用旅客 */}
            {/* ==================== */}
            {currentSection === "passengers" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-foreground">常用旅客</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "张伟",
                      idType: "身份证",
                      id: "110***********1234",
                    },
                    { name: "李娜", idType: "护照", id: "E12******78" },
                    {
                      name: "王强",
                      idType: "身份证",
                      id: "310***********5678",
                    },
                  ].map((passenger, i) => (
                    <div
                      key={i}
                      className={`bg-card rounded-lg border border-input p-6 transition-all ${
                        passengerCardFlipped && i === 0
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                    >
                      {!passengerCardFlipped || i !== 0 ? (
                        <>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-foreground">
                                {passenger.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {passenger.idType}
                              </p>
                            </div>
                            <button className="text-primary hover:text-primary/90 text-sm">
                              编辑
                            </button>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {passenger.id}
                          </div>
                        </>
                      ) : (
                        /* 编辑表单 */
                        <div className="space-y-4">
                          <input
                            type="text"
                            value="张伟"
                            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                            readOnly
                          />
                          <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                            <option>身份证</option>
                            <option>护照</option>
                          </select>
                          <button className="w-full h-10 bg-secondary text-white rounded-md hover:bg-secondary/90">
                            保存
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== */}
            {/* 我的订单 */}
            {/* ==================== */}
            {currentSection === "orders" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-foreground">我的订单</h1>

                {/* 订单标签 */}
                <div className="flex gap-4 border-b border-input">
                  {["即将出行", "已完成", "已取消"].map((tab, i) => (
                    <button
                      key={i}
                      className={`px-4 py-2 font-medium transition-colors ${
                        i === 0
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 订单卡片 */}
                <div className="space-y-4">
                  <div
                    className={`bg-card rounded-lg border border-input transition-all ${
                      orderExpanded ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">✈️</div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              北京 PEK → 东京 NRT
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              2025-12-25 | 东方航空 MU123
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            ¥1,910
                          </div>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full mt-2">
                            已支付
                          </span>
                        </div>
                      </div>

                      {/* 展开的订单详情 */}
                      {orderExpanded && (
                        <div className="pt-4 border-t border-input space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                乘客:
                              </span>
                              <span className="ml-2 text-foreground">张伟</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                舱位:
                              </span>
                              <span className="ml-2 text-foreground">
                                经济舱
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                附加:
                              </span>
                              <span className="ml-2 text-foreground">
                                30kg行李 + 航空险
                              </span>
                            </div>
                          </div>

                          {/* 二维码 */}
                          <div className="flex items-center justify-center py-4">
                            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                              <span className="text-4xl">📱</span>
                            </div>
                          </div>

                          {/* 下载按钮 */}
                          <button
                            className={`w-full h-12 rounded-lg font-semibold transition-all ${
                              downloadingBoardingPass
                                ? "bg-primary/80 text-primary-foreground"
                                : "bg-secondary text-white hover:bg-secondary/90"
                            }`}
                          >
                            {downloadingBoardingPass
                              ? "下载中..."
                              : "下载登机牌"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
