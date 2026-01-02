# 组件拆分案例 2: SearchForm

## 📋 组件概述

**文件路径**: `apps/web/app/_components/flights/search/search-form.tsx`

**当前状态**: 269 行代码，包含复杂的状态同步和副作用管理

**复杂度**:

- ⭐⭐⭐⭐ 中高复杂度
- 管理 6 个表单字段状态
- URL 参数同步逻辑
- 自动搜索触发机制
- 单程/往返切换逻辑
- 复杂的 useEffect 依赖管理

---

## 🔍 当前代码结构分析

### 当前组件层级

```
SearchForm
├── RadioGroup (行程类型选择)
├── Select (舱位等级)
├── CityInput (城市选择 - 已拆分组件)
├── DateSelector (日期选择 - 已拆分组件)
└── Button (搜索按钮 - 可选)
```

### 混合在一起的关注点

1. **UI 渲染**: 表单布局、单程/往返切换、舱位选择
2. **状态管理**: 6 个 `useState` 管理表单字段
3. **副作用管理**:
   - 从 URL 同步初始值
   - 监听字段变化触发自动搜索
   - 防止初始挂载时触发搜索
4. **业务逻辑**:
   - 城市交换
   - 单程/往返切换时自动设置返程日期
   - 表单验证（隐式）
5. **同步逻辑**: 使用 `useRef` 追踪状态避免循环更新

---

## ✨ 拆分方案

### 拆分目标

将组件拆分为 **3 层架构**:

1. **UI Component** (纯展示层) - 只负责渲染
2. **Custom Hook** (逻辑层) - 管理所有状态和副作用
3. **Container Component** (容器层) - 组合 UI 和逻辑

---

## 📁 拆分后的文件结构

```
flights/search/search-form/
├── index.tsx                    # 导出入口
├── SearchForm.tsx               # 容器组件
├── components/
│   ├── SearchFormUI.tsx         # 纯 UI 组件
│   ├── TripTypeSelector.tsx     # 行程类型选择器
│   └── SeatClassSelector.tsx    # 舱位选择器
├── hooks/
│   ├── useSearchForm.ts         # 搜索表单逻辑
│   └── useSearchFormSync.ts     # URL 同步逻辑
└── types.ts                     # TypeScript 类型定义
```

---

## 💻 拆分后的代码实现

### 1. 类型定义 (`types.ts`)

```typescript
import type { CityData } from "@/types/dto";

export type TripType = "one-way" | "round-trip";

export type SeatClass = "any" | "economy" | "business" | "first";

export interface SearchFormData {
  tripType: TripType;
  departureCity: CityData | null;
  arrivalCity: CityData | null;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  seatClass: SeatClass;
}

export interface SearchFormUIProps {
  // 表单字段值
  tripType: TripType;
  departureCity: CityData | null;
  arrivalCity: CityData | null;
  departureDate: Date | null;
  returnDate: Date | null;
  seatClass: SeatClass;

  // 字段变更回调
  onTripTypeChange: (tripType: TripType) => void;
  onDepartureCityChange: (city: CityData | null) => void;
  onArrivalCityChange: (city: CityData | null) => void;
  onDepartureDateChange: (date: Date | null) => void;
  onReturnDateChange: (date: Date | null) => void;
  onSeatClassChange: (seatClass: SeatClass) => void;

  // 操作回调
  onSwapCities: () => void;
  onSearch?: () => void;

  // 数据
  cities: CityData[];

  // 配置
  showSearchButton?: boolean;

  // 其他
  className?: string;
}

export interface SearchFormProps {
  showSearchButton?: boolean;
  onSearch?: (data: SearchFormData) => void;
  onChange?: (data: SearchFormData) => void;
  cities: CityData[];
  initialValues?: Partial<SearchFormData>;
}
```

---

### 2. UI 子组件 - 行程类型选择器 (`components/TripTypeSelector.tsx`)

```tsx
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { TripType } from "../types";

interface TripTypeSelectorProps {
  value: TripType;
  onChange: (value: TripType) => void;
  disabled?: boolean;
}

/**
 * 行程类型选择器 - 纯 UI 组件
 *
 * 单程/往返切换
 */
export function TripTypeSelector({
  value,
  onChange,
  disabled = false,
}: TripTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <RadioGroup
        value={value}
        onValueChange={v => onChange(v as TripType)}
        className="flex gap-6"
        disabled={disabled}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="one-way" id="one-way" className="scale-125" />
          <Label
            htmlFor="one-way"
            className="text-base font-normal cursor-pointer"
          >
            单程
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="round-trip"
            id="round-trip"
            className="scale-125"
          />
          <Label
            htmlFor="round-trip"
            className="text-base font-normal cursor-pointer"
          >
            往返
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
```

---

### 3. UI 子组件 - 舱位选择器 (`components/SeatClassSelector.tsx`)

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { SeatClass } from "../types";

interface SeatClassSelectorProps {
  value: SeatClass;
  onChange: (value: SeatClass) => void;
  disabled?: boolean;
}

const SEAT_CLASS_OPTIONS = [
  { value: "any", label: "不限座舱" },
  { value: "economy", label: "经济舱" },
  { value: "business", label: "商务舱" },
  { value: "first", label: "头等舱" },
] as const;

/**
 * 舱位选择器 - 纯 UI 组件
 */
export function SeatClassSelector({
  value,
  onChange,
  disabled = false,
}: SeatClassSelectorProps) {
  return (
    <div className="space-y-2">
      <Select
        value={value}
        onValueChange={v => onChange(v as SeatClass)}
        disabled={disabled}
      >
        <SelectTrigger id="seat-class" className="h-11 text-base">
          <SelectValue placeholder="选择舱位等级" />
        </SelectTrigger>
        <SelectContent>
          {SEAT_CLASS_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

---

### 4. UI 主组件 - 搜索表单 (`components/SearchFormUI.tsx`)

```tsx
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TripTypeSelector } from "./TripTypeSelector";
import { SeatClassSelector } from "./SeatClassSelector";
import { CityInput } from "../city-selector";
import { DateSelector } from "../date-selector";
import type { SearchFormUIProps } from "../types";

/**
 * 搜索表单 - 纯 UI 组件
 *
 * 职责:
 * - 渲染表单布局
 * - 组合各个子组件
 * - 转发用户交互事件
 *
 * 不包含:
 * - 状态管理
 * - 副作用处理
 * - 业务逻辑
 * - URL 同步
 */
export function SearchFormUI({
  tripType,
  departureCity,
  arrivalCity,
  departureDate,
  returnDate,
  seatClass,
  onTripTypeChange,
  onDepartureCityChange,
  onArrivalCityChange,
  onDepartureDateChange,
  onReturnDateChange,
  onSeatClassChange,
  onSwapCities,
  onSearch,
  cities,
  showSearchButton = false,
  className,
}: SearchFormUIProps) {
  return (
    <div className="w-full space-y-8 justify-center items-center">
      {/* 上部区域：行程类型和舱位选择 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        {/* 行程类型选择 */}
        <TripTypeSelector value={tripType} onChange={onTripTypeChange} />

        {/* 舱位选择 */}
        <SeatClassSelector value={seatClass} onChange={onSeatClassChange} />
      </div>

      {/* 下部区域：城市和日期选择 */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* 城市选择 */}
        <div className="space-y-2 flex-1">
          <CityInput
            departureCity={departureCity}
            arrivalCity={arrivalCity}
            onDepartureCityChange={onDepartureCityChange}
            onArrivalCityChange={onArrivalCityChange}
            onSwap={onSwapCities}
            cities={cities}
          />
        </div>

        {/* 日期选择 */}
        <div className="flex-1">
          <DateSelector
            tripType={tripType}
            departureDate={departureDate}
            returnDate={returnDate}
            onDepartureDateChange={onDepartureDateChange}
            onReturnDateChange={onReturnDateChange}
            onTripTypeChange={onTripTypeChange}
            timezone={departureCity?.timezone}
          />
        </div>
      </div>

      {/* 搜索按钮（可选） */}
      {showSearchButton && onSearch && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
          <Button
            onClick={onSearch}
            className="text-lg font-semibold rounded-full px-12 h-14 bg-secondary"
            size="lg"
          >
            <Search className="mr-2 h-6 w-6 stroke-[3px]" />搜 索
          </Button>
        </div>
      )}
    </div>
  );
}
```

---

### 5. Custom Hook - 搜索表单逻辑 (`hooks/useSearchForm.ts`)

```typescript
import { useCallback, useState } from "react";

import type { CityData } from "@/types/dto";
import type { SearchFormData, TripType, SeatClass } from "../types";

interface UseSearchFormProps {
  initialValues?: Partial<SearchFormData>;
  onChange?: (data: SearchFormData) => void;
}

/**
 * 搜索表单逻辑 Hook
 *
 * 职责:
 * - 管理所有表单字段状态
 * - 处理字段变更
 * - 处理城市交换
 * - 处理行程类型切换（自动设置返程日期）
 * - 生成完整的表单数据
 */
export function useSearchForm({
  initialValues,
  onChange,
}: UseSearchFormProps = {}) {
  // 表单字段状态
  const [tripType, setTripType] = useState<TripType>(
    initialValues?.tripType || "one-way"
  );
  const [departureCity, setDepartureCity] = useState<CityData | null>(
    initialValues?.departureCity || null
  );
  const [arrivalCity, setArrivalCity] = useState<CityData | null>(
    initialValues?.arrivalCity || null
  );
  const [departureDate, setDepartureDate] = useState<Date | null>(
    initialValues?.departureDate || null
  );
  const [returnDate, setReturnDate] = useState<Date | null>(
    initialValues?.returnDate || null
  );
  const [seatClass, setSeatClass] = useState<SeatClass>(
    initialValues?.seatClass || "any"
  );

  /**
   * 生成完整的表单数据对象
   */
  const getFormData = useCallback((): SearchFormData => {
    return {
      tripType,
      departureCity,
      arrivalCity,
      departureDate: departureDate || undefined,
      returnDate: returnDate || undefined,
      seatClass,
    };
  }, [
    tripType,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    seatClass,
  ]);

  /**
   * 触发 onChange 回调
   */
  const triggerChange = useCallback(() => {
    if (!onChange) return;

    // 只有基本字段都填写完整才触发
    if (!departureCity || !arrivalCity || !departureDate) return;

    // 往返行程需要返程日期
    if (tripType === "round-trip" && !returnDate) return;

    onChange(getFormData());
  }, [
    onChange,
    departureCity,
    arrivalCity,
    departureDate,
    tripType,
    returnDate,
    getFormData,
  ]);

  /**
   * 交换出发城市和到达城市
   */
  const handleSwapCities = useCallback(() => {
    const temp = departureCity;
    setDepartureCity(arrivalCity);
    setArrivalCity(temp);
  }, [departureCity, arrivalCity]);

  /**
   * 行程类型变更处理
   * 切换到往返时自动设置返程日期（默认出发后7天）
   */
  const handleTripTypeChange = useCallback(
    (newTripType: TripType) => {
      setTripType(newTripType);

      // 切换到往返且没有返程日期时，自动设置
      if (newTripType === "round-trip" && !returnDate && departureDate) {
        const defaultReturnDate = new Date(departureDate);
        defaultReturnDate.setDate(defaultReturnDate.getDate() + 7);
        setReturnDate(defaultReturnDate);
      }
    },
    [returnDate, departureDate]
  );

  /**
   * 验证表单是否完整
   */
  const isFormValid = useCallback(() => {
    if (!departureCity || !arrivalCity || !departureDate) {
      return false;
    }

    if (tripType === "round-trip" && !returnDate) {
      return false;
    }

    return true;
  }, [departureCity, arrivalCity, departureDate, tripType, returnDate]);

  return {
    // 表单字段
    tripType,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    seatClass,

    // 字段更新方法
    setTripType: handleTripTypeChange,
    setDepartureCity,
    setArrivalCity,
    setDepartureDate,
    setReturnDate,
    setSeatClass,

    // 操作方法
    handleSwapCities,

    // 工具方法
    getFormData,
    triggerChange,
    isFormValid,
  };
}
```

---

### 6. Custom Hook - URL 同步逻辑 (`hooks/useSearchFormSync.ts`)

```tsx
import { useEffect, useRef } from "react";

import type { SearchFormData } from "../types";

interface UseSearchFormSyncProps {
  initialValues?: Partial<SearchFormData>;
  currentValues: SearchFormData;
  onValuesChange: (values: Partial<SearchFormData>) => void;
  onChange?: (data: SearchFormData) => void;
}

/**
 * 搜索表单同步逻辑 Hook
 *
 * 职责:
 * - 监听 initialValues 变化并同步到表单
 * - 监听表单值变化并触发 onChange
 * - 防止初始挂载时触发 onChange
 * - 防止从 URL 同步时触发 onChange
 */
export function useSearchFormSync({
  initialValues,
  currentValues,
  onValuesChange,
  onChange,
}: UseSearchFormSyncProps) {
  // 追踪是否为初始挂载
  const isInitialMount = useRef(true);

  // 追踪是否正在从 props 同步（防止循环更新）
  const isSyncingFromProps = useRef(false);

  /**
   * Effect 1: 从 initialValues 同步到表单
   * 当 URL 参数变化时更新表单
   */
  useEffect(() => {
    if (!initialValues) return;

    isSyncingFromProps.current = true;

    // 批量更新表单值
    const updates: Partial<SearchFormData> = {};

    if (initialValues.tripType !== undefined) {
      updates.tripType = initialValues.tripType;
    }
    if (initialValues.departureCity !== undefined) {
      updates.departureCity = initialValues.departureCity;
    }
    if (initialValues.arrivalCity !== undefined) {
      updates.arrivalCity = initialValues.arrivalCity;
    }
    if (initialValues.departureDate !== undefined) {
      updates.departureDate = initialValues.departureDate;
    }
    if (initialValues.returnDate !== undefined) {
      updates.returnDate = initialValues.returnDate;
    }
    if (initialValues.seatClass !== undefined) {
      updates.seatClass = initialValues.seatClass;
    }

    if (Object.keys(updates).length > 0) {
      onValuesChange(updates);
    }

    // 延迟重置标志，确保状态更新完成
    const timer = setTimeout(() => {
      isSyncingFromProps.current = false;
    }, 0);

    return () => clearTimeout(timer);
  }, [initialValues, onValuesChange]);

  /**
   * Effect 2: 监听表单值变化，触发 onChange
   * 用于自动搜索功能
   */
  useEffect(() => {
    // 跳过初始挂载
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // 跳过从 props 同步的更新
    if (isSyncingFromProps.current) {
      return;
    }

    if (!onChange) return;

    // 验证必填字段
    const { tripType, departureCity, arrivalCity, departureDate, returnDate } =
      currentValues;

    if (!departureCity || !arrivalCity || !departureDate) {
      return;
    }

    // 往返行程需要返程日期
    if (tripType === "round-trip" && !returnDate) {
      return;
    }

    // 触发 onChange
    onChange(currentValues);
  }, [
    currentValues.tripType,
    currentValues.departureCity,
    currentValues.arrivalCity,
    currentValues.departureDate,
    currentValues.returnDate,
    currentValues.seatClass,
    onChange,
  ]);

  return {
    isInitialMount: isInitialMount.current,
    isSyncingFromProps: isSyncingFromProps.current,
  };
}
```

---

### 7. 容器组件 - 搜索表单 (`SearchForm.tsx`)

```typescript
"use client";

import { useCallback } from "react";

import { SearchFormUI } from "./components/SearchFormUI";
import { useSearchForm } from "./hooks/useSearchForm";
import { useSearchFormSync } from "./hooks/useSearchFormSync";
import type { SearchFormProps, SearchFormData } from "./types";

/**
 * 搜索表单 - 容器组件
 *
 * 职责:
 * - 组合 UI 组件和逻辑 Hooks
 * - 管理状态同步
 * - 处理搜索按钮点击
 * - 传递 props 到子组件
 *
 * 不包含:
 * - UI 渲染（由 SearchFormUI 处理）
 * - 状态管理（由 useSearchForm 处理）
 * - 同步逻辑（由 useSearchFormSync 处理）
 */
export function SearchForm({
  showSearchButton = false,
  onSearch,
  onChange,
  cities,
  initialValues,
}: SearchFormProps) {
  // 表单状态管理
  const searchForm = useSearchForm({ initialValues });

  // 批量更新表单值的回调
  const handleValuesChange = useCallback(
    (updates: Partial<SearchFormData>) => {
      if (updates.tripType !== undefined) {
        searchForm.setTripType(updates.tripType);
      }
      if (updates.departureCity !== undefined) {
        searchForm.setDepartureCity(updates.departureCity);
      }
      if (updates.arrivalCity !== undefined) {
        searchForm.setArrivalCity(updates.arrivalCity);
      }
      if (updates.departureDate !== undefined) {
        searchForm.setDepartureDate(updates.departureDate);
      }
      if (updates.returnDate !== undefined) {
        searchForm.setReturnDate(updates.returnDate);
      }
      if (updates.seatClass !== undefined) {
        searchForm.setSeatClass(updates.seatClass);
      }
    },
    [searchForm]
  );

  // 同步逻辑（URL ↔ 表单状态）
  useSearchFormSync({
    initialValues,
    currentValues: searchForm.getFormData(),
    onValuesChange: handleValuesChange,
    onChange,
  });

  // 搜索按钮点击处理
  const handleSearch = useCallback(() => {
    if (!onSearch) return;
    if (!searchForm.isFormValid()) return;

    onSearch(searchForm.getFormData());
  }, [onSearch, searchForm]);

  return (
    <SearchFormUI
      tripType={searchForm.tripType}
      departureCity={searchForm.departureCity}
      arrivalCity={searchForm.arrivalCity}
      departureDate={searchForm.departureDate}
      returnDate={searchForm.returnDate}
      seatClass={searchForm.seatClass}
      onTripTypeChange={searchForm.setTripType}
      onDepartureCityChange={searchForm.setDepartureCity}
      onArrivalCityChange={searchForm.setArrivalCity}
      onDepartureDateChange={searchForm.setDepartureDate}
      onReturnDateChange={searchForm.setReturnDate}
      onSeatClassChange={searchForm.setSeatClass}
      onSwapCities={searchForm.handleSwapCities}
      onSearch={handleSearch}
      cities={cities}
      showSearchButton={showSearchButton}
    />
  );
}
```

---

### 8. 导出入口 (`index.tsx`)

```typescript
export { SearchForm } from "./SearchForm";
export type {
  SearchFormProps,
  SearchFormData,
  TripType,
  SeatClass,
} from "./types";

// 可选：导出子组件供其他地方复用
export { SearchFormUI } from "./components/SearchFormUI";
export { TripTypeSelector } from "./components/TripTypeSelector";
export { SeatClassSelector } from "./components/SeatClassSelector";

// 可选：导出 hooks 供其他地方复用
export { useSearchForm } from "./hooks/useSearchForm";
export { useSearchFormSync } from "./hooks/useSearchFormSync";
```

---

## 📊 拆分前后对比

### 代码行数

| 项目       | 拆分前 | 拆分后       |
| ---------- | ------ | ------------ |
| 单文件行数 | 269 行 | 最大 ~180 行 |
| 文件数量   | 1 个   | 9 个         |
| 可复用组件 | 0 个   | 5+ 个        |

### 职责分离

| 关注点   | 拆分前            | 拆分后               |
| -------- | ----------------- | -------------------- |
| UI 渲染  | ❌ 混合在一起     | ✅ SearchFormUI      |
| 状态管理 | ❌ 6 个 useState  | ✅ useSearchForm     |
| 同步逻辑 | ❌ 复杂 useEffect | ✅ useSearchFormSync |
| 城市交换 | ❌ 混合在组件中   | ✅ Hook 中处理       |
| 日期设置 | ❌ 混合在组件中   | ✅ Hook 中处理       |

### 复杂性降低

| 指标           | 拆分前           | 拆分后              |
| -------------- | ---------------- | ------------------- |
| useEffect 数量 | 2 个（复杂）     | 2 个（职责明确）    |
| useRef 使用    | 2 个（追踪标志） | 2 个（封装在 Hook） |
| 状态依赖       | ❌ 难以追踪      | ✅ 清晰分离         |

---

## ✅ 拆分后的优势

### 1. **职责清晰** 🎯

**拆分前**:

```typescript
// 所有逻辑混在一起，难以理解
const [tripType, setTripType] = useState(...)
const [departureCity, setDepartureCity] = useState(...)
// ... 4 个其他状态

useEffect(() => {
  // 100+ 行复杂逻辑
}, [10+ 个依赖])
```

**拆分后**:

```typescript
// 状态管理 - useSearchForm
const searchForm = useSearchForm({ initialValues })

// 同步逻辑 - useSearchFormSync
useSearchFormSync({ ... })

// UI 渲染 - SearchFormUI
<SearchFormUI {...searchForm} />
```

### 2. **易于测试** 📝

```typescript
// 可以独立测试 UI 组件
describe("SearchFormUI", () => {
  it("renders all form fields", () => {
    const { getByRole } = render(
      <SearchFormUI
        tripType="one-way"
        departureCity={null}
        // ... 其他 props
      />
    );
    expect(getByRole("radiogroup")).toBeInTheDocument();
  });
});

// 可以独立测试逻辑
describe("useSearchForm", () => {
  it("swaps cities correctly", () => {
    const { result } = renderHook(() => useSearchForm({
      initialValues: {
        departureCity: cityA,
        arrivalCity: cityB,
      }
    }));

    act(() => {
      result.current.handleSwapCities();
    });

    expect(result.current.departureCity).toBe(cityB);
    expect(result.current.arrivalCity).toBe(cityA);
  });

  it("auto-sets return date when switching to round-trip", () => {
    const { result } = renderHook(() => useSearchForm({
      initialValues: {
        tripType: "one-way",
        departureDate: new Date("2024-01-01"),
      }
    }));

    act(() => {
      result.current.setTripType("round-trip");
    });

    expect(result.current.returnDate).toEqual(
      new Date("2024-01-08") // 7 days later
    );
  });
});

// 可以独立测试同步逻辑
describe("useSearchFormSync", () => {
  it("prevents onChange on initial mount", () => {
    const onChange = jest.fn();

    renderHook(() => useSearchFormSync({
      currentValues: mockFormData,
      onValuesChange: jest.fn(),
      onChange,
    }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
```

### 3. **可复用性** ♻️

```typescript
// 在其他页面使用相同的搜索逻辑，但不同的 UI
import { useSearchForm } from "@/components/flights/search/search-form";

function CompactSearchPage() {
  const searchForm = useSearchForm();

  return (
    <div className="compact-layout">
      {/* 自定义 UI */}
      <select value={searchForm.tripType} onChange={...}>
        <option value="one-way">单程</option>
        <option value="round-trip">往返</option>
      </select>
      {/* ... */}
    </div>
  );
}

// 或者使用相同的 UI，但不同的同步逻辑
import { SearchFormUI } from "@/components/flights/search/search-form";

function StaticSearchForm() {
  const [formData, setFormData] = useState(defaultFormData);

  return (
    <SearchFormUI
      {...formData}
      onTripTypeChange={(v) => setFormData({ ...formData, tripType: v })}
      // ... 其他 props
    />
  );
}
```

### 4. **状态管理优化** ⚡

**拆分前**:

- 多个独立的 `useState`
- 复杂的依赖关系
- 难以追踪状态变化

**拆分后**:

```typescript
// useSearchForm 集中管理所有状态
const searchForm = useSearchForm();

// 清晰的 API
searchForm.departureCity; // 读取
searchForm.setDepartureCity; // 更新
searchForm.getFormData(); // 获取完整数据
searchForm.isFormValid(); // 验证
```

### 5. **副作用隔离** 🔒

**拆分前**:

```typescript
// 所有副作用混在一个组件中
useEffect(() => {
  // 同步 initialValues
  // 触发 onChange
  // 防止初始挂载触发
  // 防止循环更新
}, [10 + 个依赖]);
```

**拆分后**:

```typescript
// useSearchFormSync 专门处理同步逻辑
// 职责单一，易于理解和调试
useSearchFormSync({
  initialValues,
  currentValues,
  onValuesChange,
  onChange,
});
```

### 6. **开发体验** 👨‍💻

- ✅ 文件更小，易于导航
- ✅ 修改 UI 不影响逻辑
- ✅ 修改逻辑不影响 UI
- ✅ 新增字段只需修改少量文件
- ✅ 类型安全，IDE 自动补全

---

## 🎯 使用示例

### 基本使用

```typescript
// app/flights/search/page.tsx
import { SearchForm } from "@/components/flights/search/search-form";
import { useRouter } from "next/navigation";

export default function SearchPage({ cities }) {
  const router = useRouter();

  const handleSearch = (data) => {
    // 跳转到搜索结果页
    router.push(`/flights/results?${buildQueryString(data)}`);
  };

  return (
    <div className="container">
      <SearchForm
        cities={cities}
        showSearchButton={true}
        onSearch={handleSearch}
      />
    </div>
  );
}
```

### 自动搜索模式

```typescript
// 搜索结果页，表单变化自动触发搜索
import { SearchForm } from "@/components/flights/search/search-form";
import { useSearchParams } from "next/navigation";

export default function ResultsPage({ cities }) {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);

  const handleChange = async (data) => {
    // 自动发起搜索请求
    const newResults = await searchFlights(data);
    setResults(newResults);

    // 更新 URL
    updateUrlParams(data);
  };

  return (
    <div>
      <SearchForm
        cities={cities}
        initialValues={parseSearchParams(searchParams)}
        onChange={handleChange}
        showSearchButton={false}
      />
      <FlightList flights={results} />
    </div>
  );
}
```

### 单独使用子组件

```typescript
// 只使用行程类型选择器
import { TripTypeSelector } from "@/components/flights/search/search-form";

function QuickTripTypeSwitch() {
  const [tripType, setTripType] = useState("one-way");

  return (
    <div>
      <h3>选择行程类型</h3>
      <TripTypeSelector value={tripType} onChange={setTripType} />
    </div>
  );
}
```

---

## 🔄 与其他组件的配合

### 配合城市选择器

```typescript
// CityInput 已经是独立组件
<CityInput
  departureCity={searchForm.departureCity}
  arrivalCity={searchForm.arrivalCity}
  onDepartureCityChange={searchForm.setDepartureCity}
  onArrivalCityChange={searchForm.setArrivalCity}
  onSwap={searchForm.handleSwapCities}
  cities={cities}
/>
```

### 配合日期选择器

```typescript
// DateSelector 已经是独立组件
<DateSelector
  tripType={searchForm.tripType}
  departureDate={searchForm.departureDate}
  returnDate={searchForm.returnDate}
  onDepartureDateChange={searchForm.setDepartureDate}
  onReturnDateChange={searchForm.setReturnDate}
  onTripTypeChange={searchForm.setTripType}
  timezone={searchForm.departureCity?.timezone}
/>
```

---

## 🎨 自定义和扩展

### 自定义表单验证

```typescript
// 扩展 useSearchForm，添加自定义验证
function useSearchFormWithValidation(props) {
  const searchForm = useSearchForm(props);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!searchForm.departureCity) {
      newErrors.departureCity = "请选择出发城市";
    }

    if (!searchForm.arrivalCity) {
      newErrors.arrivalCity = "请选择到达城市";
    }

    if (searchForm.departureCity?.code === searchForm.arrivalCity?.code) {
      newErrors.cities = "出发和到达城市不能相同";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    ...searchForm,
    errors,
    validateForm,
  };
}
```

### 自定义 UI 样式

```typescript
// 创建自定义样式的搜索表单
function CompactSearchFormUI(props: SearchFormUIProps) {
  return (
    <div className="compact-search-form">
      {/* 紧凑布局 */}
      <div className="flex gap-2">
        <TripTypeSelector {...} />
        <SeatClassSelector {...} />
      </div>
      {/* ... */}
    </div>
  );
}
```
