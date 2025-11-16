---
theme: default
addons: []
title: Nomad 项目第二次中期汇报
info: false
author: uke
presenter: true
browserExporter: dev
download: false
twoslash: true
lineNumbers: true
monaco: true
selectable: true
record: false
colorSchema: auto
background: https://sli.dev/demo-cover.png
drawings:
  enabled: false
fonts:
  mono: "Fira Code, monospace"
layout: cover
transition: slide-left
mdc: true
---

# Nomad 项目中期汇报

第二次中期汇报——协作与进展

—— TODO 小组

<a href="https://github.com/ukesjtu/nomad/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ukesjtu/nomad" />
</a>

<!--
大家好，我们是 TODO 小组，选题是“携程平台”。今天我将为大家带来Nomad项目的第二次中期汇报。这次汇报的主题是"协作与进展"，我们不仅会展示项目的功能进展，更重要的是展示我们如何通过完善的工程化体系来保证代码质量、提升开发效率，以及如何为后续的组间协作做好准备。
-->

---
layout: center
transition: slide-left
---

# 汇报大纲

<v-clicks>

1. **项目进度汇报** - 当前软件系统完成的情况
2. **测试框架设计** - 如何用良好的测试框架设计提高AI+TDD开发的效率
   - 三层测试金字塔
   - Storybook组件库
   - 完善的文档系统
   - CI/CD自动化流程
3. **AI生成失败** - 为何失败？如何解决？
4. **团队协作情况** - 我们是如何提高团队协作效率的

</v-clicks>

<!--
今天的汇报分为四个部分：

[click] 首先是项目进度汇报，我会简要介绍我们对需求场景的分解与设计。

[click] 第二部分是今天的重点——开发者体验。这是我们的差异化优势所在。我们不只是实现了功能，更建立了一套完整的工程化开发体系，包括三层测试金字塔、Storybook组件库、完善的文档系统，以及CI/CD自动化流程。

[click] 第三部分是小组间协作。考虑到课程后续有在其他组代码上增加功能和找bug的环节，我们提前准备了开发常见问题FAQ和安全漏洞清单，帮助其他组快速上手我们的项目。

[click] 最后是项目展望，我会基于现有代码，说明具体的技术优化方向，包括Redis缓存和消息队列的应用场景。

现在让我们开始第一部分。
-->

---
layout: section
transition: slide-up
---

# 一、项目进度汇报

当前软件系统完成的情况

<!--
首先进入第一部分，项目进度汇报。在这一部分，我将向大家展示我们已经完成的四大核心功能模块。这些模块涵盖了从用户注册登录，到个人信息管理，再到航班搜索和订单处理的完整业务流程。值得强调的是，我们不仅实现了基础功能，还在每个环节都考虑了用户体验和安全性。
-->

---
transition: slide-up
layout: center
---

## 1.1 用户认证模块

<v-clicks>

- 用户注册：手机号或邮箱注册的方式
- 用户登录：手机号+验证码，手机号+密码，邮箱+验证码，邮箱+密码多种方式登录
- 第三方集成：提供 GitHub OAuth 的方式登录
- 忘记密码：通过手机号或邮箱找回密码/重新设置密码
- 人机验证：集成人机验证模块保护关键接口

</v-clicks>

<v-click>

> 值得一提的是，我们引入了阿里云的短信发送服务和 Resend 提供的邮件发送服务，能够真的发送注册短信等等

</v-click>

<!--
首先是用户认证模块，这是整个系统的入口。

[click] 我们支持多样化的注册方式，用户可以选择使用手机号或邮箱进行注册，降低注册门槛。

[click] 在登录方面，我们提供了四种组合方式：手机号加验证码、手机号加密码、邮箱加验证码、邮箱加密码。这种灵活的设计既保证了安全性，又兼顾了用户体验。所有密码都使用Better Auth框架进行加密存储，确保数据安全。

[click] 我们还集成了GitHub OAuth第三方登录，来替代携程平台上微信、QQ等社交账号登录方式。

[click] 考虑到用户可能忘记密码的场景，我们提供了完整的密码找回流程，支持通过手机号或邮箱重置密码。

[click] 为了防止恶意注册、暴力破解等安全威胁，我们集成了人机验证模块。在关键操作节点，比如注册、登录、发送验证码等场景，系统会要求用户完成人机验证，有效防止机器人攻击和恶意刷单行为，保障系统安全和服务质量。

[click] 特别值得一提的是，我们引入了真实的第三方服务：阿里云的短信服务用于发送验证码，Resend服务用于发送邮件。这两项功能目前还在调试中，希望能在下一次展示中稳定部署让大家体验。这不是简单的模拟，而是真正可用的生产级别功能。
-->

---
transition: slide-up
layout: center
---

## 1.2 用户后台模块

<v-clicks>

- 个人信息管理：查看/编辑，性别、昵称等等
- 常用旅客信息管理：查看，新增，删除，修改
- 订单分类查看：查看/删除个人订单记录
- 第三方账号绑定：绑定/解绑第三方账户（GitHub OAuth)
- 账号安全设置：修改密码/绑定手机号/绑定邮箱

</v-clicks>

<!--
第二个模块是用户后台，这是用户管理个人信息和订单的中心。

[click] 在个人信息管理方面，用户可以查看和编辑自己的基本信息，包括性别、昵称等。

[click] 在常用旅客信息管理中，用户可以预先保存乘客信息，订票时直接选择，无需重复输入。我们提供了完整的增删改查功能，并通过Zod schema严格验证所有输入数据，确保信息的准确性和完整性。

[click] 订单管理功能支持按状态分类查看订单，比如待付款、已完成、已取消等。用户可以快速查看历史订单，也可以删除不需要的订单记录。

[click] 第三方账号绑定功能让用户可以关联或解除GitHub账号。

[click] 账号安全设置也很重要。用户可以修改密码、绑定或更换手机号以及邮箱。
-->

---
transition: slide-up
layout: center
---

## 1.3 航班搜索模块

<v-clicks>

- 航班搜索：可选择单程/往返，选择座舱等级，出发地，到达地，出发日期，返程日期
- 航班搜索历史记录：跟踪用户过往搜索历史记录，通过点击快速重新搜索
- 搜索结果展示：可以按价格/飞行时间等排序，或者按照航司/座舱等级等进行筛选
- 快速日期价格查询（附近7天最低价）

</v-clicks>

<!--
第三个模块是航班搜索，这是我们系统的核心功能。

[click] 在搜索功能方面，我们支持单程和往返两种类型。用户可以选择座舱等级，比如经济舱、商务舱、头等舱，选择出发地和目的地，以及出发和返程日期。

[click] 我们实现了搜索历史记录功能。系统会自动保存用户的搜索条件，用户可以通过点击历史记录快速重新发起搜索，无需重复输入。同时还提供了简单的价格变化提示。

[click] 搜索结果展示页面提供了排序和筛选功能。用户可以按价格从低到高、按飞行时间从短到长等维度排序，也可以按航空公司、座舱等级进行筛选。

[click] 还有快速日期价格查询功能。当用户搜索某个航线时，系统会自动展示该日期前后7天的最低价格。用户可以一眼看到哪天出发最便宜，并通过点击等方式快速重新搜索附近日期其他机票。
-->

---
transition: slide-up
layout: center
---

## 1.4 订单管理模块

<v-clicks>

- 订单选购：从机票搜索结果页面，可以下单，并选择乘客信息、联系人信息（以接受订单信息）、增值服务并付款
- 订单详情：用户可以从个人后台跳转到订单页面查看详情
- 订单快速操作：对于待付款的订单，可以从订单详情页面跳转到付款界面或者主动取消待付款
- 座位锁定：在用户选择乘机人和联系人信息后锁定相应数量的座位
- 系统取消超时未付款订单：系统自动取消并结束流程，释放座位

</v-clicks>

<!--
最后一个模块是订单管理，这是机票预订流程的最后一环。

[click] 在订单选购环节，用户从搜索结果页面选择航班后，可以直接下单。系统会引导用户填写乘客信息，可以从常用旅客列表中快速选择，也可以临时添加新乘客。同时需要填写联系人信息，用于接收订单信息。我们还提供了多种增值服务，比如选座、行李额、保险等，用户可以根据需要选择。最后进入付款环节。

[click] 订单创建后，用户可以随时从个人后台进入订单详情页面。订单详情页面展示了完整的订单信息，包括航班信息、乘客信息、价格明细、订单状态等。用户可以清楚地了解每一笔订单的详细情况。

[click] 对于待付款的订单，我们提供了快速操作功能。用户可以直接从订单详情页跳转到支付页面完成付款，也可以选择取消订单。

[click] 为了防止超售，在用户选择乘机人和联系人信息后，系统会锁定相应数量的座位。

[click] 为了防止座位被未付款订单永久占用，我们实现了订单超时自动取消机制。如果用户在规定时间内（比如15分钟）没有完成付款，系统会自动取消订单并释放座位，让其他用户可以预订。
-->

---
transition: slide-left
layout: end
---

# 需求总结

我们总共梳理了xx个需求

<!--
以上就是我们已经完成的四大核心功能模块。可以看到，我们不仅实现了基本的业务功能，还在用户体验、数据安全、业务逻辑等方面做了充分的考虑。接下来让我们进入第二部分，看看支撑这些功能的技术体系。
-->

---
transition: slide-up
layout: section
---

# 二、测试框架设计

一个合理设计的测试框架才能够利用 TDD 驱动模型编写符合预期的代码

<!--
接下来是今天汇报的重点部分——开发者体验。这是我们与其他小组最大的差异化优势所在。我们不只是实现了功能，更建立了一套完整的工程化开发体系。这套体系不仅保证了代码质量，提升了开发效率，更重要的是，它展现了我们对软件工程的深刻理解。
-->

---
transition: slide-up
layout: two-cols-header
---

## 单元测试

::left::

<v-clicks>

- **测试对象**：纯函数、工具函数、类型验证、数据转换等
- **测试工具**：Vitest
- **测试重点**：
  - 纯函数的输入输出正确性
  - 边界条件和异常处理
  - 数据验证和转换逻辑
  - 不依赖外部服务的独立逻辑

</v-clicks>

::right::

<v-click>
```ts {*}{maxHeight:'500px'}
describe("Data Masking Utilities", () => {
  describe("maskDocumentNumber", () => {
    it("should mask a standard ID card number", () => {
      const idCard = "310115199001011234"; // 18 chars
      const masked = maskDocumentNumber(idCard);
      // First 4: "3101", Last 3: "234", Middle: 18-7=11 stars
      expect(masked).toBe("3101***********234");
      expect(masked.length).toBe(idCard.length);
    });
  });
});
```
</v-click>

<!--
当其他小组还在手动测试时，我们的每次提交都会自动触发完整的测试套件。当其他小组在讨论"这个组件长什么样"时，我们直接发一个Storybook链接。这就是工程化思维带来的效率提升。
-->

---
transition: slide-up
layout: two-cols-header
---

## Storybook 测试

::left::

<v-clicks>

- **测试对象**：UI 组件的视觉展示
- **测试工具**：Storybook + Play Function
- **测试重点**：
  - 每个组件的多种视觉状态（默认、加载、错误、禁用等）
  - 少量 Happy Path 的交互测试（使用 play 函数）
  - 组件的视觉一致性

</v-clicks>

::right::

<v-click>

```tsx {*}{maxHeight:'500px'}
export const HappyPath: Story = {
  render: () => (
    // ...
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter valid email address
    const emailInput = canvas.getByPlaceholderText("请输入邮箱地址");
    await userEvent.type(emailInput, "test@example.com", { delay: 50 });
    // 2. Enter password
    const passwordInput = canvas.getByPlaceholderText("请输入密码");
    await userEvent.type(passwordInput, "Password123", { delay: 50 });
    // 3. Agree to terms
    const termsCheckbox = canvas.getByRole("checkbox");
    await userEvent.click(termsCheckbox);
    // 4. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", { name: /登录/i });
    await expect(submitButton).toBeEnabled();
    // 5. Submit form
    await userEvent.click(submitButton);
  },
};
```

</v-click>

<!--
当其他小组还在手动测试时，我们的每次提交都会自动触发完整的测试套件。当其他小组在讨论"这个组件长什么样"时，我们直接发一个Storybook链接。这就是工程化思维带来的效率提升。
-->

---
transition: slide-up
layout: two-cols-header
---

## 组件测试

::left::

<v-clicks>

- **测试对象**：React 组件的交互和行为
- **测试工具**：React Testing Library (RTL) + Vitest
- **测试重点**：
  - 用户交互行为（点击、输入、选择等）
  - 组件状态变化
  - 条件渲染逻辑
  - 显示文本的正确性（防止回归错误）
  - **不测试**：CSS 样式

</v-clicks>

::right::

<v-click>

```ts {*}{maxHeight:'500px'}
describe("UserMenu Component", () => {
  describe("when user is logged in", () => {
    it("should display standardized text '尊敬的用户' instead of username", () => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        isPending: false,
      });

      render(<UserMenu />);

      // Should show "尊敬的用户" in collapsed state
      expect(screen.getByText("尊敬的用户")).toBeInTheDocument();

      // Should NOT show the actual username "张三" in collapsed state
      const usernameElements = screen.queryAllByText("张三");
      expect(usernameElements.length).toBe(0);
    });
  });
});
```

</v-click>

<!--
当其他小组还在手动测试时，我们的每次提交都会自动触发完整的测试套件。当其他小组在讨论"这个组件长什么样"时，我们直接发一个Storybook链接。这就是工程化思维带来的效率提升。
-->

---
transition: slide-up
layout: two-cols-header
---

## 集成测试

::left::

<v-clicks>

- **测试对象**：后端 Query、Service 层
- **测试工具**：Vitest + 测试数据库
- **测试重点**：
  - Query 函数的数据查询逻辑
  - Service 层的业务逻辑
  - 数据库事务和数据一致性

</v-clicks>

::right::

<v-click>

```ts {*}{maxHeight:'500px'}
it("should cancel expired orders and release seats", async () => {
  // Arrange: Create test environment
  const { seatClass, user: testUser } = await createTestFlightEnvironment();

  // Create an expired order (payment deadline 1 minute ago)
  const expiredOrder = expiredOrderFactory.build({
    userId: testUser.id,
    outboundFlightSeatClassId: seatClass.id,
    passengerCount: 2,
  });
  const [insertedExpiredOrder] = await db
    .insert(orders)
    .values(expiredOrder)
    .returning();

  // Lock 2 seats
  await db
    .update(flightSeatClasses)
    .set({ availableSeats: 98 }) // 100 - 2
    .where(eq(flightSeatClasses.id, seatClass.id));

  // Act: Cancel expired orders
  const result = await cancelExpiredOrders();

  // Assert: Should succeed
  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.data.cancelledCount).toBe(1);
    expect(result.data.releasedSeats).toBe(2);
  }

  // Verify: Order status should be CANCELLED
  const updatedOrder = await db.query.orders.findFirst({
    where: (orders, { eq }) => eq(orders.id, insertedExpiredOrder.id),
  });
  expect(updatedOrder?.status).toBe("CANCELLED");

  // Verify: Seats should be released (back to 100)
  const updatedSeatClass = await db.query.flightSeatClasses.findFirst({
    where: (seatClasses, { eq }) => eq(seatClasses.id, seatClass.id),
  });
  expect(updatedSeatClass?.availableSeats).toBe(100);
});
```

</v-click>

<!--
集成测试很好地展现了上课提到的 Arrange-Act-Assert 模式
-->

---
transition: slide-up
layout: two-cols-header
---

## 端到端测试

::left::

<v-clicks>

- **测试对象**：完整的用户流程
- **测试工具**：Playwright + 测试数据库
- **测试重点**：
  - 模拟真实用户操作流程
  - 跨页面的完整业务流程
  - Mock 外部服务（短信、邮件等）

</v-clicks>

::right::

<v-click>

```ts {*}{maxHeight:'500px'}
test("should navigate to /home/info when clicking UserMenu trigger area", async ({
  page,
}) => {
  // Find the UserMenu link by text "尊敬的用户"
  const userMenuLink = page.getByRole("link", { name: /尊敬的用户/i });

  // Verify link exists
  await expect(userMenuLink).toBeVisible();

  // Verify link has correct href
  await expect(userMenuLink).toHaveAttribute("href", "/home/info");

  // Click the link - use force to bypass HoverCard interaction
  await userMenuLink.click({ force: true });

  // Verify navigation to /home/info
  await expect(page).toHaveURL("/home/info");
});
```

</v-click>

<!--
端到端测试 etc
-->

---
transition: slide-left
layout: end
---

## 测试总结

```plaintext
TODO: 画一个测试框架金字塔模型

```

<!--
现在让我们看看我们的测试体系。 
这里总结一下前面的各种测试框架是如何配合的
-->

---
transition: slide-up
layout: section
---

# 三、AI生成失败

当然AI模型并不总是能生成完全符合我们预期的代码

<!--
让我详细介绍一下单元测试。这是一个邮件发送服务的测试示例。

[click] 首先，我们设置测试环境变量，模拟真实的配置。

[click] 然后，我们mock邮件发送API的响应，模拟成功发送的情况。

[click] 接着调用被测试的函数，并验证返回值和调用参数是否符合预期。这样我们就能确保邮件发送逻辑的正确性，而不需要真的发送邮件。

[click] 单元测试的优势在于快速、独立、可重复。我们可以在几秒钟内运行数百个单元测试，快速发现代码中的问题。
-->

---
transition: slide-up
layout: section
---

# 四、团队协作情况

为课程考核做准备

<!--
接下来进入第三部分——小组间协作。考虑到课程后续有两个环节：在其他组代码上增加功能，以及找bug。我们提前做了充分的准备，不仅是为了帮助其他组，也是为了展现我们的协作意识和工程思维。
-->

---

## 开发常见问题FAQ

我们组专门在开发过程中维护了一个特殊的 Issue [#106](https://github.com/ukeSJTU/nomad/issues/106)来记录开发过程中遇到的常见问题，以及相应的解决办法

<v-clicks>

### 目的

- 降低其他组的上手成本
- 尤其针对AI不方便解决的问题

### 内容覆盖

- 开发环境配置问题
- Next.js 15 框架问题
- 数据库相关问题
- 测试相关问题

</v-clicks>

<!--
我们创建了Issue #106，专门收录开发常见问题FAQ。

[click] 这个FAQ的目的是帮助其他组快速上手我们的项目。当他们在我们的代码基础上开发新功能时，可以快速找到常见问题的解决方案，降低上手成本。

[click] 同时，这也减少了重复问题的沟通成本。我们不需要一遍又一遍地回答相同的问题。

[click] 更重要的是，这展现了我们的文档意识。我们不只是为自己开发，也为其他人着想。

[click] FAQ的内容覆盖了开发环境配置、Next.js 15和Turbopack的常见坑、数据库相关问题、测试相关问题等各个方面。每个问题都包含详细的问题描述、重现步骤、解决方案和相关概念解释。
-->

---

# 常见安全漏洞清单

我们还维护了一个专门的 `high-risk.mdx` 文档帮助其他组自查代码，同时也是我们找bug的参考

<v-clicks>

### 目的

- AI模型容易考虑不周全的地方
- 帮助其他组自查代码安全性
- 为找bug环节提供参考

### 内容结构

- **P0级漏洞**（必考虑）：价格篡改、横向越权、输入验证、SQL注入等
- **P1级漏洞**（应考虑）：订单并发、状态机漏洞、支付倒计时等
- **P2级漏洞**（超纲）：CSRF、XSS、敏感数据加密

</v-clicks>

<!--
除了FAQ，我们还准备了High-Risk文档，这是一份常见安全漏洞清单。

[click] 这份文档的目的是多方面的。首先，它可以帮助其他组自查代码的安全性，在我们找bug之前就修复问题。

[click] 其次，它也是我们在找bug环节的参考指南，可以快速定位常见的安全漏洞。

[click] 更重要的是，这展现了我们对业务安全的重视。我们不只是实现功能，更关注系统的安全性和健壮性。

[click] 文档按照优先级分为三个等级：P0级是必须考虑的漏洞，如价格篡改、横向越权、输入验证、SQL注入等；P1级是应该考虑的漏洞，如订单并发、状态机漏洞、支付倒计时等；P2级是超纲的高级漏洞，如CSRF、XSS、敏感数据加密等。

每个漏洞都包含业务场景、漏洞描述、测试方法、正确实现方式和测试数据。
-->

---

# 价格篡改漏洞示例

<div class="grid grid-cols-2 gap-4">

<div>

### ❌ 错误实现

```typescript {all|3-5|all}
// 直接使用客户端传来的价格
POST /api/orders
{
  "flightId": "CA1234",
  "totalPrice": 1  // 篡改为1元
}

// 后端直接使用
await db.order.create({
  data: {
    totalPrice: request.body.totalPrice
  }
})
```

</div>

<div v-click>

### ✅ 正确实现

```typescript {all|2-5|7-10|all}
// 后端重新计算价格
const flight = await db.flight.findUnique({
  where: { id: flightId },
});
const actualPrice = flight.price * passengerCount;

await db.order.create({
  data: {
    totalPrice: actualPrice, // 使用计算的价格
  },
});
```

</div>

</div>

<!--
让我展示一个具体的安全漏洞示例——价格篡改。

[click] 错误的实现是直接使用客户端传来的价格。

[click] 恶意用户可以在请求中将价格篡改为1元，如果后端直接使用这个价格创建订单，就会造成严重的经济损失。

[click] 正确的实现是后端根据航班ID、舱位、乘客数量重新计算价格。

[click] 首先从数据库查询航班的真实价格。

[click] 然后计算实际应付金额，并使用这个计算出的价格创建订单，而不是使用客户端传来的价格。

[click] 这样就能有效防止价格篡改攻击。

High-Risk文档中的每个漏洞都有类似的详细说明，包括错误实现、正确实现、测试方法等。这不仅帮助其他组自查代码，也展现了我们对安全问题的深入理解。
-->

---
transition: fade
layout: default
---

顺着这一部分，我想简单再提几个，大家可能会发现AI实现的时候并没有考虑清楚：

- 0.1+0.2==0.3000000004，错误使用parseFloat来在前端进行价格计算精度问题
- 支付/发送验证码倒计时为纯前端实现，可以通过刷新轻易饶过

---
layout: end
---

# 谢谢大家

问答时间
