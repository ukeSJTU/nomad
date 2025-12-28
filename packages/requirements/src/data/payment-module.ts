import type { ModuleDefinition, Requirement } from "./types";

const REQ_P01: Requirement = {
  id: "REQ-P01",
  module: "payment",
  name: "用户余额初始化",
  overview:
    "本功能在用户成功注册时自动为其创建虚拟余额账户，初始余额为预设金额。虚拟余额用于模拟支付，支持用户在平台上完成机票预订的支付流程。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为系统，我需要在用户注册时自动创建虚拟余额账户，以便用户可以使用平台余额进行支付。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "新用户注册时初始化余额",
      steps: [
        {
          type: "given",
          description: "新用户完成注册流程",
        },
        {
          type: "when",
          description: "用户账户创建成功",
        },
        {
          type: "then",
          description: `系统应为该用户创建余额字段，初始值为"0.00"`,
        },
      ],
    },
    {
      id: "场景2",
      title: "余额字段数据类型正确",
      steps: [
        {
          type: "given",
          description: "系统创建用户余额字段",
        },
        {
          type: "when",
          description: "查询数据库schema",
        },
        {
          type: "then",
          description: "余额字段应为 NUMERIC(10,2) 类型，精确到分",
        },
      ],
    },
    {
      id: "场景3",
      title: "余额默认值设置",
      steps: [
        {
          type: "given",
          description: "新用户注册",
        },
        {
          type: "when",
          description: "未手动设置余额值",
        },
        {
          type: "then",
          description: `余额应自动设置为默认值"0.00"`,
        },
      ],
    },
    {
      id: "场景4",
      title: "余额字段非空约束",
      steps: [
        {
          type: "given",
          description: "系统创建用户记录",
        },
        {
          type: "when",
          description: "尝试创建不包含余额的用户",
        },
        {
          type: "then",
          description: "系统应自动填充默认余额值，不允许NULL",
        },
      ],
    },
    {
      id: "场景5",
      title: "查询新用户余额",
      steps: [
        {
          type: "given",
          description: "用户刚完成注册",
        },
        {
          type: "when",
          description: "用户查询账户余额",
        },
        {
          type: "then",
          description: `应显示初始余额"¥0.00"`,
        },
      ],
    },
  ],
  notes:
    "页面布局：余额初始化为后台自动处理，无专门UI。所需UI元素：用户个人中心显示当前余额。关键交互：余额初始化无需用户操作。",
};

const REQ_P02: Requirement = {
  id: "REQ-P02",
  module: "payment",
  name: "余额查询展示",
  overview:
    "本功能允许用户在支付页面和个人中心查看当前的虚拟余额。余额以人民币格式显示（带¥符号，精确到分），帮助用户了解可用支付金额。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个用户，我希望能在支付页面看到我的账户余额，以便知道我是否有足够的余额完成支付。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "支付页面显示余额",
      steps: [
        {
          type: "given",
          description: "用户进入订单支付页面",
        },
        {
          type: "when",
          description: "页面加载完成",
        },
        {
          type: "then",
          description: `应在支付方式区域显示"账户余额: ¥XXX.XX"`,
        },
      ],
    },
    {
      id: "场景2",
      title: "显示支付后余额预览",
      steps: [
        {
          type: "given",
          description: "用户在支付页面查看余额信息",
        },
        {
          type: "when",
          description: "系统计算支付后余额",
        },
        {
          type: "then",
          description: `应显示"支付后余额: ¥XXX.XX"`,
        },
      ],
    },
    {
      id: "场景3",
      title: "余额格式化显示",
      steps: [
        {
          type: "given",
          description: "用户余额为 1234.56 元",
        },
        {
          type: "when",
          description: "系统显示余额",
        },
        {
          type: "then",
          description: `应格式化为"¥1,234.56"（带千位分隔符）`,
        },
      ],
    },
    {
      id: "场景4",
      title: "零余额显示",
      steps: [
        {
          type: "given",
          description: "用户余额为0",
        },
        {
          type: "when",
          description: "查看余额信息",
        },
        {
          type: "then",
          description: `应显示"¥0.00"`,
        },
      ],
    },
    {
      id: "场景5",
      title: "余额实时更新",
      steps: [
        {
          type: "given",
          description: "用户完成支付后返回支付页面",
        },
        {
          type: "when",
          description: "页面重新加载",
        },
        {
          type: "then",
          description: "应显示扣款后的最新余额",
        },
      ],
    },
    {
      id: "场景6",
      title: "负余额预览警示",
      steps: [
        {
          type: "given",
          description: "订单金额大于用户余额",
        },
        {
          type: "when",
          description: "计算支付后余额",
        },
        {
          type: "then",
          description: `支付后余额应以红色字体显示负数（如"-¥50.00"）`,
        },
      ],
    },
  ],
  notes: `页面布局：支付页面右侧边栏的费用明细区域。所需UI元素：账户余额显示（当前余额）、支付后余额显示（预览）、余额不足时的警示样式。关键交互：余额信息只读展示；余额不足时显示红色警示。`,
};

const REQ_P03: Requirement = {
  id: "REQ-P03",
  module: "payment",
  name: "余额精确计算",
  overview:
    "本功能使用精确的货币计算库（currency.js）处理所有涉及金额的运算，避免JavaScript浮点数精度问题，确保支付、退款等金额计算的准确性。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为系统，我需要使用精确的货币计算方法，以便确保所有金额运算准确无误，避免用户资金损失。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "余额扣除精确计算",
      steps: [
        {
          type: "given",
          description: `用户余额为"100.50"元，订单金额为"99.99"元`,
        },
        {
          type: "when",
          description: "系统执行支付扣款",
        },
        {
          type: "then",
          description: `扣款后余额应精确为"0.51"元，不应出现"0.5099999"等精度问题`,
        },
      ],
    },
    {
      id: "场景2",
      title: "多次小额累加精确",
      steps: [
        {
          type: "given",
          description: "订单包含多个增值服务（如15.50 + 20.30 + 5.20）",
        },
        {
          type: "when",
          description: "系统计算订单总金额",
        },
        {
          type: "then",
          description: `总金额应精确为"41.00"元`,
        },
      ],
    },
    {
      id: "场景3",
      title: "货币格式转换一致",
      steps: [
        {
          type: "given",
          description: `数据库存储金额为字符串"100.00"`,
        },
        {
          type: "when",
          description: "系统读取并转换为currency对象",
        },
        {
          type: "then",
          description: "转换后的值应保持精度不变",
        },
      ],
    },
    {
      id: "场景4",
      title: "退款金额精确返还",
      steps: [
        {
          type: "given",
          description: `订单金额为"199.99"元`,
        },
        {
          type: "when",
          description: "用户申请退款",
        },
        {
          type: "then",
          description: `退款金额应精确为"199.99"元，余额增加相同金额`,
        },
      ],
    },
    {
      id: "场景5",
      title: "比较运算正确",
      steps: [
        {
          type: "given",
          description: `用户余额为"100.00"元，订单金额为"100.01"元`,
        },
        {
          type: "when",
          description: "系统比较余额是否充足",
        },
        {
          type: "then",
          description: "应正确判断余额不足",
        },
      ],
    },
    {
      id: "场景6",
      title: "数据库存储格式统一",
      steps: [
        {
          type: "given",
          description: "计算得到金额为100.5元",
        },
        {
          type: "when",
          description: "保存到数据库",
        },
        {
          type: "then",
          description: `应格式化为"100.50"（两位小数）`,
        },
      ],
    },
  ],
  notes:
    "页面布局：精确计算为后台逻辑，无专门UI。所需UI元素：所有金额显示均使用统一格式化函数。关键交互：对用户透明，确保所有显示金额精确。",
};

const REQ_P04: Requirement = {
  id: "REQ-P04",
  module: "payment",
  name: "支付页面访问",
  overview: `本功能提供从订单详情页或订单列表跳转到支付页面的入口。仅待支付状态的订单显示"去支付"按钮，点击后导航至支付页面并携带订单信息。`,
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个有待支付订单的用户，我希望能方便地进入支付页面，以便完成订单支付。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "从订单详情页进入支付",
      steps: [
        {
          type: "given",
          description: "用户在待支付订单的详情页",
        },
        {
          type: "when",
          description: `用户点击"去支付"按钮`,
        },
        {
          type: "then",
          description: "系统应导航至支付页面，URL应包含订单ID参数",
        },
      ],
    },
    {
      id: "场景2",
      title: "支付页面加载订单信息",
      steps: [
        {
          type: "given",
          description: `用户通过"去支付"按钮进入支付页面`,
        },
        {
          type: "when",
          description: "支付页面加载",
        },
        {
          type: "then",
          description: "应显示该订单的完整信息（航班、乘客、金额）",
        },
      ],
    },
    {
      id: "场景3",
      title: "非待支付订单不显示入口",
      steps: [
        {
          type: "given",
          description: `订单状态为"已取消"或"待出行"`,
        },
        {
          type: "when",
          description: "用户查看订单详情",
        },
        {
          type: "then",
          description: `不应显示"去支付"按钮`,
        },
      ],
    },
    {
      id: "场景4",
      title: "直接访问支付页面URL",
      steps: [
        {
          type: "given",
          description: "用户知道支付页面URL",
        },
        {
          type: "when",
          description: "用户直接在浏览器输入URL访问",
        },
        {
          type: "then",
          description: "如果有有效的orderId参数，应正常加载支付页面",
        },
      ],
    },
    {
      id: "场景5",
      title: "无效订单ID访问",
      steps: [
        {
          type: "given",
          description: "用户尝试访问不存在的订单的支付页面",
        },
        {
          type: "when",
          description: "页面尝试加载订单数据",
        },
        {
          type: "then",
          description: `应显示"订单不存在"错误提示`,
        },
      ],
    },
    {
      id: "场景6",
      title: "无权访问他人订单支付页",
      steps: [
        {
          type: "given",
          description: "用户A尝试访问用户B订单的支付页面",
        },
        {
          type: "when",
          description: "系统验证订单所有权",
        },
        {
          type: "then",
          description: `应拒绝访问并显示"无权操作此订单"`,
        },
      ],
    },
  ],
  notes: `页面布局：订单详情页底部操作区显示"去支付"按钮。所需UI元素："去支付"按钮（主要样式，蓝色）、支付页面加载状态。关键交互：点击按钮导航至支付页面；URL参数传递订单ID。`,
};

const REQ_P05: Requirement = {
  id: "REQ-P05",
  module: "payment",
  name: "支付信息展示",
  overview:
    "本功能在支付页面完整展示订单的所有相关信息，包括航班详情、乘机人列表、联系方式、增值服务、费用明细等，帮助用户在支付前最后核对信息。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个准备支付的用户，我希望在支付页面看到订单的完整信息，以便在支付前再次确认所有细节正确无误。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "显示航班信息",
      steps: [
        {
          type: "given",
          description: "用户在支付页面",
        },
        {
          type: "when",
          description: "查看订单信息区域",
        },
        {
          type: "then",
          description: "应显示去程航班的航班号、航空公司、起降时间、起降机场",
        },
      ],
    },
    {
      id: "场景2",
      title: "显示返程航班（往返票）",
      steps: [
        {
          type: "given",
          description: "订单为往返票",
        },
        {
          type: "when",
          description: "用户查看航班信息",
        },
        {
          type: "then",
          description: "应同时显示去程和返程两个航班的详细信息",
        },
      ],
    },
    {
      id: "场景3",
      title: "显示乘机人列表",
      steps: [
        {
          type: "given",
          description: "订单包含3位乘机人",
        },
        {
          type: "when",
          description: "用户查看乘机人信息",
        },
        {
          type: "then",
          description: "应列出所有3位乘机人的姓名、证件类型、证件号（脱敏）",
        },
      ],
    },
    {
      id: "场景4",
      title: "显示费用明细",
      steps: [
        {
          type: "given",
          description: "用户在支付页面右侧费用明细区",
        },
        {
          type: "when",
          description: "查看价格信息",
        },
        {
          type: "then",
          description: "应分项显示：订单号、机票费用、增值服务费用、应付总金额",
        },
      ],
    },
    {
      id: "场景5",
      title: "显示增值服务",
      steps: [
        {
          type: "given",
          description: "订单购买了行李托运和选座服务",
        },
        {
          type: "when",
          description: "用户查看增值服务区域",
        },
        {
          type: "then",
          description: "应列出所有已选增值服务的名称和对应费用",
        },
      ],
    },
    {
      id: "场景6",
      title: "显示联系方式",
      steps: [
        {
          type: "given",
          description: "订单包含联系人手机号和邮箱",
        },
        {
          type: "when",
          description: "用户查看联系信息",
        },
        {
          type: "then",
          description: "应显示手机号（脱敏）和邮箱地址",
        },
      ],
    },
  ],
  notes: `页面布局：左侧主内容区（订单详情：航班、乘客、联系人、增值服务）；右侧边栏（费用明细，sticky定位）。所需UI元素：航班信息卡片、乘机人列表、联系方式显示、增值服务列表、费用明细卡片。关键交互：所有信息只读展示；敏感信息（证件号）进行脱敏。`,
};

const REQ_P06: Requirement = {
  id: "REQ-P06",
  module: "payment",
  name: "支付倒计时",
  overview:
    "本功能在支付页面顶部显示订单的剩余支付时间倒计时。订单创建后有15分钟的支付期限，倒计时帮助用户了解紧迫性。倒计时归零后订单自动取消。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个在支付页面的用户，我希望能看到剩余支付时间倒计时，以便知道我还有多少时间完成支付。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "显示剩余时间倒计时",
      steps: [
        {
          type: "given",
          description: "订单创建后已过5分钟，剩余10分钟",
        },
        {
          type: "when",
          description: "用户进入支付页面",
        },
        {
          type: "then",
          description: `应显示倒计时"剩余 10:00"（MM:SS格式）`,
        },
      ],
    },
    {
      id: "场景2",
      title: "倒计时实时更新",
      steps: [
        {
          type: "given",
          description: "用户正在支付页面",
        },
        {
          type: "when",
          description: "时间流逝",
        },
        {
          type: "then",
          description: "倒计时应每秒减少1秒",
        },
      ],
    },
    {
      id: "场景3",
      title: "倒计时低于5分钟警示",
      steps: [
        {
          type: "given",
          description: "订单剩余支付时间少于5分钟",
        },
        {
          type: "when",
          description: "用户查看倒计时",
        },
        {
          type: "then",
          description: "倒计时应使用红色警示样式",
        },
      ],
    },
    {
      id: "场景4",
      title: "倒计时归零提示",
      steps: [
        {
          type: "given",
          description: "倒计时进行中",
        },
        {
          type: "when",
          description: "倒计时到达00:00",
        },
        {
          type: "then",
          description: `应显示"订单已超时"提示`,
        },
        {
          type: "and",
          description: "页面应提示订单已被取消",
        },
      ],
    },
    {
      id: "场景5",
      title: "倒计时结束后禁用支付",
      steps: [
        {
          type: "given",
          description: "倒计时已归零",
        },
        {
          type: "when",
          description: "用户尝试点击支付按钮",
        },
        {
          type: "then",
          description: "支付按钮应为禁用状态，无法点击",
        },
      ],
    },
    {
      id: "场景6",
      title: "页面刷新后倒计时同步",
      steps: [
        {
          type: "given",
          description: "用户刷新支付页面",
        },
        {
          type: "when",
          description: "页面重新加载",
        },
        {
          type: "then",
          description: "倒计时应显示最新的剩余时间",
        },
      ],
    },
  ],
  notes: `页面布局：支付页面顶部醒目位置。所需UI元素：倒计时组件（MM:SS格式）、时钟图标、警示状态样式（红色）。关键交互：倒计时自动更新；归零时禁用支付功能。`,
};

const REQ_P07: Requirement = {
  id: "REQ-P07",
  module: "payment",
  name: "余额支付处理",
  overview:
    "本功能是支付流程的核心，处理用户使用虚拟余额完成订单支付的全流程。包括验证订单状态、检查余额充足性、扣除余额、更新订单状态、创建支付记录等步骤，所有操作在数据库事务中原子性完成。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个准备支付的用户，我希望能使用平台虚拟余额完成订单支付，以便锁定我的机票预订。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功完成支付",
      steps: [
        {
          type: "given",
          description: `用户余额为500元，订单金额为300元，订单状态为"待支付"`,
        },
        {
          type: "when",
          description: `用户点击"确认支付"并确认`,
        },
        {
          type: "then",
          description: "系统应扣除300元余额",
        },
        {
          type: "and",
          description: `订单状态应更新为"待出行"`,
        },
        {
          type: "and",
          description: "应创建支付记录",
        },
      ],
    },
    {
      id: "场景2",
      title: "验证订单状态可支付",
      steps: [
        {
          type: "given",
          description: `订单状态为"已取消"`,
        },
        {
          type: "when",
          description: "用户尝试支付",
        },
        {
          type: "then",
          description: `系统应拒绝支付并提示"订单无法支付，当前状态：已取消"`,
        },
      ],
    },
    {
      id: "场景3",
      title: "检查支付截止时间",
      steps: [
        {
          type: "given",
          description: "订单支付截止时间已过",
        },
        {
          type: "when",
          description: "用户尝试支付",
        },
        {
          type: "then",
          description: `系统应自动将订单标记为"已取消"`,
        },
        {
          type: "and",
          description: `提示"支付时间已过，订单已被取消"`,
        },
      ],
    },
    {
      id: "场景4",
      title: "支付成功后跳转",
      steps: [
        {
          type: "given",
          description: "支付处理成功",
        },
        {
          type: "when",
          description: "支付完成",
        },
        {
          type: "then",
          description: `系统应导航用户至"预订完成"页面`,
        },
        {
          type: "and",
          description: "显示订单号和成功提示",
        },
      ],
    },
    {
      id: "场景5",
      title: "支付失败回滚",
      steps: [
        {
          type: "given",
          description: "支付过程中发生数据库错误",
        },
        {
          type: "when",
          description: "事务执行失败",
        },
        {
          type: "then",
          description: "所有操作应回滚（余额不变、订单状态不变）",
        },
        {
          type: "and",
          description: `显示错误提示"支付失败，请重试"`,
        },
      ],
    },
    {
      id: "场景6",
      title: "仅支持余额支付",
      steps: [
        {
          type: "given",
          description: `用户选择"微信支付"或"支付宝"`,
        },
        {
          type: "when",
          description: "用户尝试提交支付",
        },
        {
          type: "then",
          description: `系统应提示"当前仅支持平台余额支付"`,
        },
      ],
    },
  ],
  notes: `页面布局：支付页面底部操作区。所需UI元素："确认支付"按钮（主要样式）、支付处理中加载状态、成功/失败提示消息。关键交互：点击支付按钮触发支付流程；支付过程中显示加载状态；成功后自动跳转。`,
};

const REQ_P08: Requirement = {
  id: "REQ-P08",
  module: "payment",
  name: "余额充足性验证",
  overview:
    "本功能在支付前和支付过程中验证用户余额是否足够支付订单金额。前端实时显示余额不足警示，后端在支付事务中再次验证，确保支付安全。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为系统，我需要验证用户余额是否充足，以便防止余额不足的支付请求。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "余额充足时允许支付",
      steps: [
        {
          type: "given",
          description: "用户余额为500元，订单金额为300元",
        },
        {
          type: "when",
          description: "系统验证余额充足性",
        },
        {
          type: "then",
          description: "验证应通过，允许进行支付",
        },
      ],
    },
    {
      id: "场景2",
      title: "余额不足时禁用支付按钮",
      steps: [
        {
          type: "given",
          description: "用户余额为100元，订单金额为200元",
        },
        {
          type: "when",
          description: "支付页面计算支付后余额",
        },
        {
          type: "then",
          description: `"确认支付"按钮应为禁用状态`,
        },
        {
          type: "and",
          description: `显示红色警示"余额不足"`,
        },
      ],
    },
    {
      id: "场景3",
      title: "余额不足提示金额差",
      steps: [
        {
          type: "given",
          description: "用户余额为100元，订单金额为150元",
        },
        {
          type: "when",
          description: "系统检测余额不足",
        },
        {
          type: "then",
          description: `应提示"余额不足。需要：¥150.00，可用：¥100.00"`,
        },
      ],
    },
    {
      id: "场景4",
      title: "后端二次验证余额",
      steps: [
        {
          type: "given",
          description: "前端验证通过但后端执行时余额已变化",
        },
        {
          type: "when",
          description: "后端在事务中检查余额",
        },
        {
          type: "then",
          description: "如余额不足，应拒绝支付并提示错误",
        },
      ],
    },
    {
      id: "场景5",
      title: "余额恰好等于订单金额",
      steps: [
        {
          type: "given",
          description: "用户余额为200.00元，订单金额为200.00元",
        },
        {
          type: "when",
          description: "验证余额充足性",
        },
        {
          type: "then",
          description: "验证应通过，允许支付",
        },
      ],
    },
    {
      id: "场景6",
      title: "精确到分的验证",
      steps: [
        {
          type: "given",
          description: "用户余额为100.50元，订单金额为100.51元",
        },
        {
          type: "when",
          description: "系统验证余额",
        },
        {
          type: "then",
          description: "应正确判断余额不足0.01元",
        },
      ],
    },
  ],
  notes: `页面布局：支付页面右侧费用明细区域。所需UI元素：余额不足警示文字（红色）、支付后余额显示（负数时红色）、禁用状态的支付按钮。关键交互：实时计算并显示支付后余额；余额不足时禁用支付按钮。`,
};

const REQ_P09: Requirement = {
  id: "REQ-P09",
  module: "payment",
  name: "支付并发控制",
  overview:
    "本功能通过数据库行级锁和事务机制，防止同一订单被重复支付、用户余额被并发扣除等问题，确保支付操作的原子性和一致性。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为系统，我需要防止并发支付导致的数据不一致，以便确保每个订单只被支付一次，余额扣除准确。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "防止订单重复支付",
      steps: [
        {
          type: "given",
          description: "两个用户会话同时尝试支付同一订单",
        },
        {
          type: "when",
          description: "两个支付请求并发执行",
        },
        {
          type: "then",
          description: `只有第一个请求应成功，第二个应失败并提示"订单状态已变更"`,
        },
      ],
    },
    {
      id: "场景2",
      title: "订单行级锁定",
      steps: [
        {
          type: "given",
          description: "支付事务正在处理订单A",
        },
        {
          type: "when",
          description: "另一个事务尝试读取订单A进行支付",
        },
        {
          type: "then",
          description: "第二个事务应等待第一个事务完成",
        },
      ],
    },
    {
      id: "场景3",
      title: "用户余额行级锁定",
      steps: [
        {
          type: "given",
          description: "用户A的两个订单同时进入支付流程",
        },
        {
          type: "when",
          description: "两个支付事务都尝试扣除余额",
        },
        {
          type: "then",
          description: "应顺序执行，防止余额计算错误",
        },
      ],
    },
    {
      id: "场景4",
      title: "事务回滚保证一致性",
      steps: [
        {
          type: "given",
          description: "支付事务在更新订单后、扣除余额前失败",
        },
        {
          type: "when",
          description: "事务回滚",
        },
        {
          type: "then",
          description: `订单状态应恢复为"待支付"，余额不变`,
        },
      ],
    },
    {
      id: "场景5",
      title: "支付完成后状态不可逆",
      steps: [
        {
          type: "given",
          description: `订单已成功支付，状态为"待出行"`,
        },
        {
          type: "when",
          description: "另一个延迟的支付请求到达",
        },
        {
          type: "then",
          description: `应拒绝支付并提示"订单已支付"`,
        },
      ],
    },
    {
      id: "场景6",
      title: "并发创建支付记录唯一性",
      steps: [
        {
          type: "given",
          description: "订单ID在payments表有唯一约束",
        },
        {
          type: "when",
          description: "尝试为同一订单创建多条支付记录",
        },
        {
          type: "then",
          description: "应只创建一条记录，其他请求失败",
        },
      ],
    },
  ],
  notes:
    "页面布局：并发控制为后台逻辑，无专门UI。所需UI元素：支付按钮点击后立即禁用，防止重复点击。关键交互：支付过程中按钮显示加载状态；防止用户多次点击支付按钮。",
};

const REQ_P10: Requirement = {
  id: "REQ-P10",
  module: "payment",
  name: "支付记录创建",
  overview:
    "本功能在支付成功后自动创建支付记录（payment）并保存到数据库，记录包括订单ID、支付金额、支付方式、支付状态、交易ID等信息，用于交易追溯和对账。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为系统，我需要为每笔成功的支付创建记录，以便进行交易追溯和财务对账。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "支付成功创建记录",
      steps: [
        {
          type: "given",
          description: "用户成功完成订单支付",
        },
        {
          type: "when",
          description: "支付事务提交",
        },
        {
          type: "then",
          description: "系统应在payments表中创建一条新记录",
        },
      ],
    },
    {
      id: "场景2",
      title: "记录包含完整信息",
      steps: [
        {
          type: "given",
          description: "支付记录已创建",
        },
        {
          type: "when",
          description: "查询该记录",
        },
        {
          type: "then",
          description:
            "应包含：订单ID、支付金额、支付方式（balance）、支付状态（SUCCESS）、交易ID、创建时间",
        },
      ],
    },
    {
      id: "场景3",
      title: "生成唯一交易ID",
      steps: [
        {
          type: "given",
          description: "支付成功",
        },
        {
          type: "when",
          description: "创建支付记录",
        },
        {
          type: "then",
          description: "应生成格式为 `NMD{日期}{时间}{随机码}` 的唯一交易ID",
        },
      ],
    },
    {
      id: "场景4",
      title: "支付金额与订单金额一致",
      steps: [
        {
          type: "given",
          description: "订单金额为299.99元",
        },
        {
          type: "when",
          description: "创建支付记录",
        },
        {
          type: "then",
          description: `支付记录中的金额应为"299.99"`,
        },
      ],
    },
    {
      id: "场景5",
      title: "支付失败不创建记录",
      steps: [
        {
          type: "given",
          description: "支付过程中验证失败（如余额不足）",
        },
        {
          type: "when",
          description: "支付事务回滚",
        },
        {
          type: "then",
          description: "不应创建支付记录",
        },
      ],
    },
    {
      id: "场景6",
      title: "每个订单只有一条支付记录",
      steps: [
        {
          type: "given",
          description: "订单ID在payments表有唯一约束",
        },
        {
          type: "when",
          description: "尝试为同一订单创建第二条记录",
        },
        {
          type: "then",
          description: "应触发唯一性约束错误",
        },
      ],
    },
  ],
  notes:
    "页面布局：支付记录创建为后台逻辑，无专门UI。所需UI元素：支付完成页可显示交易ID供用户参考。关键交互：用户无需直接操作支付记录。",
};

const REQ_P11: Requirement = {
  id: "REQ-P11",
  module: "payment",
  name: "支付结果反馈",
  overview:
    "本功能在支付处理完成后向用户反馈支付结果，包括成功提示、失败原因、后续操作引导等。成功后跳转至预订完成页，失败时显示错误信息并允许重试。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个完成支付的用户，我希望能立即得到支付成功或失败的明确反馈，以便知道我的预订状态并进行后续操作。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "支付成功显示确认",
      steps: [
        {
          type: "given",
          description: "用户成功完成支付",
        },
        {
          type: "when",
          description: "支付处理完成",
        },
        {
          type: "then",
          description: `系统应显示"支付成功"提示消息`,
        },
        {
          type: "and",
          description: "自动跳转至预订完成页",
        },
      ],
    },
    {
      id: "场景2",
      title: "预订完成页显示订单信息",
      steps: [
        {
          type: "given",
          description: "用户支付成功后到达预订完成页",
        },
        {
          type: "when",
          description: "页面加载完成",
        },
        {
          type: "then",
          description: "应显示订单号、航班信息、支付金额等摘要",
        },
      ],
    },
    {
      id: "场景3",
      title: "余额不足时的错误提示",
      steps: [
        {
          type: "given",
          description: "用户余额不足",
        },
        {
          type: "when",
          description: "用户尝试支付",
        },
        {
          type: "then",
          description: `应显示"余额不足。需要：¥XXX，可用：¥YYY"`,
        },
      ],
    },
    {
      id: "场景4",
      title: "订单超时的错误提示",
      steps: [
        {
          type: "given",
          description: "订单支付截止时间已过",
        },
        {
          type: "when",
          description: "用户尝试支付",
        },
        {
          type: "then",
          description: `应显示"支付时间已过，订单已被取消"`,
        },
        {
          type: "and",
          description: "提供返回订单列表或重新搜索航班的链接",
        },
      ],
    },
    {
      id: "场景5",
      title: "网络错误的提示",
      steps: [
        {
          type: "given",
          description: "支付请求因网络问题失败",
        },
        {
          type: "when",
          description: "请求超时",
        },
        {
          type: "then",
          description: `应显示"支付请求失败，请检查网络后重试"`,
        },
        {
          type: "and",
          description: "保持在支付页面，允许用户重试",
        },
      ],
    },
    {
      id: "场景6",
      title: "支付成功后显示交易ID",
      steps: [
        {
          type: "given",
          description: "支付成功",
        },
        {
          type: "when",
          description: "用户在预订完成页查看详情",
        },
        {
          type: "then",
          description: "应显示交易ID供用户记录或客服查询",
        },
      ],
    },
  ],
  notes: `页面布局：成功（跳转至独立的预订完成页）、失败（在支付页面顶部显示错误提示）。所需UI元素：Toast提示消息（成功/失败）、预订完成页（订单摘要、后续操作引导）、错误提示区域（红色警示框）。关键交互：成功后3秒自动跳转；失败时保持页面，显示重试按钮。`,
};

const REQ_P12: Requirement = {
  id: "REQ-P12",
  module: "payment",
  name: "退款入口显示",
  overview: `本功能为已支付（待出行）状态的订单在订单详情页提供"申请退款"按钮入口。此按钮作为退款流程的起点，引导用户进入退款申请流程。`,
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个因计划有变而无法出行的用户，我希望能在订单详情页找到申请退款的入口，以便发起退款流程挽回损失。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "待出行订单显示退款按钮",
      steps: [
        {
          type: "given",
          description: `订单状态为"待出行"（CONFIRMED）`,
        },
        {
          type: "when",
          description: "用户查看订单详情页",
        },
        {
          type: "then",
          description: `应在操作区域显示"申请退款"按钮`,
        },
      ],
    },
    {
      id: "场景2",
      title: "待支付订单不显示退款按钮",
      steps: [
        {
          type: "given",
          description: `订单状态为"待支付"`,
        },
        {
          type: "when",
          description: "用户查看订单详情页",
        },
        {
          type: "then",
          description: `不应显示"申请退款"按钮`,
        },
      ],
    },
    {
      id: "场景3",
      title: "已取消订单不显示退款按钮",
      steps: [
        {
          type: "given",
          description: `订单状态为"已取消"`,
        },
        {
          type: "when",
          description: "用户查看订单详情页",
        },
        {
          type: "then",
          description: `不应显示"申请退款"按钮`,
        },
      ],
    },
    {
      id: "场景4",
      title: "已退款订单不显示退款按钮",
      steps: [
        {
          type: "given",
          description: `订单状态为"已退款"`,
        },
        {
          type: "when",
          description: "用户查看订单详情页",
        },
        {
          type: "then",
          description: `不应显示"申请退款"按钮`,
        },
      ],
    },
    {
      id: "场景5",
      title: "退款按钮样式区分",
      steps: [
        {
          type: "given",
          description: "待出行订单同时显示其他操作按钮",
        },
        {
          type: "when",
          description: "用户查看操作区域",
        },
        {
          type: "then",
          description: `"申请退款"按钮应使用次要样式（区别于主要操作）`,
        },
      ],
    },
    {
      id: "场景6",
      title: "退款按钮位置明显",
      steps: [
        {
          type: "given",
          description: "用户需要申请退款",
        },
        {
          type: "when",
          description: "用户浏览订单详情页",
        },
        {
          type: "then",
          description: `"申请退款"按钮应位于页面底部操作区，易于发现`,
        },
      ],
    },
  ],
  notes: `页面布局：订单详情页底部操作区。所需UI元素："申请退款"按钮（次要样式或警示样式）。关键交互：点击按钮触发退款流程；按钮仅在特定订单状态下显示。`,
};

const REQ_P13: Requirement = {
  id: "REQ-P13",
  module: "payment",
  name: "退款处理",
  overview: `本功能处理用户的退款申请，将订单金额退回用户的虚拟余额，并更新订单状态为"已退款"。退款操作需要用户二次确认，所有操作在数据库事务中原子性完成。`,
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个需要退款的用户，我希望能成功申请退款并将款项退回我的余额，以便挽回经济损失。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功申请退款",
      steps: [
        {
          type: "given",
          description: `用户有一个状态为"待出行"的订单，订单金额为299.99元`,
        },
        {
          type: "when",
          description: `用户点击"申请退款"并确认`,
        },
        {
          type: "then",
          description: `订单状态应更新为"已退款"`,
        },
        {
          type: "and",
          description: "用户余额应增加299.99元",
        },
      ],
    },
    {
      id: "场景2",
      title: "退款需要二次确认",
      steps: [
        {
          type: "given",
          description: `用户点击"申请退款"按钮`,
        },
        {
          type: "when",
          description: "确认对话框显示",
        },
        {
          type: "then",
          description: `对话框应提示"确定要申请退款吗？退款金额将退回您的账户余额。"`,
        },
      ],
    },
    {
      id: "场景3",
      title: "用户取消退款操作",
      steps: [
        {
          type: "given",
          description: "退款确认对话框已显示",
        },
        {
          type: "when",
          description: `用户点击"取消"`,
        },
        {
          type: "then",
          description: `订单状态应保持"待出行"不变`,
        },
      ],
    },
    {
      id: "场景4",
      title: "退款后更新页面显示",
      steps: [
        {
          type: "given",
          description: "用户确认退款",
        },
        {
          type: "when",
          description: "退款处理完成",
        },
        {
          type: "then",
          description: `页面应刷新，显示订单新状态"已退款"`,
        },
        {
          type: "and",
          description: `"申请退款"按钮应消失`,
        },
      ],
    },
    {
      id: "场景5",
      title: "非待出行订单不能退款",
      steps: [
        {
          type: "given",
          description: `订单状态为"待支付"或"已取消"`,
        },
        {
          type: "when",
          description: "后端验证退款请求",
        },
        {
          type: "then",
          description: `应拒绝退款并提示"该订单不可退款"`,
        },
      ],
    },
    {
      id: "场景6",
      title: "退款金额精确计算",
      steps: [
        {
          type: "given",
          description: "订单金额为199.99元",
        },
        {
          type: "when",
          description: "执行退款",
        },
        {
          type: "then",
          description: "用户余额应精确增加199.99元",
        },
      ],
    },
  ],
  notes: `页面布局：订单详情页操作区。所需UI元素："申请退款"按钮、退款确认对话框、成功/失败提示消息。关键交互：点击按钮弹出确认对话框；确认后执行退款并刷新页面；显示退款成功提示。`,
};

export const paymentModule: ModuleDefinition = {
  id: "payment",
  name: "核心业务模块 - 支付",
  description: "支付与退款处理",
  icon: "CreditCard",
  requirements: [
    REQ_P01,
    REQ_P02,
    REQ_P03,
    REQ_P04,
    REQ_P05,
    REQ_P06,
    REQ_P07,
    REQ_P08,
    REQ_P09,
    REQ_P10,
    REQ_P11,
    REQ_P12,
    REQ_P13,
  ],
};
