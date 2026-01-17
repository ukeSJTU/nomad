import type { ModuleDefinition, Requirement } from "./types";

// REQ-UI-01: 顶部导航栏
const REQ_UI_01: Requirement = {
  id: "REQ-UI-01",
  module: "ui-ux",
  name: "顶部导航栏",
  overview:
    "本功能提供全局顶部导航栏，包含Logo品牌标识、搜索栏、用户菜单、订单快捷入口、客服联系和主题切换等核心元素，为用户提供统一的导航体验。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**在页面顶部看到清晰的导航栏**，以便**快速访问各个功能模块**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "导航栏正常显示",
      steps: [
        { type: "given", description: "用户访问网站任意页面" },
        { type: "when", description: "页面加载完成" },
        { type: "then", description: "顶部应显示固定高度的导航栏（64px）" },
        {
          type: "and",
          description: "导航栏应包含Logo、搜索栏、用户菜单等元素",
        },
      ],
    },
    {
      id: "场景2",
      title: "Logo点击返回首页",
      steps: [
        { type: "given", description: "用户位于任意页面" },
        { type: "when", description: "用户点击导航栏左侧的Logo" },
        { type: "then", description: "页面应导航至网站首页（/）" },
      ],
    },
    {
      id: "场景3",
      title: "导航栏布局合理",
      steps: [
        { type: "given", description: "用户查看导航栏" },
        { type: "when", description: "页面宽度大于`768px`" },
        {
          type: "then",
          description: "应显示左对齐Logo、居中搜索栏、右对齐功能按钮的三栏布局",
        },
      ],
    },
    {
      id: "场景4",
      title: "导航栏固定定位",
      steps: [
        { type: "given", description: "用户向下滚动页面" },
        { type: "when", description: "页面内容滚动" },
        { type: "then", description: "导航栏应保持固定在页面顶部（sticky）" },
      ],
    },
    {
      id: "场景5",
      title: "导航栏背景毛玻璃效果",
      steps: [
        { type: "given", description: "页面有内容滚动到导航栏下方" },
        { type: "when", description: "用户查看导航栏" },
        { type: "then", description: "导航栏应显示半透明背景和毛玻璃模糊效果" },
      ],
    },
    {
      id: "场景6",
      title: "移动端适配",
      steps: [
        {
          type: "given",
          description: "用户使用移动设备访问（宽度小于`640px`）",
        },
        { type: "when", description: "查看导航栏" },
        { type: "then", description: `品牌名称"Nomad"应隐藏，只显示Logo图标` },
      ],
    },
  ],
  notes:
    "导航栏固定在页面顶部，高度64px，使用Flexbox三栏布局。包含Logo图标和品牌名称、搜索栏组件、用户菜单、订单、客服、主题切换按钮。Logo可点击跳转首页，背景支持毛玻璃效果。",
};

// REQ-UI-02: 侧边栏导航
const REQ_UI_02: Requirement = {
  id: "REQ-UI-02",
  module: "ui-ux",
  name: "侧边栏导航",
  overview:
    "本功能提供左侧可折叠的侧边栏导航菜单，包含旅游、商务、金融、其他等分组菜单，支持展开/折叠、子菜单显示、当前路径高亮等功能。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**能通过侧边栏快速导航到各个功能模块**，以便**高效地浏览网站内容**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "侧边栏展开状态显示",
      steps: [
        { type: "given", description: "侧边栏处于展开状态" },
        { type: "when", description: "用户查看侧边栏" },
        { type: "then", description: "应显示宽度192px的侧边栏" },
        { type: "and", description: "菜单项应显示图标和完整文字" },
      ],
    },
    {
      id: "场景2",
      title: "侧边栏折叠状态显示",
      steps: [
        { type: "given", description: "侧边栏处于折叠状态" },
        { type: "when", description: "用户查看侧边栏" },
        { type: "then", description: "应显示宽度48px的侧边栏" },
        { type: "and", description: "菜单项只显示图标，隐藏文字" },
      ],
    },
    {
      id: "场景3",
      title: "用户切换侧边栏状态",
      steps: [
        { type: "given", description: "侧边栏可见" },
        { type: "when", description: "用户点击侧边栏底部的折叠按钮" },
        { type: "then", description: "侧边栏应在展开和折叠状态间切换" },
        { type: "and", description: "状态应保存到Cookie中（7天有效期）" },
      ],
    },
    {
      id: "场景4",
      title: "子菜单展开显示",
      steps: [
        {
          type: "given",
          description: `侧边栏处于展开状态，用户点击"机票"菜单`,
        },
        { type: "when", description: "菜单项被点击" },
        { type: "then", description: "应在菜单下方展开显示子菜单项" },
        {
          type: "and",
          description: "子菜单包含：国内/国际、特价机票、航班动态等",
        },
      ],
    },
    {
      id: "场景5",
      title: "折叠状态悬停显示子菜单",
      steps: [
        { type: "given", description: "侧边栏处于折叠状态" },
        { type: "when", description: "用户将鼠标悬停在有子菜单的菜单项上" },
        { type: "then", description: "应弹出HoverCard显示子菜单列表" },
      ],
    },
    {
      id: "场景6",
      title: "当前路径高亮显示",
      steps: [
        { type: "given", description: `用户位于"/flights"页面` },
        { type: "when", description: "查看侧边栏" },
        { type: "then", description: `"机票"菜单项应显示蓝色背景高亮状态` },
      ],
    },
    {
      id: "场景7",
      title: "键盘快捷键切换",
      steps: [
        { type: "given", description: "用户在页面上" },
        {
          type: "when",
          description: "用户按下Cmd+B（Mac）或Ctrl+B（Windows）",
        },
        { type: "then", description: "侧边栏应切换展开/折叠状态" },
      ],
    },
  ],
  notes:
    "侧边栏固定在页面左侧全高度，展开宽度192px，折叠宽度48px。包含菜单分组（旅游、商务、金融、其他）、菜单项（图标+文字）、折叠/展开按钮。支持点击切换展开/折叠、悬停显示子菜单（折叠模式）、当前路径高亮、键盘快捷键（Cmd+B/Ctrl+B）。状态保存到Cookie（7天有效期）。",
};

// REQ-UI-03: 用户菜单
const REQ_UI_03: Requirement = {
  id: "REQ-UI-03",
  module: "ui-ux",
  name: "用户菜单",
  overview:
    "本功能在顶部导航栏提供用户菜单，显示用户登录状态、头像、用户名，并通过下拉菜单提供快捷操作入口（我的钱包、常用信息、退出登录等）。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**已登录用户**，我希望**能在导航栏看到我的头像和用户信息**，以便**快速访问个人中心和账户功能**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "未登录状态显示",
      steps: [
        { type: "given", description: "用户未登录" },
        { type: "when", description: "用户查看顶部导航栏右侧" },
        { type: "then", description: `应显示"登录"和"注册"两个按钮` },
      ],
    },
    {
      id: "场景2",
      title: "已登录状态显示",
      steps: [
        { type: "given", description: "用户已登录" },
        { type: "when", description: "用户查看顶部导航栏右侧" },
        {
          type: "then",
          description: `应显示用户头像、"尊敬的用户"文字和下拉箭头图标`,
        },
      ],
    },
    {
      id: "场景3",
      title: "用户菜单悬停展开",
      steps: [
        { type: "given", description: "用户已登录" },
        { type: "when", description: "用户将鼠标悬停在用户菜单区域" },
        { type: "then", description: "应显示HoverCard下拉菜单" },
        {
          type: "and",
          description: "菜单包含：用户信息、钱包、常用信息、退出登录",
        },
      ],
    },
    {
      id: "场景4",
      title: "点击跳转个人中心",
      steps: [
        { type: "given", description: "用户已登录" },
        { type: "when", description: "用户点击用户菜单触发区域" },
        { type: "then", description: `页面应导航至"/home/info"（个人中心）` },
      ],
    },
    {
      id: "场景5",
      title: "显示用户头像",
      steps: [
        { type: "given", description: "用户已登录且有头像" },
        { type: "when", description: "查看用户菜单" },
        { type: "then", description: "应显示圆形用户头像（40px直径）" },
      ],
    },
    {
      id: "场景6",
      title: "加载状态显示",
      steps: [
        { type: "given", description: "用户认证状态正在加载" },
        { type: "when", description: "页面初始化" },
        { type: "then", description: "应显示脉冲动画的骨架加载器" },
      ],
    },
    {
      id: "场景7",
      title: "响应式显示",
      steps: [
        {
          type: "given",
          description: "用户使用桌面端访问（宽度大于`768px`）",
        },
        { type: "when", description: "查看用户菜单" },
        { type: "then", description: "应显示完整的头像+文字+图标" },
        {
          type: "given",
          description: "用户使用移动端访问（宽度小于`768px`）",
        },
        { type: "then", description: `应隐藏"尊敬的用户"文字，只显示头像` },
      ],
    },
  ],
  notes:
    "用户菜单位于顶部导航栏右侧。包含用户头像（Avatar组件）、用户名称文字、下拉箭头图标、HoverCard菜单。支持悬停展开菜单（200ms延迟）、点击跳转个人中心（/home/info）、加载状态动画。移动端（<768px）隐藏用户名称文字。",
};

// REQ-UI-04: 面包屑导航
const REQ_UI_04: Requirement = {
  id: "REQ-UI-04",
  module: "ui-ux",
  name: "面包屑导航",
  overview:
    "本功能在页面内容区顶部显示面包屑导航，展示用户当前页面的路径层级，帮助用户了解当前位置并快速返回上级页面。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**能看到当前页面的路径层级**，以便**知道我在网站的哪个位置并快速返回上级**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "面包屑正常显示",
      steps: [
        { type: "given", description: `用户位于子页面（如"/flights/search"）` },
        { type: "when", description: "页面加载完成" },
        { type: "then", description: "页面顶部应显示面包屑导航" },
        {
          type: "and",
          description: `应显示路径层级（如"首页 > 机票 > 搜索"）`,
        },
      ],
    },
    {
      id: "场景2",
      title: "面包屑分隔符显示",
      steps: [
        { type: "given", description: "面包屑包含多个层级" },
        { type: "when", description: "查看面包屑" },
        { type: "then", description: "层级间应显示ChevronRight图标作为分隔符" },
      ],
    },
    {
      id: "场景3",
      title: "点击面包屑项跳转",
      steps: [
        { type: "given", description: `用户查看面包屑"首页 > 机票 > 搜索"` },
        { type: "when", description: `用户点击"机票"链接` },
        { type: "then", description: `页面应导航至"/flights"` },
      ],
    },
    {
      id: "场景4",
      title: "当前页面不可点击",
      steps: [
        { type: "given", description: `用户位于"搜索"页面` },
        { type: "when", description: `查看面包屑最后一项"搜索"` },
        { type: "then", description: "最后一项应不可点击，显示为普通文本" },
      ],
    },
    {
      id: "场景5",
      title: "首页面包屑显示",
      steps: [
        { type: "given", description: "用户位于网站首页" },
        { type: "when", description: "查看页面" },
        { type: "then", description: `不应显示面包屑或只显示"首页"` },
      ],
    },
    {
      id: "场景6",
      title: "可访问性支持",
      steps: [
        { type: "given", description: "用户使用屏幕阅读器" },
        { type: "when", description: "访问面包屑导航" },
        { type: "then", description: `应有aria-label="breadcrumb"标记` },
        { type: "and", description: `当前页面应有aria-current="page"属性` },
      ],
    },
  ],
  notes:
    "面包屑导航位于页面内容区顶部。包含面包屑列表容器、面包屑链接项、ChevronRight分隔符图标、当前页面文本。支持点击链接跳转对应页面，当前页面项不可点击。具备可访问性支持（aria-label='breadcrumb'、aria-current='page'）。",
};

// REQ-UI-05: 搜索功能
const REQ_UI_05: Requirement = {
  id: "REQ-UI-05",
  module: "ui-ux",
  name: "搜索功能",
  overview:
    "本功能在顶部导航栏中央提供全局搜索输入框，允许用户搜索旅游相关内容，提供即时反馈和搜索结果。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**能在导航栏快速搜索旅游内容**，以便**找到我需要的航班、酒店等信息**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "搜索框正常显示",
      steps: [
        { type: "given", description: "用户访问网站" },
        { type: "when", description: "查看顶部导航栏" },
        { type: "then", description: "应在中央显示搜索输入框" },
        {
          type: "and",
          description: `输入框应显示占位符文本"搜索任何旅游相关"`,
        },
      ],
    },
    {
      id: "场景2",
      title: "搜索框图标显示",
      steps: [
        { type: "given", description: "用户查看搜索框" },
        { type: "when", description: "输入框获得焦点或失焦" },
        { type: "then", description: "输入框左侧应显示搜索图标" },
        { type: "and", description: "右侧应显示搜索按钮" },
      ],
    },
    {
      id: "场景3",
      title: "用户输入搜索关键词",
      steps: [
        { type: "given", description: "用户点击搜索框" },
        { type: "when", description: `用户输入"上海到北京"` },
        { type: "then", description: "输入框应显示用户输入的内容" },
      ],
    },
    {
      id: "场景4",
      title: "提交空搜索拒绝",
      steps: [
        { type: "given", description: "搜索框为空或只包含空格" },
        { type: "when", description: "用户点击搜索按钮或按Enter" },
        { type: "then", description: "不应触发搜索，焦点保持在输入框" },
      ],
    },
    {
      id: "场景5",
      title: "提交有效搜索",
      steps: [
        { type: "given", description: `用户输入"上海"` },
        { type: "when", description: "用户点击搜索按钮或按Enter键" },
        { type: "then", description: `应显示Toast提示"搜索: 上海"` },
        { type: "and", description: "系统应执行搜索逻辑（如实现）" },
      ],
    },
    {
      id: "场景6",
      title: "搜索框响应式布局",
      steps: [
        { type: "given", description: "用户使用不同屏幕宽度访问" },
        { type: "when", description: "查看搜索框" },
        { type: "then", description: "搜索框应自适应宽度，最大宽度为448px" },
      ],
    },
  ],
  notes:
    "搜索框位于顶部导航栏中央，最大宽度448px。包含搜索输入框、左侧搜索图标、右侧搜索按钮。支持键盘Enter提交、空搜索验证、Toast反馈。占位符文本为'搜索任何旅游相关'。",
};

// REQ-UI-06: 主题切换
const REQ_UI_06: Requirement = {
  id: "REQ-UI-06",
  module: "ui-ux",
  name: "主题切换",
  overview:
    "本功能允许用户在深色模式和浅色模式之间切换，系统会记住用户的选择并在下次访问时自动应用，同时支持跟随系统主题。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**能切换网站的深色/浅色主题**，以便**在不同环境下获得舒适的视觉体验**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "主题切换按钮显示",
      steps: [
        { type: "given", description: "用户访问网站" },
        { type: "when", description: "查看顶部导航栏右侧" },
        { type: "then", description: "应显示主题切换按钮" },
      ],
    },
    {
      id: "场景2",
      title: "浅色模式切换到深色",
      steps: [
        { type: "given", description: "当前主题为浅色模式" },
        { type: "when", description: "用户点击主题切换按钮" },
        { type: "then", description: "页面应切换到深色模式" },
        { type: "and", description: "按钮图标应从太阳变为月亮" },
      ],
    },
    {
      id: "场景3",
      title: "深色模式切换到浅色",
      steps: [
        { type: "given", description: "当前主题为深色模式" },
        { type: "when", description: "用户点击主题切换按钮" },
        { type: "then", description: "页面应切换到浅色模式" },
        { type: "and", description: "按钮图标应从月亮变为太阳" },
      ],
    },
    {
      id: "场景4",
      title: "主题偏好持久化",
      steps: [
        { type: "given", description: "用户选择深色模式" },
        { type: "when", description: "用户刷新页面或重新访问" },
        { type: "then", description: "页面应自动应用深色模式" },
      ],
    },
    {
      id: "场景5",
      title: "跟随系统主题",
      steps: [
        { type: "given", description: `用户未手动选择主题（默认"system"）` },
        { type: "when", description: "用户操作系统设置为深色模式" },
        { type: "then", description: "网站应自动使用深色模式" },
      ],
    },
    {
      id: "场景6",
      title: "图标旋转动画",
      steps: [
        { type: "given", description: "用户点击主题切换按钮" },
        { type: "when", description: "主题切换时" },
        { type: "then", description: "图标应有360度旋转动画过渡" },
      ],
    },
    {
      id: "场景7",
      title: "可访问性支持",
      steps: [
        { type: "given", description: "用户使用屏幕阅读器" },
        { type: "when", description: "访问主题切换按钮" },
        { type: "then", description: `按钮应有aria-label="Toggle theme"属性` },
      ],
    },
  ],
  notes:
    "主题切换按钮位于顶部导航栏右侧，分隔符后。包含切换按钮、太阳图标（浅色模式）、月亮图标（深色模式）。支持点击切换主题、图标360度旋转动画、主题持久化存储。默认跟随系统主题（'system'）。具备可访问性支持（aria-label='Toggle theme'）。",
};

// REQ-UI-07: 快捷入口
const REQ_UI_07: Requirement = {
  id: "REQ-UI-07",
  module: "ui-ux",
  name: "快捷入口",
  overview:
    "本功能在顶部导航栏提供订单和客服的快捷访问入口，通过HoverCard悬停卡片显示常用操作链接，帮助用户快速访问常用功能。",
  priority: "Should Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**能在导航栏快速访问我的订单和联系客服**，以便**高效地处理常见事务**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "订单快捷入口显示",
      steps: [
        { type: "given", description: "用户查看顶部导航栏" },
        { type: "when", description: "页面加载完成" },
        { type: "then", description: `应在右侧显示"我的订单"入口` },
      ],
    },
    {
      id: "场景2",
      title: "订单菜单悬停展开",
      steps: [
        { type: "given", description: `用户将鼠标悬停在"我的订单"上` },
        { type: "when", description: "悬停超过200ms" },
        { type: "then", description: "应显示订单菜单卡片" },
        {
          type: "and",
          description: "菜单包含：机票订单、酒店订单、全部订单、手机号查订单",
        },
      ],
    },
    {
      id: "场景3",
      title: "点击订单子菜单跳转",
      steps: [
        { type: "given", description: "订单菜单已展开" },
        { type: "when", description: `用户点击"机票订单"` },
        { type: "then", description: "页面应导航至机票订单列表页" },
      ],
    },
    {
      id: "场景4",
      title: "客服入口显示",
      steps: [
        { type: "given", description: "用户查看顶部导航栏" },
        { type: "when", description: "页面加载完成" },
        { type: "then", description: `应在右侧显示"联系客服"入口` },
      ],
    },
    {
      id: "场景5",
      title: "客服菜单悬停展开",
      steps: [
        { type: "given", description: `用户将鼠标悬停在"联系客服"上` },
        { type: "when", description: "悬停超过200ms" },
        { type: "then", description: "应显示客服菜单卡片" },
        {
          type: "and",
          description: "菜单包含：访问客服中心、客服电话、国际客服电话",
        },
      ],
    },
    {
      id: "场景6",
      title: "菜单悬停延迟",
      steps: [
        { type: "given", description: "用户快速移动鼠标经过快捷入口" },
        { type: "when", description: "悬停时间少于200ms" },
        { type: "then", description: "菜单不应展开" },
      ],
    },
    {
      id: "场景7",
      title: "菜单关闭延迟",
      steps: [
        { type: "given", description: "菜单已展开，用户鼠标移出" },
        { type: "when", description: "移出时间超过100ms" },
        { type: "then", description: "菜单应自动关闭" },
      ],
    },
  ],
  notes:
    "快捷入口位于顶部导航栏右侧，用户菜单左侧。包含'我的订单'触发器、'联系客服'触发器、HoverCard菜单组件。支持悬停200ms延迟展开、移出100ms延迟关闭、点击子菜单跳转。订单菜单包含：机票订单、酒店订单、全部订单、手机号查订单。客服菜单包含：访问客服中心、客服电话、国际客服电话。",
};

// REQ-UI-08: 响应式布局
const REQ_UI_08: Requirement = {
  id: "REQ-UI-08",
  module: "ui-ux",
  name: "响应式布局",
  overview:
    "本功能确保网站在不同设备和屏幕尺寸下都能正常显示和使用，通过响应式设计适配桌面端、平板和移动端，提供一致的用户体验。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**使用不同设备的用户**，我希望**网站能在我的设备上正常显示和操作**，以便**无论何时何地都能使用服务**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "桌面端布局",
      steps: [
        { type: "given", description: "用户使用宽度≥1024px的桌面浏览器" },
        { type: "when", description: "访问网站" },
        { type: "then", description: "应显示侧边栏+内容区的两栏布局" },
        {
          type: "and",
          description: "导航栏应显示完整的Logo文字和所有功能元素",
        },
      ],
    },
    {
      id: "场景2",
      title: "平板端布局",
      steps: [
        {
          type: "given",
          description: "用户使用宽度在768px-1023px之间的平板设备",
        },
        { type: "when", description: "访问网站" },
        { type: "then", description: "侧边栏应可折叠" },
        { type: "and", description: "导航栏应适当调整元素间距" },
      ],
    },
    {
      id: "场景3",
      title: "移动端布局",
      steps: [
        { type: "given", description: "用户使用宽度小于`768px`的移动设备" },
        { type: "when", description: "访问网站" },
        { type: "then", description: "侧边栏应转换为抽屉式导航" },
        { type: "and", description: "导航栏应隐藏部分文字，只保留图标" },
      ],
    },
    {
      id: "场景4",
      title: "侧边栏响应式行为",
      steps: [
        { type: "given", description: "用户从桌面切换到移动视图" },
        { type: "when", description: "浏览器窗口宽度小于768px" },
        { type: "then", description: "侧边栏应自动转换为Sheet抽屉组件" },
        { type: "and", description: "宽度应从192px变为288px" },
      ],
    },
    {
      id: "场景5",
      title: "文字响应式隐藏",
      steps: [
        { type: "given", description: "用户使用小屏幕设备" },
        { type: "when", description: "查看导航栏" },
        { type: "then", description: `品牌名称"Nomad"应隐藏（小于\`640px\`）` },
        { type: "and", description: "用户菜单文字应隐藏（小于`768px`）" },
      ],
    },
    {
      id: "场景6",
      title: "触摸友好交互",
      steps: [
        { type: "given", description: "用户使用触摸屏设备" },
        { type: "when", description: "点击可交互元素" },
        { type: "then", description: "元素应有足够的点击区域（≥44px）" },
      ],
    },
    {
      id: "场景7",
      title: "断点检测准确",
      steps: [
        { type: "given", description: "系统检测设备类型" },
        { type: "when", description: "浏览器宽度为767px" },
        { type: "then", description: "useIsMobile Hook应返回true（移动设备）" },
        { type: "when", description: "浏览器宽度为768px" },
        {
          type: "then",
          description: "useIsMobile Hook应返回false（桌面设备）",
        },
      ],
    },
  ],
  notes:
    "使用Tailwind响应式类（sm/md/lg/xl）和移动优先设计原则。包含响应式容器、断点检测Hook（useIsMobile，768px为界）、自适应组件。支持平滑过渡动画、触摸友好的点击区域（≥44px）。桌面端（≥1024px）显示侧边栏+内容区两栏布局，平板端（768px-1023px）侧边栏可折叠，移动端（<768px）侧边栏转换为Sheet抽屉（宽度288px）。",
};

// REQ-UI-09: 页面加载状态
const REQ_UI_09: Requirement = {
  id: "REQ-UI-09",
  module: "ui-ux",
  name: "页面加载状态",
  overview:
    "本功能在页面或组件数据加载时显示加载状态，包括骨架屏、旋转加载图标等，为用户提供视觉反馈，改善等待体验。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**在内容加载时看到加载提示**，以便**知道系统正在处理我的请求而不是卡死**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "用户菜单加载状态",
      steps: [
        { type: "given", description: "用户认证状态正在加载" },
        { type: "when", description: "页面初始化" },
        { type: "then", description: "用户菜单区域应显示脉冲动画的骨架加载器" },
      ],
    },
    {
      id: "场景2",
      title: "航班列表加载骨架",
      steps: [
        { type: "given", description: "航班搜索结果正在加载" },
        { type: "when", description: "用户提交搜索" },
        { type: "then", description: "应显示FlightCardSkeleton骨架屏" },
        { type: "and", description: "骨架应模拟真实卡片的布局结构" },
      ],
    },
    {
      id: "场景3",
      title: "旋转加载图标显示",
      steps: [
        { type: "given", description: "表单提交或操作执行中" },
        { type: "when", description: "用户点击提交按钮" },
        { type: "then", description: "按钮应显示旋转的Loader2图标" },
        { type: "and", description: "按钮应变为禁用状态" },
      ],
    },
    {
      id: "场景4",
      title: "加载完成移除状态",
      steps: [
        { type: "given", description: "数据加载中显示骨架屏" },
        { type: "when", description: "数据加载完成" },
        { type: "then", description: "骨架屏应消失，显示真实内容" },
      ],
    },
    {
      id: "场景5",
      title: "骨架屏动画效果",
      steps: [
        { type: "given", description: "骨架屏正在显示" },
        { type: "when", description: "用户查看页面" },
        {
          type: "then",
          description: "骨架屏应有脉冲动画效果（animate-pulse）",
        },
      ],
    },
    {
      id: "场景6",
      title: "可访问性支持",
      steps: [
        { type: "given", description: "屏幕阅读器用户访问加载中的内容" },
        { type: "when", description: "加载组件显示" },
        {
          type: "then",
          description: `应有role="status"和aria-label="Loading"属性`,
        },
      ],
    },
  ],
  notes:
    "骨架屏应与真实内容布局一致。包含Skeleton组件（通用骨架）、FlightCardSkeleton（航班卡片骨架）、Loader2图标（旋转加载）。支持脉冲动画（animate-pulse）、无缝切换到真实内容。具备可访问性支持（role='status'、aria-label='Loading'）。",
};

// REQ-UI-10: Toast通知
const REQ_UI_10: Requirement = {
  id: "REQ-UI-10",
  module: "ui-ux",
  name: "Toast通知",
  overview:
    "本功能通过Toast通知向用户提供操作反馈，包括成功、错误、警告、信息等类型的即时消息，自动消失或可手动关闭。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**在执行操作后能看到即时反馈提示**，以便**知道操作是否成功**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "成功操作显示Toast",
      steps: [
        { type: "given", description: "用户成功提交搜索" },
        { type: "when", description: "操作完成" },
        {
          type: "then",
          description: `应显示绿色成功Toast提示"搜索: \`{关键词}\` "`,
        },
        { type: "and", description: "Toast应在3-5秒后自动消失" },
      ],
    },
    {
      id: "场景2",
      title: "错误操作显示Toast",
      steps: [
        { type: "given", description: "用户操作失败（如支付余额不足）" },
        { type: "when", description: "错误发生" },
        { type: "then", description: "应显示红色错误Toast提示错误原因" },
        { type: "and", description: "Toast应包含明确的错误信息" },
      ],
    },
    {
      id: "场景3",
      title: "信息提示Toast",
      steps: [
        { type: "given", description: "用户点击未实现的功能" },
        { type: "when", description: "点击发生" },
        { type: "then", description: `应显示蓝色信息Toast"功能暂未实现"` },
      ],
    },
    {
      id: "场景4",
      title: "Toast自动关闭",
      steps: [
        { type: "given", description: "Toast已显示" },
        { type: "when", description: "经过5秒" },
        { type: "then", description: "Toast应自动淡出并消失" },
      ],
    },
    {
      id: "场景5",
      title: "手动关闭Toast",
      steps: [
        { type: "given", description: "Toast正在显示" },
        { type: "when", description: "用户点击Toast右上角的关闭按钮" },
        { type: "then", description: "Toast应立即关闭" },
      ],
    },
    {
      id: "场景6",
      title: "多个Toast堆叠显示",
      steps: [
        { type: "given", description: "短时间内触发多个Toast" },
        { type: "when", description: "第二个Toast显示" },
        { type: "then", description: "Toast应垂直堆叠显示，不重叠" },
      ],
    },
    {
      id: "场景7",
      title: "Toast主题适配",
      steps: [
        { type: "given", description: "用户切换深色/浅色主题" },
        { type: "when", description: "Toast显示" },
        { type: "then", description: "Toast样式应自动适配当前主题" },
      ],
    },
  ],
  notes:
    "Toast通知固定在屏幕右下角或顶部中央，使用Sonner库。包含Toast容器、成功/错误/信息图标、关闭按钮。支持淡入淡出动画、自动关闭（3-5秒）/手动关闭、垂直堆叠显示、主题自动适配。成功Toast显示绿色，错误Toast显示红色，信息Toast显示蓝色。",
};

// REQ-UI-11: 对话框与确认
const REQ_UI_11: Requirement = {
  id: "REQ-UI-11",
  module: "ui-ux",
  name: "对话框与确认",
  overview:
    "本功能提供模态对话框和确认框，用于显示重要信息、收集用户输入或确认破坏性操作，确保用户充分理解操作后果。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**在执行重要操作前能看到确认对话框**，以便**避免误操作造成损失**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "对话框正常显示",
      steps: [
        { type: "given", description: "用户触发需要对话框的操作" },
        { type: "when", description: "对话框打开" },
        { type: "then", description: "应显示半透明遮罩层覆盖页面" },
        { type: "and", description: "对话框应居中显示在遮罩层上方" },
      ],
    },
    {
      id: "场景2",
      title: "对话框包含完整信息",
      steps: [
        { type: "given", description: "对话框已打开" },
        { type: "when", description: "用户查看对话框" },
        { type: "then", description: "应显示标题、描述内容和操作按钮" },
      ],
    },
    {
      id: "场景3",
      title: "确认对话框二次确认",
      steps: [
        { type: "given", description: "用户点击删除订单" },
        { type: "when", description: "确认对话框显示" },
        { type: "then", description: `应显示警示性标题"确定要删除此订单吗？"` },
        { type: "and", description: `应包含"取消"和"确认"两个按钮` },
      ],
    },
    {
      id: "场景4",
      title: "用户取消操作",
      steps: [
        { type: "given", description: "确认对话框已显示" },
        { type: "when", description: `用户点击"取消"或点击遮罩层` },
        { type: "then", description: "对话框应关闭，操作不执行" },
      ],
    },
    {
      id: "场景5",
      title: "用户确认操作",
      steps: [
        { type: "given", description: "确认对话框已显示" },
        { type: "when", description: `用户点击"确认"按钮` },
        { type: "then", description: "对话框应关闭，执行相应操作" },
      ],
    },
    {
      id: "场景6",
      title: "对话框动画效果",
      steps: [
        { type: "given", description: "对话框打开或关闭" },
        { type: "when", description: "状态变化" },
        { type: "then", description: "应有缩放+淡入淡出动画（zoom-in-95）" },
      ],
    },
    {
      id: "场景7",
      title: "Escape键关闭对话框",
      steps: [
        { type: "given", description: "对话框已打开" },
        { type: "when", description: "用户按下Esc键" },
        { type: "then", description: "对话框应关闭" },
      ],
    },
    {
      id: "场景8",
      title: "对话框关闭按钮",
      steps: [
        {
          type: "given",
          description: "对话框显示关闭按钮（showCloseButton=true）",
        },
        { type: "when", description: "用户点击右上角X按钮" },
        { type: "then", description: "对话框应关闭" },
      ],
    },
  ],
  notes:
    "遮罩层全屏覆盖，对话框居中显示。包含Dialog/AlertDialog组件、标题、描述、按钮、关闭按钮。支持遮罩层点击关闭、Esc键关闭、缩放+淡入淡出动画（zoom-in-95）。确认对话框包含'取消'和'确认'两个按钮，用于破坏性操作的二次确认。",
};

// REQ-UI-12: 错误提示
const REQ_UI_12: Requirement = {
  id: "REQ-UI-12",
  module: "ui-ux",
  name: "错误提示",
  overview:
    "本功能在发生错误时向用户显示友好的错误提示信息，包括表单验证错误、系统错误、网络错误等，并提供解决建议或重试选项。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**用户**，我希望**在遇到错误时能看到清晰的错误说明**，以便**知道出了什么问题以及如何解决**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "表单验证错误显示",
      steps: [
        { type: "given", description: "用户提交表单但验证失败" },
        { type: "when", description: "表单验证执行" },
        { type: "then", description: "应在错误字段下方显示红色错误提示文字" },
        { type: "and", description: "错误字段应有红色边框高亮" },
      ],
    },
    {
      id: "场景2",
      title: "Alert组件显示错误",
      steps: [
        { type: "given", description: "页面加载或操作失败" },
        { type: "when", description: "错误发生" },
        { type: "then", description: "应显示Alert错误提示框" },
        { type: "and", description: "包含错误图标、标题和描述" },
      ],
    },
    {
      id: "场景3",
      title: "网络错误提示",
      steps: [
        { type: "given", description: "网络请求失败" },
        { type: "when", description: "超时或断网" },
        { type: "then", description: `应显示"网络连接失败，请检查网络后重试"` },
        { type: "and", description: `提供"重试"按钮` },
      ],
    },
    {
      id: "场景4",
      title: "权限错误提示",
      steps: [
        { type: "given", description: "用户尝试访问无权限的资源" },
        { type: "when", description: "权限验证失败" },
        { type: "then", description: `应显示"无权访问此内容"提示` },
        { type: "and", description: "提供返回上一页或登录的链接" },
      ],
    },
    {
      id: "场景5",
      title: "404页面错误",
      steps: [
        { type: "given", description: "用户访问不存在的页面" },
        { type: "when", description: "页面加载" },
        { type: "then", description: "应显示404错误页面" },
        { type: "and", description: `包含"页面不存在"说明和返回首页链接` },
      ],
    },
    {
      id: "场景6",
      title: "错误提示可关闭",
      steps: [
        { type: "given", description: "错误Alert正在显示" },
        { type: "when", description: "用户点击关闭按钮" },
        { type: "then", description: "错误提示应消失" },
      ],
    },
    {
      id: "场景7",
      title: "错误提示样式区分",
      steps: [
        { type: "given", description: "不同类型的错误" },
        { type: "when", description: "错误显示" },
        {
          type: "then",
          description: `破坏性错误应使用红色variant="destructive"`,
        },
        { type: "and", description: "一般提示应使用default variant" },
      ],
    },
  ],
  notes:
    "表单错误在字段下方内联显示（红色文字+红色边框高亮），页面错误使用Alert组件或专用错误页。包含Alert组件（错误variant）、错误图标、错误文字说明、操作按钮（重试/返回）。支持可关闭错误提示、提供解决方案或操作入口。破坏性错误使用variant='destructive'（红色），一般提示使用default variant。",
};

const REQ_UI_13: Requirement = {
  id: "REQ-UI-13",
  module: "ui-ux",
  name: "设计系统与样式规范",
  overview:
    "本功能定义了全局的设计系统、颜色规范、排版规则和组件库配置，确保应用具有一致的视觉风格和用户体验。基于Shadcn/UI和Tailwind CSS实现。",
  priority: "Must Have",
  userStories: [
    {
      id: "US-01",
      content:
        "作为一个**开发者/设计师**，我希望**系统有一套统一的设计规范**，以便**快速构建风格一致的界面**。",
    },
  ],
  acceptanceCriteria: [
    {
      id: "场景1",
      title: "颜色系统应用",
      steps: [
        { type: "given", description: "开发新组件" },
        { type: "when", description: "应用主题颜色" },
        {
          type: "then",
          description:
            "应使用CSS变量定义的语义化颜色（如--primary, --secondary）",
        },
        {
          type: "and",
          description:
            "Primary色应为oklch(0.55 0.18 240)（蓝色系），Secondary色应为oklch(0.68 0.17 45)（橙色系）",
        },
      ],
    },
    {
      id: "场景2",
      title: "圆角规范一致性",
      steps: [
        { type: "given", description: "查看不同组件（卡片、按钮、输入框）" },
        { type: "when", description: "测量圆角大小" },
        {
          type: "then",
          description: "所有组件应遵循--radius变量定义的圆角（0.75rem）",
        },
      ],
    },
    {
      id: "场景3",
      title: "深色模式颜色适配",
      steps: [
        { type: "given", description: "切换到深色模式" },
        { type: "when", description: "查看界面元素" },
        {
          type: "then",
          description: "背景色应变为oklch(0.15 0.01 240)，文字变为浅色",
        },
        {
          type: "and",
          description: "Primary色应自动调整为深色模式下的亮蓝色",
        },
      ],
    },
    {
      id: "场景4",
      title: "字体排版规范",
      steps: [
        { type: "given", description: "查看文本内容" },
        { type: "when", description: "检查字体设置" },
        {
          type: "then",
          description: "应优先使用Geist Sans（无衬线）和Geist Mono（等宽）字体",
        },
      ],
    },
    {
      id: "场景5",
      title: "打印样式优化",
      steps: [
        { type: "given", description: "用户打印页面（如行程单）" },
        { type: "when", description: "触发浏览器打印预览" },
        {
          type: "then",
          description: "应隐藏导航栏、页脚等非内容元素",
        },
        {
          type: "and",
          description: "背景应强制为白色，文字为黑色，链接显示URL",
        },
      ],
    },
  ],
  notes:
    "基于Shadcn/UI 'new-york' 风格配置。核心颜色：Primary(蓝), Secondary(橙)。圆角：0.75rem。字体：Geist Sans/Mono。支持深色模式自动适配（OKLCH色彩空间）。包含针对打印场景的专用样式优化。",
};

export const uiUxModule: ModuleDefinition = {
  id: "ui-ux",
  name: "UI/UX模块",
  description: "用户界面与体验",
  icon: "LayoutDashboard",
  requirements: [
    REQ_UI_01,
    REQ_UI_02,
    REQ_UI_03,
    REQ_UI_04,
    REQ_UI_05,
    REQ_UI_06,
    REQ_UI_07,
    REQ_UI_08,
    REQ_UI_09,
    REQ_UI_10,
    REQ_UI_11,
    REQ_UI_12,
    REQ_UI_13,
  ],
};
