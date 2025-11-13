## ADDED Requirements

### Requirement: Turnstile Widget Integration in Forms

表单组件 SHALL 集成 Cloudflare Turnstile 人机验证组件，以保护敏感操作免受自动化攻击和滥用。

#### Scenario: Turnstile widget displayed in email OTP form

- **WHEN** 用户打开邮箱 OTP 登录表单 (`email-otp-login.tsx`)
- **THEN** 表单中显示 Turnstile 验证组件
- **AND** Turnstile 组件位于"发送验证码"按钮附近（下方或右侧）
- **AND** Turnstile 自动根据当前主题（明/暗）调整外观

#### Scenario: Turnstile widget displayed in phone OTP form

- **WHEN** 用户打开手机号 OTP 登录表单 (`phone-otp-login.tsx`)
- **THEN** 表单中显示 Turnstile 验证组件
- **AND** Turnstile 组件位于"发送验证码"按钮附近
- **AND** Turnstile 自动根据当前主题调整外观

#### Scenario: Turnstile widget displayed in update email form

- **WHEN** 用户打开更新邮箱表单 (`update-email-form.tsx`)
- **THEN** 表单中显示 Turnstile 验证组件
- **AND** Turnstile 组件位于"发送验证码"按钮附近
- **AND** Turnstile 自动根据当前主题调整外观

#### Scenario: Turnstile widget displayed in update phone form

- **WHEN** 用户打开更新手机号表单 (`update-phone-form.tsx`)
- **THEN** 表单中显示 Turnstile 验证组件
- **AND** Turnstile 组件位于"发送验证码"按钮附近
- **AND** Turnstile 自动根据当前主题调整外观

#### Scenario: Turnstile widget displayed in signup form

- **WHEN** 用户打开注册表单（如果存在 `signup-form.tsx`）
- **THEN** 表单中显示 Turnstile 验证组件
- **AND** Turnstile 组件位于表单提交按钮上方或附近
- **AND** Turnstile 自动根据当前主题调整外观

### Requirement: Reusable Turnstile Component

系统 SHALL 提供可复用的 Turnstile React 组件，以便在多个表单中一致地集成人机验证功能。

#### Scenario: TurnstileWidget component exists

- **WHEN** 开发者需要在表单中添加人机验证
- **THEN** 可以导入 `TurnstileWidget` 组件从 `@/components/security/turnstile-widget`
- **AND** 组件接受 `onSuccess`, `onError`, `onExpire` 回调属性
- **AND** 组件内部自动处理主题适配逻辑

#### Scenario: TurnstileWidget adapts to theme changes

- **WHEN** 用户在包含 `TurnstileWidget` 的页面上切换主题（明/暗）
- **THEN** Turnstile 组件的外观自动切换为对应的主题样式
- **AND** 使用 `next-themes` 的 `resolvedTheme` 获取实际主题
- **AND** Turnstile 的 `theme` 选项设置为 `"light"` 或 `"dark"`

#### Scenario: TurnstileWidget handles successful verification

- **WHEN** Turnstile 验证成功
- **THEN** `onSuccess` 回调被调用，传入验证 token
- **AND** 表单组件可以使用该 token 进行后续操作（如发送验证码）

#### Scenario: TurnstileWidget handles verification failure

- **WHEN** Turnstile 验证失败或组件加载失败
- **THEN** `onError` 回调被调用（如果提供）
- **AND** 表单可以向用户显示友好的错误消息

#### Scenario: TurnstileWidget handles token expiration

- **WHEN** Turnstile token 过期（120 秒后）
- **THEN** `onExpire` 回调被调用（如果提供）
- **AND** 表单应清空 token 状态，要求用户重新验证

### Requirement: Turnstile Theme Adaptation

Turnstile 组件 SHALL 自动适配用户的主题偏好，支持明暗主题切换。

#### Scenario: Light theme applied to Turnstile

- **WHEN** 系统主题为"明亮模式"（light）
- **THEN** Turnstile 组件显示为浅色背景和深色文字
- **AND** Turnstile 的 `theme` 选项设置为 `"light"`

#### Scenario: Dark theme applied to Turnstile

- **WHEN** 系统主题为"暗黑模式"（dark）
- **THEN** Turnstile 组件显示为深色背景和浅色文字
- **AND** Turnstile 的 `theme` 选项设置为 `"dark"`

#### Scenario: Dynamic theme switching without page reload

- **WHEN** 用户在页面上点击主题切换按钮
- **THEN** Turnstile 组件自动切换到新主题样式
- **AND** 无需刷新页面或重新加载 Turnstile 组件

### Requirement: Form Submission with Turnstile Verification

表单提交逻辑 SHALL 包含 Turnstile token，并在 Server Actions 中验证 token 的有效性。

#### Scenario: Send OTP with valid Turnstile token

- **WHEN** 用户完成 Turnstile 验证并点击"发送验证码"按钮
- **THEN** 表单提交 Server Action 时包含 `turnstileToken` 参数
- **AND** Server Action 调用 `verifyTurnstileToken` 函数验证 token
- **AND** 验证通过后，系统发送验证码（短信或邮件）
- **AND** 用户收到成功反馈消息

#### Scenario: Send OTP with invalid Turnstile token

- **WHEN** 用户提交表单但 Turnstile token 无效或已过期
- **THEN** Server Action 验证 token 失败
- **AND** 系统返回错误消息"人机验证失败，请刷新页面重试"
- **AND** 不发送验证码
- **AND** 前端显示错误提示给用户

#### Scenario: Send OTP without Turnstile token

- **WHEN** 用户尝试在未完成 Turnstile 验证的情况下点击"发送验证码"
- **THEN** 发送按钮应为禁用状态（直到 Turnstile 验证完成）
- **OR** 系统返回错误消息"请完成人机验证"
- **AND** 不发送验证码

#### Scenario: User registration with valid Turnstile token

- **WHEN** 用户完成 Turnstile 验证并提交注册表单
- **THEN** 注册 Server Action 包含 `turnstileToken` 参数
- **AND** Server Action 验证 token 通过
- **AND** 系统创建用户账户
- **AND** 用户收到注册成功反馈

#### Scenario: User registration with invalid Turnstile token

- **WHEN** 用户提交注册表单但 Turnstile token 无效
- **THEN** Server Action 验证 token 失败
- **AND** 系统返回错误消息"人机验证失败，请重试"
- **AND** 不创建用户账户
- **AND** 前端显示错误提示给用户
