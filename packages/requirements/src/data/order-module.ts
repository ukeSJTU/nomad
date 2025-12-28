import type { ModuleDefinition, Requirement } from "./types";

const REQ_O01: Requirement = {
  id: "REQ-O01",
  module: "order",
  name: "订单列表展示",
  overview:
    "本功能为已登录用户提供一个集中的订单中心，以列表形式展示用户所有的机票预订记录。订单按预订时间倒序排列，每个订单卡片显示关键摘要信息，便于用户快速浏览和管理订单。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个已预订机票的用户，我希望能在一个页面上看到我所有的订单列表，以便我能方便地追踪我的行程和消费记录。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功查看订单列表",
      steps: [
        {
          type: "given",
          description: "用户已登录且拥有多个订单",
        },
        {
          type: "when",
          description: `用户访问"我的订单"页面`,
        },
        {
          type: "then",
          description: "页面应以卡片列表形式展示该用户的所有订单",
        },
        {
          type: "and",
          description: "订单应按预订时间倒序排列（最新的在前）",
        },
      ],
    },
    {
      id: "场景2",
      title: "订单卡片显示完整摘要信息",
      steps: [
        {
          type: "given",
          description: "用户位于订单列表页",
        },
        {
          type: "when",
          description: "用户查看任意订单卡片",
        },
        {
          type: "then",
          description:
            "卡片应显示订单号、订单状态标签、航线信息（出发城市-到达城市）",
        },
        {
          type: "and",
          description: "卡片应显示航班日期、乘机人数量、订单总金额",
        },
      ],
    },
    {
      id: "场景3",
      title: "用户从列表页跳转至详情页",
      steps: [
        {
          type: "given",
          description: "用户位于订单列表页",
        },
        {
          type: "when",
          description: "用户点击任意一个订单卡片",
        },
        {
          type: "then",
          description: "系统应将用户导航至该订单的详情页",
        },
      ],
    },
    {
      id: "场景4",
      title: "未登录用户访问订单列表",
      steps: [
        {
          type: "given",
          description: "用户未登录",
        },
        {
          type: "when",
          description: `用户尝试访问"我的订单"页面`,
        },
        {
          type: "then",
          description: "系统应将用户重定向至登录页面",
        },
      ],
    },
    {
      id: "场景5",
      title: "订单列表分页加载",
      steps: [
        {
          type: "given",
          description: "用户拥有大量订单（超过单页显示数量）",
        },
        {
          type: "when",
          description: "用户滚动到列表底部",
        },
        {
          type: "then",
          description: "系统应自动加载更多订单（或显示分页控件）",
        },
      ],
    },
  ],
  notes: `页面布局：位于个人中心，通过导航栏"我的订单"入口进入；顶部为筛选/搜索区域，主体为订单卡片列表。所需UI元素：订单卡片（包含状态标签、订单号、航线、日期、乘机人数、金额）、操作按钮区域（删除按钮等）。关键交互：点击订单卡片跳转至订单详情页；卡片支持悬停效果提示可点击。`,
};

const REQ_O02: Requirement = {
  id: "REQ-O02",
  module: "order",
  name: "订单状态标签筛选",
  overview:
    "本功能提供基于订单状态的快速筛选能力，通过标签页（Tabs）形式让用户可以一键切换查看不同状态的订单，包括全部订单、待出行订单和待支付订单。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个拥有多个订单的用户，我希望能通过状态标签快速筛选订单，以便快速找到我需要处理的待支付订单或即将出行的订单。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户查看全部订单",
      steps: [
        {
          type: "given",
          description: "用户位于订单列表页",
        },
        {
          type: "when",
          description: `用户点击"全部"标签`,
        },
        {
          type: "then",
          description: "列表应显示用户的所有订单（不区分状态）",
        },
      ],
    },
    {
      id: "场景2",
      title: "用户筛选待出行订单",
      steps: [
        {
          type: "given",
          description: "用户拥有多种状态的订单",
        },
        {
          type: "when",
          description: `用户点击"待出行"标签`,
        },
        {
          type: "then",
          description: `列表应只显示状态为"待出行"（CONFIRMED）的订单`,
        },
        {
          type: "and",
          description: "其他状态的订单应被隐藏",
        },
      ],
    },
    {
      id: "场景3",
      title: "用户筛选待支付订单",
      steps: [
        {
          type: "given",
          description: "用户拥有待支付和已支付的订单",
        },
        {
          type: "when",
          description: `用户点击"待支付"标签`,
        },
        {
          type: "then",
          description: `列表应只显示状态为"待支付"（PENDING_PAYMENT）的订单`,
        },
      ],
    },
    {
      id: "场景4",
      title: "筛选结果为空",
      steps: [
        {
          type: "given",
          description: `用户没有"待支付"状态的订单`,
        },
        {
          type: "when",
          description: `用户点击"待支付"标签`,
        },
        {
          type: "then",
          description: `列表应显示空状态提示"暂无待支付订单"`,
        },
      ],
    },
    {
      id: "场景5",
      title: "标签显示订单数量",
      steps: [
        {
          type: "given",
          description: "用户拥有不同状态的订单",
        },
        {
          type: "when",
          description: "用户查看筛选标签",
        },
        {
          type: "then",
          description: `每个标签应显示对应状态的订单数量（如"待支付 (3)"）`,
        },
      ],
    },
    {
      id: "场景6",
      title: "切换标签保持搜索条件",
      steps: [
        {
          type: "given",
          description: "用户已输入搜索关键词",
        },
        {
          type: "when",
          description: "用户切换状态标签",
        },
        {
          type: "then",
          description: "搜索条件应继续生效，与状态筛选条件叠加",
        },
      ],
    },
  ],
  notes: `页面布局：标签栏位于订单列表顶部，搜索框下方。所需UI元素：标签组件（全部、待出行、待支付）、各标签可选择性显示数量徽章。关键交互：点击标签即时切换筛选结果；当前选中标签有明显的激活样式。`,
};

const REQ_O03: Requirement = {
  id: "REQ-O03",
  module: "order",
  name: "订单搜索功能",
  overview:
    "本功能允许用户通过输入订单号或航线关键词来搜索特定订单，支持模糊匹配，帮助用户在大量订单中快速定位目标订单。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个拥有多个订单的用户，我希望能通过订单号或航线搜索订单，以便快速找到特定的订单记录。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户通过订单号搜索",
      steps: [
        {
          type: "given",
          description: "用户知道要查找的订单号",
        },
        {
          type: "when",
          description: "用户在搜索框中输入订单号并提交",
        },
        {
          type: "then",
          description: "列表应只显示匹配该订单号的订单",
        },
      ],
    },
    {
      id: "场景2",
      title: "用户通过航线关键词搜索",
      steps: [
        {
          type: "given",
          description: "用户想查找飞往北京的订单",
        },
        {
          type: "when",
          description: `用户在搜索框中输入"北京"`,
        },
        {
          type: "then",
          description: `列表应显示所有航线包含"北京"的订单`,
        },
      ],
    },
    {
      id: "场景3",
      title: "搜索支持模糊匹配",
      steps: [
        {
          type: "given",
          description: "用户输入部分订单号",
        },
        {
          type: "when",
          description: "用户提交搜索",
        },
        {
          type: "then",
          description: "系统应返回所有包含该部分字符的订单",
        },
      ],
    },
    {
      id: "场景4",
      title: "搜索无结果",
      steps: [
        {
          type: "given",
          description: "用户输入了不存在的关键词",
        },
        {
          type: "when",
          description: "用户提交搜索",
        },
        {
          type: "then",
          description: `列表应显示"未找到匹配的订单"提示`,
        },
      ],
    },
    {
      id: "场景5",
      title: "清空搜索恢复全部订单",
      steps: [
        {
          type: "given",
          description: "用户已进行搜索并显示筛选结果",
        },
        {
          type: "when",
          description: "用户清空搜索框",
        },
        {
          type: "then",
          description: "列表应恢复显示全部订单（受当前状态标签筛选）",
        },
      ],
    },
    {
      id: "场景6",
      title: "搜索与状态筛选组合",
      steps: [
        {
          type: "given",
          description: `用户选择了"待支付"标签`,
        },
        {
          type: "when",
          description: "用户输入航线关键词搜索",
        },
        {
          type: "then",
          description: `结果应同时满足状态为"待支付"且航线包含关键词`,
        },
      ],
    },
  ],
  notes: `页面布局：搜索框位于订单列表页顶部。所需UI元素：搜索输入框（带搜索图标）、清空按钮、搜索提示文本。关键交互：支持回车键提交搜索；输入时可提供实时搜索建议（可选）。`,
};

const REQ_O04: Requirement = {
  id: "REQ-O04",
  module: "order",
  name: "订单软删除",
  overview:
    "本功能允许用户删除不需要保留的订单记录。系统采用软删除机制，在数据库中保留订单数据但对用户不可见，以便于数据恢复和审计追踪。删除操作需要用户二次确认以防止误操作。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个想清理订单记录的用户，我希望能删除不需要的历史订单，以便保持订单列表的整洁。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功删除订单",
      steps: [
        {
          type: "given",
          description: "用户位于订单列表页",
        },
        {
          type: "when",
          description: `用户点击某订单的"删除"按钮并在确认弹窗中点击"确认"`,
        },
        {
          type: "then",
          description: "该订单应从列表中消失",
        },
        {
          type: "and",
          description: `系统应显示"订单已删除"成功提示`,
        },
      ],
    },
    {
      id: "场景2",
      title: "用户取消删除操作",
      steps: [
        {
          type: "given",
          description: `用户点击了"删除"按钮，弹出确认弹窗`,
        },
        {
          type: "when",
          description: `用户点击"取消"或关闭弹窗`,
        },
        {
          type: "then",
          description: "订单应保持不变，继续显示在列表中",
        },
      ],
    },
    {
      id: "场景3",
      title: "删除需要二次确认",
      steps: [
        {
          type: "given",
          description: "用户位于订单列表页",
        },
        {
          type: "when",
          description: `用户点击"删除"按钮`,
        },
        {
          type: "then",
          description: `系统应弹出确认对话框，显示"确定要删除此订单吗？"`,
        },
      ],
    },
    {
      id: "场景4",
      title: "软删除保留数据",
      steps: [
        {
          type: "given",
          description: "用户删除了一个订单",
        },
        {
          type: "when",
          description: "管理员查询数据库",
        },
        {
          type: "then",
          description: "该订单记录应仍然存在，只是标记为已删除状态",
        },
      ],
    },
    {
      id: "场景5",
      title: "已删除订单不再显示",
      steps: [
        {
          type: "given",
          description: "用户之前删除了某订单",
        },
        {
          type: "when",
          description: "用户刷新订单列表页",
        },
        {
          type: "then",
          description: "该已删除订单不应出现在任何筛选结果中",
        },
      ],
    },
    {
      id: "场景6",
      title: "删除操作失败处理",
      steps: [
        {
          type: "given",
          description: "用户尝试删除订单",
        },
        {
          type: "when",
          description: "由于网络问题删除请求失败",
        },
        {
          type: "then",
          description: `系统应显示错误提示"删除失败，请重试"`,
        },
        {
          type: "and",
          description: "订单应保持原状",
        },
      ],
    },
  ],
  notes: `页面布局：删除按钮位于每个订单卡片的操作区域。所需UI元素：删除按钮（带删除图标）、确认对话框（包含确认和取消按钮）、成功/失败提示消息。关键交互：点击删除按钮弹出确认对话框；确认后执行删除并刷新列表；操作过程中显示加载状态。`,
};

const REQ_O05: Requirement = {
  id: "REQ-O05",
  module: "order",
  name: "订单详情展示",
  overview:
    "本功能向用户展示特定订单的所有详细信息，包括完整的航班信息、所有乘机人信息、价格明细和订单状态。信息以清晰的卡片分区形式呈现，便于用户核对和查阅。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个用户，我希望能查看我订单的所有细节，以便在出行前核对航班、乘机人等所有信息是否准确无误。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功查看订单详情",
      steps: [
        {
          type: "given",
          description: "用户从订单列表点击某订单",
        },
        {
          type: "when",
          description: "订单详情页加载完成",
        },
        {
          type: "then",
          description: "页面应显示订单号、订单状态、创建时间",
        },
      ],
    },
    {
      id: "场景2",
      title: "显示完整航班信息",
      steps: [
        {
          type: "given",
          description: "用户位于订单详情页",
        },
        {
          type: "when",
          description: "用户查看航班信息区域",
        },
        {
          type: "then",
          description: "应显示航班号、航空公司、出发/到达城市和机场",
        },
        {
          type: "and",
          description: "应显示出发/到达时间、飞行时长、机型",
        },
      ],
    },
    {
      id: "场景3",
      title: "显示所有乘机人信息",
      steps: [
        {
          type: "given",
          description: "订单包含多位乘机人",
        },
        {
          type: "when",
          description: "用户查看乘机人信息区域",
        },
        {
          type: "then",
          description: "应列出所有乘机人的姓名、证件类型、证件号码",
        },
        {
          type: "and",
          description: "证件号码应进行适当脱敏处理",
        },
      ],
    },
    {
      id: "场景4",
      title: "显示价格明细",
      steps: [
        {
          type: "given",
          description: "用户位于订单详情页",
        },
        {
          type: "when",
          description: "用户查看价格明细区域",
        },
        {
          type: "then",
          description: "应显示票价、税费、保险费（如有）等各项费用",
        },
        {
          type: "and",
          description: "应显示订单总金额",
        },
      ],
    },
    {
      id: "场景5",
      title: "订单不存在时的处理",
      steps: [
        {
          type: "given",
          description: "用户尝试访问不存在的订单ID",
        },
        {
          type: "when",
          description: "页面尝试加载",
        },
        {
          type: "then",
          description: `系统应显示"订单不存在"错误提示`,
        },
        {
          type: "and",
          description: "提供返回订单列表的链接",
        },
      ],
    },
    {
      id: "场景6",
      title: "用户无权查看他人订单",
      steps: [
        {
          type: "given",
          description: "用户尝试通过URL直接访问他人的订单详情",
        },
        {
          type: "when",
          description: "系统验证权限",
        },
        {
          type: "then",
          description: `系统应拒绝访问并显示"无权查看此订单"`,
        },
      ],
    },
  ],
  notes: `页面布局：顶部显示订单状态和订单号；主体分为多个信息卡片（航班信息、乘机人信息、价格明细）；底部为操作按钮区域。所需UI元素：订单状态标签（带颜色区分）、各信息区块卡片、返回列表按钮。关键交互：支持返回订单列表；可展开/折叠详细信息（可选）。`,
};

const REQ_O06: Requirement = {
  id: "REQ-O06",
  module: "order",
  name: "订单状态显示",
  overview:
    "本功能根据订单的不同状态（待支付、待出行、已取消、已退款）显示相应的状态标签，并使用不同的颜色和样式进行视觉区分，帮助用户快速识别订单当前状态。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个用户，我希望能通过醒目的状态标签快速了解订单状态，以便知道哪些订单需要我进一步操作。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "显示待支付状态",
      steps: [
        {
          type: "given",
          description: "订单状态为 PENDING_PAYMENT",
        },
        {
          type: "when",
          description: "用户查看该订单",
        },
        {
          type: "then",
          description: `应显示"待支付"标签，使用警示色（如橙色/黄色）`,
        },
      ],
    },
    {
      id: "场景2",
      title: "显示待出行状态",
      steps: [
        {
          type: "given",
          description: "订单状态为 CONFIRMED（已支付）",
        },
        {
          type: "when",
          description: "用户查看该订单",
        },
        {
          type: "then",
          description: `应显示"待出行"标签，使用成功色（如绿色）`,
        },
      ],
    },
    {
      id: "场景3",
      title: "显示已取消状态",
      steps: [
        {
          type: "given",
          description: "订单状态为 CANCELLED",
        },
        {
          type: "when",
          description: "用户查看该订单",
        },
        {
          type: "then",
          description: `应显示"已取消"标签，使用中性色（如灰色）`,
        },
      ],
    },
    {
      id: "场景4",
      title: "显示已退款状态",
      steps: [
        {
          type: "given",
          description: "订单状态为 REFUNDED",
        },
        {
          type: "when",
          description: "用户查看该订单",
        },
        {
          type: "then",
          description: `应显示"已退款"标签，使用信息色（如蓝色）`,
        },
      ],
    },
    {
      id: "场景5",
      title: "状态标签在列表和详情页一致",
      steps: [
        {
          type: "given",
          description: `某订单状态为"待支付"`,
        },
        {
          type: "when",
          description: "用户分别在列表页和详情页查看",
        },
        {
          type: "then",
          description: "两处显示的状态标签样式应保持一致",
        },
      ],
    },
    {
      id: "场景6",
      title: "状态变更后即时更新显示",
      steps: [
        {
          type: "given",
          description: `用户完成支付，订单状态变为"待出行"`,
        },
        {
          type: "when",
          description: "用户返回查看订单",
        },
        {
          type: "then",
          description: `状态标签应显示为"待出行"`,
        },
      ],
    },
  ],
  notes: `页面布局：列表页（状态标签位于订单卡片醒目位置）、详情页（状态标签位于页面顶部）。所需UI元素：状态标签组件（Badge）、不同状态对应不同颜色方案。关键交互：状态标签为只读展示，无交互行为。`,
};

const REQ_O07: Requirement = {
  id: "REQ-O07",
  module: "order",
  name: "支付倒计时显示",
  overview:
    "本功能为待支付状态的订单显示剩余支付时间的倒计时。订单有15分钟的支付期限，倒计时结束后订单将自动取消。倒计时帮助用户了解紧迫性，避免错过支付时间。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个有待支付订单的用户，我希望能看到剩余支付时间，以便在订单过期前及时完成支付。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "显示正常倒计时",
      steps: [
        {
          type: "given",
          description: "订单状态为待支付，距离超时还有10分钟",
        },
        {
          type: "when",
          description: "用户查看该订单",
        },
        {
          type: "then",
          description: `应显示倒计时"剩余 10:00"`,
        },
      ],
    },
    {
      id: "场景2",
      title: "倒计时实时更新",
      steps: [
        {
          type: "given",
          description: "用户正在查看待支付订单",
        },
        {
          type: "when",
          description: "时间流逝",
        },
        {
          type: "then",
          description: "倒计时应每秒更新一次",
        },
      ],
    },
    {
      id: "场景3",
      title: "倒计时结束提示",
      steps: [
        {
          type: "given",
          description: "倒计时正在进行",
        },
        {
          type: "when",
          description: "倒计时归零",
        },
        {
          type: "then",
          description: `应显示"订单已超时"提示`,
        },
        {
          type: "and",
          description: "页面应刷新显示订单已取消状态",
        },
      ],
    },
    {
      id: "场景4",
      title: "低于5分钟时警示样式",
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
          description: "倒计时应使用警示样式（如红色）提醒用户",
        },
      ],
    },
    {
      id: "场景5",
      title: "非待支付订单不显示倒计时",
      steps: [
        {
          type: "given",
          description: "订单状态为待出行或已取消",
        },
        {
          type: "when",
          description: "用户查看该订单",
        },
        {
          type: "then",
          description: "不应显示倒计时组件",
        },
      ],
    },
    {
      id: "场景6",
      title: "详情页和列表页都显示倒计时",
      steps: [
        {
          type: "given",
          description: "用户有待支付订单",
        },
        {
          type: "when",
          description: "用户在列表页和详情页查看",
        },
        {
          type: "then",
          description: "两处都应显示同步的倒计时",
        },
      ],
    },
  ],
  notes: `页面布局：列表页（倒计时显示在订单卡片的状态区域）、详情页（倒计时醒目显示在顶部状态区域）。所需UI元素：倒计时组件（显示 MM:SS 格式）、时钟图标、警示状态样式。关键交互：倒计时自动更新，无需用户操作；归零时触发页面刷新或状态更新。`,
};

const REQ_O08: Requirement = {
  id: "REQ-O08",
  module: "order",
  name: "订单取消",
  overview:
    "本功能允许用户主动取消处于待支付状态的订单。取消后订单状态变为已取消，同时系统会释放该订单占用的座位资源。此操作需要用户二次确认。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个创建了订单但决定放弃的用户，我希望能方便地取消这个未支付的订单，以便避免后续的支付提醒并释放座位。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功取消订单",
      steps: [
        {
          type: "given",
          description: "用户正在查看一个待支付的订单详情",
        },
        {
          type: "when",
          description: `用户点击"取消订单"并确认`,
        },
        {
          type: "then",
          description: `订单状态应更新为"已取消"`,
        },
        {
          type: "and",
          description: `系统应显示"订单已取消"成功提示`,
        },
      ],
    },
    {
      id: "场景2",
      title: "取消需要二次确认",
      steps: [
        {
          type: "given",
          description: `用户点击"取消订单"按钮`,
        },
        {
          type: "when",
          description: "确认弹窗显示",
        },
        {
          type: "then",
          description: `弹窗应提示"确定要取消此订单吗？取消后无法恢复"`,
        },
      ],
    },
    {
      id: "场景3",
      title: "用户放弃取消操作",
      steps: [
        {
          type: "given",
          description: "取消确认弹窗已显示",
        },
        {
          type: "when",
          description: `用户点击"取消"或关闭弹窗`,
        },
        {
          type: "then",
          description: "订单应保持待支付状态",
        },
      ],
    },
    {
      id: "场景4",
      title: "取消后更新页面显示",
      steps: [
        {
          type: "given",
          description: "用户确认取消订单",
        },
        {
          type: "when",
          description: "取消操作完成",
        },
        {
          type: "then",
          description: `页面应刷新，显示订单新状态"已取消"`,
        },
        {
          type: "and",
          description: `"去支付"和"取消订单"按钮应消失`,
        },
      ],
    },
    {
      id: "场景5",
      title: "非待支付订单不显示取消按钮",
      steps: [
        {
          type: "given",
          description: `订单状态为"待出行"（已支付）`,
        },
        {
          type: "when",
          description: "用户查看订单详情",
        },
        {
          type: "then",
          description: `页面不应显示"取消订单"按钮`,
        },
      ],
    },
    {
      id: "场景6",
      title: "取消操作失败处理",
      steps: [
        {
          type: "given",
          description: "用户尝试取消订单",
        },
        {
          type: "when",
          description: "由于网络问题请求失败",
        },
        {
          type: "then",
          description: `系统应显示错误提示"取消失败，请重试"`,
        },
        {
          type: "and",
          description: "订单状态保持不变",
        },
      ],
    },
  ],
  notes: `页面布局："取消订单"按钮位于订单详情页底部操作区。所需UI元素："取消订单"按钮（次要样式）、确认对话框、成功/失败提示。关键交互：按钮点击触发确认对话框；确认后执行取消并刷新页面；操作过程显示加载状态。`,
};

const REQ_O09: Requirement = {
  id: "REQ-O09",
  module: "order",
  name: "去支付跳转",
  overview: `本功能为待支付状态的订单提供"去支付"按钮，点击后将用户导航至支付页面，携带当前订单信息以完成支付流程。`,
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content: `作为一个创建了订单但还未支付的用户，我希望能在订单详情页找到"去支付"的按钮，以便完成我的预订。`,
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功跳转至支付页",
      steps: [
        {
          type: "given",
          description: "用户正在查看一个待支付的订单详情",
        },
        {
          type: "when",
          description: `用户点击"去支付"按钮`,
        },
        {
          type: "then",
          description: "系统应将用户导航至支付页面",
        },
        {
          type: "and",
          description: "支付页面应显示该订单的支付信息",
        },
      ],
    },
    {
      id: "场景2",
      title: "只有待支付订单显示按钮",
      steps: [
        {
          type: "given",
          description: "订单状态为待支付",
        },
        {
          type: "when",
          description: "用户查看订单详情",
        },
        {
          type: "then",
          description: `应显示"去支付"按钮`,
        },
      ],
    },
    {
      id: "场景3",
      title: "已支付订单不显示按钮",
      steps: [
        {
          type: "given",
          description: "订单状态为待出行（已支付）",
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
      title: "已取消订单不显示按钮",
      steps: [
        {
          type: "given",
          description: "订单状态为已取消",
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
      id: "场景5",
      title: "支付页面保持订单上下文",
      steps: [
        {
          type: "given",
          description: `用户从订单详情点击"去支付"`,
        },
        {
          type: "when",
          description: "支付页面加载完成",
        },
        {
          type: "then",
          description: "应显示正确的订单金额和订单号",
        },
        {
          type: "and",
          description: "倒计时应与订单详情页保持同步",
        },
      ],
    },
    {
      id: "场景6",
      title: "按钮样式突出显示",
      steps: [
        {
          type: "given",
          description: "用户查看待支付订单",
        },
        {
          type: "when",
          description: "用户浏览页面",
        },
        {
          type: "then",
          description: `"去支付"按钮应使用主要样式，视觉突出`,
        },
      ],
    },
  ],
  notes: `页面布局："去支付"按钮位于订单详情页底部操作区，位置醒目。所需UI元素："去支付"按钮（主要样式，如蓝色填充）。关键交互：点击按钮导航至支付页面；按钮应明显区别于"取消订单"按钮。`,
};

const REQ_O10: Requirement = {
  id: "REQ-O10",
  module: "order",
  name: "申请退款入口",
  overview: `本功能为已支付（待出行）状态的订单提供"申请退款"按钮入口。此按钮作为退款流程的起点，引导用户进入退款申请流程。`,
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
          description: "订单状态为待出行（CONFIRMED）",
        },
        {
          type: "when",
          description: "用户查看订单详情",
        },
        {
          type: "then",
          description: `应显示"申请退款"按钮`,
        },
      ],
    },
    {
      id: "场景2",
      title: "点击退款按钮触发流程",
      steps: [
        {
          type: "given",
          description: "用户查看待出行订单详情",
        },
        {
          type: "when",
          description: `用户点击"申请退款"按钮`,
        },
        {
          type: "then",
          description: "系统应弹出退款确认对话框或进入退款流程",
        },
      ],
    },
    {
      id: "场景3",
      title: "待支付订单不显示退款按钮",
      steps: [
        {
          type: "given",
          description: "订单状态为待支付",
        },
        {
          type: "when",
          description: "用户查看订单详情",
        },
        {
          type: "then",
          description: `不应显示"申请退款"按钮`,
        },
      ],
    },
    {
      id: "场景4",
      title: "已取消订单不显示退款按钮",
      steps: [
        {
          type: "given",
          description: "订单状态为已取消",
        },
        {
          type: "when",
          description: "用户查看订单详情",
        },
        {
          type: "then",
          description: `不应显示"申请退款"按钮`,
        },
      ],
    },
    {
      id: "场景5",
      title: "已退款订单不显示退款按钮",
      steps: [
        {
          type: "given",
          description: "订单状态为已退款",
        },
        {
          type: "when",
          description: "用户查看订单详情",
        },
        {
          type: "then",
          description: `不应显示"申请退款"按钮`,
        },
      ],
    },
    {
      id: "场景6",
      title: "退款按钮样式区分",
      steps: [
        {
          type: "given",
          description: "订单同时可以退款",
        },
        {
          type: "when",
          description: "用户查看操作区域",
        },
        {
          type: "then",
          description: `"申请退款"按钮应使用次要或警示样式`,
        },
      ],
    },
  ],
  notes: `页面布局："申请退款"按钮位于订单详情页底部操作区。所需UI元素："申请退款"按钮、退款确认对话框。关键交互：点击按钮弹出确认对话框；确认后执行退款流程。`,
};

const REQ_O11: Requirement = {
  id: "REQ-O11",
  module: "order",
  name: "订单超时自动取消",
  overview:
    "本功能实现订单的自动超时取消机制。当待支付订单在规定时间（15分钟）内未完成支付，系统将自动将订单状态更新为已取消，并释放占用的座位资源。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为系统，我需要自动取消超时未支付的订单，以便释放座位资源供其他用户预订。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "订单超时自动取消",
      steps: [
        {
          type: "given",
          description: "一个待支付订单已创建超过15分钟",
        },
        {
          type: "when",
          description: "系统执行超时检查",
        },
        {
          type: "then",
          description: `该订单状态应自动更新为"已取消"`,
        },
      ],
    },
    {
      id: "场景2",
      title: "超时订单无法支付",
      steps: [
        {
          type: "given",
          description: "订单已超时被自动取消",
        },
        {
          type: "when",
          description: "用户尝试支付该订单",
        },
        {
          type: "then",
          description: `系统应提示"订单已超时取消，无法支付"`,
        },
      ],
    },
    {
      id: "场景3",
      title: "超时释放座位资源",
      steps: [
        {
          type: "given",
          description: "订单超时被取消",
        },
        {
          type: "when",
          description: "取消操作完成",
        },
        {
          type: "then",
          description: "该订单占用的座位应被释放，可供其他用户预订",
        },
      ],
    },
    {
      id: "场景4",
      title: "用户查看超时订单",
      steps: [
        {
          type: "given",
          description: "用户的订单已超时取消",
        },
        {
          type: "when",
          description: "用户访问订单列表或详情",
        },
        {
          type: "then",
          description: `应显示订单状态为"已取消"`,
        },
      ],
    },
    {
      id: "场景5",
      title: "超时订单引导重新预订",
      steps: [
        {
          type: "given",
          description: "用户查看已超时取消的订单",
        },
        {
          type: "when",
          description: "用户需要重新预订",
        },
        {
          type: "then",
          description: `可以提供"重新预订"或返回航班搜索的引导`,
        },
      ],
    },
    {
      id: "场景6",
      title: "准时支付不会被取消",
      steps: [
        {
          type: "given",
          description: "订单创建后10分钟内",
        },
        {
          type: "when",
          description: "用户完成支付",
        },
        {
          type: "then",
          description: `订单应正常变为"待出行"状态，不会被取消`,
        },
      ],
    },
  ],
  notes: `超时取消为后台自动处理，无专门UI。所需UI元素：超时后的订单状态显示为"已取消"；可选：显示取消原因"支付超时"。关键交互：用户端倒计时归零后刷新页面看到新状态；超时订单的支付按钮不可用。`,
};

const REQ_O12: Requirement = {
  id: "REQ-O12",
  module: "order",
  name: "空订单状态提示",
  overview:
    "本功能在用户没有任何订单记录时，显示友好的空状态提示界面，引导用户进行首次预订，提升用户体验。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个新用户或没有订单的用户，我希望看到友好的空状态提示，以便知道如何开始预订机票。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "无订单时显示空状态",
      steps: [
        {
          type: "given",
          description: "用户已登录但从未下过单",
        },
        {
          type: "when",
          description: `用户访问"我的订单"页面`,
        },
        {
          type: "then",
          description: "页面应显示空状态插图和提示文字",
        },
      ],
    },
    {
      id: "场景2",
      title: "空状态提示引导预订",
      steps: [
        {
          type: "given",
          description: "用户看到空状态页面",
        },
        {
          type: "when",
          description: "用户查看页面内容",
        },
        {
          type: "then",
          description: `应显示"您还没有任何订单"提示`,
        },
        {
          type: "and",
          description: `应提供"去预订"或"搜索航班"按钮`,
        },
      ],
    },
    {
      id: "场景3",
      title: "点击引导按钮跳转",
      steps: [
        {
          type: "given",
          description: "用户在空状态页面",
        },
        {
          type: "when",
          description: `用户点击"去预订"按钮`,
        },
        {
          type: "then",
          description: "系统应导航至航班搜索页面",
        },
      ],
    },
    {
      id: "场景4",
      title: "筛选后无结果的空状态",
      steps: [
        {
          type: "given",
          description: `用户有订单但筛选"待支付"无结果`,
        },
        {
          type: "when",
          description: "筛选结果为空",
        },
        {
          type: "then",
          description: `应显示"暂无待支付订单"提示（不同于完全无订单）`,
        },
      ],
    },
    {
      id: "场景5",
      title: "搜索无结果的空状态",
      steps: [
        {
          type: "given",
          description: "用户搜索了不存在的订单号",
        },
        {
          type: "when",
          description: "搜索结果为空",
        },
        {
          type: "then",
          description: `应显示"未找到匹配的订单"提示`,
        },
        {
          type: "and",
          description: "提供清空搜索的选项",
        },
      ],
    },
    {
      id: "场景6",
      title: "空状态样式友好",
      steps: [
        {
          type: "given",
          description: "用户看到空状态页面",
        },
        {
          type: "when",
          description: "用户浏览页面",
        },
        {
          type: "then",
          description: "应有适当的插图或图标",
        },
        {
          type: "and",
          description: "提示文字应简洁友好",
        },
      ],
    },
  ],
  notes: `页面布局：空状态居中显示在列表区域。所需UI元素：空状态插图/图标、提示文字、行动按钮（如"去预订"）。关键交互：点击行动按钮导航至相应页面；不同类型的空状态显示不同提示。`,
};

export const orderModule: ModuleDefinition = {
  id: "order",
  name: "核心业务模块 - 订单",
  description: "订单查询与管理",
  icon: "ShoppingCart",
  requirements: [
    REQ_O01,
    REQ_O02,
    REQ_O03,
    REQ_O04,
    REQ_O05,
    REQ_O06,
    REQ_O07,
    REQ_O08,
    REQ_O09,
    REQ_O10,
    REQ_O11,
    REQ_O12,
  ],
};
