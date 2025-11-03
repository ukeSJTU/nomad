## 📋 航班预订功能实现设计方案

### 一、数据库设计

#### 1. **orders (订单表)** - 核心表

```sql
字段设计:
- id (UUID, 主键)
- userId (UUID, 关联users表)
- flightId (UUID, 关联flights表)
- seatClassId (UUID, 关联flight_seat_classes表) - 舱位类型
- orderNumber (VARCHAR, 订单号, 唯一, 格式: ORD20250118XXXXXX)
- status (ENUM: pending_payment, paid, cancelled, completed)
- totalAmount (NUMERIC, 总金额)
- basePrice (NUMERIC, 基础票价)
- taxAndFees (NUMERIC, 税费和机建燃油)
- contactName (VARCHAR, 联系人姓名)
- contactPhone (VARCHAR, 联系人电话)
- contactEmail (VARCHAR, 联系人邮箱, 可选)
- paymentDeadline (TIMESTAMP, 支付截止时间)
- isDeleted (BOOLEAN, 软删除)
- createdAt, updatedAt
```

#### 2. **order_passengers (订单乘机人关联表)**

```sql
字段设计:
- id (UUID, 主键)
- orderId (UUID, 关联orders表)
- passengerId (UUID, 关联passengers表)
- seatNumber (VARCHAR, 座位号, 可选)
- createdAt
```

#### 3. **order_services (订单增值服务表)** - Could Have

```sql
字段设计:
- id (UUID, 主键)
- orderId (UUID, 关联orders表)
- serviceType (ENUM: insurance, delay_insurance, transfer, meal等)
- serviceName (VARCHAR, 服务名称)
- price (NUMERIC, 价格)
- createdAt
```

#### 4. **payments (支付记录表)**

```sql
字段设计:
- id (UUID, 主键)
- orderId (UUID, 关联orders表)
- amount (NUMERIC, 支付金额)
- paymentMethod (ENUM: balance, wechat, alipay等)
- status (ENUM: pending, success, failed, cancelled)
- transactionId (VARCHAR, 交易流水号)
- paidAt (TIMESTAMP, 支付时间)
- createdAt, updatedAt
```

---

### 二、前端页面路由设计

#### 推荐方案: 单页面 + 查询参数

```
/flights/booking/[flightId]?step=1&seatClassId=xxx
```

**优势:**

- 更简洁的路由结构
- 状态管理更容易
- 支持URL直接跳转到某一步
- 更好的用户体验

#### 页面结构:

```
/flights/booking/[flightId]
├── ?step=1  → 填写乘机人信息
├── ?step=2  → 选择增值服务
├── ?step=3  → 支付页面
└── /success → 预订成功页 (独立路由)
```

---

### 三、Server Actions 设计

#### 核心 Actions:

1. **`createDraftOrder`** - 第1步完成时调用

   ```typescript
   输入: { flightId, seatClassId, passengers[], contactInfo }
   输出: { orderId, orderNumber }
   逻辑:
   - 验证航班和座位可用性
   - 创建待支付订单
   - 关联乘机人
   - 设置支付截止时间(15分钟)
   ```

2. **`addServicesToOrder`** - 第2步完成时调用

   ```typescript
   输入: { orderId, services[] }
   输出: { updatedOrder }
   逻辑:
   - 添加增值服务
   - 更新订单总金额
   ```

3. **`processPayment`** - 第3步支付时调用

   ```typescript
   输入: {
     (orderId, paymentMethod);
   }
   输出: {
     (paymentResult, transactionId);
   }
   逻辑: -检查订单是否超时 -
     模拟支付处理 -
     更新订单状态为已支付 -
     减少座位库存 -
     创建支付记录;
   ```

4. **`getOrderDetails`** - 查询订单详情

   ```typescript
   输入: {
     orderId;
   }
   输出: {
     (order, flight, passengers, services, payment);
   }
   ```

5. **`cancelExpiredOrder`** - 取消超时订单
   ```typescript
   输入: {
     orderId;
   }
   输出: {
     success;
   }
   逻辑: -更新订单状态为已取消 - 释放座位库存;
   ```

#### 辅助查询:

- **`getFlightWithSeatClass`** - 获取航班和舱位详情
- **`checkSeatAvailability`** - 检查座位可用性

---

### 四、实现步骤顺序 (遵循6阶段开发流程)

#### **Phase 1: 需求分析** ✅

- [x] 已阅读需求文档 `flight-module.mdx`
- [x] 明确四步流程和验收标准

#### **Phase 2: API/Action 设计** ✅

- [x] 设计数据库表结构
- [x] 设计Server Actions接口
- [x] 设计前端路由

#### **Phase 3: 更新API规范** (待实施)

- [ ] 创建技术设计文档 `content/docs/technical-design/backend/flight-booking-api.mdx`
- [ ] 添加JSDoc注释到Server Actions

#### **Phase 4: 测试设计** (待实施)

- [ ] 编写测试计划
- [ ] 定义测试场景:
  - 成功预订流程
  - 表单验证失败
  - 支付超时
  - 座位不足
  - 常用旅客快速填写

#### **Phase 5: 实现** (按顺序执行)

##### 5.1 数据库Schema

```
1. 创建 src/lib/schema/orders.ts
2. 创建 src/lib/schema/order-passengers.ts
3. 创建 src/lib/schema/order-services.ts
4. 创建 src/lib/schema/payments.ts
5. 运行 pnpm db:generate
6. 运行 pnpm db:push
```

##### 5.2 类型定义

```
1. 创建 src/types/api/orders.ts (Zod schemas)
2. 创建 src/types/api/payments.ts
3. 导出类型到 src/types/index.ts
```

##### 5.3 Server Actions

```
1. 创建 src/app/(frontend)/flights/booking/[flightId]/actions.ts
   - createDraftOrder
   - addServicesToOrder
   - processPayment
   - getOrderDetails
   - cancelExpiredOrder
```

##### 5.4 前端组件

```
1. 创建页面布局
   - src/app/(frontend)/flights/booking/[flightId]/page.tsx

2. 创建组件
   - src/components/flights/booking/
     ├── step-indicator.tsx (步骤指示器)
     ├── flight-info-card.tsx (右侧航班信息卡片)
     ├── price-breakdown.tsx (价格明细)
     ├── step1-passenger-form.tsx (乘机人表单)
     ├── step2-services.tsx (增值服务)
     ├── step3-payment.tsx (支付页面)
     └── countdown-timer.tsx (支付倒计时)

3. 创建成功页
   - src/app/(frontend)/flights/booking/[flightId]/success/page.tsx
```

#### **Phase 6: 测试与文档** (待实施)

```
1. 单元测试
   - actions.test.ts
   - 表单验证测试

2. E2E测试
   - tests/flight-booking.spec.ts

3. 更新文档
   - API文档
   - 用户指南
```

---

### 五、关键技术点

#### 1. **状态管理**

- 使用 React Hook Form 管理表单状态
- 使用 URL 查询参数管理步骤状态
- 使用 Server Actions 处理数据持久化

#### 2. **数据验证**

- Zod schema 验证所有输入
- 前端表单验证 + 后端二次验证
- 证件号格式验证

#### 3. **支付倒计时**

- 使用 `useEffect` + `setInterval` 实现倒计时
- 倒计时结束自动调用 `cancelExpiredOrder`
- 显示剩余时间 (MM:SS 格式)

#### 4. **座位库存管理**

- 创建订单时锁定座位 (减少 availableSeats)
- 支付成功后确认扣减
- 订单取消/超时后释放座位

#### 5. **常用旅客快速填写**

- 从 passengers 表查询用户的常用旅客
- Checkbox 选择后自动填充表单
- 支持动态添加新乘机人
