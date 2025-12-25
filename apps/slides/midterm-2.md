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
大家下午好，我们是 TODO 小组，选题是“携程平台”。今天我将为大家带来Nomad项目的第二次中期汇报。这次汇报的主题是"协作与进展"，我们不仅会展示项目的功能进展，更重要的是展示我们如何通过完善的测试框架来保证代码质量、提升开发效率，以及如何为后续的组间协作做好准备。
-->

---
layout: center
transition: slide-left
---

# 目录

<v-clicks>

1. **项目进度汇报** - 当前软件系统完成的情况
2. **测试框架设计** - 如何用良好的测试框架设计提高AI+TDD开发的效率
3. **AI生成失败案例** - 为何失败？如何解决？
4. **团队协作情况** - 我们是如何提高团队协作效率的

</v-clicks>

<!--
今天的汇报主要分为四个部分：

[click] 首先是项目进度汇报。我会简要介绍我们已经完成的四大核心功能模块，包括用户认证、用户后台、航班搜索和订单管理。

[click] 第二部分是测试框架设计，这是今天汇报的重点。我们建立了一套完整的测试体系，不仅保证了代码质量，更重要的是，它让我们能够充分利用AI辅助开发，同时又能及时发现AI生成代码中的问题。

[click] 第三部分是AI生成失败案例。我会分享两个典型的失败案例：CSS样式不一致和外部服务集成困难。这些案例展示了测试框架如何帮助我们发现AI的局限性，以及测试框架本身的局限性——有些问题需要人工介入才能解决。

[click] 第四部分是团队协作情况。考虑到课程后续有在其他组代码上增加功能和找bug的环节，我们提前准备了相关文档，帮助其他组快速上手我们的项目，同时也为我们找bug提供参考。

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

[click] 在登录方面，我们提供了四种组合方式：手机号加验证码、手机号加密码、邮箱加验证码、邮箱加密码。这种灵活的设计既保证了安全性，又兼顾了用户体验。

[click] 我们还集成了GitHub OAuth第三方登录，来替代携程平台上微信、QQ等社交账号登录方式。

[click] 考虑到用户可能忘记密码的场景，我们提供了完整的密码找回流程，支持通过手机号或邮箱重置密码。

[click] 为了防止恶意注册、暴力破解等安全威胁，我们集成了人机验证模块。在关键操作节点，比如注册、登录、发送验证码等场景，系统会要求用户完成人机验证，有效防止机器人攻击和恶意刷单行为，保障系统安全和服务质量。

[click] 特别值得一提的是，我们引入了真实的第三方服务：阿里云的短信服务用于发送验证码，Resend服务用于发送邮件。这两项功能目前还在调试中，希望能在下一次展示中稳定部署让大家体验。
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

[click] 在常用旅客信息管理中，用户可以预先保存乘客信息，订票时直接选择，无需重复输入。我们提供了完整的增删改查功能。

[click] 订单管理功能支持按状态分类查看订单，比如待付款、已完成、已取消等。用户可以快速查看历史订单，也可以删除不需要的订单记录。

[click] 第三方账号绑定功能让用户可以关联或解除GitHub账号。

[click] 账号安全设置也很重要。用户需要能够修改密码、绑定或更换手机号以及邮箱。
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

[click] 在订单选购环节，用户从搜索结果页面选择航班后，可以直接下单。系统会引导用户填写乘客信息，同时需要填写联系人信息，用于接收订单信息。我们还提供了多种增值服务，比如选座、行李额、保险等，用户可以根据需要选择。最后进入付款环节。

[click] 订单创建后，用户可以随时从个人后台进入订单详情页面。订单详情页面展示了完整的订单信息，包括航班信息、乘客信息、价格明细、订单状态等。用户可以清楚地了解每一笔订单的详细情况。

[click] 对于待付款的订单，我们提供了快速操作功能。用户可以直接从订单详情页跳转到支付页面完成付款，也可以选择取消订单。

[click] 为了防止超售，在用户选择乘机人和联系人信息后，系统会锁定相应数量的座位。

[click] 为了防止座位被未付款订单永久占用，需要实现订单超时自动取消机制。如果用户在规定时间内没有完成付款，系统会自动取消订单并释放座位，让其他用户可以预订。
-->

---
transition: slide-left
layout: center
---

# 项目进度总结

<v-clicks>

我们目前整理了总共 19 个需求

</v-clicks>

<!--
让我总结一下第一部分的内容。

[click] 在功能方面，我们已经完成了4个核心功能模块，实现了20多个用户故事，形成了从注册登录、搜索航班、下单支付到订单管理的完整业务流程闭环。

在技术方面，我们有几个亮点值得强调。

首先是多种认证方式。我们不仅支持传统的手机号和邮箱登录，还集成了GitHub OAuth第三方登录。所有密码都使用Better Auth框架进行加密存储。

其次是真实的第三方服务集成。我们引入了阿里云的短信服务和Resend的邮件服务，可以真正发送验证码和通知邮件。虽然目前还在调试中，但这展示了我们对生产级功能的追求。

第三是完善的数据验证。我们使用Zod schema对所有用户输入进行严格验证，确保数据的准确性和完整性。

最后是订单超时自动取消机制。我们实现了定时任务，自动取消超时未支付的订单并释放座位，防止座位被长期占用。

以上就是我们已经完成的功能。可以看到，我们不仅实现了基本的业务功能，还在用户体验、数据安全、业务逻辑等方面做了充分的考虑。接下来让我们进入第二部分，看看支撑这些功能的测试体系。
-->

---
transition: slide-up
layout: section
---

# 二、测试框架设计

如何用良好的测试框架提高AI+TDD开发效率

<!--
接下来是今天汇报的重点部分——测试框架设计。

我们不只是实现了功能，更建立了一套完整的测试体系。这套体系不仅保证了代码质量，提升了开发效率，更重要的是，它让我们能够充分利用AI辅助开发，同时又能及时发现AI生成代码中的问题。

接下来我将详细介绍我们的五层测试体系。
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

    it("should mask a passport number", () => {
      const passport = "E12345678";
      const masked = maskDocumentNumber(passport);
      expect(masked).toBe("E123**678");
    });
  });
});
```

</v-click>

<!--
首先是单元测试，这是测试金字塔的基础。

[click] 单元测试的对象是纯函数、工具函数、类型验证、数据转换等独立逻辑。

[click] 我们使用Vitest作为测试框架。

[click] 单元测试的重点是验证纯函数的输入输出正确性，测试边界条件和异常处理，确保数据验证和转换逻辑的准确性。

[click] 这是一个数据脱敏工具函数的测试示例。我们测试了身份证号和护照号的脱敏逻辑，确保敏感信息被正确地打码处理。比如18位身份证号，保留前4位和后3位，中间用星号替换。

单元测试的优势在于快速、独立、可重复。我们可以在几秒钟内运行数百个单元测试，快速发现代码中的问题。而且单元测试不依赖外部服务，非常稳定可靠。
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
第二层是Storybook测试。

[click] Storybook的主要作用是UI组件的视觉展示。我们可以看到每个组件在不同状态下的样子，比如默认状态、加载状态、错误状态、禁用状态等。

[click] 除了视觉展示，我们还使用Play Function实现了一些简单的交互测试，验证Happy Path场景。

[click] 

[click] 这是一个登录表单的Storybook测试示例。Play Function模拟了用户的完整操作流程：输入邮箱、输入密码、勾选同意条款、点击登录按钮。

Storybook的价值在于，它让我们可以独立地开发和测试UI组件，不需要启动整个应用。而且Storybook可以部署到GitHub Pages，团队成员可以直接在浏览器中查看所有组件的样子，非常方便协作。
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
第三层是组件测试。

[click] 组件测试的对象是React组件的交互和行为。

[click] 我们使用React Testing Library加Vitest进行测试。

[click] 组件测试的重点是用户交互行为，比如点击、输入、选择等，以及组件状态的变化和条件渲染逻辑。

[click] 这是一个用户菜单组件的测试示例。我们测试了当用户登录后，菜单应该显示"尊敬的用户"而不是用户的真实姓名。这是一个很细节的需求，但通过测试我们可以确保它不会被意外修改。

组件测试的价值在于，它从用户的角度验证组件的行为。我们不关心组件内部是如何实现的，只关心用户看到什么、能做什么。这种测试方式更接近真实的使用场景，能发现更多实际问题。
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
第四层是集成测试。

[click] 集成测试的对象是后端的Query和Service层。

[click] 我们使用Vitest加测试数据库进行测试。

[click] 集成测试的重点是验证Query函数的数据查询逻辑、Service层的业务逻辑，以及数据库事务和数据一致性。

[click] 这是一个订单超时自动取消的集成测试示例。这个测试很好地展现了上课提到的Arrange-Act-Assert模式。

首先是Arrange阶段，我们创建测试环境，包括航班、座位、用户等数据。然后创建一个已经超时的订单，并锁定2个座位。

接着是Act阶段，我们调用cancelExpiredOrders函数，这是被测试的业务逻辑。

最后是Assert阶段，我们验证结果。检查函数返回值是否正确，订单状态是否变为CANCELLED，座位是否被释放。

这个测试覆盖了一个完整的业务流程，包括数据库的读写、事务处理、业务逻辑等。它能发现很多单元测试无法发现的问题，比如数据库约束冲突、事务隔离级别问题等。
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
最后是端到端测试，也就是E2E测试。

[click] E2E测试的对象是完整的用户流程。

[click] 我们使用Playwright加测试数据库进行测试。

[click] E2E测试的重点是模拟真实用户操作流程，验证跨页面的完整业务流程。对于外部服务，比如短信、邮件等，我们会进行Mock，避免测试依赖外部服务。

[click] 这是一个简单的E2E测试示例。我们测试了用户点击"尊敬的用户"链接后，是否能正确跳转到个人信息页面。虽然这个测试看起来很简单，但它验证了导航栏组件、路由配置、页面渲染等多个环节的正确性。

E2E测试的价值在于，它能发现跨模块、跨页面的集成问题。比如路由配置错误、页面跳转失败、数据传递丢失等。这些问题在单元测试和组件测试中是无法发现的。

当然，E2E测试也有缺点，就是运行速度慢、维护成本高。所以我们只对核心业务流程编写E2E测试，比如注册登录、搜索航班、下单支付等。
-->

---
transition: slide-left
layout: center
---

## 测试框架 -> AI

```plaintext {lines:false}
                        ┌─────────────┐
                        │     E2E     │  ← 少量、慢速、高价值
                        │ Playwright  │
                        └──────┬──────┘
                    ┌──────────┴──────────┐
                    │     Integration     │  ← 中等数量、中等速度
                    │     Vitest + DB     │
                    └──────────┬──────────┘
                ┌──────────────┴──────────────┐
                │          Component          │  ← 较多数量、较快速度
                │    React Testing Library    │
                └──────────────┬──────────────┘
            ┌──────────────────┴──────────────────┐
            │              Storybook              │  ← 较多数量、快速
            └──────────────────┬──────────────────┘
        ┌──────────────────────┴──────────────────────┐
        │                     Unit                    │  ← 大量、极快速度、低成本
        └─────────────────────────────────────────────┘

```

<!--
现在让我总结一下我们的测试体系。这是一个经典的测试金字塔模型。

我们之所以设置这么多层次、多角度的测试框架就是为了能够更加准确的、以代码的形式给 AI 模型描述我们想要实现的需求。AI可以直接读取测试代码来理解需求，也可以运行相关测试来验证代码实现是否正确。

最底层是单元测试，使用Vitest框架。单元测试数量最多、运行速度最快、成本最低。它们测试纯函数、工具函数、数据转换等独立逻辑。我们可以在几秒钟内运行数百个单元测试。

第二层是Storybook测试。Storybook主要用于UI组件的视觉展示，我们可以看到每个组件在不同状态下的样子。同时，我们使用Play Function实现了一些简单的交互测试，验证Happy Path场景。

第三层是组件测试，使用React Testing Library。组件测试关注用户交互行为，比如点击、输入、选择等，以及组件状态的变化。它不测试CSS样式，而是测试组件的行为是否符合预期。

第四层是集成测试，使用Vitest加测试数据库。集成测试验证后端Query和Service层的业务逻辑，确保数据库事务和数据一致性。

最顶层是E2E测试，使用Playwright。E2E测试模拟真实用户操作，验证完整的业务流程。它的数量最少、运行速度最慢，但价值最高，因为它能发现跨页面、跨模块的问题。

这个金字塔模型确保了我们在不同层次都有充分的测试覆盖，既保证了代码质量，又控制了测试成本。
-->

---
transition: slide-up
layout: section
---

# 三、AI生成失败案例

测试框架如何帮助我们发现AI的局限性

<!--
接下来进入第三部分——AI生成失败案例。

前面我们介绍了完善的测试框架，但测试框架的价值不仅在于保证代码质量，更重要的是它能帮助我们发现AI生成代码的问题。

虽然我们大量使用AI辅助开发，但AI并不是万能的。在实际开发中，我们遇到了很多AI无法正确处理的问题。这一部分我将分享几个典型的失败案例，展示测试框架是如何帮助我们发现这些问题的，以及我们是如何解决的。
-->

---
transition: slide-up
layout: two-cols-header
---

## 案例1: CSS样式不一致

::left::

<v-click>

### 问题描述

AI生成的组件样式各不相同

```tsx
// 组件A
<h1 className="text-2xl font-bold">标题</h1>

// 组件B
<h1 className="text-3xl font-semibold">标题</h1>

// 组件C
<h1 className="text-xl font-bold">标题</h1>
```

</v-click>

<v-click>

### 为什么会这样？

- **缺少UI设计规范**：没有统一的设计稿
- **AI无法保持一致性**：每次生成都可能不同
- **组件测试不测CSS**：测试无法发现样式问题

</v-click>

::right::

<v-click>

### 当前解决方案

**手动调整 + Storybook视觉检查**

1. 在Storybook中查看所有组件
2. 发现样式不一致的地方
3. 手动统一调整

```tsx
// 统一后的标题样式
<h1 className="text-2xl font-bold">标题</h1>
```

### 未来改进方向

- 建立设计系统（Design System）
- 定义统一的样式变量
- 使用CSS-in-JS或Tailwind配置

</v-click>

<style>
.two-cols-header {
  column-gap: 20px;
}
</style>

<!--
第一个案例是CSS样式不一致问题。这是我们在使用AI开发过程中遇到的一个典型问题。

[click] AI生成的组件，每个组件的样式都不太一样。比如同样是标题，有的用text-2xl，有的用text-3xl，有的用text-xl。有的用font-bold，有的用font-semibold。

[click] 为什么会这样呢？有三个原因。

第一，我们缺少UI设计规范。因为这是课程项目，我们没有专门的UI设计环节，没有统一的设计稿。

第二，AI无法保持一致性。每次生成组件时，AI都会根据上下文做出不同的选择，无法记住之前用过的样式。

第三，我们的组件测试不测试CSS样式。前面提到，组件测试使用React Testing Library，它只测试行为，不测试样式。所以测试无法发现这个问题。

[click] 目前的解决方案是手动调整加Storybook视觉检查。我们在Storybook中查看所有组件，发现样式不一致的地方，然后手动统一调整。

未来的改进方向是建立设计系统，定义统一的样式变量，或者使用Tailwind的配置文件来约束样式选择。
-->

---
transition: slide-left
layout: two-cols-header
---

## 案例2: 外部服务集成困难

::left::

<v-click>

### 问题描述

Cloudflare Turnstile人机验证集成失败

```tsx
// AI生成的代码
<Turnstile
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
  onVerify={token => {
    setToken(token);
  }}
/>
```

</v-click>

<v-click>

### 为什么AI做不好？

- **调试信息难以获取**：浏览器控制台的错误信息
- **环境配置复杂**：开发/生产环境的密钥不同
- **文档理解困难**：Turnstile的官方文档很长
- **实时反馈缺失**：AI看不到实际运行效果

</v-click>

::right::

<v-click>

### 解决过程

**人工调试 + 反复测试**

1. 查看浏览器控制台错误
2. 阅读Cloudflare官方文档
3. 检查环境变量配置
4. 测试不同的集成方式
5. 最终找到正确的配置

```tsx
// 正确的实现
<Turnstile
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
  onVerify={token => {
    setToken(token);
  }}
  theme="light"
  size="normal"
  retry="auto"
/>
```

</v-click>

<style>
.two-cols-header {
  column-gap: 20px;
}
</style>

<!--
第二个案例是外部服务集成困难，以Cloudflare Turnstile人机验证为例。

[click] AI生成的代码看起来很简单，就是一个Turnstile组件，传入siteKey和onVerify回调。但实际运行时却报错，无法正常工作。

[click] 为什么AI做不好呢？有几个原因。

第一，调试信息难以获取。错误信息在浏览器控制台中，AI看不到。

第二，环境配置复杂。开发环境和生产环境需要不同的密钥，AI不知道如何正确配置。

第三，文档理解困难。Turnstile的官方文档很长，包含很多配置选项，AI很难准确理解哪些是必需的。

第四，实时反馈缺失。AI看不到实际运行效果，无法根据错误信息调整代码。

[click] 最终的解决过程需要人工介入。我们查看浏览器控制台的错误信息，阅读Cloudflare官方文档，检查环境变量配置，测试不同的集成方式，反复调试，最终找到了正确的配置。
-->

---
transition: slide-up
layout: section
---

# 四、团队协作情况

为其他组准备的开发文档和工具

<!--
接下来进入第四部分——团队协作情况。

考虑到课程后续有两个重要环节：第一是在其他组的代码基础上增加新功能，第二是找bug。我们提前做了一些准备。
-->

---
transition: slide-up
layout: two-cols-header
---

## 开发常见问题FAQ

我们维护了 Issue [#106](https://github.com/ukeSJTU/nomad/issues/106) 记录开发过程中的常见问题

::left::

<v-click>

### 为什么需要FAQ？

- **降低上手成本**
  - 其他组在我们代码上开发时快速找到解决方案
  - 减少重复问题的沟通成本

</v-click>

<v-click>

- **针对AI的局限性**
  - AI不了解项目特定配置
  - AI不擅长解决非代码问题

</v-click>

::right::

<v-click>

### 内容示例

**A1: Windows环境下Google Fonts解析问题**

- 问题描述、重现步骤
- 解决方案、相关概念

**B1: pnpm dev突然崩溃**

- dev和build进程冲突
- 如何正确重启开发服务器

**C1: 测试数据库Schema不同步**

- 开发库和测试库分离
- 使用pnpm db:push:test同步

</v-click>

<!--
我们为团队协作准备的第一个工具——Issue #106开发常见问题FAQ。

[click] 为什么需要这个FAQ呢？首先是为了降低其他组的上手成本。当他们在我们的代码基础上开发新功能时，可以快速找到常见问题的解决方案，而不需要反复询问我们。这也减少了重复问题的沟通成本。

[click] 其次，这个FAQ特别针对AI的局限性。AI不了解我们项目的特定配置，比如开发数据库和测试数据库是分离的。AI也不知道框架的一些新特性和坑。这些都是AI无法解决，需要人工经验的积累的问题。

[click] 让我展示几个具体的FAQ条目。

A1记录了Windows环境下Google Fonts解析问题，这是Next.js 15加Turbopack的一个已知bug，我们提供了详细的解决方案。

B1记录了pnpm dev突然崩溃的问题，原因是同时运行了pnpm build导致进程冲突，我们说明了如何正确重启开发服务器。

C1就是刚才提到的测试数据库Schema不同步问题，我们详细说明了原因和解决方案。

每个FAQ条目都包含问题描述、上下文症状、解决方案和相关概念，方便其他组快速理解和解决问题。
-->

---
transition: slide-up
layout: two-cols-header
---

## 常见安全漏洞清单

我们维护了 `high-risk.mdx` 文档帮助自查代码和找bug

::left::

<v-click>

### 为什么需要这个清单？

- **AI的安全盲区**
  - AI只关注功能实现
  - 忽略安全漏洞和边界情况
  - 不了解OTA平台的特殊风险

</v-click>

<v-click>

- **双向价值**
  - 帮助其他组自查代码安全性
  - 为我们找bug提供参考指南

</v-click>

::right::

<v-click>

### 内容结构

**P0级漏洞**（必考虑）

- 价格篡改、输入验证、横向越权
- 认证安全、敏感信息泄露
- 浮点数精度问题

**P1级漏洞**（应考虑）

- 订单并发、支付倒计时
- OTP安全、频率限制、退款逻辑

</v-click>

<!--
第二个工具是high-risk.mdx常见安全漏洞清单。

[click] 为什么需要这个清单？因为AI有明显的安全盲区。AI只关注功能实现，往往忽略安全漏洞和边界情况。当使用者没有考虑清楚的时候，这个漏洞更加明显。

[click] 这个清单有双向价值。一方面，它可以帮助其他组自查代码的安全性，在我们找bug之前就修复问题。另一方面，它也是我们在找bug环节的参考指南，可以快速定位常见的安全漏洞。

[click] 文档按照优先级分为多个等级。

P0级是必须考虑的漏洞，包括价格篡改、横向越权、输入验证、认证安全、敏感信息泄露，以及刚才提到的浮点数精度问题。

P1级是应该考虑的漏洞，包括订单并发、支付倒计时、频率限制、OTP安全、退款逻辑等。这些漏洞虽然不会立即造成严重后果，但我认为仍然是安全漏洞。

每个漏洞都包含业务场景、漏洞描述、测试方法、正确实现方式和测试数据，非常详细和实用。
-->

---
transition: slide-left
layout: two-cols-header
---

# 浮点数精度漏洞示例

::left::

<v-click>

### 错误实现

```typescript
// 使用parseFloat处理价格
const price1 = parseFloat("10.10");
const price2 = parseFloat("20.20");
const total = price1 + price2;
// total = 30.299999999999997 ❌

// 或者直接使用number类型
const ticketPrice = 0.1;
const tax = 0.2;
const finalPrice = ticketPrice + tax;
// finalPrice = 0.30000000000000004 ❌
```

</v-click>

<v-click>

### 后果

- 订单总价计算错误
- 支付金额与账单不符
- 财务对账困难

</v-click>

::right::

<v-click>

### 正确实现（方案A）

使用整数（分为单位）

```typescript
// 数据库: INTEGER类型
const price1InCents = 1010; // 10.10元 = 1010分
const price2InCents = 2020; // 20.20元 = 2020分
const totalInCents = price1InCents + price2InCents;
// totalInCents = 3030 ✓
const totalInYuan = totalInCents / 100; // 30.30元
```

</v-click>

<v-click>

### 正确实现（方案B）

使用Decimal库

```typescript
// 数据库: NUMERIC(10, 2)类型
import Decimal from "decimal.js";
const total = new Decimal("10.10").plus("20.20");
// total = "30.30" ✓
```

</v-click>

<style>
.two-cols-header {
  column-gap: 20px;
}
</style>

<!--
让我展示一个具体的安全漏洞示例——浮点数精度问题。这是P0级漏洞中最容易被忽视的一个。

[click] 左边是错误的实现。AI生成的代码经常使用parseFloat或直接使用JavaScript的number类型来处理价格。

[click] 它会导致订单总价计算错误、支付金额与账单不符等等问题。

[click] 我们组维护的文档不仅记录了问题的情景，还记录了正确的实现方案。

方案A是使用整数，以分为单位存储和计算。数据库使用INTEGER类型，所有计算都用整数算术，只在最后展示时才除以100转换为元。这样可以完全避免浮点数问题。

[click] 方案B是使用Decimal库。数据库使用NUMERIC类型，后端代码使用Decimal.js等高精度库来处理所有数学运算。

文档对于每个问题都记录了可能运用的业务场景，以及具体的漏洞描述。同时还附上了测试方法以及正确实现。
-->

---
layout: end
---

# 谢谢大家

问答时间

<!--
以上就是我们的第二次中期汇报。

谢谢大家，下面是问答环节。
-->
