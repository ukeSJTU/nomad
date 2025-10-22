# 工作报告: DevOps Engineer - [功能名称]

## 1. 任务摘要

> 简述本次 DevOps 任务的目标和范围。

**任务目标:** [描述此次 DevOps 工作要达成的目标]

**涉及领域:** [如 "CI/CD 配置" / "部署优化" / "开发环境搭建" / "监控告警"]

---

## 2. 完成工作

> 用列表形式描述具体完成的工作项。

- [ ] 配置了 GitHub Actions 工作流: `[workflow-name].yml`
- [ ] 更新了 Vercel 部署配置
- [ ] 配置了环境变量管理
- [ ] 优化了构建流程
- [ ] 配置了代码质量检查工具 (ESLint, Prettier)
- [ ] 设置了 Git Hooks (Husky)
- [ ] 配置了性能监控/日志
- [ ] 编写了部署脚本/自动化工具

---

## 3. 关键决策 / 实现说明

> 解释在 DevOps 实现过程中做出的重要选择和需要注意的细节。

### 3.1 CI/CD Pipeline 配置

#### 工作流文件: `.github/workflows/[workflow-name].yml`

**触发条件:**

- **Push 事件:** [分支名，如 `main`, `develop`]
- **Pull Request 事件:** [目标分支]
- **定时触发:** [如 Cron 表达式]
- **手动触发:** [是/否]

**工作流程图:**

```mermaid
graph LR
    A[触发] --> B[Checkout 代码]
    B --> C[设置环境]
    C --> D[安装依赖]
    D --> E[代码检查]
    E --> F[运行测试]
    F --> G[构建]
    G --> H[部署]
```

**工作流配置:**

```yaml
# .github/workflows/[workflow-name].yml
name: [Workflow Name]

on:
  push:
    branches: [branch-list]
  pull_request:
    branches: [branch-list]

jobs:
  [job-name]:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Run linter
        run: pnpm lint

      - name: Run tests
        run: pnpm test

      - name: Build
        run: pnpm build

      # [其他步骤]
```

**关键决策:**

- **决策1:** [如"选择 Ubuntu 作为运行环境，因为..."]
- **决策2:** [如"使用 pnpm 缓存以加速构建，因为..."]
- **决策3:** [如"在 PR 时只运行测试，在 push 到 main 时才部署，因为..."]

---

### 3.2 部署配置

#### 平台: Vercel

**项目配置文件:** `vercel.json` (如有)

**部署环境:**

- **Production:** [触发条件，如 "push to main"]
- **Preview:** [触发条件，如 "PR to main"]
- **Development:** [如适用]

**环境变量配置:**

| 变量名                | 用途             | 设置方式         |
| --------------------- | ---------------- | ---------------- |
| `DATABASE_URL`        | 数据库连接字符串 | Vercel Dashboard |
| `NEXTAUTH_SECRET`     | 认证密钥         | Vercel Dashboard |
| `NEXT_PUBLIC_API_URL` | API 地址         | Vercel Dashboard |

**部署优化:**

- **构建缓存:** [说明如何配置构建缓存]
- **增量静态生成 (ISR):** [如适用]
- **边缘函数配置:** [如适用]

**部署脚本:**

```json
// package.json scripts
{
  "scripts": {
    "deploy:prod": "[命令]",
    "deploy:preview": "[命令]"
  }
}
```

---

### 3.3 环境变量管理

**环境变量文件结构:**

```
.env.local           # 本地开发环境 (git ignored)
.env.example         # 环境变量模板 (git tracked)
.env.production      # 生产环境 (Vercel 管理)
.env.test            # 测试环境
```

**新增/更新的环境变量:**

#### `[VARIABLE_NAME]`

- **用途:** [说明此变量的用途]
- **类型:** [String / Number / Boolean / Secret]
- **必填:** [是/否]
- **默认值:** [如有]
- **示例:** `[示例值]`
- **安全级别:** [Public / Private / Secret]

**环境变量验证:**

```typescript
// src/lib/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  [VARIABLE_NAME]: z.string().min(1),
  // [其他变量验证]
});

export const env = envSchema.parse(process.env);
```

**文档更新:**

- [ ] 更新了 `.env.example` 文件
- [ ] 更新了 `README.md` 中的环境变量说明
- [ ] 在 Vercel Dashboard 中配置了生产环境变量

---

### 3.4 代码质量工具配置

#### ESLint 配置

**配置文件:** `eslint.config.mjs`

**规则集:**

- `@typescript-eslint/recommended`
- `next/core-web-vitals`
- [其他规则集]

**自定义规则:**

```javascript
// eslint.config.mjs
export default [
  // [配置内容]
];
```

**重要规则说明:**

- `no-console`: [warn/error] - [理由]
- `@typescript-eslint/no-explicit-any`: error - [理由]
- [其他关键规则]

#### Prettier 配置

**配置文件:** `.prettierrc.json`

**格式化规则:**

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

### 3.5 Git Hooks 配置 (Husky)

**配置文件:** `.husky/[hook-name]`

**Pre-commit Hook:**

```bash
#!/bin/sh
# .husky/pre-commit

pnpm lint-staged
```

**Commit-msg Hook:**

```bash
#!/bin/sh
# .husky/commit-msg

pnpm commitlint --edit $1
```

**Lint-staged 配置:**

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

**Commitlint 配置:**

```javascript
// commitlint.config.mjs
export default {
  extends: ["@commitlint/config-conventional"],
};
```

---

### 3.6 性能监控与日志 (如适用)

**监控工具:** [如 Vercel Analytics / Sentry / LogRocket]

**配置内容:**

- **性能指标监控:** [说明监控的指标]
- **错误追踪:** [说明错误上报配置]
- **日志聚合:** [说明日志收集方式]

**集成代码:**

```typescript
// src/app/layout.tsx 或配置文件
// [监控工具集成代码]
```

---

### 3.7 Docker 配置 (如适用)

**Dockerfile:**

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# [Dockerfile 内容]
```

**Docker Compose (如用于本地开发):**

```yaml
# docker-compose.yml
version: "3.8"

services:
  app:
    # [服务配置]
```

---

## 4. 开发工具链优化

> 说明对开发环境和工具的改进。

### 4.1 构建优化

- **优化项1:** [如 "启用了 Turbopack，构建速度提升 XX%"]
- **优化项2:** [如 "配置了依赖缓存，CI 时间减少 XX 分钟"]

### 4.2 开发体验改进

- **改进项1:** [如 "添加了 VS Code 推荐扩展列表"]
- **改进项2:** [如 "配置了自动格式化保存"]

### 4.3 脚本自动化

**新增脚本:** `scripts/[script-name].js`

**脚本用途:** [说明脚本的功能]

**使用方式:**

```bash
pnpm run [script-name]
```

---

## 5. 安全与合规

> 说明安全相关的配置和最佳实践。

### 5.1 密钥管理

- [ ] 所有敏感信息使用环境变量，不硬编码
- [ ] `.env.local` 已加入 `.gitignore`
- [ ] 生产环境密钥通过 Vercel Dashboard 管理
- [ ] 定期轮换密钥 (如适用)

### 5.2 依赖安全

- [ ] 配置了 Dependabot 自动更新依赖
- [ ] 定期运行 `pnpm audit` 检查漏洞
- [ ] 关键依赖版本锁定

### 5.3 访问控制

- [ ] 配置了分支保护规则
- [ ] PR 需要至少 X 人审核
- [ ] 强制要求通过 CI 检查才能合并

---

## 6. 文件变更列表

> 列出本次 DevOps 工作中创建、修改或删除的文件。

### 创建文件

- `.github/workflows/[workflow-name].yml` - [工作流说明]
- `scripts/[script-name].js` - [脚本说明]
- `.husky/[hook-name]` - [Hook 说明]
- `vercel.json` - [Vercel 配置]

### 修改文件

- `package.json` - [添加了新的 scripts 或依赖]
- `.env.example` - [更新了环境变量模板]
- `README.md` - [更新了部署说明]
- `eslint.config.mjs` - [修改了 Lint 规则]
- `.prettierrc.json` - [修改了格式化规则]

### 删除文件

- `[文件路径]` - [删除原因]

---

## 7. 测试与验证

> 说明 DevOps 配置的测试和验证过程。

### 7.1 CI/CD Pipeline 测试

- [ ] 测试了 Push 到主分支的工作流
- [ ] 测试了 Pull Request 的工作流
- [ ] 验证了所有步骤正常执行
- [ ] 确认了构建和部署成功

### 7.2 部署验证

- [ ] 验证了生产环境部署成功
- [ ] 验证了预览环境部署成功
- [ ] 测试了部署后的应用功能
- [ ] 确认了环境变量正确加载

### 7.3 工具链验证

- [ ] 验证了 ESLint 规则生效
- [ ] 验证了 Prettier 自动格式化
- [ ] 验证了 Git Hooks 正常工作
- [ ] 测试了所有自动化脚本

---

## 8. 文档更新

> 列出需要更新的文档。

- [ ] 更新了 `README.md` - 添加了部署说明
- [ ] 更新了 `CONTRIBUTING.md` - 添加了 CI/CD 流程说明
- [ ] 创建了 `docs/deployment.md` (如需要) - 详细的部署指南
- [ ] 更新了 `docs/development.md` (如需要) - 开发环境搭建指南

---

## 9. 后续建议

> 向项目团队提供的 DevOps 相关建议。

### 给开发团队的建议:

- [建议1: 如 "提交代码前请确保通过本地 Lint 检查"]
- [建议2: 如 "遵循 Conventional Commits 规范"]
- [建议3: 如 "定期检查并更新依赖版本"]

### 系统维护建议:

- [建议1: 如 "每月检查一次 GitHub Actions 的执行时间配额"]
- [建议2: 如 "每季度审查一次环境变量的安全性"]
- [建议3: 如 "定期备份关键配置文件"]

### 优化方向:

- [方向1: 如 "可以考虑引入容器化部署以提高一致性"]
- [方向2: 如 "可以添加性能回归测试到 CI Pipeline"]
- [方向3: 如 "可以配置自动化的安全扫描"]

---

## 10. 验证与检查

> DevOps 配置是否符合项目标准的自查清单。

**CI/CD:**

- [ ] 工作流配置文件语法正确
- [ ] 所有必要的步骤都已包含
- [ ] 工作流触发条件合理
- [ ] 构建和部署流程已测试通过

**环境变量:**

- [ ] 所有环境变量已文档化
- [ ] `.env.example` 文件完整
- [ ] 生产环境变量已正确配置
- [ ] 敏感信息未泄露到版本控制

**代码质量工具:**

- [ ] ESLint 配置合理，规则严格
- [ ] Prettier 配置与团队风格一致
- [ ] Git Hooks 正常工作
- [ ] Commit 规范强制执行

**部署:**

- [ ] 部署流程稳定可靠
- [ ] 回滚机制已配置
- [ ] 部署日志可追溯
- [ ] 部署文档完整

---

## 11. 故障排查指南

> 常见问题和解决方案。

### 问题 1: [问题描述]

**现象:** [详细描述问题的表现]

**可能原因:**

- [原因1]
- [原因2]

**解决方案:**

1. [步骤1]
2. [步骤2]
3. [步骤3]

### 问题 2: [问题描述]

[重复上述结构]

---

## 12. 备注

> 其他需要注意的事项或配置说明。

[在此添加任何补充说明、已知限制、待优化的配置或需要进一步讨论的 DevOps 相关内容]

---

## 附录: 有用的命令速查

```bash
# CI/CD
pnpm build           # 构建项目
pnpm lint            # 代码检查
pnpm test            # 运行测试
pnpm e2e             # E2E 测试

# 部署
pnpm deploy:prod     # 部署到生产环境
pnpm deploy:preview  # 部署预览版本

# 数据库
pnpm db:generate     # 生成迁移文件
pnpm db:push         # 应用数据库变更

# 工具
pnpm format          # 格式化代码
pnpm type-check      # TypeScript 类型检查
```
