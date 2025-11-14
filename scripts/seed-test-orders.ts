/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * 种子脚本：生成测试订单数据
 *
 * 运行方式：
 * npx tsx scripts/seed-test-orders.ts
 *
 * 功能：
 * - 自动查询现有用户和航班数据
 * - 生成不同状态的订单（待支付、已确认、已取消、已退款）
 * - 生成单程和往返订单
 * - 生成不同出发时间的订单（已出行、未出行）
 */

import { and, desc, eq, gte, lt } from "drizzle-orm";

import { user } from "../auth-schema";
import { db } from "../src/lib/db";
import { flightSeatClasses } from "../src/lib/schema/flight-seat-classes";
import { flights } from "../src/lib/schema/flights";
import { orderPassengers, orders, payments } from "../src/lib/schema/orders";

// 乘客名字池
const PASSENGER_NAMES = [
  "张三",
  "李四",
  "王五",
  "赵六",
  "钱七",
  "孙八",
  "周九",
  "吴十",
];

// 生成随机订单号
function generateOrderNumber(): string {
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NMD${dateStr}${random}`;
}

// 生成随机交易号
function generateTransactionId(): string {
  const now = new Date();
  const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TXN${timestamp}${random}`;
}

// 获取随机元素
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// 获取多个随机乘客名字
function getRandomPassengers(count: number): string[] {
  const shuffled = [...PASSENGER_NAMES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  console.log("🚀 开始生成测试订单数据...\n");

  // 从命令行参数获取用户邮箱（可选）
  const targetEmail = process.argv[2];

  // 1. 查询现有用户
  console.log("📊 查询现有用户...");
  let testUser;

  if (targetEmail) {
    // 查询指定邮箱的用户
    const targetUsers = await db
      .select({
        id: user.id,
        email: user.email,
        name: user.name,
      })
      .from(user)
      .where(eq(user.email, targetEmail))
      .limit(1);

    if (targetUsers.length === 0) {
      console.error(`❌ 错误：找不到邮箱为 ${targetEmail} 的用户`);
      process.exit(1);
    }

    testUser = targetUsers[0]!;
    console.log(`✅ 找到目标用户: ${testUser.name} (${testUser.email})`);
  } else {
    // 查询所有用户，使用第一个
    const users = await db
      .select({
        id: user.id,
        email: user.email,
        name: user.name,
      })
      .from(user)
      .limit(5);

    if (users.length === 0) {
      console.error("❌ 错误：数据库中没有用户，请先创建用户");
      process.exit(1);
    }

    console.log(`✅ 找到 ${users.length} 个用户`);
    users.forEach(u => console.log(`   - ${u.name} (${u.email})`));

    testUser = users[0]!;
  }

  console.log(`\n👤 使用用户: ${testUser.name} (${testUser.id})\n`);

  // 2. 查询可用的航班座位等级
  console.log("✈️  查询可用的航班座位等级...");

  // 查询未来的航班
  const now = new Date();
  const futureFlights = await db.query.flights.findMany({
    where: and(
      gte(flights.departureDatetime, now),
      eq(flights.isDeleted, false)
    ),
    orderBy: [flights.departureDatetime],
    limit: 10,
    with: {
      airline: true,
      departureAirport: {
        with: { city: true },
      },
      arrivalAirport: {
        with: { city: true },
      },
    },
  });

  if (futureFlights.length === 0) {
    console.error("❌ 错误：数据库中没有未来的航班");
    process.exit(1);
  }

  console.log(`✅ 找到 ${futureFlights.length} 个未来航班`);

  // 查询这些航班的座位等级
  const futureSeatClasses = await db.query.flightSeatClasses.findMany({
    where: and(
      eq(flightSeatClasses.flightId, futureFlights.map(f => f.id)[0]!),
      eq(flightSeatClasses.isDeleted, false)
    ),
  });

  if (futureSeatClasses.length === 0) {
    console.error("❌ 错误：航班没有座位等级数据");
    process.exit(1);
  }

  // 查询所有航班的座位等级
  const allSeatClasses = await db
    .select()
    .from(flightSeatClasses)
    .where(eq(flightSeatClasses.isDeleted, false))
    .limit(50);

  console.log(`✅ 找到 ${allSeatClasses.length} 个座位等级\n`);

  // 3. 开始生成订单
  const createdOrders: Array<{
    orderNumber: string;
    status: string;
    type: string;
  }> = [];

  console.log("📦 生成订单数据...\n");

  // ====================
  // 订单 1: 待支付订单（单程，未来航班）
  // ====================
  {
    console.log("1️⃣  创建待支付订单（单程，未来航班）");
    const seatClass = futureSeatClasses[0]!;
    const orderNumber = generateOrderNumber();
    const passengerCount = 1;
    const passengerNames = getRandomPassengers(passengerCount);
    const baseAmount = Number(seatClass.price) * passengerCount;

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id,
        status: "PENDING_PAYMENT",
        paymentDeadline: new Date(Date.now() + 15 * 60 * 1000), // 15分钟后
        passengerCount,
        contactEmail: testUser.email,
        pricePerTicket: seatClass.price,
        baseAmount: baseAmount.toFixed(2),
        ancillaryAmount: "0",
        totalAmount: baseAmount.toFixed(2),
      })
      .returning();

    for (const name of passengerNames) {
      await db.insert(orderPassengers).values({
        orderId: order!.id,
        name,
        identityType: "id_card",
        identityNumber: `110101199${Math.floor(Math.random() * 10)}0101${Math.floor(Math.random() * 9000 + 1000)}`,
        phone: `138${Math.floor(Math.random() * 90000000 + 10000000)}`,
      });
    }

    createdOrders.push({
      orderNumber,
      status: "待支付",
      type: "单程",
    });
    console.log(`   ✅ 订单号: ${orderNumber}\n`);
  }

  // ====================
  // 订单 2: 已确认订单（单程，未来航班，未出行）
  // ====================
  {
    console.log("2️⃣  创建已确认订单（单程，未来航班，未出行）");
    const seatClass = futureSeatClasses[0]!;
    const orderNumber = generateOrderNumber();
    const passengerCount = 2;
    const passengerNames = getRandomPassengers(passengerCount);
    const baseAmount = Number(seatClass.price) * passengerCount;
    const ancillaryAmount = 100; // 增值服务
    const totalAmount = baseAmount + ancillaryAmount;

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id,
        status: "CONFIRMED",
        paymentDeadline: new Date(Date.now() - 10 * 60 * 1000), // 10分钟前
        passengerCount,
        contactEmail: testUser.email,
        contactPhone: "13800138000",
        pricePerTicket: seatClass.price,
        baseAmount: baseAmount.toFixed(2),
        ancillaryAmount: ancillaryAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        ancillaryDetails: ["INSURANCE_BASIC", "MEAL_STANDARD"],
      })
      .returning();

    for (const name of passengerNames) {
      await db.insert(orderPassengers).values({
        orderId: order!.id,
        name,
        identityType: "passport",
        identityNumber: `E${Math.floor(Math.random() * 90000000 + 10000000)}`,
      });
    }

    // 创建支付记录
    await db.insert(payments).values({
      orderId: order!.id,
      amount: totalAmount.toFixed(2),
      method: "balance",
      status: "SUCCESS",
      transactionId: generateTransactionId(),
    });

    createdOrders.push({
      orderNumber,
      status: "已确认",
      type: "单程（未出行）",
    });
    console.log(`   ✅ 订单号: ${orderNumber}\n`);
  }

  // ====================
  // 订单 3: 已确认订单（往返，未来航班，未出行）
  // ====================
  if (futureSeatClasses.length >= 2) {
    console.log("3️⃣  创建已确认订单（往返，未来航班，未出行）");
    const outboundSeatClass = futureSeatClasses[0]!;
    const inboundSeatClass = futureSeatClasses[1]!;
    const orderNumber = generateOrderNumber();
    const passengerCount = 1;
    const passengerNames = getRandomPassengers(passengerCount);
    const pricePerTicket =
      Number(outboundSeatClass.price) + Number(inboundSeatClass.price);
    const baseAmount = pricePerTicket * passengerCount;
    const totalAmount = baseAmount;

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        userId: testUser.id,
        outboundFlightSeatClassId: outboundSeatClass.id,
        inboundFlightSeatClassId: inboundSeatClass.id,
        status: "CONFIRMED",
        paymentDeadline: new Date(Date.now() - 20 * 60 * 1000), // 20分钟前
        passengerCount,
        contactEmail: testUser.email,
        pricePerTicket: pricePerTicket.toFixed(2),
        baseAmount: baseAmount.toFixed(2),
        ancillaryAmount: "0",
        totalAmount: totalAmount.toFixed(2),
      })
      .returning();

    for (const name of passengerNames) {
      await db.insert(orderPassengers).values({
        orderId: order!.id,
        name,
        identityType: "id_card",
        identityNumber: `320106198${Math.floor(Math.random() * 10)}0101${Math.floor(Math.random() * 9000 + 1000)}`,
      });
    }

    // 创建支付记录
    await db.insert(payments).values({
      orderId: order!.id,
      amount: totalAmount.toFixed(2),
      method: "balance",
      status: "SUCCESS",
      transactionId: generateTransactionId(),
    });

    createdOrders.push({
      orderNumber,
      status: "已确认",
      type: "往返（未出行）",
    });
    console.log(`   ✅ 订单号: ${orderNumber}\n`);
  }

  // ====================
  // 订单 4: 已取消订单
  // ====================
  {
    console.log("4️⃣  创建已取消订单（单程）");
    const seatClass = getRandomElement(allSeatClasses);
    const orderNumber = generateOrderNumber();
    const passengerCount = 1;
    const passengerNames = getRandomPassengers(passengerCount);
    const baseAmount = Number(seatClass.price) * passengerCount;

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id,
        status: "CANCELLED",
        paymentDeadline: new Date(Date.now() - 30 * 60 * 1000), // 30分钟前
        passengerCount,
        contactEmail: testUser.email,
        pricePerTicket: seatClass.price,
        baseAmount: baseAmount.toFixed(2),
        ancillaryAmount: "0",
        totalAmount: baseAmount.toFixed(2),
      })
      .returning();

    for (const name of passengerNames) {
      await db.insert(orderPassengers).values({
        orderId: order!.id,
        name,
        identityType: "id_card",
        identityNumber: `440106199${Math.floor(Math.random() * 10)}0101${Math.floor(Math.random() * 9000 + 1000)}`,
      });
    }

    createdOrders.push({
      orderNumber,
      status: "已取消",
      type: "单程",
    });
    console.log(`   ✅ 订单号: ${orderNumber}\n`);
  }

  // ====================
  // 订单 5: 已退款订单
  // ====================
  {
    console.log("5️⃣  创建已退款订单（单程）");
    const seatClass = getRandomElement(allSeatClasses);
    const orderNumber = generateOrderNumber();
    const passengerCount = 3;
    const passengerNames = getRandomPassengers(passengerCount);
    const baseAmount = Number(seatClass.price) * passengerCount;
    const totalAmount = baseAmount;

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id,
        status: "REFUNDED",
        paymentDeadline: new Date(Date.now() - 60 * 60 * 1000), // 1小时前
        passengerCount,
        contactEmail: testUser.email,
        contactPhone: "13900139000",
        pricePerTicket: seatClass.price,
        baseAmount: baseAmount.toFixed(2),
        ancillaryAmount: "0",
        totalAmount: totalAmount.toFixed(2),
      })
      .returning();

    for (const name of passengerNames) {
      await db.insert(orderPassengers).values({
        orderId: order!.id,
        name,
        identityType: "passport",
        identityNumber: `P${Math.floor(Math.random() * 90000000 + 10000000)}`,
      });
    }

    // 创建支付记录（已退款也有支付记录）
    await db.insert(payments).values({
      orderId: order!.id,
      amount: totalAmount.toFixed(2),
      method: "balance",
      status: "SUCCESS",
      transactionId: generateTransactionId(),
    });

    createdOrders.push({
      orderNumber,
      status: "已退款",
      type: "单程",
    });
    console.log(`   ✅ 订单号: ${orderNumber}\n`);
  }

  // ====================
  // 订单 6: 已确认订单（过去航班，已出行）
  // ====================
  {
    console.log("6️⃣  创建已确认订单（过去航班，已出行）");
    // 查询过去的航班
    const pastFlights = await db.query.flights.findMany({
      where: and(
        lt(flights.departureDatetime, now),
        eq(flights.isDeleted, false)
      ),
      orderBy: [desc(flights.departureDatetime)],
      limit: 5,
    });

    if (pastFlights.length > 0) {
      const pastFlight = pastFlights[0]!;
      const pastSeatClasses = await db
        .select()
        .from(flightSeatClasses)
        .where(
          and(
            eq(flightSeatClasses.flightId, pastFlight.id),
            eq(flightSeatClasses.isDeleted, false)
          )
        );

      if (pastSeatClasses.length > 0) {
        const seatClass = pastSeatClasses[0]!;
        const orderNumber = generateOrderNumber();
        const passengerCount = 2;
        const passengerNames = getRandomPassengers(passengerCount);
        const baseAmount = Number(seatClass.price) * passengerCount;

        const [order] = await db
          .insert(orders)
          .values({
            orderNumber,
            userId: testUser.id,
            outboundFlightSeatClassId: seatClass.id,
            status: "CONFIRMED",
            paymentDeadline: new Date(
              pastFlight.departureDatetime.getTime() - 2 * 24 * 60 * 60 * 1000
            ), // 航班出发前2天
            passengerCount,
            contactEmail: testUser.email,
            pricePerTicket: seatClass.price,
            baseAmount: baseAmount.toFixed(2),
            ancillaryAmount: "0",
            totalAmount: baseAmount.toFixed(2),
            createdAt: new Date(
              pastFlight.departureDatetime.getTime() - 3 * 24 * 60 * 60 * 1000
            ), // 航班出发前3天创建
          })
          .returning();

        for (const name of passengerNames) {
          await db.insert(orderPassengers).values({
            orderId: order!.id,
            name,
            identityType: "id_card",
            identityNumber: `500106198${Math.floor(Math.random() * 10)}0101${Math.floor(Math.random() * 9000 + 1000)}`,
          });
        }

        // 创建支付记录
        await db.insert(payments).values({
          orderId: order!.id,
          amount: baseAmount.toFixed(2),
          method: "balance",
          status: "SUCCESS",
          transactionId: generateTransactionId(),
        });

        createdOrders.push({
          orderNumber,
          status: "已确认",
          type: "单程（已出行）",
        });
        console.log(`   ✅ 订单号: ${orderNumber}\n`);
      } else {
        console.log("   ⚠️  跳过：过去航班没有座位等级数据\n");
      }
    } else {
      console.log("   ⚠️  跳过：数据库中没有过去的航班\n");
    }
  }

  // ====================
  // 总结
  // ====================
  console.log(`\n${"=".repeat(60)}`);
  console.log("🎉 测试订单生成完成！\n");
  console.log("📊 生成订单总结：");
  console.log("-".repeat(60));
  createdOrders.forEach((order, index) => {
    console.log(
      `${index + 1}. ${order.orderNumber} - ${order.status} - ${order.type}`
    );
  });
  console.log("-".repeat(60));
  console.log(`\n✅ 共生成 ${createdOrders.length} 个测试订单`);
  console.log(`\n👤 测试用户: ${testUser.name} (${testUser.email})`);
  console.log(`\n🌐 访问订单列表页面: /home/orders`);
  console.log("\n预期结果：");
  console.log("  • 全部订单 Tab: 应显示所有订单");
  console.log("  • 未出行 Tab: 仅显示已确认且未出行的订单");
  console.log("  • 待支付 Tab: 仅显示待支付状态的订单");
  console.log("  • 已确认/已取消/已退款订单可以删除");
  console.log("  • 待支付订单不可删除");
  console.log(`${"=".repeat(60)}\n`);

  process.exit(0);
}

main().catch(error => {
  console.error("\n❌ 错误:", error);
  process.exit(1);
});
