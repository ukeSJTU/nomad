# 组件迁移架构设计

> 本文档定义了将 apps/web 自定义组件迁移到 packages/ui 的架构规范和设计模式。
> **最后更新**: 2026-01-03
> **相关文档**: [TODO.md](./TODO.md) | [迁移文档](./.codex/migrations/)

## 目录

1. [基本规则](#基本规则)
2. [模式→策略对照表](#模式策略对照表)
3. [域级 View Model 草案](#域级-view-model-草案)
4. [适配层接口](#适配层接口)

---

## 基本规则

1. **UI-Logic 彻底分离**
   将 `apps/web/app/_components` 的自定义组件抽离为 `packages/ui` 的哑组件，UI 与逻辑彻底分离，可被 apps/web、apps/demo、未来 Storybook 复用。

2. **去除 Next.js 特有依赖**
   去除 Next 特有依赖（next/link、next/image、navigation 等）在 UI 包的直接使用，改为可注入适配。

3. **统一组件接口**
   统一组件接口（受控/非受控策略、回调签名、视图模型字段），保证易用性与规范。

4. **补足测试基线**
   补足 UI 包的测试基线（Vitest + RTL，仅非基础 shadcn 组件）。

5. **迁移范围边界**
   - i18n 暂不考虑
   - 邮件模板留在 apps/web，不迁移

---

## 模式→策略对照表

| 框架模式                                         | 解耦策略                 | UI 包职责                                                         | 容器职责                                        |
| ------------------------------------------------ | ------------------------ | ----------------------------------------------------------------- | ----------------------------------------------- |
| **Next Link/Image 依赖**                         | 可注入适配器             | 接收 `href`, `onClick`, `target`, `sizes`, `priority` 等 props    | 通过 UiProvider 注入 Link/Image 组件            |
| **router/useRouter/usePathname/useSearchParams** | 回调导航                 | 暴露 `onNavigate`, `onSelect` 回调或接收 ready-to-navigate `href` | 负责导航与 URL 状态管理                         |
| **Server Action/域调用**                         | 容器数据层               | 受控状态 + 回调                                                   | 持有数据请求/提交/错误；所有副作用/日志留在容器 |
| **表单 (RHF+zod)**                               | 受控组件                 | 接收受控字段值、错误消息、`onChange/onSubmit`、`disabled`         | 管理 schema、提交、默认值、loading、错误        |
| **计时/副作用 (useEffect/定时器/localStorage)**  | Props 驱动               | 只渲染数值与回调（如 `onExpire`）                                 | 处理计时/存储/事件                              |
| **上下文/Provider**                              | Props 注入               | 可接受 context value 作为 props；避免创建跨框架 Provider          | 全局主题/用户/feature flag 保持在 app 层        |
| **媒体/资产 (Image/图标/视频)**                  | URL 传入                 | 接收 URL/名称；不直接用 next/image                                | 优化/loader 由适配器决定                        |
| **数据格式化**                                   | Utils 或 Formatter Props | 接收已格式化数据或 formatter 函数                                 | 放 utils（价格、日期、mask）                    |

---

## 域级 View Model 草案

### Common (通用组件)

#### Header/Footer

```typescript
interface HeaderProps {
  logoSrc: string;
  navItems: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  ctaButtons?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "outline";
  }>;
  user?: {
    avatar?: string;
    name?: string;
  };
}
```

#### UserMenu

```typescript
interface UserMenuProps {
  user: {
    avatar?: string;
    name: string;
    email?: string;
  };
  menuItems: Array<{
    key: string;
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

#### AppSidebar

```typescript
interface AppSidebarProps {
  sections: Array<{
    title?: string;
    items: Array<{
      key: string;
      label: string;
      icon?: ReactNode;
      href?: string;
      onClick?: () => void;
      active: boolean;
    }>;
  }>;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}
```

#### BreadCrumb

```typescript
interface BreadCrumbProps {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}
```

---

### Auth (认证相关)

#### UnifiedLogin

```typescript
interface UnifiedLoginProps {
  mode: "password" | "otp";
  // 字段值
  values: {
    account: string;
    password?: string;
    otp?: string;
  };
  termsAgreed: boolean;
  // 错误
  errors?: {
    account?: string;
    password?: string;
    otp?: string;
  };
  // 回调
  onFieldChange: (field: string, value: string) => void;
  onTermsChange: (agreed: boolean) => void;
  onSubmit: () => void;
  onSwitchMode: (mode: "password" | "otp") => void;
  onSendOtp?: () => void;
  // 状态
  loading?: boolean;
  otpCountdown?: number; // 秒数
  turnstileToken?: string;
  onTurnstileVerify?: (token: string) => void;
}
```

#### UnifiedSignup/PasswordSetup

简化字段；`onSubmit`，字段值/错误。

#### Phone/EmailVerification

```typescript
interface VerificationProps {
  code: string;
  onCodeChange: (code: string) => void;
  countdown: number;
  onResend: () => void;
  onSubmit: () => void;
  errors?: { code?: string };
}
```

#### OTPInput

```typescript
interface OTPInputProps {
  value: string[] | string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  length?: number; // 默认 6
}
```

#### SocialAccountCard/Link/Unlink Button

```typescript
interface SocialAccountProps {
  provider: string;
  status: "linked" | "unlinked" | "pending";
  onLink?: () => void;
  onUnlink?: () => void;
  loading?: boolean;
  error?: string;
}
```

#### RegistrationSuccess

```typescript
interface RegistrationSuccessProps {
  title?: string;
  description?: string;
  actions: Array<{
    label: string;
    onClick: () => void;
  }>;
}
```

#### SignUpModal

```typescript
interface SignUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
  onDisagree: () => void;
  // 文案配置
  termsLink?: string;
  privacyLink?: string;
}
```

---

### Flights (航班相关)

#### SearchForm

```typescript
interface SearchFormProps {
  tripType: "oneWay" | "roundTrip";
  values: {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
    classType: string;
  };
  errors?: Record<string, string>;
  loading?: boolean;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onSwap?: () => void;
}
```

#### QuickDateSelector

```typescript
interface QuickDateSelectorProps {
  prices: Array<{
    date: string;
    returnDate?: string;
    lowestPrice: number;
    selected: boolean;
  }>;
  loading?: boolean;
  onSelectDate: (date: string) => void;
  onPrevRange: () => void;
  onNextRange: () => void;
  canPrev: boolean;
  canNext: boolean;
}
```

#### FlightListOneWay/RoundTrip

```typescript
interface FlightListProps {
  flights: Array<{
    id: string;
    summary: string;
    price: number;
    badges?: string[];
    // ... 其他字段
  }>;
  selectedId?: string;
  onSelect: (id: string) => void;
  onViewDetail?: (id: string) => void;
}
```

#### FlightCard

同上，受控收藏/展开回调；依赖 Image 适配。

#### FlightFilterSort

```typescript
interface FlightFilterSortProps {
  sort: string;
  filters: Record<string, any>;
  onChange: (type: "sort" | "filter", value: any) => void;
}
```

#### FlightSearchHeader

```typescript
interface FlightSearchHeaderProps {
  summary: {
    from: string;
    to: string;
    dates: string;
    resultsCount?: number;
  };
  // 受控开关/回调
}
```

#### PaymentCountdownTimer

```typescript
interface PaymentCountdownTimerProps {
  remainingSeconds: number;
  onExpire: () => void;
  // 文案/尺寸配置
}
```

#### PaymentMethodSelector

```typescript
interface PaymentMethodSelectorProps {
  methods: Array<{
    id: string;
    label: string;
    description?: string;
    fee?: number;
  }>;
  selectedId?: string;
  onSelect: (id: string) => void;
}
```

#### AncillarySelection

```typescript
interface AncillarySelectionProps {
  items: Array<{
    id: string;
    label: string;
    price: number;
    selected: boolean;
    quantity?: number;
  }>;
  onToggle: (id: string) => void;
  onQuantityChange?: (id: string, quantity: number) => void;
  total: number;
}
```

#### ContactInfoCard/PassengerFormCard

受控字段/错误/提交回调。

#### OrderStatusCard

```typescript
interface OrderStatusCardProps {
  status: string;
  remainingSeconds?: number;
  onExpire?: () => void;
  meta?: Record<string, any>;
}
```

#### OrderFlightInfo

`flightInfo` view-model + Image 适配。

---

### Passengers (乘客管理)

#### PassengerForm

```typescript
interface PassengerFormProps {
  values: {
    // 受控字段
  };
  errors?: Record<string, string>;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
}
```

#### PassengerList/DataTable

```typescript
interface PassengerListProps {
  rows: Array<{
    id: string;
    name: string;
    phone: string;
    docType: string;
    docNumber: string;
    // ...
  }>;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onBatchDelete?: (ids: string[]) => void;
  // 过滤输入受控
}
```

---

### Security (安全设置)

#### ChangePassword/UpdateEmail/UpdatePhone

```typescript
interface SecurityFormProps {
  values: Record<string, string>;
  errors?: Record<string, string>;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onSendOtp?: () => void;
  countdown?: number;
}
```

#### SecurityItem

```typescript
interface SecurityItemProps {
  title: string;
  description?: string;
  href?: string;
  onClick?: () => void;
  status?: string;
}
```

---

### User (用户信息)

#### AddressForm

```typescript
interface AddressFormProps {
  mode: "create" | "edit";
  values: Record<string, string>;
  errors?: Record<string, string>;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => void;
}
```

#### AddressList

```typescript
interface AddressListProps {
  items: Array<{
    id: string;
    label: string;
    detail: string;
    isDefault: boolean;
  }>;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect?: (id: string) => void;
}
```

#### OrderCard

```typescript
interface OrderCardProps {
  order: {
    id: string;
    status: string;
    price: number;
    segments: any[];
    // ...
  };
  href?: string;
  onClick?: () => void;
}
```

#### UserInfoEdit/UserInfoForm

受控字段/错误/提交；可能需要 Link 注入。

---

## 适配层接口

### LinkAdapter

```typescript
interface LinkAdapterProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
  prefetch?: boolean;
  replace?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}
```

**默认实现** (packages/ui):

```tsx
const DefaultLink: React.FC<LinkAdapterProps> = ({
  href,
  children,
  className,
  target,
  rel,
  onClick,
}) => {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
```

**Next.js 实现** (apps/web):

```tsx
import NextLink from "next/link";

const NextLinkAdapter: React.FC<LinkAdapterProps> = ({
  href,
  children,
  className,
  prefetch,
  replace,
  ...props
}) => {
  return (
    <NextLink
      href={href}
      className={className}
      prefetch={prefetch}
      replace={replace}
      {...props}
    >
      {children}
    </NextLink>
  );
};
```

---

### ImageAdapter

```typescript
interface ImageAdapterProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
}
```

**默认实现** (packages/ui):

```tsx
const DefaultImage: React.FC<ImageAdapterProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  loading,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={loading || "lazy"}
    />
  );
};
```

**Next.js 实现** (apps/web):

```tsx
import NextImage from "next/image";

const NextImageAdapter: React.FC<ImageAdapterProps> = props => {
  return <NextImage {...props} />;
};
```

---

### RouterAdapter (❌ 不推荐)

**重要设计决策**: UI 组件应该通过回调函数处理导航，而不是直接依赖 RouterAdapter。

**为什么不需要 RouterAdapter**:

1. 违反"容器管理副作用"原则 - UI 组件不应该知道路由逻辑
2. 回调模式更简单、更易测试 - mock 回调比 mock router 容易
3. 依赖反转更彻底 - UI 只暴露事件，容器决定响应方式
4. 实际场景中 100% 的组件都用回调处理导航

**❌ 不推荐的模式**:

```typescript
// UI 组件直接调用 router - 违反架构原则
function MyComponent({ router }: { router: RouterAdapter }) {
  return <button onClick={() => router.push('/success')}>提交</button>
}
```

**✅ 推荐的模式**:

```typescript
// UI 组件触发回调，容器决定导航逻辑
function MyComponent({ onSubmit }: { onSubmit: () => void }) {
  return <button onClick={onSubmit}>提交</button>
}

// 容器层
function Container() {
  const router = useRouter();
  const handleSubmit = () => {
    router.push('/success');
    logger.track('form_submitted');
  };
  return <MyComponent onSubmit={handleSubmit} />
}
```

**LinkAdapter vs RouterAdapter 的区别**:

- **LinkAdapter** (保留): 处理声明式链接 `<Link href="/path" prefetch>`，需要框架优化
- **RouterAdapter** (移除): 命令式导航应通过回调完成，不应让 UI 直接调用 router

---

### UiProvider

```typescript
interface UiComponents {
  Link?: React.ComponentType<LinkAdapterProps>;
  Image?: React.ComponentType<ImageAdapterProps>;
  // Router 已移除 - 使用回调函数代替
}

<UiProvider components={{ Link, Image }}>
  {children}
</UiProvider>
```

**默认实现**: 使用标准 HTML `<a>` 和 `<img>` 标签。

**Next.js 实现示例** (apps/web):

```tsx
import NextLink from "next/link";
import NextImage from "next/image";
import { UiProvider } from "@nomad/ui/platform";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UiProvider components={{ Link: NextLink, Image: NextImage }}>
      {children}
    </UiProvider>
  );
}
```

**使用示例**:

```tsx
// packages/ui/src/components/header.tsx
import { useUiComponents } from "@nomad/ui/platform";

export function Header({ logoSrc, navItems }) {
  const { Link } = useUiComponents();

  return (
    <header>
      <img src={logoSrc} alt="Logo" />
      <nav>
        {navItems.map(item => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
```

---

## 参考

- [迁移进度总览](./TODO.md)
- [各域迁移文档](./.codex/migrations/)
