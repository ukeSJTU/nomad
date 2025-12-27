# Nomad Demo App

Nomad 航空订票系统的视频演示应用，使用 Remotion 和 Next.js 构建。

## 概览

这个应用展示了 Nomad 航空订票系统的完整业务流程，通过程序化视频动画展示从用户注册到订单管理的全流程。

## 主要场景

### 🎬 场景 1: 品牌开场 (3秒)

- Logo 飞入动画
- 品牌名称展示
- Slogan 呈现

### 🔐 场景 2: 用户认证 (25秒)

- 邮箱注册流程（3步骤）
- 水平过渡动画
- 登录流程（含摄像机运镜）

### 🔍 场景 3: 航班搜索 (30秒)

- 搜索表单填写
- 7天价格比较
- 航班列表展示
- 舱位选择

### 📝 场景 4: 订票流程 (40秒)

- 灵活的旅客选择
- 联系信息填写
- 附加服务选择
- 支付流程

### 🏠 场景 5: 个人中心 (30秒)

- 个人信息管理
- 账号安全设置
- 常用旅客管理
- 订单查看

## 技术栈

- **Next.js 15.5** - React 框架
- **Remotion 4.0** - 程序化视频生成
- **React 19** - UI 库
- **Tailwind CSS 4** - 样式框架
- **TypeScript** - 类型安全

## 开发

### 安装依赖

```bash
pnpm install
```

### 本地开发

启动 Next.js 开发服务器（端口 3001）：

```bash
pnpm dev
```

访问 http://localhost:3001 查看视频播放器。

### Remotion Studio

启动 Remotion Studio 进行视频编辑和调试：

```bash
pnpm remotion
```

这将打开 Remotion Studio，你可以在其中：

- 预览所有视频组合
- 调整时间轴和动画
- 调试单个场景
- 实时修改参数

## 视频渲染

### 渲染主视频

```bash
pnpm render BusinessShowcase out/business-showcase.mp4
```

### 渲染单个场景

```bash
# 渲染开场动画
pnpm render IntroScene out/intro.mp4

# 渲染认证场景
pnpm render AuthSceneComplete out/auth.mp4

# 渲染搜索场景
pnpm render SearchScene out/search.mp4

# 渲染订票场景
pnpm render OrderScene out/order.mp4

# 渲染个人中心
pnpm render HomeScene out/home.mp4
```

## 视频规格

- **分辨率**: 1920x1080 (Full HD)
- **帧率**: 30 fps
- **总时长**: 128秒 (3840帧)
- **编码**: H.264

## 项目结构

```
apps/demo/
├── src/
│   ├── app/                    # Next.js 应用路由
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页（视频播放器）
│   └── remotion/              # Remotion 视频组件
│       ├── Root.tsx           # Remotion 根组件
│       ├── index.ts           # 导出配置
│       ├── constants.ts       # 视频常量配置
│       ├── compositions/      # 主要组合
│       │   └── BusinessShowcase.tsx
│       ├── scenes/            # 场景组件
│       │   ├── IntroScene.tsx
│       │   ├── AuthScene.tsx
│       │   ├── AuthSceneComplete.tsx
│       │   ├── SearchScene.tsx
│       │   ├── OrderScene.tsx
│       │   └── HomeScene.tsx
│       └── components/        # 可复用组件
│           ├── Spacing.tsx
│           └── visual/
│               ├── LoginFormVisual.tsx
│               └── SignUpFormVisual.tsx
├── styles/
│   └── global.css            # 全局样式
├── package.json
├── next.config.ts
├── remotion.config.ts        # Remotion 配置
└── tsconfig.json
```

## Compositions

### BusinessShowcase (主视频)

完整的业务流程展示，包含所有场景和过渡动画。

### 单独场景

用于开发和调试的独立场景：

- `IntroScene` - 品牌开场
- `AuthScene` - 登录场景（不含注册）
- `AuthSceneComplete` - 完整认证流程
- `SearchScene` - 航班搜索
- `OrderScene` - 订票流程
- `HomeScene` - 个人中心

## 部署

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## CI/CD

视频渲染可以通过 GitHub Actions 自动化。相关工作流配置请查看 `.github/workflows/` 目录。

## 相关链接

- [Remotion 文档](https://www.remotion.dev/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [Nomad 主项目](../../README.md)

## 许可证

私有项目
