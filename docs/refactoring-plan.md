# Nomad 项目测试重构计划

## 文档版本

- **创建日期**: 2025-11-17
- **当前状态**: 讨论中
- **负责人**: TODO小组

---

## 一、重构目标

### 核心目标

1. ✅ 提升测试覆盖率（单元测试、集成测试、E2E测试）
2. ✅ 确保界面文本内容与携程官网一致
3. ✅ 优化后端接口组织，消除冗余
4. ✅ 修复E2E测试中的Turnstile问题
5. ✅ E2E测试连接测试数据库，消除flaky测试

### 重构原则

- **按模块/场景纵向推进**：每次完成一个完整的业务场景（从前端到后端到E2E）
- **测试先行**：先补充测试，再重构代码
- **渐进式改进**：避免大规模重写，分步骤验证

---

## 二、当前状态评估

### 测试覆盖现状

| 测试类型  | 已完成                          | 薄弱环节                        | 评分 |
| --------- | ------------------------------- | ------------------------------- | ---- |
| 单元测试  | Schema验证、工具函数、部分Query | Orders/User/Passengers Queries  | 6/10 |
| 组件测试  | 认证表单、部分业务组件          | 文案一致性未验证                | 7/10 |
| Storybook | 63个stories                     | 缺少文案断言                    | 7/10 |
| 集成测试  | 认证、订单取消                  | Actions层几乎无测试             | 3/10 |
| E2E测试   | 认证流程                        | 核心业务流程缺失、Turnstile问题 | 4/10 |

### 架构优势

✅ Actions → Services → Queries 三层分离清晰
✅ 测试基础设施完善（Vitest + Playwright + Storybook）
✅ Turnstile mock策略设计优雅

---

## 三、重构方案

### 推进方式：纵向模块化

**✅ 已确认**：采用纵向模块化推进方式

**定义**：每次选择一个完整的业务场景，从前端组件 → 后端接口 → 数据库 → 测试全链路完成

**执行模式**：

```
选定模块 → 补充后端测试 → 对齐前端文案 → 补充组件测试 → 添加E2E测试 → 验收
```

**优势**：

- 每个模块完成后立即可用
- 容易发现完整业务链路的问题
- 减少上下文切换

---

## 四、模块/场景列表

### 模块执行顺序（风险驱动）

**✅ 已确认**：方案A - 风险驱动，优先处理高风险核心模块

**执行顺序**：

1. **M1: 订单管理** - 座位锁定、事务、并发控制
2. **M2: 支付流程** - 金额计算、支付状态管理
3. **M3: 航班搜索** - 复杂查询、结果排序筛选
4. **M5: 乘客管理** - CRUD、隐私数据脱敏
5. **M6: 用户后台** - 个人信息、账号安全
6. **M4: 用户认证** - 补充边界测试（已有基础测试）

**覆盖原则**：所有功能必须有测试覆盖，无遗漏

---

## 五、测试基础设施改进

### ✅ 已确认的技术决策

#### 5.1 数据隔离策略：三层模型

**Layer 1: 共享只读数据**

- 航班、城市、机场等静态seed data
- 一次性种入，所有测试共享
- 支持并行执行

**Layer 2: 唯一标识符隔离**

- 用户、订单、乘客等动态数据
- 使用 `worker-${workerIndex}-${timestamp}` 生成唯一ID
- 支持完全并行

**Layer 3: 串行事务测试**

- 并发控制、race condition测试
- 使用 `describe.serial` 禁用并行
- 测试前执行 `clearDatabase()`

#### 5.2 并行执行配置

**集成测试**：

- 启用并行：`singleFork: false`
- 最多4个worker
- 使用Layer 1 + Layer 2策略

**E2E测试**：

- 启用并行：`fullyParallel: true`
- 本地2个worker，CI 4个worker
- 复刻集成测试的数据库操作模式

#### 5.3 外部服务Mock策略

**需要补充的开关**：

1. ✅ Aliyun SMS - 已有 `ENABLE_ALIYUN_SMS: false`
2. ⚠️ Resend邮件 - 需添加 `ENABLE_RESEND: false` 或检测 `NODE_ENV === 'test'`
3. ⚠️ Turnstile - 需修复mock未生效问题
   - 使用 `NEXT_PUBLIC_ENABLE_TURNSTILE: false`
   - 或通过 `page.addInitScript` 注入全局标记

**原则**：所有外部服务必须在测试环境自动mock

#### 5.4 边缘案例覆盖

**使用Factory + Traits模式**：

- 定义标准数据工厂
- 为每个边缘案例定义trait
- 示例：`expired`, `confirmed`, `largePassengerCount`

**覆盖策略**：

- 正常路径（Happy Path）
- 边界条件（空值、最大值、最小值）
- 异常情况（过期、冲突、不足）
- 并发场景（race condition）

---

## 六、详细执行计划

### 6.1 测试基础设施代码改动

**优先级：P0 - 必须先完成**

#### 创建测试上下文工具

**文件：`tests/helpers/test-context.ts`**

- `generateTestId(prefix)` - 生成唯一测试ID
- `createIsolatedTestUser(overrides)` - 创建隔离用户
- `getOrCreateSharedFlight(flightNumber)` - 获取/创建共享航班
- `createIsolatedTestOrder(overrides)` - 创建隔离订单

**文件：`tests/e2e/helpers/test-context.ts`**

- `generateE2ETestId(workerInfo, prefix)` - E2E专用ID生成
- 扩展Playwright test fixture，提供 `testContext`
- 自动管理测试数据生命周期

#### 创建共享种子数据

**文件：`tests/setup/seed-data.ts`**

- 定义固定的测试航班、城市、机场数据
- 提供 `seedSharedData()` 函数
- 提供 `cleanupSharedData()` 函数

**文件：`tests/setup/global-setup.ts`** (Vitest)

- beforeAll: 种入共享数据
- afterAll: 清理（可选）

**文件：`tests/e2e/global-setup.ts`** (Playwright)

- 种入E2E测试的共享数据
- 配置数据库连接

#### 测试配置文件调整（先记录，不实施）

**⚠️ 注意：以下配置改动暂不实施，待基础工具完成后再启用并行**

**文件：`vitest.config.mts`**

```typescript
// 集成测试项目配置（未来调整）
{
  name: 'integration',
  poolOptions: {
    forks: {
      singleFork: false, // 当前保持 true，未来改为 false
    },
  },
  maxConcurrency: 4, // 未来启用
}
```

**文件：`playwright.config.ts`**

```typescript
// E2E测试配置（未来调整）
export default defineConfig({
  fullyParallel: false, // 当前保持 false，未来改为 true
  workers: 1, // 当前保持 1，未来改为 2-4

  // 未来启用的全局配置
  globalSetup: "./tests/e2e/global-setup.ts",

  use: {
    // 未来添加数据库环境变量
  },
});
```

**调整原则**：

1. 先完成工具函数和共享数据机制
2. 在单个模块测试中验证数据隔离有效
3. 确认无冲突后，再启用并行配置
4. 逐步提升workers数量（1 → 2 → 4）

### 6.2 Storybook 与 RTL 分工调整

**✅ 已确认**：方案B - 文案测试放在RTL

#### 职责划分

**Storybook 职责**：

- 组件视觉展示和文档
- 展示各种状态（loading, error, disabled等）
- 不编写play function测试
- 作为组件库文档供团队参考

**RTL 职责**：

- 所有测试逻辑（交互 + 文案 + 验证）
- 文案准确性测试（与携程对齐）
- 边界条件和错误处理
- 用户交互流程测试

#### 文案对齐流程

**不创建独立文档，采用实时验证**：

1. 开发者在编写/修改组件时，手动访问携程官网
2. 截图或记录关键文案（按钮文字、状态描述、提示语）
3. 在RTL测试中添加文案断言
4. 测试即文档：通过测试代码记录正确文案

**RTL测试组织**：

```typescript
describe("ComponentName", () => {
  describe("Text Content - 携程对齐", () => {
    // 集中测试所有文案
  });

  describe("User Interactions", () => {
    // 测试交互逻辑
  });

  describe("Edge Cases", () => {
    // 测试边界情况
  });
});
```

#### 改动清单

**需要调整的文件**：

- 移除现有Storybook stories中的play function（如果有复杂断言）
- 为每个业务组件添加 "Text Content - 携程对齐" 测试套件
- 重点组件：订单卡片、航班卡片、支付按钮、状态标签

---

## 六、模块详细计划

### M1: 订单管理模块

#### 模块范围

**后端接口**：

- Actions (4): createOrder, updateAncillary, cancelOrder, deleteOrder
- Services (2): cancelOrder, cancelExpiredOrders
- Queries (3): getUserOrders, getUpcomingOrders, getPendingPaymentOrders

**前端组件**：

- order-status-card, order-flight-info, order-contact-info
- order-passenger-info, order-payment-details, utils

**当前测试状态**：

- ✅ Services: cancelExpiredOrders 已有集成测试
- ❌ Actions: 无测试 (0/4)
- ❌ Queries: 无测试 (0/3)
- ❌ 组件: 无测试 (0/6)
- ❌ E2E: 无测试

#### 执行步骤

**Step 1: 补充后端单元测试**

`src/lib/queries/orders.test.ts`:

- [ ] getUserOrders - 按状态筛选测试
- [ ] getUserOrders - 空结果测试
- [ ] getUpcomingOrders - 时间范围测试
- [ ] getPendingPaymentOrders - 过期订单不包含

**Step 2: 补充后端集成测试**

`tests/integration/actions/orders.integration.test.ts`:

- [ ] createOrderAction - 正常创建单程订单
- [ ] createOrderAction - 正常创建往返订单
- [ ] createOrderAction - 座位锁定验证
- [ ] createOrderAction - 座位不足应失败
- [ ] createOrderAction - 价格计算正确性（避免浮点数问题）
- [ ] updateOrderAncillaryAction - 更新增值服务
- [ ] cancelOrderAction - 取消订单释放座位
- [ ] cancelOrderAction - 已确认订单不可取消
- [ ] deleteOrderAction - 删除待支付订单
- [ ] deleteOrderAction - 不能删除已确认订单

`tests/integration/services/orders.integration.test.ts`:

- [ ] 补充并发订单竞争测试
- [ ] 补充往返订单座位锁定测试

**Step 3: 检查前端组件文案**

访问携程官网，记录以下文案：

- [ ] 订单状态：待支付/已确认/已取消/已完成
- [ ] 按钮文字：立即支付/取消订单/查看详情/删除订单
- [ ] 提示信息：支付倒计时、取消成功提示

**Step 4: 补充组件测试**

`src/components/flights/orders/order-status-card.test.tsx`:

- [ ] Text Content - 携程对齐
  - 所有状态的文案正确
  - 按钮文字与携程一致
- [ ] User Interactions
  - 点击"立即支付"跳转支付页
  - 点击"取消订单"显示确认弹窗
- [ ] Edge Cases
  - 支付倒计时显示正确
  - 过期订单显示正确状态

`src/components/flights/orders/order-flight-info.test.tsx`:

- [ ] Text Content - 显示航班号、时间、机场
- [ ] Edge Cases - 往返航班显示两段

`src/components/flights/orders/order-payment-details.test.tsx`:

- [ ] Text Content - 价格明细文案
- [ ] Edge Cases - 金额格式正确（小数点两位）

**Step 5: 补充E2E测试**

`tests/e2e/orders/create-order.spec.ts`:

- [ ] 完整流程：搜索航班 → 选择航班 → 填写乘客 → 创建订单
- [ ] 验证数据库：订单创建成功，座位已锁定
- [ ] 验证UI：跳转到支付页，显示倒计时

`tests/e2e/orders/cancel-order.spec.ts`:

- [ ] 从订单列表取消订单
- [ ] 验证数据库：订单状态变为CANCELLED，座位已释放
- [ ] 验证UI：显示取消成功提示

`tests/e2e/orders/order-list.spec.ts`:

- [ ] 查看订单列表
- [ ] 按状态筛选订单
- [ ] 删除待支付订单

#### 验收标准

**测试覆盖率**：

- [ ] Actions集成测试: 10+ 个测试用例
- [ ] Queries单元测试: 4+ 个测试用例
- [ ] Services集成测试: 补充2+个并发测试
- [ ] 组件RTL测试: 3个组件，15+个测试用例
- [ ] E2E测试: 3个spec文件，10+个测试场景

**功能验证**：

- [ ] 所有订单状态文案与携程一致
- [ ] 价格计算无浮点数精度问题
- [ ] 座位锁定/释放逻辑正确
- [ ] 订单超时自动取消功能正常
- [ ] 并发订单不会导致超售

**代码质量**：

- [ ] 所有测试通过（串行模式）
- [ ] 无console错误或警告
- [ ] 代码通过lint检查

---

## 七、风险与挑战

### 7.1 技术风险

**风险1: 并行测试数据竞争**

- 描述：启用并行后可能出现数据冲突
- 缓解：先用串行模式验证，逐步启用并行
- 应对：使用Layer 2唯一ID策略，出现问题立即回退串行

**风险2: 外部服务Mock失效**

- 描述：Turnstile、Resend等mock可能不生效
- 缓解：在测试基础设施阶段优先验证mock
- 应对：添加详细日志，快速定位mock失败原因

**风险3: 测试数据累积导致数据库膨胀**

- 描述：Layer 2数据不自动清理
- 缓解：定期运行清理脚本
- 应对：添加测试数据TTL标记，自动清理7天前数据

**风险4: E2E测试不稳定**

- 描述：网络延迟、页面加载慢导致flaky测试
- 缓解：使用合理的超时配置，避免固定wait
- 应对：使用Playwright的auto-waiting机制

### 7.2 进度风险

**风险5: 模块测试编写时间超预期**

- 描述：某些复杂模块（如支付）测试场景多
- 缓解：AI辅助生成测试框架，人工补充边缘案例
- 应对：优先P0场景，P1场景可延后

**风险6: 携程文案频繁变更**

- 描述：携程官网文案可能更新
- 缓解：测试失败时快速验证是否为文案变更
- 应对：文案变更成本低，直接更新测试

### 7.3 协作风险

**风险7: 多人同时修改测试导致冲突**

- 描述：Git冲突频繁
- 缓解：按模块严格划分，避免交叉修改
- 应对：约定每个模块由一人负责

---

## 八、验收标准

### 8.1 测试覆盖率目标

**整体目标**：

- [ ] 集成测试覆盖所有Actions和Services
- [ ] 组件测试覆盖所有业务组件
- [ ] E2E测试覆盖6大核心流程

**具体指标**：

- Actions集成测试: ≥60个测试用例（平均每个模块10个）
- Queries单元测试: ≥20个测试用例
- 组件RTL测试: ≥50个测试用例
- E2E测试: ≥15个spec文件

### 8.2 功能质量标准

**文案对齐**：

- [ ] 所有按钮文字与携程一致
- [ ] 所有状态描述与携程一致
- [ ] 所有错误提示符合用户习惯

**安全性**：

- [ ] 无P0级安全漏洞（参考high-risk.mdx）
- [ ] 价格计算无浮点数精度问题
- [ ] 横向越权测试通过

**稳定性**：

- [ ] 所有测试在串行模式下100%通过
- [ ] 并发测试不出现数据竞争
- [ ] E2E测试成功率 ≥95%

### 8.3 代码质量标准

**测试代码**：

- [ ] 所有测试使用统一的test-context工具
- [ ] 测试命名清晰（describe + it结构）
- [ ] 边缘案例使用Factory + Traits

**生产代码**：

- [ ] 通过eslint和prettier检查
- [ ] 外部服务都有开关控制
- [ ] 无遗留的console.log或TODO

---

## 九、执行时间线

### 阶段0: 基础设施准备（优先）

- [ ] 创建test-context工具
- [ ] 创建seed-data
- [ ] 验证外部服务mock
- [ ] 补充Resend和Turnstile开关

### 阶段1-6: 模块迭代（按优先级）

- [ ] M1: 订单管理
- [ ] M2: 支付流程
- [ ] M3: 航班搜索
- [ ] M5: 乘客管理
- [ ] M6: 用户后台
- [ ] M4: 用户认证（补充）

### 阶段7: 并行化优化（可选）

- [ ] 验证数据隔离有效性
- [ ] 启用集成测试并行
- [ ] 启用E2E测试并行
- [ ] 性能对比和调优

---

## 十、附录

### A. 关键文件清单

**测试工具**：

- `tests/helpers/test-context.ts` - 集成测试工具
- `tests/e2e/helpers/test-context.ts` - E2E测试工具
- `tests/setup/seed-data.ts` - 共享种子数据
- `tests/helpers/db.ts` - 数据库清理工具（已有）

**配置文件**：

- `vitest.config.mts` - Vitest配置
- `playwright.config.ts` - Playwright配置
- `.env.test` - 测试环境变量

### B. 有用的命令

```bash
# 运行特定模块的测试
pnpm test:integration orders
pnpm test:unit queries/orders
pnpm test:components order-status-card
pnpm test:e2e orders

# 查看测试覆盖率
pnpm test:coverage

# 清理测试数据库
pnpm db:push:test && pnpm db:seed:test

# 运行单个E2E测试（调试用）
pnpm playwright test orders/create-order --headed
```

### C. 参考文档

- [Vitest文档](https://vitest.dev/)
- [Playwright最佳实践](https://playwright.dev/docs/best-practices)
- [Testing Library指南](https://testing-library.com/docs/react-testing-library/intro/)
- [Drizzle ORM事务](https://orm.drizzle.team/docs/transactions)
- 项目内部：`docs/high-risk.mdx` - 安全漏洞清单

---

## 附录

### A. 携程文案对照表

**待创建**

### B. 接口审计清单

**待创建**

### C. 测试数据隔离方案

**待确定**
