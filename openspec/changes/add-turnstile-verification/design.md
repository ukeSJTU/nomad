# Turnstile Integration Design

## Context

Cloudflare Turnstile 是 Cloudflare 提供的免费、用户友好的人机验证服务，作为 Google reCAPTCHA 的替代方案。它提供：

- 无需手动交互的智能验证（大多数情况下）
- 对用户体验影响最小
- 完全免费的 CAPTCHA 替代方案
- 支持明暗主题
- 隐私友好（GDPR 合规）

**Constraints:**

- 必须使用官方 React 库 `@marsidev/react-turnstile`（维护良好，TypeScript 支持）
- 验证必须在服务端进行（不可信任客户端 token）
- 需要处理 Turnstile 加载失败的情况
- 必须支持开发环境的便捷调试（使用 testing keys）

**Stakeholders:**

- 用户：期望无缝的验证体验，不希望被复杂的验证码打断
- 开发团队：需要简单可维护的集成方案
- 系统管理员：需要保护系统免受滥用

## Goals / Non-Goals

**Goals:**

- ✅ 保护短信和邮箱验证码发送操作
- ✅ 保护用户注册操作
- ✅ 支持明暗主题自动适配
- ✅ 在开发环境提供便捷的测试体验
- ✅ 提供可复用的 Turnstile React 组件
- ✅ 服务端验证 Turnstile token 的有效性

**Non-Goals:**

- ❌ 不保护所有 API 端点（仅保护敏感操作）
- ❌ 不实现自定义的人机验证算法
- ❌ 不支持其他 CAPTCHA 服务（如 reCAPTCHA、hCaptcha）
- ❌ 不在此阶段实现速率限制（Rate Limiting）- 这是独立的安全层

## Decisions

### 1. Use React Turnstile Library

**Decision:** 使用 `@marsidev/react-turnstile` 作为官方推荐的 React 集成库

**Rationale:**

- Cloudflare 官方文档推荐
- 维护活跃，TypeScript 支持良好
- 提供简单的 React Hooks API
- 支持主题切换和所有 Turnstile 配置选项

**Alternatives Considered:**

- 直接使用 Turnstile JavaScript API：需要手动处理 DOM 操作，不符合 React 最佳实践
- 自己封装组件：重复造轮子，维护成本高

### 2. Reusable Component Pattern

**Decision:** 创建可复用的 `<TurnstileWidget>` 组件而非在每个表单中重复集成逻辑

**Rationale:**

- DRY 原则：避免在多个表单中重复相同的集成代码
- 一致性：保证所有表单的 Turnstile 行为一致
- 可维护性：集中管理 Turnstile 配置和主题适配逻辑
- 易测试：可以独立测试 Turnstile 组件

**Implementation:**

```tsx
// src/components/security/turnstile-widget.tsx
"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export function TurnstileWidget({
  onSuccess,
  onError,
  onExpire,
}: TurnstileWidgetProps) {
  const { resolvedTheme } = useTheme();
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"; // Testing key

  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onSuccess}
      onError={onError}
      onExpire={onExpire}
      options={{
        theme: resolvedTheme === "dark" ? "dark" : "light",
        size: "normal",
      }}
    />
  );
}
```

### 3. Server-Side Token Verification

**Decision:** 在 Server Actions 中创建 `verifyTurnstileToken` 工具函数统一处理验证逻辑

**Rationale:**

- 安全性：客户端 token 不可信任，必须服务端验证
- 可复用：多个 Server Actions 可以调用相同的验证函数
- 集中管理：所有验证逻辑和错误处理在一处
- 易于测试和 mock

**Implementation:**

```typescript
// src/lib/turnstile.ts
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.warn("TURNSTILE_SECRET_KEY not configured");
    // Development mode: allow bypass
    if (process.env.NODE_ENV !== "production") {
      return { success: true };
    }
    return { success: false, error: "Turnstile not configured" };
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          remoteip: remoteIp,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      console.error("Turnstile verification failed:", data["error-codes"]);
      return {
        success: false,
        error: data["error-codes"]?.join(", ") || "Verification failed",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return { success: false, error: "Verification request failed" };
  }
}
```

### 4. Development vs Production Environment Handling

**Decision:** 使用 Turnstile 官方提供的 testing keys 用于开发环境

**Testing Keys:**

- Site Key (可见通过): `1x00000000000000000000AA`
- Site Key (总是失败): `2x00000000000000000000AB`
- Site Key (需要交互): `3x00000000000000000000FF`

**Rationale:**

- 开发便利性：无需真实的 Cloudflare 账户即可本地开发和测试
- 测试覆盖：可以测试成功、失败、交互等不同场景
- 符合最佳实践：Cloudflare 官方推荐的开发方式

**Configuration:**

```bash
# .env.local (development)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# .env.production
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<your-real-site-key>
TURNSTILE_SECRET_KEY=<your-real-secret-key>
```

### 5. Theme Integration Strategy

**Decision:** 使用 `next-themes` 的 `resolvedTheme` 自动适配明暗主题

**Rationale:**

- 项目已使用 `next-themes` 管理主题
- `resolvedTheme` 返回实际解析的主题（考虑系统偏好）
- Turnstile 原生支持 `theme` 选项
- 自动跟随用户主题切换，无需额外状态管理

**Caveat:**

- `TurnstileWidget` 必须是 Client Component（`"use client"`）
- 需要在 `useEffect` 或组件挂载后才能正确获取 `resolvedTheme`

### 6. Integration Points

**Decision:** 在以下位置集成 Turnstile：

1. **OTP 发送操作：**
   - Email OTP Login Form (`email-otp-login.tsx`)
   - Phone OTP Login Form (`phone-otp-login.tsx`)
   - Update Email Form (`update-email-form.tsx`)
   - Update Phone Form (`update-phone-form.tsx`)

2. **用户注册：**
   - Signup Form (`signup-form.tsx` 或相应的注册表单)

**Placement:**

- 在"发送验证码"按钮下方或附近显示 Turnstile widget
- 使 widget 视觉上与表单流程自然融合

**Rationale:**

- 这些是最容易被滥用的敏感操作
- 在用户操作前进行验证，防止批量自动化请求
- 不影响已登录用户的正常操作流程

### 7. Error Handling Strategy

**Decision:** 实现 graceful degradation - Turnstile 失败不应完全阻止功能

**Behavior:**

- 开发环境：Turnstile 验证失败仅记录警告，允许操作继续
- 生产环境：Turnstile 验证失败返回用户友好的错误消息
- 网络问题：提示用户稍后重试
- Token 过期：自动触发 Turnstile 重新验证

**Rationale:**

- 可用性优先：避免因 Cloudflare 服务问题导致功能完全不可用
- 开发体验：开发时不因验证问题阻塞开发流程
- 用户体验：给用户明确的反馈而非神秘的失败

## API Specification Updates

### New API/Functions

#### `verifyTurnstileToken(token: string, remoteIp?: string)`

**Location:** `src/lib/turnstile.ts`

**Purpose:** 服务端验证 Turnstile token 的有效性

**Parameters:**

- `token: string` - Turnstile 返回的验证 token
- `remoteIp?: string` - 可选的用户 IP 地址（提高验证准确性）

**Returns:** `Promise<{ success: boolean; error?: string }>`

- `success: true` - 验证通过
- `success: false, error: string` - 验证失败及原因

**Example:**

```typescript
const result = await verifyTurnstileToken(token);
if (!result.success) {
  return { error: "人机验证失败，请刷新页面重试" };
}
```

#### `TurnstileWidget` Component

**Location:** `src/components/security/turnstile-widget.tsx`

**Purpose:** 可复用的 Turnstile React 组件

**Props:**

```typescript
interface TurnstileWidgetProps {
  onSuccess: (token: string) => void; // Token 验证成功回调
  onError?: () => void; // 加载或验证失败回调
  onExpire?: () => void; // Token 过期回调（120秒后）
}
```

**Usage Example:**

```tsx
<TurnstileWidget
  onSuccess={token => {
    setTurnstileToken(token);
  }}
  onError={() => {
    toast.error("验证组件加载失败，请刷新页面");
  }}
  onExpire={() => {
    setTurnstileToken(null); // 清空过期的 token
  }}
/>
```

### Modified Server Actions

需要修改以下 Server Actions 添加 Turnstile 验证：

1. **Send Email OTP**
   - 添加 `turnstileToken` 参数
   - 调用 `verifyTurnstileToken` 验证

2. **Send Phone OTP**
   - 添加 `turnstileToken` 参数
   - 调用 `verifyTurnstileToken` 验证

3. **User Registration**
   - 添加 `turnstileToken` 参数
   - 调用 `verifyTurnstileToken` 验证

**Note:** 具体的 Server Action 函数名和位置需在 Phase 5 实现时确认。

### Environment Variables

**新增环境变量：**

```bash
# Public - 在客户端可见
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key

# Secret - 仅在服务端使用
TURNSTILE_SECRET_KEY=your-secret-key
```

**配置文档位置：**

- 添加到 `.env.example`
- 更新 README.md 或 `content/docs/` 中的环境配置文档

## Risks / Trade-offs

### Risks

1. **用户体验影响**
   - Risk: Turnstile 加载时间可能影响表单交互
   - Mitigation: 使用异步加载，不阻塞其他表单元素

2. **第三方服务依赖**
   - Risk: Cloudflare 服务中断会影响验证功能
   - Mitigation: 实现 graceful degradation，开发环境使用 bypass

3. **隐私顾虑**
   - Risk: 用户可能担心隐私数据被 Cloudflare 收集
   - Mitigation: Turnstile 是 GDPR 合规的，可在隐私政策中说明

### Trade-offs

1. **额外的网络请求**
   - Trade-off: 增加了前端加载和后端验证的网络请求
   - Benefit: 有效防止滥用，减少短信/邮件服务成本

2. **用户流程增加一步**
   - Trade-off: 用户需要等待 Turnstile 验证（通常自动完成）
   - Benefit: 显著提升安全性，减少虚假注册和恶意请求

3. **开发复杂度增加**
   - Trade-off: 需要管理额外的环境变量和验证逻辑
   - Benefit: 使用官方库和 testing keys 降低了开发负担

## Migration Plan

### Phase 1: Setup (Phase 4 - Test Writing)

1. 添加 `@marsidev/react-turnstile` 依赖
2. 创建 `TurnstileWidget` 组件
3. 创建 `verifyTurnstileToken` 函数
4. 添加环境变量到 `.env.example`

### Phase 2: Integration (Phase 5 - Implementation)

1. 在各个表单组件中集成 `TurnstileWidget`
2. 修改 Server Actions 添加 token 验证
3. 更新表单提交逻辑传递 turnstile token

### Phase 3: Testing (Phase 5 - Implementation)

1. 使用 testing keys 进行本地测试
2. 测试成功、失败、过期等场景
3. 测试明暗主题切换
4. 进行 E2E 测试验证完整流程

### Phase 4: Documentation (Phase 6 - Documentation)

1. 更新 `.env.example` 和配置文档
2. 添加 JSDoc 注释
3. 更新用户文档说明验证流程

### Phase 5: Production Deployment

1. 创建 Cloudflare Turnstile 站点（免费）
2. 配置生产环境的 site key 和 secret key
3. 部署到 Vercel，验证功能正常

### Rollback Plan

如果集成出现问题：

1. 移除前端 `TurnstileWidget` 组件调用
2. 移除 Server Actions 中的 token 验证代码
3. 保留 `turnstile.ts` 和组件代码以便后续修复

## Open Questions

1. **是否需要对所有用户还是仅对匿名用户启用 Turnstile？**
   - 建议：对所有用户启用，因为已登录用户也可能进行滥用行为
2. **Turnstile token 的有效期是多久？**
   - Cloudflare 文档：token 有效期为 300 秒（5 分钟）
   - 需要处理 token 过期场景：使用 `onExpire` 回调

3. **是否需要在所有环境（开发、测试、生产）都启用 Turnstile？**
   - 建议：开发环境使用 testing keys，生产环境使用真实 keys

4. **如何处理 Turnstile 在中国大陆的可用性问题？**
   - Cloudflare CDN 在中国大陆有节点，通常可访问
   - 如果出现问题，可考虑 graceful degradation 策略
