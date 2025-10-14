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

## API 响应规范

本节定义了项目中所有 API 接口应遵循的统一响应格式、错误码体系和最佳实践。统一的响应格式能够：

- 提供一致的前后端交互体验
- 简化错误处理逻辑
- 提高代码可维护性
- 便于 API 监控和日志追踪

### 响应格式标准

项目定义了三种标准响应格式：**成功响应**、**错误响应** 和 **分页响应**。所有 API 接口都必须使用这些标准格式之一。

#### 类型定义与 Schema

项目使用 **Zod Schema** 定义响应格式，既提供运行时验证，又能自动推导 TypeScript 类型。

**核心 Schema 定义位置**：`src/types/api/response.ts`

```typescript
import { z } from "zod";

// 响应元数据 Schema
export const responseMetaSchema = z.object({
  timestamp: z.string().datetime(),
  requestId: z.string(), // 必填，用于请求追踪
});

// 错误详情 Schema
export const errorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
});

// 成功响应 Schema（泛型）
export function createSuccessResponseSchema<T extends z.ZodTypeAny>(
  dataSchema: T
) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    meta: responseMetaSchema,
  });
}

// 错误响应 Schema
export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.array(errorDetailSchema).optional(),
  }),
  meta: responseMetaSchema,
});

// 分页信息 Schema
export const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  totalItems: z.number().int().nonnegative(),
});

// 分页响应 Schema（泛型）
export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(
  itemSchema: T
) {
  return z.object({
    success: z.literal(true),
    data: z.object({
      items: z.array(itemSchema),
      pagination: paginationMetaSchema,
    }),
    meta: responseMetaSchema,
  });
}

// TypeScript 类型推导
export type ResponseMeta = z.infer<typeof responseMetaSchema>;
export type ErrorDetail = z.infer<typeof errorDetailSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type PaginationMeta = z.infer<typeof paginationMetaSchema>;

// 泛型类型
export type SuccessResponse<T> = {
  success: true;
  data: T;
  meta: ResponseMeta;
};

export type PaginatedResponse<T> = {
  success: true;
  data: {
    items: T[];
    pagination: PaginationMeta;
  };
  meta: ResponseMeta;
};
```

**使用示例：**

```typescript
// 在 API Schema 定义中使用
import { createSuccessResponseSchema } from "@/types/api/response";

const flightSchema = z.object({
  id: z.string(),
  flightNumber: z.string(),
});

// 创建特定响应的 Schema
const flightResponseSchema = createSuccessResponseSchema(flightSchema);

// 推导类型
type FlightResponse = z.infer<typeof flightResponseSchema>;
```

#### 成功响应

所有成功的 API 响应应遵循以下格式：

```typescript
{
  "success": true,
  "data": {
    // 业务数据
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_k8pQxJ2mN5vL9wRt"
  }
}
```

**字段说明：**

- `success`: 布尔值，固定为 `true`，用于快速判断请求是否成功
- `data`: 业务数据，可以是对象、数组或基本类型
- `meta`: 元数据对象（**必填**）
  - `timestamp`: ISO 8601 格式的响应时间（**必填**）
  - `requestId`: 请求唯一标识符（**必填**，格式：`req_` + 16位随机字符串）

**自动生成机制：**

`requestId` 由 `ApiResponse` 工具类**自动生成**，开发者无需手动传入：

```typescript
// 自动生成 requestId
// 响应中会自动包含：requestId: "req_k8pQxJ2mN5vL9wRt"
return ApiResponse.success(data);
```

生成规则：

- 格式：`req_` + 16 位 nanoid
- 示例：`req_k8pQxJ2mN5vL9wRt`
- URL 安全，无特殊字符
- 碰撞概率极低

**示例：**

```typescript
// 获取单个资源
{
  "success": true,
  "data": {
    "id": "flight_123",
    "flightNumber": "CA1234",
    "departure": "PEK",
    "arrival": "SHA",
    "departureTime": "2025-10-14T08:00:00Z"
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_k8pQxJ2mN5vL9wRt"
  }
}

// 简单操作结果
{
  "success": true,
  "data": {
    "message": "操作成功"
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_m3nH7vK2pL9xQ5wT"
  }
}
```

#### 错误响应

所有失败的 API 响应应遵循以下格式：

```typescript
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "用户友好的错误描述",
    "details": [  // 可选，用于详细错误信息（如验证错误）
      {
        "field": "email",
        "message": "邮箱格式不正确"
      }
    ]
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_m3nH7vK2pL9xQ5wT"
  }
}
```

**字段说明：**

- `success`: 布尔值，固定为 `false`
- `error`: 错误信息对象
  - `code`: 业务错误码（见下文错误码体系）
  - `message`: 用户友好的错误描述信息
  - `details`: 详细错误信息数组（可选），主要用于验证错误
    - `field`: 出错的字段名
    - `message`: 该字段的错误描述
- `meta`: 元数据对象，与成功响应相同

**示例：**

```typescript
// 验证错误
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": [
      {
        "field": "email",
        "message": "邮箱格式不正确"
      },
      {
        "field": "password",
        "message": "密码长度必须至少8个字符"
      }
    ]
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_m3nH7vK2pL9xQ5wT"
  }
}

// 业务错误
{
  "success": false,
  "error": {
    "code": "BUSINESS_FLIGHT_NOT_FOUND",
    "message": "未找到指定的航班信息"
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_p9xQ2mN5vL7wRtK8"
  }
}

// 认证错误
{
  "success": false,
  "error": {
    "code": "AUTH_UNAUTHORIZED",
    "message": "未授权，请先登录"
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_n5vL9wRtK8pQxJ2m"
  }
}
```

#### 分页响应

对于返回列表数据的 API，应包含分页信息：

```typescript
{
  "success": true,
  "data": {
    "items": [
      // 列表项数据
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalPages": 5,
      "totalItems": 100
    }
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_m3nH7vK2pL9xQ5wT"
  }
}
```

**Schema 使用示例：**

```typescript
import { createPaginatedResponseSchema } from "@/types/api/response";

// 定义列表项的 Schema
const flightSchema = z.object({
  id: z.string(),
  flightNumber: z.string(),
  departure: z.string(),
  arrival: z.string(),
});

// 创建分页响应 Schema
const flightListResponseSchema = createPaginatedResponseSchema(flightSchema);

// 在 API 路由中使用
export async function GET(request: NextRequest) {
  const items = await getFlights();
  const pagination = {
    page: 1,
    pageSize: 20,
    totalPages: 5,
    totalItems: 100,
  };

  // 验证响应数据
  const response = flightListResponseSchema.parse({
    success: true,
    data: { items, pagination },
    meta: { timestamp: new Date().toISOString() },
  });

  return NextResponse.json(response);
}
```

**分页参数说明：**

- `items`: 当前页的数据列表
- `pagination`: 分页信息对象
  - `page`: 当前页码（从 1 开始）
  - `pageSize`: 每页数据量
  - `totalPages`: 总页数
  - `totalItems`: 总数据量

**请求参数规范：**

分页接口应接受以下查询参数：

- `page`: 页码（默认 1，最小 1）
- `pageSize`: 每页数量（默认 20，最小 1，最大 100）

**查询参数验证 Schema：**

```typescript
// 可重用的分页参数 Schema
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

// 在 API 中使用
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = paginationQuerySchema.parse({
    page: searchParams.get("page"),
    pageSize: searchParams.get("pageSize"),
  });

  // query.page 和 query.pageSize 已经是验证过的数字
}
```

**示例：**

```typescript
// GET /api/flights?page=2&pageSize=10
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "flight_123",
        "flightNumber": "CA1234",
        "departure": "PEK",
        "arrival": "SHA"
      }
      // ... 更多航班数据
    ],
    "pagination": {
      "page": 2,
      "pageSize": 10,
      "totalPages": 10,
      "totalItems": 95
    }
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_v7wRtK8pQ9xJ2mN5"
  }
}

// 空列表
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalPages": 0,
      "totalItems": 0
    }
  },
  "meta": {
    "timestamp": "2025-10-14T10:00:00Z",
    "requestId": "req_L9wRtK8pQ2xJ5mN7"
  }
}
```

### 错误码体系

项目采用语义化的错误码命名规范，格式为 `模块_具体错误`，便于快速识别错误类型和来源。

#### 错误码分类

##### 1. 认证相关错误 (AUTH_xxx)

| 错误码                       | HTTP 状态码 | 说明             |
| ---------------------------- | ----------- | ---------------- |
| `AUTH_UNAUTHORIZED`          | 401         | 未授权，需要登录 |
| `AUTH_TOKEN_EXPIRED`         | 401         | 访问令牌已过期   |
| `AUTH_TOKEN_INVALID`         | 401         | 访问令牌无效     |
| `AUTH_REFRESH_TOKEN_EXPIRED` | 401         | 刷新令牌已过期   |
| `AUTH_INVALID_CREDENTIALS`   | 401         | 用户名或密码错误 |
| `AUTH_SESSION_EXPIRED`       | 401         | 会话已过期       |
| `AUTH_FORBIDDEN`             | 403         | 无权限访问该资源 |
| `AUTH_ACCOUNT_LOCKED`        | 403         | 账号已被锁定     |
| `AUTH_ACCOUNT_DISABLED`      | 403         | 账号已被禁用     |

##### 2. 验证相关错误 (VALIDATION_xxx)

| 错误码                      | HTTP 状态码 | 说明               |
| --------------------------- | ----------- | ------------------ |
| `VALIDATION_ERROR`          | 400         | 通用验证错误       |
| `VALIDATION_REQUIRED_FIELD` | 400         | 必填字段缺失       |
| `VALIDATION_INVALID_FORMAT` | 400         | 字段格式不正确     |
| `VALIDATION_INVALID_TYPE`   | 400         | 字段类型不正确     |
| `VALIDATION_OUT_OF_RANGE`   | 400         | 字段值超出有效范围 |
| `VALIDATION_INVALID_LENGTH` | 400         | 字段长度不符合要求 |
| `VALIDATION_INVALID_EMAIL`  | 400         | 邮箱格式不正确     |
| `VALIDATION_INVALID_PHONE`  | 400         | 手机号格式不正确   |
| `VALIDATION_INVALID_DATE`   | 400         | 日期格式不正确     |

##### 3. 业务逻辑错误 (BUSINESS_xxx)

根据具体业务模块划分：

**通用业务错误：**

| 错误码                       | HTTP 状态码 | 说明           |
| ---------------------------- | ----------- | -------------- |
| `BUSINESS_NOT_FOUND`         | 404         | 资源未找到     |
| `BUSINESS_ALREADY_EXISTS`    | 409         | 资源已存在     |
| `BUSINESS_CONFLICT`          | 409         | 操作冲突       |
| `BUSINESS_OPERATION_FAILED`  | 422         | 业务操作失败   |
| `BUSINESS_INVALID_OPERATION` | 422         | 无效的业务操作 |

**机票业务错误：**

| 错误码                            | HTTP 状态码 | 说明                   |
| --------------------------------- | ----------- | ---------------------- |
| `BUSINESS_FLIGHT_NOT_FOUND`       | 404         | 航班未找到             |
| `BUSINESS_FLIGHT_FULL`            | 422         | 航班已满               |
| `BUSINESS_FLIGHT_CANCELLED`       | 422         | 航班已取消             |
| `BUSINESS_INSUFFICIENT_SEATS`     | 422         | 座位不足               |
| `BUSINESS_BOOKING_EXPIRED`        | 422         | 订单已过期             |
| `BUSINESS_BOOKING_CANCELLED`      | 422         | 订单已取消             |
| `BUSINESS_INVALID_PASSENGER_INFO` | 400         | 乘客信息不完整或不正确 |

**酒店业务错误：**

| 错误码                            | HTTP 状态码 | 说明         |
| --------------------------------- | ----------- | ------------ |
| `BUSINESS_HOTEL_NOT_FOUND`        | 404         | 酒店未找到   |
| `BUSINESS_HOTEL_UNAVAILABLE`      | 422         | 酒店不可预订 |
| `BUSINESS_ROOM_UNAVAILABLE`       | 422         | 房间不可用   |
| `BUSINESS_INSUFFICIENT_ROOMS`     | 422         | 房间数量不足 |
| `BUSINESS_CHECK_IN_DATE_INVALID`  | 400         | 入住日期无效 |
| `BUSINESS_CHECK_OUT_DATE_INVALID` | 400         | 退房日期无效 |

**支付相关错误：**

| 错误码                          | HTTP 状态码 | 说明       |
| ------------------------------- | ----------- | ---------- |
| `BUSINESS_PAYMENT_FAILED`       | 422         | 支付失败   |
| `BUSINESS_PAYMENT_TIMEOUT`      | 422         | 支付超时   |
| `BUSINESS_PAYMENT_CANCELLED`    | 422         | 支付已取消 |
| `BUSINESS_INSUFFICIENT_BALANCE` | 422         | 余额不足   |
| `BUSINESS_REFUND_FAILED`        | 422         | 退款失败   |

##### 4. 系统错误 (SYSTEM_xxx)

| 错误码                       | HTTP 状态码 | 说明           |
| ---------------------------- | ----------- | -------------- |
| `SYSTEM_INTERNAL_ERROR`      | 500         | 服务器内部错误 |
| `SYSTEM_DATABASE_ERROR`      | 500         | 数据库错误     |
| `SYSTEM_NETWORK_ERROR`       | 500         | 网络错误       |
| `SYSTEM_TIMEOUT`             | 504         | 请求超时       |
| `SYSTEM_SERVICE_UNAVAILABLE` | 503         | 服务暂时不可用 |
| `SYSTEM_THIRD_PARTY_ERROR`   | 502         | 第三方服务错误 |
| `SYSTEM_RATE_LIMIT_EXCEEDED` | 429         | 请求频率超限   |
| `SYSTEM_MAINTENANCE`         | 503         | 系统维护中     |

#### 错误码使用规范

1. **选择合适的错误码**：根据实际错误类型选择最匹配的错误码
2. **提供清晰的错误信息**：`message` 字段应该是用户友好的描述
3. **使用正确的 HTTP 状态码**：确保 HTTP 状态码与错误类型匹配
4. **验证错误使用 details**：对于表单验证错误，应在 `details` 中提供字段级错误信息
5. **敏感信息保护**：错误信息中不应包含敏感的系统内部信息

### HTTP 状态码规范

项目遵循 RESTful API 标准，使用语义化的 HTTP 状态码：

#### 成功响应 (2xx)

| 状态码 | 说明       | 使用场景                       |
| ------ | ---------- | ------------------------------ |
| 200    | OK         | 请求成功（GET、PUT、PATCH）    |
| 201    | Created    | 资源创建成功（POST）           |
| 204    | No Content | 请求成功但无返回内容（DELETE） |

#### 客户端错误 (4xx)

| 状态码 | 说明                 | 使用场景               |
| ------ | -------------------- | ---------------------- |
| 400    | Bad Request          | 请求参数错误、验证失败 |
| 401    | Unauthorized         | 未授权，需要认证       |
| 403    | Forbidden            | 已认证但无权限         |
| 404    | Not Found            | 资源不存在             |
| 409    | Conflict             | 资源冲突（如重复创建） |
| 422    | Unprocessable Entity | 业务逻辑错误           |
| 429    | Too Many Requests    | 请求频率超限           |

#### 服务器错误 (5xx)

| 状态码 | 说明                  | 使用场景       |
| ------ | --------------------- | -------------- |
| 500    | Internal Server Error | 服务器内部错误 |
| 502    | Bad Gateway           | 第三方服务错误 |
| 503    | Service Unavailable   | 服务暂时不可用 |
| 504    | Gateway Timeout       | 请求超时       |

### 日期时间格式规范

项目统一使用 **ISO 8601** 格式表示日期时间：

- **完整格式**：`2025-10-14T10:30:00Z`（UTC 时间）
- **带时区格式**：`2025-10-14T10:30:00+08:00`（东八区时间）

**规范要求：**

1. 所有 API 响应中的时间字段必须使用 ISO 8601 格式
2. 推荐使用 UTC 时间（以 `Z` 结尾）
3. 如需表示本地时间，必须包含时区信息
4. 使用 Zod 的 `z.iso.datetime()` 进行验证

**示例：**

```typescript
// Zod Schema 定义
const flightSchema = z.object({
  departureTime: z.iso.datetime(),
  arrivalTime: z.iso.datetime(),
  bookingTime: z.iso.datetime(),
});

// API 响应示例
{
  "success": true,
  "data": {
    "departureTime": "2025-10-14T08:00:00Z",
    "arrivalTime": "2025-10-14T10:30:00Z",
    "bookingTime": "2025-10-13T15:20:00Z"
  }
}
```

### 响应工具函数使用

项目提供了 `ApiResponse` 工具类来简化响应构建，详细实现见 `src/lib/utils/api-response.ts`。

**核心特性：**

- 自动生成 `requestId`（无需手动传入）
- 自动添加 `timestamp`
- 统一的响应格式
- 类型安全
- 支持自定义 `requestId`（用于请求链路追踪）

#### 基本使用

```typescript
import { ApiResponse } from "@/lib/utils/api-response";

// 成功响应（自动生成 requestId 和 timestamp）
export async function GET() {
  const data = { id: 1, name: "示例" };
  return ApiResponse.success(data);
  // 响应：
  // {
  //   "success": true,
  //   "data": { "id": 1, "name": "示例" },
  //   "meta": {
  //     "timestamp": "2025-10-14T10:00:00Z",
  //     "requestId": "req_k8pQxJ2mN5vL9wRt"  // 自动生成
  //   }
  // }
}

// 错误响应（同样自动生成 meta）
export async function POST(request: NextRequest) {
  try {
    // 业务逻辑
  } catch (error) {
    return ApiResponse.error(
      "BUSINESS_OPERATION_FAILED",
      "操作失败，请稍后重试"
    );
    // 响应中自动包含 meta.requestId 和 meta.timestamp
  }
}

// 分页响应
export async function GET(request: NextRequest) {
  const items = await fetchItems();
  const pagination = {
    page: 1,
    pageSize: 20,
    totalPages: 5,
    totalItems: 100,
  };
  return ApiResponse.paginated(items, pagination);
  // 响应中自动包含 meta.requestId 和 meta.timestamp
}
```

#### 高级用法

```typescript
// 带自定义 HTTP 状态码
return ApiResponse.success(data, 201); // Created

// 传入自定义 requestId（用于微服务调用链追踪）
const incomingRequestId = request.headers.get("x-request-id");
return ApiResponse.success(data, 200, {
  requestId: incomingRequestId || undefined,
});
// 如果提供了 requestId，使用自定义值；否则自动生成

// 验证错误（带详细信息）
return ApiResponse.validationError([
  { field: "email", message: "邮箱格式不正确" },
  { field: "password", message: "密码长度不足" },
]);

// 资源未找到
return ApiResponse.notFound("BUSINESS_FLIGHT_NOT_FOUND", "航班未找到");

// 未授权
return ApiResponse.unauthorized("AUTH_TOKEN_EXPIRED", "登录已过期");
```

#### requestId 生成与追踪

**自动生成：**

```typescript
// 默认行为：自动生成唯一的 requestId
return ApiResponse.success(data);
// requestId: "req_k8pQxJ2mN5vL9wRt"
```

**微服务链路追踪：**

```typescript
// 从上游服务传递 requestId
export async function POST(request: NextRequest) {
  const upstreamRequestId = request.headers.get("x-request-id");

  // 业务逻辑...

  // 使用上游的 requestId，保持调用链一致
  return ApiResponse.success(data, 200, {
    requestId: upstreamRequestId || undefined,
  });
}
```

**日志记录最佳实践：**

```typescript
import { logger } from "@/utils/logger";

export async function POST(request: NextRequest) {
  // 生成或获取 requestId
  const requestId = request.headers.get("x-request-id") || `req_${nanoid(16)}`;

  // 在日志中记录 requestId
  logger.info("Processing request", { requestId, userId: "123" });

  try {
    // 业务逻辑
    const result = await processData();

    logger.info("Request completed", { requestId, result });

    return ApiResponse.success(result, 200, { requestId });
  } catch (error) {
    logger.error("Request failed", { requestId, error });

    return ApiResponse.error("BUSINESS_OPERATION_FAILED", "操作失败", 500, {
      requestId,
    });
  }
}
```

### 最佳实践总结

1. **始终使用统一的响应格式**：所有 API 返回都应遵循标准格式
2. **使用 ApiResponse 工具类**：自动处理 `requestId` 和 `timestamp`，确保格式一致
3. **选择合适的错误码**：使用语义化的错误码，便于前端处理
4. **提供友好的错误信息**：错误信息应面向用户，避免暴露技术细节
5. **验证响应数据**：使用 Zod Schema 验证响应数据的正确性
6. **添加完整的 JSDoc**：为 OpenAPI 文档生成提供必要的注释
7. **记录 requestId**：在所有相关日志中记录 `requestId`，便于问题追踪和调用链分析
8. **微服务链路追踪**：跨服务调用时传递 `requestId`，保持调用链一致性
9. **合理使用分页**：列表接口应支持分页，避免数据量过大
10. **保护敏感信息**：错误响应中不应包含系统内部信息或敏感数据
11. **统一时间格式**：所有时间字段使用 ISO 8601 格式
12. **requestId 格式规范**：使用 `req_` 前缀 + 16位 nanoid，确保唯一性和可读性
