# 机票搜索日期选择交互修复技术说明

## 概述

- 问题：在“往返”模式下，点击“出发日期”或“返回日期”后，存在跨字段更新的情况（例如点击出发却更新返回）。
- 影响范围：`/flights` 搜索页面的日期选择组件（往返与单程相关逻辑）。
- 目标：确保两个日期字段的更新操作完全独立且互不干扰，每次点击只修改对应的目标日期字段；并提供清晰的用户反馈与正确的日期顺序限制。

## 根因分析

- 原实现使用 `Calendar mode="range"`，允许一次同时选择出发与返回，造成逻辑混杂：
  - 回调中根据是否选择到 `from/to` 联动更新两个日期，出现跨字段更新。
  - 触发器曾使用下拉菜单模式导致点击事件冒泡被拦截，`activeField` 不一致。

## 修复方案

- 交互模式改为单选：在往返模式下只允许选择一个日期，明确当前正在编辑的字段。
- 事件绑定：在出发/返回日期容器上直接绑定点击事件，确保点击能更新 `activeField`。
- 状态更新：`handleDateSelect` 仅根据 `activeField` 更新对应字段，不再联动更新另一字段。
- 顺序约束：
  - 编辑返回时禁用所有早于出发的日期；
  - 编辑出发时如已有返回，禁用所有晚于返回的日期；
  - 同时保留最小/最大可选范围控制。
- 用户反馈：高亮当前正在编辑的字段（边框强调），让用户明确当前操作目标。

## 关键代码位置与变更

- 事件绑定与视觉反馈（为每个字段提供独立点击与高亮）：
  - `src/components/flights/search/date-selector/round-trip-selector.tsx:43-53` 出发字段点击绑定 `onDepartureClick`
  - `src/components/flights/search/date-selector/round-trip-selector.tsx:67-76` 返回字段点击绑定 `onReturnClick`
  - `src/components/flights/search/date-selector/round-trip-selector.tsx:44-47,68-71` 根据 `activeField` 添加 `ring-2 ring-primary` 高亮
- 往返模式改为单选日历（避免一次选择两个值造成联动）：
  - `src/components/flights/search/date-selector/round-trip-selector.tsx:82-97` 使用 `Calendar mode="single"`，`selected` 与 `defaultMonth` 由 `activeField` 决定
- 将当前编辑字段传入往返选择组件：
  - `src/components/flights/search/date-selector/date-selector.tsx:58-68` 增加 `activeField` 属性传递
- 只更新目标字段，不再联动：
  - `src/hooks/use-date-selector.ts:72-101` 在往返模式下根据 `activeField` 分支只更新一个字段并关闭日历
- 日期禁用规则的对称约束：
  - `src/hooks/use-date-selector.ts:119-134`
    - 返回字段：禁用 `< departureDate`
    - 出发字段：在已有返回时禁用 `> returnDate`

## 测试与验证

- 测试文件：`src/components/flights/search/date-selector/date-selector.test.tsx`
- 重点用例：
  - `118-163` 点击“出发日期”只调用 `onDepartureDateChange`，且 UI 显示新日期
  - `165-210` 点击“返回日期”只调用 `onReturnDateChange`，且 UI 显示新日期
  - `212-229` 限制最小/最大范围（边界日期按钮为禁用）
  - 新增：返回早于出发不可选（禁用）
- 运行命令：
  ```
  pnpm exec vitest --run --project=components src/components/flights/search/date-selector/date-selector.test.tsx
  ```

## 验收标准

- 单独点击“出发日期”多次，仅更新出发字段；点击“返回日期”多次，仅更新返回字段。
- 交叉点击时两个字段互不干扰，`activeField` 切换明确，UI 有边框高亮反馈。
- 日期顺序限制生效：返回不可早于出发；在已有返回时，出发不可晚于返回。
- 边界限制生效：不可选择 `today` 之前或超过最大天数的日期。

## 方案对比与选择理由

- 方案 A（保留范围选择 `range`）：一次选择双值、逻辑复杂、易出现联动更新与状态错乱。
- 方案 B（改为单选 + 显式目标字段）：每次只更新一个目标字段，逻辑清晰、状态可控、便于约束与反馈。
- 采用方案 B，满足“每次点击只能修改对应的目标日期字段”的明确需求，并且更易维护与测试。

## 风险与回滚

- 风险：用户原有习惯可能偏向一次选择出返两值；但当前课程项目更强调逻辑正确与可维护性。
- 回滚：如需恢复 `range` 行为，可将 `RoundTripSelector` 的 `Calendar` 恢复为 `mode="range"` 并调整 `handleDateSelect` 联动逻辑，但需重新审计交互与测试。

## 使用与演示

- 页面路径：`/flights`
- 操作指引：点击左侧“出发日期”或右侧“返回日期”触发对应日期选择；当前编辑字段将有边框高亮。
- 若需完整联动城市与搜索体验，请先初始化数据库：
  ```
  pnpm run db:push
  pnpm run db:seed
  pnpm run dev
  ```

## 变更清单

- 修改：`src/components/flights/search/date-selector/round-trip-selector.tsx`
- 修改：`src/components/flights/search/date-selector/date-selector.tsx`
- 修改：`src/hooks/use-date-selector.ts`
- 修改与新增测试：`src/components/flights/search/date-selector/date-selector.test.tsx`
