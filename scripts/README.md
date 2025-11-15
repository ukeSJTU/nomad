# 测试订单数据种子脚本

## 📝 说明

`seed-test-orders.ts` 脚本用于生成测试订单数据，覆盖订单列表页面的所有功能场景。

## 🎯 生成的订单类型

脚本会自动生成以下6种订单：

1. **待支付订单（单程，未来航班）**
   - 状态: `PENDING_PAYMENT`
   - 1个乘客
   - 显示"去支付"按钮
   - 不可删除

2. **已确认订单（单程，未来航班，未出行）**
   - 状态: `CONFIRMED`
   - 2个乘客
   - 包含增值服务（保险、餐食）
   - 在"全部订单"和"未出行"Tab显示
   - 可删除

3. **已确认订单（往返，未来航班，未出行）**
   - 状态: `CONFIRMED`
   - 1个乘客
   - 往返票（包含去程和返程）
   - 在"全部订单"和"未出行"Tab显示
   - 可删除

4. **已取消订单（单程）**
   - 状态: `CANCELLED`
   - 1个乘客
   - 支付超时自动取消
   - 可删除

5. **已退款订单（单程）**
   - 状态: `REFUNDED`
   - 3个乘客
   - 已完成退款
   - 可删除

6. **已确认订单（单程，过去航班，已出行）**
   - 状态: `CONFIRMED`
   - 2个乘客
   - 航班已出发
   - 仅在"全部订单"Tab显示（不在"未出行"Tab）
   - 可删除

## 🚀 运行方法

### 方式一：使用 npm script（推荐）

**为第一个用户生成订单**：

```bash
pnpm run db:seed:orders
```

**为指定用户生成订单**：

```bash
pnpm run db:seed:orders your-email@example.com
```

### 方式二：直接使用 tsx

**为第一个用户生成订单**：

```bash
npx tsx scripts/seed-test-orders.ts
```

**为指定用户生成订单**：

```bash
npx tsx scripts/seed-test-orders.ts your-email@example.com
```

## ⚠️ 前置条件

运行脚本前，请确保：

1. ✅ 数据库已启动且可连接
2. ✅ 数据库表结构已创建（运行过 `pnpm run db:push`）
3. ✅ 数据库中存在用户数据
4. ✅ 数据库中存在航班和座位等级数据
5. ✅ `.env` 文件配置正确（DATABASE_URL）

### 检查数据

使用 Drizzle Studio 检查数据库：

```bash
pnpm run db:studio
```

访问 `https://local.drizzle.studio` 查看：

- `user` 表：是否有用户
- `flights` 表：是否有航班
- `flight_seat_classes` 表：是否有座位等级

## 📊 运行结果

脚本成功运行后，会显示：

```
🎉 测试订单生成完成！

📊 生成订单总结：
------------------------------------------------------------
1. NMD20251114XXXX - 待支付 - 单程
2. NMD20251114YYYY - 已确认 - 单程（未出行）
3. NMD20251114ZZZZ - 已确认 - 往返（未出行）
4. NMD20251114AAAA - 已取消 - 单程
5. NMD20251114BBBB - 已退款 - 单程
6. NMD20251114CCCC - 已确认 - 单程（已出行）
------------------------------------------------------------

✅ 共生成 6 个测试订单

👤 测试用户: 张三 (test@example.com)

🌐 访问订单列表页面: /home/orders

预期结果：
  • 全部订单 Tab: 应显示所有订单
  • 未出行 Tab: 仅显示已确认且未出行的订单
  • 待支付 Tab: 仅显示待支付状态的订单
  • 已确认/已取消/已退款订单可以删除
  • 待支付订单不可删除
```

## 🧪 测试流程

1. 运行脚本生成测试数据
2. 使用脚本输出的测试用户登录系统
3. 访问 `/home/orders` 查看订单列表
4. 测试不同的功能：
   - ✅ Tab 切换
   - ✅ 查看订单详情
   - ✅ 删除订单（测试可删除和不可删除的场景）
   - ✅ 去支付按钮（待支付订单）
   - ✅ 单程和往返订单显示
   - ✅ 空状态提示

## 🔧 故障排除

### 错误：数据库中没有用户

```bash
❌ 错误：数据库中没有用户，请先创建用户
```

**解决方案**：

1. 通过前端注册页面创建用户
2. 或运行主种子脚本：`pnpm run db:seed`

### 错误：数据库中没有未来的航班

```bash
❌ 错误：数据库中没有未来的航班
```

**解决方案**：
运行主种子脚本生成航班数据：`pnpm run db:seed`

### 错误：航班没有座位等级数据

```bash
❌ 错误：航班没有座位等级数据
```

**解决方案**：
运行主种子脚本生成完整数据：`pnpm run db:seed`

## 📝 注意事项

1. **数据持久化**：生成的订单会永久保存到数据库，如需清理请手动删除
2. **订单号唯一性**：每次运行都会生成新的订单号
3. **测试用户**：脚本使用数据库中的第一个用户
4. **座位库存**：脚本不会减少座位库存，仅创建订单记录

## 🗑️ 清理测试数据

如需清理生成的测试订单，可以：

### 方式一：使用 Drizzle Studio

```bash
pnpm run db:studio
```

在 Studio 中删除 `orders` 表的相关记录。

### 方式二：使用 SQL

```sql
-- 删除所有测试订单（以 NMD 开头的订单）
DELETE FROM order_passengers WHERE order_id IN (
  SELECT id FROM orders WHERE order_number LIKE 'NMD%'
);

DELETE FROM payments WHERE order_id IN (
  SELECT id FROM orders WHERE order_number LIKE 'NMD%'
);

DELETE FROM orders WHERE order_number LIKE 'NMD%';
```

## 📚 相关文档

- [订单列表页面实现](<../src/app/(frontend)/(without-sidebar)/home/orders/README.md>)
- [订单数据模型](../src/lib/schema/orders.ts)
- [订单 Actions](../src/lib/actions/orders.ts)
