# Add Cloudflare Turnstile Verification

## Why

当前系统的验证码发送功能（短信和邮箱）以及用户注册等敏感操作缺乏人机验证保护，存在被恶意请求和自动化攻击的风险。恶意行为者可以：

- 频繁触发验证码发送，消耗短信和邮件服务配额
- 批量注册虚假账号
- 对系统进行暴力攻击

集成 Cloudflare Turnstile 可以有效区分真实用户和自动化脚本，保护敏感操作免受滥用，同时保持良好的用户体验（无需手动解决复杂验证码）。

## What Changes

- 集成 Cloudflare Turnstile Widget 到前端组件中
- 在发送验证码按钮附近显示 Turnstile 验证组件
- 支持明暗主题适配（自动跟随系统主题）
- 在 Server Actions 中验证 Turnstile token
- 保护以下敏感操作：
  - 发送短信验证码（手机号登录、更新手机号）
  - 发送邮箱验证码（邮箱 OTP 登录、更新邮箱）
  - 用户注册（邮箱密码注册）
- 添加环境变量配置用于 Turnstile site key 和 secret key
- 添加开发环境的 bypass 机制（使用 Turnstile testing keys）

## Impact

### Affected Specs

- `user-interface` - 添加 Turnstile 组件集成要求
- 新建 `security` - 定义人机验证和防滥用要求

### Affected Code

**Frontend Components:**

- `src/components/auth/forms/email-otp-login.tsx` - 添加 Turnstile widget
- `src/components/auth/forms/phone-otp-login.tsx` - 添加 Turnstile widget
- `src/components/auth/forms/signup-form.tsx` - 添加 Turnstile widget（如果存在）
- `src/components/security/update-email-form.tsx` - 添加 Turnstile widget
- `src/components/security/update-phone-form.tsx` - 添加 Turnstile widget
- 新增 `src/components/security/turnstile-widget.tsx` - 可复用的 Turnstile 组件

**Backend/Server Actions:**

- `src/lib/auth.ts` - 在 sendOTP 回调中验证 Turnstile token
- 新增 `src/lib/turnstile.ts` - Turnstile token 验证工具函数
- 可能需要修改的 Server Actions（具体根据实现确认）：
  - Email OTP 发送 action
  - Phone OTP 发送 action
  - 用户注册 action

**Configuration:**

- `.env.example` - 添加 Turnstile 配置变量示例
- `README.md` or docs - 添加 Turnstile 配置文档

**Dependencies:**

- 添加 `@marsidev/react-turnstile` npm 包

### Breaking Changes

无破坏性变更。Turnstile 验证是附加的安全层，现有功能继续工作。

### Migration Notes

- 生产环境需要配置 Cloudflare Turnstile site key 和 secret key
- 开发环境可使用 Turnstile 提供的 testing keys（自动通过）
- 如果未配置环境变量，系统应给出明确警告但不阻止功能（开发环境）
