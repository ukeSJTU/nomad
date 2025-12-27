import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * 航班搜索场景
 * 总时长: 30秒 (900 frames @ 30fps)
 *
 * 时间轴:
 * Sequence 1: 初始搜索 (0-240帧 / 0-8秒)
 * - 0-30: 页面淡入
 * - 30-90: 选择出发地 "北京 PEK"
 * - 90-150: 选择目的地 "东京 NRT"
 * - 150-210: 选择日期
 * - 210-240: 点击搜索按钮 + 加载动画
 *
 * Sequence 2: 结果展示 (240-480帧 / 8-16秒)
 * - 240-270: 搜索条件摘要 + 7天比价组件出现
 * - 270-360: 航班列表滚动展示
 * - 360-420: 点击7天比价中的另一个日期
 * - 420-480: 航班列表刷新
 *
 * Sequence 3: 舱位选择 (480-600帧 / 16-20秒)
 * - 480-510: 摄像机聚焦到某个航班卡片
 * - 510-540: 点击展开舱位选项
 * - 540-570: 选择经济舱
 * - 570-600: 摄像机缩小回正常视图
 *
 * Sequence 4: 往返演示 (600-900帧 / 20-30秒)
 * - 600-630: 滚动回到顶部
 * - 630-660: 切换到"往返"
 * - 660-720: 选择返程日期
 * - 720-750: 点击搜索
 * - 750-840: 显示去程/返程标签切换
 * - 840-900: 点击订票按钮,淡出
 */

export const SearchScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ==========================================
  // 通用动画
  // ==========================================

  // 背景淡入 (0-30帧)
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ==========================================
  // Sequence 1: 初始搜索表单
  // ==========================================

  // 出发地输入 (30-90帧)
  const departureProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const departureText = "北京 PEK";
  const departureValue =
    departureProgress > 0.3
      ? departureText.substring(
          0,
          Math.floor(departureText.length * ((departureProgress - 0.3) / 0.7))
        )
      : "";
  const departureDropdownOpen = frame >= 30 && frame < 90;

  // 目的地输入 (90-150帧)
  const arrivalProgress = interpolate(frame, [90, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrivalText = "东京 NRT";
  const arrivalValue =
    arrivalProgress > 0.3
      ? arrivalText.substring(
          0,
          Math.floor(arrivalText.length * ((arrivalProgress - 0.3) / 0.7))
        )
      : "";
  const arrivalDropdownOpen = frame >= 90 && frame < 150;

  // 日期选择 (150-210帧)
  const dateSelected = frame >= 210;
  const calendarOpen = frame >= 150 && frame < 210;

  // 搜索按钮加载 (210-240帧)
  const searching = frame >= 210 && frame < 240;

  // ==========================================
  // Sequence 2: 搜索结果
  // ==========================================

  // 结果页面显示 (240帧开始)
  const showResults = frame >= 240;

  // 结果淡入 (240-270帧)
  const resultsOpacity = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 7天比价组件高亮某一天 (360-420帧)
  const priceComparisonActive = frame >= 270 && frame < 480;
  const selectedDayChange = frame >= 360 && frame < 420;

  // 航班列表滚动 (270-360帧)
  const scrollProgress = interpolate(frame, [270, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scrollY = interpolate(scrollProgress, [0, 1], [0, -200]);

  // ==========================================
  // Sequence 3: 舱位选择
  // ==========================================

  // 摄像机聚焦 (480-510帧)
  const focusSpring = spring({
    fps,
    frame: frame - 480,
    config: {
      damping: 80,
      stiffness: 120,
    },
    durationInFrames: 30,
  });
  const cameraScale =
    frame >= 480 && frame < 600
      ? interpolate(focusSpring, [0, 1], [1, 1.2])
      : 1;

  // 舱位展开 (510-540帧)
  const cabinExpanded = frame >= 510 && frame < 600;

  // ==========================================
  // Sequence 4: 往返切换
  // ==========================================

  // 切换到往返 (630-660帧)
  const roundTripSelected = frame >= 630;

  // 最终淡出 (870-900帧)
  const finalFadeOut = interpolate(frame, [870, 900], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-background">
      {/* 渐变背景 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-blue-50/40 to-indigo-50/60"
        style={{ opacity: bgOpacity * finalFadeOut }}
      />

      {/* 主内容区域 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: finalFadeOut }}
      >
        {/* ==================== */}
        {/* 搜索表单阶段 */}
        {/* ==================== */}
        {!showResults && (
          <div className="h-full flex items-center justify-center px-8">
            <div className="w-full max-w-4xl">
              <div className="bg-card rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl font-bold text-foreground mb-6">
                  搜索航班
                </h1>

                {/* 单程/往返切换 */}
                <div className="flex gap-4 mb-6">
                  <button
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      !roundTripSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    单程
                  </button>
                  <button
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      roundTripSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    往返
                  </button>
                </div>

                {/* 搜索表单 */}
                <div className="grid grid-cols-3 gap-4">
                  {/* 出发地 */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      出发地
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={departureValue}
                        placeholder="请选择出发城市"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        readOnly
                      />
                      {departureDropdownOpen && (
                        <div className="absolute top-full mt-2 w-full bg-card border border-input rounded-md shadow-lg p-2 z-10">
                          <div className="text-sm text-muted-foreground p-2">
                            北京 PEK
                          </div>
                          <div className="text-sm text-muted-foreground p-2">
                            上海 PVG
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 目的地 */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      目的地
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={arrivalValue}
                        placeholder="请选择到达城市"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        readOnly
                      />
                      {arrivalDropdownOpen && (
                        <div className="absolute top-full mt-2 w-full bg-card border border-input rounded-md shadow-lg p-2 z-10">
                          <div className="text-sm text-muted-foreground p-2">
                            东京 NRT
                          </div>
                          <div className="text-sm text-muted-foreground p-2">
                            大阪 KIX
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 日期 */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      出发日期
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={dateSelected ? "2025-12-25" : ""}
                        placeholder="请选择日期"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        readOnly
                      />
                      {calendarOpen && (
                        <div className="absolute top-full mt-2 bg-card border border-input rounded-md shadow-lg p-4 z-10">
                          <div className="text-sm text-muted-foreground">
                            📅 日历组件
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 搜索按钮 */}
                <button
                  className={`mt-6 w-full h-14 rounded-lg font-semibold text-lg transition-all ${
                    searching
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-secondary text-white hover:bg-secondary/90"
                  }`}
                >
                  {searching ? "搜索中..." : "搜索航班"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== */}
        {/* 搜索结果阶段 */}
        {/* ==================== */}
        {showResults && (
          <div
            className="h-full flex flex-col"
            style={{
              opacity: resultsOpacity,
              transform: `scale(${cameraScale})`,
              transformOrigin: "center 40%",
            }}
          >
            {/* 搜索条件摘要 */}
            <div className="bg-card border-b border-input p-4">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  北京 PEK → 东京 NRT | 2025-12-25
                  {roundTripSelected && " | 往返"}
                </div>
                <button className="text-sm text-primary hover:text-primary/90">
                  修改搜索
                </button>
              </div>
            </div>

            {/* 7天比价组件 */}
            {priceComparisonActive && (
              <div className="bg-card border-b border-input p-4">
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    7天价格趋势
                  </h3>
                  <div className="flex gap-2">
                    {[
                      { date: "12-23", price: 1680 },
                      {
                        date: "12-24",
                        price: 1580,
                        selected: !selectedDayChange,
                      },
                      {
                        date: "12-25",
                        price: 1480,
                        selected: selectedDayChange,
                      },
                      { date: "12-26", price: 1780 },
                      { date: "12-27", price: 1880 },
                      { date: "12-28", price: 1680 },
                      { date: "12-29", price: 1580 },
                    ].map((day, i) => (
                      <div
                        key={i}
                        className={`flex-1 p-3 rounded-lg text-center cursor-pointer transition-all ${
                          day.selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        <div className="text-xs mb-1">{day.date}</div>
                        <div className="text-sm font-semibold">
                          ¥{day.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 航班列表 */}
            <div className="flex-1 overflow-hidden">
              <div
                className="max-w-6xl mx-auto p-4 space-y-4"
                style={{ transform: `translateY(${scrollY}px)` }}
              >
                {[
                  { airline: "东方航空", code: "MU123", price: 1580 },
                  { airline: "国际航空", code: "CA456", price: 1680 },
                  { airline: "日本航空", code: "JL789", price: 2180 },
                  { airline: "全日空", code: "NH234", price: 2380 },
                ].map((flight, i) => (
                  <div
                    key={i}
                    className={`bg-card border border-input rounded-lg p-6 transition-all ${
                      i === 0 && frame >= 480
                        ? "ring-2 ring-primary shadow-lg"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl">
                          ✈️
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {flight.airline} {flight.code}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            10:00 → 14:30
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ¥{flight.price}
                        </div>
                        <button className="mt-2 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors">
                          {cabinExpanded && i === 0 ? "选择舱位" : "订票"}
                        </button>
                      </div>
                    </div>

                    {/* 舱位选项 (只在第一个航班且展开时显示) */}
                    {cabinExpanded && i === 0 && (
                      <div className="mt-4 pt-4 border-t border-input space-y-2">
                        <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border-2 border-primary">
                          <span className="font-medium text-foreground">
                            经济舱 Economy
                          </span>
                          <span className="text-primary font-semibold">
                            ¥1,580
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground">
                            商务舱 Business
                          </span>
                          <span className="text-foreground">¥5,280</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground">
                            头等舱 First
                          </span>
                          <span className="text-foreground">¥12,800</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
