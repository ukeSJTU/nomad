import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

/**
 * 订票流程场景
 * 总时长: 40秒 (1200 frames @ 30fps)
 *
 * 时间轴:
 * Sequence 1: 乘客信息选择 (0-600帧 / 0-20秒)
 * - 0-30: 页面淡入,显示乘客选择界面
 * - 30-150: 从常用旅客中选择第一个乘客 "张伟"
 * - 150-270: 继续选择第二个乘客 "李娜" (超过限制)
 * - 270-330: 删除 "李娜"
 * - 330-450: 点击"手动添加",展开表单并填写
 * - 450-540: 填写完成,自动收起
 * - 540-600: 删除手动添加的乘客,恢复到只有"张伟"
 *
 * Sequence 2: 联系信息 (600-780帧 / 20-26秒)
 * - 600-630: 页面过渡到联系信息
 * - 630-660: 显示自动填充的信息
 * - 660-750: 修改邮箱地址
 * - 750-780: 点击下一步
 *
 * Sequence 3: 附加服务 (780-990帧 / 26-33秒)
 * - 780-810: 页面过渡到附加服务
 * - 810-870: 选择30kg行李
 * - 870-930: 默认选择标准餐
 * - 930-990: 选择航空险
 *
 * Sequence 4: 支付 (990-1200帧 / 33-40秒)
 * - 990-1050: 页面过渡到支付
 * - 1050-1080: 显示订单摘要
 * - 1080-1110: 选择支付宝
 * - 1110-1140: 点击确认支付
 * - 1140-1170: 加载动画
 * - 1170-1200: 支付成功,淡出
 */

export const OrderScene = () => {
  const frame = useCurrentFrame();

  // ==========================================
  // 确定当前步骤 (1-4)
  // ==========================================
  let currentStep: 1 | 2 | 3 | 4 = 1;
  if (frame >= 600 && frame < 780) {
    currentStep = 2;
  } else if (frame >= 780 && frame < 990) {
    currentStep = 3;
  } else if (frame >= 990) {
    currentStep = 4;
  }

  // ==========================================
  // 通用动画
  // ==========================================

  // 背景淡入 (0-30帧)
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 步骤过渡动画
  const stepTransitionFrames = [600, 780, 990];
  let contentOpacity = 1;
  let contentY = 0;

  for (const transitionFrame of stepTransitionFrames) {
    if (frame >= transitionFrame && frame < transitionFrame + 30) {
      const progress = (frame - transitionFrame) / 30;
      contentOpacity = interpolate(progress, [0, 0.5, 1], [1, 0, 1]);
      contentY = interpolate(progress, [0, 0.5, 1], [0, -20, 0]);
    }
  }

  // ==========================================
  // Sequence 1: 乘客选择状态
  // ==========================================

  // 已选择的乘客列表
  const passenger1Selected = frame >= 150;
  const passenger2Selected = frame >= 270 && frame < 330;

  // 超限提示
  const showOverLimitWarning = passenger2Selected;

  // 手动添加表单展开
  const manualFormExpanded = frame >= 330 && frame < 540;

  // 手动添加表单填写进度
  const manualNameProgress = interpolate(frame, [360, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const manualName = "赵敏".substring(0, Math.floor(2 * manualNameProgress));

  const manualIdProgress = interpolate(frame, [450, 510], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const manualId = "E12345678".substring(0, Math.floor(9 * manualIdProgress));

  // ==========================================
  // Sequence 2: 联系信息
  // ==========================================

  const emailEditProgress = interpolate(frame, [660, 750], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ==========================================
  // Sequence 3: 附加服务
  // ==========================================

  const baggageSelected = frame >= 870;
  const insuranceSelected = frame >= 930;

  // ==========================================
  // Sequence 4: 支付
  // ==========================================

  const paymentMethodSelected = frame >= 1080;
  const paying = frame >= 1110 && frame < 1170;
  const paymentSuccess = frame >= 1170;

  // 最终淡出
  const finalFadeOut = interpolate(frame, [1170, 1200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-background">
      {/* 渐变背景 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-50/60 via-purple-50/40 to-blue-50/60"
        style={{ opacity: bgOpacity * finalFadeOut }}
      />

      {/* 主内容区域 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: finalFadeOut }}
      >
        <div className="h-full flex flex-col">
          {/* 进度条 */}
          <div className="bg-card border-b border-input p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map(step => (
                  <div key={step} className="flex items-center flex-1">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                        currentStep >= step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-all ${
                          currentStep > step ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-center text-muted-foreground">
                {currentStep === 1 && "Step 1/4 - 乘客信息"}
                {currentStep === 2 && "Step 2/4 - 联系信息"}
                {currentStep === 3 && "Step 3/4 - 附加服务"}
                {currentStep === 4 && "Step 4/4 - 支付"}
              </div>
            </div>
          </div>

          {/* 内容区域 */}
          <div
            className="flex-1 overflow-auto"
            style={{
              opacity: contentOpacity,
              transform: `translateY(${contentY}px)`,
            }}
          >
            <div className="max-w-4xl mx-auto p-8">
              {/* ==================== */}
              {/* Step 1: 乘客信息 */}
              {/* ==================== */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    选择或添加乘客
                  </h2>

                  {/* 常用旅客列表 */}
                  <div className="bg-card rounded-lg border border-input p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      从常用旅客中选择
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          name: "张伟",
                          idType: "身份证",
                          selected: passenger1Selected,
                        },
                        {
                          name: "李娜",
                          idType: "护照",
                          selected: passenger2Selected,
                        },
                        { name: "王强", idType: "身份证", selected: false },
                      ].map((passenger, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            passenger.selected
                              ? "border-primary bg-primary/5"
                              : "border-input hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                passenger.selected
                                  ? "border-primary bg-primary"
                                  : "border-input"
                              }`}
                            >
                              {passenger.selected && (
                                <svg
                                  className="w-3 h-3 text-primary-foreground"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">
                                {passenger.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {passenger.idType}
                              </div>
                            </div>
                          </div>
                          {passenger.selected && (
                            <button className="text-sm text-destructive hover:text-destructive/90">
                              删除
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 已选择旅客 */}
                  <div className="bg-card rounded-lg border border-input p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        已选择: ({passenger1Selected ? 1 : 0}
                        {passenger2Selected ? " + 1" : ""}/1)
                      </h3>
                      {showOverLimitWarning && (
                        <span className="text-sm text-destructive">
                          ⚠️ 已达到乘客上限
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 手动添加 */}
                  <div className="bg-card rounded-lg border border-input p-6">
                    <button className="w-full text-left font-semibold text-foreground mb-4 hover:text-primary transition-colors">
                      + 手动添加新旅客
                    </button>

                    {manualFormExpanded && (
                      <div className="space-y-4 pt-4 border-t border-input">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            姓名
                          </label>
                          <input
                            type="text"
                            value={manualName}
                            placeholder="请输入姓名"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            证件类型
                          </label>
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option>身份证</option>
                            <option>护照</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            证件号
                          </label>
                          <input
                            type="text"
                            value={manualId}
                            placeholder="请输入证件号"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="w-full h-12 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                    下一步
                  </button>
                </div>
              )}

              {/* ==================== */}
              {/* Step 2: 联系信息 */}
              {/* ==================== */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    填写联系信息
                  </h2>

                  <div className="bg-card rounded-lg border border-input p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        姓名
                      </label>
                      <input
                        type="text"
                        value="张伟"
                        className="flex h-12 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
                        readOnly
                      />
                      <span className="text-xs text-muted-foreground">
                        已自动填充
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        手机号
                      </label>
                      <input
                        type="text"
                        value="138****5678"
                        className="flex h-12 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
                        readOnly
                      />
                      <span className="text-xs text-muted-foreground">
                        已保存
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        邮箱
                      </label>
                      <input
                        type="text"
                        value={
                          emailEditProgress > 0
                            ? "newemail@example.com"
                            : "user@example.com"
                        }
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        readOnly
                      />
                    </div>
                  </div>

                  <button className="w-full h-12 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                    下一步
                  </button>
                </div>
              )}

              {/* ==================== */}
              {/* Step 3: 附加服务 */}
              {/* ==================== */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    选择附加服务
                  </h2>

                  {/* 托运行李 */}
                  <div className="bg-card rounded-lg border border-input p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      🎒 托运行李
                    </h3>
                    <div className="space-y-3">
                      {[
                        { weight: "20kg", price: 150 },
                        { weight: "30kg", price: 300 },
                        { weight: "40kg", price: 450 },
                      ].map((option, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            baggageSelected && i === 1
                              ? "border-primary bg-primary/5"
                              : "border-input"
                          }`}
                        >
                          <span className="font-medium text-foreground">
                            {option.weight}
                          </span>
                          <span className="text-primary font-semibold">
                            +¥{option.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 保险 */}
                  <div className="bg-card rounded-lg border border-input p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      🛡️ 保险
                    </h3>
                    <div
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        insuranceSelected
                          ? "border-primary bg-primary/5"
                          : "border-input"
                      }`}
                    >
                      <span className="font-medium text-foreground">
                        航空意外险
                      </span>
                      <span className="text-primary font-semibold">+¥30</span>
                    </div>
                  </div>

                  {/* 总计 */}
                  <div className="bg-primary/10 rounded-lg p-6">
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-semibold text-foreground">
                        总计:
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        ¥
                        {1580 +
                          (baggageSelected ? 300 : 0) +
                          (insuranceSelected ? 30 : 0)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full h-12 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                    下一步
                  </button>
                </div>
              )}

              {/* ==================== */}
              {/* Step 4: 支付 */}
              {/* ==================== */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {!paymentSuccess ? (
                    <>
                      <h2 className="text-2xl font-bold text-foreground">
                        确认支付
                      </h2>

                      {/* 订单摘要 */}
                      <div className="bg-card rounded-lg border border-input p-6 space-y-3">
                        <h3 className="font-semibold text-foreground mb-4">
                          订单摘要
                        </h3>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">航班</span>
                          <span className="text-foreground">
                            PEK → NRT (2025-12-25)
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">乘客</span>
                          <span className="text-foreground">张伟</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">舱位</span>
                          <span className="text-foreground">经济舱</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">附加</span>
                          <span className="text-foreground">
                            30kg行李 + 航空险
                          </span>
                        </div>
                        <div className="border-t border-input pt-3 flex justify-between">
                          <span className="font-semibold text-foreground">
                            总计
                          </span>
                          <span className="text-xl font-bold text-primary">
                            ¥1,910
                          </span>
                        </div>
                      </div>

                      {/* 支付方式 */}
                      <div className="bg-card rounded-lg border border-input p-6">
                        <h3 className="font-semibold text-foreground mb-4">
                          选择支付方式
                        </h3>
                        <div className="space-y-3">
                          {["支付宝", "微信支付", "信用卡"].map((method, i) => (
                            <div
                              key={i}
                              className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                paymentMethodSelected && i === 0
                                  ? "border-primary bg-primary/5"
                                  : "border-input"
                              }`}
                            >
                              <span className="font-medium text-foreground">
                                {method}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        className={`w-full h-14 rounded-lg font-semibold text-lg transition-all ${
                          paying
                            ? "bg-primary/80 text-primary-foreground"
                            : "bg-secondary text-white hover:bg-secondary/90"
                        }`}
                      >
                        {paying ? "支付中..." : "确认支付"}
                      </button>
                    </>
                  ) : (
                    /* 支付成功 */
                    <div className="flex flex-col items-center justify-center py-16 space-y-6">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-green-600"
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
                      <div className="text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                          支付成功！
                        </h2>
                        <p className="text-muted-foreground">
                          订单已生成，请查看您的订单详情
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
