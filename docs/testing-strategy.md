# Nomad 项目测试策略

## 目录

- [1. 概述](#1-概述)
- [2. 测试架构](#2-测试架构)
- [3. 数据隔离策略](#3-数据隔离策略)
- [4. 测试文件结构](#4-测试文件结构)
- [5. Fishery Factories 设计](#5-fishery-factories-设计)
- [6. Helper 函数设计](#6-helper-函数设计)
- [7. 外部服务 Mock](#7-外部服务-mock)
- [8. 集成测试指南](#8-集成测试指南)
- [9. E2E 测试指南](#9-e2e-测试指南)
- [10. CI/CD 配置](#10-cicd-配置)

---

## 1. 概述

### 1.1 测试目标

- **集成测试**：测试 Queries 和 Services 层的业务逻辑，Mock 外部服务
- **E2E 测试**：模拟用户真实操作流程，验证完整的业务流程

### 1.2 核心原则

- **单数据库策略**：所有测试共享 `nomad_test` 数据库
- **Namespace 隔离**：使用 namespace + sequence 确保并发测试数据不冲突
- **数据保留**：测试结束后保留数据，下次运行前清空重新 seed
- **Mock 外部服务**：验证调用意图，避免实际发送邮件/短信

### 1.3 技术栈

| 工具       | 用途              | 版本   |
| ---------- | ----------------- | ------ |
| Vitest     | 单元测试/集成测试 | 3.2.4  |
| Playwright | E2E 测试          | 1.56.0 |
| Fishery    | 测试数据工厂      | 2.3.1  |
| Faker      | 随机数据生成      | 10.0.0 |

---

## 2. 测试架构

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                      nomad_test 数据库                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  静态数据   │  │  Worker 0  │  │  Worker 1  │  ...       │
│  │            │  │  动态数据   │  │  动态数据   │            │
│  │ • 城市      │  │ namespace- │  │ namespace- │            │
│  │ • 机场      │  │ xxx-1      │  │ yyy-1      │            │
│  │ • 航空公司  │  │ xxx-2      │  │ yyy-2      │            │
│  │ • 航班      │  └────────────┘  └────────────┘            │
│  └────────────┘                                              │
└─────────────────────────────────────────────────────────────┘
         ↑                    ↑                    ↑
    Seed 一次          每个测试动态创建      每个测试动态创建
```

### 2.2 集成测试架构

```typescript
// 测试流程
beforeAll → 清空数据库 → Seed 静态数据
  ↓
beforeEach → 生成 namespace → 创建隔离数据
  ↓
test → 执行业务逻辑 → 断言结果 → 验证 Mock 调用
  ↓
afterEach → 不清理数据（保留到下次运行）
  ↓
afterAll → 关闭数据库连接
```

**配置：**

- Workers: 4
- 环境: jsdom (Node.js)
- Mock: Resend, 阿里云 SMS

### 2.3 E2E 测试架构

```typescript
// 测试流程
Global Setup → 清空数据库 → Seed 静态数据
  ↓
test.use(fixtures) → isolatedUser, mockEmail, etc.
  ↓
test → 浏览器操作 → 断言 UI → 验证数据库状态
  ↓
fixture cleanup → 删除测试用户（可选）
```

**配置：**

- Workers: 4
- 浏览器: Chromium, Firefox, WebKit
- 认证: 直接注入 session（选项 A）

---

## 3. 数据隔离策略

### 3.1 核心问题

并发测试共享数据库时，以下字段有唯一约束，会产生冲突：

| 表                  | 字段                    | 约束类型 |
| ------------------- | ----------------------- | -------- |
| `user`              | `email`                 | UNIQUE   |
| `user`              | `phoneNumber`           | UNIQUE   |
| `orders`            | `orderNumber`           | UNIQUE   |
| `airlines`          | `iataCode`              | UNIQUE   |
| `airports`          | `iataCode`              | UNIQUE   |
| `flightSeatClasses` | `(flightId, classType)` | UNIQUE   |

### 3.2 Namespace 设计

**Vitest（集成测试）：**

```typescript
import crypto from "crypto";
import { expect } from "vitest";

// 基于测试文件路径生成唯一 namespace
function generateNamespace(): string {
  const testPath = expect.getState().testPath || "";
  return crypto
    .createHash("md5")
    .update(testPath + Date.now())
    .digest("hex")
    .slice(0, 8);
}

// 示例：'a1b2c3d4'
```

**Playwright（E2E 测试）：**

```typescript
import { test } from "@playwright/test";

// 使用 worker index + test ID
test("example", async ({ page }, testInfo) => {
  const namespace = `w${testInfo.parallelIndex}_${testInfo.testId}`;
  // 示例：'w0_test-1'
});
```

### 3.3 唯一性保证

**用户邮箱：**

```typescript
email: `${namespace}-${sequence}@test.example.com`;
// 示例：'a1b2c3d4-1@test.example.com'
```

**用户手机号：**

```typescript
phoneNumber: `138${hashToDigits(namespace, 4)}${sequence.toString().padStart(4, "0")}`;
// 示例：'13812340001'

function hashToDigits(str: string, length: number): string {
  const hash = crypto.createHash("md5").update(str).digest("hex");
  return parseInt(hash, 16).toString().slice(0, length);
}
```

**订单号：**

```typescript
const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
orderNumber: `NMD${today}${namespace.slice(0, 4)}${sequence.toString().padStart(2, "0")}`;
// 示例：'NMD20251123a1b201'
```

**航空公司/机场代码：**

```typescript
// 使用 'T' 开头避免与真实数据冲突
airlines.iataCode: `T${sequence}` // T1, T2, T3, ...
airports.iataCode: `TX${String.fromCharCode(65 + sequence)}` // TXA, TXB, TXC, ...
```

### 3.4 静态 vs 动态数据

**静态数据（测试开始前 seed）：**

- 城市（10 个）
- 机场（10 个）
- 航空公司（20 个）
- 航班（约 450 个，每对城市 5 个航班）
- 座位舱位（每个航班 3 个舱位：经济/商务/头等）

**动态数据（每个测试创建）：**

- 用户（使用 namespace 确保唯一）
- 订单（使用 namespace 确保唯一）
- 乘客
- 特殊航班（用于并发竞态测试）

### 3.5 并发竞态测试

当需要测试"只有一个座位但两个人同时下单"时：

```typescript
test("concurrent booking with limited seats", async () => {
  const namespace = generateNamespace();

  // 动态创建只有 1 个座位的航班
  const flight = await createTestFlight({
    namespace,
    seatClass: {
      classType: "ECONOMY",
      totalSeats: 1,
      availableSeats: 1, // 只有 1 个座位
    },
  });

  // 创建两个用户
  const user1 = await createTestUser({ namespace: namespace + "-1" });
  const user2 = await createTestUser({ namespace: namespace + "-2" });

  // 并发下单
  const [result1, result2] = await Promise.all([
    createOrder(user1.id, flight.seatClassId),
    createOrder(user2.id, flight.seatClassId),
  ]);

  // 验证只有一个成功
  const successCount = [result1, result2].filter(r => r.success).length;
  expect(successCount).toBe(1);
});
```

---

## 4. 测试文件结构

```
tests/
├── setup/                              # 全局配置
│   ├── global.ts                       # Vitest 全局配置（已存在）
│   ├── integration-db.ts               # 数据库初始化和清理
│   └── mock-external-services.ts       # Mock Resend、阿里云 SMS
│
├── factories/                          # Fishery 数据工厂
│   ├── index.ts                        # 导出所有 factories
│   ├── user.factory.ts                 # 用户工厂
│   ├── order.factory.ts                # 订单工厂
│   ├── passenger.factory.ts            # 乘客工厂
│   ├── flight.factory.ts               # 航班/航空公司/机场工厂
│   └── utils.ts                        # 工具函数（hashToDigits 等）
│
├── fixtures/                           # 测试固定装置
│   ├── seed-static-data.ts             # 静态数据 seed 脚本
│   └── e2e-fixtures.ts                 # Playwright fixtures
│
├── helpers/                            # 测试辅助函数
│   ├── index.ts                        # 导出所有 helpers
│   ├── auth.helpers.ts                 # 认证相关（登录/登出/创建用户）
│   ├── data.helpers.ts                 # 数据创建（订单/航班/乘客）
│   └── assertions.helpers.ts           # 自定义断言（可选）
│
├── integration/                        # 集成测试
│   ├── queries/                        # Queries 层测试
│   │   ├── orders.integration.test.ts
│   │   ├── passengers.integration.test.ts
│   │   ├── user.integration.test.ts
│   │   └── flights.integration.test.ts
│   │
│   └── services/                       # Services 层测试
│       ├── orders.integration.test.ts
│       ├── passengers.integration.test.ts
│       ├── user.integration.test.ts
│       ├── email.integration.test.ts
│       └── flight-search.integration.test.ts
│
└── e2e/                                # E2E 测试（已存在）
    ├── auth-flow.spec.ts               # 认证流程
    ├── booking-flow.spec.ts            # 预订流程
    ├── order-management.spec.ts        # 订单管理
    ├── landingpage.spec.ts             # 落地页（已存在）
    └── legalpages.spec.ts              # 法律页面（已存在）
```

---

## 5. Fishery Factories 设计

### 5.1 用户工厂

```typescript
// tests/factories/user.factory.ts
import { defineFactory } from "fishery";
import { faker } from "@faker-js/faker";
import { user } from "@/db/schema";
import { hashToDigits } from "./utils";

export const userFactory = defineFactory<typeof user.$inferInsert>(
  ({ sequence, transientParams }) => {
    const namespace = transientParams.namespace || "default";

    return {
      id: `user-${namespace}-${sequence}`,
      name: faker.person.fullName(),
      email: `${namespace}-${sequence}@test.example.com`,
      emailVerified: false,
      phoneNumber: `138${hashToDigits(namespace, 4)}${sequence.toString().padStart(4, "0")}`,
      balance: "10000.00",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
);

// 使用示例
const testUser = userFactory.build({
  transientParams: { namespace: "abc12345" },
});
```

### 5.2 订单工厂

```typescript
// tests/factories/order.factory.ts
import { defineFactory } from "fishery";
import { orders } from "@/db/schema";

export const orderFactory = defineFactory<typeof orders.$inferInsert>(
  ({ sequence, transientParams, associations }) => {
    const namespace = transientParams.namespace || "default";
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    return {
      id: `order-${namespace}-${sequence}`,
      orderNumber: `NMD${today}${namespace.slice(0, 4)}${sequence.toString().padStart(2, "0")}`,
      userId: associations.user?.id || `user-${namespace}-${sequence}`,
      outboundFlightSeatClassId:
        associations.outboundSeatClass?.id || `seat-${namespace}-${sequence}`,
      inboundFlightSeatClassId: associations.inboundSeatClass?.id || null,
      tripType: "ONE_WAY",
      status: "PENDING_PAYMENT",
      passengerCount: 1,
      pricePerTicket: "1000.00",
      baseAmount: "1000.00",
      ancillaryAmount: "0.00",
      totalAmount: "1000.00",
      contactEmail: `${namespace}-${sequence}@test.example.com`,
      contactPhone: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
);
```

### 5.3 航班工厂

```typescript
// tests/factories/flight.factory.ts
import { defineFactory } from "fishery";
import { faker } from "@faker-js/faker";
import { flights, flightSeatClasses, airlines, airports } from "@/db/schema";
import { hashToDigits } from "./utils";

// 航空公司工厂
export const airlineFactory = defineFactory<typeof airlines.$inferInsert>(
  ({ sequence }) => ({
    id: `airline-test-${sequence}`,
    iataCode: `T${sequence}`, // T1, T2, T3, ...
    name: `Test Airline ${sequence}`,
    logoUrl: faker.image.url(),
  })
);

// 机场工厂
export const airportFactory = defineFactory<typeof airports.$inferInsert>(
  ({ sequence, associations }) => ({
    id: `airport-test-${sequence}`,
    iataCode: `TX${String.fromCharCode(65 + (sequence % 26))}`, // TXA, TXB, ..., TXZ
    name: `Test Airport ${sequence}`,
    cityId: associations.city?.id || `city-test-${Math.floor(sequence / 2)}`,
  })
);

// 航班工厂
export const flightFactory = defineFactory<typeof flights.$inferInsert>(
  ({ sequence, transientParams, associations }) => {
    const namespace = transientParams.namespace || "default";
    const airline = associations.airline || { iataCode: "CA" };

    return {
      id: `flight-${namespace}-${sequence}`,
      flightNumber: `${airline.iataCode}${hashToDigits(namespace, 2)}${sequence.toString().padStart(3, "0")}`,
      airlineId: associations.airline?.id || "airline-test-1",
      departureAirportId: associations.departureAirport?.id || "airport-test-1",
      arrivalAirportId: associations.arrivalAirport?.id || "airport-test-2",
      departureDatetime: faker.date.future(),
      arrivalDatetime: faker.date.future({ years: 1 }),
    };
  }
);

// 座位舱位工厂
export const flightSeatClassFactory = defineFactory<
  typeof flightSeatClasses.$inferInsert
>(({ sequence, transientParams, associations }) => {
  const namespace = transientParams.namespace || "default";

  return {
    id: `seat-${namespace}-${sequence}`,
    flightId: associations.flight?.id || `flight-${namespace}-${sequence}`,
    classType: transientParams.classType || "ECONOMY",
    price: "1000.00",
    totalSeats: transientParams.totalSeats || 180,
    availableSeats: transientParams.availableSeats || 180,
  };
});
```

### 5.4 工具函数

```typescript
// tests/factories/utils.ts
import crypto from "crypto";

/**
 * 将字符串哈希为固定位数的数字
 * @param str 输入字符串
 * @param length 输出位数
 * @returns 数字字符串
 */
export function hashToDigits(str: string, length: number): string {
  const hash = crypto.createHash("md5").update(str).digest("hex");
  return parseInt(hash, 16).toString().slice(0, length);
}

/**
 * 生成唯一 namespace
 * @param prefix 前缀（可选）
 * @returns namespace 字符串
 */
export function generateNamespace(prefix: string = "test"): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}
```

### 5.5 导出

```typescript
// tests/factories/index.ts
export { userFactory } from "./user.factory";
export { orderFactory } from "./order.factory";
export { passengerFactory } from "./passenger.factory";
export {
  airlineFactory,
  airportFactory,
  flightFactory,
  flightSeatClassFactory,
} from "./flight.factory";
export { hashToDigits, generateNamespace } from "./utils";
```

---

## 6. Helper 函数设计

### 6.1 认证 Helpers

```typescript
// tests/helpers/auth.helpers.ts
import { db } from "@/db";
import { user, session } from "@/db/schema";
import { userFactory } from "../factories";
import type { Page } from "@playwright/test";

/**
 * 创建测试用户（集成测试）
 */
export async function createTestUser(options: {
  namespace: string;
  balance?: string;
  emailVerified?: boolean;
}) {
  const testUser = userFactory.build({
    transientParams: { namespace: options.namespace },
    balance: options.balance || "10000.00",
    emailVerified: options.emailVerified ?? true,
  });

  const [created] = await db.insert(user).values(testUser).returning();
  return created;
}

/**
 * 创建测试用户并登录（E2E 测试）
 * 直接注入 session，绕过登录流程
 */
export async function loginAsTestUser(
  page: Page,
  options: {
    namespace: string;
    email?: string;
  }
) {
  // 1. 创建用户
  const testUser = await createTestUser({
    namespace: options.namespace,
    emailVerified: true,
  });

  // 2. 创建 session
  const sessionToken = crypto.randomUUID();
  await db.insert(session).values({
    id: `session-${options.namespace}`,
    userId: testUser.id,
    token: sessionToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天
  });

  // 3. 注入 cookie
  await page.context().addCookies([
    {
      name: "better-auth.session_token",
      value: sessionToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);

  return testUser;
}

/**
 * 登出（E2E 测试）
 */
export async function logout(page: Page) {
  await page.context().clearCookies();
}

/**
 * 切换用户（E2E 测试）
 */
export async function switchUser(page: Page, namespace: string) {
  await logout(page);
  return await loginAsTestUser(page, { namespace });
}
```

### 6.2 数据创建 Helpers

```typescript
// tests/helpers/data.helpers.ts
import { db } from "@/db";
import { orders, flights, flightSeatClasses, passengers } from "@/db/schema";
import {
  orderFactory,
  flightFactory,
  flightSeatClassFactory,
  passengerFactory,
} from "../factories";

/**
 * 创建测试航班（支持自定义座位数）
 */
export async function createTestFlight(options: {
  namespace: string;
  departureAirportId?: string;
  arrivalAirportId?: string;
  seatClass?: {
    classType: "ECONOMY" | "BUSINESS" | "FIRST";
    totalSeats: number;
    availableSeats: number;
    price?: string;
  };
}) {
  // 1. 创建航班
  const flight = flightFactory.build({
    transientParams: { namespace: options.namespace },
    associations: {
      departureAirport: options.departureAirportId
        ? { id: options.departureAirportId }
        : undefined,
      arrivalAirport: options.arrivalAirportId
        ? { id: options.arrivalAirportId }
        : undefined,
    },
  });

  const [createdFlight] = await db.insert(flights).values(flight).returning();

  // 2. 创建座位舱位
  const seatClass = flightSeatClassFactory.build({
    transientParams: {
      namespace: options.namespace,
      classType: options.seatClass?.classType || "ECONOMY",
      totalSeats: options.seatClass?.totalSeats || 180,
      availableSeats: options.seatClass?.availableSeats || 180,
    },
    associations: { flight: createdFlight },
    price: options.seatClass?.price || "1000.00",
  });

  const [createdSeatClass] = await db
    .insert(flightSeatClasses)
    .values(seatClass)
    .returning();

  return {
    flight: createdFlight,
    seatClass: createdSeatClass,
  };
}

/**
 * 创建测试订单
 */
export async function createTestOrder(options: {
  namespace: string;
  userId: string;
  flightSeatClassId: string;
  status?: "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED" | "REFUNDED";
  passengerCount?: number;
}) {
  const order = orderFactory.build({
    transientParams: { namespace: options.namespace },
    associations: {
      user: { id: options.userId },
      outboundSeatClass: { id: options.flightSeatClassId },
    },
    status: options.status || "PENDING_PAYMENT",
    passengerCount: options.passengerCount || 1,
  });

  const [created] = await db.insert(orders).values(order).returning();
  return created;
}

/**
 * 创建测试乘客
 */
export async function createTestPassenger(options: {
  userId: string;
  name?: string;
  documentNumber?: string;
}) {
  const passenger = passengerFactory.build({
    associations: { user: { id: options.userId } },
    name: options.name,
    documentNumber: options.documentNumber,
  });

  const [created] = await db.insert(passengers).values(passenger).returning();
  return created;
}

/**
 * 生成唯一 namespace（基于测试路径）
 */
export function generateTestNamespace(): string {
  const { testPath } = expect.getState();
  return crypto
    .createHash("md5")
    .update(testPath + Date.now())
    .digest("hex")
    .slice(0, 8);
}
```

### 6.3 断言 Helpers（可选）

```typescript
// tests/helpers/assertions.helpers.ts
import { expect } from "vitest";

/**
 * 断言用户余额变化
 */
export async function assertBalanceChanged(
  userId: string,
  expectedChange: string
) {
  const user = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });

  // 自定义断言逻辑
  expect(user?.balance).toBe(expectedChange);
}

/**
 * 断言座位数变化
 */
export async function assertSeatsChanged(
  seatClassId: string,
  expectedChange: number
) {
  const seatClass = await db.query.flightSeatClasses.findFirst({
    where: eq(flightSeatClasses.id, seatClassId),
  });

  // 自定义断言逻辑
  expect(seatClass?.availableSeats).toBe(expectedChange);
}
```

### 6.4 导出

```typescript
// tests/helpers/index.ts
export * from "./auth.helpers";
export * from "./data.helpers";
export * from "./assertions.helpers";
```

---

## 7. 外部服务 Mock

### 7.1 Vitest Mock 配置

```typescript
// tests/setup/mock-external-services.ts
import { vi, beforeEach } from "vitest";

// ========================================
// Mock Resend 邮件服务
// ========================================
export const mockSendEmail = vi.fn().mockResolvedValue({
  id: "mock-email-id",
  from: "test@example.com",
  to: "user@example.com",
});

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: mockSendEmail,
    },
  })),
}));

// ========================================
// Mock 阿里云 SMS 服务
// ========================================
export const mockSendSms = vi.fn().mockResolvedValue({
  body: {
    code: "OK",
    message: "Success",
  },
});

vi.mock("@alicloud/dypnsapi20170525", () => ({
  default: vi.fn().mockImplementation(() => ({
    sendSmsVerifyCodeWithOptions: mockSendSms,
  })),
  SendSmsVerifyCodeRequest: vi.fn().mockImplementation(params => params),
}));

vi.mock("@alicloud/credentials", () => ({
  default: vi.fn().mockImplementation(() => ({})),
}));

// ========================================
// 清理 Mock
// ========================================
beforeEach(() => {
  vi.clearAllMocks();
});
```

### 7.2 验证 Mock 调用

```typescript
// 在集成测试中使用
import {
  mockSendEmail,
  mockSendSms,
} from "@/tests/setup/mock-external-services";

test("should send email when order is created", async () => {
  // ... 创建订单逻辑

  // 验证邮件发送
  expect(mockSendEmail).toHaveBeenCalledTimes(1);
  expect(mockSendEmail).toHaveBeenCalledWith({
    from: expect.any(String),
    to: testUser.email,
    subject: expect.stringContaining("订单确认"),
    react: expect.anything(),
  });
});

test("should send SMS when OTP is requested", async () => {
  // ... 请求 OTP 逻辑

  // 验证短信发送
  expect(mockSendSms).toHaveBeenCalledTimes(1);
  expect(mockSendSms).toHaveBeenCalledWith(
    expect.objectContaining({
      phoneNumber: testUser.phoneNumber,
      templateParam: expect.stringContaining('"code"'),
    }),
    {}
  );
});
```

### 7.3 Playwright Mock（E2E）

对于 E2E 测试，外部服务已经通过环境变量禁用：

- `ENABLE_ALIYUN_SMS=false`
- Turnstile 自动使用测试密钥

验证外部服务调用意图的方式：

1. **邮件**：检查 `verification` 表是否有 OTP 记录
2. **短信**：检查 `verification` 表是否有 OTP 记录

```typescript
// tests/fixtures/e2e-fixtures.ts
import { test as base } from "@playwright/test";
import { db } from "@/db";
import { verification } from "@/db/schema";
import { eq } from "drizzle-orm";

type Fixtures = {
  verifyEmailSent: (email: string) => Promise<void>;
  verifySmsSent: (phoneNumber: string) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  verifyEmailSent: async ({}, use) => {
    await use(async (email: string) => {
      const record = await db.query.verification.findFirst({
        where: eq(verification.identifier, email),
      });
      expect(record).toBeDefined();
      expect(record?.value).toHaveLength(6); // OTP 长度
    });
  },

  verifySmsSent: async ({}, use) => {
    await use(async (phoneNumber: string) => {
      const record = await db.query.verification.findFirst({
        where: eq(verification.identifier, phoneNumber),
      });
      expect(record).toBeDefined();
      expect(record?.value).toHaveLength(6);
    });
  },
});
```

---

## 8. 集成测试指南

### 8.1 数据库初始化

```typescript
// tests/setup/integration-db.ts
import { beforeAll, afterAll } from "vitest";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { seedStaticData } from "../fixtures/seed-static-data";

beforeAll(async () => {
  console.log("🔧 初始化测试数据库...");

  // 1. 清空所有表
  await db.execute(sql`
    TRUNCATE TABLE
      order_passengers,
      payments,
      orders,
      passengers,
      flight_search_history,
      flight_seat_classes,
      flights,
      airports,
      airlines,
      cities,
      session,
      account,
      verification,
      rate_limit,
      "user"
    CASCADE
  `);

  // 2. Seed 静态数据
  await seedStaticData();

  console.log("✅ 测试数据库初始化完成");
});

afterAll(async () => {
  // 关闭数据库连接
  await db.$client.end();
});
```

### 8.2 静态数据 Seed

```typescript
// tests/fixtures/seed-static-data.ts
import { db } from "@/db";
import {
  cities,
  airlines,
  airports,
  flights,
  flightSeatClasses,
} from "@/db/schema";
import {
  airlineFactory,
  airportFactory,
  flightFactory,
  flightSeatClassFactory,
} from "../factories";

export async function seedStaticData() {
  // 1. Seed 城市（使用真实数据）
  const cityData = [
    { id: "city-beijing", name: "北京", countryCode: "CN" },
    { id: "city-shanghai", name: "上海", countryCode: "CN" },
    { id: "city-guangzhou", name: "广州", countryCode: "CN" },
    { id: "city-shenzhen", name: "深圳", countryCode: "CN" },
    { id: "city-chengdu", name: "成都", countryCode: "CN" },
    { id: "city-hangzhou", name: "杭州", countryCode: "CN" },
    { id: "city-xian", name: "西安", countryCode: "CN" },
    { id: "city-chongqing", name: "重庆", countryCode: "CN" },
    { id: "city-wuhan", name: "武汉", countryCode: "CN" },
    { id: "city-nanjing", name: "南京", countryCode: "CN" },
  ];

  await db.insert(cities).values(cityData);
  console.log(`✅ Seed ${cityData.length} 个城市`);

  // 2. Seed 航空公司
  const airlineData = airlineFactory.buildList(20);
  await db.insert(airlines).values(airlineData);
  console.log(`✅ Seed ${airlineData.length} 个航空公司`);

  // 3. Seed 机场
  const airportData = [
    {
      id: "airport-pek",
      iataCode: "PEK",
      name: "北京首都国际机场",
      cityId: "city-beijing",
    },
    {
      id: "airport-pvg",
      iataCode: "PVG",
      name: "上海浦东国际机场",
      cityId: "city-shanghai",
    },
    {
      id: "airport-can",
      iataCode: "CAN",
      name: "广州白云国际机场",
      cityId: "city-guangzhou",
    },
    {
      id: "airport-szx",
      iataCode: "SZX",
      name: "深圳宝安国际机场",
      cityId: "city-shenzhen",
    },
    {
      id: "airport-ctu",
      iataCode: "CTU",
      name: "成都双流国际机场",
      cityId: "city-chengdu",
    },
    {
      id: "airport-hgh",
      iataCode: "HGH",
      name: "杭州萧山国际机场",
      cityId: "city-hangzhou",
    },
    {
      id: "airport-xiy",
      iataCode: "XIY",
      name: "西安咸阳国际机场",
      cityId: "city-xian",
    },
    {
      id: "airport-ckg",
      iataCode: "CKG",
      name: "重庆江北国际机场",
      cityId: "city-chongqing",
    },
    {
      id: "airport-wuh",
      iataCode: "WUH",
      name: "武汉天河国际机场",
      cityId: "city-wuhan",
    },
    {
      id: "airport-nkg",
      iataCode: "NKG",
      name: "南京禄口国际机场",
      cityId: "city-nanjing",
    },
  ];

  await db.insert(airports).values(airportData);
  console.log(`✅ Seed ${airportData.length} 个机场`);

  // 4. Seed 航班（每对机场 5 个航班）
  const flightData: any[] = [];
  const seatClassData: any[] = [];

  for (let i = 0; i < airportData.length; i++) {
    for (let j = 0; j < airportData.length; j++) {
      if (i === j) continue; // 跳过相同机场

      // 每对机场生成 5 个航班
      for (let k = 0; k < 5; k++) {
        const airline =
          airlineData[Math.floor(Math.random() * airlineData.length)];
        const flight = flightFactory.build({
          transientParams: { namespace: `static-${i}-${j}-${k}` },
          associations: {
            airline,
            departureAirport: airportData[i],
            arrivalAirport: airportData[j],
          },
        });

        flightData.push(flight);

        // 每个航班 3 个舱位
        seatClassData.push(
          flightSeatClassFactory.build({
            transientParams: {
              namespace: `static-${i}-${j}-${k}`,
              classType: "ECONOMY",
              totalSeats: 180,
              availableSeats: 180,
            },
            associations: { flight },
            price: "800.00",
          }),
          flightSeatClassFactory.build({
            transientParams: {
              namespace: `static-${i}-${j}-${k}`,
              classType: "BUSINESS",
              totalSeats: 40,
              availableSeats: 40,
            },
            associations: { flight },
            price: "2000.00",
          }),
          flightSeatClassFactory.build({
            transientParams: {
              namespace: `static-${i}-${j}-${k}`,
              classType: "FIRST",
              totalSeats: 12,
              availableSeats: 12,
            },
            associations: { flight },
            price: "5000.00",
          })
        );
      }
    }
  }

  await db.insert(flights).values(flightData);
  await db.insert(flightSeatClasses).values(seatClassData);

  console.log(
    `✅ Seed ${flightData.length} 个航班，${seatClassData.length} 个座位舱位`
  );

  // 总计：10 城市，20 航空公司，10 机场，450 航班，1350 座位舱位
}
```

**数据量说明：**

- 10 机场 × 9 目的地 × 5 航班 = **450 航班**
- 450 航班 × 3 舱位 = **1,350 座位配置**
- Seed 时间约 **5-10 秒**（可接受）

### 8.3 测试示例：Services 层

```typescript
// tests/integration/services/orders.integration.test.ts
import { describe, test, expect, beforeEach } from "vitest";
import { cancelOrder } from "@/domains/booking";
import {
  createTestUser,
  createTestFlight,
  createTestOrder,
  generateTestNamespace,
} from "@/tests/helpers";
import { mockSendEmail } from "@/tests/setup/mock-external-services";

describe("Order Service - cancelOrder", () => {
  let namespace: string;

  beforeEach(() => {
    namespace = generateTestNamespace();
  });

  test("应该取消订单并退款", async () => {
    // 1. 准备数据
    const user = await createTestUser({
      namespace,
      balance: "5000.00",
    });

    const { seatClass } = await createTestFlight({
      namespace,
      seatClass: {
        classType: "ECONOMY",
        totalSeats: 100,
        availableSeats: 50,
      },
    });

    const order = await createTestOrder({
      namespace,
      userId: user.id,
      flightSeatClassId: seatClass.id,
      status: "CONFIRMED",
      passengerCount: 2,
    });

    // 2. 执行服务
    const result = await cancelOrder(order.id, user.id);

    // 3. 验证结果
    expect(result.success).toBe(true);
    expect(result.data?.status).toBe("CANCELLED");

    // 4. 验证余额退款
    const updatedUser = await db.query.user.findFirst({
      where: eq(user.id, user.id),
    });
    expect(updatedUser?.balance).toBe("7000.00"); // 5000 + 2000

    // 5. 验证座位释放
    const updatedSeatClass = await db.query.flightSeatClasses.findFirst({
      where: eq(flightSeatClasses.id, seatClass.id),
    });
    expect(updatedSeatClass?.availableSeats).toBe(52); // 50 + 2

    // 6. 验证邮件发送
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: user.email,
        subject: expect.stringContaining("取消"),
      })
    );
  });

  test("应该处理并发取消订单（竞态测试）", async () => {
    // 创建两个用户
    const user1 = await createTestUser({ namespace: namespace + "-1" });
    const user2 = await createTestUser({ namespace: namespace + "-2" });

    // 创建只有 2 个座位的航班
    const { seatClass } = await createTestFlight({
      namespace,
      seatClass: {
        classType: "ECONOMY",
        totalSeats: 2,
        availableSeats: 0, // 已售罄
      },
    });

    // 创建两个已确认订单
    const order1 = await createTestOrder({
      namespace: namespace + "-1",
      userId: user1.id,
      flightSeatClassId: seatClass.id,
      status: "CONFIRMED",
      passengerCount: 1,
    });

    const order2 = await createTestOrder({
      namespace: namespace + "-2",
      userId: user2.id,
      flightSeatClassId: seatClass.id,
      status: "CONFIRMED",
      passengerCount: 1,
    });

    // 并发取消
    const [result1, result2] = await Promise.all([
      cancelOrder(order1.id, user1.id),
      cancelOrder(order2.id, user2.id),
    ]);

    // 验证都成功
    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);

    // 验证座位数正确（原子操作）
    const finalSeatClass = await db.query.flightSeatClasses.findFirst({
      where: eq(flightSeatClasses.id, seatClass.id),
    });
    expect(finalSeatClass?.availableSeats).toBe(2); // 0 + 1 + 1
  });
});
```

### 8.4 测试示例：Queries 层

```typescript
// tests/integration/queries/passengers.integration.test.ts
import { describe, test, expect, beforeEach } from "vitest";
import { getPassengersByUserId } from "@/lib/queries/passengers";
import {
  createTestUser,
  createTestPassenger,
  generateTestNamespace,
} from "@/tests/helpers";

describe("Passenger Queries", () => {
  let namespace: string;

  beforeEach(() => {
    namespace = generateTestNamespace();
  });

  test("应该只返回未删除的乘客", async () => {
    const user = await createTestUser({ namespace });

    // 创建 3 个乘客，其中 1 个已删除
    await createTestPassenger({
      userId: user.id,
      name: "张三",
    });
    await createTestPassenger({
      userId: user.id,
      name: "李四",
    });
    await createTestPassenger({
      userId: user.id,
      name: "王五",
      isDeleted: true, // 软删除
    });

    // 查询
    const result = await getPassengersByUserId(user.id);

    // 验证
    expect(result).toHaveLength(2);
    expect(result.every(p => !p.isDeleted)).toBe(true);
    expect(result.map(p => p.name)).toEqual(
      expect.arrayContaining(["张三", "李四"])
    );
  });
});
```

---

## 9. E2E 测试指南

### 9.1 Playwright Fixtures

```typescript
// tests/fixtures/e2e-fixtures.ts
import { test as base } from "@playwright/test";
import { loginAsTestUser, logout } from "../helpers";

type Fixtures = {
  isolatedUser: Awaited<ReturnType<typeof loginAsTestUser>>;
  verifyEmailSent: (email: string) => Promise<void>;
  verifySmsSent: (phoneNumber: string) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  // 自动登录的测试用户
  isolatedUser: async ({ page }, use, testInfo) => {
    const namespace = `w${testInfo.parallelIndex}_${testInfo.testId}`;

    const user = await loginAsTestUser(page, { namespace });

    await use(user);

    // Cleanup: 登出
    await logout(page);
  },

  // 验证邮件发送意图
  verifyEmailSent: async ({}, use) => {
    await use(async (email: string) => {
      const record = await db.query.verification.findFirst({
        where: eq(verification.identifier, email),
      });
      expect(record).toBeDefined();
      expect(record?.value).toHaveLength(6);
    });
  },

  // 验证短信发送意图
  verifySmsSent: async ({}, use) => {
    await use(async (phoneNumber: string) => {
      const record = await db.query.verification.findFirst({
        where: eq(verification.identifier, phoneNumber),
      });
      expect(record).toBeDefined();
      expect(record?.value).toHaveLength(6);
    });
  },
});
```

### 9.2 测试示例：认证流程

```typescript
// tests/e2e/auth-flow.spec.ts
import { test, expect } from "../fixtures/e2e-fixtures";

test.describe("认证流程", () => {
  test("用户可以注册、登录、登出", async ({ page }) => {
    // 1. 访问注册页
    await page.goto("/signup");

    const email = `test-${Date.now()}@example.com`;
    const password = "Test123456!";

    // 2. 填写注册表单
    await page.fill('[name="email"]', email);
    await page.fill('[name="password"]', password);
    await page.fill('[name="name"]', "测试用户");
    await page.click('button[type="submit"]');

    // 3. 验证跳转到主页
    await expect(page).toHaveURL("/flights");
    await expect(page.locator("text=欢迎")).toBeVisible();

    // 4. 登出
    await page.click('[data-testid="user-menu"]');
    await page.click("text=登出");

    // 5. 验证跳转到登录页
    await expect(page).toHaveURL("/signin");

    // 6. 重新登录
    await page.fill('[name="email"]', email);
    await page.fill('[name="password"]', password);
    await page.click('button[type="submit"]');

    // 7. 验证登录成功
    await expect(page).toHaveURL("/flights");
  });
});
```

### 9.3 测试示例：订单流程

```typescript
// tests/e2e/booking-flow.spec.ts
import { test, expect } from "../fixtures/e2e-fixtures";

test.describe("订单流程", () => {
  test("用户可以搜索、预订、取消航班", async ({
    page,
    isolatedUser,
    verifyEmailSent,
  }) => {
    // isolatedUser fixture 已自动登录

    // 1. 搜索航班
    await page.goto("/flights");
    await page.fill('[name="from"]', "上海");
    await page.fill('[name="to"]', "北京");
    await page.click('button:has-text("搜索")');

    await expect(page.locator(".flight-result")).toBeVisible();

    // 2. 选择航班
    await page.locator(".flight-result").first().click();
    await page.click('button:has-text("预订")');

    // 3. 填写乘客信息
    await page.fill('[name="passengerName"]', "张三");
    await page.fill('[name="documentNumber"]', "110101199001011234");
    await page.click('button:has-text("下一步")');

    // 4. 确认订单
    await page.click('button:has-text("确认订单")');

    // 5. 验证订单创建成功
    await expect(page.locator("text=订单已创建")).toBeVisible();
    const orderNumber = await page
      .locator('[data-testid="order-number"]')
      .textContent();
    expect(orderNumber).toMatch(/^NMD\d{8}/);

    // 6. 验证邮件发送意图
    await verifyEmailSent(isolatedUser.email);

    // 7. 取消订单
    await page.goto("/user/orders");
    await page.locator(`text=${orderNumber}`).click();
    await page.click('button:has-text("取消订单")');
    await page.click('button:has-text("确认取消")');

    // 8. 验证取消成功
    await expect(page.locator("text=已取消")).toBeVisible();
  });

  test("未登录用户无法访问订单页面", async ({ page }) => {
    // 不使用 isolatedUser fixture，保持未登录状态

    await page.goto("/user/orders");

    // 验证重定向到登录页
    await expect(page).toHaveURL("/signin");
  });
});
```

### 9.4 切换用户示例

```typescript
// tests/e2e/multi-user.spec.ts
import { test, expect } from "@playwright/test";
import { loginAsTestUser, switchUser } from "../helpers";

test("多用户场景：转账", async ({ page }) => {
  // 1. 用户 A 登录
  const userA = await loginAsTestUser(page, { namespace: "user-a" });
  await page.goto("/user/wallet");

  // 2. 查看余额
  await expect(page.locator('[data-testid="balance"]')).toHaveText("10000.00");

  // 3. 切换到用户 B
  const userB = await switchUser(page, "user-b");
  await page.goto("/user/wallet");

  // 4. 验证用户 B 的余额
  await expect(page.locator('[data-testid="balance"]')).toHaveText("10000.00");
});
```

---

## 10. CI/CD 配置

### 10.1 Vitest 配置更新

```typescript
// vitest.config.mts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [
      "./tests/setup/global.ts",
      "./tests/setup/mock-external-services.ts", // Mock 外部服务
      "./tests/setup/integration-db.ts", // 数据库初始化
    ],
    poolOptions: {
      threads: {
        maxThreads: 4, // 限制并发 workers
        minThreads: 1,
      },
    },
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "tests/integration/**/*.integration.test.ts", // 集成测试
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/e2e/**", // 排除 E2E 测试
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "**/node_modules/**",
        "**/tests/**",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.spec.ts",
        "**/dist/**",
        "**/.next/**",
      ],
    },
  },
});
```

### 10.2 Playwright 配置更新

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true, // 改为 true，启用完全并行
  workers: 4,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !env.CI,
    env: {
      NODE_ENV: "test",
      DATABASE_URL:
        env.DATABASE_URL || "postgresql://localhost:5432/nomad_test",
      ENABLE_ALIYUN_SMS: "false",
      TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA", // 测试密钥
    },
  },
  // Global setup (清空数据库 + seed 静态数据)
  globalSetup: "./tests/fixtures/e2e-global-setup.ts",
});
```

### 10.3 E2E Global Setup

```typescript
// tests/fixtures/e2e-global-setup.ts
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { seedStaticData } from "./seed-static-data";

export default async function globalSetup() {
  console.log("🔧 E2E Global Setup: 清空数据库并 seed 静态数据");

  // 清空所有表
  await db.execute(sql`
    TRUNCATE TABLE
      order_passengers,
      payments,
      orders,
      passengers,
      flight_search_history,
      flight_seat_classes,
      flights,
      airports,
      airlines,
      cities,
      session,
      account,
      verification,
      rate_limit,
      "user"
    CASCADE
  `);

  // Seed 静态数据
  await seedStaticData();

  console.log("✅ E2E Global Setup 完成");
}
```

### 10.4 GitHub Actions 更新

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  vitest-tests:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: nomad_test
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 10.17.1

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile

      - name: Run Vitest tests
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/nomad_test
          NODE_ENV: test
        run: pnpm test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info

  playwright-tests:
    runs-on: ubuntu-latest
    timeout-minutes: 60

    strategy:
      matrix:
        shard: [1, 2, 3, 4]

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: nomad_test
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 10.17.1

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps

      - name: Push database schema
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/nomad_test
          NODE_ENV: test
        run: pnpm db:push:test

      - name: Run Playwright tests
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/nomad_test
          NODE_ENV: test
        run: pnpm e2e --shard=${{ matrix.shard }}/4

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report-${{ matrix.shard }}
          path: playwright-report/
          retention-days: 7
```

### 10.5 NPM Scripts 更新

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest --run",
    "test:unit": "vitest --run --project=unit",
    "test:integration": "cross-env NODE_ENV=test vitest --run tests/integration",
    "test:integration:watch": "cross-env NODE_ENV=test vitest tests/integration",
    "test:coverage": "vitest --run --coverage",
    "test:ui": "vitest --ui",

    "e2e": "cross-env NODE_ENV=test playwright test",
    "e2e:ui": "cross-env NODE_ENV=test playwright test --ui",
    "e2e:headed": "cross-env NODE_ENV=test playwright test --headed",
    "e2e:report": "playwright show-report",
    "e2e:debug": "cross-env NODE_ENV=test playwright test --debug",

    "db:push:test": "cross-env NODE_ENV=test drizzle-kit push",
    "db:studio:test": "cross-env NODE_ENV=test drizzle-kit studio"
  }
}
```

---

## 11. 快速开始

### 11.1 本地开发

```bash
# 1. 创建测试数据库
createdb nomad_test

# 2. 推送 schema
pnpm db:push:test

# 3. 运行集成测试（会自动 seed 数据）
pnpm test:integration

# 4. 运行 E2E 测试
pnpm e2e

# 5. 查看测试覆盖率
pnpm test:coverage

# 6. 调试单个测试
pnpm test:integration:watch  # 集成测试 watch 模式
pnpm e2e:ui                  # E2E 测试 UI 模式
```

### 11.2 编写新测试

**集成测试：**

```typescript
// tests/integration/services/my-service.integration.test.ts
import { describe, test, expect, beforeEach } from "vitest";
import { generateTestNamespace, createTestUser } from "@/tests/helpers";

describe("My Service", () => {
  let namespace: string;

  beforeEach(() => {
    namespace = generateTestNamespace();
  });

  test("should do something", async () => {
    const user = await createTestUser({ namespace });

    // ... 测试逻辑

    expect(result).toBe(expected);
  });
});
```

**E2E 测试：**

```typescript
// tests/e2e/my-flow.spec.ts
import { test, expect } from "../fixtures/e2e-fixtures";

test("user can do something", async ({ page, isolatedUser }) => {
  // isolatedUser 已登录

  await page.goto("/some-page");

  // ... UI 操作

  await expect(page.locator("text=Success")).toBeVisible();
});
```

---

## 12. 常见问题

### Q1: 测试数据如何清理？

**A:** 测试结束后不清理数据，下次运行时会自动清空并重新 seed。如果需要手动清理：

```bash
# 删除测试数据库
dropdb nomad_test

# 重新创建
createdb nomad_test
pnpm db:push:test
```

### Q2: 如何调试集成测试？

**A:** 使用 Vitest UI：

```bash
pnpm test:ui
```

或使用 VS Code 调试：在测试文件中设置断点，按 F5 运行。

### Q3: E2E 测试失败如何排查？

**A:** 使用 Playwright UI 模式：

```bash
pnpm e2e:ui
```

或查看失败截图和 trace：

```bash
pnpm e2e:report
```

### Q4: 并发测试出现数据冲突怎么办？

**A:** 检查是否正确使用 namespace：

- 集成测试：`generateTestNamespace()`
- E2E 测试：`testInfo.parallelIndex + testInfo.testId`

确保所有唯一字段都包含 namespace。

### Q5: 如何测试只有 1 个座位的并发场景？

**A:** 使用 `createTestFlight` helper：

```typescript
const { seatClass } = await createTestFlight({
  namespace,
  seatClass: {
    classType: "ECONOMY",
    totalSeats: 1,
    availableSeats: 1,
  },
});
```

---

## 13. 贡献指南

### 13.1 添加新的 Factory

1. 在 `tests/factories/` 创建新文件
2. 使用 Fishery `defineFactory`
3. 确保支持 `namespace` 参数
4. 在 `tests/factories/index.ts` 中导出

### 13.2 添加新的 Helper

1. 在 `tests/helpers/` 创建新文件
2. 函数命名：`createTestXxx`, `verifyXxx`, `assertXxx`
3. 在 `tests/helpers/index.ts` 中导出

### 13.3 测试命名规范

- 集成测试文件：`*.integration.test.ts`
- E2E 测试文件：`*.spec.ts`
- Factory 文件：`*.factory.ts`
- Helper 文件：`*.helpers.ts`

---

## 14. 总结

本测试策略实现了：

✅ **单数据库隔离**：所有测试共享 `nomad_test`，通过 namespace 避免冲突
✅ **高效并发**：4 workers 并行，最大化测试速度
✅ **外部服务 Mock**：验证调用意图，无实际费用
✅ **动态数据生成**：支持特殊场景（如并发竞态测试）
✅ **Helper 抽象**：快速创建用户、订单、航班等
✅ **数据保留**：便于调试，下次运行自动清理
✅ **CI/CD 就绪**：GitHub Actions 完整配置

**下一步**：开始实施测试框架，按照本文档创建文件和配置。
