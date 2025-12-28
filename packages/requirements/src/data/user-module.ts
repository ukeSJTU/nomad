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

export const userModule: ModuleDefinition = {
  id: "user",
  name: "用户模块",
  description: "用户注册、登录、个人信息管理等",
  icon: "User",
  requirements: [REQ_U01],
};
