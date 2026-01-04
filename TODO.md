# 组件迁移重构 - 总览

> **项目目标**: 将 apps/web/app/\_components 的自定义组件迁移到 packages/ui，实现 UI 与 Next.js 逻辑的彻底分离
> **最后更新**: 2026-01-03

## 快速导航

### 📚 核心文档

- [ARCHITECTURE.md](./ARCHITECTURE.md) - 架构设计、模式策略、View Models、适配器接口
- [TODO-backup.md](./TODO-backup.md) - 原始 TODO 备份 (参考用)

### 🗂️ 域迁移文档

- [Auth 域迁移](./docs/migrations/auth-migration.md) - 13 组件 (登录/注册/验证) - **批次2**
- [Common 域迁移](./docs/migrations/common-migration.md) - 12 组件 (导航/通用) - **批次1**
- [Flights 域迁移](./docs/migrations/flights-migration.md) - 40 组件 (搜索/订舱/订单) - **批次1+3**
- [Passengers 域迁移](./docs/migrations/passengers-migration.md) - 4 组件 (乘客管理) - **批次3**
- [Security 域迁移](./docs/migrations/security-migration.md) - 4 组件 (安全设置) - **批次4**
- [User 域迁移](./docs/migrations/user-migration.md) - 8 组件 (用户信息) - **批次4**

---

## 📊 进度 Dashboard

### 总体进度

| 域             | 组件数 | 已完成 | 进行中 | 未开始 | 批次    | 优先级 |
| -------------- | ------ | ------ | ------ | ------ | ------- | ------ |
| **Common**     | 12     | 1      | 0      | 11     | 批次1   | 🔴 高  |
| **Auth**       | 13     | 0      | 0      | 13     | 批次2   | 🔴 高  |
| **Flights**    | 40     | 0      | 0      | 40     | 批次1+3 | 🟡 中  |
| **Passengers** | 4      | 0      | 0      | 4      | 批次3   | 🟢 低  |
| **Security**   | 4      | 0      | 0      | 4      | 批次4   | 🟢 低  |
| **User**       | 8      | 0      | 0      | 8      | 批次4   | 🟢 低  |
| **总计**       | **81** | **1**  | **0**  | **80** | -       | -      |

**完成度**: 1.2% (1/81)

### 批次进度

| 批次      | 名称                                | 组件数 | 完成度    | 状态      | 关键目标                           |
| --------- | ----------------------------------- | ------ | --------- | --------- | ---------------------------------- |
| **批次0** | 适配层                              | -      | ⏸️ 待启动 | 前置依赖  | UiProvider + Link/Image 适配器落地 |
| **批次1** | Common + Flights Search             | 24     | 4.2%      | 🚧 进行中 | 建立 Link/Image 适配模式           |
| **批次2** | Auth 认证链路                       | 13     | 0%        | ⏸️ 待启动 | 建立受控表单模式 + OTP 倒计时      |
| **批次3** | Flights Booking/Orders + Passengers | 24     | 0%        | ⏸️ 待启动 | 应用表单和倒计时模式               |
| **批次4** | User + Security                     | 12     | 0%        | ⏸️ 待启动 | 应用已建立的所有模式               |

### 参考实现

- ✅ [common/header.tsx](packages/ui/src/components/common/site-header.tsx) - Link/Image 适配器使用示例

---

## 🎯 批次计划

### 批次0: 适配层落地 (前置依赖)

**目标**: 建立框架无关的适配器基础设施

**关键交付**:

- [ ] UiProvider 实现 (packages/ui/src/platform)
- [ ] LinkAdapter 默认实现 (`<a>`)
- [ ] ImageAdapter 默认实现 (`<img>`)
- [ ] Next.js 适配器实现 (apps/web)
- [ ] useUiComponents hook
- [ ] 类型定义完善

**验证标准**:

- [ ] packages/ui 可以在 apps/demo 中正常工作 (使用默认适配器)
- [ ] apps/web 可以正确注入 Next.js 适配器
- [ ] header.tsx 参考实现可正常运行

**预计工时**: 2-3 天

---

### 批次1: Common 基础 + Flights 搜索核心 (高优先级)

**目标**: 建立 Link/Image 适配器使用模式，为后续批次树立标杆

**范围**:

- **Common** (11 组件): footer, app-sidebar, user-menu, bread-crumb, data-table-with-actions, search-bar, stepper, error-display, construction, dev-user-switcher, theme-provider
- **Flights Search** (12 组件): search-form, quick-date-selector, FlightListOneWay/RoundTrip, FlightSearchHeader, city-selector, date-selector/\*, search-history-section, search-history, FlightSearchError

**关键模式**:

- ✅ Link 适配器用于导航链接
- ✅ Image 适配器用于图片优化
- ✅ 回调函数处理命令式导航 (不使用 RouterAdapter)
- ✅ URL 同步在容器层
- ✅ 数据表格完全受控模式

**完成标准**:

- [ ] 所有组件迁移到 packages/ui
- [ ] 容器在 apps/web 正确实现
- [ ] LinkAdapter 和 ImageAdapter 使用一致
- [ ] 单元测试覆盖 (Vitest + RTL)
- [ ] 在 apps/demo 中可用

**预计工时**: 2-3 周

---

### 批次2: Auth 认证链路 (高优先级)

**目标**: 建立受控表单模式和 OTP 倒计时模式

**范围**:

- **Auth** (13 组件): unified-login, unified-signup, password-setup, phone-verification, email-verification, otp-input, registration-success, sign-up-modal, social-account-card, link-button, unlink-button, user-sidebar, turnstile

**关键模式**:

- ✅ 受控表单 (react-hook-form + zod 在容器)
- ✅ useOtpCountdown 自定义 hook (可复用)
- ✅ 错误处理统一模式
- ✅ Turnstile 平台抽象
- ✅ OAuth 流程抽象

**完成标准**:

- [ ] 所有组件迁移到 packages/ui
- [ ] useOtpCountdown hook 实现并共享
- [ ] 表单验证模式文档化
- [ ] 单元测试覆盖
- [ ] 在 apps/demo 中可用

**预计工时**: 2-3 周

---

### 批次3: Flights Booking/Orders + Passengers (中优先级)

**目标**: 应用表单和倒计时模式到业务组件

**范围**:

- **Flights Booking** (13 组件): payment-countdown-timer, payment-method-selector, ancillary-selection, contact-info-card, passenger-form-card, flight-summary-card, confirmation-_, payment-_
- **Flights Orders** (7 组件): order-status-card, order-flight-info, cancel-order-dialog, refund-order-dialog, order-\*
- **Passengers** (4 组件): passenger-form, passenger-list, passengers-data-table, passenger-detail-view

**关键模式**:

- ✅ 复用批次2的表单模式
- ✅ 复用批次2的倒计时模式
- ✅ 复用批次1的数据表格模式
- ✅ Image 适配器用于航班图片

**完成标准**:

- [ ] 所有组件迁移到 packages/ui
- [ ] 倒计时模式正确应用
- [ ] 表单模式正确应用
- [ ] 单元测试覆盖
- [ ] 在 apps/demo 中可用

**预计工时**: 2-3 周

---

### 批次4: User + Security (低优先级)

**目标**: 完成剩余组件迁移

**范围**:

- **Security** (4 组件): change-password-form, update-email-form, update-phone-form, security-item
- **User** (8 组件): address-form, address-list, user-info-edit-form, user-info-form, user-info-display, order-card, delete-order-dialog, success-dialog

**关键模式**:

- ✅ 应用所有已建立的模式
- ✅ 无新模式引入

**完成标准**:

- [ ] 所有组件迁移到 packages/ui
- [ ] 单元测试覆盖
- [ ] 在 apps/demo 中可用
- [ ] 整个迁移项目完成

**预计工时**: 1-2 周

---

## 📝 使用说明

### 如何更新进度

当完成一个组件的迁移时:

1. 打开对应的域迁移文档 (如 `.codex/migrations/auth-migration.md`)
2. 将组件从 "📋 未开始" 移动到 "🚧 进行中" 或 "✅ 已完成并测试"
3. 更新组件的**状态**和**实现笔记**
4. 更新域文档底部的**进度统计**表格
5. 更新本文件 (TODO.md) 的**进度 Dashboard**

### 状态图例

- ✅ **已完成并测试**: 组件已迁移到 packages/ui，容器已实现，单元测试通过，在 apps/demo 中验证可用
- 🚧 **进行中**: 正在迁移或测试中
- 📋 **未开始**: 尚未开始迁移
- ⏸️ **待启动**: 批次尚未开始
- 🔴 **高优先级**: 必须优先完成
- 🟡 **中优先级**: 重要但不紧急
- 🟢 **低优先级**: 可以延后

### 关键决策记录

所有重要的架构决策都记录在:

- [ARCHITECTURE.md](./ARCHITECTURE.md#L630-L668) - RouterAdapter 为什么不需要
- 各域迁移文档的 "域级决策" 区块

---

## 🎓 学习资源

### 核心概念

1. **适配器模式**: 如何使 UI 组件与框架无关
   - 参考: [ARCHITECTURE.md - 适配层接口](./ARCHITECTURE.md#适配层接口)

2. **容器/展示组件分离**: 逻辑与 UI 的职责划分
   - 参考: [ARCHITECTURE.md - 模式策略对照表](./ARCHITECTURE.md#模式策略对照表)

3. **受控组件模式**: 表单和交互的标准化接口
   - 参考: auth-migration.md 的表单组件

4. **View Models**: 统一的 Props 接口设计
   - 参考: [ARCHITECTURE.md - 域级 View Model 草案](./ARCHITECTURE.md#域级-view-model-草案)

### 示例代码

- ✅ [common/header.tsx](packages/ui/src/components/common/site-header.tsx) - 完整的迁移示例

---

## 🚀 下一步行动

### 立即行动 (本周)

1. [ ] 完成批次0 - UiProvider 和适配器实现
2. [ ] 验证 header.tsx 参考实现
3. [ ] 开始批次1 - footer.tsx 和 app-sidebar.tsx

### 近期目标 (本月)

1. [ ] 完成批次1 - 所有 Common 组件
2. [ ] 完成批次1 - Flights Search 核心组件
3. [ ] 文档化 Link/Image 适配器最佳实践

### 中期目标 (下月)

1. [ ] 完成批次2 - Auth 认证链路
2. [ ] useOtpCountdown hook 实现并文档化
3. [ ] 受控表单模式文档化

---

## 📞 问题反馈

如果在迁移过程中遇到问题:

1. 检查 [ARCHITECTURE.md](./ARCHITECTURE.md) 是否有相关指导
2. 查看对应域迁移文档的 "阻塞问题" 区块
3. 参考 header.tsx 的实现

---

**最后更新**: 2026-01-03
**当前批次**: 批次1
**下一个里程碑**: 完成 Common 域所有组件 (11/12)
