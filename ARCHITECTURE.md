# 组件迁移架构设计

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
