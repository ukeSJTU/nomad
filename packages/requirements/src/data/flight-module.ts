import type { ModuleDefinition, Requirement } from "./types";

const REQ_F01: Requirement = {
  id: "REQ-F01",
  module: "flight",
  name: "航班搜索表单",
  overview:
    "本功能是用户发起机票查询流程的主入口，位于机票业务的首页。它提供了一个简洁、高效的表单，用于捕获用户的核心出行意图，包括行程类型（单程/往返）、出发地、目的地、日期和座舱等级，并将用户引导至包含详细航班信息的搜索结果页面。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个有初步出行计划的用户，我希望能在首页清晰地看到并填写我的出发地、目的地和日期，以便快速启动航班搜索。",
    },
    {
      id: "US-02",
      content:
        "作为一个用户，我希望能选择单程或往返行程类型，以便系统返回符合我需求的航班结果。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户成功发起单程搜索 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户位于机票首页",
        },
        {
          type: "when",
          description: `用户选择"单程"行程类型`,
        },
        {
          type: "and",
          description: "用户选择了有效的出发地和目的地（不同城市）",
        },
        {
          type: "and",
          description: "用户选择了未来的出发日期",
        },
        {
          type: "and",
          description: `用户点击"搜索"按钮`,
        },
        {
          type: "then",
          description: "浏览器应跳转到航班结果页",
        },
        {
          type: "and",
          description: "结果页的URL应包含用户输入的查询参数",
        },
      ],
    },
    {
      id: "场景2",
      title: "用户成功发起往返搜索 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户位于机票首页",
        },
        {
          type: "when",
          description: `用户选择"往返"行程类型`,
        },
        {
          type: "and",
          description: "用户选择了有效的出发地和目的地",
        },
        {
          type: "and",
          description: "用户选择了出发日期和返程日期（返程日期晚于出发日期）",
        },
        {
          type: "and",
          description: `用户点击"搜索"按钮`,
        },
        {
          type: "then",
          description: "浏览器应跳转到航班结果页",
        },
        {
          type: "and",
          description: "结果页应显示往返航班选择流程",
        },
      ],
    },
    {
      id: "场景3",
      title: "行程类型切换时UI正确响应",
      steps: [
        {
          type: "given",
          description: `用户位于机票首页，当前为"单程"模式`,
        },
        {
          type: "when",
          description: `用户切换到"往返"模式`,
        },
        {
          type: "then",
          description: "返程日期选择器应变为可用状态",
        },
        {
          type: "and",
          description: "系统应自动将返程日期设置为出发日期后7天",
        },
        {
          type: "when",
          description: `用户切换回"单程"模式`,
        },
        {
          type: "then",
          description: "返程日期选择器应被禁用或隐藏",
        },
      ],
    },
    {
      id: "场景4",
      title: "必填字段未填写",
      steps: [
        {
          type: "given",
          description: "用户位于机票首页",
        },
        {
          type: "when",
          description: `用户未选择出发地就点击"搜索"按钮`,
        },
        {
          type: "then",
          description: "系统应在出发地选择器旁给出错误提示",
        },
        {
          type: "and",
          description: "不发生页面跳转",
        },
      ],
    },
    {
      id: "场景5",
      title: "出发地与目的地相同",
      steps: [
        {
          type: "given",
          description: "用户位于机票首页",
        },
        {
          type: "when",
          description: "用户选择了相同的出发地和目的地",
        },
        {
          type: "and",
          description: `点击"搜索"按钮`,
        },
        {
          type: "then",
          description: `系统应提示"出发地和目的地不能相同"`,
        },
        {
          type: "and",
          description: "搜索不应执行",
        },
      ],
    },
    {
      id: "场景6",
      title: "座舱等级选择",
      steps: [
        {
          type: "given",
          description: "用户位于机票首页",
        },
        {
          type: "when",
          description: `用户从座舱等级下拉菜单中选择"商务舱"`,
        },
        {
          type: "and",
          description: `完成其他必填项并点击"搜索"`,
        },
        {
          type: "then",
          description: "搜索结果应仅包含有商务舱的航班",
        },
      ],
    },
    {
      id: "场景7",
      title: "交换出发地和目的地",
      steps: [
        {
          type: "given",
          description: `用户已选择出发地为"上海"，目的地为"北京"`,
        },
        {
          type: "when",
          description: "用户点击交换按钮",
        },
        {
          type: "then",
          description: `出发地应变为"北京"，目的地应变为"上海"`,
        },
      ],
    },
  ],
  notes: `所需UI元素：行程类型单选按钮（"单程"、"往返"）、出发地选择器（带城市代码显示）、目的地选择器（带城市代码显示）、交换按钮（位于出发地和目的地之间）、出发日期选择器、返程日期选择器（往返模式下显示）、座舱等级下拉菜单（不限/经济舱/商务舱/头等舱）、"搜索"按钮。`,
};

const REQ_F02: Requirement = {
  id: "REQ-F02",
  module: "flight",
  name: "城市/机场选择器",
  overview:
    "本功能为用户提供便捷的城市/机场选择界面，支持国内和国际城市的分类浏览。国内城市按拼音首字母分组，国际城市按大洲分组，同时提供热门城市快速选择。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个用户，我希望能通过分类面板快速找到我要去的城市，以便不需要手动输入就能完成选择。",
    },
    {
      id: "US-02",
      content:
        "作为一个经常出行的用户，我希望热门城市能显示在最前面，以便快速选择常用目的地。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户选择国内城市 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户点击出发地选择器",
        },
        {
          type: "when",
          description: `城市选择面板打开，默认显示"国内"标签`,
        },
        {
          type: "and",
          description: `用户点击"热门"标签查看热门城市`,
        },
        {
          type: "and",
          description: `用户点击"上海"`,
        },
        {
          type: "then",
          description: `选择器应关闭，出发地应显示"上海 SHA"`,
        },
        {
          type: "and",
          description: "目的地选择器应自动打开",
        },
      ],
    },
    {
      id: "场景2",
      title: "用户通过拼音首字母选择城市",
      steps: [
        {
          type: "given",
          description: `城市选择面板已打开，显示"国内"标签`,
        },
        {
          type: "when",
          description: `用户点击"GHIJ"分类标签`,
        },
        {
          type: "then",
          description: "面板应显示拼音首字母为G、H、I、J的城市列表",
        },
        {
          type: "when",
          description: `用户点击"杭州"`,
        },
        {
          type: "then",
          description: `选择器应关闭并显示"杭州 HGH"`,
        },
      ],
    },
    {
      id: "场景3",
      title: "用户选择国际城市",
      steps: [
        {
          type: "given",
          description: "城市选择面板已打开",
        },
        {
          type: "when",
          description: `用户点击"国际/港澳台"标签`,
        },
        {
          type: "then",
          description: "面板应切换为大洲分类视图（亚洲、欧洲、美洲等）",
        },
        {
          type: "when",
          description: `用户点击"亚洲"标签并选择"东京"`,
        },
        {
          type: "then",
          description: `选择器应关闭并显示"东京 TYO"`,
        },
      ],
    },
    {
      id: "场景4",
      title: "自动打开目的地选择器",
      steps: [
        {
          type: "given",
          description: "用户正在选择出发地",
        },
        {
          type: "when",
          description: "用户完成出发地选择",
        },
        {
          type: "then",
          description: "目的地选择器应自动打开",
        },
        {
          type: "and",
          description:
            "目的地选择面板应保持与出发地相同的标签状态（国内/国际）",
        },
      ],
    },
    {
      id: "场景5",
      title: "交换出发地和目的地",
      steps: [
        {
          type: "given",
          description: `出发地为"北京 PEK"，目的地为"上海 SHA"`,
        },
        {
          type: "when",
          description: "用户点击两个选择器之间的交换按钮",
        },
        {
          type: "then",
          description: `出发地应变为"上海 SHA"`,
        },
        {
          type: "and",
          description: `目的地应变为"北京 PEK"`,
        },
      ],
    },
    {
      id: "场景6",
      title: "热门城市优先显示",
      steps: [
        {
          type: "given",
          description: "城市选择面板打开",
        },
        {
          type: "when",
          description: `用户查看"热门"标签`,
        },
        {
          type: "then",
          description: "应显示标记为热门的城市（如北京、上海、广州、深圳等）",
        },
        {
          type: "and",
          description: "热门城市应按显示顺序排列",
        },
      ],
    },
  ],
  notes:
    "所需UI元素：两级标签切换（国内/国际）、国内分类标签（热门、ABCDEF、GHIJ、KLMN、PQRSTUV、WXYZ）、国际分类标签（热门、亚洲、欧洲、美洲、非洲、大洋洲）、城市列表（显示城市名和IATA代码）、交换按钮。",
};

const REQ_F03: Requirement = {
  id: "REQ-F03",
  module: "flight",
  name: "日期选择器",
  overview: `本功能为用户提供日期选择界面，支持单程和往返两种模式。往返模式下提供双日历范围选择，并显示行程天数。同时提供相对日期标签（今天、明天、后天）便于快速识别。`,
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个用户，我希望能通过日历直观地选择出行日期，以便避免日期输入错误。",
    },
    {
      id: "US-02",
      content:
        "作为一个预订往返机票的用户，我希望能在同一界面选择去程和返程日期，以便清楚地看到行程时长。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户选择单程日期 (Happy Path)",
      steps: [
        {
          type: "given",
          description: `用户选择了"单程"行程类型`,
        },
        {
          type: "when",
          description: "用户点击日期选择器",
        },
        {
          type: "then",
          description: "应显示单个日历面板",
        },
        {
          type: "when",
          description: "用户点击一个未来的日期",
        },
        {
          type: "then",
          description: "该日期应被选中并显示在选择器中",
        },
      ],
    },
    {
      id: "场景2",
      title: "用户选择往返日期 (Happy Path)",
      steps: [
        {
          type: "given",
          description: `用户选择了"往返"行程类型`,
        },
        {
          type: "when",
          description: "用户点击日期选择器",
        },
        {
          type: "then",
          description: "应显示双日历面板",
        },
        {
          type: "when",
          description: "用户先点击出发日期，再点击返程日期",
        },
        {
          type: "then",
          description: "两个日期应被选中",
        },
        {
          type: "and",
          description: `应显示行程天数徽章（如"7天"）`,
        },
      ],
    },
    {
      id: "场景3",
      title: "选择过去的日期",
      steps: [
        {
          type: "given",
          description: "日期选择器已打开",
        },
        {
          type: "when",
          description: "用户尝试点击今天之前的日期",
        },
        {
          type: "then",
          description: "该日期应显示为禁用状态",
        },
        {
          type: "and",
          description: "无法被选中",
        },
      ],
    },
    {
      id: "场景4",
      title: "选择超出范围的日期",
      steps: [
        {
          type: "given",
          description: "日期选择器已打开",
        },
        {
          type: "when",
          description: "用户尝试选择超过365天后的日期",
        },
        {
          type: "then",
          description: "该日期应显示为禁用状态",
        },
        {
          type: "and",
          description: "无法被选中",
        },
      ],
    },
    {
      id: "场景5",
      title: "返程日期早于出发日期",
      steps: [
        {
          type: "given",
          description: "用户正在选择往返日期",
        },
        {
          type: "when",
          description: "用户选择的返程日期早于或等于出发日期",
        },
        {
          type: "then",
          description: "自动将返程日期调整为出发日期之后",
        },
      ],
    },
    {
      id: "场景6",
      title: "切换到往返模式时自动设置返程日期",
      steps: [
        {
          type: "given",
          description: "用户已选择出发日期为10月1日",
        },
        {
          type: "when",
          description: `用户从"单程"切换到"往返"`,
        },
        {
          type: "then",
          description: "返程日期应自动设置为10月8日（出发日期后7天）",
        },
      ],
    },
    {
      id: "场景7",
      title: "显示相对日期标签",
      steps: [
        {
          type: "given",
          description: "日期选择器已打开",
        },
        {
          type: "when",
          description: "用户查看日历",
        },
        {
          type: "then",
          description: `今天的日期应显示"今天"标签`,
        },
        {
          type: "and",
          description: `明天应显示"明天"标签`,
        },
        {
          type: "and",
          description: `后天应显示"后天"标签`,
        },
      ],
    },
  ],
  notes:
    "所需UI元素：单/双日历面板、日期单元格（带相对日期标签）、行程天数徽章、月份导航按钮、禁用日期样式（过去日期、超出范围日期）。",
};

const REQ_F04: Requirement = {
  id: "REQ-F04",
  module: "flight",
  name: "搜索历史",
  overview:
    "本功能为已登录用户展示最近的航班搜索记录，包括搜索的航线、日期和当时的最低价格。用户可以一键重新发起搜索，系统还会显示价格变动状态（已降价/已涨价/价格稳定）。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个经常查询相似航线的用户，我希望首页能显示我的历史搜索记录，以便我能一键重新发起搜索，无需重复输入。",
    },
    {
      id: "US-02",
      content:
        "作为一个关注价格的用户，我希望能看到之前搜索航线的价格变化，以便把握最佳购票时机。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "显示搜索历史记录 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户已登录并之前搜索过航班",
        },
        {
          type: "when",
          description: "用户访问机票首页",
        },
        {
          type: "then",
          description: "搜索表单下方应显示最近的搜索历史（最多6条）",
        },
        {
          type: "and",
          description: "每条记录显示航线、日期、当前最低价格",
        },
      ],
    },
    {
      id: "场景2",
      title: "一键重新搜索",
      steps: [
        {
          type: "given",
          description: `用户之前搜索过"上海-北京"的航班`,
        },
        {
          type: "when",
          description: "用户点击该历史记录卡片",
        },
        {
          type: "then",
          description: "系统应使用该记录的参数发起新搜索",
        },
        {
          type: "and",
          description: "跳转到航班结果页",
        },
      ],
    },
    {
      id: "场景3",
      title: "显示价格变动状态",
      steps: [
        {
          type: "given",
          description: "搜索历史中某条记录的价格已变动",
        },
        {
          type: "when",
          description: "用户查看该记录",
        },
        {
          type: "then",
          description: "应显示价格变动徽章",
        },
        {
          type: "and",
          description: `降价显示绿色"已降价"`,
        },
        {
          type: "and",
          description: `涨价显示红色"已涨价"`,
        },
        {
          type: "and",
          description: `价格不变显示"价格稳定"`,
        },
      ],
    },
    {
      id: "场景4",
      title: "未登录用户不显示历史",
      steps: [
        {
          type: "given",
          description: "用户未登录",
        },
        {
          type: "when",
          description: "用户访问机票首页",
        },
        {
          type: "then",
          description: "不应显示搜索历史区域",
        },
      ],
    },
    {
      id: "场景5",
      title: "无搜索历史",
      steps: [
        {
          type: "given",
          description: "用户已登录但从未搜索过航班",
        },
        {
          type: "when",
          description: "用户访问机票首页",
        },
        {
          type: "then",
          description: `显示"暂无搜索历史"提示`,
        },
      ],
    },
  ],
  notes:
    "所需UI元素：搜索历史卡片列表（最多6条）、卡片内容（航线、日期、当前最低价）、价格变动徽章（已降价/已涨价/价格稳定）、清空历史按钮（可选）。",
};

const REQ_F05: Requirement = {
  id: "REQ-F05",
  module: "flight",
  name: "航班列表展示",
  overview:
    "本页面是机票业务的核心，向用户展示所有符合搜索条件的航班列表。每个航班卡片显示航司信息、起降时间、航站楼、飞行时长和价格。用户可以展开查看不同舱位的价格和余票，并选择预订。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个完成了机票搜索的用户，我希望能在一个清晰的列表上看到所有可用的航班及其关键信息，以便我能开始比较和选择。",
    },
    {
      id: "US-02",
      content:
        "作为一个用户，我希望能查看每个航班的不同舱位选项和价格，以便选择最适合我的舱位。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "成功展示航班列表 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户发起了有效的航班搜索",
        },
        {
          type: "when",
          description: "航班结果页加载完成",
        },
        {
          type: "then",
          description: "页面应以卡片列表形式展示所有匹配的航班",
        },
        {
          type: "and",
          description:
            "每张卡片显示：航司Logo、航班号、机型、起降时间、机场航站楼、飞行时长、最低价格",
        },
      ],
    },
    {
      id: "场景2",
      title: "展开查看舱位选项",
      steps: [
        {
          type: "given",
          description: "航班列表已加载",
        },
        {
          type: "when",
          description: "用户点击某个航班卡片的展开按钮",
        },
        {
          type: "then",
          description: "应显示该航班的所有舱位选项",
        },
        {
          type: "and",
          description: "每个舱位显示：舱位名称、剩余座位数、价格",
        },
      ],
    },
    {
      id: "场景3",
      title: "显示跨日航班标识",
      steps: [
        {
          type: "given",
          description: "某航班到达时间为第二天",
        },
        {
          type: "when",
          description: "用户查看该航班卡片",
        },
        {
          type: "then",
          description: `到达时间旁应显示"+1"标识`,
        },
        {
          type: "and",
          description: `如果是第三天到达则显示"+2"`,
        },
      ],
    },
    {
      id: "场景4",
      title: "无搜索结果",
      steps: [
        {
          type: "given",
          description: "用户的搜索条件没有匹配的航班",
        },
        {
          type: "when",
          description: "结果页加载完成",
        },
        {
          type: "then",
          description: `应显示"未找到符合条件的航班"提示`,
        },
        {
          type: "and",
          description: "建议用户调整搜索条件",
        },
      ],
    },
    {
      id: "场景5",
      title: "加载状态显示",
      steps: [
        {
          type: "given",
          description: "用户发起航班搜索",
        },
        {
          type: "when",
          description: "数据正在加载",
        },
        {
          type: "then",
          description: "应显示航班卡片骨架屏",
        },
        {
          type: "and",
          description: "加载完成后替换为实际数据",
        },
      ],
    },
    {
      id: "场景6",
      title: "点击预订按钮",
      steps: [
        {
          type: "given",
          description: "用户在航班列表中找到满意的航班",
        },
        {
          type: "when",
          description: `用户展开舱位选项并点击某舱位的"预订"按钮`,
        },
        {
          type: "then",
          description: "系统应将用户导航至预订流程",
        },
        {
          type: "and",
          description: "所选航班和舱位信息应被传递到预订页面",
        },
      ],
    },
  ],
  notes:
    "所需UI元素：航班卡片（航司Logo、航班号、机型、时间、机场、价格）、展开/收起按钮、舱位选项列表（舱位名、余座、价格、预订按钮）、跨日标识（+1、+2）、骨架屏加载状态、空状态提示。",
};

const REQ_F06: Requirement = {
  id: "REQ-F06",
  module: "flight",
  name: "航班筛选与排序",
  overview:
    "本功能提供强大的筛选和排序工具，帮助用户在众多航班中快速定位目标航班。支持按航空公司、舱位类型、起降时间段进行多条件筛选，以及按价格、飞行时长、起飞时间进行排序。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个面对海量航班结果的用户，我希望能通过多种条件进行筛选，以便快速剔除不符合我要求的选项。",
    },
    {
      id: "US-02",
      content:
        "作为一个有明确偏好的用户，我希望能一键对所有结果进行排序，以便让最符合我心意的航班排在最前面。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "按航空公司筛选",
      steps: [
        {
          type: "given",
          description: "当前列表包含多个航空公司的航班",
        },
        {
          type: "when",
          description: `用户在筛选栏中勾选"中国国际航空"`,
        },
        {
          type: "then",
          description: "航班列表应立刻更新，仅显示国航的航班",
        },
        {
          type: "and",
          description: "筛选徽章应显示当前筛选条件数量",
        },
      ],
    },
    {
      id: "场景2",
      title: "多条件组合筛选",
      steps: [
        {
          type: "given",
          description: "当前列表包含多种航班",
        },
        {
          type: "when",
          description: `用户同时筛选"经济舱"和"06:00-12:00起飞"`,
        },
        {
          type: "then",
          description: "列表应只显示同时满足两个条件的航班",
        },
      ],
    },
    {
      id: "场景3",
      title: "按价格排序",
      steps: [
        {
          type: "given",
          description: "当前航班列表按默认顺序显示",
        },
        {
          type: "when",
          description: `用户点击"价格 低-高"排序按钮`,
        },
        {
          type: "then",
          description: "列表应按价格升序重新排列",
        },
        {
          type: "and",
          description: "该排序按钮应高亮显示",
        },
      ],
    },
    {
      id: "场景4",
      title: "按起飞时间排序",
      steps: [
        {
          type: "given",
          description: "当前航班列表已显示",
        },
        {
          type: "when",
          description: `用户点击"起飞时间 早-晚"`,
        },
        {
          type: "then",
          description: "列表应按起飞时间升序排列",
        },
      ],
    },
    {
      id: "场景5",
      title: "按飞行时长排序",
      steps: [
        {
          type: "given",
          description: "当前航班列表已显示",
        },
        {
          type: "when",
          description: `用户点击"飞行时长 短-长"`,
        },
        {
          type: "then",
          description: "列表应按飞行时长升序排列",
        },
      ],
    },
    {
      id: "场景6",
      title: "重置筛选条件",
      steps: [
        {
          type: "given",
          description: "用户已应用多个筛选条件",
        },
        {
          type: "when",
          description: `用户点击"重置"按钮`,
        },
        {
          type: "then",
          description: "所有筛选条件应被清除",
        },
        {
          type: "and",
          description: "列表应恢复显示所有航班",
        },
      ],
    },
    {
      id: "场景7",
      title: "筛选结果为空",
      steps: [
        {
          type: "given",
          description: "用户应用了筛选条件",
        },
        {
          type: "when",
          description: "没有航班满足所有条件",
        },
        {
          type: "then",
          description: `应显示"没有符合筛选条件的航班"提示`,
        },
        {
          type: "and",
          description: "建议用户调整筛选条件",
        },
      ],
    },
  ],
  notes:
    "所需UI元素：筛选区（航空公司多选、舱位类型多选、起飞时间段多选、到达时间段多选）、排序区（价格、飞行时长、起飞时间（升序/降序））、筛选条件计数徽章、重置按钮、粘性工具栏（滚动时固定在顶部）。",
};

const REQ_F07: Requirement = {
  id: "REQ-F07",
  module: "flight",
  name: "邻近日期价格日历",
  overview:
    "本功能在搜索结果页顶部展示前后各3天（共7天）的最低票价，帮助出行日期灵活的用户找到最便宜的出行日期。用户可以点击某一天快速切换搜索日期。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个出行日期比较灵活的用户，我希望能方便地看到邻近几天的最低票价，以便找到最便宜的出行日期。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "显示邻近日期价格 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户搜索了10月15日的航班",
        },
        {
          type: "when",
          description: "结果页加载完成",
        },
        {
          type: "then",
          description: "页面顶部应显示10月12日至10月18日的最低票价",
        },
        {
          type: "and",
          description: "当前选中日期应高亮显示",
        },
      ],
    },
    {
      id: "场景2",
      title: "点击切换搜索日期",
      steps: [
        {
          type: "given",
          description: "邻近日期价格栏显示中",
        },
        {
          type: "when",
          description: "用户点击另一个日期（如10月16日）",
        },
        {
          type: "then",
          description: "系统应使用新日期重新搜索",
        },
        {
          type: "and",
          description: "航班列表应刷新为新日期的结果",
        },
      ],
    },
    {
      id: "场景3",
      title: "边界日期处理-今天",
      steps: [
        {
          type: "given",
          description: "用户搜索的是今天的航班",
        },
        {
          type: "when",
          description: "邻近日期栏显示",
        },
        {
          type: "then",
          description: "今天之前的日期应显示为不可点击",
        },
        {
          type: "and",
          description: "只显示今天及之后的日期",
        },
      ],
    },
    {
      id: "场景4",
      title: "边界日期处理-365天限制",
      steps: [
        {
          type: "given",
          description: "用户搜索的是距今360天后的航班",
        },
        {
          type: "when",
          description: "邻近日期栏显示",
        },
        {
          type: "then",
          description: "超过365天的日期应显示为不可点击",
        },
      ],
    },
    {
      id: "场景5",
      title: "往返行程日期联动",
      steps: [
        {
          type: "given",
          description: "用户搜索的是往返行程",
        },
        {
          type: "and",
          description: "去程和返程相隔5天",
        },
        {
          type: "when",
          description: "用户在邻近日期栏点击新的去程日期",
        },
        {
          type: "then",
          description: "返程日期应同步调整，保持5天间隔",
        },
      ],
    },
  ],
  notes:
    "所需UI元素：7天价格横向滚动区域、日期单元格（日期、星期、最低价）、左右导航箭头、当前选中日期高亮、不可点击日期样式。",
};

const REQ_F08: Requirement = {
  id: "REQ-F08",
  module: "flight",
  name: "往返航班选择",
  overview:
    "本功能处理往返行程的航班选择流程，分为两步：先选择去程航班，再选择返程航班。用户可以在两个步骤之间切换，修改之前的选择。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个预订往返机票的用户，我希望能分步选择去程和返程航班，以便分别比较和选择最合适的航班。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "选择去程航班 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户发起了往返航班搜索",
        },
        {
          type: "when",
          description: "结果页加载完成",
        },
        {
          type: "then",
          description: `应显示"选择去程"标签为激活状态`,
        },
        {
          type: "and",
          description: "显示去程日期和航线信息",
        },
        {
          type: "when",
          description: "用户选择一个去程航班",
        },
        {
          type: "then",
          description: "系统应保存去程选择并自动切换到返程标签",
        },
      ],
    },
    {
      id: "场景2",
      title: "选择返程航班 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户已选择去程航班",
        },
        {
          type: "when",
          description: `系统切换到"选择返程"标签`,
        },
        {
          type: "then",
          description: "应显示返程日期和航线信息",
        },
        {
          type: "and",
          description: "列表应显示返程航班",
        },
        {
          type: "when",
          description: "用户选择一个返程航班",
        },
        {
          type: "then",
          description: "系统应将用户导航至预订流程",
        },
      ],
    },
    {
      id: "场景3",
      title: "切换回去程修改选择",
      steps: [
        {
          type: "given",
          description: "用户已选择去程并正在查看返程",
        },
        {
          type: "when",
          description: `用户点击"选择去程"标签`,
        },
        {
          type: "then",
          description: "应切换回去程列表",
        },
        {
          type: "and",
          description: "之前选择的去程应仍然高亮显示",
        },
      ],
    },
    {
      id: "场景4",
      title: "去程选择信息显示",
      steps: [
        {
          type: "given",
          description: "用户已选择去程航班",
        },
        {
          type: "when",
          description: "用户查看返程列表",
        },
        {
          type: "then",
          description: "去程标签上应显示已选航班摘要",
        },
        {
          type: "and",
          description: "包括航班号、时间、价格",
        },
      ],
    },
    {
      id: "场景5",
      title: "返程航班时间验证",
      steps: [
        {
          type: "given",
          description: "用户正在选择返程航班",
        },
        {
          type: "when",
          description: "显示返程航班列表",
        },
        {
          type: "then",
          description: "只应显示返程日期的航班",
        },
        {
          type: "and",
          description: "确保返程在去程之后",
        },
      ],
    },
  ],
  notes: `所需UI元素：步骤标签（"选择去程"、"选择返程"）、标签内容（日期、航线）、已选航班摘要（航班号、时间、价格）、标签激活/完成状态样式。`,
};

const REQ_F09: Requirement = {
  id: "REQ-F09",
  module: "flight",
  name: "乘机人信息填写",
  overview:
    "本功能是预订流程的第一步，引导用户填写所有乘机人的个人信息和联系方式。用户可以从已保存的常用旅客中快速选择，也可以手动填写新旅客信息。支持添加多名乘机人。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个准备预订机票的用户，我希望能在一个清晰的表单上填写所有乘机人的信息，以便完成机票的预订。",
    },
    {
      id: "US-02",
      content:
        "作为一个拥有常用旅客列表的用户，我希望能通过勾选的方式快速选择乘机人，以便避免重复输入，减少出错的可能性。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "填写单个乘机人信息 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户进入预订流程第一步",
        },
        {
          type: "when",
          description: "用户填写乘机人姓名、证件类型、证件号码",
        },
        {
          type: "and",
          description: "填写联系方式（邮箱或手机）",
        },
        {
          type: "and",
          description: `点击"下一步"`,
        },
        {
          type: "then",
          description: "系统应验证信息并导航至第二步",
        },
      ],
    },
    {
      id: "场景2",
      title: "从常用旅客快速选择",
      steps: [
        {
          type: "given",
          description: "用户有已保存的常用旅客",
        },
        {
          type: "when",
          description: "用户点击常用旅客区域的某个旅客",
        },
        {
          type: "then",
          description: "该旅客的信息应自动填充到乘机人表单",
        },
        {
          type: "and",
          description: "被选中的旅客应显示选中状态",
        },
      ],
    },
    {
      id: "场景3",
      title: "添加多名乘机人",
      steps: [
        {
          type: "given",
          description: "用户已填写第一名乘机人",
        },
        {
          type: "when",
          description: `用户点击"添加乘机人"按钮`,
        },
        {
          type: "then",
          description: "应增加一个新的乘机人表单",
        },
        {
          type: "and",
          description: "用户可以填写第二名乘机人信息",
        },
      ],
    },
    {
      id: "场景4",
      title: "删除乘机人",
      steps: [
        {
          type: "given",
          description: "用户已添加多名乘机人",
        },
        {
          type: "when",
          description: `用户点击某乘机人表单的"删除"按钮`,
        },
        {
          type: "then",
          description: "该乘机人表单应被移除",
        },
        {
          type: "and",
          description: "至少保留一名乘机人",
        },
      ],
    },
    {
      id: "场景5",
      title: "必填字段验证",
      steps: [
        {
          type: "given",
          description: "用户未填写乘机人姓名",
        },
        {
          type: "when",
          description: `用户点击"下一步"`,
        },
        {
          type: "then",
          description: `系统应在姓名字段旁显示"此项为必填项"`,
        },
        {
          type: "and",
          description: "导航应被阻止",
        },
      ],
    },
    {
      id: "场景6",
      title: "证件号码格式验证",
      steps: [
        {
          type: "given",
          description: `用户选择证件类型为"身份证"`,
        },
        {
          type: "when",
          description: "用户输入非18位的证件号",
        },
        {
          type: "then",
          description: `系统应提示"请输入有效的身份证号码"`,
        },
      ],
    },
    {
      id: "场景7",
      title: "联系方式必填",
      steps: [
        {
          type: "given",
          description: "用户已填写乘机人信息",
        },
        {
          type: "when",
          description: "用户未填写联系邮箱或手机",
        },
        {
          type: "and",
          description: `点击"下一步"`,
        },
        {
          type: "then",
          description: `系统应提示"请填写联系邮箱或手机号"`,
        },
      ],
    },
    {
      id: "场景8",
      title: "查看更多常用旅客",
      steps: [
        {
          type: "given",
          description: "用户有超过5名常用旅客",
        },
        {
          type: "when",
          description: "用户查看常用旅客区域",
        },
        {
          type: "then",
          description: "默认显示前5名",
        },
        {
          type: "and",
          description: `显示"更多"按钮可查看全部`,
        },
      ],
    },
  ],
  notes: `所需UI元素：常用旅客快速选择区、乘机人表单卡片（姓名、证件类型、证件号、手机）、"添加乘机人"按钮、"删除"按钮（每个乘机人卡片）、联系方式表单（邮箱/手机切换）、"下一步"按钮、右侧航班信息摘要。`,
};

const REQ_F10: Requirement = {
  id: "REQ-F10",
  module: "flight",
  name: "增值服务选择",
  overview:
    "本功能是预订流程的第二步，允许用户选择可选的增值服务，包括旅行保险、接送机服务和餐食。每个类别提供多个选项，用户可以根据需求选择。",
  priority: "Could Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个用户，我希望能在预订时选择保险、餐食等增值服务，以便获得更完善的出行保障。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "选择增值服务 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户进入预订流程第二步",
        },
        {
          type: "when",
          description: `用户展开"保险"类别`,
        },
        {
          type: "and",
          description: `选择"高级旅行险 ¥120"`,
        },
        {
          type: "then",
          description: "该选项应显示为选中状态",
        },
        {
          type: "and",
          description: "右侧价格摘要应更新，增加¥120",
        },
      ],
    },
    {
      id: "场景2",
      title: "每类别单选",
      steps: [
        {
          type: "given",
          description: `用户已选择"基础旅行险"`,
        },
        {
          type: "when",
          description: `用户选择"高级旅行险"`,
        },
        {
          type: "then",
          description: `"基础旅行险"应自动取消选中`,
        },
        {
          type: "and",
          description: `只有"高级旅行险"保持选中`,
        },
      ],
    },
    {
      id: "场景3",
      title: "取消选择",
      steps: [
        {
          type: "given",
          description: "用户已选择某个增值服务",
        },
        {
          type: "when",
          description: "用户再次点击该服务",
        },
        {
          type: "then",
          description: "该服务应取消选中",
        },
        {
          type: "and",
          description: "价格摘要应相应减少",
        },
      ],
    },
    {
      id: "场景4",
      title: "跳过增值服务",
      steps: [
        {
          type: "given",
          description: "用户进入第二步",
        },
        {
          type: "when",
          description: "用户不选择任何增值服务",
        },
        {
          type: "and",
          description: `直接点击"下一步"`,
        },
        {
          type: "then",
          description: "系统应允许继续，增值服务金额为0",
        },
      ],
    },
    {
      id: "场景5",
      title: "多类别选择",
      steps: [
        {
          type: "given",
          description: "用户在第二步",
        },
        {
          type: "when",
          description: "用户选择保险、餐食各一项",
        },
        {
          type: "then",
          description: "两项都应显示为选中状态",
        },
        {
          type: "and",
          description: "价格摘要应累加所有增值服务费用",
        },
      ],
    },
  ],
  notes: `所需UI元素：手风琴式类别面板（保险、接送机、餐食）、服务选项卡片（名称、描述、价格）、选中状态样式、右侧价格摘要（票价、增值服务、总价）、"下一步"按钮。增值服务选项：保险：基础旅行险(¥50)、高级旅行险(¥120)、家庭旅行险(¥200)；接送机：经济型(¥80)、商务型(¥150)、豪华型(¥300)；餐食：标准餐食(¥30)、素食餐(¥35)、清真餐(¥35)、高级餐食(¥80)。`,
};

const REQ_F11: Requirement = {
  id: "REQ-F11",
  module: "flight",
  name: "订单支付",
  overview: `本功能是预订流程的第三步，处理订单的支付操作。用户使用平台虚拟余额完成支付，页面显示15分钟支付倒计时。支付成功后订单状态更新为"已确认"，用户余额相应扣减。`,
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个已提交订单的用户，我希望能使用平台余额完成支付，以便最终确认并锁定我的机票预订。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "成功支付订单 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户进入支付页面，余额充足",
        },
        {
          type: "when",
          description: `用户选择"余额支付"`,
        },
        {
          type: "and",
          description: `点击"确认支付"按钮`,
        },
        {
          type: "then",
          description: "系统应扣减用户余额",
        },
        {
          type: "and",
          description: `订单状态应更新为"已确认"`,
        },
        {
          type: "and",
          description: "用户应被导航至确认页面",
        },
      ],
    },
    {
      id: "场景2",
      title: "显示支付倒计时",
      steps: [
        {
          type: "given",
          description: "用户进入支付页面",
        },
        {
          type: "when",
          description: "页面加载完成",
        },
        {
          type: "then",
          description: `应显示15分钟倒计时（如"14:59"）`,
        },
        {
          type: "and",
          description: "倒计时应实时递减",
        },
      ],
    },
    {
      id: "场景3",
      title: "倒计时少于1分钟警告",
      steps: [
        {
          type: "given",
          description: "支付倒计时正在进行",
        },
        {
          type: "when",
          description: "剩余时间少于60秒",
        },
        {
          type: "then",
          description: "倒计时应变为红色",
        },
        {
          type: "and",
          description: "提醒用户尽快完成支付",
        },
      ],
    },
    {
      id: "场景4",
      title: "余额不足",
      steps: [
        {
          type: "given",
          description: "用户的余额低于订单总额",
        },
        {
          type: "when",
          description: "用户查看支付页面",
        },
        {
          type: "then",
          description: `应显示"余额不足"警告`,
        },
        {
          type: "and",
          description: `"确认支付"按钮应被禁用`,
        },
      ],
    },
    {
      id: "场景5",
      title: "支付超时",
      steps: [
        {
          type: "given",
          description: "支付倒计时进行中",
        },
        {
          type: "when",
          description: "倒计时归零",
        },
        {
          type: "then",
          description: "系统应自动取消订单",
        },
        {
          type: "and",
          description: `显示"订单已超时取消"提示`,
        },
        {
          type: "and",
          description: "释放锁定的座位",
        },
      ],
    },
    {
      id: "场景6",
      title: "显示订单摘要",
      steps: [
        {
          type: "given",
          description: "用户进入支付页面",
        },
        {
          type: "when",
          description: "页面加载完成",
        },
        {
          type: "then",
          description: "应显示完整订单摘要",
        },
        {
          type: "and",
          description: "包括航班信息、乘机人、联系方式、增值服务、总金额",
        },
      ],
    },
    {
      id: "场景7",
      title: "显示支付后余额",
      steps: [
        {
          type: "given",
          description: "用户余额为¥5000，订单金额为¥1500",
        },
        {
          type: "when",
          description: "用户查看支付页面",
        },
        {
          type: "then",
          description: "应显示当前余额¥5000",
        },
        {
          type: "and",
          description: "显示支付后余额¥3500",
        },
      ],
    },
  ],
  notes: `所需UI元素：支付倒计时（MM:SS格式）、订单摘要（航班、乘机人、联系方式、增值服务）、支付方式选择（余额支付-可用、微信-禁用、支付宝-禁用）、当前余额和支付后余额显示、订单总金额、"确认支付"按钮、余额不足警告。`,
};

const REQ_F12: Requirement = {
  id: "REQ-F12",
  module: "flight",
  name: "预订确认",
  overview:
    "本功能是预订流程的最后一步，向用户展示预订成功的信息和完整的订单详情，包括订单号、航班信息、乘机人信息、支付信息等。同时提供出行提示和后续操作入口。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个完成支付的用户，我希望能看到预订成功的确认信息和订单详情，以便确认预订无误并保存相关信息。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "显示预订成功信息 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户完成支付",
        },
        {
          type: "when",
          description: "确认页面加载完成",
        },
        {
          type: "then",
          description: `应显示成功图标和"预订成功"标题`,
        },
        {
          type: "and",
          description: "显示订单号",
        },
      ],
    },
    {
      id: "场景2",
      title: "显示完整订单详情",
      steps: [
        {
          type: "given",
          description: "用户在确认页面",
        },
        {
          type: "when",
          description: "查看订单详情",
        },
        {
          type: "then",
          description: "应显示航班信息（去程/返程）",
        },
        {
          type: "and",
          description: "显示所有乘机人信息",
        },
        {
          type: "and",
          description: "显示联系方式",
        },
        {
          type: "and",
          description: "显示增值服务",
        },
        {
          type: "and",
          description: "显示支付金额",
        },
      ],
    },
    {
      id: "场景3",
      title: "显示出行提示",
      steps: [
        {
          type: "given",
          description: "用户在确认页面",
        },
        {
          type: "when",
          description: "查看提示区域",
        },
        {
          type: "then",
          description: "应显示重要出行提示",
        },
        {
          type: "and",
          description: "包括提前到达机场时间、携带证件等",
        },
      ],
    },
    {
      id: "场景4",
      title: "跳转到订单详情",
      steps: [
        {
          type: "given",
          description: "用户在确认页面",
        },
        {
          type: "when",
          description: `用户点击"查看订单详情"按钮`,
        },
        {
          type: "then",
          description: "系统应导航至订单详情页",
        },
      ],
    },
    {
      id: "场景5",
      title: "返回首页",
      steps: [
        {
          type: "given",
          description: "用户在确认页面",
        },
        {
          type: "when",
          description: `用户点击"返回首页"链接`,
        },
        {
          type: "then",
          description: "系统应导航至机票首页",
        },
      ],
    },
  ],
  notes: `所需UI元素：成功图标、"预订成功"标题、订单号、订单详情卡片（航班、乘机人、联系方式、增值服务、支付）、出行提示区域、"查看订单详情"按钮、"返回首页"链接。`,
};

const REQ_F13: Requirement = {
  id: "REQ-F13",
  module: "flight",
  name: "订单创建与锁座",
  overview:
    "本功能处理订单创建的后台逻辑，包括生成唯一订单号、设置15分钟支付截止时间、锁定座位库存等。这是连接乘机人信息填写和支付页面的关键环节。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个系统，我需要在用户提交乘机人信息后创建订单并锁定座位，以便确保用户支付时座位仍然可用。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "成功创建订单 (Happy Path)",
      steps: [
        {
          type: "given",
          description: "用户已填写有效的乘机人信息和联系方式",
        },
        {
          type: "when",
          description: `用户点击"下一步"提交信息`,
        },
        {
          type: "then",
          description: "系统应创建一个新订单",
        },
        {
          type: "and",
          description: "生成唯一订单号（格式：NMD + 日期 + 随机数）",
        },
        {
          type: "and",
          description: `设置订单状态为"待支付"`,
        },
        {
          type: "and",
          description: "设置支付截止时间为当前时间+15分钟",
        },
      ],
    },
    {
      id: "场景2",
      title: "锁定座位库存",
      steps: [
        {
          type: "given",
          description: "航班经济舱剩余10个座位",
        },
        {
          type: "when",
          description: "用户预订2个座位并创建订单",
        },
        {
          type: "then",
          description: "该舱位的可用座位数应减少为8",
        },
        {
          type: "and",
          description: "座位锁定直到支付完成或订单取消",
        },
      ],
    },
    {
      id: "场景3",
      title: "座位库存不足",
      steps: [
        {
          type: "given",
          description: "航班经济舱剩余1个座位",
        },
        {
          type: "when",
          description: "用户尝试预订2个座位",
        },
        {
          type: "then",
          description: `系统应提示"座位库存不足"`,
        },
        {
          type: "and",
          description: "订单创建应被阻止",
        },
      ],
    },
    {
      id: "场景4",
      title: "订单超时释放座位",
      steps: [
        {
          type: "given",
          description: "订单已创建并锁定座位",
        },
        {
          type: "when",
          description: "15分钟支付截止时间到达且未支付",
        },
        {
          type: "then",
          description: "系统应自动取消订单",
        },
        {
          type: "and",
          description: "释放锁定的座位，恢复可用库存",
        },
      ],
    },
    {
      id: "场景5",
      title: "保存乘机人信息",
      steps: [
        {
          type: "given",
          description: "订单创建成功",
        },
        {
          type: "when",
          description: "查看订单数据",
        },
        {
          type: "then",
          description: "应包含所有乘机人的姓名、证件类型、证件号、手机",
        },
        {
          type: "and",
          description: "信息作为快照保存，不受常用旅客修改影响",
        },
      ],
    },
  ],
  notes:
    "此需求主要涉及后端逻辑，无直接UI。订单号显示在支付页面和确认页面，座位锁定状态通过可用座位数间接体现。",
};

const REQ_F14: Requirement = {
  id: "REQ-F14",
  module: "flight",
  name: "机场攻略",
  overview:
    "本功能在首页提供机场攻略板块，为用户提供登机流程指引、机场服务设施介绍、目的地天气等实用信息，帮助用户更好地规划行程。",
  priority: "Could Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个即将出行的旅客，我希望能查看机场的登机流程和设施指南，以便我能顺利完成登机并享受机场服务。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "查看攻略主页",
      steps: [
        {
          type: "given",
          description: "用户访问机票首页",
        },
        {
          type: "when",
          description: "向下滚动至机场攻略区域",
        },
        {
          type: "then",
          description: "应显示热门机场的攻略入口列表",
        },
        {
          type: "and",
          description: "显示登机流程概览图",
        },
      ],
    },
    {
      id: "场景2",
      title: "查看特定机场详情",
      steps: [
        {
          type: "given",
          description: "用户点击某个具体机场(如上海浦东)",
        },
        {
          type: "when",
          description: "进入机场详情页",
        },
        {
          type: "then",
          description: "应显示该机场的航站楼地图、交通指引",
        },
        {
          type: "and",
          description: "显示机场特色服务设施",
        },
      ],
    },
    {
      id: "场景3",
      title: "查看登机流程指引",
      steps: [
        {
          type: "given",
          description: "用户查看攻略详情",
        },
        {
          type: "when",
          description: "点击登机流程板块",
        },
        {
          type: "then",
          description: "应以步骤条或图文形式展示值机、安检、候机、登机全流程",
        },
      ],
    },
    {
      id: "场景4",
      title: "查看目的地天气",
      steps: [
        {
          type: "given",
          description: "用户查看特定城市/机场攻略",
        },
        {
          type: "when",
          description: "页面加载完成",
        },
        {
          type: "then",
          description: "应显示该地未来几天的天气预报卡片",
        },
      ],
    },
    {
      id: "场景5",
      title: "切换不同机场攻略",
      steps: [
        {
          type: "given",
          description: "用户正在查看北京大兴机场攻略",
        },
        {
          type: "when",
          description: "使用侧边栏或顶部菜单切换城市",
        },
        {
          type: "then",
          description: "页面内容应更新为新选定机场的攻略信息",
        },
      ],
    },
  ],
  notes:
    "所需UI元素：机场列表卡片、天气Widget、流程步骤条(Steps)、富文本展示区。支持动态路由 `/flights/guide/[slug]`。",
};

export const flightModule: ModuleDefinition = {
  id: "flight",
  name: "核心业务模块 - 机票",
  description: "机票查询、筛选与预订",
  icon: "Plane",
  requirements: [
    REQ_F01,
    REQ_F02,
    REQ_F03,
    REQ_F04,
    REQ_F05,
    REQ_F06,
    REQ_F07,
    REQ_F08,
    REQ_F09,
    REQ_F10,
    REQ_F11,
    REQ_F12,
    REQ_F13,
    REQ_F14,
  ],
};
