# 自定义组件迁移重构计划

## 基本规则

- 将 apps/web/app/\_components 的自定义组件抽离为 packages/ui 的哑组件，UI 与逻辑彻底分离，可被 apps/web、apps/demo、未来 Storybook 复用。
- 去除 Next 特有依赖（next/link、next/image、navigation 等）在 UI 包的直接使用，改为可注入适配。
- 统一组件接口（受控/非受控策略、回调签名、视图模型字段），保证易用性与规范。
- 补足 UI 包的测试基线（Vitest + RTL，仅非基础 shadcn 组件）。
- i18n 暂不考虑；邮件模板留在 apps/web，不迁移。

## 模式→策略对照表（草稿）

- Next Link/Image 依赖 → UI 不直接引用 Next；通过可注入适配器；容器传 href/onClick/target/sizes/priority 等。
- router/useRouter/usePathname/useSearchParams → 容器负责导航与 URL 状态；UI 暴露 `onNavigate/ onSelect` 回调或接收 ready-to-navigate href。
- Server Action/域调用 → 容器持数据请求/提交/错误；UI 受控状态 + 回调；所有副作用/日志留在容器。
- 表单 (RHF+zod) → 容器管理 schema、提交、默认值、loading、错误；UI 接口：受控字段值、错误消息、onChange/onSubmit、disabled。
- 计时/副作用 (useEffect/定时器/localStorage) → 容器处理计时/存储/事件；UI 只渲染数值与回调（如 onExpire）。
- 上下文/Provider → 全局主题/用户/feature flag 保持在 app；UI 可接受 context value 作为 props；避免 UI 包创建跨框架 Provider。
- 媒体/资产 (Image/图标/视频) → 资源以 URL/名称传入；优化/loader 由适配器决定；UI 不直接用 next/image。
- 数据格式化 → 放 utils（价格、日期、mask），UI 接收已格式化或传入 formatter。

## 域级 view-model 草案（首批高风险/高复用）

- common/header/footer/user-menu/app-sidebar/bread-crumb
  - Header/Footer：`logoSrc`, `navItems[{label,href,onClick}]`, `ctaButtons`, `user`（可选）。
  - UserMenu：`user{avatar,name,email}`, `menuItems[{key,label,href,onClick}]`, 受控 `open/onOpenChange`。
  - AppSidebar：`sections[{title,items[{key,label,icon?,href?,onClick?,active}]}]`, 受控折叠状态。
  - BreadCrumb: `items[{label,href?,onClick?}]`.
- auth（登录/注册/验证/社交）
  - UnifiedLogin：`mode`(password|otp)、字段值/错误、`onSubmit`, `onSwitchMode`, `termsAgreed`, `onTermsChange`, `otpCountdown`, `onSendOtp`, `turnstileToken?`。
  - UnifiedSignup/PasswordSetup：同上简化字段；`onSubmit`，字段值/错误。
  - Phone/EmailVerification：`code`, `onCodeChange`, `countdown`, `onResend`, `onSubmit`，错误文案。
  - OTPInput：`value`(string[] or string), `onChange`, `autoFocus`, `length`.
  - SocialAccountCard/Link/Unlink Button：`provider`, `status`(linked/unlinked/pending), `onLink/onUnlink`, `loading`, `error?`.
  - RegistrationSuccess：`title/description`, `actions[{label,onClick}]`.
  - SignUpModal：受控 `open/onOpenChange`, `onAgree/onDisagree`, 文案配置。
- flights（搜索/quick-date/结果）
  - SearchForm：受控字段 `tripType, from, to, departDate, returnDate, classType`，`onSubmit`, `onSwap`, `errors`, `loading?`。
  - QuickDateSelector：`prices[{date,returnDate?,lowestPrice,selected}]`, `loading`, `onSelectDate`, `onPrevRange/onNextRange`, `canPrev/canNext`.
  - FlightListOneWay/RoundTrip：`flights[{id,summary,price,badges,...}]`, `selectedId?`, `onSelect`, `onViewDetail`.
  - FlightCard：同上，受控收藏/展开回调；依赖 Image 适配。
  - FlightFilterSort：受控 `sort`, `filters`, `onChange`。
  - FlightSearchHeader：`summary` 信息 + 受控开关/回调。
- flights（booking/orders）
  - PaymentCountdownTimer：`remainingSeconds`, `onExpire`, 文案/尺寸。
  - PaymentMethodSelector：`methods[{id,label,desc,fee?}]`, `selectedId`, `onSelect`.
  - AncillarySelection：`items[{id,label,price,selected,quantity?}]`, `onToggle/onQuantityChange`, `total`.
  - ContactInfoCard/PassengerFormCard：受控字段/错误/提交回调。
  - OrderStatusCard：`status`, `remainingSeconds?`, `onExpire`, `meta`.
  - OrderFlightInfo：`flightInfo` view-model + Image 适配。
- passengers
  - PassengerForm：受控字段/错误/提交；`onSubmit`, `onCancel`。
  - PassengerList/DataTable：`rows[{id,name,phone,docType,docNumber,...}]`, `onView/onEdit/onDelete/onBatchDelete`, 过滤输入受控。
- security
  - ChangePassword/UpdateEmail/UpdatePhone：受控字段/错误/提交，`onSendOtp`（如需），`countdown`。
  - SecurityItem：`title, desc, href/onClick, status`。
- user
  - AddressForm：受控字段/错误/提交；`mode`(create/edit)。
  - AddressList：`items[{id,label,detail,isDefault}]`, `onSetDefault/onDelete/onSelect`.
  - OrderCard：`order view-model {id,status,price,segments,...}`，`href/onClick`。
  - UserInfoEdit/UserInfoForm：受控字段/错误/提交；可能需要 Link 注入。

## 适配层接口草稿

- LinkAdapter props（UI 包）：`href: string`, `children`, `className?`, `target?`, `rel?`, `prefetch?`, `replace?`, `onClick?`.
- ImageAdapter props：`src: string`, `alt: string`, `width?: number`, `height?: number`, `className?`, `style?`, `fill?: boolean`, `priority?: boolean`, `sizes?: string`, `loading?: \"lazy\"|\"eager\"`.
- RouterAdapter（可选）：`push(url:string, opts?)`, `replace(url:string, opts?)`, `prefetch?(url:string)`, `back?()`, `refresh?()`；UI 组件默认只接收回调，不直接要求 Router。
- Provider：`<UiProvider components={{ Link, Image, Router? }}>{children}</UiProvider>`，默认实现使用 `<a>`/`<img>`。

## 批次迁移计划（草案）

- 批次0：适配层落地（UiProvider + Link/Image 接口）、模式→策略对照表定稿。
- 批次1：common 基础（header/footer/user-menu/bread-crumb/app-sidebar）+ flights 搜索核心（search-form, quick-date-selector, FlightList\*）→ 建立 Link/Router 适配用例。
- 批次2：auth 登录/注册/验证链路（unified-login/signup、otp/verification、sign-up-modal、registration-success、social link/unlink）→ 受控表单模式落地。
- 批次3：flights booking/orders（payment-\*，ancillary-selection，order-status/info）+ passengers/passenger-form → 受控表单+倒计时模式推广。
- 批次4：user/security/address 等剩余表单/卡片。
- 每批完成定义：组件迁移至 packages/ui（哑组件），apps/web 容器接管逻辑，Vitest+RTL 覆盖 UI 状态，文档（view-model/适配要求）同步 TODO/设计笔记。

## 批次0 细化（适配层/对照表定稿）

- UiProvider/适配器：默认 Link=`<a>`、Image=`<img>`；允许仅传 Link 或 Image 覆盖；类型 `UiComponents = { Link: LinkAdapter; Image: ImageAdapter; Router?: RouterAdapter }`；允许透传 role/aria-\*。
- 模式→策略对照表（落地版）：对每个模式写明症状、拆分动作（容器 vs UI）、需要的适配器/回调、测试状态矩阵；可存本 TODO 或单独 md，供批次1引用。

## 批次1 细化（common + flights 搜索核心）

- common 组件 UI 化 props/回调草案：
  - Header/Footer：`logoSrc`, `navItems[{label,href?,onClick?}]`, `ctaButtons[{label,href?,onClick?,variant}]`, 可选 `user{avatar?,name?}`，Image/Link 适配。
  - UserMenu：`user{avatar?,name,email?}`, `menuItems[{key,label,href?,onClick?}]`, 受控 `open/onOpenChange`, `onSelect(key)`.
  - AppSidebar：`sections[{title?,items[{key,label,icon?,href?,onClick?,active}]}]`, `collapsed`, `onToggleCollapse?`, Link 适配。
  - BreadCrumbNav：`items[{label,href?,onClick?}]`, 可选分隔符。
  - ErrorDisplay：`message`, `actions[{label,href?,onClick?}]`, `variant?`.
  - DataTableWithActions：`columns`, `rows`, `rowActions`, `batchActions`（全由容器提供，UI 不含路由/过滤逻辑）。
- flights 搜索组件 UI 化 props/回调草案：
  - SearchForm：`tripType`, `from`, `to`, `departDate`, `returnDate?`, `classType`, `errors?`, `loading?`, `onChange(field,value)`, `onSubmit()`, `onSwap()`.
  - QuickDateSelector：`prices[{date,returnDate?,lowestPrice,selected}]`, `loading`, `onSelectDate(date)`, `onPrevRange()`, `onNextRange()`, `canPrev`, `canNext`.
  - FlightListOneWay/RoundTrip：`flights[{id,title,subtitle,price,badges?,mediaSrc?}]`, `selectedId?`, `onSelect(id)`, `onViewDetail?(id)`, Image 适配。
  - FlightSearchHeader：`summary{from,to,dates,resultsCount?}`, `filters`, `onFilterChange`，无 URL 操作。
  - FlightFilterSort：受控 `sort`, `filters`, `onChange`.
  - FlightCard：与列表同字段；交互（收藏/展开等）经回调。
- 批次1输出：上述组件 props/回调清单成文；至少挑一个示例（如 Header 或 SearchForm）写明容器/哑组件分工。

## 备注

---

# 下面是迁移文件清单

## auth

### ./auth/forms/email-verification.tsx

状态：未完成

存在的问题： useEffect 存在副作用逻辑，需迁移至容器。

### ./auth/forms/otp-input.tsx

### ./auth/forms/password-setup.tsx

### ./auth/forms/phone-verification.tsx

### ./auth/forms/unified-login.tsx

### ./auth/forms/unified-signup.tsx

### ./auth/link-button.tsx

### ./auth/registration-success.tsx

### ./auth/sign-up-modal.tsx

### ./auth/social-account-card.tsx

### ./auth/turnstile.tsx

### ./auth/unlink-button.tsx

### ./auth/user-sidebar.tsx

## common

### ./common/app-sidebar.tsx

### ./common/bread-crumb-nav.tsx

### ./common/construction.tsx

### ./common/data-table-with-actions.tsx

### ./common/dev-user-switcher.tsx

### ./common/error-display.tsx

### ./common/footer.tsx

状态：未完成

### ./common/header.tsx

状态：完成

### ./common/search-bar.tsx

### ./common/stepper.tsx

### ./common/theme-provider.tsx

### ./common/user-menu.tsx

## flights

### ./flights/booking/ancillary-selection.tsx

### ./flights/booking/confirmation-booking-info.tsx

### ./flights/booking/confirmation-flight-details.tsx

### ./flights/booking/confirmation-notice-card.tsx

### ./flights/booking/confirmation-payment-summary.tsx

### ./flights/booking/confirmation-success-header.tsx

### ./flights/booking/contact-info-card.tsx

### ./flights/booking/flight-summary-card.tsx

### ./flights/booking/passenger-form-card.tsx

### ./flights/booking/payment-countdown-timer.tsx

### ./flights/booking/payment-method-selector.tsx

### ./flights/booking/payment-order-summary.tsx

### ./flights/booking/payment-price-breakdown.tsx

### ./flights/guide/airport-list.tsx

### ./flights/guide/airport-sidebar.tsx

### ./flights/guide/boarding-process-card.tsx

### ./flights/guide/guide-sidebar.tsx

### ./flights/guide/weather-card.tsx

### ./flights/orders/cancel-order-dialog.tsx

### ./flights/orders/order-contact-info.tsx

### ./flights/orders/order-flight-info.tsx

### ./flights/orders/order-passenger-info.tsx

### ./flights/orders/order-payment-details.tsx

### ./flights/orders/order-status-card.tsx

### ./flights/orders/refund-order-dialog.tsx

### ./flights/results/flight-card-skeleton.tsx

### ./flights/results/flight-card.tsx

### ./flights/results/flight-filter-sort.tsx

### ./flights/search/FlightListOneWay.tsx

### ./flights/search/FlightListRoundTrip.tsx

### ./flights/search/FlightSearchError.tsx

### ./flights/search/FlightSearchHeader.tsx

### ./flights/search/city-selector.tsx

### ./flights/search/date-selector/date-display.tsx

### ./flights/search/date-selector/date-selector.tsx

### ./flights/search/date-selector/one-way-selector.tsx

### ./flights/search/date-selector/round-trip-selector.tsx

### ./flights/search/quick-date-selector.tsx

### ./flights/search/search-form.tsx

### ./flights/search/search-history-section.tsx

### ./flights/search/search-history.tsx

## passengers

### ./passengers/forms/passenger-form.tsx

### ./passengers/passenger-detail-view.tsx

### ./passengers/passenger-list.tsx

### ./passengers/passengers-data-table.tsx

## security

### ./security/change-password-form.tsx

### ./security/security-item.tsx

### ./security/update-email-form.tsx

### ./security/update-phone-form.tsx

## user

### ./user/address/address-form.tsx

### ./user/address/address-list.tsx

### ./user/delete-order-dialog.tsx

### ./user/order-card.tsx

### ./user/success-dialog.tsx

### ./user/user-info-display.tsx

### ./user/user-info-edit-form.tsx

### ./user/user-info-form.tsx

---

# 下面内容为初步草稿

## 阶段 1 扫描进展（初版）

- 组件分布：auth 21, common 19, emails 5, flights 61, passengers 7, security 6, user 15（共 134）。
- 标签计数：Next 依赖 31，`"use client"` 51，`useEffect/useLayoutEffect` 9，react-hook-form+zod 10，`app/_actions` 引用 12。
- Next 依赖组件（Link/Image/navigation 等）：`auth/registration-success.tsx`, `passengers/passengers-data-table.tsx`, `auth/sign-up-modal.tsx`, `auth/user-sidebar.tsx`, `common/bread-crumb-nav.tsx`, `common/error-display.tsx`, `common/header.tsx`, `common/footer.tsx`, `common/user-menu.tsx`, `common/app-sidebar.tsx`, `auth/forms/unified-login.tsx`, `common/header.test.tsx`, `common/footer.test.tsx`, `common/error-display.test.tsx`, `common/user-menu.test.tsx`, `common/app-sidebar.test.tsx`, `auth/user-sidebar.test.tsx`, `security/security-item.tsx`, `flights/search/search-history-section.tsx`, `flights/orders/order-flight-info.tsx`, `user/user-info-form.tsx`, `user/order-card.tsx`, `flights/search/FlightListRoundTrip.tsx`, `flights/search/quick-date-selector.tsx`, `flights/search/FlightListOneWay.tsx`, `flights/search/search-history.tsx`, `flights/guide/boarding-process-card.tsx`, `flights/guide/airport-sidebar.tsx`, `flights/guide/airport-list.tsx`, `flights/search/FlightSearchHeader.tsx`, `auth/link-button.tsx`, `auth/unlink-button.tsx`.
- 副作用 hooks 组件（useEffect/useLayoutEffect）：`passengers/passengers-data-table.tsx`, `flights/orders/order-status-card.tsx`, `flights/search/search-form.tsx`, `flights/search/quick-date-selector.tsx`, `flights/booking/payment-countdown-timer.tsx`, `auth/forms/phone-verification.tsx`, `auth/forms/otp-input.tsx`, `common/dev-user-switcher.tsx`, `auth/forms/email-verification.tsx`.
- 表单/校验（react-hook-form + zod）：`passengers/forms/passenger-form.tsx`, `user/user-info-edit-form.tsx`, `security/update-email-form.tsx`, `user/address/address-form.tsx`, `security/update-phone-form.tsx`, `security/change-password-form.tsx`, `auth/forms/password-setup.tsx`, `auth/forms/unified-login.tsx`, `auth/forms/phone-verification.tsx`, `auth/forms/email-verification.tsx`.
- Server Action 引用：`common/user-menu.tsx`（signOut），`user/user-info-edit-form.tsx`，`user/address/address-list.tsx`，`user/address/address-form.tsx`，`auth/forms/unified-signup.tsx`，`auth/forms/unified-login.tsx`，`auth/link-button.tsx`，`auth/unlink-button.tsx`，`flights/search/search-history-section.tsx`，`flights/search/quick-date-selector.tsx`，`flights/search/search-history.tsx`。
- 初步高风险组合信号：Next 依赖 + Server Action（auth/user/flights 搜索）、Next 依赖 + 副作用（quick-date-selector、search-form）、表单 + Server Action（auth/security/user/passenger 表单）。

### 待补充的标签维度（后续补扫）

- 路由/搜索参数：`useRouter/usePathname/useSearchParams` 的使用形态与耦合强度。
- 媒体/资产：Image/video/icon 依赖（含 Next 优化/loader）。
- 上下文/Provider：自定义 Context、ThemeProvider、feature flag 等。
- 全局副作用：window/document/localStorage、事件监听、定时器/interval。
- 动效/布局特殊性：framer-motion、portal/固定滚动容器。

### 新增维度扫描结果（已补充）

- 计数：router 11，media 4，context 2，global_fx 7，motion 0。
- router：`auth/registration-success.tsx`, `auth/user-sidebar.tsx`, `common/app-sidebar.tsx`, `common/user-menu.tsx`, `flights/search/FlightListOneWay.tsx`, `flights/search/FlightListRoundTrip.tsx`, `flights/search/quick-date-selector.tsx`, `flights/search/search-history-section.tsx`, `flights/search/search-history.tsx`, `passengers/passengers-data-table.tsx`, `user/user-info-form.tsx`。
- media：`common/footer.tsx`, `common/header.tsx`, `flights/booking/flight-summary-card.tsx`, `flights/orders/order-flight-info.tsx`。
- context：`auth/social-account-card.tsx`, `common/theme-provider.tsx`。
- global_fx：`auth/link-button.tsx`, `common/app-sidebar.tsx`, `common/dev-user-switcher.tsx`, `common/error-display.tsx`, `flights/booking/payment-countdown-timer.tsx`, `flights/orders/order-status-card.tsx`, `flights/search/search-form.tsx`。
- motion：未命中。

## 组件分节（初版，忽略测试/index）

> UI 描述基于文件名推断，需后续精读确认；非 UI 标签：Next( Link/Image/导航 )、use_client、use_effect、rhf_zod、actions。

### 高关注组件（含非 UI 标签）

- auth/registration-success.tsx — UI: 注册成功提示；非 UI: Next, use_client。
- auth/sign-up-modal.tsx — UI: 注册弹窗；非 UI: Next, use_client。
- auth/user-sidebar.tsx — UI: 用户侧边导航；非 UI: Next, use_client。
- auth/social-account-card.tsx — UI: 社交账号卡片；非 UI: use_client。
- auth/link-button.tsx — UI: 绑定社交按钮；非 UI: use_client, actions。
- auth/unlink-button.tsx — UI: 解绑社交按钮；非 UI: use_client, actions。
- auth/forms/unified-login.tsx — UI: 统一登录表单；非 UI: Next, use_client, rhf_zod, actions。
- auth/forms/unified-signup.tsx — UI: 统一注册表单；非 UI: use_client, actions。
- auth/forms/password-setup.tsx — UI: 密码设置表单；非 UI: use_client, rhf_zod。
- auth/forms/phone-verification.tsx — UI: 手机验证/倒计时；非 UI: use_client, use_effect, rhf_zod。
- auth/forms/email-verification.tsx — UI: 邮箱验证/倒计时；非 UI: use_client, use_effect, rhf_zod。
- auth/forms/otp-input.tsx — UI: OTP 输入；非 UI: use_client, use_effect。
- common/app-sidebar.tsx — UI: 应用侧边栏；非 UI: Next, use_client。
- common/bread-crumb-nav.tsx — UI: 面包屑；非 UI: Next。
- common/data-table-with-actions.tsx — UI: 数据表+操作区；非 UI: use_client。
- common/dev-user-switcher.tsx — UI: 开发用户切换；非 UI: use_client, use_effect。
- common/error-display.tsx — UI: 错误展示/跳转；非 UI: Next, use_client。
- common/footer.tsx — UI: 页脚；非 UI: Next。
- common/header.tsx — UI: 页头/logo/nav；非 UI: Next, use_client。
- common/search-bar.tsx — UI: 搜索栏；非 UI: use_client。
- common/stepper.tsx — UI: 步骤条；非 UI: use_client。
- common/theme-provider.tsx — UI: 主题提供；非 UI: use_client。
- common/user-menu.tsx — UI: 用户菜单；非 UI: Next, use_client, actions。
- flights/booking/ancillary-selection.tsx — UI: 增值服务选择；非 UI: use_client。
- flights/booking/contact-info-card.tsx — UI: 联系人卡片；非 UI: use_client。
- flights/booking/passenger-form-card.tsx — UI: 乘客表单卡；非 UI: use_client。
- flights/booking/payment-countdown-timer.tsx — UI: 支付倒计时；非 UI: use_client, use_effect。
- flights/booking/payment-method-selector.tsx — UI: 支付方式选择；非 UI: use_client。
- flights/guide/airport-list.tsx — UI: 机场列表；非 UI: Next。
- flights/guide/airport-sidebar.tsx — UI: 机场侧边栏；非 UI: Next。
- flights/guide/boarding-process-card.tsx — UI: 登机流程卡；非 UI: Next。
- flights/orders/order-flight-info.tsx — UI: 订单航班信息；非 UI: Next。
- flights/orders/order-status-card.tsx — UI: 订单状态卡/计时；非 UI: use_client, use_effect。
- flights/results/flight-card.tsx — UI: 航班卡片；非 UI: use_client。
- flights/results/flight-filter-sort.tsx — UI: 筛选排序控件；非 UI: use_client。
- flights/search/FlightListOneWay.tsx — UI: 单程航班列表；非 UI: Next, use_client。
- flights/search/FlightListRoundTrip.tsx — UI: 往返航班列表；非 UI: Next, use_client。
- flights/search/FlightSearchHeader.tsx — UI: 搜索页头；非 UI: use_client。
- flights/search/city-selector.tsx — UI: 城市选择；非 UI: use_client。
- flights/search/date-selector/date-display.tsx — UI: 日期展示；非 UI: use_client。
- flights/search/date-selector/date-selector.tsx — UI: 日期选择器容器；非 UI: use_client。
- flights/search/date-selector/one-way-selector.tsx — UI: 单程日期选择；非 UI: use_client。
- flights/search/date-selector/round-trip-selector.tsx — UI: 往返日期选择；非 UI: use_client。
- flights/search/quick-date-selector.tsx — UI: 快速日期价格；非 UI: Next, use_client, use_effect, actions。
- flights/search/search-form.tsx — UI: 搜索表单；非 UI: use_client, use_effect。
- flights/search/search-history-section.tsx — UI: 搜索历史区块；非 UI: Next, use_client, actions。
- flights/search/search-history.tsx — UI: 搜索历史列表；非 UI: Next, use_client。
- passengers/forms/passenger-form.tsx — UI: 乘客表单；非 UI: use_client, rhf_zod。
- passengers/passenger-list.tsx — UI: 乘客列表；非 UI: use_client。
- passengers/passengers-data-table.tsx — UI: 乘客数据表；非 UI: Next, use_client, use_effect。
- security/change-password-form.tsx — UI: 修改密码表单；非 UI: use_client, rhf_zod。
- security/security-item.tsx — UI: 安全项卡；非 UI: Next。
- security/update-email-form.tsx — UI: 修改邮箱表单；非 UI: use_client, rhf_zod。
- security/update-phone-form.tsx — UI: 修改手机号表单；非 UI: use_client, rhf_zod。
- user/address/address-form.tsx — UI: 地址表单；非 UI: use_client, rhf_zod, actions。
- user/address/address-list.tsx — UI: 地址列表；非 UI: use_client, actions。
- user/order-card.tsx — UI: 订单卡片；非 UI: Next。
- user/user-info-edit-form.tsx — UI: 用户信息编辑表单；非 UI: use_client, rhf_zod, actions。
- user/user-info-form.tsx — UI: 用户信息表单；非 UI: Next, use_client。

### 纯 UI 候选（未检测到非 UI 标签，待复核）

- auth/turnstile.tsx — Turnstile 容器（待确认是否含逻辑）。
- common/construction.tsx — 施工中提示。
- emails/order-confirmation.tsx — 订单确认邮件模板。
- emails/otp.tsx — OTP 邮件模板。
- flights/booking/confirmation-booking-info.tsx — 订座确认信息。
- flights/booking/confirmation-flight-details.tsx — 确认航班详情。
- flights/booking/confirmation-notice-card.tsx — 确认提示卡。
- flights/booking/confirmation-payment-summary.tsx — 支付摘要。
- flights/booking/confirmation-success-header.tsx — 成功页头。
- flights/booking/flight-summary-card.tsx — 航班摘要卡。
- flights/booking/payment-order-summary.tsx — 支付订单摘要。
- flights/booking/payment-price-breakdown.tsx — 价格拆分。
- flights/guide/guide-sidebar.tsx — 指南侧边栏。
- flights/guide/weather-card.tsx — 天气卡片。
- flights/orders/cancel-order-dialog.tsx — 取消订单对话框。
- flights/orders/order-contact-info.tsx — 联系人信息。
- flights/orders/order-passenger-info.tsx — 乘客信息。
- flights/orders/order-payment-details.tsx — 支付详情。
- flights/orders/refund-order-dialog.tsx — 退款对话框。
- flights/orders/utils.ts — 订单工具函数（非组件，待分类）。
- flights/results/flight-card-skeleton.tsx — 航班卡 skeleton。
- flights/search/FlightSearchError.tsx — 搜索错误提示。
- passengers/passenger-detail-view.tsx — 乘客详情。
- user/delete-order-dialog.tsx — 删除订单对话框。
- user/success-dialog.tsx — 成功提示对话框。
- user/user-info-display.tsx — 用户信息展示。

## 高关注组件深读笔记（全量，待复核）

> 每条含：UI 粗描 + 主要耦合点（Next/link/router/image、use_client、use_effect、rhf_zod、actions、router/media/context/global_fx）+ 初步策略。

### auth

- sign-up-modal.tsx — Next Link，use_client；策略：UI 维持对话框与文案，Link 通过适配器，保留受控 `open/onOpenChange/onAgree/onDisagree`。
- registration-success.tsx — router（push）、use_client；策略：暴露 `onGoFlights/onGoProfile` 或按钮配置，容器负责导航。
- user-sidebar.tsx — Next Link + router + use_client；策略：菜单项/active 由容器计算，UI 渲染 + Link 适配/回调。
- social-account-card.tsx — use_client + context；策略：若依赖外部上下文，容器提供数据，UI 仅展示头像/状态/按钮回调。
- link-button.tsx / unlink-button.tsx — actions + use_client + global_fx（可能 window/location）；策略：容器调用 action/处理错误与重定向，UI 按钮只关心 loading/disabled/onClick。
- forms/unified-login.tsx — Next Link, rhf_zod, actions, use_client, Turnstile, 倒计时（useEffect/存储）；策略：容器：schema/提交/计时/本地存储/错误；UI：受控字段值+错误+loading+回调，Link 适配，倒计时数字作为 props。
- forms/unified-signup.tsx — actions + use_client；策略：同上，容器持提交/校验，UI 纯受控。
- forms/password-setup.tsx — rhf_zod + use_client；策略：容器管理 schema/提交，UI 受控字段+错误。
- forms/phone-verification.tsx / email-verification.tsx — rhf_zod + use_effect + use_client；策略：容器管理计时与 action 调用，UI 接收倒计时/错误/回调。
- forms/otp-input.tsx — use_effect（聚焦）+ use_client；策略：UI 保留输入格与聚焦逻辑，提供受控 value/onChange，可选 focusIndex。
- turnstile.tsx — 纯 UI 候选；若封装第三方脚本，容器注入 token/onVerify，UI 渲染占位。

### common

- app-sidebar.tsx — Next + router + use_client + global_fx（事件/存储）；策略：容器提供菜单列表、active 状态、导航回调；折叠/存储逻辑留容器；UI 仅渲染。
- bread-crumb-nav.tsx — Next Link；策略：items + Link 适配/回调。
- data-table-with-actions.tsx — use_client；策略：下沉 UI 包，数据源/操作回调由容器传入，去除路由/副作用。
- dev-user-switcher.tsx — use_effect + global_fx（localStorage）；策略：容器处理存储/切换，UI 显示用户列表与回调。
- error-display.tsx — Next Link + global_fx（可能 window）；策略：UI 接受 message/cta/onRetry，Link 适配，避免直接触 window。
- footer.tsx / header.tsx — media (Image) + Next Link + use_client；策略：Image/Link 适配，导航回调外置，保留布局/文案。
- search-bar.tsx — use_client；策略：受控输入 + onSubmit/onChange。
- stepper.tsx — use_client；策略：若纯展示可移除 client，提供受控 current/onChange。
- theme-provider.tsx — context + use_client；策略：主题 Provider 保持在 app 层，UI 包仅暴露类型/薄封装。
- user-menu.tsx — Next + router + actions + use_client；策略：容器处理 session/signOut，UI 受控打开/选项/回调。

### flights

- guide/airport-list.tsx / airport-sidebar.tsx / boarding-process-card.tsx — Next Link；策略：items + Link 适配/回调。
- orders/order-flight-info.tsx — media(Image)；策略：Image 适配，航班 view-model 传入。
- orders/order-status-card.tsx — use_effect + global_fx(计时)；策略：容器计算状态/剩余时间，UI 渲染数值/标签并触发 onExpire。
- results/flight-card.tsx — use_client；策略：点击/收藏/展开等交互回调外置，数据 view-model。
- results/flight-filter-sort.tsx — use_client；策略：受控 filter/sort 值 + 回调。
- search/FlightListOneWay.tsx / FlightListRoundTrip.tsx — Next router + use_client；策略：UI 接收航班列表/选中项/回调，导航容器处理。
- search/FlightSearchHeader.tsx — use_client；策略：受控开关/筛选值 + 回调，URL 同步在容器。
- search/city-selector.tsx — use_client；策略：城市选项/搜索数据容器提供，UI 受控。
- search/date-selector/\* — use_client；策略：统一受控 API（selected range/onChange/bounds），日期格式化在 utils。
- search/search-form.tsx — use_effect + global_fx；策略：容器处理 URL 参数/提交副作用，UI 受控字段+回调。
- search/search-history-section.tsx / search-history.tsx — Next + actions + router；策略：容器拉/清空历史与导航，UI 渲染列表/按钮。
- booking/ancillary-selection.tsx — use_client；策略：受控选项/数量，定价逻辑容器。
- booking/contact-info-card.tsx — use_client；策略：受控字段/错误，提交逻辑外置。
- booking/passenger-form-card.tsx — use_client；策略：同上。
- booking/payment-countdown-timer.tsx — use_effect + global_fx(定时器)；策略：容器提供剩余秒数/onExpire，UI 只渲染。
- booking/payment-method-selector.tsx — use_client；策略：受控。
- booking/flight-summary-card.tsx — media(Image)；策略：Image 适配，价格格式化由 utils，UI 展示。
- quick-date-selector.tsx — 已述：router + actions + use_effect + logger/URLSearchParams；策略：容器拉数据/导航，UI 受控列表/回调。

### passengers

- passenger-list.tsx — use_client；策略：受控数据 + onSelect/onAdd/onEdit 回调。
- passengers-data-table.tsx — Next + router + use_effect；策略：容器做导航/数据刷新，UI 接受 view-model 和回调；mask/格式化可下放 utils。
- forms/passenger-form.tsx — rhf_zod + use_client；策略：容器 schema/提交/默认值，UI 受控字段+错误。

### security

- change-password-form.tsx / update-email-form.tsx / update-phone-form.tsx — rhf_zod + use_client；策略：容器校验/提交/错误处理，UI 受控。
- security-item.tsx — Next Link；策略：项数据 + Link/回调注入。

### user

- address/address-form.tsx — rhf_zod + actions + use_client；策略：容器回填/提交/错误，UI 受控字段。
- address/address-list.tsx — actions + use_client；策略：容器提供列表/删除/默认设置，UI 渲染列表+回调。
- order-card.tsx — Next Link；策略：订单 view-model + Link/回调。
- user-info-edit-form.tsx — rhf_zod + actions + use_client；策略：容器加载/提交/错误，UI 受控。
- user-info-form.tsx — Next + router + use_client；策略：容器管理导航/状态，UI 受控字段/动作回调。
