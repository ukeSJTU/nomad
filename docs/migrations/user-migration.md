# User 域组件迁移

> **批次分配**: 批次4 (低优先级 - 应用已建立的表单和列表模式)
> **组件总数**: 8
> **状态**: 已完成 8 | 进行中 0 | 未开始 0
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

#### ./user/order-card.tsx

- **UI 组件**: `packages/ui/src/components/user/order-card.tsx`
- **容器组件**: `apps/web/app/_components/user/order-card.tsx`
- **测试**: `packages/ui/src/components/user/order-card.test.tsx`
- **Story**: `apps/storybook/src/stories/user/order-card.stories.tsx`

#### ./user/delete-order-dialog.tsx

- **UI 组件**: `packages/ui/src/components/user/delete-order-dialog.tsx`
- **容器组件**: `apps/web/app/_components/user/delete-order-dialog.tsx`
- **测试**: `packages/ui/src/components/user/delete-order-dialog.test.tsx`
- **Story**: `apps/storybook/src/stories/user/delete-order-dialog.stories.tsx`

---

## View Model 详细设计

**依赖问题**

- 无（纯 UI 组件）

**重构策略**

```
纯展示组件 - 已经很干净，只需迁移到 packages/ui:

UI 职责:
- 确认对话框
- 警告文案
- 确认/取消按钮
- Loading 状态显示

Props:
- open: boolean
- onOpenChange: (open: boolean) => void
- onConfirm: () => void
- isLoading: boolean

适配器需求:
- 无
```

**测试要点**

- [ ] 对话框打开/关闭
- [ ] 按钮交互
- [ ] Loading 状态

**实现笔记**

- 组件已经非常纯净，直接迁移即可

---

## 域级决策

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

## 迁移检查清单

- [x] 地址管理组件已迁移到 packages/ui
- [x] 用户信息编辑组件已迁移
- [x] 用户信息显示组件已迁移
- [x] 成功对话框已迁移
- [ ] 订单卡片需要迁移（使用 LinkAdapter）
- [ ] 删除订单对话框需要迁移
- [x] 容器组件在 apps/web 实现
- [x] 表单模式正确应用
- [x] 单元测试覆盖 (Vitest + RTL)
- [x] Storybook stories 创建
- [x] 文档更新

---

## 进度统计

| 类别     | 总数  | 已完成 | 进行中 | 未开始 |
| -------- | ----- | ------ | ------ | ------ | ------------- |
| 地址管理 | 2     | 2      | 0      | 0      |
| 用户信息 | 4     | 4      | 0      | 0      |
| 订单     | 1     | 0      | 0      | 1      |
| 对话框   | 1     | 0      | 0      | 1      |
| **总计** | **8** | **6**  | **0**  | **2**  | ## 下一步行动 |

1. ✅ 完成批次0 (适配层) - 已完成
2. ✅ 完成 `address-form.tsx` 和 `address-list.tsx` - 已完成
3. ✅ 完成 `user-info-edit-form.tsx` - 已完成
4. ✅ 完成 `user-info-form.tsx` 和 `user-info-display.tsx` - 已完成
5. ✅ 完成 `success-dialog.tsx` - 已完成
6. 🔲 迁移 `delete-order-dialog.tsx` - 纯 UI，简单迁移
7. 🔲 迁移 `order-card.tsx` - 需要使用 LinkAdapter

**剩余 2 个组件，预计完成时间：1 小时**
