# 工作报告: QA Engineer - [功能名称]

## 1. 任务摘要

> 简述本次测试任务的目标和范围。

**任务目标:** [描述此次测试要验证的功能和质量目标]

**测试范围:** [列出涉及的模块、组件、API等]

**测试类型:** [如 "单元测试" / "组件测试" / "E2E测试" 或组合]

---

## 2. 完成工作

> 用列表形式描述具体完成的工作项。

- [ ] 为 Server Actions 编写了单元测试: `[testFileName].test.ts`
- [ ] 为服务函数编写了单元测试: `[testFileName].test.ts`
- [ ] 为客户端组件编写了组件测试: `[ComponentName].test.tsx`
- [ ] 编写了 E2E 测试: `[testFileName].spec.ts`
- [ ] 准备了测试数据和 Mock 数据
- [ ] 执行了测试并修复了发现的问题
- [ ] 生成了测试覆盖率报告

---

## 3. 关键决策 / 实现说明

> 解释在测试实现过程中做出的重要选择和需要注意的细节。

### 3.1 单元测试 (Vitest)

#### 测试文件: `[testFileName].test.ts`

**被测对象:** `[functionName / actionName]`

**测试用例设计:**

| 测试用例 | 输入       | 预期输出     | 测试目的     |
| -------- | ---------- | ------------ | ------------ |
| 正常情况 | [有效输入] | [预期返回值] | 验证正常流程 |
| 边界情况 | [边界值]   | [预期行为]   | 验证边界处理 |
| 异常情况 | [无效输入] | [错误信息]   | 验证错误处理 |

**测试实现示例:**

```typescript
// src/lib/services/[module].test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { [functionName] } from './[module]';

describe('[functionName]', () => {
  it('should [测试目的]', async () => {
    // Arrange
    const input = { /* [测试输入] */ };

    // Act
    const result = await [functionName](input);

    // Assert
    expect(result).toEqual({ /* [预期输出] */ });
  });

  it('should handle error when [异常场景]', async () => {
    // [测试代码]
  });
});
```

**Mock 策略:**

- **数据库 Mock:** [说明如何 Mock Drizzle ORM 查询]
- **外部服务 Mock:** [说明如何 Mock 第三方 API]
- **认证 Mock:** [说明如何 Mock Better Auth 会话]

#### 测试文件: `[anotherTestFile].test.ts`

[重复上述结构，描述其他单元测试文件]

---

### 3.2 组件测试 (React Testing Library)

#### 测试文件: `[ComponentName].test.tsx`

**被测组件:** `[ComponentName]`

**测试用例设计:**

| 测试用例 | 用户操作     | 预期行为          | 测试目的     |
| -------- | ------------ | ----------------- | ------------ |
| 渲染测试 | 无           | [元素正确显示]    | 验证初始渲染 |
| 交互测试 | [点击按钮]   | [状态变化/UI更新] | 验证用户交互 |
| 表单测试 | [输入并提交] | [调用 Action]     | 验证表单处理 |
| 错误测试 | [触发错误]   | [显示错误提示]    | 验证错误处理 |

**测试实现示例:**

```typescript
// src/components/[module]/[component-name].test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { [ComponentName] } from './[component-name]';

describe('[ComponentName]', () => {
  it('should render [组件内容]', () => {
    // Arrange & Act
    render(<[ComponentName] />);

    // Assert
    expect(screen.getByText('[预期文本]')).toBeInTheDocument();
  });

  it('should handle [用户操作]', async () => {
    render(<[ComponentName] />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: '[按钮文本]' }));

    // Assert
    await waitFor(() => {
      expect(screen.getByText('[预期变化]')).toBeInTheDocument();
    });
  });
});
```

**Mock Server Actions:**

```typescript
vi.mock("./actions", () => ({
  [actionName]: vi.fn().mockResolvedValue({ success: true, data: {} }),
}));
```

---

### 3.3 端到端测试 (Playwright)

#### 测试文件: `[feature].spec.ts`

**测试场景:** [描述完整的用户旅程，如 "用户注册 -> 登录 -> 搜索航班 -> 预订"]

**测试步骤:**

```typescript
// tests/[module]/[feature].spec.ts
import { test, expect } from "@playwright/test";

test.describe("[功能模块]", () => {
  test("should [用户目标]", async ({ page }) => {
    // 步骤1: 导航到页面
    await page.goto("/[route]");

    // 步骤2: 填写表单
    await page.fill("[selector]", "[value]");

    // 步骤3: 提交表单
    await page.click("[submitButton]");

    // 步骤4: 验证结果
    await expect(page.locator("[resultSelector]")).toContainText("[预期文本]");
  });
});
```

**覆盖的用户路径:**

- [ ] **正常流程:** [描述黄金路径]
- [ ] **异常流程:** [描述错误处理路径]
- [ ] **边界情况:** [描述边界条件路径]

**测试环境配置:**

- 数据库: [如 "使用测试数据库，每次测试前重置"]
- 认证: [如 "使用测试用户账号"]

---

## 4. 测试数据准备

> 说明测试所需的数据和 Mock 配置。

### 4.1 测试数据库

**数据填充脚本:** `[scriptPath]`

**测试数据:**

```typescript
const testData = {
  user: {
    id: 1,
    email: "test@example.com",
    // [其他字段]
  },
  // [其他测试数据]
};
```

### 4.2 Mock 数据

**Mock 配置文件:** `[mockConfigPath]`

**Mock API 响应:**

```typescript
export const mockApiResponse = {
  // [Mock 数据结构]
};
```

---

## 5. 测试执行结果

> 记录测试执行的结果和覆盖率。

### 5.1 单元测试结果

**执行命令:** `pnpm test`

**测试统计:**

- **总测试用例:** [数量]
- **通过:** [数量]
- **失败:** [数量]
- **跳过:** [数量]

**失败用例 (如有):**

- `[testName]` - 失败原因: [原因] - 解决方案: [方案]

### 5.2 组件测试结果

**执行命令:** `pnpm test:component`

**测试统计:**

- **总测试用例:** [数量]
- **通过:** [数量]
- **失败:** [数量]

### 5.3 E2E 测试结果

**执行命令:** `pnpm e2e`

**测试统计:**

- **总测试场景:** [数量]
- **通过:** [数量]
- **失败:** [数量]

**浏览器覆盖:**

- [ ] Chromium
- [ ] Firefox
- [ ] WebKit (Safari)

### 5.4 测试覆盖率

**覆盖率报告:** `coverage/index.html`

**覆盖率统计:**

- **语句覆盖率 (Statements):** [百分比]%
- **分支覆盖率 (Branches):** [百分比]%
- **函数覆盖率 (Functions):** [百分比]%
- **行覆盖率 (Lines):** [百分比]%

**是否达到项目目标 (> 80%)?** [是/否]

**未覆盖的关键路径:**

- [路径1] - 原因: [说明]
- [路径2] - 原因: [说明]

---

## 6. 发现的问题

> 列出测试过程中发现的 Bug 和问题。

### 问题 1: [问题标题]

- **严重程度:** [Critical / High / Medium / Low]
- **描述:** [详细描述问题]
- **重现步骤:**
  1. [步骤1]
  2. [步骤2]
  3. [步骤3]
- **预期行为:** [应该如何]
- **实际行为:** [实际如何]
- **状态:** [已修复 / 待修复 / 延期]
- **修复方案:** [如已修复，说明如何修复]

### 问题 2: [问题标题]

[重复上述结构]

---

## 7. 文件变更列表

> 列出本次测试开发过程中创建、修改或删除的文件。

### 创建文件

- `src/lib/services/[module].test.ts` - [单元测试文件]
- `src/components/[module]/[component-name].test.tsx` - [组件测试文件]
- `tests/[module]/[feature].spec.ts` - [E2E测试文件]
- `tests/fixtures/[data].ts` - [测试数据文件]

### 修改文件

- `playwright.config.ts` - [如添加了新的测试配置]
- `vitest.config.mts` - [如修改了测试配置]

### 删除文件

- `[文件路径]` - [删除原因]

---

## 8. 后续建议

> 向下一个角色或项目团队提供的建议。

### 给 Technical Writer 的建议:

- [建议1: 如"需要更新测试文档，说明新增的测试用例"]
- [建议2: 如"需要在 README 中说明如何运行测试"]

### 给开发团队的建议:

- [建议1: 如"XX 模块的边界处理需要加强"]
- [建议2: 如"建议增加 XX 场景的集成测试"]

### 测试维护建议:

- [建议1: 如"随着功能迭代，需定期更新 E2E 测试脚本"]
- [建议2: 如"Mock 数据需与真实 API 保持同步"]

---

## 9. 验证与检查

> 测试实现是否符合项目规范的自查清单。

- [ ] 单元测试使用 Vitest 编写
- [ ] 组件测试使用 React Testing Library
- [ ] E2E 测试使用 Playwright
- [ ] 测试覆盖率达到 > 80%
- [ ] 所有测试用例命名清晰，使用 "should [预期行为]" 格式
- [ ] 测试代码遵循 AAA 模式 (Arrange-Act-Assert)
- [ ] 所有测试执行成功: `pnpm test && pnpm e2e`
- [ ] 测试报告已生成并可访问

---

## 10. 备注

> 其他需要注意的事项或测试策略说明。

[在此添加任何补充说明、测试策略的考虑或已知的测试局限性]
