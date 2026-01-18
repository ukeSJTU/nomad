# User 域组件迁移

> **批次分配**: 批次4 (低优先级 - 应用已建立的表单和列表模式)
> **组件总数**: 8
> **状态**: 已完成 7 | 进行中 0 | 未开始 1
> **最后更新**: 2026-01-18

## 域概览

User 域负责用户个人信息管理,包括:

- 用户信息展示/编辑
- 地址管理 (添加/编辑/删除/设为默认)
- 订单展示
- 通用对话框 (成功提示、删除确认)

**关键挑战**:

- 表单验证 (react-hook-form + zod)
- 地址列表的复杂交互 (设为默认、删除)
- Server Actions 集成
- 路由导航

**依赖**:

- 适配层 (批次0) 必须先完成
- 表单模式 (批次2 auth 建立)
- Link 适配器 (批次1 common 建立)

---

## 组件清单

### ✅ 已完成并测试

#### ./user/address/address-form.tsx

- **UI 组件**: `packages/ui/src/components/user/address/address-form.tsx`
- **容器组件**: `apps/web/app/_components/user/address/address-form.tsx`
- **测试**: `packages/ui/src/components/user/address/address-form.test.tsx`
- **Story**: `apps/storybook/src/stories/user/address-form.stories.tsx`

#### ./user/address/address-list.tsx

- **UI 组件**: `packages/ui/src/components/user/address/address-list.tsx`
- **容器组件**: `apps/web/app/_components/user/address/address-list.tsx`
- **测试**: `packages/ui/src/components/user/address/address-list.test.tsx`
- **Story**: `apps/storybook/src/stories/user/address-list.stories.tsx`

#### ./user/user-info-edit-form.tsx

- **UI 组件**: `packages/ui/src/components/user/user-info-edit-form.tsx`
- **容器组件**: `apps/web/app/_components/user/user-info-edit-form.tsx`
- **测试**: `packages/ui/src/components/user/user-info-edit-form.test.tsx`
- **Story**: `apps/storybook/src/stories/user/user-info-edit-form.stories.tsx`

#### ./user/user-info-form.tsx

- **UI 组件**: `packages/ui/src/components/user/user-info-form.tsx`
- **容器组件**: `apps/web/app/_components/user/user-info-form.tsx`
- **测试**: `packages/ui/src/components/user/user-info-form.test.tsx`
- **Story**: `apps/storybook/src/stories/user/user-info-form.stories.tsx`
- **说明**: 协调器组件，管理 UserInfoDisplay 和 UserInfoEditForm 之间的切换，处理成功对话框和路由刷新

#### ./user/user-info-display.tsx

- **UI 组件**: `packages/ui/src/components/user/user-info-display.tsx`
- **容器组件**: 无需容器（纯展示）
- **测试**: `packages/ui/src/components/user/user-info-display.test.tsx`
- **Story**: `apps/storybook/src/stories/user/user-info-display.stories.tsx`

#### ./user/success-dialog.tsx

- **UI 组件**: `packages/ui/src/components/user/success-dialog.tsx`
- **容器组件**: 无需容器（纯 UI）
- **测试**: `packages/ui/src/components/user/success-dialog.test.tsx`
- **Story**: `apps/storybook/src/stories/user/success-dialog.stories.tsx`

### 📋 未开始

---

#### ./user/user-info-display.tsx

**基本信息**

- 路径: `apps/web/app/_components/user/user-info-display.tsx`
- 复杂度: 低
- 优先级: P2
- 批次: 4

**依赖问题**

- 待确认 (可能是纯 UI)

**重构策略**

```
如果是纯展示组件:

UI 职责:
- 用户信息展示
- 头像/昵称/性别/生日
- 编辑按钮 (可选)

Props:
- user: {
    avatar?: string;
    nickname: string;
    gender?: string;
    birthday?: string;
    email?: string;
    phone?: string;
  }
- onEdit?: () => void

适配器需求:
- 无
```

**测试要点**

- [ ] 信息显示
- [ ] 编辑按钮

**实现笔记**

- 待实施时记录

---

#### ./user/order-card.tsx

**基本信息**

- 路径: `apps/web/app/_components/user/order-card.tsx`
- 复杂度: 低
- 优先级: P2
- 批次: 4

**依赖问题**

- [x] Next.js Link

**重构策略**

```
容器职责:
- 提供订单 view-model
- 处理导航回调

UI 职责:
- 订单卡片渲染
- 订单状态
- 价格信息
- 航班信息摘要
- Link 适配器或 onClick 回调

适配器需求:
- LinkAdapter (如果使用 href)
```

**View Model 接口**
参考 [ARCHITECTURE.md - OrderCard](../../ARCHITECTURE.md#ordercard)

**测试要点**

- [ ] 卡片渲染
- [ ] 状态显示
- [ ] 点击/导航

**实现笔记**

- 待实施时记录

---

#### ./user/delete-order-dialog.tsx

**基本信息**

- 路径: `apps/web/app/_components/user/delete-order-dialog.tsx`
- 复杂度: 低
- 优先级: P3
- 批次: 4

**依赖问题**

- 待确认 (可能是纯 UI)

**重构策略**

```
如果是纯展示组件:

UI 职责:
- 确认对话框
- 警告文案
- 确认/取消按钮

Props:
- open: boolean
- onOpenChange: (open: boolean) => void
- onConfirm: () => void
- orderNumber?: string
- loading?: boolean

适配器需求:
- 无
```

**测试要点**

- [ ] 对话框打开/关闭
- [ ] 按钮交互
- [ ] Loading 状态

**实现笔记**

- 待实施时记录

---

#### ./user/success-dialog.tsx

**基本信息**

- 路径: `apps/web/app/_components/user/success-dialog.tsx`
- 复杂度: 低
- 优先级: P3
- 批次: 4

**依赖问题**

- 待确认 (可能是纯 UI)

**重构策略**

```
如果是纯展示组件:

UI 职责:
- 成功提示对话框
- 成功图标
- 成功消息
- 确认/关闭按钮

Props:
- open: boolean
- onOpenChange: (open: boolean) => void
- title?: string
- message?: string
- onConfirm?: () => void

适配器需求:
- 无
```

**测试要点**

- [ ] 对话框打开/关闭
- [ ] 内容显示
- [ ] 按钮交互

**实现笔记**

- 待实施时记录

---

## 域级决策

### 表单模式复用

与 auth/security/passengers 表单保持一致:

- 容器管理 zod schema
- 错误消息通过 props 传递
- UI 只负责渲染和显示错误

### 地址列表交互

设为默认、删除等操作:

- 操作通过回调处理
- 确认对话框在容器层管理
- UI 只负责触发事件

### 通用对话框模式

success-dialog 和 delete-order-dialog:

- 纯受控组件 (open/onOpenChange)
- 标题和内容可配置
- 操作通过回调处理

---

## 迁移检查清单

- [ ] 所有组件已迁移到 packages/ui
- [ ] 容器组件在 apps/web 实现
- [ ] 表单模式正确应用
- [ ] LinkAdapter 在 order-card 中正确使用
- [ ] 确认 user-info-form 和 user-info-edit-form 的区别
- [ ] 单元测试覆盖 (Vitest + RTL)
- [ ] 在 apps/demo 中验证可用性
- [ ] 文档更新

---

## 进度统计

| 类别     | 总数  | 已完成 | 进行中 | 未开始 |
| -------- | ----- | ------ | ------ | ------ |
| 地址管理 | 2     | 0      | 0      | 2      |
| 用户信息 | 3     | 0      | 0      | 3      |
| 订单     | 1     | 0      | 0      | 1      |
| 对话框   | 2     | 0      | 0      | 2      |
| **总计** | **8** | **0**  | **0**  | **8**  |

---

## 下一步行动

1. 完成批次0 (适配层) - 前置依赖
2. 完成批次2 (auth 表单模式) - 表单参考
3. 从 `address-form.tsx` 开始 (核心表单)
4. 处理 `address-list.tsx` (列表交互)
5. 处理 `user-info-edit-form.tsx`
6. 确认并处理 `user-info-form.tsx`
7. 其余展示组件和对话框

---

## 参考

- [架构指南](../../ARCHITECTURE.md)
- [总览](../../TODO.md)
- **相关批次**: 批次1 (common Link 适配器)、批次2 (auth 表单模式)
