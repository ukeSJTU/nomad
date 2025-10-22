# 工作报告: Backend Developer - [功能名称]

## 1. 任务摘要

> 简述本次后端开发任务的目标和范围。

**任务目标:** [描述此次后端开发要实现的业务逻辑或功能]

**涉及模块:** [列出涉及的数据库表、API路由、服务函数等]

---

## 2. 完成工作

> 用列表形式描述具体完成的工作项。

- [ ] 设计并实现了数据库 Schema: `[表名]`
- [ ] 创建了 Server Actions: `[action名称]`
- [ ] 编写了业务逻辑服务函数: `[函数名]`
- [ ] 定义了 Zod 验证 Schema: `[schema名称]`
- [ ] 实现了数据库填充脚本 (如适用)
- [ ] 编写了单元测试 (配合 QA Engineer)

---

## 3. 关键决策 / 实现说明

> 解释在后端实现过程中做出的重要选择和需要注意的细节。

### 3.1 数据库 Schema 设计

**表名:** `[tableName]`

**字段说明:**

- `[fieldName]`: [类型] - [用途说明，如"用户的唯一标识符"]
- `[fieldName]`: [类型] - [用途说明]
- `[fieldName]`: [类型] - [用途说明]

**关系说明:**

- 与 `[otherTable]` 表的关系: [一对多/多对多/一对一]
- 外键约束: `[foreignKeyField]` 引用 `[referencedTable].[referencedField]`

**索引设计:**

- 在 `[fieldName]` 字段上创建索引 - 原因: [如"提高查询性能"]

**完整 Schema 代码:**

```typescript
// src/lib/db/schema/[module].ts
export const [tableName] = pgTable('[table_name]', {
  // [字段定义]
});

export const [tableName]Relations = relations([tableName], ({ one, many }) => ({
  // [关系定义]
}));
```

### 3.2 Server Actions 实现

**Action 名称:** `[actionName]`

**功能描述:** [说明此 Action 的业务逻辑和用途]

**输入参数:**

- `[paramName]`: [类型] - [参数说明]

**验证 Schema:**

```typescript
// src/lib/schema/[module].ts
export const [schemaName] = z.object({
  [fieldName]: z.string().min(1, "[错误提示]"),
  // [其他字段验证规则]
});
```

**实现逻辑:**

1. [步骤1: 如"验证用户权限"]
2. [步骤2: 如"查询数据库获取现有数据"]
3. [步骤3: 如"执行业务逻辑处理"]
4. [步骤4: 如"写入数据库"]
5. [步骤5: 如"返回结果"]

**错误处理:**

- [场景1] -> 返回错误: `[错误信息]`
- [场景2] -> 返回错误: `[错误信息]`

**完整 Action 代码:**

```typescript
// src/app/(frontend)/[route]/actions.ts
'use server';

export async function [actionName](formData: FormData) {
  // [实现代码]
}
```

### 3.3 服务层函数

**函数名:** `[serviceFunctionName]`

**职责:** [说明此服务函数的具体职责]

**为什么需要这个服务函数?**

- [理由: 如"复用性 - 多个 Server Actions 需要此逻辑"]
- [理由: 如"可测试性 - 独立的纯函数便于单元测试"]

**函数签名:**

```typescript
// src/lib/services/[module].ts
export async function [serviceFunctionName](
  params: [ParamType]
): Promise<[ReturnType]> {
  // [实现代码]
}
```

---

## 4. 数据库迁移

> 如涉及数据库变更，说明迁移过程。

### 4.1 生成迁移文件

**命令:** `pnpm db:generate`

**生成的迁移文件:** `drizzle/[timestamp]_[migration_name].sql`

### 4.2 应用迁移

**命令:** `pnpm db:push`

**迁移内容概述:**

- [变更1: 如"创建了 users 表"]
- [变更2: 如"为 email 字段添加了唯一索引"]

### 4.3 回滚计划 (如需要)

**如何回滚:**

```sql
-- [回滚 SQL 语句]
```

---

## 5. API 路由 (如适用)

> 如果实现了 RESTful API 路由，在此说明。

**路由路径:** `GET /api/[route]`

**功能描述:** [说明此 API 的用途]

**请求参数:**

- Query: `[paramName]` - [类型] - [说明]
- Body: `[fieldName]` - [类型] - [说明]

**响应格式:**

```typescript
{
  "success": true,
  "data": {
    // [响应数据结构]
  }
}
```

**实现代码位置:** `src/app/api/[route]/route.ts`

---

## 6. 文件变更列表

> 列出本次后端开发过程中创建、修改或删除的文件。

### 创建文件

- `src/lib/db/schema/[module].ts` - [数据库 Schema 定义]
- `src/app/(frontend)/[route]/actions.ts` - [Server Actions]
- `src/lib/services/[module].ts` - [业务逻辑服务函数]
- `src/lib/schema/[module].ts` - [Zod 验证 Schema]

### 修改文件

- `src/lib/db/schema/index.ts` - [导出新的 Schema]
- `drizzle.config.ts` - [如有配置变更]

### 删除文件

- `[文件路径]` - [删除原因]

---

## 7. 依赖的外部服务/库

> 如使用了第三方服务或库，在此说明。

- **[库名/服务名]**: [版本] - [用途说明]
- **[库名/服务名]**: [版本] - [用途说明]

---

## 8. 后续建议

> 向下一个角色提供的建议和注意事项。

### 给 Frontend Developer 的建议:

- [建议1: 如"Server Action `[actionName]` 返回的数据格式为..."]
- [建议2: 如"调用此 Action 时需要传递的参数为..."]
- [建议3: 如"错误处理: 当返回 `{ success: false }` 时应显示..."]

### 给 QA Engineer 的建议:

- [建议1: 如"重点测试 `[functionName]` 的边界情况"]
- [建议2: 如"需要准备测试数据: ..."]
- [建议3: 如"此功能依赖数据库事务，需测试并发场景"]

---

## 9. 验证与检查

> 后端实现是否符合项目规范的自查清单。

- [ ] 所有 Schema 文件使用 `camelCase` 命名字段
- [ ] 所有 Server Actions 使用 Zod 进行输入验证
- [ ] 严禁使用 `any` 类型，所有类型定义完整
- [ ] 数据库查询使用 Drizzle ORM，无裸 SQL 字符串
- [ ] 认证逻辑使用 Better Auth 库
- [ ] 迁移文件已生成并成功应用: `pnpm db:generate && pnpm db:push`
- [ ] TypeScript 编译无错误

---

## 10. 备注

> 其他需要注意的事项或已知问题。

[在此添加任何补充说明、已知限制或待优化的部分]
