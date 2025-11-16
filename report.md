# Nomad 项目代码梳理报告

## 一、测试框架分工说明

根据 TODO.md 中的测试框架设计，我们采用多层次、多维度的测试策略：

### 1. 单元测试 (Unit Tests)

- **测试对象**：纯函数、工具函数、类型验证、数据转换等
- **测试工具**：Vitest
- **测试位置**：与源文件同目录，文件名为 `*.test.ts` 或 `*.test.tsx`
- **测试重点**：
  - 纯函数的输入输出正确性
  - 边界条件和异常处理
  - 数据验证和转换逻辑
  - 不依赖外部服务的独立逻辑

### 2. Storybook 测试

- **测试对象**：UI 组件的视觉展示
- **测试工具**：Storybook + Play Function
- **测试位置**：`src/stories/` 目录下，文件名为 `*.stories.tsx`
- **测试重点**：
  - 每个组件的多种视觉状态（默认、加载、错误、禁用等）
  - 少量 Happy Path 的交互测试（使用 play 函数）
  - 组件的视觉一致性
  - **不测试**：复杂的业务逻辑、Server Actions

### 3. 组件测试 (Component Tests)

- **测试对象**：React 组件的交互和行为
- **测试工具**：React Testing Library (RTL) + Vitest
- **测试位置**：与组件文件同目录，文件名为 `*.test.tsx`
- **测试重点**：
  - 用户交互行为（点击、输入、选择等）
  - 组件状态变化
  - 条件渲染逻辑
  - 显示文本的正确性（防止回归错误）
  - **不测试**：CSS 样式

### 4. 集成测试 (Integration Tests)

- **测试对象**：后端 Query、Service 层
- **测试工具**：Vitest + 测试数据库
- **测试位置**：`tests/integration/` 目录
- **测试重点**：
  - Query 函数的数据查询逻辑
  - Service 层的业务逻辑
  - 数据库事务和数据一致性
  - **不测试**：Action 层（因为 Action 是控制器，主要做认证和调用 Service）

### 5. 端到端测试 (E2E Tests)

- **测试对象**：完整的用户流程
- **测试工具**：Playwright + 测试数据库
- **测试位置**：`tests/e2e/` 目录，文件名为 `*.spec.ts`
- **测试重点**：
  - 模拟真实用户操作流程
  - 跨页面的完整业务流程
  - Mock 外部服务（短信、邮件等）
  - 使用测试数据库，确保并行测试时数据隔离

---

## 二、功能需求梳理

### 场景 1：登录/注册功能

#### 1.1 用户注册

**功能描述**：

- 手机号注册
- 邮箱注册

**相关文件**：

**Pages**：

- `src/app/(frontend)/(without-sidebar)/auth/sign-up/page.tsx` - 注册页面

**Components**：

- `src/components/auth/forms/phone-verification.tsx` - 手机验证表单
- `src/components/auth/forms/email-verification.tsx` - 邮箱验证表单
- `src/components/auth/forms/password-setup.tsx` - 密码设置表单
- `src/components/auth/turnstile-widget.tsx` - Turnstile 验证码组件
- `src/components/auth/sign-up-modal.tsx` - 注册弹窗

**Queries**：

- 无（注册流程主要通过 Better-Auth 处理）

**Actions/Services**：

- `src/lib/auth.ts` - Better-Auth 配置和认证逻辑
- `src/lib/email.tsx` - 邮件发送服务
- `src/lib/sms.ts` - 短信发送服务
- `src/lib/turnstile.ts` - Turnstile 验证服务

**测试代码**：

- **单元测试**：
  - ✅ `src/lib/auth.test.ts` - 认证工具函数测试
  - ✅ `src/lib/email.test.ts` - 邮件服务测试
  - ✅ `src/lib/sms.test.ts` - 短信服务测试
  - ✅ `src/lib/turnstile.test.ts` - Turnstile 验证测试
- **Storybook**：
  - ✅ `src/stories/auth/forms/phone-verification-form.stories.tsx`
  - ✅ `src/stories/auth/forms/email-verification-form.stories.tsx`
  - ✅ `src/stories/auth/forms/password-setup-form.stories.tsx`
- **组件测试**：
  - ✅ `src/components/auth/forms/phone-verification.test.tsx`
  - ✅ `src/components/auth/forms/email-verification.test.tsx`
  - ✅ `src/components/auth/forms/password-setup.test.tsx`
  - ✅ `src/components/auth/sign-up-modal.test.tsx`
- **集成测试**：
  - ❌ **需要补充**：Better-Auth 注册流程的集成测试
- **端到端测试**：
  - ✅ `tests/e2e/auth/signup/phone.spec.ts` - 手机注册流程
  - ✅ `tests/e2e/auth/signup/email.spec.ts` - 邮箱注册流程

---

#### 1.2 用户登录

**功能描述**：

- 手机号 + 密码登录
- 手机号 + OTP 登录
- 邮箱 + 密码登录
- 邮箱 + OTP 登录
- GitHub OAuth 登录

**相关文件**：

**Pages**：

- `src/app/(frontend)/(without-sidebar)/auth/sign-in/page.tsx` - 登录页面

**Components**：

- `src/components/auth/forms/phone-login.tsx` - 手机密码登录表单
- `src/components/auth/forms/phone-otp-login.tsx` - 手机 OTP 登录表单
- `src/components/auth/forms/email-login.tsx` - 邮箱密码登录表单
- `src/components/auth/forms/email-otp-login.tsx` - 邮箱 OTP 登录表单
- `src/components/auth/turnstile-widget.tsx` - Turnstile 验证码组件

**Queries**：

- 无（登录流程主要通过 Better-Auth 处理）

**Actions/Services**：

- `src/lib/auth.ts` - Better-Auth 配置和认证逻辑
- `src/lib/email.tsx` - 邮件发送服务
- `src/lib/sms.ts` - 短信发送服务

**测试代码**：

- **单元测试**：
  - ✅ `src/lib/auth.test.ts`
  - ✅ `src/lib/email.test.ts`
  - ✅ `src/lib/sms.test.ts`
- **Storybook**：
  - ✅ `src/stories/auth/forms/phone-login-form.stories.tsx`
  - ✅ `src/stories/auth/forms/phone-otp-login-form.stories.tsx`
  - ✅ `src/stories/auth/forms/email-login-form.stories.tsx`
  - ✅ `src/stories/auth/forms/email-otp-login-form.stories.tsx`
- **组件测试**：
  - ✅ `src/components/auth/forms/phone-login.test.tsx`
  - ✅ `src/components/auth/forms/phone-otp-login.test.tsx`
  - ✅ `src/components/auth/forms/email-login.test.tsx`
  - ✅ `src/components/auth/forms/email-otp-login.test.tsx`
- **集成测试**：
  - ❌ **需要补充**：Better-Auth 登录流程的集成测试
- **端到端测试**：
  - ✅ `tests/e2e/auth/signin/phone.spec.ts` - 手机登录流程
  - ✅ `tests/e2e/auth/signin/email.spec.ts` - 邮箱登录流程

---

#### 1.3 用户找回密码

**功能描述**：

- 通过邮箱或手机号找回密码

**相关文件**：

**Pages**：

- ❌ **缺失**：目前没有找回密码页面

**Components**：

- ❌ **缺失**：需要创建找回密码相关组件

**Queries**：

- 无

**Actions/Services**：

- `src/lib/services/auth.ts` - 包含密码重置相关服务（如果实现）

**测试代码**：

- **所有测试**：❌ **待实现**（功能本身待实现）

---

### 场景 2：用户后台管理功能

#### 2.1 全局导航栏

**功能描述**：

- 侧边栏导航，跳转各种相关页面
- 用户菜单（头像、登出等）

**相关文件**：

**Pages**：

- `src/app/(frontend)/(with-sidebar)/layout.tsx` - 带侧边栏的布局
- `src/app/(frontend)/(without-sidebar)/home/layout.tsx` - 用户中心布局

**Components**：

- `src/components/common/app-sidebar.tsx` - 应用侧边栏
- `src/components/common/header.tsx` - 页面头部
- `src/components/common/user-menu.tsx` - 用户菜单
- `src/components/auth/user-sidebar.tsx` - 用户侧边栏

**Queries**：

- `src/lib/queries/user.ts` - 获取用户信息

**Actions/Services**：

- 无（主要是展示组件）

**测试代码**：

- **单元测试**：
  - 无需要

- **Storybook**：
  - ✅ `src/stories/common/user-menu.stories.tsx`

- **组件测试**：
  - ✅ `src/components/common/user-menu.test.tsx`

- **集成测试**：
  - ❌ **需要补充**：用户信息查询的集成测试

- **端到端测试**：
  - ✅ `tests/e2e/user-menu.spec.ts` - 用户菜单交互测试

---

#### 2.2 用户个人信息

**功能描述**：

- 查看个人信息（昵称、姓名、性别、生日等）
- 编辑个人信息

**相关文件**：

**Pages**：

- `src/app/(frontend)/(without-sidebar)/home/info/page.tsx` - 个人信息页面

**Components**：

- `src/components/user/user-info-form.tsx` - 用户信息表单

**Queries**：

- `src/lib/queries/user.ts` - `getUserInfo()` 获取用户信息

**Actions/Services**：

- `src/lib/actions/user.ts` - `updateUserInfoAction()` 更新用户信息
- `src/lib/services/user.ts` - `updateUserInfo()` 用户信息更新服务

**测试代码**：

- **单元测试**：
  - ✅ `src/types/user.test.ts` - 用户类型验证测试

- **Storybook**：
  - ❌ **需要补充**：用户信息表单的 Storybook

- **组件测试**：
  - ❌ **需要补充**：用户信息表单的组件测试

- **集成测试**：
  - ❌ **需要补充**：用户信息查询和更新的集成测试

- **端到端测试**：
  - ❌ **需要补充**：用户信息编辑流程的端到端测试

---

#### 2.3 用户账号绑定

**功能描述**：

- 查看当前绑定的社交账号（GitHub 等）
- 解除绑定
- 去绑定新账号

**相关文件**：

**Pages**：

- `src/app/(frontend)/(without-sidebar)/home/accounts/page.tsx` - 账号绑定页面

**Components**：

- `src/components/auth/social-account-card.tsx` - 社交账号卡片
- `src/components/auth/unlink-button.tsx` - 解绑按钮
- `src/components/auth/link-button.tsx` - 绑定按钮

**Queries**：

- `src/lib/queries/user.ts` - `getSocialAccounts()` 获取社交账号列表

**Actions/Services**：

- `src/lib/actions/auth.ts` - `unlinkAccountAction()` 解绑账号
- `src/lib/services/auth.ts` - `unlinkSocialAccount()` 解绑服务

**测试代码**：

- **单元测试**：
  - 无需要

- **Storybook**：
  - ✅ `src/stories/auth/social-account-card.stories.tsx`

- **组件测试**：
  - ❌ **需要补充**：社交账号卡片的组件测试

- **集成测试**：
  - ✅ `tests/integration/services/auth.integration.test.ts` - 包含解绑账号测试

- **端到端测试**：
  - ❌ **需要补充**：账号绑定/解绑流程的端到端测试

---

#### 2.4 用户账户安全

**功能描述**：

- 绑定/修改手机号
- 绑定/修改邮箱
- 修改密码

**相关文件**：

**Pages**：

- `src/app/(frontend)/(without-sidebar)/home/security/page.tsx` - 账户安全主页
- `src/app/(frontend)/(without-sidebar)/home/security/phone/page.tsx` - 修改手机号页面
- `src/app/(frontend)/(without-sidebar)/home/security/phone/page.client.tsx` - 修改手机号客户端组件
- `src/app/(frontend)/(without-sidebar)/home/security/email/page.tsx` - 修改邮箱页面
- `src/app/(frontend)/(without-sidebar)/home/security/email/page.client.tsx` - 修改邮箱客户端组件
- `src/app/(frontend)/(without-sidebar)/home/security/password/page.tsx` - 修改密码页面
- `src/app/(frontend)/(without-sidebar)/home/security/password/page.client.tsx` - 修改密码客户端组件

**Components**：

- `src/components/security/update-phone-form.tsx` - 更新手机号表单
- `src/components/security/update-email-form.tsx` - 更新邮箱表单
- `src/components/security/change-password-form.tsx` - 修改密码表单

**Queries**：

- `src/lib/queries/user.ts` - `getUserSecurityStatus()` 获取用户安全状态

**Actions/Services**：

- `src/lib/actions/auth.ts` - `updatePhoneNumberAction()`, `updateEmailAction()`, `changePasswordAction()`, `setPasswordAction()`
- `src/lib/services/auth.ts` - `updatePhoneNumber()`, `updateEmail()`, `changePassword()`, `setPasswordForOAuthUser()`

**测试代码**：

- **单元测试**：
  - 无需要

- **Storybook**：
  - ✅ `src/stories/security/update-phone-form.stories.tsx`
  - ✅ `src/stories/security/update-email-form.stories.tsx`
  - ✅ `src/stories/security/change-password-form.stories.tsx`

- **组件测试**：
  - ❌ **需要补充**：安全表单的组件测试

- **集成测试**：
  - ✅ `tests/integration/services/auth.integration.test.ts` - 包含密码修改、手机号/邮箱更新测试

- **端到端测试**：
  - ❌ **需要补充**：账户安全设置流程的端到端测试

---

#### 2.5 常用旅客信息

**功能描述**：

- 查看常用旅客列表
- 新增常用旅客
- 编辑常用旅客
- 删除常用旅客
- 查看旅客详情

**相关文件**：

**Pages**：

- `src/app/(frontend)/(without-sidebar)/home/passengers/page.tsx` - 旅客列表页面
- `src/app/(frontend)/(without-sidebar)/home/passengers/new/page.tsx` - 新增旅客页面
- `src/app/(frontend)/(without-sidebar)/home/passengers/[id]/page.tsx` - 旅客详情页面
- `src/app/(frontend)/(without-sidebar)/home/passengers/[id]/edit/page.tsx` - 编辑旅客页面

**Components**：

- `src/components/passengers/passengers-page-client.tsx` - 旅客列表页面客户端组件
- `src/components/passengers/passengers-data-table.tsx` - 旅客数据表格
- `src/components/passengers/passenger-list.tsx` - 旅客列表
- `src/components/passengers/new-passenger-client.tsx` - 新增旅客客户端组件
- `src/components/passengers/edit-passenger-client.tsx` - 编辑旅客客户端组件
- `src/components/passengers/passenger-detail-view.tsx` - 旅客详情视图
- `src/components/passengers/forms/passenger-form.tsx` - 旅客表单

**Queries**：

- `src/lib/queries/passengers.ts` - `getPassengers()` 获取旅客列表

**Actions/Services**：

- `src/lib/actions/passengers.ts` - `createPassengerAction()`, `updatePassengerAction()`, `deletePassengerAction()`, `batchDeletePassengersAction()`
- `src/lib/services/passengers.ts` - `createPassenger()`, `updatePassenger()`, `deletePassenger()`, `batchDeletePassengers()`, `getPassenger()`

**测试代码**：

- **单元测试**：
  - ✅ `src/hooks/use-passenger-forms.test.ts` - 旅客表单 Hook 测试
  - ✅ `src/lib/schema/passengers.test.ts` - 旅客数据模型测试

- **Storybook**：
  - ✅ `src/stories/passengers/passenger-form.stories.tsx`

- **组件测试**：
  - ✅ `src/components/passengers/forms/passenger-form.test.tsx`
  - ✅ `src/components/passengers/passenger-detail-view.test.tsx`

- **集成测试**：
  - ✅ `tests/integration/queries/passengers.integration.test.ts` - 旅客查询集成测试
  - ✅ `tests/integration/services/passengers.integration.test.ts` - 旅客服务集成测试
  - ✅ `tests/integration/actions/delete-passenger.integration.test.ts` - 删除旅客集成测试

- **端到端测试**：
  - ❌ **需要补充**：旅客管理完整流程的端到端测试

---

#### 2.6 用户查看"我的订单"

**功能描述**：

- 按类别查看订单（全部、待支付、已完成、已取消）
- 删除订单记录
- 点击跳转订单详情页面

**相关文件**：

**Pages**：

- `src/app/(frontend)/(without-sidebar)/home/orders/page.tsx` - 我的订单页面
- `src/app/(frontend)/(without-sidebar)/home/orders/page.client.tsx` - 我的订单客户端组件
- `src/app/(frontend)/(with-sidebar)/orders/[orderId]/page.tsx` - 订单详情页面
- `src/app/(frontend)/(with-sidebar)/orders/[orderId]/page.client.tsx` - 订单详情客户端组件

**Components**：

- `src/components/flights/orders/order-status-card.tsx` - 订单状态卡片
- `src/components/flights/orders/order-flight-info.tsx` - 订单航班信息
- `src/components/flights/orders/order-passenger-info.tsx` - 订单旅客信息
- `src/components/flights/orders/order-contact-info.tsx` - 订单联系人信息
- `src/components/flights/orders/order-payment-details.tsx` - 订单支付详情
- `src/components/common/data-table-with-actions.tsx` - 带操作的数据表格

**Queries**：

- `src/lib/queries/orders.ts` - `getOrdersByUserId()`, `getOrderById()`, `getOrderDetailById()`
- `src/app/(frontend)/(with-sidebar)/orders/[orderId]/queries.ts` - 订单详情页面专用查询

**Actions/Services**：

- `src/lib/actions/orders.ts` - `deleteOrderAction()`, `cancelOrderAction()`
- `src/lib/services/orders.ts` - `cancelOrder()`, `cancelExpiredOrders()`

**测试代码**：

- **单元测试**：
  - ✅ `src/components/flights/orders/utils.ts` - 订单工具函数（如果有测试）

- **Storybook**：
  - ✅ `src/stories/flights/orders/order-status-card.stories.tsx`
  - ✅ `src/stories/flights/orders/order-flight-info.stories.tsx`
  - ✅ `src/stories/flights/orders/order-passenger-info.stories.tsx`
  - ✅ `src/stories/flights/orders/order-contact-info.stories.tsx`
  - ✅ `src/stories/flights/orders/order-payment-details.stories.tsx`

- **组件测试**：
  - ❌ **需要补充**：订单相关组件的组件测试

- **集成测试**：
  - ✅ `tests/integration/services/orders.integration.test.ts` - 订单服务集成测试

- **端到端测试**：
  - ❌ **需要补充**：订单查看和管理流程的端到端测试

---

### 场景 3：机票功能

#### 3.1 机票搜索页面

**功能描述**：

- 选择出发城市和到达城市
- 选择出发日期（单程/往返）
- 选择乘客数量
- 查看搜索历史
- 快速日期选择（查看不同日期的价格）

**相关文件**：

**Pages**：

- `src/app/(frontend)/(with-sidebar)/flights/page.tsx` - 机票首页（搜索页面）
- `src/app/(frontend)/(with-sidebar)/flights/page.client.tsx` - 机票首页客户端组件
- `src/app/(frontend)/(with-sidebar)/flights/search/page.tsx` - 搜索结果页面
- `src/app/(frontend)/(with-sidebar)/flights/search/page.client.tsx` - 搜索结果客户端组件

**Components**：

- `src/components/flights/search/search-form.tsx` - 搜索表单
- `src/components/flights/search/city-selector.tsx` - 城市选择器
- `src/components/flights/search/date-selector.tsx` - 日期选择器
- `src/components/flights/search/quick-date-selector.tsx` - 快速日期选择器
- `src/components/flights/search/search-history.tsx` - 搜索历史
- `src/components/flights/results/flight-card.tsx` - 航班卡片
- `src/components/flights/results/flight-card-skeleton.tsx` - 航班卡片骨架屏
- `src/components/flights/results/flight-filter-sort.tsx` - 航班筛选排序

**Queries**：

- `src/lib/queries/flights.ts` - `searchFlights()`, `getFlightById()`
- `src/lib/queries/cities.ts` - `getCities()` 获取城市列表
- `src/lib/queries/flight-search-history.ts` - `getFlightSearchHistory()` 获取搜索历史

**Actions/Services**：

- `src/lib/actions/flight-search-history.ts` - `saveFlightSearchHistoryAction()`, `deleteFlightSearchHistoryAction()`
- `src/lib/actions/quick-date-prices.ts` - `getQuickDatePricesAction()` 获取快速日期价格

**测试代码**：

- **单元测试**：
  - ✅ `src/lib/queries/flights.test.ts` - 航班查询测试
  - ✅ `src/lib/queries/flight-search-history.test.ts` - 搜索历史查询测试
  - ✅ `src/lib/schema/flights.test.ts` - 航班数据模型测试
  - ✅ `src/lib/schema/cities.test.ts` - 城市数据模型测试
  - ✅ `src/lib/schema/airports.test.ts` - 机场数据模型测试
  - ✅ `src/lib/schema/airlines.test.ts` - 航空公司数据模型测试
  - ✅ `src/lib/schema/flight-seat-classes.test.ts` - 座位等级数据模型测试
  - ✅ `src/utils/flight.test.ts` - 航班工具函数测试
  - ✅ `src/utils/date.test.ts` - 日期工具函数测试

- **Storybook**：
  - ✅ `src/stories/flights/search/city-selector.stories.tsx`
  - ✅ `src/stories/flights/search/date-selector.stories.tsx`
  - ✅ `src/stories/flights/search/search-history.stories.tsx`
  - ✅ `src/stories/flights/results/flight-card.stories.tsx`

- **组件测试**：
  - ❌ **需要补充**：搜索表单和结果展示组件的组件测试

- **集成测试**：
  - ❌ **需要补充**：航班搜索和历史记录的集成测试

- **端到端测试**：
  - ❌ **需要补充**：机票搜索完整流程的端到端测试

---

#### 3.2 机票预订流程

**功能描述**：

- 填写旅客信息（可从常用旅客选择）
- 填写联系人信息
- 选择附加服务（行李、餐食等）
- 支付订单
- 查看订单确认

**相关文件**：

**Pages**：

- `src/app/(frontend)/(without-sidebar)/flights/booking/layout.tsx` - 预订流程布局
- `src/app/(frontend)/(without-sidebar)/flights/booking/passengers/page.tsx` - 旅客信息页面
- `src/app/(frontend)/(without-sidebar)/flights/booking/passengers/page.client.tsx` - 旅客信息客户端组件
- `src/app/(frontend)/(without-sidebar)/flights/booking/ancillary/page.tsx` - 附加服务页面
- `src/app/(frontend)/(without-sidebar)/flights/booking/ancillary/page.client.tsx` - 附加服务客户端组件
- `src/app/(frontend)/(without-sidebar)/flights/booking/payment/page.tsx` - 支付页面
- `src/app/(frontend)/(without-sidebar)/flights/booking/payment/page.client.tsx` - 支付客户端组件
- `src/app/(frontend)/(without-sidebar)/flights/booking/confirmation/page.tsx` - 订单确认页面
- `src/app/(frontend)/(without-sidebar)/flights/booking/confirmation/page.client.tsx` - 订单确认客户端组件

**Components**：

- `src/components/flights/booking/passenger-form-card.tsx` - 旅客表单卡片
- `src/components/flights/booking/contact-info-card.tsx` - 联系人信息卡片
- `src/components/flights/booking/flight-summary-card.tsx` - 航班摘要卡片
- `src/components/flights/booking/ancillary-selection.tsx` - 附加服务选择
- `src/components/common/stepper.tsx` - 步骤条组件

**Queries**：

- `src/app/(frontend)/(without-sidebar)/flights/booking/passengers/queries.ts` - 旅客页面查询
- `src/app/(frontend)/(without-sidebar)/flights/booking/ancillary/queries.ts` - 附加服务页面查询
- `src/app/(frontend)/(without-sidebar)/flights/booking/payment/queries.ts` - 支付页面查询
- `src/app/(frontend)/(without-sidebar)/flights/booking/confirmation/queries.ts` - 确认页面查询
- `src/lib/queries/passengers.ts` - 获取常用旅客

**Actions/Services**：

- `src/lib/actions/orders.ts` - `createOrderAction()` 创建订单
- `src/lib/actions/payments.ts` - `processPaymentAction()` 处理支付

**测试代码**：

- **单元测试**：
  - 无特定需要

- **Storybook**：
  - ✅ `src/stories/flights/booking/passenger-form-card.stories.tsx`
  - ✅ `src/stories/flights/booking/contact-info-card.stories.tsx`
  - ✅ `src/stories/flights/booking/flight-summary-card.stories.tsx`
  - ✅ `src/stories/flights/booking/ancillary-selection.stories.tsx`
  - ✅ `src/stories/common/stepper.stories.tsx`

- **组件测试**：
  - ❌ **需要补充**：预订流程组件的组件测试

- **集成测试**：
  - ❌ **需要补充**：订单创建和支付的集成测试

- **端到端测试**：
  - ❌ **需要补充**：完整预订流程的端到端测试

---

#### 3.3 其他机票相关功能

**功能描述**：

- 航班动态查询
- 选座服务
- 退改签服务
- 特殊服务申请
- 更多服务

**相关文件**：

**Pages**：

- `src/app/(frontend)/(with-sidebar)/flights/status/page.tsx` - 航班动态页面
- `src/app/(frontend)/(with-sidebar)/flights/seat/page.tsx` - 选座服务页面
- `src/app/(frontend)/(with-sidebar)/flights/refund/page.tsx` - 退改签页面
- `src/app/(frontend)/(with-sidebar)/flights/special/page.tsx` - 特殊服务页面
- `src/app/(frontend)/(with-sidebar)/flights/more/page.tsx` - 更多服务页面

**Components**：

- `src/components/common/construction.tsx` - 施工中占位组件（部分功能使用）

**Queries**：

- 待实现

**Actions/Services**：

- 待实现

**测试代码**：

- **所有测试**：❌ **待实现**（大部分功能处于施工中状态）

---

### 场景 4：其他功能

#### 4.1 法律文档页面

**功能描述**：

- 隐私政策
- 服务条款
- 免责声明

**相关文件**：

**Pages**：

- `src/app/(frontend)/(without-sidebar)/(legal)/privacy/page.tsx` - 隐私政策
- `src/app/(frontend)/(without-sidebar)/(legal)/terms/page.tsx` - 服务条款
- `src/app/(frontend)/(without-sidebar)/(legal)/disclaimer/page.tsx` - 免责声明

**Components**：

- 无（使用 MDX 文件）

**Queries**：

- 无

**Actions/Services**：

- 无

**测试代码**：

- **单元测试**：
  - 无需要

- **Storybook**：
  - 无需要

- **组件测试**：
  - 无需要

- **集成测试**：
  - 无需要

- **端到端测试**：
  - ✅ `tests/e2e/legal/legal-pages.spec.ts` - 法律页面访问测试

---

#### 4.2 API 路由

**功能描述**：

- Better-Auth 认证 API
- 健康检查 API
- 定时任务 API（取消过期订单）
- AI 聊天 API

**相关文件**：

**API Routes**：

- `src/app/api/auth/[...all]/route.ts` - Better-Auth 认证路由
- `src/app/api/health/route.ts` - 健康检查路由
- `src/app/api/cron/cancel-expiration/route.ts` - 取消过期订单定时任务
- `src/app/api/chat/route.ts` - AI 聊天路由

**测试代码**：

- **单元测试**：
  - ✅ `src/types/api/health.test.ts` - 健康检查 API 类型测试
  - ✅ `src/types/api/response.test.ts` - API 响应类型测试

- **集成测试**：
  - ❌ **需要补充**：API 路由的集成测试

- **端到端测试**：
  - ❌ **需要补充**：API 端点的端到端测试

---

#### 4.3 开发工具

**功能描述**：

- 用户切换工具（开发环境）
- 日志记录工具
- 数据脱敏工具

**相关文件**：

**Components**：

- `src/components/common/dev-user-switcher.tsx` - 开发环境用户切换器

**Utils**：

- `src/utils/logger.ts` - 日志记录工具
- `src/utils/mask-data.ts` - 数据脱敏工具

**Actions**：

- `src/lib/actions/dev-tools.ts` - 开发工具相关 Actions

**测试代码**：

- **单元测试**：
  - ✅ `src/utils/logger.test.ts` - 日志工具测试
  - ✅ `src/utils/mask-data.test.ts` - 数据脱敏测试

- **其他测试**：
  - 无需要（开发工具）

---

## 三、测试覆盖情况总结

### 3.1 已有测试统计

#### 单元测试（Unit Tests）

**总计：37 个测试文件**

- **类型和数据模型**：9 个
  - `src/types/user.test.ts`
  - `src/types/auth.test.ts`
  - `src/types/api/response.test.ts`
  - `src/types/api/health.test.ts`
  - `src/lib/schema/airlines.test.ts`
  - `src/lib/schema/airports.test.ts`
  - `src/lib/schema/flights.test.ts`
  - `src/lib/schema/flight-seat-classes.test.ts`
  - `src/lib/schema/cities.test.ts`
  - `src/lib/schema/flight-search-history.test.ts`
  - `src/lib/schema/passengers.test.ts`

- **工具函数**：8 个
  - `src/utils/date.test.ts`
  - `src/utils/mask-data.test.ts`
  - `src/utils/flight.test.ts`
  - `src/utils/logger.test.ts`
  - `src/lib/utils.test.ts`
  - `src/lib/utils/currency.test.ts`
  - `src/lib/utils/cron-auth.test.ts`

- **服务和业务逻辑**：6 个
  - `src/lib/auth.test.ts`
  - `src/lib/turnstile.test.ts`
  - `src/lib/email.test.ts`
  - `src/lib/sms.test.ts`
  - `src/lib/queries/flights.test.ts`
  - `src/lib/queries/flight-search-history.test.ts`

- **Hooks**：1 个
  - `src/hooks/use-passenger-forms.test.ts`

#### Storybook 测试

**总计：31 个 Story 文件**

- **认证相关**：8 个
- **机票相关**：13 个
- **旅客管理**：1 个
- **安全设置**：3 个
- **通用组件**：2 个
- **表单组件**：4 个

#### 组件测试（Component Tests）

**总计：12 个测试文件**

- **认证表单**：7 个
- **旅客管理**：2 个
- **通用组件**：2 个
- **邮件组件**：1 个

#### 集成测试（Integration Tests）

**总计：5 个测试文件**

- `tests/integration/services/auth.integration.test.ts` - 认证服务
- `tests/integration/services/passengers.integration.test.ts` - 旅客服务
- `tests/integration/services/orders.integration.test.ts` - 订单服务
- `tests/integration/queries/passengers.integration.test.ts` - 旅客查询
- `tests/integration/actions/delete-passenger.integration.test.ts` - 删除旅客

#### 端到端测试（E2E Tests）

**总计：6 个测试文件**

- `tests/e2e/auth/signup/phone.spec.ts` - 手机注册
- `tests/e2e/auth/signup/email.spec.ts` - 邮箱注册
- `tests/e2e/auth/signin/phone.spec.ts` - 手机登录
- `tests/e2e/auth/signin/email.spec.ts` - 邮箱登录
- `tests/e2e/legal/legal-pages.spec.ts` - 法律页面
- `tests/e2e/user-menu.spec.ts` - 用户菜单

---

### 3.2 需要补充的测试

#### 高优先级（核心业务流程）

1. **用户个人信息管理**
   - ❌ 用户信息表单的 Storybook
   - ❌ 用户信息表单的组件测试
   - ❌ 用户信息查询和更新的集成测试
   - ❌ 用户信息编辑流程的端到端测试

2. **账户安全设置**
   - ❌ 安全表单的组件测试
   - ❌ 账户安全设置流程的端到端测试

3. **社交账号绑定**
   - ❌ 社交账号卡片的组件测试
   - ❌ 账号绑定/解绑流程的端到端测试

4. **旅客管理**
   - ❌ 旅客管理完整流程的端到端测试

5. **订单管理**
   - ❌ 订单相关组件的组件测试
   - ❌ 订单查看和管理流程的端到端测试

6. **机票搜索**
   - ❌ 搜索表单和结果展示组件的组件测试
   - ❌ 航班搜索和历史记录的集成测试
   - ❌ 机票搜索完整流程的端到端测试

7. **机票预订**
   - ❌ 预订流程组件的组件测试
   - ❌ 订单创建和支付的集成测试
   - ❌ 完整预订流程的端到端测试

#### 中优先级（辅助功能）

8. **Better-Auth 集成**
   - ❌ Better-Auth 注册流程的集成测试
   - ❌ Better-Auth 登录流程的集成测试

9. **用户查询**
   - ❌ 用户信息查询的集成测试

10. **API 路由**
    - ❌ API 路由的集成测试
    - ❌ API 端点的端到端测试

#### 低优先级（待实现功能）

11. **找回密码功能**
    - ❌ 所有测试（功能本身待实现）

12. **其他机票功能**
    - ❌ 所有测试（航班动态、选座、退改签等功能处于施工中）

---

## 四、项目架构总结

### 4.1 分层架构

项目采用清晰的分层架构：

1. **表现层（Presentation Layer）**
   - Pages：`src/app/(frontend)/` - Next.js App Router 页面
   - Components：`src/components/` - React 组件

2. **控制层（Controller Layer）**
   - Actions：`src/lib/actions/` - Next.js Server Actions（薄控制器）
   - 职责：认证、调用 Service、处理 Next.js 特定逻辑

3. **业务逻辑层（Business Logic Layer）**
   - Services：`src/lib/services/` - 纯业务逻辑（无框架依赖）
   - 职责：核心业务规则、数据验证、事务处理

4. **数据访问层（Data Access Layer）**
   - Queries：`src/lib/queries/` - 数据查询函数
   - Schema：`src/lib/schema/` - Drizzle ORM 数据模型
   - 职责：数据库操作、数据转换

5. **工具层（Utility Layer）**
   - Utils：`src/utils/` - 通用工具函数
   - Hooks：`src/hooks/` - React Hooks
   - Types：`src/types/` - TypeScript 类型定义

### 4.2 测试策略优势

当前的测试框架设计具有以下优势：

1. **多层次覆盖**：从单元到端到端，全方位保障代码质量
2. **职责分离**：每种测试类型专注于特定层面，避免重复
3. **易于维护**：Service 层无框架依赖，易于独立测试
4. **快速反馈**：单元测试快速，集成测试中等，端到端测试完整
5. **视觉保障**：Storybook 确保 UI 一致性

### 4.3 改进建议

1. **补充缺失的测试**：优先补充高优先级的测试用例
2. **提高集成测试覆盖**：特别是 Query 和 Service 层
3. **完善端到端测试**：覆盖核心业务流程
4. **建立测试规范**：确保新功能开发时同步编写测试
5. **持续集成**：在 CI/CD 中运行所有测试，确保代码质量

---

## 五、文件组织结构

### 5.1 核心目录说明

```
src/
├── app/                          # Next.js App Router
│   ├── (frontend)/              # 前端应用
│   │   ├── (with-sidebar)/     # 带侧边栏的页面（机票、订单）
│   │   └── (without-sidebar)/  # 无侧边栏的页面（认证、用户中心）
│   └── api/                     # API 路由
├── components/                   # React 组件
│   ├── auth/                    # 认证相关组件
│   ├── flights/                 # 机票相关组件
│   ├── passengers/              # 旅客管理组件
│   ├── security/                # 安全设置组件
│   ├── user/                    # 用户信息组件
│   └── common/                  # 通用组件
├── lib/                         # 核心业务逻辑
│   ├── actions/                 # Server Actions（控制器）
│   ├── services/                # 业务服务（纯逻辑）
│   ├── queries/                 # 数据查询
│   ├── schema/                  # 数据模型
│   └── utils/                   # 工具函数
├── stories/                     # Storybook Stories
├── tests/                       # 测试文件
│   ├── e2e/                    # 端到端测试
│   ├── integration/            # 集成测试
│   ├── factories/              # 测试数据工厂
│   └── helpers/                # 测试辅助函数
├── types/                       # TypeScript 类型定义
├── utils/                       # 通用工具函数
└── hooks/                       # React Hooks
```

---

## 六、结论

本项目采用了现代化的 Next.js 架构和完善的测试策略。当前已经实现了核心的认证、用户管理、旅客管理和订单管理功能，并且有较好的测试覆盖。

**主要优势**：

- 清晰的分层架构，职责分离
- 多维度的测试框架，保障代码质量
- 良好的代码组织，易于维护和扩展

**待改进方向**：

- 补充缺失的组件测试和集成测试
- 完善端到端测试，覆盖核心业务流程
- 实现待开发的功能（找回密码、航班动态等）
- 建立测试规范和最佳实践文档

通过持续完善测试覆盖和功能实现，项目将具备更高的稳定性和可维护性。
