# Nomad

A modern Next.js full-stack application with TypeScript, Tailwind CSS, and comprehensive development tooling.

[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=code)](https://github.com/ukeSJTU/nomad)
[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=blanks)](https://github.com/ukeSJTU/nomad)
[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=lines)](https://github.com/ukeSJTU/nomad)

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **OpenAPI 3.0** with automatic documentation generation
- **Zod** for runtime type validation
- **ESLint & Prettier** for code quality
- **Husky & lint-staged** for Git hooks
- **Conventional Commits** with commitlint
- **GitHub Actions** for CI/CD
- **pnpm** for package management

## Quick Start

### Prerequisites

- Node.js 20.15.0+
- pnpm 10.0.0+
- PostgreSQL 15+ (for database)

### One-Command Setup (Recommended)

For new developers or a quick start, use our automated setup script:

```bash
git clone https://github.com/ukeSJTU/nomad.git
cd nomad

# Run the automated setup script
pnpm setup:dev
```

This command will automatically:

- Verify Node.js and pnpm versions
- Install all project dependencies
- Configure Playwright test browsers
- Set up Git hooks
- Create `.env` file from template
- Verify the development environment

After setup completes, follow the post-installation steps shown in the terminal.

### Manual Setup (Alternative)

If you prefer to set up manually or need more control:

```bash
# 1. Clone the repository
git clone https://github.com/ukeSJTU/nomad.git
cd nomad

# 2. Install dependencies
pnpm install

# 3. Install Playwright browsers
pnpm exec playwright install

# 4. Set up Git hooks
pnpm prepare

# 5. Create environment file
cp .env.example .env
```

### Configure Environment

After setup, you **must** configure the `.env` file:

```bash
# Edit .env and set required variables
# Most importantly: DATABASE_URL
```

### Create Database

If using PostgreSQL (recommended):

```bash
createdb nomad
```

Then push the database schema:

```bash
pnpm db:push
```

### Seed Database (Optional)

Populate the database with sample data for development:

```bash
pnpm db:seed
```

This will create sample data for:

- Airports (12 major international airports)
- Airlines (10 major carriers)
- Flights (50 flights with various statuses)
- Flight Seat Classes (economy, premium economy, business, first class)

### Start Development

```bash
# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Documentation

This project includes automatic OpenAPI 3.0 documentation generation for all API endpoints.

### Accessing API Documentation

> These are only served in development mode for safety concerns.
> TODO: we'll add a sanitized online API document later.

- **Scalar UI**: Visit [http://localhost:3000/docs/api](http://localhost:3000/docs/api) to view the interactive API documentation
- **OpenAPI Spec**: The raw OpenAPI specification is available at `/public/openapi.json`

## Available Scripts

| 命令                | 作用说明                              |
| ------------------- | ------------------------------------- |
| `pnpm dev`          | 启动开发服务器（使用 Turbopack 加速） |
| `pnpm build`        | 构建生产版本（使用 Turbopack 加速）   |
| `pnpm start`        | 启动生产服务器                        |
| `pnpm test`         | 运行测试（监听模式）                  |
| `pnpm test:run`     | 运行测试一次后退出                    |
| `pnpm test:ui`      | 运行测试并打开 UI 界面                |
| `pnpm db:push`      | 推送数据库架构变更到数据库            |
| `pnpm db:generate`  | 生成数据库迁移文件                    |
| `pnpm db:migrate`   | 执行数据库迁移                        |
| `pnpm db:seed`      | 使用示例数据填充数据库                |
| `pnpm api:generate` | 生成 OpenAPI 文档规范                 |
| `pnpm lint`         | 检查代码规范问题                      |
| `pnpm lint:fix`     | 自动修复代码规范问题                  |
| `pnpm format`       | 格式化所有代码文件                    |
| `pnpm format:check` | 检查代码格式是否符合规范              |
| `pnpm prepare`      | 安装 Husky Git 钩子                   |
| `pnpm e2e`          | 运行所有 E2E 测试（无头模式）         |
| `pnpm e2e:ui`       | 打开 Playwright UI 界面运行测试       |
| `pnpm e2e:headed`   | 显示浏览器窗口运行测试                |
| `pnpm e2e:report`   | 查看测试报告                          |
| `pnpm e2e:debug`    | 调试模式运行测试                      |

## Development

### Code Quality

This project uses several tools to maintain code quality:

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks management
- **lint-staged**: Run linters on staged files
- **commitlint**: Conventional commit message validation

### Git Workflow

> 📖 **完整的 Git 工作流程文档**：[Git 工作流](http://localhost:3000/docs/04-git-workflow)
>
> 包含详细的分支策略、提交规范、Git Hooks、CI/CD 流程、代码审查指南以及高级场景处理。

**快速参考**：

1. 创建功能分支：`git checkout -b feat/your-feature`
2. 开发并提交：`git commit -m "feat: add new feature"`
3. 推送并创建 PR：`git push origin feat/your-feature`

详细的工作流程、提交规范和最佳实践请参考 [完整文档](http://localhost:3000/docs/04-git-workflow)。

## Project Structure

For detailed information about the project structure, file organization, and development conventions, please see:

- [Project Structure and Conventions](docs/conventions.md) - Comprehensive guide to file organization, naming conventions, and best practices
- [Data Flow Guide](content/docs/technical-design/07-data-flow.mdx) - Complete guide for data exchange using Server Components and Server Actions

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
