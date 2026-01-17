# Common 域组件迁移

> **批次分配**: 批次1 (高优先级 - 基础组件 + Link/Image 适配器模式建立)
> **组件总数**: 12
> **状态**: 已完成 5 | 进行中 0 | 未开始 7
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

- [ ] 菜单打开/关闭
- [ ] 用户信息显示
- [ ] 菜单项渲染
- [ ] 退出登录流程

**实现笔记**

- 待实施时记录

---

#### ./common/data-table-with-actions.tsx

**基本信息**

- 路径: `apps/web/app/_components/common/data-table-with-actions.tsx`
- 复杂度: 高
- 优先级: P1

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 提供数据源
- 定义列配置
- 处理行/批量操作回调
- 处理路由相关逻辑 (如果有)
- 处理副作用 (删除确认等)

UI 职责:
- 表格渲染
- 排序/筛选 UI
- 分页 UI
- 选择行 checkbox
- 操作按钮渲染
- 接收完全受控的数据和回调

适配器需求:
- 无 (所有路由/副作用由容器处理)
```

**View Model 接口**

```typescript
interface DataTableWithActionsProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  // 行操作
  rowActions?: Array<{
    key: string;
    label: string;
    onClick: (row: TData) => void;
    disabled?: (row: TData) => boolean;
  }>;
  // 批量操作
  batchActions?: Array<{
    key: string;
    label: string;
    onClick: (rows: TData[]) => void;
  }>;
  // 分页
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  // 排序
  sorting?: {
    column: string;
    direction: "asc" | "desc";
    onSortChange: (column: string, direction: "asc" | "desc") => void;
  };
}
```

**测试要点**

- [ ] 数据渲染
- [ ] 排序交互
- [ ] 分页交互
- [ ] 行选择
- [ ] 批量操作

**实现笔记**

- 待实施时记录

---

#### ./common/search-bar.tsx

**基本信息**

- 路径: `apps/web/app/_components/common/search-bar.tsx`
- 复杂度: 低
- 优先级: P2

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 管理搜索值状态
- 处理提交回调
- 处理搜索结果导航

UI 职责:
- 输入框渲染
- 搜索图标
- 清除按钮
- 受控输入 value/onChange
- onSubmit 回调

适配器需求:
- 无
```

**View Model 接口**

```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  loading?: boolean;
}
```

**测试要点**

- [ ] 输入交互
- [ ] 提交事件
- [ ] 清除功能

**实现笔记**

- 待实施时记录

---

#### ./common/stepper.tsx

**基本信息**

- 路径: `apps/web/app/_components/common/stepper.tsx`
- 复杂度: 低
- 优先级: P2

**依赖问题**

- [x] use_client (可能可以移除)

**重构策略**

```
容器职责:
- 管理当前步骤状态
- 处理步骤切换逻辑

UI 职责:
- 步骤指示器渲染
- 步骤标题/描述
- 完成/当前/未完成状态视觉反馈
- 受控 current/onChange

适配器需求:
- 无
```

**View Model 接口**

```typescript
interface StepperProps {
  steps: Array<{
    key: string;
    title: string;
    description?: string;
  }>;
  current: number;
  onChange?: (step: number) => void;
  clickable?: boolean;
}
```

**测试要点**

- [ ] 步骤渲染
- [ ] 状态视觉反馈
- [ ] 点击切换 (如果 clickable)

**实现笔记**

- 若纯展示可移除 use_client

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

**基本信息**

- 路径: `apps/web/app/_components/common/construction.tsx`
- 复杂度: 低
- 优先级: P2

**依赖问题**

- 待确认 (深度笔记中未提及,可能是纯 UI)

**重构策略**

```
如果是纯展示组件:

UI 职责:
- 施工中提示页面
- 图标/插图
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
```

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
```

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
