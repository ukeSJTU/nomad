# 工作报告: Frontend Developer - [功能名称]

## 1. 任务摘要

> 简述本次前端开发任务的目标和范围。

**任务目标:** [描述此次前端开发要实现的用户界面和交互功能]

**涉及页面/组件:** [列出涉及的页面路由、UI组件等]

---

## 2. 完成工作

> 用列表形式描述具体完成的工作项。

- [ ] 创建了服务端组件: `[ComponentName]`
- [ ] 创建了客户端组件: `[ComponentName]`
- [ ] 实现了页面路由: `[/route/path]`
- [ ] 集成了 Server Actions: `[actionName]`
- [ ] 使用了 Shadcn/UI 组件: `[ComponentName]`
- [ ] 实现了表单验证和错误处理
- [ ] 完成了响应式布局设计

---

## 3. 关键决策 / 实现说明

> 解释在前端实现过程中做出的重要选择和需要注意的细节。

### 3.1 组件架构设计

**组件类型决策:**

| 组件名称          | 类型             | 理由                               |
| ----------------- | ---------------- | ---------------------------------- |
| `[ComponentName]` | Server Component | [如"仅负责数据获取和渲染，无交互"] |
| `[ComponentName]` | Client Component | [如"需要处理用户点击和状态管理"]   |

**组件层级关系:**

```
[ParentComponent] (Server)
  ├── [ChildComponent1] (Client)
  │   └── [GrandchildComponent] (Client)
  └── [ChildComponent2] (Server)
```

### 3.2 服务端组件 (Server Component) 实现

**组件名称:** `[ServerComponentName]`

**职责:** [说明此组件的用途，如"展示用户订单列表"]

**数据获取方式:**

```typescript
// src/app/(frontend)/[route]/page.tsx
import { [serviceFunctionName] } from '@/lib/services/[module]';

export default async function [ComponentName]() {
  const data = await [serviceFunctionName]();

  return (
    // [JSX 代码]
  );
}
```

**为什么使用 Server Component?**

- [理由1: 如"直接在服务器获取数据，减少客户端请求"]
- [理由2: 如"无需客户端状态管理，简化实现"]
- [理由3: 如"提升首屏加载性能和SEO"]

### 3.3 客户端组件 (Client Component) 实现

**组件名称:** `[ClientComponentName]`

**职责:** [说明此组件的用途，如"处理表单提交和用户交互"]

**使用的 Hooks:**

- `useState`: [说明状态管理的内容]
- `useEffect`: [说明副作用处理的逻辑]
- `useFormState` / `useFormStatus`: [如涉及表单处理]

**状态管理:**

```typescript
// src/components/[module]/[component-name].tsx
'use client';

export function [ComponentName]() {
  const [state, setState] = useState<[StateType]>(initialState);

  // [组件逻辑]

  return (
    // [JSX 代码]
  );
}
```

**为什么使用 Client Component?**

- [理由1: 如"需要响应用户的点击事件"]
- [理由2: 如"需要维护表单的输入状态"]
- [理由3: 如"需要浏览器 API (如 localStorage)"]

### 3.4 Server Actions 集成

**调用的 Action:** `[actionName]`

**集成方式:**

```typescript
// 表单提交方式
<form action={[actionName]}>
  <input name="[fieldName]" />
  <button type="submit">Submit</button>
</form>

// 或函数调用方式
const handleClick = async () => {
  const result = await [actionName](formData);
  if (result.success) {
    // [成功处理逻辑]
  } else {
    // [错误处理逻辑]
  }
};
```

**错误处理:**

- [场景1] -> 显示提示: `[错误消息]`
- [场景2] -> 显示提示: `[错误消息]`

### 3.5 UI 实现

**使用的 Shadcn/UI 组件:**

- `Button` - [用途说明]
- `Input` - [用途说明]
- `Dialog` - [用途说明]
- `Form` - [用途说明]

**自定义样式:**

```typescript
// 使用 Tailwind CSS
<div className="flex flex-col gap-4 p-6 rounded-lg border">
  {/* [内容] */}
</div>
```

**响应式设计:**

- **移动端 (< 768px):** [布局说明]
- **平板 (768px - 1024px):** [布局说明]
- **桌面端 (> 1024px):** [布局说明]

---

## 4. 页面路由

> 如创建了新的页面路由，在此说明。

**路由路径:** `/[route]/[subroute]`

**页面类型:** [如 "Dynamic Route" / "Static Route" / "Route Group"]

**文件结构:**

```
src/app/(frontend)/[route]/
  ├── page.tsx          # 页面主组件
  ├── actions.ts        # Server Actions
  └── layout.tsx        # 布局组件 (如适用)
```

**页面功能:** [简述此页面的主要功能]

---

## 5. 表单处理

> 如实现了表单，说明表单的验证和处理逻辑。

**表单名称:** `[FormName]`

**表单字段:**

- `[fieldName]`: [类型] - [验证规则]
- `[fieldName]`: [类型] - [验证规则]

**客户端验证:**

- 使用 Zod Schema (从 Backend Developer 提供的 Schema 复用)
- 实时验证: [说明哪些字段有实时验证]

**提交处理:**

- 调用 Server Action: `[actionName]`
- 成功后: [如"跳转到确认页面"]
- 失败后: [如"显示错误提示"]

---

## 6. 文件变更列表

> 列出本次前端开发过程中创建、修改或删除的文件。

### 创建文件

- `src/app/(frontend)/[route]/page.tsx` - [页面组件]
- `src/components/[module]/[component-name].tsx` - [复用组件]
- `src/app/(frontend)/[route]/layout.tsx` - [布局组件]

### 修改文件

- `src/app/(frontend)/layout.tsx` - [如添加了全局导航链接]
- `src/components/ui/[component].tsx` - [如自定义了 Shadcn 组件]

### 删除文件

- `[文件路径]` - [删除原因]

---

## 7. 依赖的外部组件/库

> 如使用了 Shadcn/UI 之外的组件或第三方库，在此说明。

- **[组件/库名]**: [版本] - [用途说明]
- **[组件/库名]**: [版本] - [用途说明]

---

## 8. 后续建议

> 向下一个角色提供的建议和注意事项。

### 给 QA Engineer 的建议:

- [建议1: 如"重点测试表单的边界情况输入"]
- [建议2: 如"需测试响应式布局在不同屏幕尺寸下的表现"]
- [建议3: 如"注意测试异步操作的加载状态"]

### 给 Technical Writer 的建议:

- [建议1: 如"页面 URL 为 /[route]，需更新导航文档"]
- [建议2: 如"用户可通过 XX 步骤完成 YY 操作"]

### 已知限制或待优化:

- [限制1: 如"当前未实现无限滚动，仅显示前50条"]
- [限制2: 如"图片上传功能待后续迭代实现"]

---

## 9. 验证与检查

> 前端实现是否符合项目规范的自查清单。

- [ ] 组件文件名使用 `kebab-case.tsx`，组件名使用 `PascalCase`
- [ ] 客户端组件已添加 `'use client'` 指令
- [ ] 服务端组件无 `'use client'` 指令
- [ ] 严禁使用 `any` 类型，所有 props 和状态类型定义完整
- [ ] 只使用 Shadcn/UI 和 Tailwind CSS，无其他 UI 库
- [ ] 响应式设计在移动端、平板、桌面端均正常显示
- [ ] TypeScript 编译无错误
- [ ] ESLint 检查通过: `pnpm lint`

---

## 10. 备注

> 其他需要注意的事项或设计决策。

[在此添加任何补充说明、UI/UX 设计考虑或待讨论的交互细节]
