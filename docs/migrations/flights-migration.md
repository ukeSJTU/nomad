# Flights 域组件迁移

> **批次分配**: 批次1 (search 部分) + 批次3 (booking/orders 部分)
> **组件总数**: 40
> **状态**: 已完成 11 | 进行中 0 | 未开始 29
> **最后更新**: 2026-01-17

## 域概览

Flights 域是最大的域,包含航班业务的所有核心组件:

- **Search** (12 组件): 搜索表单、日期选择、航班列表、历史记录
- **Booking** (13 组件): 预订流程、支付、附加服务
- **Orders** (7 组件): 订单管理、取消/退款
- **Results** (3 组件): 搜索结果展示、筛选
- **Guide** (5 组件): 机场指南、天气信息

**关键挑战**:

- 复杂的状态管理 (搜索参数、选中航班、支付倒计时)
- URL 同步 (搜索参数需要与 URL 保持一致)
- Image 适配器使用 (航班图片、机场图片)
- 倒计时组件模式 (支付截止、订单状态)
- 数据格式化 (价格、日期、时间)

**依赖**:

- 适配层 (批次0) 必须先完成
- Search 部分在批次1,与 common 组件一起建立模式
- Booking/Orders 部分在批次3

**批次划分说明**:

- **批次1**: search 相关组件 (建立 Link/Router 适配模式)
- **批次3**: booking + orders 相关组件 (应用表单和倒计时模式)
- **待定**: results 和 guide 组件 (优先级较低)

---

## 组件清单

### ✅ 已完成并测试

#### ./flights/search/search-form.tsx

- **UI 组件**: `packages/ui/src/components/flights/search/search-form.tsx`
- **容器**: `apps/web/app/_components/flights/search/search-form.tsx`
- **测试**: `packages/ui/src/components/flights/search/search-form.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/search-form.stories.tsx`
- **完成日期**: 2026-01-17

#### ./flights/results/flight-card.tsx

- **UI 组件**: `packages/ui/src/components/flights/results/flight-card.tsx`
- **容器**: `apps/web/app/_components/flights/results/flight-card.tsx`
- **测试**: `packages/ui/src/components/flights/results/flight-card.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/results/flight-card.stories.tsx`
- **完成日期**: 2026-01-17

#### ./flights/search/FlightSearchHeader.tsx

- **UI 组件**: `packages/ui/src/components/flights/search/flight-search-header.tsx`
- **容器**: `apps/web/app/_components/flights/search/FlightSearchHeader.tsx`
- **测试**: `packages/ui/src/components/flights/search/flight-search-header.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/flight-search-header.stories.tsx`
- **完成日期**: 2026-01-17

#### ./flights/search/FlightListOneWay.tsx

- **UI 组件**: `packages/ui/src/components/flights/search/flight-list-one-way.tsx`
- **容器**: `apps/web/app/_components/flights/search/FlightListOneWay.tsx`
- **测试**: `packages/ui/src/components/flights/search/flight-list-one-way.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/flight-list-one-way.stories.tsx`
- **完成日期**: 2026-01-17

#### ./flights/search/FlightListRoundTrip.tsx

- **UI 组件**: `packages/ui/src/components/flights/search/flight-list-round-trip.tsx`
- **容器**: `apps/web/app/_components/flights/search/FlightListRoundTrip.tsx`
- **测试**: `packages/ui/src/components/flights/search/flight-list-round-trip.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/flight-list-round-trip.stories.tsx`
- **完成日期**: 2026-01-17

#### ./flights/search/city-selector.tsx

- **UI 组件**: `packages/ui/src/components/flights/search/city-selector.tsx` + `city-input.tsx`
- **容器**: `apps/web/app/_components/flights/search/city-selector.tsx` (简单 re-export)
- **测试**: `packages/ui/src/components/flights/search/city-selector.test.tsx` + `city-input.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/city-input.stories.tsx`
- **完成日期**: 2026-01-17

#### ./flights/search/date-selector/\* (3个UI组件)

- **UI 组件**:
  - `packages/ui/src/components/flights/search/date-display.tsx`
  - `packages/ui/src/components/flights/search/one-way-selector.tsx`
  - `packages/ui/src/components/flights/search/round-trip-selector.tsx`
- **容器**: `apps/web/app/_components/flights/search/date-selector/date-selector.tsx` (使用 useDateSelector hook)
- **测试**:
  - `packages/ui/src/components/flights/search/date-display.test.tsx`
  - `packages/ui/src/components/flights/search/one-way-selector.test.tsx`
  - `packages/ui/src/components/flights/search/round-trip-selector.test.tsx`
  - `apps/web/app/_components/flights/search/date-selector/date-selector.test.tsx` (容器集成测试)
- **Storybook**:
  - `apps/storybook/src/stories/flights/search/date-display.stories.tsx`
  - `apps/storybook/src/stories/flights/search/one-way-selector.stories.tsx`
  - `apps/storybook/src/stories/flights/search/round-trip-selector.stories.tsx`
- **工具函数**: `apps/web/src/lib/format/date-utils.ts` (getRelativeDateLabel, getWeekdayLabel)
- **完成日期**: 2026-01-17

### 🚧 进行中

(暂无)

### 📋 未开始

---

## 1. Search 子区 (12 组件) - 批次1

### ./flights/search/search-form.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/search/search-form.tsx`
- 复杂度: 高
- 优先级: P0 (核心搜索功能)
- 批次: 1

**依赖问题**

- [x] useEffect: URL 参数处理
- [x] use_client
- [x] 全局副作用

**重构策略**

```
容器职责:
- 管理 URL 搜索参数同步
- 处理表单提交副作用
- 交换出发地/目的地逻辑
- 航线类型切换逻辑

UI 职责:
- 搜索表单渲染
- 受控字段 (tripType, from, to, dates, classType)
- 字段验证错误显示
- 交换按钮 UI

适配器需求:
- 无 (URL 同步在容器)
```

**View Model 接口**
参考 [ARCHITECTURE.md - SearchForm](../../ARCHITECTURE.md#searchform)

**测试要点**

- [x] 字段输入
- [x] 往返/单程切换
- [x] 出发地/目的地交换
- [x] 表单验证
- [x] 提交流程

---

### ./flights/search/quick-date-selector.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/search/quick-date-selector.tsx`
- 复杂度: 高
- 优先级: P0
- 批次: 1

**依赖问题**

- [x] Next.js Router
- [x] Server Action: 获取价格数据
- [x] useEffect
- [x] URLSearchParams 处理

**重构策略**

```
容器职责:
- 调用 action 获取日期价格数据
- 处理 URL 导航
- 管理日期范围切换
- Logger 集成

UI 职责:
- 日期价格列表渲染
- 选中状态视觉反馈
- 上一页/下一页按钮
- Loading 状态

适配器需求:
- 无 (导航通过回调)
```

**View Model 接口**
参考 [ARCHITECTURE.md - QuickDateSelector](../../ARCHITECTURE.md#quickdateselector)

**测试要点**

- [ ] 日期列表渲染
- [ ] 价格显示
- [ ] 选中状态
- [ ] 分页按钮禁用/启用

---

### ./flights/search/FlightListOneWay.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/search/FlightListOneWay.tsx`
- 复杂度: 中
- 优先级: P0
- 批次: 1
- **状态**: ✅ 已完成

**依赖问题**

- [x] Next.js Router
- [x] use_client

**重构策略**

```
容器职责:
- 提供航班列表数据
- 处理航班选择逻辑
- 处理导航到详情页

UI 职责:
- 航班列表渲染
- 选中航班高亮
- 查看详情按钮

适配器需求:
- 无
```

**View Model 接口**
参考 [ARCHITECTURE.md - FlightListOneWay](../../ARCHITECTURE.md#flightlistoneway roundtrip)

**测试要点**

- [x] 航班列表渲染
- [x] 选中交互
- [x] 查看详情按钮

---

### ./flights/search/FlightListRoundTrip.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/search/FlightListRoundTrip.tsx`
- 复杂度: 高
- 优先级: P0
- 批次: 1
- **状态**: ✅ 已完成

**依赖问题**

- [x] Next.js Router
- [x] use_client

**重构策略**

```
同 FlightListOneWay,但需要处理往返航班组合选择

容器职责:
- 转换 FlightSearchResult[] 为 FlightCardProps[]
- 处理去程/返程选择逻辑
- 管理导航到预订页面
- 计算航班数据 (duration, daysOffset)
- 格式化显示数据

UI 职责:
- 渲染航班卡片列表
- 显示空状态
- 接收 activeTab 并传递给子组件
```

**View Model 接口**
参考 [ARCHITECTURE.md - FlightListOneWay/RoundTrip](../../ARCHITECTURE.md#flightlistoneway roundtrip)

**测试要点**

- [x] 去程航班列表渲染
- [x] 返程航班列表渲染
- [x] activeTab 切换
- [x] 空状态显示
- [x] 自定义空状态文本

**完成信息**

- **UI 组件**: `packages/ui/src/components/flights/search/flight-list-round-trip.tsx`
- **容器**: `apps/web/app/_components/flights/search/FlightListRoundTrip.tsx`
- **测试**: `packages/ui/src/components/flights/search/flight-list-round-trip.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/flight-list-round-trip.stories.tsx`
- **完成日期**: 2026-01-17

---

### ./flights/search/FlightSearchHeader.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/search/FlightSearchHeader.tsx`
- 复杂度: 中
- 优先级: P1
- 批次: 1
- **状态**: ✅ 已完成

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 提供格式化的日期和时间字符串
- 提供 UI 文本常量
- 提供 round trip 步骤数字

UI 职责:
- 显示行程信息 (单程/往返)
- 显示城市和日期
- 显示最后更新时间
- 往返时提供标签页切换

适配器需求:
- 无
```

**完成信息**

- **UI 组件**: `packages/ui/src/components/flights/search/flight-search-header.tsx`
- **容器**: `apps/web/app/_components/flights/search/FlightSearchHeader.tsx`
- **测试**: `packages/ui/src/components/flights/search/flight-search-header.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/flight-search-header.stories.tsx`
- **完成日期**: 2026-01-17

---

#### ./flights/search/city-selector.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/search/city-selector.tsx`
- 复杂度: 中
- 优先级: P1
- 批次: 1

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 提供城市列表数据 (从数据源获取)

UI 职责:
- 城市选择器下拉菜单
- 国内/国际切换
- 字母分组/大洲分组标签页
- 城市列表渲染
- CityInput 整合出发地/目的地选择器
```

**完成信息**

- **UI 组件**: `packages/ui/src/components/flights/search/city-selector.tsx` + `city-input.tsx`
- **容器**: `apps/web/app/_components/flights/search/city-selector.tsx` (简单 re-export)
- **测试**: `packages/ui/src/components/flights/search/city-selector.test.tsx` + `city-input.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/city-input.stories.tsx`
- **完成日期**: 2026-01-17

---

### ./flights/search/search-history-section.tsx

**基本信息**

- 复杂度: 中
- 优先级: P2
- 批次: 1

**依赖问题**

- [x] Next.js Link/Router
- [x] Server Action: 获取/清空历史
- [x] use_client

**重构策略**

```
容器职责:
- 调用 action 获取搜索历史
- 处理清空历史
- 处理导航到历史搜索

UI 职责:
- 历史记录列表
- 清空按钮
```

---

### ./flights/search/search-history.tsx

**基本信息**

- 复杂度: 低
- 优先级: P2
- 批次: 1

**依赖问题**

- [x] Next.js Link
- [x] use_client

**重构策略**

```
可能是 search-history-section 的子组件
```

---

### ./flights/search/FlightSearchError.tsx

**基本信息**

- 复杂度: 低
- 优先级: P2
- 批次: 1

**依赖问题**

- 待确认 (可能是纯 UI)

**重构策略**

```
如果是纯展示组件:

UI 职责:
- 错误消息显示
- 重试按钮

Props:
- error: { message: string; code?: string }
- onRetry?: () => void
```

---

## 2. Booking 子区 (13 组件) - 批次3

### ./flights/booking/payment-countdown-timer.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/payment-countdown-timer.tsx`
- 复杂度: 中
- 优先级: P0 (支付流程必需)
- 批次: 3

**依赖问题**

- [x] useEffect: 定时器
- [x] use_client
- [x] 全局副作用

**重构策略**

```
容器职责:
- 倒计时定时器逻辑
- 到期时触发回调
- 可选: 持久化剩余时间

UI 职责:
- 倒计时显示 (MM:SS 格式)
- 到期提示

Props:
- remainingSeconds: number
- onExpire: () => void
- format?: 'MM:SS' | 'HH:MM:SS'
```

**View Model 接口**
参考 [ARCHITECTURE.md - PaymentCountdownTimer](../../ARCHITECTURE.md#paymentcountdowntimer)

**测试要点**

- [ ] 倒计时格式
- [ ] 到期回调
- [ ] 视觉警告 (如 < 5 分钟)

---

### ./flights/booking/payment-method-selector.tsx

**基本信息**

- 复杂度: 低
- 优先级: P0
- 批次: 3

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 提供支付方式列表
- 处理选择回调

UI 职责:
- 支付方式列表渲染
- 选中状态
```

**View Model 接口**
参考 [ARCHITECTURE.md - PaymentMethodSelector](../../ARCHITECTURE.md#paymentmethodselector)

---

### ./flights/booking/ancillary-selection.tsx

**基本信息**

- 复杂度: 中
- 优先级: P1
- 批次: 3

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 定价逻辑
- 数量变更处理
- 总价计算

UI 职责:
- 附加服务列表
- 复选框/数量选择器
- 总价显示
```

**View Model 接口**
参考 [ARCHITECTURE.md - AncillarySelection](../../ARCHITECTURE.md#ancillaryselection)

---

### ./flights/booking/contact-info-card.tsx

**基本信息**

- 复杂度: 中
- 优先级: P1
- 批次: 3

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 表单验证
- 提交逻辑

UI 职责:
- 联系人表单字段
- 错误显示
```

---

### ./flights/booking/passenger-form-card.tsx

**基本信息**

- 复杂度: 中
- 优先级: P1
- 批次: 3

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 乘客信息验证
- 提交处理

UI 职责:
- 乘客表单字段
- 错误显示
```

---

### ./flights/booking/flight-summary-card.tsx

**基本信息**

- 复杂度: 低
- 优先级: P1
- 批次: 3

**依赖问题**

- [x] Image (航班图片)

**重构策略**

```
容器职责:
- 价格格式化 (或使用 utils)

UI 职责:
- 航班摘要卡片
- Image 适配器

适配器需求:
- ImageAdapter
```

---

### Confirmation 子组件 (5个)

**组件列表**:

- confirmation-booking-info.tsx
- confirmation-flight-details.tsx
- confirmation-notice-card.tsx
- confirmation-payment-summary.tsx
- confirmation-success-header.tsx

**基本信息**

- 复杂度: 低
- 优先级: P2
- 批次: 3

**重构策略**

```
这些是预订成功页的展示组件,基本都是纯 UI:

UI 职责:
- 确认信息展示
- 预订详情
- 支付摘要
- 成功提示

Props:
- 各自的 view-model 数据
```

---

### Payment 子组件 (2个)

**组件列表**:

- payment-order-summary.tsx
- payment-price-breakdown.tsx

**基本信息**

- 复杂度: 低
- 优先级: P1
- 批次: 3

**重构策略**

```
纯展示组件:

UI 职责:
- 订单摘要
- 价格明细

容器职责:
- 价格计算/格式化
```

---

## 3. Orders 子区 (7 组件) - 批次3

### ./flights/orders/order-status-card.tsx

**基本信息**

- 复杂度: 中
- 优先级: P1
- 批次: 3

**依赖问题**

- [x] useEffect: 倒计时
- [x] use_client
- [x] 全局副作用

**重构策略**

```
容器职责:
- 计算订单状态
- 计算剩余时间 (如果有倒计时)
- 到期回调处理

UI 职责:
- 状态卡片渲染
- 状态标签
- 倒计时显示
- 触发 onExpire

Props:
- status: string
- remainingSeconds?: number
- onExpire?: () => void
- meta?: Record<string, any>
```

**View Model 接口**
参考 [ARCHITECTURE.md - OrderStatusCard](../../ARCHITECTURE.md#orderstatuscard)

---

### ./flights/orders/order-flight-info.tsx

**基本信息**

- 复杂度: 低
- 优先级: P1
- 批次: 3

**依赖问题**

- [x] Image (航班图片)

**重构策略**

```
容器职责:
- 提供航班 view-model

UI 职责:
- 航班信息展示
- Image 适配器

适配器需求:
- ImageAdapter
```

---

### ./flights/orders/cancel-order-dialog.tsx

**基本信息**

- 复杂度: 低
- 优先级: P2
- 批次: 3

**依赖问题**

- 待确认 (可能是纯 UI)

**重构策略**

```
容器职责:
- 处理取消订单 action
- 确认逻辑

UI 职责:
- 对话框
- 确认/取消按钮
```

---

### ./flights/orders/refund-order-dialog.tsx

**基本信息**

- 复杂度: 低
- 优先级: P2
- 批次: 3

**重构策略**

```
同 cancel-order-dialog
```

---

### 其他 Orders 组件 (3个)

**组件列表**:

- order-contact-info.tsx
- order-passenger-info.tsx
- order-payment-details.tsx

**重构策略**

```
纯展示组件:

UI 职责:
- 显示订单相关信息

Props:
- 各自的 view-model 数据
```

---

## 4. Results 子区 (3 组件) - 优先级较低

### ./flights/results/flight-card.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/results/flight-card.tsx`
- 复杂度: 中
- 优先级: P1
- 批次: 待定
- **状态**: ✅ 已完成 (2026-01-17)

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 注入 formatCurrency 工具函数

UI 职责:
- 航班卡片渲染
- 单/多舱位模式切换
- 展开/收起交互
- 所有视觉交互

Props:
- 航班数据 (airlineName, flightNumber, etc.)
- formatCurrency: (value: number) => string
- onButtonClick?: () => void
- onSeatClassClick?: (seatClass: SeatClassOption) => void
```

**迁移完成**

- ✅ UI 组件: `packages/ui/src/components/flights/results/flight-card.tsx`
- ✅ 容器: `apps/web/app/_components/flights/results/flight-card.tsx`
- ✅ 测试: `packages/ui/src/components/flights/results/flight-card.test.tsx` (25 tests)
- ✅ Storybook: `apps/storybook/src/stories/flights/results/flight-card.stories.tsx`

---

### ./flights/results/flight-filter-sort.tsx

**基本信息**

- 复杂度: 中
- 优先级: P1
- 批次: 待定

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 管理筛选/排序状态
- URL 同步

UI 职责:
- 筛选/排序 UI
- 受控状态
```

**View Model 接口**
参考 [ARCHITECTURE.md - FlightFilterSort](../../ARCHITECTURE.md#flightfiltersort)

---

### ./flights/results/flight-card-skeleton.tsx

**基本信息**

- 复杂度: 低
- 优先级: P2
- 批次: 待定

**重构策略**

```
纯 UI 组件:
- Skeleton 加载状态
```

---

## 5. Guide 子区 (5 组件) - 优先级较低

### Airport 相关 (3个)

**组件列表**:

- guide/airport-list.tsx
- guide/airport-sidebar.tsx
- guide/boarding-process-card.tsx

**基本信息**

- 复杂度: 低
- 优先级: P3
- 批次: 待定

**依赖问题**

- [x] Next.js Link

**重构策略**

```
容器职责:
- 提供机场数据

UI 职责:
- 机场列表/侧边栏/流程卡片
- Link 适配器

适配器需求:
- LinkAdapter
```

---

### 其他 Guide 组件 (2个)

**组件列表**:

- guide/guide-sidebar.tsx
- guide/weather-card.tsx

**基本信息**

- 复杂度: 低
- 优先级: P3
- 批次: 待定

**重构策略**

```
纯展示组件:
- 指南侧边栏
- 天气卡片
```

---

## 域级决策

### URL 同步策略

所有搜索相关组件应:

- 容器负责 URL searchParams 的读写
- UI 组件不直接访问 URL
- 状态变更通过回调,容器更新 URL

### 倒计时组件模式

payment-countdown-timer 和 order-status-card 建立的模式:

- 容器管理定时器逻辑
- UI 只接收 remainingSeconds 和 onExpire
- 格式化可以在 UI 层(如 MM:SS 格式)

### Image 适配器使用

flight-summary-card 和 order-flight-info 等:

- 通过 useUiComponents 获取 Image
- 航班图片、机场图片统一使用适配器
- 容器提供图片 URL,UI 负责渲染

### 数据格式化

价格、日期、时间等:

- 创建 utils (formatPrice, formatDate, formatTime)
- UI 接收已格式化的字符串,或接收原始值 + formatter 函数
- 保持 UI 组件纯粹

---

## 迁移检查清单

### 批次1 (Search)

- [ ] 所有 search 组件迁移到 packages/ui
- [ ] 容器组件在 apps/web 实现
- [ ] URL 同步模式建立
- [ ] 单元测试覆盖

### 批次3 (Booking/Orders)

- [ ] 所有 booking/orders 组件迁移到 packages/ui
- [ ] 倒计时模式应用
- [ ] 表单模式应用 (contact-info, passenger-form)
- [ ] 单元测试覆盖

### 全域

- [ ] Image 适配器在所有需要的组件中正确使用
- [ ] 在 apps/demo 中验证可用性
- [ ] 文档更新

---

## 进度统计

| 子区     | 总数   | 已完成 | 进行中 | 未开始 | 批次  |
| -------- | ------ | ------ | ------ | ------ | ----- |
| Search   | 12     | 0      | 0      | 12     | 批次1 |
| Booking  | 13     | 0      | 0      | 13     | 批次3 |
| Orders   | 7      | 0      | 0      | 7      | 批次3 |
| Results  | 3      | 0      | 0      | 3      | 待定  |
| Guide    | 5      | 0      | 0      | 5      | 待定  |
| **总计** | **40** | **0**  | **0**  | **40** | -     |

---

## 下一步行动

### 批次1优先级

1. search-form.tsx (核心搜索)
2. quick-date-selector.tsx (核心搜索)
3. FlightListOneWay/RoundTrip.tsx (结果展示)
4. FlightSearchHeader.tsx
5. 其他 search 组件

### 批次3优先级

1. payment-countdown-timer.tsx (支付必需)
2. payment-method-selector.tsx
3. contact-info-card.tsx + passenger-form-card.tsx (表单)
4. order-status-card.tsx (订单管理)
5. 其他 booking/orders 组件

---

## 参考

- [架构指南](../../ARCHITECTURE.md)
- [总览](../../TODO.md)
- **批次协调**: Search 在批次1与 common 一起完成,Booking/Orders 在批次3与 passengers 一起完成
