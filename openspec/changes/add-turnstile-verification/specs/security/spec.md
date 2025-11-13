## ADDED Requirements

### Requirement: Turnstile Token Server-Side Verification

系统 SHALL 在服务端验证 Cloudflare Turnstile token 的有效性，确保客户端提交的人机验证结果可信。

#### Scenario: Verify valid Turnstile token

- **WHEN** Server Action 收到有效的 Turnstile token
- **THEN** 系统调用 `verifyTurnstileToken(token)` 函数
- **AND** 函数向 Cloudflare Turnstile API 发送验证请求
- **AND** Cloudflare 返回 `success: true`
- **AND** 函数返回 `{ success: true }`
- **AND** Server Action 继续执行业务逻辑（发送验证码、注册用户等）

#### Scenario: Verify invalid Turnstile token

- **WHEN** Server Action 收到无效或伪造的 Turnstile token
- **THEN** 系统调用 `verifyTurnstileToken(token)` 函数
- **AND** Cloudflare 返回 `success: false` 及错误代码
- **AND** 函数返回 `{ success: false, error: "error message" }`
- **AND** Server Action 返回用户友好的错误消息
- **AND** 不执行敏感操作（如发送验证码）

#### Scenario: Verify expired Turnstile token

- **WHEN** Server Action 收到已过期的 Turnstile token（超过 300 秒）
- **THEN** Cloudflare 返回 `success: false` 及 `timeout-or-duplicate` 错误代码
- **AND** 函数返回 `{ success: false, error: "Token expired" }`
- **AND** Server Action 返回错误消息"验证已过期，请重新验证"
- **AND** 前端应触发 Turnstile 重新验证

#### Scenario: Turnstile API request fails

- **WHEN** 向 Cloudflare Turnstile API 发送验证请求时发生网络错误
- **THEN** `verifyTurnstileToken` 函数捕获异常
- **AND** 函数记录错误日志（使用 Pino logger）
- **AND** 函数返回 `{ success: false, error: "Verification request failed" }`
- **AND** Server Action 返回错误消息"验证服务暂时不可用，请稍后重试"

#### Scenario: Turnstile not configured in development

- **WHEN** 开发环境未配置 `TURNSTILE_SECRET_KEY` 环境变量
- **THEN** `verifyTurnstileToken` 函数检测到缺少配置
- **AND** 函数记录警告日志"TURNSTILE_SECRET_KEY not configured"
- **AND** 如果 `NODE_ENV !== "production"`，函数返回 `{ success: true }`（允许 bypass）
- **AND** 开发者可以正常测试功能，无需配置真实 Turnstile keys

#### Scenario: Turnstile not configured in production

- **WHEN** 生产环境未配置 `TURNSTILE_SECRET_KEY` 环境变量
- **THEN** `verifyTurnstileToken` 函数返回 `{ success: false, error: "Turnstile not configured" }`
- **AND** Server Action 返回错误消息
- **AND** 功能无法使用，管理员需要配置环境变量

### Requirement: Turnstile Integration with OTP Sending

发送 OTP 的 Server Actions SHALL 验证 Turnstile token，保护短信和邮件服务免受滥用。

#### Scenario: Send email OTP with Turnstile protection

- **WHEN** 用户请求发送邮箱验证码（通过 Email OTP Login 或 Update Email）
- **THEN** 前端传递 `turnstileToken` 参数到 Server Action
- **AND** Server Action 首先调用 `verifyTurnstileToken(turnstileToken)`
- **AND** 如果验证失败，返回错误并终止操作
- **AND** 如果验证通过，调用 `sendEmailOtp(email, code)` 发送邮件
- **AND** 返回成功消息给前端

#### Scenario: Send phone OTP with Turnstile protection

- **WHEN** 用户请求发送手机号验证码（通过 Phone OTP Login 或 Update Phone）
- **THEN** 前端传递 `turnstileToken` 参数到 Server Action
- **AND** Server Action 首先调用 `verifyTurnstileToken(turnstileToken)`
- **AND** 如果验证失败，返回错误并终止操作
- **AND** 如果验证通过，调用 `sendSmsOtp(phoneNumber, code)` 发送短信
- **AND** 返回成功消息给前端

#### Scenario: Better Auth sendOTP callback with Turnstile

- **WHEN** Better Auth 的 `phoneNumber` 插件触发 `sendOTP` 回调
- **THEN** 回调函数应验证 Turnstile token（如果从 request 中获取）
- **AND** 验证通过后调用 `sendSmsOtp(phoneNumber, code)`
- **AND** 如果验证失败，抛出错误阻止 OTP 发送

### Requirement: Turnstile Integration with User Registration

用户注册 Server Action SHALL 验证 Turnstile token，防止批量自动化注册。

#### Scenario: Register user with valid Turnstile token

- **WHEN** 用户提交注册表单（邮箱 + 密码）
- **THEN** 前端传递 `turnstileToken` 参数到注册 Server Action
- **AND** Server Action 调用 `verifyTurnstileToken(turnstileToken)`
- **AND** 验证通过后，系统使用 Better Auth 创建用户账户
- **AND** 返回成功消息，用户可以登录

#### Scenario: Register user with invalid Turnstile token

- **WHEN** 用户提交注册表单但 Turnstile token 无效
- **THEN** Server Action 验证 token 失败
- **AND** 系统不创建用户账户
- **AND** 返回错误消息"人机验证失败，请重试"
- **AND** 前端显示错误提示

#### Scenario: Prevent automated bulk registration

- **WHEN** 自动化脚本尝试批量调用注册 API
- **THEN** 由于缺少有效的 Turnstile token，所有请求被拒绝
- **AND** 系统记录异常请求日志（可选：添加 IP 黑名单）
- **AND** 恶意注册被有效阻止

### Requirement: Environment Configuration for Turnstile

系统 SHALL 支持通过环境变量配置 Turnstile site key 和 secret key。

#### Scenario: Configure Turnstile for development

- **WHEN** 开发者在本地开发环境运行项目
- **THEN** 可以使用 Turnstile testing keys（如 `1x00000000000000000000AA`）
- **AND** 在 `.env.local` 中配置：
  ```
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
  TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
  ```
- **AND** Turnstile 自动通过验证，不阻塞开发流程

#### Scenario: Configure Turnstile for production

- **WHEN** 管理员部署项目到生产环境（Vercel）
- **THEN** 需要在 Vercel 环境变量中配置真实 Turnstile keys：
  ```
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=<real-site-key>
  TURNSTILE_SECRET_KEY=<real-secret-key>
  ```
- **AND** 前端使用真实 site key 加载 Turnstile 组件
- **AND** 后端使用真实 secret key 验证 token

#### Scenario: Missing environment variables in production

- **WHEN** 生产环境缺少 `TURNSTILE_SECRET_KEY` 配置
- **THEN** 系统记录错误日志"TURNSTILE_SECRET_KEY not configured"
- **AND** 所有需要 Turnstile 验证的操作返回错误
- **AND** 管理员收到配置警告（通过日志监控）

#### Scenario: Environment variables documented

- **WHEN** 开发者查看项目的 `.env.example` 文件
- **THEN** 文件中包含 Turnstile 配置示例：
  ```bash
  # Cloudflare Turnstile (Human Verification)
  # Get your keys from: https://dash.cloudflare.com/
  # Development: Use testing keys (1x00000000000000000000AA)
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
  TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
  ```
- **AND** README.md 或文档中包含如何获取和配置 Turnstile keys 的说明

### Requirement: Graceful Degradation for Turnstile Failures

系统 SHALL 在 Turnstile 服务不可用或验证失败时提供合理的降级处理。

#### Scenario: Turnstile script fails to load

- **WHEN** Cloudflare Turnstile 脚本由于网络问题加载失败
- **THEN** `TurnstileWidget` 组件触发 `onError` 回调
- **AND** 表单显示友好的错误提示"验证组件加载失败，请刷新页面或检查网络"
- **AND** 用户可以选择刷新页面重试
- **AND** 开发环境下，可以考虑允许 bypass（根据项目需求决定）

#### Scenario: Turnstile API temporarily unavailable

- **WHEN** Cloudflare Turnstile 验证 API 暂时不可用（返回 5xx 错误）
- **THEN** `verifyTurnstileToken` 函数返回 `{ success: false, error: "Service unavailable" }`
- **AND** Server Action 返回用户友好的错误"验证服务暂时不可用，请稍后重试"
- **AND** 系统记录错误日志，便于监控和排查

#### Scenario: Development environment bypass

- **WHEN** 开发环境未配置真实 Turnstile keys 或使用 testing keys
- **THEN** `verifyTurnstileToken` 函数检测到 `NODE_ENV !== "production"`
- **AND** 函数允许 bypass，返回 `{ success: true }`
- **AND** 记录警告日志但不阻止功能
- **AND** 开发者可以正常测试验证码发送和注册流程
