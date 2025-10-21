# AI Agent 工作指南

> 这个文件是 AI Agent 工具的导航中枢，用于快速定位项目文档、理解工作流程、防止幻觉，并减少上下文占用。

---

## 目录

1. [整体规范](#整体规范)
2. [文档索引](#文档索引)
3. [分阶段工作流](#分阶段工作流)
4. [防止幻觉机制](#防止幻觉机制)
5. [AI 工作指令模板](#ai-工作指令模板)
6. [技术架构要点](#技术架构要点)

---

## 整体规范

### 输出规范

- **禁止使用 Emoji**：所有回答输出文本中严禁包含类似 ✅、❌、🚀 等 emoji
- **代码语言**：所有代码必须用英文，并用注释解释关键部分
- **文档语言**：所有文档，除非特殊要求，应该采用中文编写

### 工作原则

- **不要猜测**：对于不明确的部分必须向用户提问确认
- **提供方案**：同时提供至少两种常见方案，并推荐你认为最合适这个项目的方案 + 理由
- **包管理器**：必须使用 `pnpm` 包管理器

### 工作区管理

- 在项目根目录的 `.artifacts/` 文件夹中创建功能相关的子目录
- 使用 markdown 文件记录 TODO 任务列表、实际修改过程、设计决策等

---

## 文档索引

> 快速定位项目文档的路径映射。在开始任何工作前，先查阅相关文档。

### 需求文档（Functional Requirements）

- **用户模块**：`content/docs/functional-requirements/user-module.mdx`
- **航班模块**：`content/docs/functional-requirements/flight-module.mdx`
- **订单模块**：`content/docs/functional-requirements/order-module.mdx`
- **支付模块**：`content/docs/functional-requirements/payment-module.mdx`
- **需求总览**：`content/docs/functional-requirements/index.mdx`

### 技术设计文档（Technical Design）

- **架构设计**：`content/docs/technical-design/01-architecture.mdx`
- **环境搭建**：`content/docs/technical-design/02-setup.mdx`
- **编码规范**：`content/docs/technical-design/03-coding-standards.mdx`
- **Git 工作流**：`content/docs/technical-design/04-git-workflow.mdx`
- **数据库设计**：`content/docs/technical-design/05-database-design.mdx`
- **测试框架**：`content/docs/technical-design/06-testing-framework.mdx`

### API 与开发指南

- **API 开发指南**：`docs/api.md`
- **航空旅行业务**：`docs/air-travel.md`
- **旅客管理参考**：`docs/passenger-management.md`
- **携程旅客管理参考**：`docs/ctrip-traveller-management.md`

### UI 与业务流程

- **UI 详细设计**：`content/docs/appendix/01-ui-details.mdx`
- **业务流程图**：`content/docs/overall-description/business-process-flow.mdx`
- **产品愿景**：`content/docs/overall-description/product-vision.mdx`
- **用户特征**：`content/docs/overall-description/user-characteristics.mdx`

### 非功能性需求

- **性能要求**：`content/docs/non-functional-requirements/performance.mdx`
- **安全要求**：`content/docs/non-functional-requirements/security.mdx`
- **可用性要求**：`content/docs/non-functional-requirements/usability.mdx`
- **兼容性要求**：`content/docs/non-functional-requirements/compatibility.mdx`

### 技术栈与配置

- **技术栈总览**：`content/docs/techstack.mdx`
- **贡献指南**：`CONTRIBUTING.md`
- **项目 README**：`README.md`

---

## 分阶段工作流

> 将完整的开发流程拆分为多个独立阶段，每个阶段有明确的输入、输出和验证机制。这样可以控制上下文范围，减少幻觉风险。

### 阶段 0：准备阶段（Preparation）

**目标**：创建工作目录，初始化任务清单

**操作步骤**：

1. 在 `.artifacts/` 下创建功能目录：`.artifacts/[feature-name]/`
2. 创建任务清单文件：`.artifacts/[feature-name]/task-checklist.md`
3. 使用任务管理工具（`add_tasks`）创建阶段任务列表

**输出**：

- `.artifacts/[feature-name]/` 目录
- `.artifacts/[feature-name]/task-checklist.md`

**验证**：

- 确认目录创建成功
- 任务清单包含所有阶段

---

### 阶段 1：需求分析（Requirement Analysis）

**目标**：确认需求是否足够明确，补充用户故事和验收标准

**输入**：

- 用户描述或需求文档路径

**操作步骤**：

1. 使用 `codebase-retrieval` 搜索相关的需求文档（`content/docs/functional-requirements/`）
2. 使用 `view` 工具查看具体的需求文档
3. 分析需求的完整性：
   - 用户故事是否清晰？
   - 验收标准是否明确？
   - 边界条件是否定义？
4. 如果需求不明确，向用户提问并补充
5. 编写需求分析文档

**输出**：

- `.artifacts/[feature-name]/01-requirement-analysis.md`
  - 功能描述
  - 用户故事
  - 验收标准
  - 边界条件
  - 依赖关系

**验证**：

- 与用户确认需求理解是否正确
- 确认所有验收标准可测试

**检查点**：

- **必须等待用户确认后才能进入下一阶段**

---

### 阶段 2：UI 设计确认（UI Specification）

**目标**：确认 UI 设计，拆分组件层次结构

**输入**：

- UI 原型图（用户提供）
- 阶段 1 的需求分析文档

**参考文档**：

- `content/docs/appendix/01-ui-details.mdx`
- `content/docs/technical-design/03-coding-standards.mdx`（组件命名规范）

**操作步骤**：

1. 查看用户提供的 UI 原型图
2. 参考 UI 详细设计文档，理解设计规范
3. 拆分组件层次结构：
   - 页面级组件（Page Component）
   - 容器组件（Container Component）
   - 展示组件（Presentational Component）
   - UI 组件（UI Component，来自 `src/components/ui/`）
4. 设计组件 Props 接口
5. 确定组件间的数据流（Server Component → Client Component）
6. 编写 UI 规格文档

**输出**：

- `.artifacts/[feature-name]/02-ui-components.md`
  - 组件层次结构图（可使用 Mermaid）
  - 每个组件的 Props 接口定义
  - 组件间数据流说明
  - 交互流程说明

**验证**：

- 组件拆分是否合理？
- Props 设计是否符合 TypeScript 规范？
- 是否正确区分 Server Component 和 Client Component？

**检查点**：

- **必须等待用户确认 UI 拆分方案后才能进入下一阶段**

---

### 阶段 3：数据库设计（Database Schema）

**目标**：设计数据库 Schema，确保符合项目规范

**输入**：

- 阶段 1 的需求分析文档
- 阶段 2 的 UI 组件设计

**参考文档**：

- `content/docs/technical-design/05-database-design.mdx`

**操作步骤**：

1. 使用 `view` 查看数据库设计文档，理解 Drizzle ORM 规范
2. 使用 `codebase-retrieval` 搜索现有的 schema 文件（`src/lib/db/schema/`）
3. 设计新的表结构：
   - 字段定义
   - 数据类型
   - 约束条件（主键、外键、唯一性、非空等）
   - 索引设计
   - 关系定义
4. 编写 Schema 设计文档
5. 创建实际的 Schema 文件（`src/lib/db/schema/[module].ts`）

**输出**：

- `.artifacts/[feature-name]/03-db-schema.md`（设计说明）
- `src/lib/db/schema/[module].ts`（实际 Schema 文件）

**验证**：

1. 运行 `pnpm db:generate` 检查 Schema 语法是否正确
2. 使用 `diagnostics` 检查 TypeScript 错误
3. 确认字段命名符合 camelCase 规范
4. 确认关系定义正确

**检查点**：

- **必须等待用户确认 Schema 设计后才能进入下一阶段**

---

### 阶段 4：API 设计（API Design）

**目标**：设计 RESTful API 接口，定义 Zod Schema

**输入**：

- 阶段 1 的需求分析文档
- 阶段 3 的数据库 Schema

**参考文档**：

- `docs/api.md`

**操作步骤**：

1. 使用 `view` 查看 API 开发指南
2. 使用 `codebase-retrieval` 搜索现有的 API 路由和 Schema（`src/app/api/`, `src/types/api/`）
3. 设计 API 端点：
   - HTTP 方法（GET, POST, PUT, DELETE）
   - 路径设计
   - 请求参数（Query, Body）
   - 响应格式
4. 定义 Zod Schema：
   - 请求 Schema（`createXxxRequestSchema`, `updateXxxRequestSchema`）
   - 响应 Schema（`xxxResponseSchema`）
   - 使用 `createSuccessResponseSchema` 和 `createPaginatedResponseSchema`
5. 编写 API 规格文档
6. 创建类型定义文件（`src/types/api/[module].ts`）
7. 创建 API 路由文件（`src/app/api/[route]/route.ts`）

**输出**：

- `.artifacts/[feature-name]/04-api-spec.md`
- `src/types/api/[module].ts`（类型定义）
- `src/app/api/[route]/route.ts`（API 路由）

**验证**：

1. 运行 `pnpm api:generate` 生成 OpenAPI 文档
2. 使用 `diagnostics` 检查 TypeScript 错误
3. 确认所有 API 使用 `ApiResponse` 工具类返回统一格式
4. 确认 Zod Schema 定义完整

**检查点**：

- 检查生成的 OpenAPI 规范是否正确（访问 `/openapi.json`）

---

### 阶段 5：前端实现（Frontend Implementation）

**目标**：实现前端组件和页面

**输入**：

- 阶段 2 的 UI 组件设计
- 阶段 4 的 API 设计

**参考文档**：

- `content/docs/technical-design/03-coding-standards.mdx`

**操作步骤**：

1. **验证依赖**：
   - 使用 `codebase-retrieval` 确认所有需要 import 的组件/函数/类型是否存在
   - 确认 UI 组件（`src/components/ui/`）是否已存在
   - 确认工具函数（`src/lib/utils/`）是否已存在
2. **创建组件**：
   - 按照阶段 2 的设计创建组件文件
   - 使用 `.artifacts/templates/component-template.tsx` 作为参考
   - 正确区分 Server Component 和 Client Component（需要交互的组件添加 `"use client"`）
3. **实现数据获取**：
   - Server Component：直接调用数据库或 Server Actions
   - Client Component：使用 Server Actions 进行 mutation 操作
4. **类型安全**：
   - 使用 `@/types/api/[module]` 中定义的类型
   - 为所有 Props 定义 TypeScript 接口
5. **样式规范**：
   - 使用 Tailwind CSS
   - 遵循响应式设计原则

**输出**：

- 组件文件（`src/components/[module]/[component].tsx`）
- 页面文件（`src/app/(frontend)/[route]/page.tsx`）
- Server Actions（`src/app/(frontend)/[route]/actions.ts`）

**验证**：

1. 使用 `diagnostics` 检查 TypeScript 错误
2. 运行 `pnpm build` 确保编译通过
3. 运行 `pnpm lint` 检查代码规范
4. 手动测试功能是否正常

**防止幻觉机制**：

- **导入前验证**：在写 `import` 语句前，先用 `codebase-retrieval` 搜索确认路径正确
- **类型检查**：频繁使用 `diagnostics` 检查错误
- **参考现有代码**：查看 `src/components/passengers/` 作为参考示例

---

### 阶段 6：测试编写（Testing）

**目标**：编写单元测试、组件测试和 E2E 测试

**输入**：

- 阶段 5 的前端实现代码
- 阶段 4 的 API 实现代码

**参考文档**：

- `content/docs/technical-design/06-testing-framework.mdx`

**操作步骤**：

1. **单元测试**（工具函数、业务逻辑）：
   - 使用 Vitest
   - 测试文件命名：`*.test.ts`
   - 位置：与被测试文件同目录
   - 参考模板：`.artifacts/templates/test-template.test.tsx`
2. **组件测试**（React 组件）：
   - 使用 React Testing Library
   - 测试文件命名：`*.test.tsx`
   - 测试用户交互行为
   - 参考示例：`src/components/passengers/forms/passenger-form.test.tsx`
3. **E2E 测试**（关键用户流程）：
   - 使用 Playwright
   - 测试文件位置：`tests/*.spec.ts`
   - 覆盖关键业务流程

**输出**：

- 单元测试文件：`src/lib/[module]/[file].test.ts`
- 组件测试文件：`src/components/[module]/[component].test.tsx`
- E2E 测试文件：`tests/[feature].spec.ts`

**验证**：

1. 运行 `pnpm test` 确保所有单元测试通过
2. 运行 `pnpm test:coverage` 检查覆盖率（目标 > 80%）
3. 运行 `pnpm e2e` 确保 E2E 测试通过

**检查点**：

- 测试覆盖率是否达标？
- 所有测试是否通过？

---

### 阶段 7：文档更新（Documentation）

**目标**：更新相关文档，确保文档与代码同步

**输入**：

- 所有前面阶段的产出

**操作步骤**：

1. 更新需求文档（如果有新增功能）
2. 更新 API 文档（运行 `pnpm api:generate`）
3. 更新 README（如果有新的使用说明）
4. 在 `.artifacts/[feature-name]/implementation-log.md` 中记录实现过程

**输出**：

- 更新后的文档文件
- `.artifacts/[feature-name]/implementation-log.md`

**验证**：

1. 运行 `pnpm build` 确保文档构建成功
2. 检查文档内容是否准确

---

## 防止幻觉机制

> 通过以下机制确保 AI 生成的代码符合实际项目结构，不会编造不存在的 API。

### 1. 强制引用规则

**规则**：AI 在做决策时必须引用具体文档位置

**格式**：

```
根据 `content/docs/technical-design/03-coding-standards.mdx` 第 45-56 行的规范...
```

**示例**：

- "根据 `docs/api.md` 第 75-97 行，API 路由应该使用 `ApiResponse.success()` 返回统一格式"
- "参考 `src/components/passengers/passenger-list.tsx` 第 1-24 行的导入方式"

---

### 2. 代码验证流程

**导入前验证**：

- 在写 `import` 语句前，先使用 `codebase-retrieval` 搜索确认类/函数/组件存在
- 示例查询："搜索 Button 组件的定义位置"

**类型检查**：

- 使用 `diagnostics` 工具检查 TypeScript 错误
- 在每个文件创建/修改后立即运行

**编译验证**：

- 每个阶段完成后运行相关的验证命令：
  - `pnpm db:generate`（数据库 Schema）
  - `pnpm api:generate`（API 文档）
  - `pnpm build`（前端编译）
  - `pnpm lint`（代码规范）

---

### 3. 增量验证

**原则**：完成一个小功能就运行测试，不要等到全部完成

**步骤**：

1. 创建一个组件 → 运行 `diagnostics` 检查类型错误
2. 添加一个 API 路由 → 运行 `pnpm api:generate` 检查 OpenAPI 生成
3. 编写一个测试 → 运行 `pnpm test [file]` 检查测试通过
4. 完成一个功能模块 → 运行 `pnpm build` 检查整体编译

---

### 4. 模板驱动

**原则**：参考成功案例而非凭空生成

**模板位置**：

- API 路由模板：`.artifacts/templates/api-route-template.ts`
- 组件模板：`.artifacts/templates/component-template.tsx`
- 测试模板：`.artifacts/templates/test-template.test.tsx`

**参考示例**：

- API 示例：`src/app/api/health/route.ts`
- 组件示例：`src/components/passengers/passenger-list.tsx`
- 测试示例：`src/components/passengers/forms/passenger-form.test.tsx`

---

### 5. 上下文管理策略

**原则**：避免一次性加载所有文档，按需加载

**策略**：

1. **先查索引**：使用本文档的"文档索引"部分快速定位
2. **按阶段加载**：只加载当前阶段需要的文档
3. **使用 codebase-retrieval**：用自然语言查询而非盲目加载整个文件
4. **记录中间状态**：在 `.artifacts/` 中保存每个阶段的产出，避免重复查询

---

## AI 工作指令模板

> 用户可以使用以下模板指令来启动 AI 工作流程。

### 开始新功能开发

```
请按照 AI-prompts.md 中的分阶段工作流开发 [功能名称]。

当前阶段：阶段 1 - 需求分析
相关需求文档：[指定路径或让 AI 搜索]

请严格遵循防止幻觉机制，在每个决策点引用具体文档位置。
```

---

### 继续未完成的功能

```
继续开发 .artifacts/[feature-name]/ 中的功能。

当前进度：查看该目录下已完成的阶段文件
下一阶段：[指定阶段，如"阶段 3 - 数据库设计"]

请先查看已完成的阶段文档，理解当前进度，然后继续下一阶段。
```

---

### 修复 Bug

```
修复以下 Bug：

Bug 描述：[描述问题]
复现步骤：[步骤]
预期行为：[预期]
实际行为：[实际]

请先使用 codebase-retrieval 定位相关代码，然后：
1. 分析问题原因
2. 提出修复方案
3. 编写回归测试
4. 实施修复
5. 验证测试通过
```

---

### 重构代码

```
重构以下代码：[文件路径]

重构目标：[提升性能/提高可读性/符合规范等]

请先：
1. 使用 codebase-retrieval 查找所有调用该代码的位置
2. 编写测试确保当前行为
3. 进行重构
4. 运行测试确保行为不变
5. 更新相关文档
```

---

## 技术架构要点

> 快速参考的技术要点，详细内容请查阅相关文档。

### Next.js 15 App Router 数据流

- **Server Component**：直接获取数据，pass down 给 Client Component
- **Mutation 操作**：使用 Server Actions（`src/app/(frontend)/[route]/actions.ts`）
- **Client Component**：需要交互的组件添加 `"use client"` 指令

### 数据库（Drizzle ORM + PostgreSQL）

- **Schema 位置**：`src/lib/db/schema/`
- **命名规范**：camelCase（字段名）
- **关系定义**：使用 `relations()` 函数
- **迁移命令**：`pnpm db:generate` → `pnpm db:push`

### API 开发（OpenAPI 3.0）

- **路由位置**：`src/app/api/[route]/route.ts`
- **类型定义**：`src/types/api/[module].ts`
- **响应格式**：使用 `ApiResponse` 工具类（`src/lib/utils/api-response.ts`）
- **验证**：使用 Zod Schema
- **文档生成**：`pnpm api:generate`

### 测试框架

- **单元测试**：Vitest（`pnpm test`）
- **组件测试**：React Testing Library
- **E2E 测试**：Playwright（`pnpm e2e`）
- **覆盖率目标**：> 80%

### 代码规范

- **Linter**：ESLint（`pnpm lint`）
- **Formatter**：Prettier（自动格式化）
- **Commit 规范**：Conventional Commits（由 Commitlint 强制）
- **导入别名**：使用 `@/` 指向 `src/`

---

## 验证清单快速参考

详细清单请查看：`.artifacts/validation-checklist.md`

- [ ] 数据库 Schema：`pnpm db:generate` 无错误
- [ ] API 文档：`pnpm api:generate` 生成成功
- [ ] TypeScript：`diagnostics` 无错误
- [ ] 编译：`pnpm build` 成功
- [ ] 代码规范：`pnpm lint` 通过
- [ ] 单元测试：`pnpm test` 通过
- [ ] E2E 测试：`pnpm e2e` 通过
- [ ] 测试覆盖率：> 80%

---

## 工作流 SOP 详细文档

详细操作步骤请查看：`.artifacts/workflow-sop.md`
