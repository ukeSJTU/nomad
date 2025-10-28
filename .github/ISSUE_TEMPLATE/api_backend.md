---
name: API/Backend issue
about: Report issues related to API endpoints or backend logic
title: "[API] "
labels: "api"
assignees: ""
---

## API/后端问题描述

清楚简洁地描述API或后端的问题。

## 问题类型

- [ ] API返回错误
- [ ] API响应数据不正确
- [ ] 认证/授权问题
- [ ] 业务逻辑错误
- [ ] 数据验证失败
- [ ] 服务器错误 (5xx)
- [ ] 其他(请补充)

## API端点信息

- **端点路径**: [例如 /api/users/:id]
- **HTTP方法**: [GET/POST/PUT/DELETE/PATCH]
- **相关文件**: [例如 src/app/api/users/[id]/route.ts]

## 请求信息

### 请求示例

```bash
curl -X POST https://example.com/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### 请求参数

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## 当前响应

### 状态码

[例如 500, 400, 401]

### 响应体

```json
{
  "error": "Internal Server Error",
  "message": "..."
}
```

### 错误日志

```
粘贴相关的服务器日志或错误堆栈
```

## 期望响应

### 期望状态码

[例如 200, 201]

### 期望响应体

```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## 重现步骤

1. 调用API端点 '...'
2. 使用参数 '...'
3. 观察响应

## 环境信息

- **环境**: [开发/测试/生产]
- **Node.js版本**: [例如 22.21.0]
- **数据库**: [例如 PostgreSQL 15.0]
- **部署平台**: [例如 Vercel, AWS]

## 相关代码

如果有相关的代码片段，请在此粘贴：

```typescript
// 例如相关的API路由代码
```

## 数据库状态

如果涉及数据库，请描述：

- 相关表的schema
- 当前数据状态
- 数据库约束或触发器

## 安全考虑

- [ ] 此问题是否涉及敏感信息？
- [ ] 此问题是否涉及安全漏洞？

如果是，请注意脱敏处理或通过私密渠道报告。

## 附加信息

在这里添加关于问题的任何其他背景信息。

## 相关Issue

- 链接到任何相关的问题
