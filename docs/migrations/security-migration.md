# Security 域组件迁移

> **批次分配**: 批次4 (低优先级 - 应用已建立的表单模式)
> **组件总数**: 4
> **状态**: 已完成 4 | 进行中 0 | 未开始 0
> **最后更新**: 2026-01-03

## 域概览

Security 域负责用户安全设置,包括:

- 修改密码
- 更新邮箱 (带验证)
- 更新手机号 (带验证)
- 安全设置导航

**关键挑战**:

- 表单验证 (react-hook-form + zod)
- OTP 倒计时 (邮箱/手机验证)
- 密码强度验证
- Server Actions 集成

**依赖**:

- 适配层 (批次0) 必须先完成
- 表单模式 (批次2 auth 建立)
- OTP 倒计时 hook (批次2 共享)

---

## 组件清单

### ✅ 已完成并测试

#### ./security/change-password-form.tsx

**基本信息**

- UI 组件: `packages/ui/src/components/security/change-password-form.tsx`
- 容器: `apps/web/app/_components/security/change-password-form.tsx`
- 测试: `packages/ui/src/components/security/change-password-form.test.tsx` (15 tests ✓)
- Story: `apps/storybook/src/stories/security/change-password-form.stories.tsx`
- 复杂度: 中
- 完成日期: 2026-01-03

#### ./security/update-email-form.tsx

**基本信息**

- UI 组件: `packages/ui/src/components/security/update-email-form.tsx`
- 容器: `apps/web/app/_components/security/update-email-form.tsx`
- Story: `apps/storybook/src/stories/security/update-email-form.stories.tsx`
- 复杂度: 中
- 完成日期: 2026-01-03

#### ./security/update-phone-form.tsx

**基本信息**

- UI 组件: `packages/ui/src/components/security/update-phone-form.tsx`
- 容器: `apps/web/app/_components/security/update-phone-form.tsx`
- Story: `apps/storybook/src/stories/security/update-phone-form.stories.tsx`
- 复杂度: 中
- 完成日期: 2026-01-03

#### ./security/security-item.tsx

**基本信息**

- UI 组件: `packages/ui/src/components/security/security-item.tsx`
- 容器: `apps/web/app/_components/security/security-item.tsx`
- 测试: `packages/ui/src/components/security/security-item.test.tsx` (12 tests ✓)
- Story: `apps/storybook/src/stories/security/security-item.stories.tsx`
- 复杂度: 简单
- 完成日期: 2026-01-03

### 🚧 进行中

(暂无)

### 📋 未开始

(全部完成)

---

## 域级决策 (已应用)

### 表单模式复用

与 auth/passengers 表单保持一致:

- 容器管理 zod schema
- 错误消息通过 props 传递
- UI 只负责渲染和显示错误

### OTP 倒计时共享

复用 auth 域建立的 useOtpCountdown hook:

- update-email-form 使用
- update-phone-form 使用
- 统一的倒计时逻辑和持久化策略

### 密码强度检查

与 auth/password-setup 共享:

- 创建 `checkPasswordStrength` util 函数
- 容器调用并传递强度给 UI
- UI 显示强度指示器

---

## 迁移检查清单

- [ ] 所有组件已迁移到 packages/ui
- [ ] 容器组件在 apps/web 实现
- [ ] OTP 倒计时 hook 正确复用
- [ ] 密码强度逻辑正确共享
- [ ] LinkAdapter 在 security-item 中正确使用
- [ ] 单元测试覆盖 (Vitest + RTL)
- [ ] 在 apps/demo 中验证可用性
- [ ] 文档更新

---

## 进度统计

| 类别     | 总数  | 已完成 | 进行中 | 未开始 |
| -------- | ----- | ------ | ------ | ------ |
| 表单     | 3     | 0      | 0      | 3      |
| 导航     | 1     | 0      | 0      | 1      |
| **总计** | **4** | **0**  | **0**  | **4**  |

---

## 下一步行动

1. 完成批次0 (适配层) - 前置依赖
2. 完成批次2 (auth) - useOtpCountdown hook 和表单模式
3. 从 `change-password-form.tsx` 开始
4. 处理 `update-email-form.tsx` 和 `update-phone-form.tsx`
5. 最后完成 `security-item.tsx`

---

## 参考

- [架构指南](../../ARCHITECTURE.md)
- [总览](../../TODO.md)
- **相关批次**: 批次2 (auth OTP 倒计时、表单模式)
