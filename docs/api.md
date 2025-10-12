# API 接口开发指南

本文档介绍如何在 Nomad 项目中使用和开发 API 接口，以及如何使用`next-openapi-gen`插件自动生成 OpenAPI 3.0 规范文档。

## 概述

Nomad 项目使用 `next-openapi-gen` 插件自动生成 OpenAPI 3.0 规范文档，提供类型安全的 API 开发体验。

## 技术栈

- **Next.js App Router**: API 路由系统
- **TypeScript**: 类型安全
- **Zod**: 运行时类型验证和 schema 定义
- **next-openapi-gen**: 自动生成 OpenAPI 文档
- **Scalar UI**: 交互式 API 文档界面（开发环境）

## 访问 API 文档

### 开发环境

启动开发服务器后，可以通过以下方式访问 API 文档：

- **Scalar UI**: [http://localhost:3000/docs/api](http://localhost:3000/docs/api)
- **OpenAPI 规范**: [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)

### 生产环境

为了安全考虑，生产环境默认关闭这个路由。

## 开发新的 API 接口

下面只是一个例子来说明建议的开发流程。

### 1. 定义 Zod Schema

在 `src/lib/validations/api/` 目录下创建对应的验证 schema：

```typescript
// src/lib/validations/api/users.ts
import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.string().datetime(),
});

export const createUserRequestSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
```

按照[开发约定](./conventions.md)，这些 Schema 和 TypeScript 类型应该通过同层级`index.ts`文件`export`，减少使用文件的文件路径长度。

### 2. 创建 API 路由

在 `src/app/api/` 目录下创建新的路由文件：

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  userResponseSchema,
  type UserResponse,
} from "@/lib/validations/api/users";

export async function GET(): Promise<NextResponse<UserResponse[]>> {
  // implement logic
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      createdAt: new Date().toISOString(),
    },
  ];

  // validate response data
  const validatedUsers = users.map(user => userResponseSchema.parse(user));

  return NextResponse.json(validatedUsers);
}
```

### 3. 处理请求验证

对于` POST/PUT` 请求，使用 Zod schema 验证请求体：

```typescript
// src/app/api/users/route.ts
export async function POST(
  request: NextRequest
): Promise<NextResponse<UserResponse>> {
  try {
    const body = await request.json();

    // validate request data
    const validatedData = createUserRequestSchema.parse(body);

    // handle business logic
    const newUser = {
      id: Date.now(),
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    // validate response data
    const validatedUser = userResponseSchema.parse(newUser);

    return NextResponse.json(validatedUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 4. 添加`JSDoc`

`next-openapi-gen`插件依赖`JSDoc`来推断描述文本和API类型，所以必须书写JSDoc注释。

| Tag                    | Description                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `@description`         | Endpoint description                                                                                                     |
| `@pathParams`          | Path parameters type/schema                                                                                              |
| `@params`              | Query parameters type/schema                                                                                             |
| `@body`                | Request body type/schema                                                                                                 |
| `@bodyDescription`     | Request body description                                                                                                 |
| `@response`            | Response type/schema with optional code and description (`User`, `201:User`, `User:Description`, `201:User:Description`) |
| `@responseDescription` | Response description                                                                                                     |
| `@responseSet`         | Override default response set (`public`, `auth`, `none`)                                                                 |
| `@add`                 | Add custom response codes (`409:ConflictResponse`, `429`)                                                                |
| `@contentType`         | Request body content type (`application/json`, `multipart/form-data`)                                                    |
| `@auth`                | Authorization type (`bearer`, `basic`, `apikey`)                                                                         |
| `@tag`                 | Custom tag                                                                                                               |
| `@deprecated`          | Marks the route as deprecated                                                                                            |
| `@openapi`             | Marks the route for inclusion in documentation (if includeOpenApiRoutes is enabled)                                      |

详细约定请看[这里](https://github.com/tazo90/next-openapi-gen?tab=readme-ov-file#jsdoc-documentation-tags)

### 5. 生成文档

创建或修改 API 接口后，运行以下命令更新 OpenAPI 文档：

```bash
pnpm api:generate
```

## 最佳实践

### 1. Schema 组织

- 将所有 API 相关的 schema 放在 `src/lib/validations/api/` 目录下
- 按功能模块组织文件（如 `users.ts`, `posts.ts`, `auth.ts`）
- 使用描述性的 schema 名称

### 2. 错误处理

- 统一使用 Zod 进行数据验证
- 提供清晰的错误信息
- 使用适当的 HTTP 状态码

### 3. 类型安全

- 为所有 API 接口定义 TypeScript 类型
- 使用 `z.infer<>` 从 Zod schema 推导类型
- 在函数签名中明确指定返回类型

## 示例项目

项目中包含一个完整的 health check API 示例：

- 路由: `src/app/api/health/route.ts`
- Schema: `src/lib/validations/api/health.ts`
- 访问: [http://localhost:3000/api/health](http://localhost:3000/api/health)

可以参考这个示例来理解完整的 API 开发流程。
