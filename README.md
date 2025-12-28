# Nomad

现代化的在线旅行社（OTA）平台，致力于打造**简洁直观、价格透明、无干扰**的机票预订体验。

[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=code)](https://github.com/ukeSJTU/nomad)
[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=blanks)](https://github.com/ukeSJTU/nomad)
[![Scc Count Badge](https://sloc.xyz/github/ukeSJTU/nomad/?category=lines)](https://github.com/ukeSJTU/nomad)

## 核心特性

- **用户认证** - 手机号/邮箱注册登录、GitHub OAuth、密码加密存储
- **个人信息管理** - 查看/编辑个人信息、常用旅客管理
- **机票搜索与预订** - 航班搜索、筛选排序、在线预订
- **订单管理** - 订单列表、详情查看、订单操作
- **支付功能** - 模拟支付、模拟退款
- **机场攻略** - 热门机场简介、交通指南、乘机流程

## 快速开始

详细的开发环境配置请参考 [CONTRIBUTING.md](CONTRIBUTING.md)

如果你只是想在本地查看项目效果，可以按照下面进行操作

```bash
# 克隆仓库
git clone https://github.com/ukeSJTU/nomad.git
cd nomad

# 安装依赖并配置开发环境
pnpm run setup:dev

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

## 项目结构

Nomad 使用 **pnpm workspace** 和 **Turborepo** 构建的 monorepo 架构：

```
nomad/
├── apps/
│   ├── web/         # 主 Web 应用 (端口 3000)
│   ├── docs/        # 文档站点 (端口 3001)
│   ├── demo/        # Remotion 视频演示 (端口 3002)
│   └── slides/      # Slidev 演示文稿
├── packages/
│   └── requirements/  # 共享需求数据和工具
└── openspec/        # 项目规范和提案
```

## 常用命令

### 全局命令

```bash
pnpm dev              # 启动所有应用
pnpm build            # 构建所有应用
pnpm lint             # 检查代码规范
pnpm test             # 运行所有测试
pnpm type-check       # TypeScript 类型检查
pnpm clean            # 清理构建产物
```

### 应用特定命令

```bash
# Web 应用
pnpm web:dev          # 启动 Web 开发服务器
pnpm web:build        # 构建 Web 应用
pnpm web:test         # 运行 Web 测试
pnpm web:e2e          # 运行 E2E 测试
pnpm web:db:push      # 推送数据库架构
pnpm web:db:seed      # 填充测试数据

# 文档站点
pnpm docs:dev         # 启动文档开发服务器
pnpm docs:build       # 构建文档站点

# Demo 应用
pnpm demo:dev         # 启动 Demo 开发服务器
pnpm demo:remotion    # 启动 Remotion Studio
```

更多命令和架构细节，请参考[文档站点](https://nomad-docs.vercel.app/technical-design/monorepo)。

## 贡献指南

我们欢迎所有形式的贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解：

- 开发环境配置
- 代码规范与最佳实践
- 提交流程与分支管理
- 测试要求

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 致谢

- [Next.js](https://nextjs.org/) - 强大的全栈框架
- [Vercel](https://vercel.com/) - 托管与部署平台
- [Fumadocs](https://fumadocs.dev/) - 文档框架
