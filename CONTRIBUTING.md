# 贡献指南

感谢你对 Nomad 项目的关注！本文档将帮助你快速配置开发环境并开始贡献代码。

## 前置要求

在开始之前，请确保你的系统已安装以下工具：

- **Node.js** >= 22.21.0
- **pnpm** >= 10.0.0
- **PostgreSQL** >= 15

### 检查版本

运行以下命令检查当前版本：

```bash
node --version
pnpm --version
psql --version
```

### 安装工具

如果版本不符合要求，请按照以下方式安装：

#### Node.js

推荐使用 [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) 管理 Node.js 版本：

```bash
# 安装 Node.js 22.21.0 或更高版本
nvm install 22.21.0
nvm use 22.21.0
```

#### pnpm

```bash
# 使用 npm 安装 pnpm
npm install -g pnpm@latest
```

#### PostgreSQL

- **macOS**: 使用 [Homebrew](https://brew.sh/) - `brew install postgresql@15`
- **Windows**: 下载 [官方安装包](https://www.postgresql.org/download/windows/)
- **Linux**: 参考 [官方文档](https://www.postgresql.org/download/linux/)

安装完成后，再次运行检查命令确保版本正确。

## 开始开发

### 1. Fork 并克隆仓库

首先 Fork 本仓库到你的 GitHub 账号，然后克隆到本地：

```bash
git clone https://github.com/<Your-Username>/nomad.git
cd nomad
```

### 2. 安装依赖并配置开发环境

运行自动配置脚本：

```bash
pnpm run setup:dev
```

该脚本会自动完成以下操作：

- 安装项目依赖
- 创建 `.env.local` 环境变量文件
- 配置 Git hooks

### 3. 配置数据库

#### 创建数据库

在 PostgreSQL 中创建名为 `nomad` 的数据库：

```bash
# 使用 psql 命令行
createdb nomad

# 或者进入 psql 交互式界面
psql
CREATE DATABASE nomad;
\q
```

#### 配置环境变量

编辑 `.env.local` 文件，配置数据库连接：

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/nomad"
```

将 `username` 和 `password` 替换为你的 PostgreSQL 用户名和密码。

#### 推送数据库架构并填充测试数据

```bash
# 推送数据库架构
pnpm db:push

# 填充测试数据
pnpm db:seed
```

### 4. 启动开发服务器

```bash
pnpm dev
```

现在你可以访问：

- **应用首页**: [http://localhost:3000](http://localhost:3000)
- **项目文档**: [http://localhost:3000/docs](http://localhost:3000/docs)

### 5. 验证开发环境

确保以下命令都能正常运行：

```bash
# 构建项目（不应有错误）
pnpm build

# 启动 Storybook 组件库
pnpm storybook
# 访问 http://localhost:6006

# 启动邮件模板预览
pnpm email
# 访问 http://localhost:6007

# 打开数据库管理界面
pnpm db:studio
# 访问 https://local.drizzle.studio

# 运行测试并查看覆盖率
pnpm test:coverage
```

## 常用命令

### 开发

```bash
pnpm dev              # 启动开发服务器（使用 Turbopack）
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器
```

### 数据库

```bash
pnpm db:push          # 推送数据库架构变更
pnpm db:generate      # 生成迁移文件
pnpm db:migrate       # 运行迁移
pnpm db:studio        # 打开数据库管理界面
pnpm db:seed          # 填充测试数据
```

### 测试

```bash
pnpm test             # 运行测试（监听模式）
pnpm test:run         # 运行所有测试
pnpm test:unit        # 运行单元测试
pnpm test:integration # 运行集成测试
pnpm test:coverage    # 运行测试并生成覆盖率报告
pnpm test:ui          # 打开 Vitest UI
pnpm e2e              # 运行端到端测试
pnpm e2e:ui           # 打开 Playwright UI
```

### 代码质量

```bash
pnpm lint             # 运行 Biome 检查（不写入修改）
pnpm lint:fix         # 使用 Biome 自动修复可修复问题
pnpm format           # 仅使用 Biome 格式化代码
pnpm format:check     # 检查格式（Biome）
```

### 组件开发

```bash
pnpm storybook        # 启动 Storybook
pnpm build-storybook  # 构建 Storybook
pnpm email            # 启动邮件模板预览
```

更多命令请查看 `package.json` 中的 `scripts` 部分。

## 开发流程

### 分支管理

我们使用 Git Flow 工作流：

- `main` - 生产环境分支（受保护）
- `develop` - 开发主分支（受保护）
- `feat/*` - 功能开发分支
- `fix/*` - Bug 修复分支
- `docs/*` - 文档更新分支

### 开发步骤

1. **创建功能分支**

```bash
# 从 develop 分支创建新分支
git checkout develop
git pull origin develop
git checkout -b feat/your-feature-name
```

2. **开发与提交**

```bash
# 进行开发...

# 提交代码（会自动运行 lint-staged）
git add .
git commit -m "feat: add new feature"
```

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `style:` - 代码格式调整
- `refactor:` - 代码重构
- `test:` - 测试相关
- `chore:` - 构建/工具链相关

3. **推送并创建 Pull Request**

```bash
# 推送到远程仓库
git push origin feat/your-feature-name
```

然后在 GitHub 上创建 Pull Request，目标分支为 `develop`。

4. **代码审查**

- 确保所有 CI 检查通过
- 等待团队成员审查
- 根据反馈进行修改

5. **合并**

审查通过后，维护者会合并你的 PR 。

### 代码规范

- **TypeScript**: 严格模式，禁止使用 `any` 类型
- **组件**: 优先使用 Server Components，仅在需要交互时使用 Client Components
- **样式**: 使用 Tailwind CSS，遵循项目的设计系统
- **测试**: 新功能必须包含单元测试，关键流程需要 E2E 测试
- **命名**: 使用有意义的变量名，遵循 camelCase（变量/函数）和 PascalCase（组件/类型）

### 测试要求

如果你想要修改环境变量，请新建一个`.env.test.local`并进行覆盖

在提交 PR 前，请确保：

```bash
# 所有测试通过
pnpm test:run

# 代码覆盖率不降低
pnpm test:coverage

# E2E 测试通过
pnpm e2e

# 代码格式正确
pnpm format:check

# 无 Biome 错误
pnpm lint
```

## 推荐的 VSCode 扩展

为了获得最佳开发体验，建议安装以下扩展：

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) - 自动闭合 HTML/JSX 标签
- [Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja) - 增强的控制台输出
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) - React 代码片段
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) - Biome LSP + 格式化
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind CSS 智能提示
- [Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) - Vitest 测试资源管理器

项目已包含 `.vscode/settings.json` 配置文件，打开项目后会自动应用推荐设置。

## 项目结构

```
nomad/
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── (docs)/      # 文档路由
│   │   ├── (frontend)/  # 主应用路由
│   │   └── api/         # API 路由
│   ├── components/       # React 组件
│   │   ├── ui/          # Shadcn/UI 组件（不要手动修改）
│   │   ├── common/      # 通用组件
│   │   └── [domain]/    # 领域组件（auth、flights 等）
│   ├── lib/             # 核心配置
│   │   ├── db/          # 数据库配置
│   │   ├── schema/      # Drizzle 数据库模式
│   │   ├── auth/        # 认证配置
│   │   └── actions/     # Server Actions
│   ├── hooks/           # React Hooks
│   ├── types/           # TypeScript 类型定义
│   └── utils/           # 工具函数
├── content/docs/        # 文档内容（MDX）
├── tests/               # 测试文件
├── scripts/             # 构建和部署脚本
└── public/              # 静态资源
```

## 需要帮助？

- 查看我们专门准备的 [特殊 Issue](https://github.com/ukeSJTU/nomad/issues/106#issue-3559578782)
- 在 [GitHub Issues](https://github.com/ukeSJTU/nomad/issues) 提问
- 查看现有的 Pull Requests 了解最佳实践

## 许可证

通过贡献代码，你同意你的贡献将在 MIT 许可证下发布。
