# Security 域组件迁移

> **批次分配**: 批次4 (低优先级 - 应用已建立的表单模式)
> **组件总数**: 4
> **状态**: 已完成 0 | 进行中 0 | 未开始 4
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

(暂无)

### 🚧 进行中

(暂无)

### 📋 未开始

#### ./security/change-password-form.tsx

**基本信息**

- 路径: `apps/web/app/_components/security/change-password-form.tsx`
- 复杂度: 中
- 优先级: P1
- 批次: 4

**依赖问题**

- [x] react-hook-form + zod
- [x] use_client

**重构策略**

```
容器职责:
- Schema 管理 (changePasswordSchema)
- 旧密码验证
- 新密码强度检查
- 表单提交与 Server Action 调用
- 错误处理
- 成功后导航或提示

UI 职责:
- 受控表单字段
  - 旧密码
  - 新密码
  - 确认密码
- 密码强度指示器
- 显示/隐藏密码切换
- 验证错误显示
- 提交按钮与 loading 状态

适配器需求:
- 无
```

**View Model 接口**
参考 [ARCHITECTURE.md - ChangePassword](../../ARCHITECTURE.md#changepasswordupdateemail updatephone)

**测试要点**

- [ ] 旧密码验证
- [ ] 新密码匹配验证
- [ ] 密码强度指示器
- [ ] 显示/隐藏切换
- [ ] 提交流程

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 需要与 auth/password-setup 共享密码强度逻辑

---

#### ./security/update-email-form.tsx

**基本信息**

- 路径: `apps/web/app/_components/security/update-email-form.tsx`
- 复杂度: 中
- 优先级: P1
- 批次: 4

**依赖问题**

- [x] react-hook-form + zod
- [x] use_client
- [x] OTP 倒计时

**重构策略**

```
容器职责:
- Schema 管理 (updateEmailSchema)
- 发送验证码 action
- 验证验证码 action
- OTP 倒计时逻辑 (复用 useOtpCountdown)
- 错误处理

UI 职责:
- 受控表单字段
  - 新邮箱
  - 验证码
- 发送验证码按钮 (倒计时期间禁用)
- 倒计时显示
- 验证错误显示
- 提交按钮与 loading 状态

适配器需求:
- 无
```

**View Model 接口**
参考 [ARCHITECTURE.md - SecurityForm](../../ARCHITECTURE.md#changepasswordupdateemail updatephone)

**测试要点**

- [ ] 邮箱格式验证
- [ ] 发送验证码流程
- [ ] 倒计时显示
- [ ] 验证码输入
- [ ] 提交流程

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 需要复用 auth 的 useOtpCountdown hook

---

#### ./security/update-phone-form.tsx

**基本信息**

- 路径: `apps/web/app/_components/security/update-phone-form.tsx`
- 复杂度: 中
- 优先级: P1
- 批次: 4

**依赖问题**

- [x] react-hook-form + zod
- [x] use_client
- [x] OTP 倒计时

**重构策略**

```
容器职责:
- 同 update-email-form (手机号验证)

UI 职责:
- 同 update-email-form (字段换成手机号)

适配器需求:
- 无
```

**View Model 接口**
参考 [ARCHITECTURE.md - SecurityForm](../../ARCHITECTURE.md#changepasswordupdateemail updatephone)

**测试要点**

- [ ] 手机号格式验证
- [ ] 发送验证码流程
- [ ] 倒计时显示
- [ ] 验证码输入
- [ ] 提交流程

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 需要复用 auth 的 useOtpCountdown hook

---

#### ./security/security-item.tsx

**基本信息**

- 路径: `apps/web/app/_components/security/security-item.tsx`
- 复杂度: 低
- 优先级: P2
- 批次: 4

**依赖问题**

- [x] Next.js Link

**重构策略**

```
容器职责:
- 提供安全项数据
- 处理导航回调

UI 职责:
- 安全项卡片渲染
- 标题/描述
- 状态显示
- Link 适配器或 onClick 回调

适配器需求:
- LinkAdapter (如果使用 href)
```

**View Model 接口**
参考 [ARCHITECTURE.md - SecurityItem](../../ARCHITECTURE.md#securityitem)

**测试要点**

- [ ] 卡片渲染
- [ ] 状态显示
- [ ] 点击/导航

**实现笔记**

- 待实施时记录

---

## 域级决策

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
