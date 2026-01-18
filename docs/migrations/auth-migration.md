# Auth 域组件迁移

> **批次分配**: 批次2 (高优先级 - 受控表单模式建立)
> **组件总数**: 13
> **状态**: 已完成 2 | 进行中 0 | 未开始 11
> **最后更新**: 2026-01-18

## 域概览

Auth 域处理用户认证流程,包括:

- 登录 (密码 + OTP 模式)
- 注册 (注册 + 验证)
- 社交账号绑定/解绑
- 密码设置和验证

**关键挑战**:

- 复杂表单验证 (react-hook-form + zod)
- OTP 倒计时定时器与 localStorage 持久化
- Turnstile 集成(机器人防护)
- Server actions 集成
- 社交 OAuth 回调处理

**依赖**:

- 适配层 (批次0) 必须先完成
- 需要建立受控表单模式

---

## 组件清单

### ✅ 已完成并测试

#### ./auth/user-sidebar.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/user-sidebar.tsx`
- UI 组件: `packages/ui/src/components/auth/user-sidebar.tsx`
- 测试: `packages/ui/src/components/auth/user-sidebar.test.tsx` + `apps/web/app/_components/auth/user-sidebar.test.tsx`
- Storybook: `apps/storybook/src/stories/auth/user-sidebar.stories.tsx`
- 复杂度: 中
- 优先级: P2

**依赖解决方案**

- ✅ 移除 Next.js Link - 使用 `onNavigate` 回调
- ✅ 移除 usePathname - 容器计算 `isActive` 状态并通过 props 传递
- ✅ 移除 useRouter - 容器处理 `router.push`

**重构实现**

```
容器职责 (apps/web):
- 从 usePathname 确定当前路径
- 计算每个菜单项的 isActive 状态
- 处理 onNavigate 回调 (router.push)
- 处理 onUnimplementedClick (toast 通知)

UI 职责 (packages/ui):
- 侧边栏布局和样式
- 递归渲染菜单项 (支持嵌套)
- 可折叠/展开父级菜单
- 自动展开包含活动子项的父菜单
- 根据 isActive 状态高亮菜单项
- 区分已实现/未实现功能 (不同交互)

Props:
- items: UserSidebarMenuItem[] (包含 title, href, isActive, isImplemented, children)
- onNavigate: (href: string) => void
- onUnimplementedClick: (title: string) => void
```

**测试覆盖**

- ✅ 菜单渲染 (顶级和嵌套项)
- ✅ Active 状态高亮 (精确匹配和子路径匹配)
- ✅ 可折叠展开逻辑 (手动和自动展开)
- ✅ 导航回调
- ✅ 未实现功能点击回调
- ✅ 边界情况 (非匹配路径、部分匹配路径)

**实现笔记**

- 2026-01-18: 完成迁移，所有测试通过，构建成功
- UI 组件完全受控，无 Next.js 依赖
- 容器负责路由状态管理和导航
- Storybook 展示多种状态 (默认、激活项、嵌套激活等)

---

#### ./auth/forms/otp-input.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/forms/otp-input.tsx` (已删除)
- UI 组件: `packages/ui/src/components/security/otp-input.tsx`
- 测试: `packages/ui/src/components/security/otp-input.test.tsx` (17 tests ✓)
- Storybook: `apps/storybook/src/stories/security/otp-input.stories.tsx`
- 复杂度: 低
- 优先级: P1 (被其他组件依赖)
- 完成日期: 2026-01-18

**依赖解决方案**

- ✅ 移除 useEffect + useRef - 改为受控 `hasSent` prop
- ✅ 容器管理倒计时状态 (使用 `useOtpCountdown` hook)

**重构实现**

```
容器职责:
- 使用 useOtpCountdown 管理倒计时状态
- 传递 countdown 和 hasSent (从 countdown > 0 推导)
- 处理 onSendOtp 回调 (验证码发送)

UI 职责 (packages/ui):
- 输入框渲染 (自动过滤非数字字符)
- 发送/重发按钮 (根据 hasSent 和 countdown 状态显示文本)
- 倒计时显示 ("30秒后重试")
- 验证中状态显示

Props:
- value: string
- onChange: (value: string) => void
- onSendOtp: () => void | Promise<void>
- countdown: number
- hasSent: boolean
- isLoading?: boolean
- isVerifying?: boolean
- placeholder?: string
- maxLength?: number
- disabled?: boolean
```

**测试覆盖**

- ✅ 基本渲染和受控值
- ✅ 过滤非数字字符输入
- ✅ 发送/重发按钮状态 (首次、重发、倒计时、验证中)
- ✅ 倒计时禁用状态
- ✅ loading/disabled 状态
- ✅ 自定义样式和属性

**实现笔记**

- 2026-01-18: 完成迁移，UI 组件已存在于 security 包
- 更新所有消费者使用新的 UI 组件 (phone-verification, email-verification, unified-login, forgot-password)
- 容器通过 `countdown > 0` 推导 `hasSent` 状态
- 删除旧的 apps/web 版本
- 所有测试通过，lint 通过，构建成功

### 🚧 进行中

(暂无)

### 📋 未开始

#### ./auth/forms/unified-login.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/forms/unified-login.tsx`
- 复杂度: 高
- 优先级: P0 (关键路径)

**依赖问题**

- [x] Next.js Link (用于"忘记密码"链接)
- [x] Server Action: signInWithPasswordAction, verifyOtpAction
- [x] useEffect: 本地存储管理、倒计时
- [x] react-hook-form + zod 表单校验
- [x] Turnstile 验证组件

**重构策略**

```
容器职责:
- Schema 管理 (passwordLoginSchema / otpLoginSchema)
- 表单提交与 Server Action 调用
- OTP 倒计时定时器逻辑 (useOtpCountdown hook)
- localStorage 读写 (倒计时持久化)
- 错误处理和 toast 通知
- Turnstile token 管理

UI 职责 (packages/ui):
- 渲染表单字段 (受控)
- 显示验证错误
- 根据 mode 显示/隐藏 password/OTP 区块
- 倒计时显示
- Link 适配器用于"忘记密码"
- Turnstile widget 渲染 (props: onVerify 回调)

适配器需求:
- LinkAdapter (跳转到忘记密码页)
```

**View Model 接口**
参考 [ARCHITECTURE.md - UnifiedLogin](../../ARCHITECTURE.md#unifiedlogin)

**测试要点**

- [ ] 模式切换 (password ↔ otp)
- [ ] 表单验证错误显示
- [ ] OTP 倒计时 UI (容器传入 mock 值)
- [ ] 提交按钮禁用状态
- [ ] 条款勾选状态
- [ ] Turnstile 验证流程

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 需要先完成 OTP 倒计时 hook 提取(可与 phone/email verification 共享)
- [ ] Turnstile widget 需要平台抽象

---

#### ./auth/forms/unified-signup.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/forms/unified-signup.tsx`
- 复杂度: 中
- 优先级: P1

**依赖问题**

- [x] Server Action: signupAction
- [x] use_client

**重构策略**

```
容器职责:
- 调用 signup action
- 错误处理
- 成功后导航

UI 职责:
- 受控表单字段 (account, password)
- 验证错误显示
- 提交按钮与 loading 状态

适配器需求:
- 无
```

**测试要点**

- [ ] 字段验证
- [ ] 提交流程
- [ ] 错误显示

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 需确认表单验证是客户端还是仅服务端

---

#### ./auth/forms/password-setup.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/forms/password-setup.tsx`
- 复杂度: 低
- 优先级: P2

**依赖问题**

- [x] react-hook-form + zod
- [x] use_client

**重构策略**

```
容器职责:
- 密码验证 schema
- 密码强度检查
- 提交处理

UI 职责:
- 受控 password + confirm 字段
- 密码强度指示器
- 验证错误
- 显示/隐藏密码切换

适配器需求:
- 无
```

**测试要点**

- [ ] 密码匹配验证
- [ ] 密码强度指示器
- [ ] 显示/隐藏切换

**实现笔记**

- 待实施时记录

---

#### ./auth/forms/phone-verification.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/forms/phone-verification.tsx`
- 复杂度: 中
- 优先级: P1

**依赖问题**

- [x] useEffect: 倒计时
- [x] react-hook-form + zod
- [x] use_client

**重构策略**

```
容器职责:
- OTP 验证 schema
- 倒计时定时器逻辑 (共享 useOtpCountdown)
- 重发 OTP action
- 验证 OTP action

UI 职责:
- OTP 输入组件 (复用 otp-input)
- 倒计时显示
- 重发按钮 (倒计时期间禁用)
- 错误消息

适配器需求:
- 无
```

**测试要点**

- [ ] OTP 输入
- [ ] 倒计时显示
- [ ] 重发按钮禁用/启用

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 与 email-verification 和 unified-login 共享倒计时 hook

---

#### ./auth/forms/email-verification.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/forms/email-verification.tsx`
- 复杂度: 中
- 优先级: P1
- ⚠️ **已知问题**: useEffect 存在副作用逻辑,需迁移至容器

**依赖问题**

- [x] useEffect: 倒计时 + 副作用
- [x] react-hook-form + zod
- [x] use_client
- [x] 全局副作用

**重构策略**

```
容器职责:
- 同 phone-verification

UI 职责:
- 同 phone-verification

适配器需求:
- 无
```

**测试要点**

- [ ] 同 phone-verification

**实现笔记**

- 待实施时记录

**阻塞问题**

- [x] ⚠️ **必须解决**: useEffect 副作用逻辑需要识别并迁移到容器
- [ ] 共享倒计时 hook

---

#### ./auth/registration-success.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/registration-success.tsx`
- 复杂度: 低
- 优先级: P2

**依赖问题**

- [x] Next.js router (导航)
- [x] use_client

**重构策略**

```
容器职责:
- 处理导航回调

UI 职责:
- 成功消息显示
- 图标/插图
- CTA 按钮

Props:
- title?: string
- description?: string
- actions: Array<{
    label: string
    onClick: () => void
    variant?: 'default' | 'outline'
  }>

适配器需求:
- 无 (通过 onClick 回调处理导航)
```

**测试要点**

- [ ] 内容显示
- [ ] 按钮点击事件

**实现笔记**

- 待实施时记录

---

#### ./auth/sign-up-modal.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/sign-up-modal.tsx`
- 复杂度: 低
- 优先级: P2

**依赖问题**

- [x] Next.js Link (条款/隐私链接)
- [x] use_client

**重构策略**

```
容器职责:
- 控制 modal 打开状态
- 处理同意/不同意回调

UI 职责:
- Modal 对话框
- 条款文本与链接 (Link 适配器)
- 同意/不同意按钮

Props:
- open: boolean
- onOpenChange: (open: boolean) => void
- onAgree: () => void
- onDisagree: () => void
- termsLink?: string
- privacyLink?: string

适配器需求:
- LinkAdapter (条款和隐私政策链接)
```

**测试要点**

- [ ] Modal 打开/关闭
- [ ] 按钮交互
- [ ] 链接渲染

**实现笔记**

- 待实施时记录

---

#### ./auth/social-account-card.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/social-account-card.tsx`
- 复杂度: 低
- 优先级: P2

**依赖问题**

- [x] use_client
- [x] Context (外部上下文)

**重构策略**

```
容器职责:
- 从 context 获取社交账号数据
- 以 props 传递数据给 UI

UI 职责:
- 卡片布局
- Provider 图标/名称
- 状态徽章
- 绑定/解绑按钮插槽

Props:
- provider: 'github' | 'google' | etc.
- status: 'linked' | 'unlinked'
- account?: { avatar, name, email }
- onLink?: () => void
- onUnlink?: () => void
- loading?: boolean

适配器需求:
- 无
```

**测试要点**

- [ ] 各状态显示
- [ ] 按钮交互

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 明确使用的是哪个 context (user context? session context?)

---

#### ./auth/link-button.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/link-button.tsx`
- 复杂度: 中
- 优先级: P2

**依赖问题**

- [x] Server Action: linkSocialAccountAction
- [x] use_client
- [x] 全局副作用 (可能用于 OAuth 的 window/location)

**重构策略**

```
容器职责:
- 发起 OAuth 流程
- 处理绑定 action
- 管理重定向/弹窗

UI 职责:
- 带 Provider 图标的按钮
- Loading 状态

Props:
- provider: string
- onClick: () => void
- loading?: boolean
- disabled?: boolean

适配器需求:
- OAuth 重定向流程需要平台抽象 (window.location 处理)
```

**测试要点**

- [ ] 按钮渲染
- [ ] Loading 状态
- [ ] 禁用状态

---

#### ./auth/turnstile.tsx

#### ./auth/user-sidebar.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/user-sidebar.tsx`
- 复杂度: 中
- 优先级: P2

**依赖问题**

- [x] Next.js Link
- [x] use_client
- [x] Router (用于 active 状态)

**重构策略**

```
容器职责:
- 从路由确定 active 菜单项
- 提供菜单结构

UI 职责:
- 侧边栏布局
- 带 Link 适配器的菜单项
- Active 状态样式

Props:
- items: Array<{
    key: string
    label: string
    href: string
    icon?: ReactNode
    active?: boolean
  }>
- onItemClick?: (key: string) => void

适配器需求:
- LinkAdapter
```

**测试要点**

- [ ] 菜单渲染
- [ ] Active 状态高亮
- [ ] 链接导航

**实现笔记**

- 待实施时记录

---

#### ./auth/turnstile.tsx

**基本信息**

- 路径: `apps/web/app/_components/auth/turnstile.tsx`
- 复杂度: 未知 (需要读取组件代码)
- 优先级: P1 (被 unified-login 依赖)

**依赖问题**

- 待确认

**重构策略**

```
如果此组件封装第三方脚本:

容器职责:
- 加载 Turnstile 脚本
- 管理 token 状态
- 处理验证回调

UI 职责:
- 渲染 widget 容器
- 传递回调

Props:
- siteKey: string
- onVerify: (token: string) => void
- onError?: (error: Error) => void
- onExpire?: () => void

适配器需求:
- 可能需要平台特定的加载器抽象
```

**测试要点**

- [ ] Widget 渲染
- [ ] 验证回调

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 需要读取组件以了解实现
- [ ] 可能需要平台特定加载器抽象

---

## 域级决策

### 表单校验策略

所有表单组件应共享一致的错误处理模式:

- 容器管理 zod schema
- 错误消息通过 errors props 传递给 UI
- UI 只负责显示错误,不包含验证逻辑

### 倒计时组件复用

OTP、验证码等倒计时应使用统一实现:

- 创建 `useOtpCountdown` 自定义 hook (在容器层)
- 可被 unified-login、phone-verification、email-verification 共享
- Hook 处理 localStorage 持久化和定时器逻辑

### 社交账号绑定模式

Link/Unlink 组件应有统一接口:

- 统一的 loading 状态处理
- 统一的错误处理模式
- OAuth 流程抽象为容器职责

---

## 迁移检查清单

- [ ] 所有组件已迁移到 packages/ui
- [ ] 容器组件在 apps/web 实现
- [ ] 所有 Next.js 依赖已通过适配器处理
- [ ] useOtpCountdown hook 已创建并共享
- [ ] 单元测试覆盖 (Vitest + RTL)
- [ ] 在 apps/demo 中验证可用性
- [ ] 文档更新 (View Model、使用示例)

---

## 进度统计

| 类别          | 总数   | 已完成 | 进行中 | 未开始 |
| ------------- | ------ | ------ | ------ | ------ |
| Forms         | 6      | 0      | 0      | 6      |
| UI Components | 7      | 0      | 0      | 7      |
| **总计**      | **13** | **0**  | **0**  | **13** |

---

## 下一步行动

1. 完成批次0 (适配层) - 前置依赖
2. 从 `otp-input.tsx` 开始 (最简单,可复用)
3. 提取共享的 OTP 倒计时 hook
4. 处理 `unified-login.tsx` (最高复杂度,建立模式)
5. 将模式应用到其余表单

---

## 参考

- [架构指南](../../ARCHITECTURE.md)
- [总览](../../TODO.md)
