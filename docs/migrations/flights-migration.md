# Flights 域组件迁移

> **批次分配**: 批次1 (search 部分) + 批次3 (booking/orders 部分)
> **组件总数**: 40
> **状态**: 已完成 30 | 进行中 0 | 未开始 10
> **最后更新**: 2026-01-18

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

#### ./flights/booking/confirmation-booking-info.tsx

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-booking-info.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-booking-info.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-booking-info.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-booking-info.stories.tsx`
- **完成日期**: 2026-01-18

#### ./flights/booking/confirmation-flight-details.tsx

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-flight-details.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-flight-details.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-flight-details.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-flight-details.stories.tsx`
- **完成日期**: 2026-01-18

#### ./flights/booking/confirmation-success-header.tsx

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-success-header.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-success-header.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-success-header.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-success-header.stories.tsx`
- **完成日期**: 2026-01-18

#### ./flights/booking/confirmation-notice-card.tsx

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-notice-card.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-notice-card.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-notice-card.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-notice-card.stories.tsx`
- **完成日期**: 2026-01-18

#### ./flights/booking/confirmation-payment-summary.tsx

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-payment-summary.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-payment-summary.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-payment-summary.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-payment-summary.stories.tsx`
- **完成日期**: 2026-01-18

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

- [x] 日期列表渲染
- [x] 价格显示
- [x] 选中状态
- [x] 分页按钮禁用/启用

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
- **状态**: ✅ 已完成

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
- 格式化价格和日期
- 计算价格状态

UI 职责:
- 历史记录列表渲染
- 清空按钮
- 空状态展示
```

**迁移详情**:

- **UI 组件**: `packages/ui/src/components/flights/search/search-history-section.tsx`
- **容器**: `apps/web/app/_components/flights/search/search-history-section.tsx`
- **测试**: `packages/ui/src/components/flights/search/search-history-section.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/search-history-section.stories.tsx`
- **完成日期**: 2026-01-18

---

### ./flights/search/search-history.tsx

**基本信息**

- 复杂度: 低
- 优先级: P2
- 批次: 1
- **状态**: ✅ 已完成

**依赖问题**

- [x] Next.js Link
- [x] use_client

**重构策略**

```
容器职责:
- 处理点击导航
- 格式化价格和日期
- 计算价格状态 (降价/涨价/稳定)

UI 职责:
- 搜索历史卡片渲染
- 航线展示 (单程/往返)
- 价格和价格状态展示
```

**迁移详情**:

- **UI 组件**: `packages/ui/src/components/flights/search/search-history-card.tsx`
- **容器**: `apps/web/app/_components/flights/search/search-history.tsx`
- **测试**: `packages/ui/src/components/flights/search/search-history-card.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/search-history-card.stories.tsx`
- **完成日期**: 2026-01-18

---

### ./flights/search/FlightSearchError.tsx

- **UI 组件**: `packages/ui/src/components/flights/search/flight-search-error.tsx`
- **容器**: `apps/web/app/_components/flights/search/FlightSearchError.tsx` (简单 re-export)
- **测试**: `packages/ui/src/components/flights/search/flight-search-error.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/search/flight-search-error.stories.tsx`
- **完成日期**: 2026-01-17

**重构说明**:

- 纯 UI 组件，无 Next.js 依赖
- 受控 props: `message` (string) 和 `onRetry` (callback)
- 使用 Alert 和 Button 基础组件
- 测试覆盖: 默认消息、自定义消息、有/无重试按钮、点击事件

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

- 路径: `apps/web/app/_components/flights/booking/payment-method-selector.tsx`
- 复杂度: 低
- 优先级: P0
- 批次: 3
- **状态**: ✅ 已完成

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 格式化用户余额 (使用 formatCurrency)
- 处理支付方式变更回调

UI 职责:
- 支付方式列表渲染 (平台余额、微信支付、支付宝)
- 显示用户余额（已格式化）
- 显示不可用选项的禁用状态
- 受控 Radio Group 交互
```

**完成信息**

- **UI 组件**: `packages/ui/src/components/flights/booking/payment-method-selector.tsx`
- **容器**: `apps/web/app/_components/flights/booking/payment-method-selector.tsx`
- **测试**: `packages/ui/src/components/flights/booking/payment-method-selector.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/payment-method-selector.stories.tsx`
- **完成日期**: 2026-01-18

---

#### ./flights/booking/ancillary-selection.tsx

**基本信息**

- 复杂度: 中
- 优先级: P1
- 批次: 3
- **状态**: ✅ 已完成

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 提供服务数据 (getAncillaryServicesByCategory)
- 价格格式化 (formatCurrency)

UI 职责:
- 附加服务列表渲染
- 按类别分组展示 (保险/接送机/餐食)
- 复选框选择交互
- 服务详情显示 (名称/描述/价格)
```

**完成信息**

- **UI 组件**: `packages/ui/src/components/flights/booking/ancillary-selection.tsx`
- **容器**: `apps/web/app/_components/flights/booking/ancillary-selection.tsx`
- **测试**: `packages/ui/src/components/flights/booking/ancillary-selection.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/ancillary-selection.stories.tsx`
- **完成日期**: 2026-01-18

---

### ./flights/booking/contact-info-card.tsx

**基本信息**

- 复杂度: 中
- 优先级: P1
- 批次: 3
- **状态**: ✅ 已完成

**依赖问题**

- [x] use_client
- [x] Zod validation schemas

**重构策略**

```
容器职责:
- 表单验证逻辑 (validateContactInfo 函数)
- 使用 Zod schemas (emailSchema, phoneNumberSchema)
- 处理验证错误消息生成

UI 职责:
- 联系方式选择 (邮箱/手机 radio group)
- 邮箱/手机输入字段渲染
- 错误消息显示
- 受控状态管理
```

**完成信息**

- **UI 组件**: `packages/ui/src/components/flights/booking/contact-info-card.tsx`
- **容器**: `apps/web/app/_components/flights/booking/contact-info-card.tsx`
- **测试**:
  - UI 测试: `packages/ui/src/components/flights/booking/contact-info-card.test.tsx` (31 tests)
  - 容器测试: `apps/web/app/_components/flights/booking/contact-info-card.test.tsx` (27 validation tests)
- **Storybook**: `apps/storybook/src/stories/flights/booking/contact-info-card.stories.tsx`
- **完成日期**: 2026-01-18

**测试要点**

- [x] 联系方式切换 (邮箱/手机)
- [x] 输入字段显示逻辑
- [x] 错误消息显示和样式
- [x] 验证函数对邮箱格式的检测
- [x] 验证函数对手机号格式的检测 (11位，1开头，3-9为第二位)
- [x] 空值和空格的验证
- [x] 方法特定验证 (仅验证选中的联系方式)

---

#### ./flights/booking/passenger-form-card.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/passenger-form-card.tsx`
- 复杂度: 中
- 优先级: P1
- 批次: 3
- **状态**: ✅ 已完成 (2026-01-18)

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 提供 shouldShowDeleteButton 逻辑（从 use-passenger-forms hook）
- 组装 props

UI 职责:
- 乘机人表单卡片整体布局
- 快速选择已保存乘客（QuickPassengerSelect）
- 乘客信息表单（PassengerInfoForm）
- 表单验证错误显示
- 新增乘机人按钮
```

**迁移结果**

- **UI 组件**: `packages/ui/src/components/flights/booking/passenger-form-card.tsx`
- **容器**: `apps/web/app/_components/flights/booking/passenger-form-card.tsx`
- **测试**: `packages/ui/src/components/flights/booking/passenger-form-card.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/passenger-form-card.stories.tsx`

**测试要点**

- [x] QuickPassengerSelect: 无保存乘客时不显示
- [x] QuickPassengerSelect: 渲染已保存乘客为可选择的 chip
- [x] QuickPassengerSelect: 标记已选择乘客为 checked
- [x] QuickPassengerSelect: 点击乘客时调用 onTogglePassenger
- [x] QuickPassengerSelect: 超过 5 位乘客时显示"更多"按钮
- [x] PassengerInfoForm: 渲染乘客表单及数据
- [x] PassengerInfoForm: 显示乘客编号
- [x] PassengerInfoForm: 根据 showRemove 显示/隐藏删除按钮
- [x] PassengerInfoForm: 名称输入改变时调用 onChange
- [x] PassengerInfoForm: 证件号改变时调用 onChange
- [x] PassengerInfoForm: 电话号码改变时调用 onChange
- [x] PassengerInfoForm: 点击删除按钮时调用 onRemove
- [x] PassengerFormCard: 渲染卡片标题
- [x] PassengerFormCard: 有保存乘客时渲染快速选择
- [x] PassengerFormCard: 无保存乘客时不渲染快速选择
- [x] PassengerFormCard: 渲染所有乘客表单
- [x] PassengerFormCard: 表单字段改变时调用 onChange（带正确索引）
- [x] PassengerFormCard: 点击新增按钮时调用 onAddPassenger
- [x] PassengerFormCard: 点击删除时调用 onRemovePassenger（带正确索引）
- [x] PassengerFormCard: 使用默认 showDeleteButton 逻辑（未提供时）
- [x] PassengerFormCard: 使用自定义 showDeleteButton 逻辑（提供时）

**实现笔记**

- 组件拆分为三个独立的具名导出：PassengerFormCard、QuickPassengerSelect、PassengerInfoForm
- showDeleteButton 作为可选 props 注入，默认逻辑：单个空表单不显示删除，多个表单或有数据的表单显示删除
- 容器组件负责提供 shouldShowDeleteButton 函数（来自 use-passenger-forms hook）
- SavedPassenger 和 PassengerFormData 类型在 UI 组件中定义并导出
- 测试覆盖率 100%，22 个测试用例全部通过

---

### ./flights/booking/flight-summary-card.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/flight-summary-card.tsx`
- 复杂度: 低
- 优先级: P1
- 批次: 3
- **状态**: ✅ 已完成

**依赖问题**

- [x] Image (航班图片) - 使用 useUiComponents

**重构策略**

```
容器职责:
- 提供价格格式化函数 (formatCurrency)
- 提供日期格式化函数 (formatDateWithWeekday)

UI 职责:
- 航班摘要卡片渲染
- 往返航班信息展示
- 价格计算与显示
- Image 适配器使用

适配器需求:
- ImageAdapter (用于航空公司 logo)
```

**测试要点**

- [x] 单程/往返航班渲染
- [x] 价格计算与显示
- [x] 乘客人数计算
- [x] 航空公司 logo 显示
- [x] 舱位类型显示
- [x] 航班时间与时长显示
- [x] 空状态处理 (null outboundFlight)

**完成内容**

- **UI 组件**: `packages/ui/src/components/flights/booking/flight-summary-card.tsx`
- **容器**: `apps/web/app/_components/flights/booking/flight-summary-card.tsx`
- **测试**: `packages/ui/src/components/flights/booking/flight-summary-card.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/flight-summary-card.stories.tsx`
- **完成日期**: 2026-01-18

---

### Confirmation 子组件 (5个)

**组件列表**:

- ✅ confirmation-booking-info.tsx
- ✅ confirmation-flight-details.tsx
- ✅ confirmation-notice-card.tsx
- ✅ confirmation-payment-summary.tsx
- ✅ confirmation-success-header.tsx

**基本信息**

- 复杂度: 低
- 优先级: P2
- 批次: 3
- **状态**: ✅ 全部完成 (5/5) - 2026-01-18

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

#### ./flights/booking/confirmation-booking-info.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/confirmation-booking-info.tsx`
- 复杂度: 低
- 优先级: P2
- 批次: 3
- **状态**: ✅ 已完成 (2026-01-18)

**依赖问题**

- [x] getAncillaryServiceByCode 调用
- [x] 无副作用

**重构策略**

```
容器职责:
- 调用 getAncillaryServiceByCode 获取增值服务详情
- 转换价格类型 (number -> string)

UI 职责:
- 乘机人信息展示
- 联系人信息展示
- 增值服务列表展示
```

**迁移结果**

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-booking-info.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-booking-info.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-booking-info.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-booking-info.stories.tsx`

**测试要点**

- [x] 乘机人信息渲染
- [x] 联系人信息渲染
- [x] 增值服务列表渲染
- [x] 无增值服务时不渲染该区域
- [x] 多种证件类型支持

---

#### ./flights/booking/confirmation-flight-details.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/confirmation-flight-details.tsx`
- 复杂度: 低
- 优先级: P2
- 批次: 3
- **状态**: ✅ 已完成 (2026-01-18)

**依赖问题**

- [x] date-fns 格式化
- [x] 日志记录

**重构策略**

```
容器职责:
- 格式化日期时间 (date-fns)
- 日志记录 (createClientLogger)
- 映射 ConfirmationPageFlight 到 UI props

UI 职责:
- 去程航班详情展示
- 返程航班详情展示 (可选)
- 航班号/航空公司/机型/舱位显示
- 出发/到达信息显示
```

**迁移结果**

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-flight-details.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-flight-details.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-flight-details.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-flight-details.stories.tsx`

**测试要点**

- [x] 单程航班渲染
- [x] 往返航班渲染
- [x] 无返程时不渲染返程区域
- [x] 不同舱位类型正确显示
- [x] 无机型/航站楼信息时正确处理

---

#### ./flights/booking/confirmation-success-header.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/confirmation-success-header.tsx`
- 复杂度: 低
- 优先级: P2
- 批次: 3
- **状态**: ✅ 已完成 (2026-01-18)

**依赖问题**

- [x] 无 Next.js 依赖
- [x] 无副作用

**重构策略**

```
纯展示组件:

UI 职责:
- 成功提示头部渲染
- 订单号显示
- 成功图标与样式

容器职责:
- 简单 re-export (无额外逻辑)
```

**迁移结果**

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-success-header.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-success-header.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-success-header.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-success-header.stories.tsx`

**测试要点**

- [x] 成功消息渲染
- [x] 订单号渲染
- [x] 成功状态样式
- [x] 图标渲染

---

#### ./flights/booking/confirmation-notice-card.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/confirmation-notice-card.tsx`
- 复杂度: 低
- 优先级: P2
- 批次: 3
- **状态**: ✅ 已完成 (2026-01-18)

**依赖问题**

- [x] 无 Next.js 依赖
- [x] 无副作用

**重构策略**

```
纯展示组件，静态内容:

UI 职责:
- 温馨提示卡片渲染
- 注意事项列表展示
- 支持自定义标题和提示内容

容器职责:
- 简单 re-export (无额外逻辑)
```

**迁移结果**

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-notice-card.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-notice-card.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-notice-card.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-notice-card.stories.tsx`

**测试要点**

- [x] 默认标题和提示内容渲染
- [x] 自定义标题渲染
- [x] 自定义提示列表渲染
- [x] 空提示列表时正确渲染
- [x] 样式类正确应用

---

#### ./flights/booking/confirmation-payment-summary.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/confirmation-payment-summary.tsx`
- 复杂度: 低
- 优先级: P2
- 批次: 3
- **状态**: ✅ 已完成 (2026-01-18)

**依赖问题**

- [x] 货币格式化 (formatCurrencyWithoutSymbol)
- [x] 日期格式化 (date-fns)

**重构策略**

```
容器职责:
- 调用 formatCurrencyWithoutSymbol 格式化金额
- 格式化支付时间 (date-fns)
- 检查是否有增值服务费用

UI 职责:
- 费用明细渲染
- 机票费用/增值服务/总额展示
- 支付时间显示 (可选)
- 金额高亮样式
```

**迁移结果**

- **UI 组件**: `packages/ui/src/components/flights/booking/confirmation-payment-summary.tsx`
- **容器**: `apps/web/app/_components/flights/booking/confirmation-payment-summary.tsx`
- **测试**: `packages/ui/src/components/flights/booking/confirmation-payment-summary.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/confirmation-payment-summary.stories.tsx`

**测试要点**

- [x] 基础机票费用和总额渲染
- [x] 有增值服务时显示增值服务费用
- [x] 增值服务费用为0时隐藏
- [x] 增值服务费用为空字符串时隐藏
- [x] 支付信息和时间渲染 (当提供时)
- [x] 无支付信息时不显示支付时间
- [x] 无格式化时间时不显示支付时间
- [x] 总金额高亮样式 (橙色)
- [x] 分隔线正确渲染

---

### Payment 子组件 (2个)

**组件列表**:

- ✅ payment-order-summary.tsx
- ✅ payment-price-breakdown.tsx

#### ./flights/booking/payment-order-summary.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/payment-order-summary.tsx`
- 复杂度: 低
- 优先级: P1
- 批次: 3
- **状态**: ✅ 已完成 (2026-01-18)

**依赖问题**

- [x] 数据格式化 (日期/时间)
- [x] getAncillaryServiceByCode 调用

**重构策略**

```
容器职责:
- 调用 getAncillaryServiceByCode 获取增值服务详情
- 格式化日期 (formatFlightDate)
- 格式化时间 (formatFlightTime)
- 映射 PaymentPageOrder 到 UI props

UI 职责:
- 订单信息卡片渲染
- 去程/返程航班信息展示
- 乘机人列表展示
- 联系人信息展示
- 增值服务列表展示
```

**迁移结果**

- **UI 组件**: `packages/ui/src/components/flights/booking/payment-order-summary.tsx`
- **容器**: `apps/web/app/_components/flights/booking/payment-order-summary.tsx`
- **测试**: `packages/ui/src/components/flights/booking/payment-order-summary.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/payment-order-summary.stories.tsx`

**测试要点**

- [x] 去程航班信息渲染
- [x] 返程航班信息渲染 (可选)
- [x] 返程航班不存在时不渲染返程区域
- [x] 乘机人列表渲染
- [x] 联系人信息渲染 (电话/邮箱)
- [x] 仅电话或仅邮箱时正确渲染
- [x] 增值服务列表渲染 (可选)
- [x] 增值服务为空时不渲染增值服务区域
- [x] 所有数据完整时渲染所有区域

---

#### ./flights/booking/payment-price-breakdown.tsx

**基本信息**

- 路径: `apps/web/app/_components/flights/booking/payment-price-breakdown.tsx`
- 复杂度: 低
- 优先级: P1
- 批次: 3
- **状态**: ✅ 已完成 (2026-01-18)

**依赖问题**

- [x] 无 Next.js 依赖
- [x] 无副作用

**重构策略**

```
纯展示组件:

UI 职责:
- 费用明细卡片渲染
- 订单号/机票费用/增值服务/总金额显示
- 余额支付时显示账户余额与支付后余额
- 余额不足时显示警告

容器职责:
- 格式化货币金额 (formatCurrency)
- 计算支付后余额
- 判断余额是否充足
- 判断是否显示增值服务项
```

**迁移结果**

- **UI 组件**: `packages/ui/src/components/flights/booking/payment-price-breakdown.tsx`
- **容器**: `apps/web/app/_components/flights/booking/payment-price-breakdown.tsx`
- **测试**: `packages/ui/src/components/flights/booking/payment-price-breakdown.test.tsx`
- **Storybook**: `apps/storybook/src/stories/flights/booking/payment-price-breakdown.stories.tsx`

**测试要点**

- [x] 订单号渲染
- [x] 基础金额渲染
- [x] 增值服务金额渲染 (当 > 0)
- [x] 增值服务不渲染 (当 = 0)
- [x] 总金额渲染
- [x] 非余额支付不显示余额信息
- [x] 余额支付显示余额信息
- [x] 余额不足显示警告
- [x] 余额充足不显示警告
- [x] 余额不足时红色文字
- [x] 余额充足时蓝色文字

---

### Payment 其他组件

(所有组件已完成迁移)

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
- 批次: 批次1
- **状态**: ✅ 已完成 (2026-01-18)

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 管理筛选/排序状态
- 提取航空公司列表
- 过滤和排序逻辑
- 通知父组件结果变化

UI 职责:
- 筛选/排序 UI 渲染
- 受控状态展示
- 回调：onFiltersChange, onSortChange
```

**View Model 接口**
参考 [ARCHITECTURE.md - FlightFilterSort](../../ARCHITECTURE.md#flightfiltersort)

**迁移完成**

- ✅ UI 组件: `packages/ui/src/components/flights/results/flight-filter-sort.tsx`
- ✅ 容器: `apps/web/app/_components/flights/results/flight-filter-sort.tsx`
- ✅ 测试: `packages/ui/src/components/flights/results/flight-filter-sort.test.tsx` (14 tests)
- ✅ Storybook: `apps/storybook/src/stories/flights/results/flight-filter-sort.stories.tsx`

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

| 子区     | 总数   | 已完成 | 进行中 | 未开始 | 批次   |
| -------- | ------ | ------ | ------ | ------ | ------ |
| Search   | 12     | 12     | 0      | 0      | 批次1  |
| Booking  | 13     | 13     | 0      | 0      | 批次3  |
| Orders   | 7      | 0      | 0      | 7      | 批次3  |
| Results  | 3      | 1      | 0      | 2      | 待定   |
| Guide    | 5      | 5      | 0      | 0      | 已完成 |
| **总计** | **40** | **31** | **0**  | **9**  | -      |

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
