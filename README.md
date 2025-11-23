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
