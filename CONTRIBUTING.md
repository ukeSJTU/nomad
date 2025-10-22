# 贡献指南

感谢你对 Nomad 项目的贡献！本文档提供了参与项目开发的指南。

## 快速开始

### 环境要求

- Node.js 20.15.0+
- pnpm 10.0.0+
- Git

### 本地开发设置

1. Fork 并 clone 项目

```bash
git clone git@github.com:ukeSJTU/nomad.git
cd nomad
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
pnpm dev
```

## 开发流程

> 📖 **完整的 Git 工作流程请参考**：[Git 工作流文档](http://localhost:3000/docs/04-git-workflow)
>
> 该文档包含详细的分支策略、提交规范、代码审查流程、CI/CD 集成以及常见问题解决方案。

### 快速参考

1. **创建功能分支**

```bash
git checkout -b feat/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

2. **开发和测试**

- 编写代码
- 运行单元测试：`pnpm test`
- 运行端到端测试：`pnpm e2e`（首次运行需要安装浏览器：`pnpm exec playwright install`）
- 检查代码质量：`pnpm lint`
- 格式化代码：`pnpm format`

**测试框架说明：**

- 单元测试：使用 Vitest + React Testing Library
- 端到端测试：使用 Playwright
- 详细测试指南请参考：[docs/testing.md](docs/testing.md)

3. **提交代码**

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。详细的提交规范和示例请参考 [提交规范文档](http://localhost:3000/docs/04-git-workflow#commit-%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83)。

```bash
git add .
git commit -m "feat: add user authentication"
```

4. **推送和创建 PR**

```bash
git push origin feat/your-feature-name
```

然后在 GitHub 上创建 Pull Request。详细的 PR 流程请参考 [开发工作流程](http://localhost:3000/docs/04-git-workflow#%E5%BC%80%E5%8F%91%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)。

## 代码规范

### TypeScript

- 使用严格的 TypeScript 配置
- 避免使用 `any` 类型
- 为公共 API 提供类型声明

### React/Next.js

- 使用函数组件和 Hooks
- 遵循 React 最佳实践
- 使用 Next.js 的文件路由

### 样式

- 使用 Tailwind CSS
- 保持组件样式的一致性
- 响应式设计优先

## 测试

### 运行测试

```bash
# 单元测试
pnpm test          # 运行所有单元测试
pnpm test:run      # 运行单元测试（非监听模式）
pnpm test:ui       # 启动 Vitest UI 界面

# 端到端测试
pnpm e2e           # 运行 Playwright 测试
pnpm e2e:ui        # 启动 Playwright UI 模式
pnpm e2e:headed    # 有界面模式运行测试
pnpm e2e:debug     # 调试模式运行测试
pnpm e2e:report    # 查看测试报告
```

### 测试要求

- 新功能需要相应的测试
- Bug 修复需要回归测试
- 保持测试覆盖率 > 80%
- 详细测试指南请参考：[docs/testing.md](docs/testing.md)

## 文档

- 更新相关的 README 文档
- 为新功能添加使用示例
- 更新 API 文档（如适用）

## 报告 Bug

请使用 [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md) 创建 issue。

## 功能建议

请使用 [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md) 创建 issue。

## Code Review

### 作为 PR 作者

- 确保 PR 描述清晰
- 回应 reviewer 的反馈
- 保持 PR 大小合理（< 500 行变更）

### 作为 Reviewer

- 提供建设性的反馈
- 关注代码质量、性能和安全性
- 及时回复和审查

## 获取帮助

如果你有任何问题，可以：

- 创建 issue
- 在 PR 中提问
- 联系维护者

再次感谢你的贡献！
