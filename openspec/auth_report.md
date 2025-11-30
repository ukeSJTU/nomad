# 认证系统技术分析

## 1. 模块功能

Nomad 认证模块提供了一个全面的、多渠道的身份管理系统。它支持以下核心功能：

*   **多渠道登录/注册：**
    *   **电子邮件：** 基于密码和基于 OTP（一次性密码）的认证。
    *   **电话：** 基于短信 OTP 的认证，支持自动创建账户。
    *   **社交：** 集成 GitHub OAuth。
*   **账户管理：**
    *   **账户绑定：** 用户可以将多个提供商（例如 GitHub）绑定到单个账户。
    *   **解绑：** 安全地解除绑定账户，并进行检查以防止完全锁定（需要至少保留一种登录方式）。
    *   **个人资料更新：** 用户可以更新电子邮件、电话号码和密码。
*   **安全功能：**
    *   **CAPTCHA：** 集成 Cloudflare Turnstile 用于敏感操作。
    *   **速率限制：** 基于数据库的请求限制，以防止滥用。
    *   **会话管理：** 安全的、基于 Cookie 的会话，支持自动处理。

## 2. 技术栈

认证系统构建在现代的、类型安全的栈上：

*   **核心库：** `better-auth` (v1) - 处理核心认证状态机、会话管理和提供商集成。
*   **数据库适配器：** `better-auth/adapters/drizzle` - 通过 Drizzle ORM 连接到 PostgreSQL。
*   **ORM：** Drizzle ORM - 定义用户、会话、账户和验证令牌的模式。
*   **框架集成：** Next.js Server Actions - 作为前端的主要 API 接口。
*   **安全：**
    *   **Cloudflare Turnstile：** 用于机器人防护。
    *   **Faker：** 用于为首次注册电话的用户生成临时用户名。

## 3. 代码结构

代码遵循清晰的职责分离，分为基础设施层、领域层和应用层：

### 基础设施层（配置）
*   **`src/infra/auth/better-auth.plugin.ts`**：中心配置枢纽。它初始化 `better-auth` 实例，配置插件（验证码、电话、电子邮件 OTP），并设置 Drizzle 适配器。
*   **`src/db/schema/auth.ts`**：定义数据库表：`user`、`session`、`account`、`verification` 和 `rate_limit`。

### 领域层（业务逻辑）
*   **`src/domains/auth/auth.service.ts`**：包含纯业务逻辑。它处理验证（密码强度、电话格式）和复杂的事务操作，例如在数据库事务中安全地解除账户绑定。
*   **`src/domains/auth/auth.repository.ts`**：（推断）处理服务层的直接数据库交互。

### 应用层（控制器和 UI）
*   **`app/_actions/auth.ts`**：作为 API 控制器的 Next.js Server Actions。它们接收客户端请求，执行初步验证（区分电子邮件和电话），并委托给 `better-auth` API 或领域服务。
*   **`app/api/auth/[...all]/route.ts`**：标准的 `better-auth` API 路由处理器。
*   **`app/_hooks/use-signin-flow.ts`**：一个自定义 React Hook，管理登录/注册的客户端状态，封装服务器操作并处理 UI 反馈（提示、加载状态）。
*   **`src/middleware.ts`**：通过检查会话 Cookie 来处理路由保护，并重定向未经授权的用户。

## 4. 安全措施

*   **机器人防护：** 关键端点（注册、登录、OTP 请求）受 Cloudflare Turnstile 保护，在 `better-auth.plugin.ts` 中配置。
*   **速率限制：** 数据库中存在 `rate_limit` 表，并启用了 `rateLimit` 插件，提供针对暴力破解攻击的持久保护。
*   **事务完整性：** 关键操作（例如解除账户绑定 `unlinkSocialAccount`）在数据库事务中运行，以确保数据一致性并防止竞态条件。
*   **输入验证：**
    *   **客户端：** 基本格式检查。
    *   **服务器动作：** 区分电话/电子邮件的逻辑 (`resolveAccountType`)。
    *   **领域服务：** 严格的业务规则（密码复杂度、电话格式）。
*   **安全默认值：** 通过 `better-auth` 使用 `httpOnly` Cookie 和自动会话失效/续订。

## 5. 潜在风险与观察

*   **占位符数据：** 仅限电话注册的用户会生成一个占位符电子邮件 (`${phoneNumber}@nomad.com`)，并通过 `faker` 生成一个随机名称。
    *   *风险：* 如果系统依赖于电子邮件唯一性或稍后发送实际电子邮件，这些占位符可能会导致问题。如果用户看到这个自动生成的电子邮件，可能会引起困惑。
*   **电话号码格式：** 系统强制要求电话号码以 `+86` 开头。
    *   *限制：* 这目前将应用程序限制在中国市场。国际化扩展将需要重构 `auth.service.ts` 中的验证逻辑。
*   **硬编码字符串：** 某些错误消息和验证规则在 actions/service 文件中是硬编码的。将来实现国际化 (i18n) 可能会更加困难。

## 6. 优化建议

1.  **统一验证模式：** 将验证规则（目前在 `auth.service.ts` 和 `validateAccount` 工具中）提取到共享的 Zod 模式库中。这确保客户端和服务器使用完全相同的验证逻辑。
2.  **处理占位符电子邮件：** 为仅通过电话注册的用户实施明确的“完成个人资料”流程，提示他们设置真实的电子邮件地址和密码以替换自动生成的。
3.  **国际化：** 如果计划未来扩展，将电话号码验证抽象化以支持其他国家/地区代码。
4.  **类型安全的客户端包装器：** `better-auth` 客户端非常强大。确保前端充分利用其生成的类型进行 `useSession`，以避免手动类型转换。

## 7. 数据传输路径与调用依赖

本节描述了认证系统中的关键数据流向以及模块间的调用依赖关系。

### 7.1 数据传输路径 (Data Flow)

以下描述了典型操作（以**手机验证码登录/注册**为例）的数据完整流向：

1.  **用户输入 (Client UI)**:
    *   用户在前端表单 (`signin-form.tsx`) 输入手机号。
    *   前端 React Hook (`use-signin-flow.ts`) 调用发送验证码逻辑。

2.  **网络请求 (Client -> Server)**:
    *   Hook 调用 `sendPhoneOtpAction` (Server Action)。
    *   **数据包**: `{ phoneNumber: "138...", turnstileToken: "..." }`

3.  **应用控制器 (Server Action Layer)**:
    *   文件: `app/_actions/auth.ts`
    *   动作: 验证 Turnstile Token (通过 Middleware/Plugin)，调用 `auth.api.sendPhoneNumberOTP`。

4.  **核心认证逻辑 (Better-Auth Core)**:
    *   文件: `src/infra/auth/better-auth.plugin.ts`
    *   动作: `better-auth` 接收请求，生成 OTP。
    *   插件: 调用 `phoneNumber` 插件配置的 `sendOTP` 函数。

5.  **基础设施/外部服务 (Infrastructure)**:
    *   文件: `src/infra/auth/otp-channels.ts` (推断)
    *   动作: 通过短信服务商（如阿里云/腾讯云）发送短信。

6.  **登录/验证阶段**:
    *   用户输入验证码 -> `signInWithOtpAction` (Server Action)。
    *   Action 解析账号类型 (`resolveAccountType`) -> 确定是手机号。
    *   调用 `auth.api.verifyPhoneNumber`。
    *   `better-auth` 验证 OTP -> 成功 -> 生成 Session Token。

7.  **持久化 (Database Persistence)**:
    *   `better-auth` 使用 `drizzleAdapter`。
    *   **Write**: 在 `user` 表创建/更新用户，在 `session` 表写入新会话。
    *   **Cookie**: 通过 `nextCookies` 插件，将 `Set-Cookie` 头信息附加到 Server Action 的响应中，返回给客户端。

### 7.2 调用与依赖图谱 (Call & Dependency Graph)

系统模块间的层级调用关系如下（箭头表示“依赖/调用”）：

```mermaid
graph TD
    %% 前端层
    UI[前端组件 (Components)] -->|调用| Hooks[自定义 Hooks (use-signin-flow)]
    Hooks -->|调用 RPC| Actions[Server Actions (app/_actions/auth.ts)]

    %% 应用控制器层
    Actions -->|使用| Utils[工具函数 (Validation/Account Resolver)]
    Actions -->|调用| DomainService[领域服务 (auth.service.ts)]
    Actions -->|调用| BetterAuthAPI[Better-Auth 实例 (infra/auth)]

    %% 领域层
    DomainService -->|校验| Utils
    DomainService -->|读写| Repository[数据仓库 (infra/auth.repository)]
    DomainService -->|事务控制| DB_Tx[Database Transaction]

    %% 基础设施层
    BetterAuthAPI -->|配置| Config[Better-Auth Plugin Config]
    Config -->|依赖| DrizzleAdapter[Drizzle Adapter]
    Config -->|依赖| SecurityPlugins[Plugins: Turnstile, RateLimit]
    
    %% 数据持久层
    Repository -->|操作| DBSchema[DB Schema (src/db/schema/auth.ts)]
    DrizzleAdapter -->|操作| DBSchema
    DBSchema -->|映射| PostgreSQL[(PostgreSQL Database)]
```

### 7.3 关键文件依赖链

*   **入口**: `app/page.tsx` (或其他页面)
    *   `import` -> `app/_components/auth/signin-form.tsx`
*   **组件**: `signin-form.tsx`
    *   `import` -> `app/_hooks/use-signin-flow.ts`
*   **Hook**: `use-signin-flow.ts`
    *   `import` -> `app/_actions/auth.ts` (Server Actions)
*   **Server Action**: `app/_actions/auth.ts`
    *   `import` -> `src/infra/auth/index.ts` (Better-Auth Instance)
    *   `import` -> `src/domains/auth/auth.service.ts` (Business Logic)
*   **Config**: `src/infra/auth/better-auth.plugin.ts`
    *   `import` -> `src/db/index.ts` (Database Connection)
    *   `import` -> `src/db/schema/auth.ts` (Schema Definitions)
