# Nomad

A modern Next.js full-stack application with TypeScript, Tailwind CSS, and comprehensive development tooling.

[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=code)](https://github.com/ukeSJTU/nomad)
[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=blanks)](https://github.com/ukeSJTU/nomad)
[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=lines)](https://github.com/ukeSJTU/nomad)

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint & Prettier** for code quality
- **Husky & lint-staged** for Git hooks
- **Conventional Commits** with commitlint
- **GitHub Actions** for CI/CD
- **pnpm** for package management

## Quick Start

### Prerequisites

- Node.js 20.15.0+
- pnpm 10.0.0+
- postgresql 15

### Clone the repository

```bash
git clone https://github.com/ukeSJTU/nomad.git
cd nomad

# Install dependencies
pnpm install
```

### Create Database

If using postgresql (recommended):

```bash
createdb nomad
```

### Create config file

```bash
cp .env.example .env
```

Then you **must** configure the `.env` file based on your actual environment such as `DATABASE_URL`.

### Start the server

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

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
| `pnpm api:generate` | 生成OpenAPI文件                       |
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

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Commit using conventional commits: `git commit -m "feat: add new feature"`
4. Push and create a Pull Request

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

## Project Structure

For detailed information about the project structure, file organization, and development conventions, please see:

- [Project Structure and Conventions](docs/conventions.md) - Comprehensive guide to file organization, naming conventions, and best practices

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
