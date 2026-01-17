# Common 域组件迁移

> **批次分配**: 批次1 (高优先级 - 基础组件 + Link/Image 适配器模式建立)
> **组件总数**: 12
> **状态**: 已完成 10 | 进行中 0 | 未开始 2
> **最后更新**: 2026-01-17

## 域概览

Common 域包含应用级通用组件:

- 导航组件 (header, footer, sidebar, breadcrumb, user-menu)
- 数据展示 (data-table-with-actions)
- 通用 UI (search-bar, stepper, error-display, construction)
- 基础设施 (theme-provider, dev-user-switcher)

**关键挑战**:

- 需要建立 Link/Image 适配器使用模式 (作为后续批次的参考)
- 路由 active 状态计算需要容器化
- 主题 Provider 的跨框架抽象
- Data table 的复杂交互模式

**依赖**:

- 适配层 (批次0) 必须先完成
- header.tsx 已完成,可作为参考模式

**批次1目标**:
作为首批迁移组件,需要建立清晰的模式供后续批次参考

---

## 组件清单

### ✅ 已完成并测试

#### ./common/header.tsx

**状态**: ✅ 已完成

**实现笔记**:

- 已成功迁移到 packages/ui
- 可作为 Link/Image 适配器使用的参考实现
- 容器在 apps/web 中管理导航逻辑

**参考价值**:

- 其他导航组件 (footer, sidebar, user-menu) 可参考此模式
- 展示了如何正确使用 UiProvider

---

#### ./common/bread-crumb-nav.tsx

**状态**: ✅ 已完成 (2026-01-17)

**实现位置**:

- UI 组件: `packages/ui/src/components/common/breadcrumb-nav.tsx`
- 测试: `packages/ui/src/components/common/breadcrumb-nav.test.tsx`
- 容器: `apps/web/app/_components/common/bread-crumb-nav.tsx`
- Story: `apps/storybook/src/stories/common/breadcrumb-nav.stories.tsx`

**实现亮点**:

- 完全受控的 items 数组配置
- 正确使用 Link 适配器，无 Next.js 依赖
- 支持自定义 onClick 回调
- 支持自定义 aria-label 和 className
- 自动识别最后一项或无 href 的项为当前页
- 包含 11 个测试用例，覆盖各种场景
- Storybook 包含 9 个示例状态

**测试覆盖**:

- ✅ 基本渲染和内容显示
- ✅ 链接 href 正确性
- ✅ 当前页非链接渲染
- ✅ 导航 landmark 和 aria-label
- ✅ 分隔符渲染逻辑
- ✅ 空数组处理
- ✅ 自定义 className

**参考价值**:

- 展示了如何将硬编码配置迁移为受控组件
- 演示了正确的 Link 适配器使用模式
- 可作为其他简单导航组件的参考模板

---

### 📋 未开始

#### ./common/user-menu.tsx

**状态**: ✅ 已完成 (2026-01-17)

**基本信息**

- 路径: `apps/web/app/_components/common/user-menu.tsx`
- 复杂度: 中
- 优先级: P1

**依赖问题**

- [x] Next.js Link/Router
- [x] Server Action: signOutAction
- [x] use_client

**重构策略**

```
容器职责:
- 从 session 获取用户数据
- 处理 signOut action
- 管理菜单打开状态
- 提供菜单项配置

UI 职责:
- 下拉菜单组件
- 用户头像/名称显示
- 菜单项渲染 (Link 适配器)
- 受控 open/onOpenChange

适配器需求:
- LinkAdapter
```

**View Model 接口**
参考 [ARCHITECTURE.md - UserMenu](../../ARCHITECTURE.md#usermenu)

**测试要点**

- [x] 用户信息显示
- [x] 头像与initials fallback
- [x] Loading skeleton
- [x] 未登录状态的登录/注册按钮
- [x] 匿名用户处理

**实现位置**

- UI 组件: `packages/ui/src/components/common/user-menu.tsx`
- 测试: `packages/ui/src/components/common/user-menu.test.tsx`
- 容器: `apps/web/app/_components/common/user-menu.tsx`
- 容器测试: `apps/web/app/_components/common/user-menu.test.tsx`
- Story: `apps/storybook/src/stories/common/user-menu.stories.tsx`
- Utils: `packages/ui/src/components/common/utils.ts` (getInitials函数)

**实现亮点**

- 完全受控的 session/isPending/onSignOut props
- 正确使用 Link 适配器，无 Next.js 依赖
- 支持自定义所有导航 hrefs
- 使用 HoverCard 实现悬浮菜单
- 包含 12 个测试用例，覆盖各种状态
- Storybook 包含 8 个示例状态
- 迁移了 getInitials 工具函数到 UI 包

**测试覆盖**

- ✅ "尊敬的用户" 标准化文本显示
- ✅ ChevronDown 图标正确样式
- ✅ Link 包装触发区域指向正确路径
- ✅ 头像与 initials fallback 渲染
- ✅ 未登录状态显示登录/注册按钮
- ✅ Loading skeleton 渲染
- ✅ 匿名用户 'A' fallback
- ✅ 自定义 hrefs 支持

**参考价值**

- 展示了如何处理用户会话状态的 UI 组件
- 演示了 HoverCard 在纯 UI 组件中的使用
- 提供了工具函数迁移的模式参考
- 可作为其他需要 session 数据的组件参考

---

#### ./common/data-table-with-actions.tsx

**状态**: ✅ 已完成 (2026-01-17)

**实现位置**:

- UI 组件: `packages/ui/src/components/common/data-table-with-actions.tsx`
- 测试: `packages/ui/src/components/common/data-table-with-actions.test.tsx`
- 容器: `apps/web/app/_components/common/data-table-with-actions.tsx` (re-export)
- Story: `apps/storybook/src/stories/common/data-table-with-actions.stories.tsx`

**实现亮点**:

- 完全受控的数据表格组件，支持泛型类型 `<T>`
- 支持自定义列定义(ColumnDefinition)，可用 `cell` 或 `render` 函数定制单元格渲染
- 行操作(RowAction)与批量操作(BatchAction)，支持条件显示
- 支持行选择(受控/非受控模式)，带全选功能
- 内置分页支持(PaginationConfig)
- 内置 AlertDialog 确认删除流程
- 支持 loading skeleton 和 empty state
- 支持 error 状态显示
- 支持 compact variant
- 完全无 Next.js 依赖，纯 UI 组件
- 包含 27 个测试用例，覆盖所有核心功能
- Storybook 包含 14 个示例状态

**测试覆盖**:

- ✅ 基本数据渲染和列头
- ✅ 空状态和 loading skeleton
- ✅ 错误状态显示
- ✅ 自定义单元格渲染
- ✅ 标题和筛选槽
- ✅ 添加/搜索按钮
- ✅ 行操作和条件显示
- ✅ 行选择和全选
- ✅ 批量操作和确认对话框
- ✅ 分页控制
- ✅ Compact variant
- ✅ 自定义样式和 aria-label
- ✅ 受控选择模式

**参考价值**:

- 展示了复杂交互组件如何保持纯 UI 特性
- 演示了泛型组件的类型设计
- 提供了完整的表格 UI 解决方案模板
- 可作为其他数据展示组件的参考

---

#### ./common/search-bar.tsx

**状态**: ✅ 已完成 (2026-01-17)

**实现位置**:

- UI 组件: `packages/ui/src/components/common/search-bar.tsx`
- 测试: `packages/ui/src/components/common/search-bar.test.tsx`
- 容器: `apps/web/app/_components/common/search-bar.tsx`
- Story: `apps/storybook/src/stories/common/search-bar.stories.tsx`

**实现亮点**:

- 完全受控的搜索输入组件
- 支持 loading 状态禁用交互
- 支持自定义 placeholder 和搜索按钮标签
- 支持自定义 className
- 无任何 Next.js 依赖，纯 UI 组件
- 包含 11 个测试用例，覆盖所有核心功能
- Storybook 包含 7 个示例状态

**测试覆盖**:

- ✅ 默认和自定义 placeholder 渲染
- ✅ 受控值显示
- ✅ onChange 回调触发（键盘输入）
- ✅ onSubmit 回调（按钮点击和 Enter 键）
- ✅ 搜索图标渲染
- ✅ loading 状态下禁用输入和按钮
- ✅ 自定义 className 应用
- ✅ 自定义搜索按钮标签
- ✅ 表单默认行为阻止

**参考价值**:

- 展示了简单受控表单组件的迁移模式
- 演示了 loading 状态的正确处理
- 可作为其他搜索/输入组件的参考模板

---

#### ./common/stepper.tsx

**状态**: ✅ 已完成 (2026-01-17)

**实现位置**:

- UI 组件: `packages/ui/src/components/common/stepper.tsx`
- 测试: `packages/ui/src/components/common/stepper.test.tsx`
- 容器: `apps/web/app/_components/common/stepper.tsx` (re-export)
- Story: `apps/storybook/src/stories/common/stepper.stories.tsx`

**实现亮点**:

- 纯展示组件，无 Next.js 依赖，无副作用
- 完全受控的 `steps` 和 `currentStep` props
- 支持 `default` 和 `compact` 两种展示模式
- 自动显示已完成步骤的对勾图标
- 平滑的过渡动画和视觉反馈
- 包含 14 个测试用例，覆盖所有核心功能
- Storybook 包含 13 个示例状态，包括交互式动画演示

**测试覆盖**:

- ✅ 基本渲染和内容显示
- ✅ default 模式下显示步骤描述
- ✅ compact 模式下隐藏步骤描述
- ✅ 步骤编号正确显示
- ✅ 已完成步骤显示对勾图标
- ✅ 当前步骤的激活样式
- ✅ 已完成步骤的样式
- ✅ 连接线渲染
- ✅ 已完成步骤的连接线填充
- ✅ 无描述步骤的处理
- ✅ 自定义 className
- ✅ 单步骤处理
- ✅ 最后一步为当前步骤
- ✅ ref 正确转发

**参考价值**:

- 展示了纯 UI 组件的最佳实践（无副作用，完全受控）
- 演示了如何处理复杂的视觉状态（完成/进行中/未开始）
- 可作为其他进度指示组件的参考模板
- Storybook 交互式示例展示了如何测试动画效果

---

#### ./common/error-display.tsx

**基本信息**

- 路径: `apps/web/app/_components/common/error-display.tsx`
- 复杂度: 低
- 优先级: P2

**依赖问题**

- [x] Next.js Link
- [x] use_client
- [x] 全局副作用 (可能访问 window)

**重构策略**

```
容器职责:
- 提供错误消息
- 处理重试回调
- 处理导航回调
- 避免直接访问 window

UI 职责:
- 错误消息显示
- 错误图标/插图
- CTA 按钮 (重试/返回首页等)
- Link 适配器用于导航

适配器需求:
- LinkAdapter (如果需要导航链接)
```

**View Model 接口**

```typescript
interface ErrorDisplayProps {
  title?: string;
  message: string;
  actions?: Array<{
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "default" | "outline";
  }>;
  illustration?: ReactNode;
}
```

**测试要点**

- [ ] 错误消息显示
- [ ] 按钮交互
- [ ] 链接导航

**实现笔记**

- 待实施时记录

---

#### ./common/construction.tsx

**状态**: ✅ 已完成 (2026-01-17)

**实现位置**:

- UI 组件: `packages/ui/src/components/common/under-construction.tsx`
- 测试: `packages/ui/src/components/common/under-construction.test.tsx`
- 容器: `apps/web/app/_components/common/construction.tsx`
- Story: `apps/storybook/src/stories/common/under-construction.stories.tsx`

**实现亮点**:

- 完全纯展示组件，无任何依赖或副作用
- 使用 Empty 原始组件构建，保持一致设计
- 支持自定义标题、描述和可选子内容
- 自动显示施工图标(ConstructionIcon)
- 完全无 Next.js 依赖，纯 UI 组件
- 包含 8 个测试用例，覆盖所有场景
- Storybook 包含 5 个示例状态

**测试覆盖**:

- ✅ 标题和描述渲染
- ✅ 无 children 时不渲染 EmptyContent
- ✅ 带 children 时正确渲染
- ✅ 施工图标显示
- ✅ 自定义标题文本
- ✅ 自定义描述文本
- ✅ 复杂 children 内容支持
- ✅ Empty 组件结构维护

**参考价值**:

- 展示了最简单的纯 UI 组件迁移模式
- 演示了如何利用现有原始组件构建新组件
- 可作为其他简单展示组件的参考模板
- 完美示例：零依赖、零副作用的纯组件
- 提示文案

Props:

- title?: string
- description?: string
- backLink?: { label: string; href: string; onClick?: () => void }

适配器需求:

- LinkAdapter (如果有返回链接)

```

**测试要点**

- [ ] 内容显示

**实现笔记**

- 待实施时记录
- 可能是最简单的组件之一

**阻塞问题**

- [ ] 需要读取组件确认实现

---

#### ./common/dev-user-switcher.tsx

**基本信息**

- 路径: `apps/web/app/_components/common/dev-user-switcher.tsx`
- 复杂度: 中
- 优先级: P3 (仅开发环境使用)

**依赖问题**

- [x] useEffect
- [x] use_client
- [x] 全局副作用 (localStorage)

**重构策略**

```

容器职责:

- 处理 localStorage 读写
- 处理用户切换逻辑
- 提供用户列表

UI 职责:

- 用户选择器下拉
- 当前用户显示
- 切换回调

适配器需求:

- 无

````

**View Model 接口**

```typescript
interface DevUserSwitcherProps {
  users: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  currentUserId?: string;
  onSwitch: (userId: string) => void;
}
````

**测试要点**

- [ ] 用户列表渲染
- [ ] 切换交互
- [ ] 当前用户高亮

**实现笔记**

- 待实施时记录
- 仅在开发环境使用,优先级较低

---

#### ./common/theme-provider.tsx

**基本信息**

- 路径: `apps/web/app/_components/common/theme-provider.tsx`
- 复杂度: 中
- 优先级: P2

**依赖问题**

- [x] Context
- [x] use_client

**重构策略**

```
特殊情况: Theme Provider 应该保持在 app 层

决策:
- 主题 Provider 保持在 apps/web
- packages/ui 仅暴露类型定义和薄封装
- UI 组件通过 className 支持主题,不直接依赖 Provider

UI 包职责:
- 暴露主题相关的 TypeScript 类型
- 可选: 提供 useTheme hook 接口定义

App 层职责:
- 实现 ThemeProvider
- 管理主题状态和持久化
```

**测试要点**

- [ ] 主题切换
- [ ] 持久化

**实现笔记**

- 待实施时记录
- 这是一个特殊情况,不完全迁移到 UI 包

---

## 域级决策

### Link/Image 适配器使用模式

header.tsx 已建立了使用模式:

- 通过 `useUiComponents()` 获取 Link 和 Image
- 所有组件应遵循相同模式
- footer, sidebar, breadcrumb, user-menu 可直接参考

### 导航与 Active 状态

所有导航组件 (sidebar, user-menu, breadcrumb) 应:

- 容器从路由计算 active 状态
- 通过 props 传递给 UI
- UI 只负责视觉反馈

### 数据表格模式

data-table-with-actions 建立的模式应适用于:

- passengers/passengers-data-table
- 其他需要数据表格的场景
- 完全受控,所有逻辑在容器

---

## 迁移检查清单

- [x] header.tsx 已迁移 (参考实现)
- [ ] 其余 11 个组件迁移到 packages/ui
- [ ] 容器组件在 apps/web 实现
- [ ] Link/Image 适配器模式在所有组件中一致应用
- [ ] 单元测试覆盖
- [ ] 在 apps/demo 中验证可用性
- [ ] 文档更新

---

## 进度统计

| 类别     | 总数   | 已完成 | 进行中 | 未开始 |
| -------- | ------ | ------ | ------ | ------ |
| 导航组件 | 5      | 1      | 0      | 4      |
| 数据展示 | 1      | 0      | 0      | 1      |
| 通用 UI  | 4      | 0      | 0      | 4      |
| 基础设施 | 2      | 0      | 0      | 2      |
| **总计** | **12** | **1**  | **0**  | **11** |

---

## 下一步行动

1. ✅ header.tsx 已完成 - 作为参考
2. 优先完成 footer.tsx (复用 header 模式)
3. 完成 app-sidebar.tsx (高优先级)
4. 完成 user-menu.tsx
5. 完成 data-table-with-actions.tsx (建立表格模式)
6. 其余低优先级组件

---

## 参考

- [架构指南](../../ARCHITECTURE.md)
- [总览](../../TODO.md)
- **参考实现**: packages/ui/src/components/site-header.tsx (已完成的 header 组件)
