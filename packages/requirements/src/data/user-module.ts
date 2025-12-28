import type { ModuleDefinition, Requirement } from "./types";

const REQ_U01: Requirement = {
  id: "REQ-U01",
  module: "user",
  name: "手机号OTP注册",
  overview:
    "本功能允许新用户通过手机号和短信验证码完成两步注册流程：第一步：通过手机号和短信验证码进行身份验证；第二步：设置账户密码。同时集成Cloudflare Turnstile人机验证保护短信发送接口。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个新访客，我希望能使用我的手机号注册一个账户，以便能够预订机票和管理我的个人信息。",
    },
    {
      id: "US-02",
      content:
        "作为一个网站运营者，我希望在发送短信验证码前进行人机验证，以便保护短信接口不被恶意程序攻击，节约成本。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功完成手机号两步注册 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第一步（手机号验证页），且未登录",
        },
        {
          type: "and",
          description: "用户已阅读并同意《用户协议》",
        },
        {
          type: "when",
          description: "用户输入有效的、未被注册的11位手机号",
        },
        {
          type: "and",
          description: '用户通过Turnstile人机验证后点击"获取验证码"',
        },
        {
          type: "and",
          description: '用户输入收到的正确6位验证码并点击"下一步"',
        },
        {
          type: "then",
          description: "系统应验证通过，将用户引导至第二步（设置密码页）",
        },
        {
          type: "when",
          description:
            "用户输入符合强度要求的密码（8-20位，含大小写字母）并确认",
        },
        {
          type: "and",
          description: '点击"完成注册"',
        },
        {
          type: "then",
          description: "系统应成功创建账户，自动登录并跳转至首页或回调URL",
        },
      ],
    },
    {
      id: "场景2",
      title: "手机号格式校验失败",
      steps: [
        {
          type: "when",
          description:
            '用户输入非11位数字的手机号（如"1381234567"或"138123456789"）',
        },
        {
          type: "then",
          description:
            '系统应在手机号输入框旁显示"请输入有效的11位手机号"错误提示',
        },
        {
          type: "and",
          description: '"获取验证码"按钮应不可点击',
        },
      ],
    },
    {
      id: "场景3",
      title: "手机号已被注册",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第一步",
        },
        {
          type: "when",
          description: "用户输入一个已在平台注册的手机号并尝试获取验证码",
        },
        {
          type: "then",
          description: '系统应提示"该手机号已被注册，请直接登录"',
        },
        {
          type: "and",
          description: '提供"去登录"的链接',
        },
      ],
    },
    // ... 其他场景类似
  ],
  notes:
    "需要集成 Cloudflare Turnstile 人机验证。验证码有效期为 5 分钟，60秒内不可重复发送。注册成功后自动登录，token有效期为7天。",
};

const REQ_U02: Requirement = {
  id: "REQ-U02",
  module: "user",
  name: "邮箱OTP注册",
  overview:
    "本功能允许新用户通过邮箱和验证码完成两步注册流程：第一步：通过邮箱和验证码进行身份验证；第二步：设置账户密码。同时集成Cloudflare Turnstile人机验证保护邮件发送接口。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个新访客，我希望能使用我的邮箱注册一个账户，以便能够预订机票和管理我的个人信息。",
    },
    {
      id: "US-02",
      content:
        "作为一个网站运营者，我希望在发送邮件验证码前进行人机验证，以便保护邮件接口不被恶意程序攻击。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功完成邮箱两步注册 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第一步（邮箱验证页），且未登录",
        },
        {
          type: "and",
          description: "用户已阅读并同意《用户协议》",
        },
        {
          type: "when",
          description: "用户输入有效的、未被注册的邮箱地址",
        },
        {
          type: "and",
          description: '用户通过Turnstile人机验证后点击"获取验证码"',
        },
        {
          type: "and",
          description: '用户输入收到的正确6位验证码并点击"下一步"',
        },
        {
          type: "then",
          description: "系统应验证通过，将用户引导至第二步（设置密码页）",
        },
        {
          type: "and",
          description: "当用户输入符合强度要求的密码并确认",
        },
        {
          type: "when",
          description: '用户点击"完成注册"',
        },
        {
          type: "then",
          description: "系统应成功创建账户，自动登录并跳转至首页或回调URL",
        },
      ],
    },
    {
      id: "场景2",
      title: "邮箱格式校验失败",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第一步",
        },
        {
          type: "when",
          description: '用户输入无效的邮箱格式（如"user@"或"user.com"）',
        },
        {
          type: "then",
          description: '系统应在邮箱输入框旁显示"请输入有效的邮箱地址"错误提示',
        },
        {
          type: "and",
          description: '"获取验证码"按钮应不可点击',
        },
      ],
    },
    {
      id: "场景3",
      title: "邮箱已被注册",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第一步",
        },
        {
          type: "when",
          description: "用户输入一个已在平台注册的邮箱并尝试获取验证码",
        },
        {
          type: "then",
          description: '系统应提示"该邮箱已被注册，请直接登录"',
        },
        {
          type: "and",
          description: '提供"去登录"的链接',
        },
      ],
    },
    {
      id: "场景4",
      title: "人机验证未通过",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第一步",
        },
        {
          type: "when",
          description: '用户未完成Turnstile人机验证就点击"获取验证码"',
        },
        {
          type: "then",
          description: '系统应提示"请先完成安全验证"',
        },
        {
          type: "and",
          description: "验证码不应被发送",
        },
      ],
    },
    {
      id: "场景5",
      title: "验证码发送成功后的倒计时",
      steps: [
        {
          type: "given",
          description: '用户已通过人机验证并点击"获取验证码"',
        },
        {
          type: "when",
          description: "验证码发送成功",
        },
        {
          type: "then",
          description: '"获取验证码"按钮应变为禁用状态并显示60秒倒计时',
        },
        {
          type: "and",
          description: "倒计时结束后按钮恢复可用状态",
        },
      ],
    },
    {
      id: "场景6",
      title: "验证码错误或已过期",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第一步并已收到验证码",
        },
        {
          type: "when",
          description: '用户输入错误的或已过期的6位验证码并点击"下一步"',
        },
        {
          type: "then",
          description: '系统应提示"验证码错误或已失效"',
        },
        {
          type: "and",
          description: "允许用户重新获取验证码",
        },
      ],
    },
    {
      id: "场景7",
      title: "用户未同意用户协议",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第一步",
        },
        {
          type: "when",
          description: '用户填写了邮箱和验证码但未勾选"同意用户协议"',
        },
        {
          type: "and",
          description: '点击"下一步"',
        },
        {
          type: "then",
          description: '系统应提示"请先阅读并同意用户协议"',
        },
        {
          type: "and",
          description: "注册流程不应继续",
        },
      ],
    },
    {
      id: "场景8",
      title: "设置密码时两次输入不一致",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第二步",
        },
        {
          type: "when",
          description: '用户输入的"密码"与"确认密码"不一致',
        },
        {
          type: "then",
          description: '系统应在确认密码框旁提示"两次输入的密码不一致"',
        },
        {
          type: "and",
          description: '"完成注册"按钮应不可点击',
        },
      ],
    },
    {
      id: "场景9",
      title: "密码不符合强度要求",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面第二步",
        },
        {
          type: "when",
          description:
            "用户输入的密码不符合要求（如少于8位、无大写字母或无小写字母）",
        },
        {
          type: "then",
          description: "系统应显示具体的密码要求提示",
        },
        {
          type: "and",
          description: "密码强度指示器应显示当前强度等级",
        },
      ],
    },
  ],
  notes: `采用两步式向导界面。第一步:验证邮箱(邮箱输入框、Turnstile人机验证组件、"获取验证码"按钮(带60秒倒计时)、验证码输入框(6位数字)、"我已阅读并同意《用户协议》"的复选框及协议链接、"下一步"按钮、"已有账户?去登录"的链接)。第二步:设置密码(注册邮箱提示文本(脱敏显示)、密码输入框(带强度指示器和可见性切换)、确认密码输入框、"完成注册"按钮、"返回上一步"按钮)。`,
};

const REQ_U03: Requirement = {
  id: "REQ-U03",
  module: "user",
  name: "GitHub OAuth注册",
  overview:
    "本功能允许用户通过GitHub第三方授权快速完成注册，无需填写表单和设置密码。系统将使用GitHub提供的用户信息（用户名、头像、邮箱）自动创建平台账户。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个拥有GitHub账户的新访客，我希望能通过GitHub一键授权来创建账户，以便跳过繁琐的表单填写，快速开始使用平台。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户通过GitHub成功注册 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户位于注册页面，且其GitHub账户的邮箱未在本平台注册",
        },
        {
          type: "when",
          description: '用户点击"通过GitHub注册"按钮',
        },
        {
          type: "and",
          description: "用户在GitHub授权页面完成授权",
        },
        {
          type: "then",
          description:
            "系统应使用GitHub信息（用户名、头像、邮箱）自动创建平台账户",
        },
        {
          type: "and",
          description: "用户应自动进入登录状态并跳转至首页",
        },
      ],
    },
    {
      id: "场景2",
      title: "GitHub邮箱已在平台注册",
      steps: [
        {
          type: "given",
          description: "一个GitHub账户的邮箱地址已在平台注册",
        },
        {
          type: "when",
          description: "该用户尝试通过此GitHub账户进行授权注册",
        },
        {
          type: "then",
          description: "系统应将GitHub账户关联到现有账户",
        },
        {
          type: "and",
          description: "用户应自动登录并跳转至首页",
        },
      ],
    },
    {
      id: "场景3",
      title: "用户拒绝GitHub授权",
      steps: [
        {
          type: "given",
          description: '用户点击了"通过GitHub注册"按钮',
        },
        {
          type: "when",
          description: '用户在GitHub授权页面点击"拒绝"或关闭窗口',
        },
        {
          type: "then",
          description: "用户应返回注册页面",
        },
        {
          type: "and",
          description: '系统应显示"授权已取消"提示',
        },
      ],
    },
    {
      id: "场景4",
      title: "GitHub授权过程中网络异常",
      steps: [
        {
          type: "given",
          description: '用户点击了"通过GitHub注册"按钮',
        },
        {
          type: "when",
          description: "授权过程中发生网络超时或连接失败",
        },
        {
          type: "then",
          description: '系统应显示"授权失败，请稍后重试"提示',
        },
        {
          type: "and",
          description: "用户应停留在注册页面",
        },
      ],
    },
    {
      id: "场景5",
      title: "获取GitHub用户信息失败",
      steps: [
        {
          type: "given",
          description: "用户已完成GitHub授权",
        },
        {
          type: "when",
          description: "系统无法获取GitHub用户信息（如邮箱未公开）",
        },
        {
          type: "then",
          description:
            '系统应显示"无法获取用户信息，请确保GitHub邮箱已公开"提示',
        },
      ],
    },
  ],
  notes:
    '所需UI元素："通过GitHub注册/登录"按钮（带GitHub图标）、分割线或文字提示"其他方式注册"。关键交互：点击按钮后跳转至GitHub OAuth授权页面；授权成功后自动跳转回平台并完成注册/登录。',
};

const REQ_U04: Requirement = {
  id: "REQ-U04",
  module: "user",
  name: "手机号密码登录",
  overview:
    "本功能为已注册用户提供使用手机号和密码进行身份认证的入口。用户需要通过Turnstile人机验证并同意用户协议后才能完成登录。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个已注册用户，我希望能使用我的手机号和密码进行登录，以便安全地访问我的账户和订单信息。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户使用手机号密码成功登录 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "and",
          description: '用户已勾选"同意用户协议"',
        },
        {
          type: "when",
          description: "用户输入已注册的11位手机号和正确的密码",
        },
        {
          type: "and",
          description: '通过Turnstile人机验证后点击"登录"',
        },
        {
          type: "then",
          description: "系统应验证凭证成功",
        },
        {
          type: "and",
          description: "将用户跳转至个人中心或之前的页面（CallbackURL）",
        },
      ],
    },
    {
      id: "场景2",
      title: "手机号格式错误",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: "用户输入非11位数字的手机号",
        },
        {
          type: "then",
          description: '系统应在手机号输入框旁显示"请输入有效的11位手机号"',
        },
        {
          type: "and",
          description: '"登录"按钮应不可点击',
        },
      ],
    },
    {
      id: "场景3",
      title: "密码错误",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: "用户输入已注册的手机号但密码错误",
        },
        {
          type: "and",
          description: '点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"手机号或密码错误"',
        },
        {
          type: "and",
          description: "用户停留在登录页面",
        },
      ],
    },
    {
      id: "场景4",
      title: "手机号未注册",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: '用户输入一个未注册的手机号并点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"账户不存在，请先注册"',
        },
        {
          type: "and",
          description: "提供注册页面的链接",
        },
      ],
    },
    {
      id: "场景5",
      title: "用户未同意用户协议",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: '用户填写了手机号和密码但未勾选"同意用户协议"',
        },
        {
          type: "and",
          description: '点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"请先阅读并同意用户协议"',
        },
        {
          type: "and",
          description: "登录流程不应继续",
        },
      ],
    },
    {
      id: "场景6",
      title: "人机验证未通过",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: '用户未完成Turnstile人机验证就点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"请先完成安全验证"',
        },
        {
          type: "and",
          description: "登录请求不应发送",
        },
      ],
    },
  ],
  notes:
    '所需UI元素：手机号输入框（11位数字）、密码输入框（带可见性切换）、Turnstile人机验证组件、"我已阅读并同意《用户协议》"复选框、"登录"按钮、"忘记密码？"链接、"没有账户？去注册"链接、第三方登录区域（GitHub图标）。',
};

const REQ_U05: Requirement = {
  id: "REQ-U05",
  module: "user",
  name: "手机号OTP登录",
  overview:
    "本功能为已注册用户提供使用手机号和短信验证码进行快速登录的方式，适用于用户忘记密码或在公共设备上登录的场景。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个已注册用户，我希望能通过发送到我手机的一次性验证码来登录，以便在我忘记密码或在公共设备上登录时，能快速、安全地访问账户。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户使用手机号验证码成功登录 (Happy Path)",
      steps: [
        {
          type: "given",
          description: '用户位于登录页面并切换到"验证码登录"模式',
        },
        {
          type: "and",
          description: '用户已勾选"同意用户协议"',
        },
        {
          type: "when",
          description: "用户输入已注册的11位手机号",
        },
        {
          type: "and",
          description: "通过人机验证后获取验证码",
        },
        {
          type: "and",
          description: '输入正确的6位验证码并点击"登录"',
        },
        {
          type: "then",
          description: "系统应验证通过并成功登录",
        },
        {
          type: "and",
          description: "将用户跳转至个人中心或之前的页面",
        },
      ],
    },
    {
      id: "场景2",
      title: "手机号格式错误",
      steps: [
        {
          type: "given",
          description: '用户位于登录页面"验证码登录"模式',
        },
        {
          type: "when",
          description: "用户输入非11位数字的手机号",
        },
        {
          type: "then",
          description: '系统应显示"请输入有效的11位手机号"',
        },
        {
          type: "and",
          description: '"获取验证码"按钮应不可点击',
        },
      ],
    },
    {
      id: "场景3",
      title: "手机号未注册",
      steps: [
        {
          type: "given",
          description: '用户位于登录页面"验证码登录"模式',
        },
        {
          type: "when",
          description: "用户输入一个未注册的手机号并尝试获取验证码",
        },
        {
          type: "then",
          description: '系统应提示"账户不存在，请先注册"',
        },
        {
          type: "and",
          description: "提供注册页面的链接",
        },
      ],
    },
    {
      id: "场景4",
      title: "验证码错误或已过期",
      steps: [
        {
          type: "given",
          description: "用户已获取验证码",
        },
        {
          type: "when",
          description: '用户输入错误的或已过期的验证码并点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"验证码错误或已失效"',
        },
        {
          type: "and",
          description: "允许用户重新获取验证码",
        },
      ],
    },
    {
      id: "场景5",
      title: "用户未同意用户协议",
      steps: [
        {
          type: "given",
          description: '用户位于登录页面"验证码登录"模式',
        },
        {
          type: "when",
          description: '用户填写了手机号和验证码但未勾选"同意用户协议"',
        },
        {
          type: "and",
          description: '点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"请先阅读并同意用户协议"',
        },
      ],
    },
    {
      id: "场景6",
      title: "验证码发送频率限制",
      steps: [
        {
          type: "given",
          description: "用户刚获取了验证码，倒计时尚未结束",
        },
        {
          type: "when",
          description: '用户尝试再次点击"获取验证码"',
        },
        {
          type: "then",
          description: "按钮应保持禁用状态",
        },
        {
          type: "and",
          description: "显示剩余倒计时秒数",
        },
      ],
    },
  ],
  notes:
    '所需UI元素："密码登录"/"验证码登录"切换组件、手机号输入框、"获取验证码"按钮（带60秒倒计时）、验证码输入框（6位数字）、Turnstile人机验证组件、"我已阅读并同意《用户协议》"复选框、"登录"按钮。',
};

const REQ_U06: Requirement = {
  id: "REQ-U06",
  module: "user",
  name: "邮箱密码登录",
  overview:
    "本功能为已注册用户提供使用邮箱和密码进行身份认证的入口。用户需要通过Turnstile人机验证并同意用户协议后才能完成登录。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个已注册用户，我希望能使用我的邮箱和密码进行登录，以便安全地访问我的账户和订单信息。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户使用邮箱密码成功登录 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "and",
          description: '用户已勾选"同意用户协议"',
        },
        {
          type: "when",
          description: "用户输入已注册的邮箱和正确的密码",
        },
        {
          type: "and",
          description: '通过Turnstile人机验证后点击"登录"',
        },
        {
          type: "then",
          description: "系统应验证凭证成功",
        },
        {
          type: "and",
          description: "将用户跳转至个人中心或之前的页面",
        },
      ],
    },
    {
      id: "场景2",
      title: "邮箱格式错误",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: "用户输入无效的邮箱格式",
        },
        {
          type: "then",
          description: '系统应显示"请输入有效的邮箱地址"',
        },
        {
          type: "and",
          description: '"登录"按钮应不可点击',
        },
      ],
    },
    {
      id: "场景3",
      title: "密码错误",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: "用户输入已注册的邮箱但密码错误",
        },
        {
          type: "and",
          description: '点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"邮箱或密码错误"',
        },
        {
          type: "and",
          description: "用户停留在登录页面",
        },
      ],
    },
    {
      id: "场景4",
      title: "邮箱未注册",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: '用户输入一个未注册的邮箱并点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"账户不存在，请先注册"',
        },
        {
          type: "and",
          description: "提供注册页面的链接",
        },
      ],
    },
    {
      id: "场景5",
      title: "用户未同意用户协议",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: '用户填写了邮箱和密码但未勾选"同意用户协议"',
        },
        {
          type: "and",
          description: '点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"请先阅读并同意用户协议"',
        },
      ],
    },
    {
      id: "场景6",
      title: "人机验证未通过",
      steps: [
        {
          type: "given",
          description: "用户位于登录页面",
        },
        {
          type: "when",
          description: '用户未完成Turnstile人机验证就点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"请先完成安全验证"',
        },
      ],
    },
  ],
  notes:
    '所需UI元素：邮箱输入框、密码输入框（带可见性切换）、Turnstile人机验证组件、"我已阅读并同意《用户协议》"复选框、"登录"按钮、"忘记密码？"链接、"没有账户？去注册"链接、第三方登录区域（GitHub图标）。',
};

const REQ_U07: Requirement = {
  id: "REQ-U07",
  module: "user",
  name: "邮箱OTP登录",
  overview:
    "本功能为已注册用户提供使用邮箱和验证码进行快速登录的方式，适用于用户忘记密码或在公共设备上登录的场景。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个已注册用户，我希望能通过发送到我邮箱的一次性验证码来登录，以便在我忘记密码时，能快速、安全地访问账户。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户使用邮箱验证码成功登录 (Happy Path)",
      steps: [
        {
          type: "given",
          description: '用户位于登录页面并切换到"验证码登录"模式',
        },
        {
          type: "and",
          description: '用户已勾选"同意用户协议"',
        },
        {
          type: "when",
          description: "用户输入已注册的邮箱地址",
        },
        {
          type: "and",
          description: "通过人机验证后获取验证码",
        },
        {
          type: "and",
          description: '输入正确的6位验证码并点击"登录"',
        },
        {
          type: "then",
          description: "系统应验证通过并成功登录",
        },
        {
          type: "and",
          description: "将用户跳转至个人中心或之前的页面",
        },
      ],
    },
    {
      id: "场景2",
      title: "邮箱格式错误",
      steps: [
        {
          type: "given",
          description: '用户位于登录页面"验证码登录"模式',
        },
        {
          type: "when",
          description: "用户输入无效的邮箱格式",
        },
        {
          type: "then",
          description: '系统应显示"请输入有效的邮箱地址"',
        },
        {
          type: "and",
          description: '"获取验证码"按钮应不可点击',
        },
      ],
    },
    {
      id: "场景3",
      title: "邮箱未注册",
      steps: [
        {
          type: "given",
          description: '用户位于登录页面"验证码登录"模式',
        },
        {
          type: "when",
          description: "用户输入一个未注册的邮箱并尝试获取验证码",
        },
        {
          type: "then",
          description: '系统应提示"账户不存在，请先注册"',
        },
        {
          type: "and",
          description: "提供注册页面的链接",
        },
      ],
    },
    {
      id: "场景4",
      title: "验证码错误或已过期",
      steps: [
        {
          type: "given",
          description: "用户已获取验证码",
        },
        {
          type: "when",
          description: '用户输入错误的或已过期的验证码并点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"验证码错误或已失效"',
        },
        {
          type: "and",
          description: "允许用户重新获取验证码",
        },
      ],
    },
    {
      id: "场景5",
      title: "用户未同意用户协议",
      steps: [
        {
          type: "given",
          description: '用户位于登录页面"验证码登录"模式',
        },
        {
          type: "when",
          description: '用户填写了邮箱和验证码但未勾选"同意用户协议"',
        },
        {
          type: "and",
          description: '点击"登录"',
        },
        {
          type: "then",
          description: '系统应提示"请先阅读并同意用户协议"',
        },
      ],
    },
    {
      id: "场景6",
      title: "验证码发送频率限制",
      steps: [
        {
          type: "given",
          description: "用户刚获取了验证码，倒计时尚未结束",
        },
        {
          type: "when",
          description: '用户尝试再次点击"获取验证码"',
        },
        {
          type: "then",
          description: "按钮应保持禁用状态",
        },
        {
          type: "and",
          description: "显示剩余倒计时秒数",
        },
      ],
    },
  ],
  notes:
    '所需UI元素："密码登录"/"验证码登录"切换组件、邮箱输入框、"获取验证码"按钮（带60秒倒计时）、验证码输入框（6位数字）、Turnstile人机验证组件、"我已阅读并同意《用户协议》"复选框、"登录"按钮。',
};

const REQ_U08: Requirement = {
  id: "REQ-U08",
  module: "user",
  name: "个人基本信息管理",
  overview: `本功能位于用户登录后的"个人中心"内，允许用户查看和编辑自己的个人基本资料，如昵称、姓名、性别、生日等。同时，为保护隐私，敏感信息（手机号、邮箱）将以脱敏形式展示。`,
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个已登录用户，我希望能查看我的个人基本信息，以便确认我的账户资料。",
    },
    {
      id: "US-02",
      content:
        "作为一个已登录用户，我希望能修改我的昵称、姓名、性别、生日等信息，以便保持我的个人资料准确或更具个性化。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功查看个人信息 (Happy Path)",
      steps: [
        {
          type: "given",
          description: '用户已登录并访问"个人中心"的"基本信息"页面',
        },
        {
          type: "when",
          description: "页面加载完成",
        },
        {
          type: "then",
          description: "页面应正确显示当前用户的昵称、姓名、性别、生日",
        },
        {
          type: "and",
          description: "用户的手机号应被部分屏蔽显示（如 `138****5678`）",
        },
        {
          type: "and",
          description: "用户的邮箱应被部分屏蔽显示（如 `u***@example.com`）",
        },
        {
          type: "and",
          description: "显示手机和邮箱的验证状态",
        },
      ],
    },
    {
      id: "场景2",
      title: "用户成功编辑并保存信息 (Happy Path)",
      steps: [
        {
          type: "given",
          description: '用户位于"基本信息"页面的查看状态',
        },
        {
          type: "when",
          description: '用户点击"编辑"按钮',
        },
        {
          type: "then",
          description: "页面应切换为编辑状态，各字段变为可输入",
        },
        {
          type: "when",
          description: '用户修改昵称、姓名、性别或生日后点击"保存"',
        },
        {
          type: "then",
          description: '系统应提示"保存成功"',
        },
        {
          type: "and",
          description: "页面应显示更新后的信息",
        },
      ],
    },
    {
      id: "场景3",
      title: "用户取消编辑",
      steps: [
        {
          type: "given",
          description: "用户处于编辑状态并修改了部分信息",
        },
        {
          type: "when",
          description: '用户点击"取消"按钮',
        },
        {
          type: "then",
          description: "页面应恢复为查看状态",
        },
        {
          type: "and",
          description: "所有修改应被丢弃，显示原有信息",
        },
      ],
    },
    {
      id: "场景4",
      title: "字段格式校验失败",
      steps: [
        {
          type: "given",
          description: "用户处于编辑状态",
        },
        {
          type: "when",
          description: "用户输入超过50个字符的昵称",
        },
        {
          type: "then",
          description: '系统应提示"昵称不能超过50个字符"',
        },
        {
          type: "and",
          description: "保存操作应被阻止",
        },
      ],
    },
    {
      id: "场景5",
      title: "部分字段更新",
      steps: [
        {
          type: "given",
          description: "用户处于编辑状态",
        },
        {
          type: "when",
          description: "用户只修改了性别字段，其他保持不变",
        },
        {
          type: "and",
          description: '点击"保存"',
        },
        {
          type: "then",
          description: "系统应只更新性别字段",
        },
        {
          type: "and",
          description: "其他字段保持原值不变",
        },
      ],
    },
  ],
  notes:
    '页面布局：采用左侧导航栏（包含"基本信息"、"账户安全"、"常用旅客"等链接），右侧内容区的经典布局。所需UI元素：查看状态（昵称、姓名、性别、生日的文本显示，脱敏的手机号和邮箱，"编辑"按钮）、编辑状态（可输入的表单字段，"保存"和"取消"按钮）、性别单选按钮（男/女/其他）、生日日期选择器。',
};

const REQ_U09: Requirement = {
  id: "REQ-U09",
  module: "user",
  name: "密码管理",
  overview: `本功能允许已登录的用户在"个人中心"的安全设置区域修改自己的账户密码。对于通过OAuth注册的用户，也可以在此设置初始密码。用户需要提供当前密码进行验证（如有），然后设置符合安全要求的新密码。`,
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个注重安全的用户，我希望能够定期修改我的登录密码，以便降低我的账户被盗用的风险。",
    },
    {
      id: "US-02",
      content:
        "作为一个通过GitHub注册的用户，我希望能够设置一个平台密码，以便在GitHub不可用时仍能登录。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功修改密码 (Happy Path)",
      steps: [
        {
          type: "given",
          description: '用户已登录并拥有密码，访问"密码修改"页面',
        },
        {
          type: "when",
          description: "用户输入正确的当前密码",
        },
        {
          type: "and",
          description: "输入符合要求的新密码（至少8位，含数字和字母）",
        },
        {
          type: "and",
          description: "确认新密码一致",
        },
        {
          type: "and",
          description: '点击"更新密码"',
        },
        {
          type: "then",
          description: '系统应提示"密码修改成功"',
        },
        {
          type: "and",
          description: "用户应被跳转至安全设置页面",
        },
      ],
    },
    {
      id: "场景2",
      title: "当前密码错误",
      steps: [
        {
          type: "given",
          description: '用户已登录并访问"密码修改"页面',
        },
        {
          type: "when",
          description: "用户输入错误的当前密码并尝试提交",
        },
        {
          type: "then",
          description: '系统应提示"当前密码不正确"',
        },
        {
          type: "and",
          description: "密码不应被修改",
        },
      ],
    },
    {
      id: "场景3",
      title: "新密码强度不足",
      steps: [
        {
          type: "given",
          description: '用户位于"密码修改"页面',
        },
        {
          type: "when",
          description: "用户输入的新密码少于8位或不含数字/字母",
        },
        {
          type: "then",
          description:
            '系统应显示具体的密码要求（如"密码需至少8位，包含数字和字母"）',
        },
        {
          type: "and",
          description: "提交应被阻止",
        },
      ],
    },
    {
      id: "场景4",
      title: "两次新密码不一致",
      steps: [
        {
          type: "given",
          description: '用户位于"密码修改"页面',
        },
        {
          type: "when",
          description: '用户输入的"新密码"与"确认新密码"不匹配',
        },
        {
          type: "then",
          description: '系统应提示"两次输入的密码不一致"',
        },
        {
          type: "and",
          description: "提交应被阻止",
        },
      ],
    },
    {
      id: "场景5",
      title: "新密码与当前密码相同",
      steps: [
        {
          type: "given",
          description: '用户位于"密码修改"页面',
        },
        {
          type: "when",
          description: "用户输入的新密码与当前密码相同",
        },
        {
          type: "then",
          description: '系统应提示"新密码不能与当前密码相同"',
        },
        {
          type: "and",
          description: "提交应被阻止",
        },
      ],
    },
    {
      id: "场景6",
      title: "OAuth用户首次设置密码 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户通过GitHub注册，尚未设置密码",
        },
        {
          type: "and",
          description: '用户访问"密码设置"页面',
        },
        {
          type: "when",
          description: "用户输入符合要求的新密码并确认",
        },
        {
          type: "and",
          description: '点击"设置密码"',
        },
        {
          type: "then",
          description: '系统应提示"密码设置成功"',
        },
        {
          type: "and",
          description: "用户应被跳转至安全设置页面",
        },
      ],
    },
    {
      id: "场景7",
      title: "密码可见性切换",
      steps: [
        {
          type: "given",
          description: "用户位于密码修改页面",
        },
        {
          type: "when",
          description: '用户点击密码输入框旁的"显示/隐藏"按钮',
        },
        {
          type: "then",
          description: "密码应在明文和密文之间切换显示",
        },
      ],
    },
  ],
  notes:
    '所需UI元素："当前密码"输入框（仅修改密码时显示）、"新密码"输入框（带可见性切换）、"确认新密码"输入框、密码强度要求说明、"更新密码"/"设置密码"按钮。',
};

const REQ_U10: Requirement = {
  id: "REQ-U10",
  module: "user",
  name: "绑定信息更新",
  overview: `本功能允许用户在"个人中心"的安全设置区域更新绑定的手机号或邮箱。更新操作需要通过OTP验证新手机号/邮箱的所有权，验证成功后自动将新信息标记为已验证状态。`,
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个更换了手机号的用户，我希望能更新我的绑定手机号，以便继续使用手机验证码登录和接收重要通知。",
    },
    {
      id: "US-02",
      content:
        "作为一个更换了邮箱的用户，我希望能更新我的绑定邮箱，以便继续使用邮箱验证码登录和接收重要通知。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功更新手机号 (Happy Path)",
      steps: [
        {
          type: "given",
          description: '用户已登录并访问"更换手机号"页面',
        },
        {
          type: "when",
          description: "用户输入新的11位手机号",
        },
        {
          type: "and",
          description: "通过人机验证后获取验证码",
        },
        {
          type: "and",
          description: '输入正确的6位验证码并点击"确认更换"',
        },
        {
          type: "then",
          description: "系统应更新用户的手机号",
        },
        {
          type: "and",
          description: "将新手机号标记为已验证",
        },
        {
          type: "and",
          description: "跳转至安全设置页面并显示成功提示",
        },
      ],
    },
    {
      id: "场景2",
      title: "用户成功更新邮箱 (Happy Path)",
      steps: [
        {
          type: "given",
          description: '用户已登录并访问"更换邮箱"页面',
        },
        {
          type: "when",
          description: "用户输入新的邮箱地址",
        },
        {
          type: "and",
          description: "通过人机验证后获取验证码",
        },
        {
          type: "and",
          description: '输入正确的6位验证码并点击"确认更换"',
        },
        {
          type: "then",
          description: "系统应更新用户的邮箱",
        },
        {
          type: "and",
          description: "将新邮箱标记为已验证",
        },
        {
          type: "and",
          description: "跳转至安全设置页面并显示成功提示",
        },
      ],
    },
    {
      id: "场景3",
      title: "新手机号格式错误",
      steps: [
        {
          type: "given",
          description: '用户位于"更换手机号"页面',
        },
        {
          type: "when",
          description: "用户输入非11位数字的手机号",
        },
        {
          type: "then",
          description: '系统应显示"请输入有效的11位手机号"',
        },
        {
          type: "and",
          description: '"获取验证码"按钮应不可点击',
        },
      ],
    },
    {
      id: "场景4",
      title: "新邮箱格式错误",
      steps: [
        {
          type: "given",
          description: '用户位于"更换邮箱"页面',
        },
        {
          type: "when",
          description: "用户输入无效的邮箱格式",
        },
        {
          type: "then",
          description: '系统应显示"请输入有效的邮箱地址"',
        },
        {
          type: "and",
          description: '"获取验证码"按钮应不可点击',
        },
      ],
    },
    {
      id: "场景5",
      title: "验证码错误或已过期",
      steps: [
        {
          type: "given",
          description: "用户已获取更换手机/邮箱的验证码",
        },
        {
          type: "when",
          description: "用户输入错误的或已过期的验证码",
        },
        {
          type: "then",
          description: '系统应提示"验证码错误或已失效"',
        },
        {
          type: "and",
          description: "允许用户重新获取验证码",
        },
      ],
    },
    {
      id: "场景6",
      title: "新手机号/邮箱已被其他用户使用",
      steps: [
        {
          type: "given",
          description: '用户位于"更换手机号/邮箱"页面',
        },
        {
          type: "when",
          description: "用户输入一个已被其他用户绑定的手机号/邮箱",
        },
        {
          type: "then",
          description: '系统应提示"该手机号/邮箱已被使用"',
        },
        {
          type: "and",
          description: "更换操作应被阻止",
        },
      ],
    },
    {
      id: "场景7",
      title: "人机验证未通过",
      steps: [
        {
          type: "given",
          description: '用户位于"更换手机号/邮箱"页面',
        },
        {
          type: "when",
          description: '用户未完成人机验证就点击"获取验证码"',
        },
        {
          type: "then",
          description: '系统应提示"请先完成安全验证"',
        },
      ],
    },
  ],
  notes:
    '所需UI元素：新手机号/邮箱输入框、Turnstile人机验证组件、"获取验证码"按钮（带60秒倒计时）、验证码输入框、"确认更换"按钮、"取消"按钮。',
};

const REQ_U11: Requirement = {
  id: "REQ-U11",
  module: "user",
  name: "常用旅客CRUD",
  overview: `本功能允许已登录用户在"个人中心"内预先添加和管理自己及同行旅客（如家人、朋友）的个人信息。在预订机票填写旅客信息时，用户可以直接从列表中选择，从而极大简化预订流程、节省时间，并有效避免因手动输入而产生的错误。`,
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个经常为家人预订机票的用户，我希望能提前将他们的身份信息保存为常用旅客，以便在预订时能一键选择，不必每次都去查找和输入。",
    },
    {
      id: "US-02",
      content:
        "作为一个用户，我希望能随时编辑或删除已保存的常用旅客信息，以便在他们的证件更新或不再同行时，保持列表的准确性。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户查看空的旅客列表",
      steps: [
        {
          type: "given",
          description: '用户已登录并访问"常用旅客"页面',
        },
        {
          type: "when",
          description: "该用户从未添加过任何旅客",
        },
        {
          type: "then",
          description: '页面应显示"暂无常用旅客"的友好提示',
        },
        {
          type: "and",
          description: '显示一个"添加新旅客"的按钮',
        },
      ],
    },
    {
      id: "场景2",
      title: "用户成功添加新旅客 (Happy Path)",
      steps: [
        {
          type: "given",
          description: '用户位于"添加新旅客"页面',
        },
        {
          type: "when",
          description:
            "用户填写所有必填信息（姓名、证件类型、证件号、证件有效期）",
        },
        {
          type: "and",
          description: '点击"保存"',
        },
        {
          type: "then",
          description: '系统应提示"添加成功"',
        },
        {
          type: "and",
          description: "用户应被跳转至旅客列表页",
        },
        {
          type: "and",
          description: "新添加的旅客应出现在列表中",
        },
      ],
    },
    {
      id: "场景3",
      title: "必填字段未填写",
      steps: [
        {
          type: "given",
          description: '用户位于"添加新旅客"页面',
        },
        {
          type: "when",
          description: '用户未填写"证件号码"就点击"保存"',
        },
        {
          type: "then",
          description: '系统应在"证件号码"输入框旁提示"此项为必填项"',
        },
        {
          type: "and",
          description: "保存操作应被阻止",
        },
      ],
    },
    {
      id: "场景4",
      title: "证件有效期已过期",
      steps: [
        {
          type: "given",
          description: '用户位于"添加新旅客"页面',
        },
        {
          type: "when",
          description: "用户选择了一个过去的日期作为证件有效期",
        },
        {
          type: "then",
          description: '系统应提示"证件有效期必须是将来的日期"',
        },
        {
          type: "and",
          description: "保存操作应被阻止",
        },
      ],
    },
    {
      id: "场景5",
      title: "用户成功编辑旅客信息 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户的旅客列表中已有一名旅客",
        },
        {
          type: "when",
          description: '用户点击该旅客的"编辑"按钮进入编辑页面',
        },
        {
          type: "and",
          description: '修改信息后点击"保存"',
        },
        {
          type: "then",
          description: '系统应提示"更新成功"',
        },
        {
          type: "and",
          description: "列表中的信息应更新为修改后的内容",
        },
      ],
    },
    {
      id: "场景6",
      title: "用户成功删除旅客 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户的旅客列表中有多名旅客",
        },
        {
          type: "when",
          description: '用户点击某名旅客的"删除"按钮',
        },
        {
          type: "then",
          description: "系统应弹出确认对话框",
        },
        {
          type: "when",
          description: '用户点击"确认"',
        },
        {
          type: "then",
          description: "该旅客应从列表中移除（软删除）",
        },
        {
          type: "and",
          description: '显示"删除成功"提示',
        },
      ],
    },
    {
      id: "场景7",
      title: "用户取消删除操作",
      steps: [
        {
          type: "given",
          description: '用户点击了旅客的"删除"按钮',
        },
        {
          type: "when",
          description: '确认对话框出现后用户点击"取消"',
        },
        {
          type: "then",
          description: "对话框应关闭",
        },
        {
          type: "and",
          description: "旅客信息应保留在列表中",
        },
      ],
    },
    {
      id: "场景8",
      title: "用户批量删除旅客",
      steps: [
        {
          type: "given",
          description: "用户的旅客列表中有多名旅客",
        },
        {
          type: "when",
          description: '用户勾选多名旅客并点击"批量删除"',
        },
        {
          type: "and",
          description: '在确认对话框中点击"确认"',
        },
        {
          type: "then",
          description: "所有被选中的旅客应从列表中移除",
        },
        {
          type: "and",
          description: '显示"成功删除X名旅客"提示',
        },
      ],
    },
    {
      id: "场景9",
      title: `设置"这是我本人"`,
      steps: [
        {
          type: "given",
          description: '用户位于"添加新旅客"页面',
        },
        {
          type: "when",
          description: '用户勾选"设为本人"复选框并保存',
        },
        {
          type: "then",
          description: "该旅客应被标记为本人",
        },
        {
          type: "and",
          description: "在预订时优先显示",
        },
      ],
    },
    {
      id: "场景10",
      title: "查看旅客详情",
      steps: [
        {
          type: "given",
          description: "用户的旅客列表中有旅客",
        },
        {
          type: "when",
          description: "用户点击某名旅客进入详情页",
        },
        {
          type: "then",
          description: "页面应显示该旅客的所有信息",
        },
        {
          type: "and",
          description: "证件号码应以脱敏形式显示（如 `310***********1234`）",
        },
      ],
    },
  ],
  notes:
    '所需UI元素："添加新旅客"按钮、旅客数据表格（支持排序、筛选、批量选择）、旅客行操作按钮（查看、编辑、删除）、添加/编辑旅客表单页面、删除确认对话框。表单字段：必填（姓名、证件类型（身份证/护照/其他）、证件号、证件有效期）、选填（国籍、性别、出生日期、出生地、手机、传真、邮箱）、复选框（"设为本人"）。',
};

const REQ_U12: Requirement = {
  id: "REQ-U12",
  module: "user",
  name: "旅客信息快速填充",
  overview: `本功能在机票预订流程的"填写旅客信息"步骤中，允许用户从已保存的常用旅客列表中快速选择并自动填充旅客信息，避免重复输入，提高预订效率和准确性。`,
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个用户，在填写订单信息时，我希望能从我已保存的常用旅客列表中快速选择，以便准确无误地自动填充他们的信息。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功选用常用旅客填充信息 (Happy Path)",
      steps: [
        {
          type: "given",
          description: '用户正在预订流程的"填写旅客信息"步骤',
        },
        {
          type: "and",
          description: "该用户已保存了至少一名常用旅客",
        },
        {
          type: "when",
          description: '用户点击"从常用旅客中选择"并勾选一名旅客',
        },
        {
          type: "then",
          description: "该旅客的姓名、证件类型、证件号码应被自动填充到表单中",
        },
      ],
    },
    {
      id: "场景2",
      title: "用户选择多名旅客",
      steps: [
        {
          type: "given",
          description: "用户正在预订流程中预订多人行程",
        },
        {
          type: "and",
          description: "该用户已保存了多名常用旅客",
        },
        {
          type: "when",
          description: "用户依次选择多名旅客",
        },
        {
          type: "then",
          description: "每名旅客的信息应填充到对应的表单区域",
        },
        {
          type: "and",
          description: '已选择的旅客应在列表中标记为"已选"',
        },
      ],
    },
    {
      id: "场景3",
      title: "常用旅客列表为空",
      steps: [
        {
          type: "given",
          description: '用户正在预订流程的"填写旅客信息"步骤',
        },
        {
          type: "and",
          description: "该用户没有保存任何常用旅客",
        },
        {
          type: "when",
          description: '用户点击"从常用旅客中选择"',
        },
        {
          type: "then",
          description: '应显示"暂无常用旅客"提示',
        },
        {
          type: "and",
          description: '提供"去添加旅客"的链接',
        },
      ],
    },
    {
      id: "场景4",
      title: "取消选择已填充的旅客",
      steps: [
        {
          type: "given",
          description: "用户已从常用旅客中选择并填充了信息",
        },
        {
          type: "when",
          description: "用户取消勾选该旅客",
        },
        {
          type: "then",
          description: "对应的表单字段应被清空",
        },
        {
          type: "and",
          description: "该旅客在列表中恢复为未选状态",
        },
      ],
    },
  ],
  notes:
    '所需UI元素："从常用旅客中选择"按钮/链接、常用旅客选择弹窗/下拉列表、旅客复选框列表（显示姓名、证件类型）、"已选"状态标记。关键交互：勾选旅客后自动填充对应表单字段；取消勾选后清空对应字段；支持多人预订时选择多名旅客。',
};

export const userModule: ModuleDefinition = {
  id: "user",
  name: "用户模块",
  description: "用户注册、登录、个人信息管理等",
  icon: "User",
  requirements: [
    REQ_U01,
    REQ_U02,
    REQ_U03,
    REQ_U04,
    REQ_U05,
    REQ_U06,
    REQ_U07,
    REQ_U08,
    REQ_U09,
    REQ_U10,
    REQ_U11,
    REQ_U12,
  ],
};
