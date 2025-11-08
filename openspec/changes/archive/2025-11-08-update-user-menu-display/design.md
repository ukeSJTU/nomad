# Design Document: User Menu Display Update

## Context

UserMenu 组件是应用 Header 中的核心用户交互组件,当前版本展示用户名但不符合课程要求。本次更新需要:
1. 统一文本显示为"尊敬的用户"
2. 添加视觉引导(下拉箭头)
3. 支持点击跳转到用户主页
4. 创建 Storybook 文档

## Goals / Non-Goals

### Goals
- 符合课程作业要求,统一显示"尊敬的用户"
- 提升用户体验:清晰的视觉引导 + 便捷的点击跳转
- 完善组件文档(Storybook)
- 保持现有悬浮展开功能

### Non-Goals
- 不修改 Avatar 的 fallback 逻辑(仍使用用户名首字母)
- 不改变菜单内容和功能(钱包、常用信息、退出登录等)
- 不修改其他 Header 组件

## Decisions

### 1. 文本显示策略

**决策**: 完全移除用户名显示,统一使用"尊敬的用户"

**原因**:
- 符合课程作业明确要求
- 提供标准化的用户体验
- 保护用户隐私(不在 Header 中直接显示用户名)

**替代方案**:
- ❌ 保留用户名 + "尊敬的"前缀:不符合课程要求
- ❌ 根据用户偏好切换显示方式:过度设计,增加复杂度

### 2. 图标选择和样式

**决策**: 使用 ChevronDown 图标,样式 `size-3.5 text-muted-foreground`

**原因**:
- ChevronDown 是业界标准的下拉菜单提示图标
- `size-3.5` 与项目中 `page-actions.tsx` 保持一致
- `text-muted-foreground` 提供低调的视觉提示,不喧宾夺主

**参考**:
```tsx
// src/components/fumadocs/page-actions.tsx:218
<ChevronDown className="size-3.5 text-muted-foreground" />
```

**替代方案**:
- ❌ 使用 ChevronUp:语义不符,下拉菜单应用向下箭头
- ❌ 使用更大的图标(size-4/5):与项目风格不一致

### 3. 点击跳转实现方式

**决策**: 将整个 HoverCardTrigger 内的 `<div>` 包装为 Next.js Link 组件

**原因**:
- Next.js Link 提供客户端导航,性能更好
- Link 组件与 HoverCard 兼容,不影响悬浮功能
- 整个触发区域可点击,符合 Fitts's Law(点击目标越大越易用)

**实现细节**:
```tsx
<HoverCardTrigger asChild>
  <Link href="/home" className="flex items-center gap-2 cursor-pointer">
    {/* Avatar + 文本 + 图标 */}
  </Link>
</HoverCardTrigger>
```

**替代方案**:
- ❌ 只让文本可点击:点击区域太小,用户体验差
- ❌ 使用 `<button onClick={...}>`:需要额外的路由逻辑,不如 Link 简洁

### 4. Storybook 结构

**决策**: 创建简单的 Story,展示登录状态的 UserMenu

**原因**:
- UserMenu 依赖 Better Auth session,Storybook 中需要 mock session
- 保持简单,1 个 Story 足以展示组件的核心功能
- 参考 `avatar.stories.tsx` 的结构

**实现计划**:
```tsx
// Mock session data
const mockSession = {
  user: {
    name: "张三",
    email: "test@example.com",
    image: "https://github.com/shadcn.png",
  },
};

export const LoggedIn: Story = {
  render: () => {
    // Mock authClient.useSession
    // Render UserMenu
  },
};
```

**替代方案**:
- ❌ 创建多个 Story(未登录、加载中、不同用户名):过度设计,UserMenu 已有条件渲染逻辑
- ❌ 集成真实 Better Auth:增加 Storybook 配置复杂度

## Risks / Trade-offs

### Risks

1. **移除用户名可能影响用户识别**
   - **缓解**: Avatar 的 fallback 仍显示用户名首字母,展开菜单中显示完整用户名
   - **影响**: 低

2. **Link 组件可能与 HoverCard 触发冲突**
   - **缓解**: HoverCardTrigger 支持 `asChild` prop,可将触发行为委托给子组件
   - **测试**: 需要验证点击和悬浮两种交互都能正常工作
   - **影响**: 低

3. **Storybook mock session 可能不够真实**
   - **缓解**: 使用真实的 session 数据结构,确保类型一致
   - **影响**: 低

### Trade-offs

| 方面 | 优势 | 劣势 |
|------|------|------|
| 统一文本 | 符合课程要求,标准化 | 失去个性化体验 |
| 添加图标 | 清晰的视觉引导 | Header 中增加一个元素(轻微视觉复杂度) |
| 点击跳转 | 提升便捷性 | 用户可能误点击(较小风险) |
| Storybook | 组件文档完善,便于测试 | 需要维护额外文件 |

## Implementation Notes

### 修改顺序
1. 更新 `user-menu.tsx` 的导入(ChevronDown, Link)
2. 修改收起状态文本和结构
3. 修改展开状态文本
4. 添加 ChevronDown 图标
5. 将触发区域包装为 Link
6. 创建 `user-menu.stories.tsx`

### 代码位置
- **文件**: `src/components/common/user-menu.tsx`
- **收起状态**: 第 66-68 行
- **展开状态**: 第 82-87 行
- **导入**: 文件顶部

### 测试计划
- 手动测试:点击跳转到 `/home`
- 手动测试:悬浮显示下拉菜单
- 手动测试:不同屏幕尺寸下的显示(响应式)
- Storybook:验证组件在隔离环境中正常渲染

## Open Questions

无悬而未决的问题。需求明确,实现方案直接。

## API Documentation Update Plan

### Phase 3: 规划 API 文档更新

本次变更不涉及 API 或 Server Actions,仅为 UI 组件调整,因此:

- ❌ 无需更新 Server Actions JSDoc
- ❌ 无需更新 OpenAPI specs
- ❌ 无需更新后端 API 文档

**需要更新的文档**:
- ✅ 组件 JSDoc 注释(如果 UserMenu 有导出的 props)
- ✅ Storybook 文档(新建)
- ✅ 用户界面设计规范(如果存在相关文档)

**具体计划**:
1. 在 `user-menu.tsx` 顶部添加组件描述注释
2. 创建 `user-menu.stories.tsx` 作为组件使用文档
3. 实现阶段(Phase 6)更新 `content/docs/` 中的相关用户界面文档(如果存在)
