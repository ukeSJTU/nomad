# 组件迁移重构 - 总览

> **项目目标**: 将 apps/web/app/\_components 的自定义组件迁移到 packages/ui，实现 UI 与 Next.js 逻辑的彻底分离

## 快速导航

### 核心文档

- [ARCHITECTURE.md](./ARCHITECTURE.md) - 架构设计、模式策略、View Models、适配器接口

### 域迁移文档

- [Auth 域迁移](./docs/migrations/auth-migration.md) - 13 组件 (登录/注册/验证) - 批次2
- [Common 域迁移](./docs/migrations/common-migration.md) - 12 组件 (导航/通用) - 批次1
- [Flights 域迁移](./docs/migrations/flights-migration.md) - 40 组件 (搜索/订舱/订单) - 批次1+3
- [Passengers 域迁移](./docs/migrations/passengers-migration.md) - 4 组件 (乘客管理) - 批次3
- [Security 域迁移](./docs/migrations/security-migration.md) - 4 组件 (安全设置) - 批次4
- [User 域迁移](./docs/migrations/user-migration.md) - 8 组件 (用户信息) - 批次4

---

## 进度 Dashboard

### 总体进度

| 域             | 组件数 | 已完成 | 进行中 | 未开始 | 跳过  | 批次    | 优先级 |
| -------------- | ------ | ------ | ------ | ------ | ----- | ------- | ------ |
| **Common**     | 12     | 11     | 0      | 0      | 1     | 批次1   | 高     |
| **Auth**       | 13     | 0      | 0      | 13     | 0     | 批次2   | 高     |
| **Flights**    | 40     | 33     | 0      | 7      | 0     | 批次1+3 | 中     |
| **Passengers** | 4      | 4      | 0      | 0      | 0     | 批次3   | 低     |
| **Security**   | 4      | 4      | 0      | 0      | 0     | 批次4   | 低     |
| **User**       | 8      | 3      | 0      | 5      | 0     | 批次4   | 低     |
| **总计**       | **81** | **55** | **0**  | **25** | **1** | -       | -      |

**完成度**: 68.75% (55/80 可迁移组件)

### 已完成组件

**Common (11/11 可迁移)**:

- [x] SiteHeader - packages/ui/src/components/common/site-header.tsx
- [x] Footer - packages/ui/src/components/common/footer.tsx
- [x] AppSidebar - packages/ui/src/components/common/app-sidebar.tsx
- [x] BreadcrumbNav - packages/ui/src/components/common/breadcrumb-nav.tsx
- [x] UserMenu - packages/ui/src/components/common/user-menu.tsx
- [x] DataTableWithActions - packages/ui/src/components/common/data-table-with-actions.tsx
- [x] SearchBar - packages/ui/src/components/common/search-bar.tsx
- [x] Stepper - packages/ui/src/components/common/stepper.tsx
- [x] ErrorDisplay - packages/ui/src/components/common/error-display.tsx
- [x] UnderConstruction - packages/ui/src/components/common/under-construction.tsx
- [~] DevUserSwitcher - 不迁移 (仅开发环境使用)

**Passengers (4/4)**:

- [x] PassengerForm - packages/ui/src/components/passengers/passenger-form.tsx
- [x] PassengerList - packages/ui/src/components/passengers/passenger-list.tsx
- [x] PassengersDataTable - packages/ui/src/components/passengers/passengers-data-table.tsx
- [x] PassengerDetailView - packages/ui/src/components/passengers/passenger-detail-view.tsx

**Security (4/4)**:

- [x] ChangePasswordForm - packages/ui/src/components/security/change-password-form.tsx
- [x] UpdateEmailForm - packages/ui/src/components/security/update-email-form.tsx
- [x] UpdatePhoneForm - packages/ui/src/components/security/update-phone-form.tsx
- [x] SecurityItem - packages/ui/src/components/security/security-item.tsx

**User (3/8)**:

- [x] AddressForm - packages/ui/src/components/user/address/address-form.tsx
- [x] AddressList - packages/ui/src/components/user/address/address-list.tsx
- [x] UserInfoEditForm - packages/ui/src/components/user/user-info-edit-form.tsx

**Flights (32/40)**:

- [x] AirportList - packages/ui/src/components/flights/guide/airport-list.tsx
- [x] DatePriceSelector - packages/ui/src/components/flights/search/date-price-selector.tsx
- [x] SearchForm - packages/ui/src/components/flights/search/search-form.tsx
- [x] FlightCard - packages/ui/src/components/flights/results/flight-card.tsx
- [x] FlightCardSkeleton - packages/ui/src/components/flights/results/flight-card-skeleton.tsx
- [x] FlightFilterSort - packages/ui/src/components/flights/results/flight-filter-sort.tsx
- [x] QuickDateSelector - packages/ui/src/components/flights/search/date-price-selector.tsx (UI) + apps/web/app/\_components/flights/search/quick-date-selector.tsx (容器)
- [x] FlightSearchHeader - packages/ui/src/components/flights/search/flight-search-header.tsx
- [x] FlightListOneWay - packages/ui/src/components/flights/search/flight-list-one-way.tsx
- [x] FlightListRoundTrip - packages/ui/src/components/flights/search/flight-list-round-trip.tsx
- [x] CitySelector + CityInput - packages/ui/src/components/flights/search/city-selector.tsx + city-input.tsx
- [x] DateDisplay - packages/ui/src/components/flights/search/date-display.tsx
- [x] OneWaySelector - packages/ui/src/components/flights/search/one-way-selector.tsx
- [x] RoundTripSelector - packages/ui/src/components/flights/search/round-trip-selector.tsx
- [x] FlightSearchError - packages/ui/src/components/flights/search/flight-search-error.tsx
- [x] SearchHistoryCard - packages/ui/src/components/flights/search/search-history-card.tsx
- [x] SearchHistorySection - packages/ui/src/components/flights/search/search-history-section.tsx
- [x] PaymentCountdownTimer - packages/ui/src/components/flights/booking/payment-countdown-timer.tsx
- [x] PaymentPriceBreakdown - packages/ui/src/components/flights/booking/payment-price-breakdown.tsx
- [x] PaymentOrderSummary - packages/ui/src/components/flights/booking/payment-order-summary.tsx
- [x] PaymentMethodSelector - packages/ui/src/components/flights/booking/payment-method-selector.tsx
- [x] AncillarySelection - packages/ui/src/components/flights/booking/ancillary-selection.tsx
- [x] ContactInfoCard - packages/ui/src/components/flights/booking/contact-info-card.tsx
- [x] PassengerFormCard - packages/ui/src/components/flights/booking/passenger-form-card.tsx
- [x] FlightSummaryCard - packages/ui/src/components/flights/booking/flight-summary-card.tsx
- [x] ConfirmationNoticeCard - packages/ui/src/components/flights/booking/confirmation-notice-card.tsx
- [x] ConfirmationPaymentSummary - packages/ui/src/components/flights/booking/confirmation-payment-summary.tsx
- [x] WeatherCard - packages/ui/src/components/flights/guide/weather-card.tsx
- [x] AirportGuide (AirportSidebar) - packages/ui/src/components/flights/guide/airport-guide.tsx
- [x] AirportWeather - packages/ui/src/components/flights/guide/airport-weather.tsx
- [x] BoardingProcessCard - packages/ui/src/components/flights/guide/boarding-process-card.tsx
- [x] DestinationGuide (GuideSidebar) - packages/ui/src/components/flights/guide/destination-guide.tsx
- [x] OrderFlightInfo - packages/ui/src/components/flights/orders/order-flight-info.tsx
- [x] CancelOrderDialog - packages/ui/src/components/flights/orders/cancel-order-dialog.tsx
- [x] CancelOrderDialog - packages/ui/src/components/flights/orders/cancel-order-dialog.tsx

| **批次0** | 适配层 | - | 100% | 已完成 |
| **批次1** | Common + Flights Search | 24 | 95.8% | 进行中 |
| **批次2** | Auth 认证链路 | 13 | 0% | 待启动 |
| **批次3** | Flights Booking/Orders + Passengers | 24 | 0% | 待启动 |
| **批次4** | User + Security | 12 | 41.7% | 进行中 |
| **批次1** | Common + Flights Search | 24 | 95.8% | 进行中 |
| **批次2** | Auth 认证链路 | 13 | 0% | 待启动 |
| **批次3** | Flights Booking/Orders + Passengers | 24 | 0% | 待启动 |
| **批次4** | User + Security | 12 | 0% | 待启动 |

---

## 批次计划

### 批次0: 适配层落地 [已完成]

**交付内容**:

- [x] UiProvider 实现 (packages/ui/src/platform.tsx)
- [x] LinkAdapter 默认实现 (`<a>`)
- [x] ImageAdapter 默认实现 (`<img>`)
- [x] Next.js 适配器实现 (apps/web)
- [x] useUiComponents hook
- [x] 类型定义 (LinkProps, ImageProps)

---

### 批次1: Common 基础 + Flights 搜索核心

**目标**: 建立 Link/Image 适配器使用模式

**范围**:

- **Common** (已全部完成): 11 个组件已迁移完成，dev-user-switcher 不迁移
- **Flights Search** (2 组件待完成): search-history-section, search-history

**关键模式**:

- Link 适配器用于导航链接
- Image 适配器用于图片优化
- 回调函数处理命令式导航
- URL 同步在容器层
- 数据表格完全受控模式

---

### 批次2: Auth 认证链路

**目标**: 建立受控表单模式和 OTP 倒计时模式

**范围**:

- **Auth** (13 组件): unified-login, unified-signup, password-setup, phone-verification, email-verification, otp-input, registration-success, sign-up-modal, social-account-card, link-button, unlink-button, user-sidebar, turnstile

**关键模式**:

- 受控表单 (react-hook-form + zod 在容器)
- useOtpCountdown 自定义 hook
- 错误处理统一模式
- Turnstile 平台抽象

---

### 批次3: Flights Booking/Orders + Passengers

**目标**: 应用表单和倒计时模式到业务组件

**范围**:

- **Flights Booking** (13 组件): payment-countdown-timer, payment-method-selector, ancillary-selection, contact-info-card, passenger-form-card, flight-summary-card, confirmation-_, payment-_
- **Flights Orders** (7 组件): order-status-card, order-flight-info, cancel-order-dialog, refund-order-dialog, order-\*
- **Passengers** (4 组件): passenger-form, passenger-list, passengers-data-table, passenger-detail-view

---

### 批次4: User + Security

**目标**: 完成剩余组件迁移

**范围**:

- **Security** (4 组件): change-password-form, update-email-form, update-phone-form, security-item
- **User** (8 组件): address-form, address-list, user-info-edit-form, user-info-form, user-info-display, order-card, delete-order-dialog, success-dialog

---

## 使用说明

### 如何更新进度

当完成一个组件的迁移时:

1. 打开对应的域迁移文档 (如 `docs/migrations/auth-migration.md`)
2. 将组件标记为已完成
3. 更新本文件的进度 Dashboard

### 状态图例

- **已完成**: 组件已迁移到 packages/ui，容器已实现，单元测试通过
- **进行中**: 正在迁移或测试中
- **未开始**: 尚未开始迁移
- **待启动**: 批次尚未开始

---

## 下一步行动

### 本周

1. [ ] 完成批次1 - user-menu 和 bread-crumb
2. [ ] 完成批次1 - search-bar 和 stepper

### 本月

1. [ ] 完成批次1 - 所有 Common 组件
2. [ ] 完成批次1 - Flights Search 核心组件

---

## 参考实现

- [site-header.tsx](packages/ui/src/components/common/site-header.tsx) - Link/Image 适配器使用示例
- [footer.tsx](packages/ui/src/components/common/footer.tsx) - 基础组件示例
- [app-sidebar.tsx](packages/ui/src/components/common/app-sidebar.tsx) - 复杂受控组件示例
