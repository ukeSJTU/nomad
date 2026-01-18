# Passengers 域组件迁移

> **批次分配**: 批次3 (与 flights booking/orders 一起 - 表单模式应用)
> **组件总数**: 4
> **状态**: 已完成 4 | 进行中 0 | 未开始 0
> **最后更新**: 2026-01-18

## 域概览

Passengers 域负责乘客信息管理,包括:

- 乘客信息表单 (添加/编辑)
- 乘客列表展示
- 乘客详情查看
- 乘客数据表格 (带操作)

**关键挑战**:

- 表单验证 (react-hook-form + zod)
- 数据表格的复杂交互 (筛选、排序、批量操作)
- 证件信息的格式化与遮罩
- 路由导航集成

**依赖**:

- 适配层 (批次0) 必须先完成
- common/data-table-with-actions 的表格模式 (批次1)
- 表单模式 (批次2 auth 建立)

---

## 组件清单

### ✅ 已完成并测试

#### ./passengers/forms/passenger-form.tsx

**UI 组件**: `packages/ui/src/components/passengers/passenger-form.tsx`
**容器组件**: `apps/web/app/_components/passengers/forms/passenger-form.tsx`
**测试文件**: `packages/ui/src/components/passengers/passenger-form.test.tsx`
**Storybook**: `apps/storybook/src/stories/passengers/passenger-form.stories.tsx`

#### ./passengers/passenger-list.tsx

**UI 组件**: `packages/ui/src/components/passengers/passenger-list.tsx`
**容器组件**: `apps/web/app/_components/passengers/passenger-list.tsx`
**测试文件**: `packages/ui/src/components/passengers/passenger-list.test.tsx`
**Storybook**: `apps/storybook/src/stories/passengers/passenger-list.stories.tsx`

#### ./passengers/passengers-data-table.tsx

**UI 组件**: `packages/ui/src/components/passengers/passengers-data-table.tsx`
**容器组件**: `apps/web/app/_components/passengers/passengers-data-table.tsx`
**测试文件**: `packages/ui/src/components/passengers/passengers-data-table.test.tsx`
**Storybook**: `apps/storybook/src/stories/passengers/passengers-data-table.stories.tsx`

#### ./passengers/passenger-detail-view.tsx

**UI 组件**: `packages/ui/src/components/passengers/passenger-detail-view.tsx`
**容器组件**: `apps/web/app/_components/passengers/passenger-detail-view.tsx`
**测试文件**: `packages/ui/src/components/passengers/passenger-detail-view.test.tsx`
**Storybook**: `apps/storybook/src/stories/passengers/passenger-detail-view.stories.tsx`

### 🚧 进行中

(暂无)

### 📋 未开始

(暂无)

---

## 已移除的组件规划

#### ./passengers/forms/passenger-form.tsx (已完成)

**基本信息**

- 路径: `apps/web/app/_components/passengers/forms/passenger-form.tsx`
- 复杂度: 中
- 优先级: P0 (核心功能)
- 批次: 3

**依赖问题**

- [x] react-hook-form + zod
- [x] use_client

**重构策略**

```
容器职责:
- Schema 管理 (passengerSchema)
- 表单提交与验证
- 默认值回填 (编辑模式)
- 错误处理
- 证件类型选项提供

UI 职责:
- 受控表单字段渲染
  - 姓名 (中文/英文)
  - 证件类型/证件号
  - 手机号
  - 出生日期
  - 性别
- 验证错误显示
- 提交/取消按钮
- Loading 状态

适配器需求:
- 无
```

**View Model 接口**
参考 [ARCHITECTURE.md - PassengerForm](../../ARCHITECTURE.md#passengerform)

**测试要点**

- [ ] 所有字段输入
- [ ] 表单验证 (必填、格式)
- [ ] 证件类型切换
- [ ] 提交流程
- [ ] 取消操作

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 需要明确证件号验证规则 (身份证、护照等)

---

#### ./passengers/passenger-list.tsx

**基本信息**

- 路径: `apps/web/app/_components/passengers/passenger-list.tsx`
- 复杂度: 低
- 优先级: P1
- 批次: 3

**依赖问题**

- [x] use_client

**重构策略**

```
容器职责:
- 提供乘客列表数据
- 处理选择/添加/编辑回调
- 管理列表状态

UI 职责:
- 乘客卡片列表渲染
- 空状态提示
- 添加乘客按钮
- 选择/编辑交互

适配器需求:
- 无
```

**View Model 接口**

```typescript
interface PassengerListProps {
  passengers: Array<{
    id: string;
    name: string;
    docType: string;
    docNumber: string;
    phone?: string;
  }>;
  onSelect?: (id: string) => void;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  loading?: boolean;
}
```

**测试要点**

- [ ] 列表渲染
- [ ] 空状态显示
- [ ] 选择交互
- [ ] 添加/编辑按钮

**实现笔记**

- 待实施时记录

---

#### ./passengers/passengers-data-table.tsx

**基本信息**

- 路径: `apps/web/app/_components/passengers/passengers-data-table.tsx`
- 复杂度: 高
- 优先级: P0
- 批次: 3

**依赖问题**

- [x] Next.js Router
- [x] useEffect
- [x] use_client

**重构策略**

```
容器职责:
- 提供数据源
- 定义列配置
- 处理导航 (查看/编辑)
- 处理删除/批量删除 action
- 处理数据刷新
- 证件号遮罩逻辑

UI 职责:
- 数据表格渲染
- 筛选 UI
- 排序交互
- 行操作按钮 (查看/编辑/删除)
- 批量选择与操作
- 受控状态

适配器需求:
- 无 (导航通过回调)
```

**View Model 接口**
参考 [ARCHITECTURE.md - PassengerList](../../ARCHITECTURE.md#passengerlistdatatable)

**测试要点**

- [ ] 数据渲染
- [ ] 筛选功能
- [ ] 排序功能
- [ ] 行操作
- [ ] 批量操作
- [ ] 证件号遮罩显示

**实现笔记**

- 待实施时记录

**阻塞问题**

- [ ] 需要复用 common/data-table-with-actions 的模式

---

#### ./passengers/passenger-detail-view.tsx

**基本信息**

- 路径: `apps/web/app/_components/passengers/passenger-detail-view.tsx`
- 复杂度: 低
- 优先级: P2
- 批次: 3

**依赖问题**

- 待确认 (可能是纯 UI)

**重构策略**

```
如果是纯展示组件:

UI 职责:
- 乘客详情展示
- 字段标签与值
- 编辑/删除按钮

Props:
- passenger: {
    name: string;
    docType: string;
    docNumber: string;
    phone?: string;
    birthday?: string;
    gender?: string;
  }
- onEdit?: () => void
- onDelete?: () => void
- onBack?: () => void

适配器需求:
- 无
```

**测试要点**

- [ ] 详情显示
- [ ] 按钮交互

**实现笔记**

- 待实施时记录

---

## 域级决策

### 表单模式

与 auth/security 表单保持一致:

- 容器管理 zod schema
- 错误消息通过 props 传递
- UI 只负责渲染和显示错误

### 数据遮罩

证件号等敏感信息:

- 创建 `maskDocNumber` util 函数
- 容器提供已遮罩的数据
- UI 直接渲染

### 数据表格模式

复用 common/data-table-with-actions 建立的模式:

- 完全受控
- 数据源和操作回调由容器提供
- UI 不包含路由或副作用逻辑

---

## 迁移检查清单

- [ ] 所有组件已迁移到 packages/ui
- [ ] 容器组件在 apps/web 实现
- [ ] 表单模式正确应用
- [ ] 数据表格模式正确应用
- [ ] 单元测试覆盖 (Vitest + RTL)
- [ ] 在 apps/demo 中验证可用性
- [ ] 文档更新

---

## 进度统计

| 类别      | 总数  | 已完成 | 进行中 | 未开始 |
| --------- | ----- | ------ | ------ | ------ |
| 表单      | 1     | 1      | 0      | 0      |
| 列表/详情 | 2     | 2      | 0      | 0      |
| 数据表格  | 1     | 1      | 0      | 0      |
| **总计**  | **4** | **4**  | **0**  | **0**  |

---

## 下一步行动

✅ **Passengers 域迁移已完成！**

所有 4 个组件已成功迁移到 `packages/ui`，并包含:

- ✅ UI 组件 (无 Next.js 依赖)
- ✅ 容器组件 (处理导航、数据格式化)
- ✅ 单元测试 (Vitest + RTL)
- ✅ Storybook stories
- ✅ 构建验证通过

**建议下一步**:

- 继续 Auth 域迁移 (批次2，13个组件)
- 或继续 Flights Booking/Orders 组件 (批次3，8个剩余组件)

---

## 参考

- [架构指南](../../ARCHITECTURE.md)
- [总览](../../TODO.md)
- **相关批次**: 批次1 (common 表格模式)、批次2 (auth 表单模式)
