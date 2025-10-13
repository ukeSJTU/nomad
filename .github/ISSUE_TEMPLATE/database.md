---
name: Database/Schema issue
about: Report database schema, migration, or data-related issues
title: "[DB] "
labels: "database"
assignees: ""
---

## 数据库问题描述

清楚简洁地描述数据库相关的问题。

## 问题类型

- [ ] Schema设计问题
- [ ] 数据迁移(Migration)问题
- [ ] 数据完整性问题
- [ ] 查询性能问题
- [ ] 约束冲突
- [ ] 索引问题
- [ ] 数据类型问题
- [ ] 其他(请补充)

## 涉及的表/Schema

- **表名**: [例如 users, posts]
- **Schema文件**: [例如 src/lib/schema/users.ts]
- **Migration文件**: [如果相关]

## 当前Schema

```typescript
// 粘贴当前的schema定义
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  // ...
});
```

或

```sql
-- SQL DDL
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  -- ...
);
```

## 问题详情

### 错误信息

```
粘贴错误消息或日志
```

### 查询语句

如果涉及特定查询：

```sql
SELECT * FROM users WHERE ...
```

或使用ORM的查询：

```typescript
const result = await db.select().from(users).where(...)
```

### 执行计划

如果是性能问题，请提供查询执行计划：

```sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE ...
```

```
粘贴执行计划结果
```

## 期望的Schema/行为

描述期望的数据库结构或行为：

```typescript
// 期望的schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  // ...
});
```

## 数据影响

- **影响的数据量**: [例如 10000条记录]
- **是否需要数据迁移**: [是/否]
- **是否可能造成数据丢失**: [是/否]
- **是否影响生产数据**: [是/否]

## 建议的解决方案

### Schema变更

```typescript
// 建议的schema修改
```

### Migration策略

描述建议的迁移步骤：

1. 创建新字段
2. 迁移数据
3. 删除旧字段
4. 更新应用代码

### 回滚计划

如果需要回滚，描述回滚步骤：

## 环境信息

- **数据库类型**: [PostgreSQL/MySQL/SQLite]
- **数据库版本**: [例如 PostgreSQL 15.0]
- **ORM/查询构建器**: [例如 Drizzle ORM 0.29.0]
- **环境**: [开发/测试/生产]

## 相关代码

如果有相关的应用代码，请在此粘贴：

```typescript
// 使用该表的相关代码
```

## 测试计划

描述如何测试这个修复：

- [ ] 单元测试
- [ ] 集成测试
- [ ] 数据迁移测试
- [ ] 性能测试

## 破坏性变更

- [ ] 此变更是否为破坏性变更？
- [ ] 是否需要更新API？
- [ ] 是否需要通知用户？

## 附加信息

在这里添加关于问题的任何其他背景信息。

## 相关Issue

- 链接到任何相关的问题
