# @nomad/requirements

需求数据管理包，为 Nomad 项目提供结构化的功能需求数据。

## 安装

```bash
pnpm add @nomad/requirements
```

## 使用方式

### 1. 在测试代码中标记需求（JSDoc）

在 `apps/web/tests` 中的测试文件使用 JSDoc 标签关联需求：

#### Vitest 单元测试示例

```typescript
import { describe, test, expect } from "vitest";

/**
 * 测试手机号OTP注册功能
 * @requirement REQ-U01
 */
describe("Phone OTP Registration", () => {
  /**
   * 测试场景1：用户成功完成手机号两步注册
   * @requirement REQ-U01
   * @scenario 场景1
   */
  test("should complete two-step registration with valid phone", async () => {
    // Arrange
    const phoneNumber = "13812345678";

    // Act
    const result = await register({ phone: phoneNumber });

    // Assert
    expect(result.success).toBe(true);
  });

  /**
   * 测试场景2：手机号格式校验失败
   * @requirement REQ-U01
   * @scenario 场景2
   */
  test("should validate phone number format", async () => {
    // Arrange
    const invalidPhone = "1381234567"; // 只有10位

    // Act & Assert
    await expect(register({ phone: invalidPhone })).rejects.toThrow(
      "请输入有效的11位手机号"
    );
  });

  /**
   * 测试场景3：手机号已被注册
   * @requirement REQ-U01
   * @scenario 场景3
   */
  test("should reject registration with existing phone", async () => {
    // 测试实现...
  });
});
```

#### Playwright E2E 测试示例

```typescript
import { test, expect } from "@playwright/test";

/**
 * E2E测试：手机号OTP注册完整流程
 * @requirement REQ-U01
 */
test.describe("Phone OTP Registration E2E", () => {
  /**
   * @requirement REQ-U01
   * @scenario 场景1
   */
  test("should complete registration flow from landing to dashboard", async ({
    page,
  }) => {
    // 测试步骤...
  });
});
```

### 2. 在文档中使用（apps/docs）

```tsx
import { RequirementStats } from "@/components";

// 在 MDX 中使用
<RequirementStats />;
```

### 3. 在演讲稿中使用（apps/slides）

```vue
<script setup>
import { getRequirementStats } from "@nomad/requirements/utils";
import { allModules } from "@nomad/requirements/data";

const stats = getRequirementStats(allModules);
</script>

<template>
  <div>总共 {{ stats.totalRequirements }} 个需求</div>
</template>
```

## JSDoc 标签规范

### @requirement 标签

- **格式：** `@requirement <RequirementID>`
- **位置：** 测试文件的 JSDoc 注释中
- **作用：** 关联测试用例和功能需求
- **示例：**
  ```typescript
  /**
   * @requirement REQ-U01
   */
  test("test name", () => {
    /* ... */
  });
  ```

### @scenario 标签（可选）

- **格式：** `@scenario <ScenarioID>`
- **位置：** 与 @requirement 标签配合使用
- **作用：** 关联到需求的具体验收场景
- **示例：**
  ```typescript
  /**
   * @requirement REQ-U01
   * @scenario 场景1
   */
  test("test name", () => {
    /* ... */
  });
  ```

## 注意事项

1. **不要修改测试代码：** JSDoc 标签只是注释，不影响测试执行
2. **标签位置：** 放在 `describe` 或 `test` 函数的 JSDoc 注释中
3. **需求ID格式：** 必须与 @nomad/requirements 中定义的需求ID一致
4. **场景ID格式：** 使用中文"场景X"或英文"Scenario X"
5. **IDE支持：** VSCode 可以通过搜索 `@requirement` 快速定位相关测试

## API 文档

### 数据类型

```typescript
// 优先级类型
type Priority = "Must Have" | "Should Have" | "Could Have" | "Won't Have";

// 模块类型
type Module = "user" | "flight" | "order" | "payment" | "ui-ux";

// 用户故事
interface UserStory {
  id: string;
  content: string;
}

// 验收标准
interface AcceptanceCriteria {
  id: string;
  title: string;
  given?: string[];
  when?: string[];
  then?: string[];
}

// 需求定义
interface Requirement {
  id: string;
  module: Module;
  name: string;
  overview: string;
  priority: Priority;
  userStories: UserStory[];
  acceptanceCriteria: AcceptanceCriteria[];
  uiNotes?: UIUXNotes;
  relatedRequirements?: string[];
}

// 模块定义
interface ModuleDefinition {
  id: Module;
  name: string;
  description: string;
  icon?: string;
  requirements: Requirement[];
}
```

### 统计函数

#### getRequirementStats(modules)

获取需求统计信息。

```typescript
import { getRequirementStats } from "@nomad/requirements/utils";
import { allModules } from "@nomad/requirements/data";

const stats = getRequirementStats(allModules);
// {
//   totalRequirements: 12,
//   totalUserStories: 20,
//   totalAcceptanceCriteria: 80,
//   byModule: { ... },
//   byPriority: { ... }
// }
```

#### getRequirementsByPriority(modules, priority)

获取指定优先级的需求列表。

```typescript
import { getRequirementsByPriority } from "@nomad/requirements/utils";
import { allModules } from "@nomad/requirements/data";

const mustHave = getRequirementsByPriority(allModules, "Must Have");
```

#### getRequirementsByModule(modules, moduleId)

获取指定模块的需求列表。

```typescript
import { getRequirementsByModule } from "@nomad/requirements/utils";
import { allModules } from "@nomad/requirements/data";

const userRequirements = getRequirementsByModule(allModules, "user");
```

### 查询函数

#### getRequirementById(modules, id)

根据ID查询需求。

```typescript
import { getRequirementById } from "@nomad/requirements/utils";
import { allModules } from "@nomad/requirements/data";

const req = getRequirementById(allModules, "REQ-U01");
```

#### searchRequirementsByName(modules, query)

根据名称模糊搜索需求。

```typescript
import { searchRequirementsByName } from "@nomad/requirements/utils";
import { allModules } from "@nomad/requirements/data";

const results = searchRequirementsByName(allModules, "注册");
```

#### getAllRequirements(modules)

获取所有需求的平铺列表。

```typescript
import { getAllRequirements } from "@nomad/requirements/utils";
import { allModules } from "@nomad/requirements/data";

const allReqs = getAllRequirements(allModules);
```

## 项目结构

```
packages/requirements/
├── package.json
├── tsconfig.json
├── src/
│   ├── data/                    # 需求数据
│   │   ├── types.ts            # 类型定义
│   │   ├── user-module.ts      # 用户模块需求
│   │   └── index.ts            # 数据导出
│   ├── utils/                   # 工具函数
│   │   ├── stats.ts            # 统计函数
│   │   └── query.ts            # 查询函数
│   ├── jsdoc/                   # JSDoc 类型
│   │   └── requirement-tags.ts # @requirement 标签
│   └── index.ts                # 主导出
└── README.md
```

## 当前状态

目前仅包含**用户模块（user）**的 12 个需求：

- REQ-U01: 手机号OTP注册
- REQ-U02: 邮箱OTP注册
- REQ-U03: GitHub OAuth注册
- REQ-U04: 手机号密码登录
- REQ-U05: 手机号OTP登录
- REQ-U06: 邮箱密码登录
- REQ-U07: 邮箱OTP登录
- REQ-U08: 个人基本信息管理
- REQ-U09: 密码管理
- REQ-U10: 绑定信息更新
- REQ-U11: 常用旅客CRUD
- REQ-U12: 旅客信息快速填充

其他模块（flight, order, payment, ui-ux）待迁移。

## License

MIT
