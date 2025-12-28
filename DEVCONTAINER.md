# Nomad 项目 DevContainer 使用指南

本文档介绍如何使用 VSCode DevContainer 快速搭建 Nomad 项目的开发环境。

## 什么是 DevContainer？

DevContainer（开发容器）是一种基于 Docker 的开发环境配置方案，它可以：

- 统一团队的开发环境，避免"在我机器上可以运行"的问题
- 自动安装所需的 Node.js、pnpm、PostgreSQL 等依赖
- 隔离开发环境，不影响本地系统
- 支持 Windows、macOS、Linux 跨平台使用

## 前置要求

### 必需软件

1. **Docker Desktop** 或 **Docker Engine**
   - Windows/macOS: [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: Docker Engine + Docker Compose

2. **Visual Studio Code**
   - [下载 VSCode](https://code.visualstudio.com/)

3. **Dev Containers 扩展**
   - 在 VSCode 中搜索并安装 "Dev Containers" 扩展
   - 或运行命令: `code --install-extension ms-vscode-remote.remote-containers`

### 系统要求

- **磁盘空间**: 至少 10GB 可用空间（用于 Docker 镜像和依赖）
- **内存**: 建议 8GB 及以上
- **CPU**: 支持虚拟化（Windows 需启用 WSL2）

## 快速开始

### 首次使用

1. **克隆仓库**

   ```bash
   git clone https://github.com/ukeSJTU/nomad.git
   cd nomad
   ```

2. **（可选）配置环境变量**

   如果需要测试外部服务（短信、邮件、OAuth 等），可以配置自定义环境变量：

   ```bash
   cp .devcontainer/.env.devcontainer.example .devcontainer/.env.devcontainer
   # 编辑 .env.devcontainer，添加你的 API 密钥
   ```

3. **在容器中打开项目**

   在 VSCode 中打开项目文件夹，然后：
   - 按 `F1` 或 `Cmd/Ctrl+Shift+P` 打开命令面板
   - 输入并选择: **Dev Containers: Reopen in Container**
   - 或点击左下角的绿色图标，选择 "Reopen in Container"

4. **等待初始化完成**

   首次构建和初始化需要 10-15 分钟，过程包括：
   - 构建 Docker 镜像（Node.js + 工具链）
   - 启动 PostgreSQL 数据库
   - 安装项目依赖（pnpm install）
   - 初始化数据库 schema
   - 填充测试数据
   - 安装 Playwright 浏览器

   你可以在 VSCode 终端中查看进度。

5. **开始开发**

   初始化完成后，运行：

   ```bash
   pnpm dev
   ```

   然后在浏览器中访问 [http://localhost:3000](http://localhost:3000)

### 后续使用

容器配置完成后，每次使用只需：

1. 打开 VSCode
2. 点击左下角绿色图标 → "Reopen in Container"
3. 等待约 30-60 秒容器启动
4. 运行 `pnpm dev` 开始开发

## 常用命令

### 开发服务器

```bash
# 启动所有应用（web + docs + demo）
pnpm dev

# 只启动 Web 应用（推荐）
pnpm web:dev

# 启动文档站点
pnpm docs:dev

# 启动 Storybook（UI 组件库）
pnpm web:storybook
```

### 数据库管理

```bash
# 打开 Drizzle Studio（可视化数据库管理）
pnpm web:db:studio

# 推送 schema 更改到数据库
pnpm web:db:push

# 重新填充测试数据
pnpm web:db:seed

# 使用 psql 连接数据库
psql -h postgres -U nomad -d nomad_dev
```

### 测试

```bash
# 运行所有测试
pnpm web:test

# 运行单元测试
pnpm web:test:unit

# 运行集成测试
pnpm web:test:integration

# E2E 测试
pnpm web:e2e

# E2E 测试（带 UI）
pnpm web:e2e:ui
```

### 代码质量

```bash
# 代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 格式化代码
pnpm format

# TypeScript 类型检查
pnpm type-check
```

## 容器配置说明

### 端口转发

以下端口会自动转发到本地：

- **3000**: Web 应用（主应用）
- **3001**: 文档站点
- **3002**: Demo 应用（Remotion）
- **5432**: PostgreSQL 数据库
- **6006**: Storybook
- **6007**: React Email 预览

### 环境变量

环境变量的优先级（从高到低）：

1. `.devcontainer/.env.devcontainer`（你的自定义配置，不会提交到 Git）
2. `docker-compose.yml` 中的默认值
3. `apps/web/.env.local`（容器自动创建）
4. `apps/web/.env`（项目默认配置）

### 默认配置

开箱即用的默认配置：

- **数据库**: PostgreSQL 15，用户名 `nomad`，密码 `nomad_dev_password`
- **外部服务**: 阿里云短信和 Resend 邮件服务默认**禁用**
- **日志级别**: `debug`（开发模式）
- **认证密钥**: 开发环境默认密钥（生产环境需更换）

### 启用外部服务

如果需要测试短信或邮件功能：

1. 创建 `.devcontainer/.env.devcontainer` 文件：

   ```bash
   cp .devcontainer/.env.devcontainer.example .devcontainer/.env.devcontainer
   ```

2. 编辑文件，添加你的 API 密钥：

   ```bash
   # 启用阿里云短信
   ENABLE_ALIYUN_SMS=enabled
   ALIBABA_CLOUD_ACCESS_KEY_ID=your_key_id
   ALIBABA_CLOUD_ACCESS_KEY_SECRET=your_secret
   ALIBABA_CLOUD_SMS_SIGN_NAME=YourAppName
   ALIBABA_CLOUD_SMS_TEMPLATE_CODE=SMS_123456789

   # 启用 Resend 邮件
   ENABLE_RESEND=enabled
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```

3. 重建容器：
   - 按 `F1` → **Dev Containers: Rebuild Container**

## VSCode 扩展

容器会自动安装以下推荐扩展：

- **Biome**: 代码格式化和检查（替代 ESLint + Prettier）
- **Playwright**: E2E 测试支持
- **Vitest Explorer**: 单元测试运行器
- **SQLTools**: 数据库管理工具
- **Tailwind CSS IntelliSense**: Tailwind 自动补全
- **GitLens**: Git 增强工具
- **Error Lens**: 行内错误提示

### 使用 SQLTools 连接数据库

SQLTools 已预配置好数据库连接：

1. 点击左侧活动栏的 SQLTools 图标
2. 选择 "Nomad Development DB" 或 "Nomad Test DB"
3. 点击连接
4. 即可查询和管理数据库

## 常见问题

### 容器构建失败

**症状**: Docker 构建时报错

**解决方案**:

```bash
# 清理 Docker 缓存
docker system prune -a

# 重新构建容器
# 在 VSCode 中: F1 → Dev Containers: Rebuild Container (Without Cache)
```

### 端口被占用

**症状**: "Port 3000 is already in use"

**解决方案**:

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### 数据库连接失败

**症状**: "ECONNREFUSED postgres:5432"

**解决方案**:

```bash
# 检查 PostgreSQL 容器状态
docker ps

# 查看数据库日志
docker logs nomad-postgres

# 重启数据库容器
docker-compose -f .devcontainer/docker-compose.yml restart postgres
```

### pnpm install 失败

**症状**: 依赖安装失败或超时

**解决方案**:

```bash
# 清理缓存并重新安装
pnpm clean
pnpm install --frozen-lockfile

# 如果仍然失败，尝试不使用 frozen-lockfile
pnpm install
```

### Playwright 浏览器缺失

**症状**: E2E 测试失败，提示浏览器未安装

**解决方案**:

```bash
cd apps/web
pnpm exec playwright install chromium --with-deps
```

### Windows 行尾符问题

**症状**: 脚本执行失败，提示 `/bin/bash^M: bad interpreter`

**解决方案**:

项目已通过 `.gitattributes` 配置自动处理，但如果仍遇到问题：

```bash
# 重新克隆仓库，确保 Git 自动转换行尾符
git clone https://github.com/ukeSJTU/nomad.git
```

### 容器性能慢（Windows/macOS）

**症状**: 文件读写和命令执行明显变慢

**优化方案**:

1. 确保 Docker Desktop 分配了足够的资源（设置 → Resources）
2. 项目已使用命名卷缓存 `node_modules` 和 `pnpm store`
3. 避免在容器内编辑大文件（推荐在宿主机编辑，容器内执行）

## 重建和清理

### 重建容器

如果遇到配置问题或需要更新容器：

```bash
# 在 VSCode 中
F1 → Dev Containers: Rebuild Container

# 完全清理后重建（不保留缓存）
F1 → Dev Containers: Rebuild Container (Without Cache)
```

### 清理数据卷

如果需要完全重置环境（会删除所有数据）：

```bash
# 停止并删除容器
docker-compose -f .devcontainer/docker-compose.yml down

# 删除命名卷
docker volume rm nomad-pnpm-store
docker volume rm nomad-node-modules
docker volume rm nomad-turbo-cache
docker volume rm nomad-postgres-data

# 重新打开容器
# VSCode: F1 → Dev Containers: Reopen in Container
```

## 性能优化建议

### 1. 限制文件监视范围

VSCode 设置已默认排除以下目录：

- `node_modules`
- `.next`
- `.turbo`
- `dist`

### 2. 使用 Turbo 缓存

项目已配置 Turbo 缓存卷，重复构建速度更快：

```bash
# 查看缓存使用情况
pnpm turbo:graph
```

### 3. 按需启动应用

不需要所有应用时，只启动 Web 应用：

```bash
pnpm web:dev  # 而不是 pnpm dev
```

### 4. 定期清理 Docker

```bash
# 清理未使用的镜像和容器
docker system prune

# 查看磁盘占用
docker system df
```

## 架构说明

### 为什么使用 Docker Compose？

- **服务分离**: 应用容器和数据库容器独立管理
- **健康检查**: 确保数据库就绪后才启动应用
- **数据持久化**: PostgreSQL 数据不会随容器删除
- **易于扩展**: 未来可添加 Redis、MinIO 等服务

### 为什么使用命名卷？

- **pnpm-store**: 避免重复下载依赖包
- **node_modules**: 跨容器重建保留已安装模块
- **turbo-cache**: 持久化 Turborepo 构建缓存
- **postgres-data**: 数据库数据持久化

**性能提升**:

- 首次构建: 10-15 分钟
- 重建容器: 1-2 分钟（依赖已缓存）

### 环境变量分层设计

1. **开发默认值** (docker-compose.yml): 适合大多数开发场景，无需配置即可使用
2. **个人覆盖** (.env.devcontainer): 开发者个人配置，不提交到 Git
3. **应用层配置** (apps/web/.env.local): 自动创建，支持 Next.js 约定

**好处**: 开箱即用 + 灵活定制 + 安全（敏感信息不提交）

## 与现有工具集成

### Husky Git Hooks

容器内 Git hooks 自动工作：

- Pre-commit: Biome 检查和 lint-staged
- Commit-msg: Commitlint 验证提交信息

### Turborepo

完全兼容：

- 缓存卷 `nomad-turbo-cache` 持久化构建结果
- 所有 workspace 可见
- 守护进程正常运行

### Drizzle ORM

自动配置：

- `DATABASE_URL` 环境变量预设
- 支持开发和测试数据库
- `drizzle.config.ts` 无需修改

### Playwright

浏览器预装：

- Chromium 在初始化时自动安装
- E2E 测试可立即运行
- 支持 headed 和 UI 模式

## 技术支持

如果遇到问题：

1. 查看本文档的"常见问题"部分
2. 查看容器日志: VSCode 终端中的输出
3. 在项目 GitHub 仓库提交 Issue
4. 联系项目维护者

## 参考资源

- [VSCode Dev Containers 官方文档](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker 官方文档](https://docs.docker.com/)
- [项目贡献指南](./CONTRIBUTING.md)
