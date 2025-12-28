---
theme: seriph
background: https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920
title: 需求管理系统演示
info: |
  ## 需求管理系统

  使用结构化数据管理功能需求
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# 需求管理系统

使用 TypeScript + Vue 实现的结构化需求管理

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    开始演示 <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: center
class: text-center
---

# 为什么需要结构化需求管理？

<v-clicks>

- 📊 **单一数据源** - 避免文档与代码不同步
- 🔄 **跨应用复用** - docs、slides、web 共享数据
- 🎯 **类型安全** - TypeScript 保证数据一致性
- 🔍 **可追溯** - 通过 JSDoc 关联测试与需求
- 📈 **自动统计** - 实时计算需求覆盖率

</v-clicks>

---

# 项目架构

<div class="grid grid-cols-2 gap-4">

<div>

## 数据层

```
packages/requirements/
├── src/
│   ├── data/
│   │   ├── types.ts
│   │   ├── user-module.ts
│   │   └── index.ts
│   └── utils/
│       ├── stats.ts
│       └── query.ts
```

**纯数据 + 工具函数**

- 无 UI 依赖
- TypeScript 严格类型
- 可复用查询逻辑

</div>

<div>

## 展示层

```
apps/docs/          # React 组件
├── components/
│   ├── RequirementStats.tsx
│   └── RequirementCard.tsx

apps/slides/        # Vue 组件
└── components/
    ├── RequirementStatsDemo.vue
    └── RequirementCardDemo.vue
```

**框架独立**

- 各应用自定义 UI
- 统一数据源
- 灵活样式

</div>

</div>

---

# 需求概览

<RequirementStatsDemo />

<!--
这是一个动态组件，展示：
- 当前系统中的总需求数
- 用户故事和验收标准总数
- 按优先级和模块的分布情况
-->

---

# 需求详情示例

<RequirementCardDemo />

<!--
展示单个需求的详细信息：
- 需求ID和优先级
- 功能概述
- 用户故事示例
- 验收标准数量
-->

---

# 在测试中使用 JSDoc 标签

<div class="grid grid-cols-2 gap-4">

<div>

## Vitest 单元测试

```typescript
/**
 * 测试手机号OTP注册功能
 * @requirement REQ-U01
 */
describe("Phone OTP Registration", () => {
  /**
   * @requirement REQ-U01
   * @scenario 场景1
   */
  test("should complete registration", async () => {
    // 测试实现
  });
});
```

</div>

<div>

## Playwright E2E 测试

```typescript
/**
 * E2E测试：完整注册流程
 * @requirement REQ-U01
 */
test.describe("Registration E2E", () => {
  /**
   * @requirement REQ-U01
   * @scenario 场景1
   */
  test("complete flow", async ({ page }) => {
    // E2E 测试步骤
  });
});
```

</div>

</div>

<div class="mt-4 p-4 bg-blue-50 rounded">
💡 <strong>提示：</strong> JSDoc 标签是纯注释，不影响测试执行，但可以通过工具扫描生成覆盖率报告
</div>

---

# 数据 API 示例

<div class="grid grid-cols-2 gap-4">

<div>

## 统计查询

```typescript
import { getRequirementStats } from "@nomad/requirements";
import { allModules } from "@nomad/requirements/data";

const stats = getRequirementStats(allModules);
// {
//   totalRequirements: 12,
//   totalUserStories: 20,
//   totalAcceptanceCriteria: 80,
//   byModule: { ... },
//   byPriority: { ... }
// }
```

</div>

<div>

## 需求查询

```typescript
import {
  getRequirementById,
  searchRequirementsByName,
} from "@nomad/requirements";

// 按 ID 查询
const req = getRequirementById(allModules, "REQ-U01");

// 按名称搜索
const results = searchRequirementsByName(allModules, "注册");
```

</div>

</div>

---

# 数据驱动的优势

<v-clicks>

1. **单一数据源** - `@nomad/requirements` 包作为 source of truth
2. **自动统计** - 无需手动更新数字，实时计算
3. **类型安全** - TypeScript 编译时发现错误
4. **跨应用复用** - docs、slides、web 共享同一份数据
5. **易于维护** - 修改需求只需更新数据文件
6. **测试追溯** - JSDoc 标签关联测试和需求
7. **可扩展** - 未来可添加需求导出、变更历史等功能

</v-clicks>

---
layout: center
class: text-center
---

# 当前状态

<div class="text-2xl">
✅ 用户模块已完成（12个需求）
</div>

<div class="mt-8 text-gray-600">
其他模块（flight, order, payment, ui-ux）待迁移
</div>

<div class="mt-12">
  <a href="https://github.com/ukeSJTU/nomad" target="_blank"
     class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    查看项目 →
  </a>
</div>

---
layout: end
---

# 谢谢观看

需求管理系统 Demo

[GitHub](https://github.com/ukeSJTU/nomad) · [文档](https://nomad-docs.example.com)
