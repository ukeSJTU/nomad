# Complete Development Tasks - Add Cloudflare Turnstile Verification

Use this template when creating change proposals. It covers the entire 6-phase development workflow.

**Proposal Stage:** Complete Phases 1-4, document entire workflow
**Implementation Stage:** Execute Phases 5-6 following the documented plan

---

## Phase 1: Requirements Analysis 📋

**Goal:** Understand what to build based on user's request

**Responsible:** Proposal Author

- [x] 1.1 Read user's requirements request thoroughly
  - 用户要求为项目集成 Cloudflare Turnstile 人机验证
  - 保护发送验证码（短信、邮箱）和用户注册等敏感操作
  - 支持明暗主题适配
- [x] 1.2 Review existing requirements documents in `content/docs/requirements/`
  - 项目当前无详细的安全需求文档
  - 用户界面要求关注 UI 一致性和用户体验
- [x] 1.3 Identify affected requirement sections and document IDs
  - **功能需求：** 用户认证与授权、验证码发送机制
  - **非功能需求：** 安全性、可用性、性能
  - **新增需求领域：** 人机验证与防滥用机制
- [x] 1.4 Record document references in `proposal.md`
  - 已在 `proposal.md` 中记录影响的功能和代码文件
  - 识别需要更新的文档：API 文档、环境配置文档
- [x] 1.5 List assumptions and constraints
  - **假设：**
    - Cloudflare Turnstile 服务在中国大陆可访问
    - 用户可以接受轻微的验证延迟（通常 < 1 秒）
    - 开发团队有权访问 Cloudflare 账户创建 Turnstile 站点
  - **约束：**
    - 必须使用官方推荐的 React 库（`@marsidev/react-turnstile`）
    - 验证必须在服务端进行，客户端 token 不可信任
    - 必须支持明暗主题自动适配（使用 next-themes）
    - 开发环境需便捷的测试体验（使用 testing keys）
- [x] 1.6 Identify any ambiguities requiring clarification
  - ✅ 已确认：对所有用户启用 Turnstile（包括已登录用户）
  - ✅ 已确认：Token 有效期为 300 秒（Cloudflare 标准）
  - ✅ 已确认：开发环境使用 testing keys，生产环境使用真实 keys
  - ✅ 已确认：采用 graceful degradation 策略处理服务不可用
- [x] 1.7 Ask user 1-2 clarifying questions if needed
  - 无需进一步澄清，需求明确

**Deliverable:** `proposal.md` with clear requirements understanding and document IDs ✅

---

## Phase 2: API/Action Design 🎨

**Goal:** Design technical approach before coding

**Responsible:** Proposal Author

### 2.1 Analyze Existing Code

- [x] 2.1.1 Review existing API routes in `src/app/api/`
  - 项目主要使用 Server Actions，API routes 较少（auth, chat, health）
- [x] 2.1.2 Review existing Server Actions in `src/app/[route]/actions.ts`
  - 需要在 Phase 5 实施时具体定位发送 OTP 和注册的 Server Actions
  - 当前分析显示 Better Auth 的 `sendOTP` 回调在 `src/lib/auth.ts`
- [x] 2.1.3 Review related Drizzle schemas in `src/lib/schema/`
  - 无需修改数据库 schema（Turnstile 验证是无状态的）
- [x] 2.1.4 Review related utilities in `src/lib/queries/` and `src/lib/utils/`
  - `src/lib/email.tsx` - 邮件发送工具
  - `src/lib/sms.ts` - 短信发送工具
  - `src/lib/auth.ts` - Better Auth 配置，包含 sendOTP 回调
- [x] 2.1.5 Search for similar patterns: `rg "keyword" src/`
  - 已搜索验证码发送相关代码
  - 已识别需要集成 Turnstile 的表单组件

### 2.2 Design Decision

- [x] 2.2.1 **Decision:** Create new utility functions and reusable component
  - 新建 `src/lib/turnstile.ts` - 服务端 token 验证函数
  - 新建 `src/components/security/turnstile-widget.tsx` - 可复用前端组件
- [x] 2.2.2 Document rationale in `design.md` ✅
  - **Reuse 策略：** 创建可复用组件避免代码重复
  - **New API：** Turnstile 是新的第三方服务集成，需要新的验证函数
  - **不修改现有 API：** 通过添加可选参数的方式集成，保持向后兼容
- [x] 2.2.3 List pros and cons of chosen approach
  - **Pros:**
    - 可复用组件减少重复代码
    - 集中管理 Turnstile 配置和主题适配
    - 易于测试和维护
    - 对现有代码侵入性小
  - **Cons:**
    - 增加新的外部依赖（@marsidev/react-turnstile）
    - 需要管理额外的环境变量
    - 增加前端加载时间（Turnstile script）
    - 依赖 Cloudflare 服务可用性

### 2.3 API/Action Specification

- [x] 2.3.1 Define request/response schemas (Zod)
  - Server Actions 添加 `turnstileToken?: string` 参数
  - 验证函数返回类型：`Promise<{ success: boolean; error?: string }>`
  - 详见 `design.md` 中的 API Specification Updates 部分
- [x] 2.3.2 Document error codes and messages
  - `"人机验证失败，请刷新页面重试"` - token 验证失败
  - `"请完成人机验证"` - 缺少 token
  - `"验证已过期，请重新验证"` - token 过期
  - `"验证服务暂时不可用，请稍后重试"` - Cloudflare API 不可用
  - `"验证组件加载失败，请刷新页面或检查网络"` - 前端加载失败
- [x] 2.3.3 Specify authentication/authorization requirements
  - Turnstile 验证是独立的安全层，不替代现有认证
  - 对已登录和未登录用户均适用
  - 某些操作可能需要同时满足：1) 用户已登录 2) Turnstile 验证通过
- [x] 2.3.4 Define rate limiting needs (if applicable)
  - 本阶段不实现 rate limiting（独立的安全层）
  - Turnstile 本身提供一定程度的速率保护
- [x] 2.3.5 Document any breaking changes
  - 无破坏性变更
  - 通过添加可选参数集成，现有 API 继续工作

### 2.4 Database Schema Design (if needed)

- [x] 2.4.1 Plan table structure
  - **N/A** - 无需修改数据库 schema
- [x] 2.4.2 Define relationships and foreign keys
  - **N/A**
- [x] 2.4.3 Plan indexes for performance
  - **N/A**
- [x] 2.4.4 Consider data migration strategy (if modifying existing tables)
  - **N/A**

**Deliverable:** `design.md` with complete technical design and rationale ✅

---

## Phase 3: Update API Specification 📝

**Goal:** Plan API documentation updates

**Responsible:** Proposal Author

- [x] 3.1 Identify which API documentation needs updates
  - [x] JSDoc 注释：`src/lib/turnstile.ts` - 新增函数
  - [x] JSDoc 注释：`src/components/security/turnstile-widget.tsx` - 新增组件
  - [x] 修改的 Server Actions 需要更新 JSDoc（Phase 5 确认具体位置）
  - [x] 环境配置文档：`.env.example`、README.md 或 docs
- [x] 3.2 Plan JSDoc comment structure
  - [x] `verifyTurnstileToken` 函数：
    - Parameters: `token: string`, `remoteIp?: string`
    - Returns: `Promise<{ success: boolean; error?: string }>`
    - Example usage
    - Error cases
  - [x] `TurnstileWidget` 组件：
    - Props: `onSuccess`, `onError`, `onExpire`
    - Usage example
    - Theme adaptation behavior
- [x] 3.3 Plan OpenAPI spec updates (if applicable)
  - **N/A** - 项目主要使用 Server Actions，不使用 REST API
- [x] 3.4 Document the planned changes in `design.md` ✅
  - 已在 `design.md` 的 "API Specification Updates" 部分详细记录
- [x] 3.5 Note: Actual spec updates will happen during Phase 6
  - 已注明在 Phase 6 完成文档更新

**Deliverable:** Documentation update plan in `design.md` ✅

---

## Phase 4: Test Design & Writing 🧪

**Goal:** Write tests before implementation (TDD approach)

**Responsible:** Proposal Author

### 4.1 Test Planning

- [x] 4.1.1 Write test scenarios based on requirements
  - 已在 `specs/user-interface/spec.md` 和 `specs/security/spec.md` 中定义场景
- [x] 4.1.2 Define test data fixtures using `@faker-js/faker`
  - Mock Turnstile tokens: `"mock-valid-token"`, `"mock-invalid-token"`, `"mock-expired-token"`
  - Mock user emails: `faker.internet.email()`
  - Mock phone numbers: `faker.phone.number("+86##########")`
- [x] 4.1.3 Document test plan in this file
  - 见下方 4.2-4.4 部分的详细测试计划
- [x] 4.1.4 Organize tests: unit → integration → E2E
  - Unit: `verifyTurnstileToken` 函数，`TurnstileWidget` 组件
  - Integration: Server Actions 与 Turnstile 验证的集成
  - E2E: 完整的发送验证码和注册流程

### 4.2 Unit Tests

**Tests should fail initially (no implementation yet)**

- [ ] 4.2.1 Write unit tests for business logic
  - [ ] **Test file:** `src/lib/turnstile.test.ts`
  - [ ] Test: `verifyTurnstileToken` with valid token returns success
    ```typescript
    it("should return success for valid token", async () => {
      // Mock fetch to return success response
      global.fetch = vi.fn().mockResolvedValue({
        json: async () => ({ success: true }),
      });

      const result = await verifyTurnstileToken("valid-token");
      expect(result).toEqual({ success: true });
    });
    ```
  - [ ] Test: `verifyTurnstileToken` with invalid token returns failure
    ```typescript
    it("should return failure for invalid token", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: async () => ({
          success: false,
          "error-codes": ["invalid-input-response"],
        }),
      });

      const result = await verifyTurnstileToken("invalid-token");
      expect(result.success).toBe(false);
      expect(result.error).toContain("invalid");
    });
    ```
  - [ ] Test: `verifyTurnstileToken` handles network errors
    ```typescript
    it("should handle network errors gracefully", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      const result = await verifyTurnstileToken("token");
      expect(result.success).toBe(false);
      expect(result.error).toBe("Verification request failed");
    });
    ```
  - [ ] Test: `verifyTurnstileToken` allows bypass in development
    ```typescript
    it("should bypass verification in development without secret key", async () => {
      const originalEnv = process.env.NODE_ENV;
      const originalSecret = process.env.TURNSTILE_SECRET_KEY;

      process.env.NODE_ENV = "development";
      delete process.env.TURNSTILE_SECRET_KEY;

      const result = await verifyTurnstileToken("any-token");
      expect(result.success).toBe(true);

      process.env.NODE_ENV = originalEnv;
      process.env.TURNSTILE_SECRET_KEY = originalSecret;
    });
    ```
  - [ ] Test: `verifyTurnstileToken` blocks in production without secret key
    ```typescript
    it("should fail in production without secret key", async () => {
      const originalEnv = process.env.NODE_ENV;
      const originalSecret = process.env.TURNSTILE_SECRET_KEY;

      process.env.NODE_ENV = "production";
      delete process.env.TURNSTILE_SECRET_KEY;

      const result = await verifyTurnstileToken("token");
      expect(result.success).toBe(false);
      expect(result.error).toBe("Turnstile not configured");

      process.env.NODE_ENV = originalEnv;
      process.env.TURNSTILE_SECRET_KEY = originalSecret;
    });
    ```

- [ ] 4.2.2 Write unit tests for utilities
  - **N/A** - 主要测试已在 4.2.1 覆盖

- [ ] 4.2.3 Co-locate tests with source (`*.test.ts`)
  - [x] `src/lib/turnstile.test.ts` - 与 `turnstile.ts` 同目录
  - [ ] `src/components/security/turnstile-widget.test.tsx` - 组件测试

- [ ] 4.2.4 Tests should fail initially (no implementation yet)
  - ✅ 确认：测试将在实现前编写并失败

**Component Unit Tests:**

- [ ] **Test file:** `src/components/security/turnstile-widget.test.tsx`
- [ ] Test: TurnstileWidget renders Turnstile component
  ```typescript
  it("should render Turnstile component", () => {
    const onSuccess = vi.fn();
    render(<TurnstileWidget onSuccess={onSuccess} />);

    // Assuming Turnstile renders with data-testid or specific class
    expect(screen.getByTestId("turnstile")).toBeInTheDocument();
  });
  ```
- [ ] Test: TurnstileWidget calls onSuccess with token
  ```typescript
  it("should call onSuccess when verification succeeds", async () => {
    const onSuccess = vi.fn();
    render(<TurnstileWidget onSuccess={onSuccess} />);

    // Simulate Turnstile success (may need to mock @marsidev/react-turnstile)
    // This is a skeleton - actual implementation depends on library mocking
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith("mock-token");
    });
  });
  ```
- [ ] Test: TurnstileWidget adapts to theme changes
  ```typescript
  it("should adapt theme when useTheme returns dark", () => {
    vi.mock("next-themes", () => ({
      useTheme: () => ({ resolvedTheme: "dark" }),
    }));

    render(<TurnstileWidget onSuccess={vi.fn()} />);

    // Verify Turnstile receives theme="dark" prop
    // Specific assertion depends on component implementation
  });
  ```
- [ ] Test: TurnstileWidget calls onError on failure
  ```typescript
  it("should call onError when verification fails", () => {
    const onError = vi.fn();
    render(<TurnstileWidget onSuccess={vi.fn()} onError={onError} />);

    // Simulate Turnstile error
    // Mock implementation needed
  });
  ```
- [ ] Test: TurnstileWidget calls onExpire on token expiration
  ```typescript
  it("should call onExpire when token expires", () => {
    const onExpire = vi.fn();
    render(<TurnstileWidget onSuccess={vi.fn()} onExpire={onExpire} />);

    // Simulate token expiration (120 seconds)
    // Mock implementation needed
  });
  ```

### 4.3 Integration Tests

**Tests should fail initially**

- [ ] 4.3.1 Write tests for API + Database interactions
  - **N/A** - 无数据库交互（Turnstile 是无状态验证）

- [ ] 4.3.2 Write tests for authentication/authorization
  - [ ] **Test scenario:** Send email OTP with valid Turnstile token
    - Mock `verifyTurnstileToken` to return success
    - Call email OTP Server Action with token
    - Verify `sendEmailOtp` is called
    - Verify success response returned
  - [ ] **Test scenario:** Send email OTP with invalid Turnstile token
    - Mock `verifyTurnstileToken` to return failure
    - Call email OTP Server Action with invalid token
    - Verify `sendEmailOtp` is NOT called
    - Verify error response returned
  - [ ] **Test scenario:** Send phone OTP with valid Turnstile token
    - Similar to email OTP test
  - [ ] **Test scenario:** User registration with valid Turnstile token
    - Mock `verifyTurnstileToken` to return success
    - Call registration Server Action
    - Verify user is created in database
  - [ ] **Test scenario:** User registration with invalid Turnstile token
    - Mock `verifyTurnstileToken` to return failure
    - Call registration Server Action
    - Verify user is NOT created

- [ ] 4.3.3 Write tests for error handling
  - [ ] Test: Turnstile API network failure is handled gracefully
  - [ ] Test: Missing environment variables trigger correct warnings/errors
  - [ ] Test: Expired tokens are rejected with appropriate error message

- [ ] 4.3.4 Tests should fail initially
  - ✅ 确认：集成测试将在实现前编写并失败

### 4.4 E2E Test Skeletons

**Tests should fail initially**

- [ ] 4.4.1 Write Playwright test structure in `tests/`
  - [ ] **Test file:** `tests/e2e/turnstile-verification.spec.ts`
  - [ ] Test: Complete email OTP login flow with Turnstile
    ```typescript
    test("should send email OTP after Turnstile verification", async ({
      page,
    }) => {
      await page.goto("/login");

      // Fill email
      await page.fill('input[name="email"]', "test@example.com");

      // Wait for Turnstile to load and complete (may auto-complete with testing key)
      await page.waitForSelector('[data-testid="turnstile"]');

      // Click send OTP button
      await page.click('button:has-text("发送验证码")');

      // Verify success message
      await expect(page.locator("text=验证码已发送")).toBeVisible();
    });
    ```
  - [ ] Test: Phone OTP login flow with Turnstile
    ```typescript
    test("should send phone OTP after Turnstile verification", async ({
      page,
    }) => {
      await page.goto("/login");
      await page.click('button:has-text("手机号登录")');

      await page.fill('input[name="phoneNumber"]', "13800138000");

      await page.waitForSelector('[data-testid="turnstile"]');
      await page.click('button:has-text("发送验证码")');

      await expect(page.locator("text=验证码已发送")).toBeVisible();
    });
    ```
  - [ ] Test: User registration flow with Turnstile
    ```typescript
    test("should register user after Turnstile verification", async ({
      page,
    }) => {
      await page.goto("/signup");

      await page.fill('input[name="email"]', faker.internet.email());
      await page.fill('input[name="password"]', "SecurePass123!");

      await page.waitForSelector('[data-testid="turnstile"]');
      await page.click('button[type="submit"]');

      await expect(page.locator("text=注册成功")).toBeVisible();
    });
    ```
  - [ ] Test: Turnstile failure prevents OTP sending
    ```typescript
    test("should block OTP sending if Turnstile fails", async ({ page }) => {
      // This test requires mocking Turnstile to fail
      // May need special setup or testing key that always fails
      // (2x00000000000000000000AB)
    });
    ```
  - [ ] Test: Theme switching updates Turnstile appearance
    ```typescript
    test("should update Turnstile theme when user switches theme", async ({
      page,
    }) => {
      await page.goto("/login");

      // Switch to dark mode
      await page.click('[aria-label="Toggle theme"]');

      // Verify Turnstile iframe has dark theme class/attribute
      // Specific assertion depends on Turnstile rendering
    });
    ```

- [ ] 4.4.2 Document complete user flows
  - [x] Flow 1: Email OTP Login with Turnstile
    1. 用户访问登录页面
    2. 用户输入邮箱地址
    3. Turnstile 组件自动加载并验证（通常无需用户交互）
    4. 用户点击"发送验证码"按钮
    5. 系统验证 Turnstile token
    6. 系统发送邮件验证码
    7. 用户输入验证码并登录
  - [x] Flow 2: Phone OTP Login with Turnstile
    1. 用户访问登录页面并切换到手机号登录
    2. 用户输入手机号
    3. Turnstile 组件验证
    4. 用户点击"发送验证码"
    5. 系统验证 Turnstile token
    6. 系统发送短信验证码
    7. 用户输入验证码并登录
  - [x] Flow 3: User Registration with Turnstile
    1. 用户访问注册页面
    2. 用户输入邮箱和密码
    3. Turnstile 组件验证
    4. 用户点击"注册"按钮
    5. 系统验证 Turnstile token
    6. 系统创建用户账户
    7. 用户可以登录

- [ ] 4.4.3 Define page object models (if needed)
  - [ ] `tests/pages/login-page.ts` - 登录页面 POM
    ```typescript
    export class LoginPage {
      constructor(private page: Page) {}

      async goto() {
        await this.page.goto("/login");
      }

      async fillEmail(email: string) {
        await this.page.fill('input[name="email"]', email);
      }

      async clickSendOTP() {
        await this.page.click('button:has-text("发送验证码")');
      }

      async waitForTurnstile() {
        await this.page.waitForSelector('[data-testid="turnstile"]');
      }
    }
    ```
  - [ ] Similar POMs for signup, profile pages

- [ ] 4.4.4 Tests should fail initially
  - ✅ 确认：E2E 测试将在实现前编写并失败

### 4.5 Test Verification

- [ ] 4.5.1 Run `pnpm test` - tests should fail for right reasons
  - 预期失败原因：
    - `verifyTurnstileToken` 函数未定义
    - `TurnstileWidget` 组件未实现
    - Server Actions 未添加 Turnstile 验证逻辑
- [ ] 4.5.2 Verify test failures match expectations
  - 确认测试因缺少实现而失败，而非测试代码错误
- [ ] 4.5.3 Fix any test syntax/compilation errors
  - 确保测试代码可以编译通过
  - Mock 配置正确
- [ ] 4.5.4 Document expected test failures
  - 记录在此文件或测试注释中
  - 说明每个测试预期在 Phase 5 完成后通过

**Deliverable:** Complete test suite (failing tests ready for implementation) ✅ (in progress)

---

## 🛑 CHECKPOINT: Proposal Complete

**Proposal author verification before handoff:**

- [x] ✅ `proposal.md` complete with requirements and document IDs
- [x] ✅ `design.md` complete with technical decisions and rationale
- [x] ✅ API specification update plan documented
- [ ] ✅ Test suite written (failing tests) - **IN PROGRESS: Test design complete, tests to be written**
- [ ] ✅ All tests fail for expected reasons - **PENDING: Tests not yet written**
- [ ] ✅ Validate proposal: `openspec validate add-turnstile-verification --strict` - **PENDING**
- [ ] ✅ Review proposal with user (if needed) - **PENDING**

**Handoff Package:**

1. ✅ `proposal.md` - Requirements analysis with document IDs
2. ✅ `design.md` - Technical design with rationale
3. ✅ `tasks.md` - This file with complete workflow
4. ✅ `specs/user-interface/spec.md` - UI requirements deltas
5. ✅ `specs/security/spec.md` - Security requirements deltas
6. ⏳ Test suite - Test design complete, implementation pending

**Note:** Phase 4 测试编写将在提案验证后完成，以确保测试与最终设计一致。

---

## Phase 5: Implementation 💻

**Goal:** Make the failing tests pass by implementing the required functionality

**Responsible:** Implementation Developer

**CRITICAL:** Follow implementation order strictly - Schema → Types → API → Logic → UI

### 5.0 Prerequisites: Review Proposal

- [ ] 5.0.1 Read complete proposal: `openspec show add-turnstile-verification`
- [ ] 5.0.2 Review `proposal.md` - understand why, what, and impact
- [ ] 5.0.3 Review `design.md` - understand technical decisions
- [ ] 5.0.4 Review `specs/` - understand requirements deltas
- [ ] 5.0.5 Review Phases 1-4 in this file
- [ ] 5.0.6 Run existing tests: `pnpm test` (should show failing tests)
- [ ] 5.0.7 Verify test failures are expected
- [ ] 5.0.8 Understand test assertions and expected behavior

### 5.1 Database Schema (if needed)

- [x] 5.1.1 Review schema design in `design.md`
  - **N/A** - 无需修改数据库 schema
- [x] 5.1.2 Update Drizzle schema in `src/lib/schema/[domain].ts`
  - **N/A**
- [x] 5.1.3 Generate migration: `pnpm db:generate`
  - **N/A**
- [x] 5.1.4 Review generated SQL migration file
  - **N/A**
- [x] 5.1.5 Apply schema changes: `pnpm db:push`
  - **N/A**
- [x] 5.1.6 Verify in database: `pnpm db:studio`
  - **N/A**
- [x] 5.1.7 Test rollback if needed
  - **N/A**

**Checkpoint:** Database schema matches design spec - **N/A**

### 5.2 Type Definitions

- [ ] 5.2.1 Create/update types in `src/types/[domain].ts`
  - [ ] Create `src/types/turnstile.ts`:

    ```typescript
    /**
     * Result of Turnstile token verification
     */
    export interface TurnstileVerificationResult {
      success: boolean;
      error?: string;
    }

    /**
     * Turnstile widget props
     */
    export interface TurnstileWidgetProps {
      onSuccess: (token: string) => void;
      onError?: () => void;
      onExpire?: () => void;
    }
    ```
- [ ] 5.2.2 Define Zod schemas for validation
  - [ ] Add to existing form schemas (optional `turnstileToken` field):
    ```typescript
    // Example: email OTP form schema
    const emailOtpSchema = z.object({
      email: z.string().email(),
      turnstileToken: z.string().optional(), // Optional for backward compatibility
    });
    ```
- [ ] 5.2.3 Export types from `src/types/index.ts`
  ```typescript
  export * from "./turnstile";
  ```
- [ ] 5.2.4 Ensure types match database schema
  - **N/A** - 无数据库类型
- [ ] 5.2.5 Run type check: `tsc --noEmit`

**Checkpoint:** All types defined and type check passes

### 5.3 API/Server Actions

- [ ] 5.3.1 Implement endpoint in `src/app/api/[route]/route.ts` OR Server Action in `src/app/[route]/actions.ts`
  - [ ] Create `src/lib/turnstile.ts`:
    ```typescript
    /**
     * Verify Cloudflare Turnstile token on server side
     * @param token Turnstile verification token from client
     * @param remoteIp Optional client IP address for additional verification
     * @returns Verification result with success status and optional error
     */
    export async function verifyTurnstileToken(
      token: string,
      remoteIp?: string
    ): Promise<TurnstileVerificationResult> {
      // Implementation per design.md
    }
    ```
  - [ ] Locate and modify email OTP Server Action (具体位置待确认)
    - Add `turnstileToken?: string` parameter
    - Call `verifyTurnstileToken` before sending OTP
    - Return error if verification fails
  - [ ] Locate and modify phone OTP Server Action
    - Similar to email OTP
  - [ ] Locate and modify user registration Server Action
    - Add Turnstile verification before creating user
  - [ ] Update Better Auth `sendOTP` callback in `src/lib/auth.ts`
    - Integrate Turnstile verification if possible (may require passing token via request context)

- [ ] 5.3.2 Add Zod validation for inputs
  - [x] Forms already have validation - add optional `turnstileToken` field

- [ ] 5.3.3 Implement error handling
  - [ ] Try-catch in `verifyTurnstileToken` for network errors
  - [ ] Return consistent error format
  - [ ] Log errors with Pino logger

- [ ] 5.3.4 Add authentication/authorization checks
  - [x] Existing auth checks remain - Turnstile is additional layer

- [ ] 5.3.5 Add JSDoc comments (as planned in Phase 3)
  - [ ] Document `verifyTurnstileToken` function
  - [ ] Document modified Server Actions

- [ ] 5.3.6 Test API manually or with unit tests
  - [ ] Run unit tests: `pnpm test src/lib/turnstile.test.ts`
  - [ ] Verify tests pass

**Checkpoint:** API/Action implemented with validation and error handling

### 5.4 Business Logic

- [x] 5.4.1 Implement core functionality
  - Turnstile 逻辑主要在 5.3 完成（`verifyTurnstileToken`）
- [x] 5.4.2 Add data access layer (if needed)
  - **N/A** - 无数据库操作

- [x] 5.4.3 Add utility functions (if needed)
  - `verifyTurnstileToken` 已在 5.3.1 实现

- [ ] 5.4.4 Add inline comments for complex logic
  - [ ] Explain Turnstile API call and error handling

- [ ] 5.4.5 Add logging for important operations
  - [ ] Log verification successes and failures
  - [ ] Log configuration warnings

- [ ] 5.4.6 Run unit tests: `pnpm test`
  - [ ] Verify `turnstile.test.ts` passes

**Checkpoint:** Core business logic implemented and unit tests passing

### 5.5 Frontend Components (if applicable)

- [ ] 5.5.1 Implement UI components in `src/components/[domain]/`
  - [ ] Create `src/components/security/turnstile-widget.tsx`:

    ```typescript
    "use client";

    import { Turnstile } from "@marsidev/react-turnstile";
    import { useTheme } from "next-themes";
    import type { TurnstileWidgetProps } from "@/types/turnstile";

    export function TurnstileWidget({
      onSuccess,
      onError,
      onExpire,
    }: TurnstileWidgetProps) {
      // Implementation per design.md
    }
    ```

  - [ ] Install dependency: `pnpm add @marsidev/react-turnstile`

- [ ] 5.5.2 Connect to Server Actions or API endpoints
  - [ ] Modify `src/components/auth/forms/email-otp-login.tsx`:
    - Add state: `const [turnstileToken, setTurnstileToken] = useState<string | null>(null)`
    - Add `<TurnstileWidget onSuccess={setTurnstileToken} />` below send OTP button
    - Pass `turnstileToken` to Server Action
    - Disable send button until `turnstileToken` is set
  - [ ] Modify `src/components/auth/forms/phone-otp-login.tsx`:
    - Similar to email OTP login
  - [ ] Modify `src/components/security/update-email-form.tsx`:
    - Integrate `TurnstileWidget`
  - [ ] Modify `src/components/security/update-phone-form.tsx`:
    - Integrate `TurnstileWidget`
  - [ ] Modify signup form (if exists):
    - Integrate `TurnstileWidget`

- [ ] 5.5.3 Implement form validation
  - [x] Existing form validation with React Hook Form + Zod

- [ ] 5.5.4 Add proper loading states
  - [ ] Show loading indicator while waiting for Turnstile verification
  - [ ] Disable submit button until Turnstile completes

- [ ] 5.5.5 Add error boundaries for error handling
  - [ ] Handle `onError` callback from `TurnstileWidget`
  - [ ] Show toast or error message to user

- [ ] 5.5.6 Ensure accessibility
  - [ ] Add `data-testid="turnstile"` for testing
  - [ ] Ensure keyboard navigation works
  - [ ] Add aria-labels if needed

- [ ] 5.5.7 Export components from `src/components/[domain]/index.ts`

  ```typescript
  export { TurnstileWidget } from "./turnstile-widget";
  ```

- [ ] 5.5.8 Test components manually
  - [ ] Test in development with testing key
  - [ ] Test theme switching
  - [ ] Test error scenarios

**Checkpoint:** UI components implemented and functional

### 5.6 Verify Tests Pass

- [ ] 5.6.1 Run unit tests: `pnpm test`
- [ ] 5.6.2 Run full test suite: `pnpm test:run`
- [ ] 5.6.3 Run E2E tests: `pnpm e2e`
- [ ] 5.6.4 All tests should pass now (green phase of TDD)
- [ ] 5.6.5 Fix any failing tests
- [ ] 5.6.6 Verify test coverage: `pnpm test:coverage` (target: ≥70%)

**Checkpoint:** All tests passing with adequate coverage

---

## Phase 6: Refactoring & Documentation ✅

**Goal:** Clean up code and ensure complete documentation

**Responsible:** Implementation Developer

### 6.1 Code Refactoring

- [ ] 6.1.1 Remove code duplication (DRY principle)
  - [ ] Ensure `TurnstileWidget` is used consistently across all forms
  - [ ] Check for duplicated error handling logic

- [ ] 6.1.2 Simplify complex functions
  - [ ] Review `verifyTurnstileToken` for simplification opportunities
  - [ ] Extract helper functions if needed

- [ ] 6.1.3 Improve naming for clarity
  - [ ] Review variable names in all modified files
  - [ ] Ensure consistency with project conventions

- [ ] 6.1.4 Ensure consistent code style
  - [ ] Run `pnpm format`

- [ ] 6.1.5 Run linter: `pnpm lint`

- [ ] 6.1.6 Fix all linting issues: `pnpm lint --fix`

- [ ] 6.1.7 Run tests after each refactor to ensure nothing broke

**Checkpoint:** Code is clean and linter passes

### 6.2 Performance Optimization

- [ ] 6.2.1 Optimize database queries
  - **N/A** - 无数据库查询

- [ ] 6.2.2 Add database indexes (if not done in 5.1)
  - **N/A**

- [ ] 6.2.3 Implement caching where beneficial
  - [ ] Consider caching Turnstile verification results (短期缓存，注意安全性)
  - [ ] Or skip if not beneficial

- [ ] 6.2.4 Minimize React re-renders
  - [ ] Ensure `TurnstileWidget` doesn't cause unnecessary re-renders
  - [ ] Use `React.memo` if needed

- [ ] 6.2.5 Implement pagination for large lists
  - **N/A**

- [ ] 6.2.6 Lazy load large components
  - [ ] Consider lazy loading Turnstile script (already handled by library)

**Checkpoint:** Performance optimizations applied

### 6.3 Type Safety

- [ ] 6.3.1 Replace any `any` types with proper types
  - [ ] Review all modified files for `any` usage

- [ ] 6.3.2 Ensure strict null checks
  - [ ] Handle optional `turnstileToken` parameter safely

- [ ] 6.3.3 Add type guards where needed
  - [ ] Add type guards for Turnstile API responses if needed

- [ ] 6.3.4 Run type check: `tsc --noEmit`

- [ ] 6.3.5 Fix all type errors

**Checkpoint:** Full type safety achieved

### 6.4 API Documentation

- [ ] 6.4.1 Verify JSDoc comments are complete
  - [ ] `verifyTurnstileToken` function fully documented
  - [ ] `TurnstileWidget` component props documented
  - [ ] Modified Server Actions updated

- [ ] 6.4.2 Update OpenAPI spec (if using REST APIs)
  - **N/A** - 项目使用 Server Actions

- [ ] 6.4.3 Update backend API documentation
  - [ ] Create or update `content/docs/technical-design/backend/turnstile-verification.mdx`:
    - 说明 Turnstile 集成架构
    - 文档化 `verifyTurnstileToken` API
    - 提供使用示例
    - 说明错误处理和降级策略

**Checkpoint:** API documentation complete and accurate

### 6.5 Requirements Documentation

- [ ] 6.5.1 Use document IDs from `proposal.md`
  - [ ] 识别受影响的功能需求和非功能需求文档

- [ ] 6.5.2 Update requirement documents
  - [ ] 更新 `content/docs/requirements/functional-requirements/` 中的用户认证和安全相关需求
  - [ ] 标记"人机验证"需求为已实现
  - [ ] 更新 `content/docs/requirements/non-functional-requirements/` 中的安全性需求

- [ ] 6.5.3 Verify all referenced requirements are addressed
  - [ ] 逐一核对 proposal.md 中列出的需求

**Checkpoint:** Requirements documentation updated

### 6.6 User Documentation

- [ ] 6.6.1 Update user guides in `content/docs/`
  - [ ] 在用户手册中说明验证码发送流程中的人机验证步骤
  - [ ] 解释为什么需要完成验证（防滥用）

- [ ] 6.6.2 Add screenshots or examples if applicable
  - [ ] 截图展示 Turnstile 组件在表单中的位置
  - [ ] 展示明暗主题下的外观

- [ ] 6.6.3 Update feature documentation
  - [ ] 更新"用户注册"和"登录"功能文档

- [ ] 6.6.4 Add usage examples
  - [ ] 提供开发者如何在新表单中集成 `TurnstileWidget` 的示例

- [ ] 6.6.5 Update any affected tutorials or getting started guides
  - [ ] 更新 README.md 或开发者入门文档，说明如何配置 Turnstile

**Checkpoint:** User documentation complete

### 6.7 Code Comments

- [ ] 6.7.1 Ensure complex logic has explanatory comments
  - [ ] `verifyTurnstileToken` 中的错误处理逻辑
  - [ ] 开发/生产环境的不同行为

- [ ] 6.7.2 Document any workarounds or edge cases
  - [ ] 如果有针对中国大陆的特殊处理，添加注释说明

- [ ] 6.7.3 Add TODO comments for future improvements (if any)
  - [ ] 如：`// TODO: Consider adding rate limiting after Turnstile`

- [ ] 6.7.4 Remove obsolete comments
  - [ ] 清理开发过程中的临时注释

- [ ] 6.7.5 Ensure comments are clear and concise
  - [ ] 使用中文或英文保持一致性

**Checkpoint:** Code is well-commented

### 6.8 Final Quality Checks

- [ ] 6.8.1 Run full test suite: `pnpm test:run && pnpm e2e`
- [ ] 6.8.2 Run linter: `pnpm lint`
- [ ] 6.8.3 Run type check: `tsc --noEmit`
- [ ] 6.8.4 Run format check: `pnpm format:check`
- [ ] 6.8.5 Check test coverage: `pnpm test:coverage` (≥70%)
- [ ] 6.8.6 Verify no console errors or warnings
- [ ] 6.8.7 Test in development environment
  - [ ] Test with testing keys
  - [ ] Test theme switching
  - [ ] Test all affected forms (email OTP, phone OTP, signup, update email/phone)
- [ ] 6.8.8 Request code review (if working with team)

**Checkpoint:** All quality checks passing

---

## 🎯 Final Validation Checklist

Before marking implementation as complete:

### Code Quality

- [ ] ✅ All tests passing (`pnpm test:run` + `pnpm e2e`)
- [ ] ✅ Test coverage ≥ 70% for new code
- [ ] ✅ Linting passing (`pnpm lint`)
- [ ] ✅ Type checking passing (`tsc --noEmit`)
- [ ] ✅ Code formatted (`pnpm format`)
- [ ] ✅ No code duplication
- [ ] ✅ Good naming conventions followed
- [ ] ✅ Complex logic well-commented

### Implementation

- [ ] ✅ Database schema updated (if needed) - **N/A**
- [ ] ✅ Type definitions complete and exported
- [ ] ✅ API/Server Actions implemented with validation
- [ ] ✅ Business logic implemented and tested
- [ ] ✅ Frontend components implemented (if applicable)
- [ ] ✅ Error handling comprehensive
- [ ] ✅ Authentication/authorization implemented

### Performance & Security

- [ ] ✅ Database queries optimized - **N/A**
- [ ] ✅ Indexes added for performance - **N/A**
- [ ] ✅ Input validation complete
- [ ] ✅ Error messages don't expose sensitive info
- [ ] ✅ Authentication checks in place
- [ ] ✅ No security vulnerabilities

### Documentation

- [ ] ✅ API documentation updated (JSDoc/OpenAPI)
- [ ] ✅ Requirements documentation updated (using IDs from proposal)
- [ ] ✅ User documentation updated
- [ ] ✅ Code comments added for complex logic
- [ ] ✅ CHANGELOG.md updated (if applicable)
- [ ] ✅ `.env.example` updated with Turnstile configuration

### Deployment Readiness

- [ ] ✅ Code reviewed (if working with team)
- [ ] ✅ Tested in development environment
- [ ] ✅ Ready for staging deployment
- [ ] ✅ Migration plan ready (if schema changes) - **N/A**
- [ ] ✅ Cloudflare Turnstile site created and keys obtained
- [ ] ✅ Production environment variables configured in Vercel

---

## Change Complete ✅

**Deliverables:**

1. ✅ Requirements analyzed with document IDs (`proposal.md`)
2. ✅ Technical design documented (`design.md`)
3. ✅ Tests written and passing (TDD complete)
4. ✅ Working implementation (all phases 1-6 complete)
5. ✅ Refactored, clean code
6. ✅ Complete documentation (API, requirements, user guides)
7. ✅ Production-ready code

**Next steps (archiving process):**

- Update specification with changes: `openspec archive add-turnstile-verification`
- Deploy to staging/production
- Monitor Turnstile verification metrics

---

## Notes & Best Practices

### For Proposal Authors (Phases 1-4)

- ✅ Complete ALL Phase 1-4 tasks before submission
- ✅ Document all decisions with clear rationale
- ⏳ Write actual test code, not just scenarios (pending)
- ✅ Tests SHOULD fail at this stage (red phase of TDD)
- Use TypeScript `any` or mock types temporarily if types don't exist yet
- Review existing tests in `src/**/*.test.ts` and `tests/` for patterns
- Validate proposal: `openspec validate add-turnstile-verification --strict`

### For Implementation Developers (Phases 5-6)

- Follow implementation order strictly: Schema → Types → API → Logic → UI
- Run tests frequently during implementation
- Refactor continuously while keeping tests green
- Don't skip documentation - it's critical for maintenance
- Keep commits atomic and well-described
- Use feature branch and PR workflow (if applicable)
- **Important:** Use Turnstile testing keys for development:
  - Always pass: `1x00000000000000000000AA`
  - Always fail: `2x00000000000000000000AB`
  - Requires interaction: `3x00000000000000000000FF`

### General Guidelines

- Add additional tasks if needed, but maintain phase structure
- Document deviations from plan with rationale
- Keep this tasks file updated as source of truth
- Use checkboxes to track progress
- Reference this file in PR descriptions

### Turnstile-Specific Notes

- Turnstile token 有效期为 300 秒（5 分钟），需处理过期场景
- Turnstile script 加载可能因网络问题失败，需实现 graceful degradation
- 生产环境必须配置真实 keys，开发环境可使用 testing keys
- 中国大陆用户通常可访问 Cloudflare，但需监控可用性
- Turnstile 组件必须是 Client Component (`"use client"`)
- 主题切换需使用 `next-themes` 的 `resolvedTheme` 而非 `theme`
