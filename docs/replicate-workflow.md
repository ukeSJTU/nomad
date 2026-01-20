# Replication Workflow for Nomad Flight Booking System

This document guides AI agents (like Claude Code) to replicate the Nomad flight booking web application from structured requirements using Test-Driven Development (TDD).

## Overview

**Goal**: Build a full-stack Next.js flight booking application by implementing structured requirements from the `@nomad/requirements` package.

**Approach**: Test-Driven Development with requirement-driven test coverage tracking.

**Tech Stack**:

- **Framework**: Next.js 15 with App Router, React 19, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **Testing**: Vitest (unit/integration), Playwright (E2E)
- **Styling**: Tailwind CSS v4
- **Email**: React Email + Resend
- **AI Integration**: Vercel AI SDK

## Part 1: Project Initialization

### Step 1.1: Create Next.js Project

```bash
pnpm create next-app nomad-web --typescript --tailwind --app --src-dir
cd nomad-web
```

### Step 1.2: Install Core Dependencies

```bash
# Database & ORM
pnpm add drizzle-orm pg
pnpm add -D drizzle-kit @types/pg

# Authentication
pnpm add better-auth

# Testing
pnpm add -D vitest @vitest/ui @vitest/coverage-v8 @playwright/test
pnpm add -D @testing-library/react @testing-library/jest-dom jsdom

# Validation & Forms
pnpm add zod react-hook-form @hookform/resolvers

# UI & Utilities
pnpm add date-fns nanoid lucide-react
pnpm add -D @faker-js/faker

# Email (if needed)
pnpm add @react-email/components resend
```

### Step 1.3: Setup Requirements Package

**Option A**: Copy requirements data locally

```bash
mkdir -p lib/requirements
# Copy requirement definition files from packages/requirements/src/data
```

**Option B**: Install as dependency (if published)

```bash
pnpm add @nomad/requirements
```

### Step 1.4: Configure Testing Tools

**vitest.config.ts**:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**playwright.config.ts**:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

**package.json scripts**:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "e2e:headed": "playwright test --headed"
  }
}
```

### Step 1.5: Setup Database

1. **Provision PostgreSQL database** (local, Docker, or cloud service like Neon/Supabase)

2. **Configure environment variables** (`.env.local`):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/nomad
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

3. **Create Drizzle configuration** (`drizzle.config.ts`):

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## Part 2: TDD Development Workflow

### Core Principle: Test-First Development

For each requirement, follow this cycle:

1. **RED**: Write failing tests based on acceptance criteria
2. **GREEN**: Implement minimum code to pass tests
3. **REFACTOR**: Improve code quality while keeping tests green
4. **TAG**: Link tests to requirements using JSDoc tags

### Step 2.1: Select a Requirement

From `@nomad/requirements`, choose a requirement to implement. Start with foundational requirements (authentication, user management) before dependent features.

**Example**: REQ-U01 "手机号OTP注册" (Phone OTP Registration)

### Step 2.2: Understand the Requirement

Read thoroughly:

- **Overview**: Feature description and purpose
- **User Stories**: User perspectives and goals
- **Acceptance Criteria**: Detailed scenarios with Given-When-Then steps
- **Priority**: Implementation priority (Must Have, Should Have, etc.)
- **Related Requirements**: Dependencies and related features

### Step 2.3: Design Database Schema (RED Phase)

Based on requirement data needs, design or extend database schema:

**Example** (`src/db/schema/users.ts`):

```typescript
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  phone: text("phone").unique(),
  email: text("email").unique(),
  passwordHash: text("password_hash").notNull(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const otpCodes = pgTable("otp_codes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  identifier: text("identifier").notNull(), // phone or email
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  attempts: integer("attempts").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});
```

**Apply schema**:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

### Step 2.4: Write Failing E2E Tests (RED Phase)

Translate acceptance criteria into Playwright tests:

**Example** (`tests/e2e/REQ-U01-phone-otp-registration.spec.ts`):

```typescript
/**
 * E2E Test: Phone OTP Registration
 * @requirement REQ-U01
 */
import { test, expect } from "@playwright/test";

test.describe("Phone OTP Registration", () => {
  /**
   * Scenario 1: Successful two-step phone registration
   * @requirement REQ-U01
   * @scenario 场景1
   */
  test("should complete registration with valid phone and OTP", async ({
    page,
  }) => {
    // Given: User is on registration page
    await page.goto("/register");
    await expect(page.locator("h1")).toContainText("注册");

    // When: User enters valid phone number
    await page.fill('input[name="phone"]', "13812345678");

    // And: User passes Turnstile verification and clicks "Get Code"
    await page.click('button:has-text("获取验证码")');

    // And: User enters correct 6-digit OTP
    await page.fill('input[name="otp"]', "123456");
    await page.click('button:has-text("下一步")');

    // Then: User should be directed to password setup page
    await expect(page).toHaveURL("/register/set-password");
    await expect(page.locator("h2")).toContainText("设置密码");

    // When: User sets a strong password
    await page.fill('input[name="password"]', "Test@1234");
    await page.fill('input[name="confirmPassword"]', "Test@1234");
    await page.click('button:has-text("完成注册")');

    // Then: Account should be created and user redirected to home
    await expect(page).toHaveURL("/");
  });

  /**
   * Scenario 2: Invalid phone format validation
   * @requirement REQ-U01
   * @scenario 场景2
   */
  test("should show error for invalid phone format", async ({ page }) => {
    await page.goto("/register");

    // When: User enters invalid phone (not 11 digits)
    await page.fill('input[name="phone"]', "1381234567");
    await page.blur('input[name="phone"]');

    // Then: Error message should be displayed
    await expect(page.locator("text=请输入有效的11位手机号")).toBeVisible();

    // And: "Get Code" button should be disabled
    await expect(page.locator('button:has-text("获取验证码")')).toBeDisabled();
  });
});
```

**Verify tests fail**:

```bash
pnpm e2e
# Tests should fail because features are not implemented yet
```

### Step 2.5: Write Unit/Integration Tests (RED Phase)

Test business logic and API routes:

**Example** (`tests/unit/auth/register.test.ts`):

```typescript
/**
 * Unit Tests: Phone Registration Logic
 * @requirement REQ-U01
 */
import { describe, test, expect, beforeEach } from "vitest";
import { validatePhoneNumber, createOTPCode } from "@/lib/auth/otp";

describe("Phone Registration Validation", () => {
  /**
   * @requirement REQ-U01
   * @scenario 场景2
   */
  test("should validate 11-digit Chinese phone numbers", () => {
    expect(validatePhoneNumber("13812345678")).toBe(true);
    expect(validatePhoneNumber("1381234567")).toBe(false);
    expect(validatePhoneNumber("138123456789")).toBe(false);
  });

  /**
   * @requirement REQ-U01
   * @scenario 场景1
   */
  test("should generate 6-digit OTP code", () => {
    const code = createOTPCode();
    expect(code).toMatch(/^\d{6}$/);
  });
});
```

**API Route Test** (`tests/integration/api/auth/send-otp.test.ts`):

```typescript
/**
 * Integration Test: Send OTP API
 * @requirement REQ-U01
 */
import { describe, test, expect } from "vitest";
import { POST } from "@/app/api/auth/send-otp/route";

describe("POST /api/auth/send-otp", () => {
  /**
   * @requirement REQ-U01
   * @scenario 场景1
   */
  test("should send OTP to valid phone number", async () => {
    const request = new Request("http://localhost/api/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone: "13812345678" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  /**
   * @requirement REQ-U01
   * @scenario 场景3
   */
  test("should reject already registered phone", async () => {
    // Setup: Create user with phone
    // Test: Attempt to send OTP to existing phone
    // Assert: Should return error
  });
});
```

**Verify tests fail**:

```bash
pnpm test:run
# Tests should fail because implementation doesn't exist yet
```

### Step 2.6: Implement Features (GREEN Phase)

Now implement the minimum code to make tests pass.

**Implementation order**:

1. **Data layer**: Database queries (Drizzle)
2. **Business logic**: Service functions
3. **API routes**: Next.js Route Handlers
4. **UI components**: React components
5. **Integration**: Connect all layers

**Example** - Data Access (`src/db/queries/users.ts`):

```typescript
import { db } from "@/db";
import { users, otpCodes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function findUserByPhone(phone: string) {
  return db.query.users.findFirst({
    where: eq(users.phone, phone),
  });
}

export async function createOTP(identifier: string, code: string) {
  return db.insert(otpCodes).values({
    identifier,
    code,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  });
}
```

**Example** - Business Logic (`src/lib/auth/otp.ts`):

```typescript
export function validatePhoneNumber(phone: string): boolean {
  return /^1\d{10}$/.test(phone);
}

export function createOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTP(phone: string): Promise<void> {
  // Validate phone
  if (!validatePhoneNumber(phone)) {
    throw new Error("Invalid phone number");
  }

  // Check if already registered
  const existingUser = await findUserByPhone(phone);
  if (existingUser) {
    throw new Error("Phone number already registered");
  }

  // Generate and store OTP
  const code = createOTPCode();
  await createOTP(phone, code);

  // Send SMS (integrate with SMS provider)
  await sendSMS(phone, `Your verification code is: ${code}`);
}
```

**Example** - API Route (`src/app/api/auth/send-otp/route.ts`):

```typescript
import { NextRequest, NextResponse } from "next/server";
import { sendOTP } from "@/lib/auth/otp";
import { z } from "zod";

const schema = z.object({
  phone: z.string().regex(/^1\d{10}$/, "Invalid phone number"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = schema.parse(body);

    await sendOTP(phone);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
```

**Example** - UI Component (`src/app/register/page.tsx`):

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  phone: z.string().regex(/^1\d{10}$/, '请输入有效的11位手机号'),
});

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { phone: string }) => {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    // Handle response...
  };

  return (
    <div>
      <h1>注册</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="tel"
          {...register('phone')}
          placeholder="手机号"
        />
        {errors.phone && <p>{errors.phone.message}</p>}
        <button type="button">获取验证码</button>
      </form>
    </div>
  );
}
```

### Step 2.7: Run Tests and Iterate (GREEN Phase)

```bash
# Run unit/integration tests
pnpm test:run

# Run E2E tests
pnpm e2e

# Run with coverage
pnpm test:coverage
```

**Iterate**: Fix failing tests by adjusting implementation. Continue until all tests pass.

### Step 2.8: Refactor (REFACTOR Phase)

With tests passing:

- Extract reusable logic into utilities
- Improve code organization
- Add error handling
- Optimize performance
- Ensure code quality

**Important**: Keep tests green during refactoring.

### Step 2.9: Generate Coverage Report

Track which requirements are tested:

```bash
pnpm test:ac-coverage --output coverage-report.json
```

This analyzes JSDoc `@requirement` and `@scenario` tags to show requirement coverage.

### Step 2.10: Commit Progress

```bash
git add .
git commit -m "feat(REQ-U01): implement phone OTP registration"
```

**Commit message format**: `feat(REQ-ID): description`

## Part 3: Implementation Guidelines

### 3.1 Requirement Dependencies

Implement requirements in dependency order:

1. **Foundation**: Authentication, user management (REQ-U01, REQ-U02, REQ-U03)
2. **Core Features**: Flight search, booking (REQ-F01, REQ-F02, REQ-O01)
3. **Supporting Features**: Payment, notifications (REQ-P01, REQ-N01)
4. **Enhancements**: User preferences, analytics (REQ-U10, REQ-A01)

### 3.2 Database Schema Evolution

**Never use `DROP TABLE`** in migrations. Use additive changes:

```typescript
// Good: Additive migration
await db.schema.alterTable("users").addColumn("avatar_url", "text");

// Bad: Destructive migration
await db.schema.dropTable("users");
```

### 3.3 Test Data Management

**Seed critical test data** (`src/db/seed.ts`):

```typescript
import { db } from './index';
import { users, flights } from './schema';

export async function seed() {
  // Insert test users
  await db.insert(users).values([
    { phone: '13800000001', passwordHash: '...' },
  ]).onConflictDoNothing();

  // Insert test flights
  await db.insert(flights).values([
    { flightNumber: 'CA1234', ... },
  ]).onConflictDoNothing();
}
```

Run before tests:

```bash
pnpm tsx src/db/seed.ts
```

### 3.4 Test Organization

```
tests/
├── unit/              # Pure logic tests (fast)
│   ├── lib/
│   └── utils/
├── integration/       # API route tests (medium)
│   └── api/
├── e2e/              # Full user journey tests (slow)
│   ├── REQ-U01-phone-registration.spec.ts
│   └── REQ-F01-flight-search.spec.ts
└── setup.ts          # Test environment setup
```

### 3.5 JSDoc Tagging Convention

Tag every test with requirements:

```typescript
/**
 * Test description
 * @requirement REQ-U01
 * @scenario 场景1
 */
test("test case", () => {
  // test implementation
});
```

**Benefits**:

- Automated coverage tracking
- Traceability between code and requirements
- Quick navigation (search `@requirement REQ-U01`)

### 3.6 Error Handling Strategy

Use consistent error patterns:

```typescript
// Define error classes
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// Handle in API routes
try {
  await registerUser(data);
} catch (error) {
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ error: "Internal error" }, { status: 500 });
}
```

### 3.7 Environment Configuration

Separate configs for different environments:

```env
# .env.local (development)
DATABASE_URL=postgresql://localhost:5432/nomad_dev
NODE_ENV=development

# .env.test (testing)
DATABASE_URL=postgresql://localhost:5432/nomad_test
NODE_ENV=test

# .env.production (production)
DATABASE_URL=postgresql://prod-host/nomad
NODE_ENV=production
```

## Part 4: Validation & Quality Checks

Before considering a requirement complete:

### 4.1 Test Coverage

- [ ] All acceptance criteria have corresponding E2E tests
- [ ] Critical business logic has unit tests
- [ ] API routes have integration tests
- [ ] All tests pass consistently
- [ ] Coverage report shows requirement is tested

### 4.2 Functional Verification

- [ ] Feature works in browser (manual smoke test)
- [ ] Happy path flows smoothly
- [ ] Error cases display appropriate messages
- [ ] Loading states are handled
- [ ] Forms validate correctly

### 4.3 Code Quality

- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] No linting errors
- [ ] Consistent code style
- [ ] Reasonable component/function sizes
- [ ] Clear variable/function names

### 4.4 Documentation

- [ ] Complex logic has explanatory comments
- [ ] Tests are tagged with `@requirement` and `@scenario`
- [ ] API routes have clear input/output contracts
- [ ] Environment variables are documented

## Part 5: Iteration Strategy

### Sequential Implementation

Implement requirements one at a time:

1. **Select requirement** from `@nomad/requirements`
2. **Understand** all acceptance criteria
3. **Design** database schema changes
4. **Write failing tests** (RED)
5. **Implement features** (GREEN)
6. **Refactor** code (REFACTOR)
7. **Verify** all tests pass
8. **Commit** changes
9. **Repeat** for next requirement

### Parallel Development

For independent requirements, work in separate branches:

```bash
# Branch for user module
git checkout -b feat/user-module
# Implement REQ-U01, REQ-U02, REQ-U03...

# Branch for flight module
git checkout -b feat/flight-module
# Implement REQ-F01, REQ-F02...
```

Merge when complete and tested.

### Integration Points

After implementing multiple requirements:

- **Integration testing**: Test cross-module interactions
- **System testing**: Verify end-to-end user journeys
- **Performance testing**: Check response times
- **Security testing**: Validate auth flows

## Part 6: Common Patterns

### 6.1 Form Validation Pattern

```typescript
// Zod schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password too short"),
});

// React Hook Form
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

### 6.2 API Route Pattern

```typescript
// route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = schema.parse(body);

    const result = await serviceFunction(validated);

    return NextResponse.json(result);
  } catch (error) {
    // Handle errors
  }
}
```

### 6.3 Database Query Pattern

```typescript
// queries/entity.ts
export async function findById(id: string) {
  return db.query.entity.findFirst({
    where: eq(entity.id, id),
  });
}

export async function create(data: NewEntity) {
  return db.insert(entity).values(data).returning();
}
```

### 6.4 Server Action Pattern (for forms)

```typescript
// actions/entity.ts
"use server";

export async function createEntity(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    // ...
  };

  const validated = schema.parse(data);
  await db.insert(entity).values(validated);

  revalidatePath("/entities");
  redirect("/entities");
}
```

## Part 7: Success Criteria

The replication is complete when:

1. **All Must Have requirements** are implemented and tested
2. **All tests pass** consistently (`pnpm test:run && pnpm e2e`)
3. **Coverage report** shows all requirements have associated tests
4. **Application runs** without errors (`pnpm build && pnpm start`)
5. **Core user journeys** work end-to-end:
   - User registration and login
   - Flight search and booking
   - Order management
   - Payment processing

## Summary

This workflow emphasizes:

- **Requirement-driven development**: Each feature maps to a requirement
- **Test-first approach**: Write tests before implementation
- **Continuous verification**: Tests run frequently to catch regressions
- **Traceability**: JSDoc tags link code to requirements
- **Quality focus**: Multiple test layers ensure robustness

By following this workflow, an AI agent can systematically build a production-quality application from structured requirements.
