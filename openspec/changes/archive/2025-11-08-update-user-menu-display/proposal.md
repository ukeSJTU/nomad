# Update User Menu Display

## Why

根据课程作业最新要求,当前 UserMenu 组件的文本显示不符合规范:

- 收起状态显示用户名 `{session.user.name || "Anonymous"}`(第 67 行)
- 展开状态显示 `尊敬的{session.user.name || "Anonymous"}`(第 86 行)
- 课程要求统一显示"尊敬的用户"字样,而非具体用户名

此外,组件缺少以下用户体验增强:

- 缺少视觉引导提示(如下拉箭头图标),用户不知道可以悬浮查看更多选项
- 缺少点击跳转功能,点击用户菜单无法直接访问用户个人主页
- 缺少 Storybook 文档,不利于组件的展示、测试和维护

## What Changes

### 文本显示调整

- 修改收起状态文本:从 `{session.user.name || "Anonymous"}` 改为 `"尊敬的用户"`
- 修改展开状态文本:从 `尊敬的{session.user.name || "Anonymous"}` 改为 `"尊敬的用户"`
- 保持 Avatar 组件的 fallback 逻辑不变(仍使用用户名首字母或 "A")

### 视觉引导增强

- 在触发区域的用户名文本后添加 ChevronDown 图标(来自 lucide-react)
- 图标样式:
  - 大小:`size-3.5`(参考项目中其他组件如 `page-actions.tsx`)
  - 颜色:`text-muted-foreground`
  - 仅在中等及以上屏幕显示(与用户名文本保持一致)

### 交互功能增强

- 将 HoverCardTrigger 内的触发元素包装为可点击的 Link 组件
- 点击目标:`/home`(用户个人主页)
- 保持悬浮展开功能不受影响
- 整个触发区域可点击(包括 Avatar、文本、图标)

### Storybook 文档

- 创建 `src/stories/user-menu.stories.tsx`
- 至少包含 1 个 Story 展示登录状态的用户菜单
- 参考现有 Story 结构(`avatar.stories.tsx`, `dropdown-menu.stories.tsx`)

## Impact

### Affected Specs

- `user-interface` - UserMenu 组件的显示和交互规范

### Affected Code

- `src/components/common/user-menu.tsx` - 主要修改目标
  - 第 66-68 行:收起状态文本显示
  - 第 82-87 行:展开状态文本和结构
  - 导入 ChevronDown 和 Link
- `src/components/common/header.tsx` - 引用 UserMenu 的位置(第 37 行)
- `src/stories/user-menu.stories.tsx` - 新建 Storybook 文档

### User-Facing Changes

- 用户看到的菜单文本从个性化用户名变为统一的"尊敬的用户"
- 用户可以看到下拉箭头提示,知道可以悬浮查看更多选项
- 用户可以点击菜单直接跳转到个人主页(`/home`)

### Breaking Changes

无破坏性变更。

### Migration Notes

无需迁移,纯 UI 调整。

### Related Documents

- 课程作业要求文档
- 用户界面设计规范
