# user-interface Specification

## Purpose

This specification defines the user interface requirements for common UI components in the Nomad application, focusing on user-facing interactions, visual design, and component behavior.

**Scope:**

- User authentication UI (UserMenu, sign-in/sign-up flows)
- Navigation components (Header, menus, links)
- User profile and account management interfaces
- Common UI patterns and component documentation (Storybook)

**Goals:**

- Provide consistent and intuitive user interfaces
- Ensure compliance with course requirements and design standards
- Maintain accessibility and responsive design across devices
- Document components for development and testing

## Requirements

### Requirement: User Menu Visual Guidance

UserMenu 组件 SHALL 提供清晰的视觉引导,使用户知道可以与菜单交互查看更多选项。

#### Scenario: Show dropdown indicator icon

- **WHEN** 用户查看 Header 中的 UserMenu 组件
- **THEN** 组件在用户名文本后显示 ChevronDown 图标
- **AND** 图标大小为 `size-3.5`,颜色为 `text-muted-foreground`
- **AND** 图标仅在中等及以上屏幕尺寸显示(与用户名文本保持一致)

### Requirement: User Menu Text Display Standardization

UserMenu 组件 SHALL 统一显示"尊敬的用户"字样,而非显示具体用户名,以符合课程作业要求并提供标准化用户体验。

#### Scenario: Collapsed state text display

- **WHEN** 用户在未展开 UserMenu 的状态下查看 Header
- **THEN** 组件显示文本"尊敬的用户"
- **AND** 不显示用户的具体名称(即使用户已登录并有用户名)
- **AND** Avatar 的 fallback 仍使用用户名首字母或 "A"(如果无用户名)

#### Scenario: Expanded state text display

- **WHEN** 用户悬浮鼠标在 UserMenu 上触发展开菜单
- **THEN** 展开的 HoverCardContent 中显示文本"尊敬的用户"
- **AND** 不显示用户的具体名称(移除之前的 `尊敬的{session.user.name || "Anonymous"}` 逻辑)
- **AND** 用户可以看到其他个人信息(Avatar、会员徽章等)

### Requirement: User Menu Click Navigation

UserMenu 组件 SHALL 支持点击跳转到用户个人主页,提供便捷的导航体验。

#### Scenario: Click to navigate to user homepage

- **WHEN** 用户点击 UserMenu 的触发区域(包括 Avatar、文本、图标)
- **THEN** 浏览器导航到 `/home` 页面
- **AND** 使用 Next.js Link 组件实现客户端导航
- **AND** 整个触发区域(HoverCardTrigger 内的所有元素)都是可点击的

#### Scenario: Hover interaction still works

- **WHEN** 用户悬浮鼠标在 UserMenu 上
- **THEN** 下拉菜单正常展开显示用户选项
- **AND** 点击跳转功能与悬浮展开功能互不冲突
- **AND** 用户可以选择点击跳转或悬浮查看选项

### Requirement: User Menu Storybook Documentation

UserMenu 组件 SHALL 提供 Storybook 文档,以便在隔离环境中展示和测试组件。

#### Scenario: Storybook story for logged-in state

- **WHEN** 开发者打开 Storybook 并导航到 UserMenu 组件
- **THEN** 可以看到至少 1 个展示登录状态的 Story
- **AND** Story 使用 mock session 数据模拟已登录用户
- **AND** Story 展示完整的 UserMenu 组件功能(包括文本、图标、点击跳转提示)

#### Scenario: Storybook follows project conventions

- **WHEN** 开发者查看 `src/stories/user-menu.stories.tsx` 文件
- **THEN** 文件结构遵循项目现有 Story 约定
- **AND** 使用 `@storybook/nextjs-vite` 的 `Meta` 和 `StoryObj` 类型
- **AND** Story 布局设置为 `centered`
- **AND** 组件标题遵循命名约定(如 `Common/UserMenu` 或 `Shadcn/UserMenu`)
