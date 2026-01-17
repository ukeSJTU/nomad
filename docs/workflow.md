# 组件重构固定工作流

> 按照用户指定要重构的组件源路径，如 `apps/web/app/_components/common/header.tsx`。目标：迁移到 `packages/ui` 纯 UI 组件，容器留在 app 层，补 Storybook/测试，确保构建通过。

## 约束速记

- 文件命名：kebab-case，具名导出，不用 default。
- 类型：`ComponentNameProps`，优先与组件同文件；跨组件复用放域级 `types.ts`。
- 适配器：UI 只能用 `useUiComponents` 的 Link/Image；禁止直接用 next/router/usePathname/useSearchParams。
- 导航：命令式导航用回调；声明式用 Link 适配器。
- 副作用：计时/URL/localStorage/Server Action 等留在容器；UI 仅渲染受控数据。
- 测试：非基础组件需要 Vitest+RTL，测试文件与组件同级 `*.test.tsx`。

## 步骤

1. 读取上下文
   - 打开 `TODO.md`、对应域的 `docs/migrations/*-migration.md`、`ARCHITECTURE.md` 相关 View Model/适配器段落。
   - 如果已有 `apps/web` 容器/测试/story，先浏览了解现状与差异。

2. 拆分职责
   - 列出 UI 纯展示/受控 props（无 Next 依赖、无副作用）。
   - 列出容器职责：数据获取、表单 schema、URL 同步、倒计时、localStorage、日志、导航回调等。

3. 在 `packages/ui` 创建组件
   - 位置：`packages/ui/src/components/{domain[/subdomain]}/{component}.tsx`，必要时补 `index.tsx` 导出。
   - 只保留 UI 逻辑；使用 `useUiComponents` 获取 Link/Image（如果使用了 useUiComponents，那么一定要添加"use client"标记）；保持受控 props、回调命名一致。
   - 更新/迁移测试到同目录 `*.test.tsx`；补必要的 mock/受控 props。
   - 若需要共享类型/工具，放域级 `types.ts`/`utils.ts`，避免新建多余层级。

4. 更新容器（apps/web）
   - 创建/更新同名容器组件，负责组装 props、处理 Next 依赖（Link/Image 注入在 Provider，导航/URL/副作用在容器）。
   - 调整导入路径指向 `@nomad/ui/components/...`。
   - 保留/迁移原有逻辑：表单 schema、Server Action 调用、倒计时 hook、URL searchParams、localStorage。

5. Storybook
   - 在 `apps/storybook/src/stories/...` 添加/更新 story，使用新 UI 组件，提供最小可交互示例；确保适配器可用（默认 UiProvider）。

6. 验证
   - 静态检查：`pnpm lint`。如果出现报错，那么用 `pnpm --filter ui(或者对应的name) lint --fix`。
   - 构建：`pnpm --filter web build` + `pnpm --filter storybook build`。
   - 测试：`pnpm --filter ui test -- <pattern>` 运行新增/迁移测试。

7. 自查清单
   - [ ] UI 组件无 Next 依赖/无副作用，使用 Link/Image 适配器。
   - [ ] 受控 props/回调命名符合 `ComponentNameProps` 约定。
   - [ ] 容器承载导航、URL、计时、localStorage、Server Action、日志。
   - [ ] 桶导出 `index.tsx` 已更新；导入路径指向 UI 包。
   - [ ] Storybook 覆盖主要态（loading/empty/error/selected 等）。
   - [ ] 测试与组件同级，覆盖渲染与交互。
   - [ ] 构建/测试命令通过或记录阻塞原因。

8. 更新 TODO.md 进度状态与链接并向用户反馈。
