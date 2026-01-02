# 组件拆分案例 3: FlightCard

## 📋 组件概述

**文件路径**: `apps/web/app/_components/flights/results/flight-card.tsx`

**当前状态**: 259 行代码，包含展开/收起交互和多舱位显示逻辑

**复杂度**:

- ⭐⭐⭐ 中等复杂度
- 支持两种模式：单价格模式和多舱位模式
- 展开/收起交互状态
- 复杂的数据展示逻辑
- 航空公司 logo 回退处理
- 格式化和计算逻辑

---

## 🔍 当前代码结构分析

### 当前组件层级

```
FlightCard
├── Card 容器
├── Avatar (航空公司 logo)
├── 航班信息区域
│   ├── 出发时间和机场
│   ├── 飞行时长箭头
│   └── 到达时间和机场
├── 价格和操作区域
│   ├── 价格显示
│   └── 预订按钮 / 展开按钮
└── 展开的舱位列表（可选）
    └── SeatClassRow[]
```

### 混合在一起的关注点

1. **UI 渲染**: 卡片布局、航班信息、价格、按钮
2. **状态管理**: `useState` 管理展开/收起状态
3. **数据处理**:
   - 航空公司首字母提取
   - 舱位类型名称映射
   - 价格格式化
4. **条件逻辑**: 单价格 vs 多舱位模式判断
5. **交互逻辑**: 展开/收起、点击预订

---

## ✨ 拆分方案

### 拆分目标

将组件拆分为 **3 层架构**:

1. **UI Components** (纯展示层) - 只负责渲染
2. **Custom Hooks** (逻辑层) - 管理状态和数据处理
3. **Container Component** (容器层) - 组合 UI 和逻辑

---

## 📁 拆分后的文件结构

```
flights/results/flight-card/
├── index.tsx                       # 导出入口
├── FlightCard.tsx                  # 容器组件
├── components/
│   ├── FlightCardUI.tsx            # 主 UI 组件
│   ├── AirlineInfo.tsx             # 航空公司信息
│   ├── FlightItinerary.tsx         # 航班行程信息
│   ├── PriceSection.tsx            # 价格区域
│   ├── SeatClassList.tsx           # 舱位列表
│   └── SeatClassRow.tsx            # 单个舱位行
├── hooks/
│   ├── useFlightCard.ts            # 航班卡片逻辑
│   └── useFlightCardExpand.ts      # 展开/收起逻辑
├── utils/
│   ├── formatters.ts               # 格式化工具
│   └── helpers.ts                  # 辅助函数
└── types.ts                        # TypeScript 类型定义
```

---

## 💻 拆分后的代码实现

### 1. 类型定义 (`types.ts`)

```typescript
export interface SeatClassOption {
  /** 舱位 ID */
  id: string;
  /** 舱位类型 */
  classType: "ECONOMY" | "BUSINESS" | "FIRST";
  /** 总座位数 */
  totalSeats: number;
  /** 可用座位数 */
  availableSeats: number;
  /** 价格（CNY） */
  price: number;
}

export interface FlightCardData {
  /** 航空公司 logo URL */
  airlineLogo?: string;
  /** 航空公司名称 */
  airlineName: string;
  /** 航班号 */
  flightNumber: string;
  /** 机型 */
  aircraftType: string;
  /** 出发时间 (HH:mm) */
  departureTime: string;
  /** 出发机场 */
  departureAirport: string;
  /** 到达时间 (HH:mm) */
  arrivalTime: string;
  /** 到达机场 */
  arrivalAirport: string;
  /** 跨天天数 (+1, +2) */
  daysOffset?: number;
  /** 飞行时长 */
  duration: string;
  /** 单价格（向后兼容） */
  price?: number;
  /** 舱位选项（新模式） */
  seatClasses?: SeatClassOption[];
  /** 最低价格（新模式） */
  lowestPrice?: number;
}

export interface FlightCardUIProps extends FlightCardData {
  /** 是否展开 */
  isExpanded: boolean;
  /** 是否为多舱位模式 */
  isMultiSeatClass: boolean;
  /** 显示的价格 */
  displayPrice: number;
  /** 按钮文本 */
  buttonText: string;
  /** 展开/收起切换 */
  onToggleExpand: () => void;
  /** 单价格模式点击 */
  onButtonClick?: () => void;
  /** 舱位点击 */
  onSeatClassClick?: (seatClass: SeatClassOption) => void;
  /** 自定义类名 */
  className?: string;
}

export interface FlightCardProps extends FlightCardData {
  /** 按钮文本 */
  buttonText?: string;
  /** 单价格模式点击回调 */
  onButtonClick?: () => void;
  /** 舱位点击回调 */
  onSeatClassClick?: (seatClass: SeatClassOption) => void;
  /** 自定义类名 */
  className?: string;
}
```

---

### 2. 工具函数 - 格式化 (`utils/formatters.ts`)

```typescript
/**
 * 格式化货币
 * @param amount 金额（CNY）
 * @returns 格式化后的字符串，如 "¥1,234"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * 获取航空公司首字母
 * @param name 航空公司名称
 * @returns 首字母缩写（最多2个字符）
 */
export function getAirlineInitials(name: string): string {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * 获取舱位类型显示名称
 * @param classType 舱位类型
 * @returns 中文名称
 */
export function getSeatClassName(
  classType: "ECONOMY" | "BUSINESS" | "FIRST"
): string {
  const names: Record<string, string> = {
    ECONOMY: "经济舱",
    BUSINESS: "商务舱",
    FIRST: "头等舱",
  };
  return names[classType] || classType;
}
```

---

### 3. 工具函数 - 辅助函数 (`utils/helpers.ts`)

```typescript
import type { SeatClassOption } from "../types";

/**
 * 判断是否为多舱位模式
 */
export function isMultiSeatClassMode(seatClasses?: SeatClassOption[]): boolean {
  return !!seatClasses && seatClasses.length > 1;
}

/**
 * 获取显示价格
 * 优先使用 lowestPrice，否则使用 price
 */
export function getDisplayPrice(price?: number, lowestPrice?: number): number {
  return lowestPrice ?? price ?? 0;
}

/**
 * 根据可用座位数获取提示文本
 */
export function getSeatsAvailabilityText(availableSeats: number): string {
  if (availableSeats === 0) {
    return "已售罄";
  }
  if (availableSeats <= 5) {
    return `仅剩 ${availableSeats} 座`;
  }
  return `剩余 ${availableSeats} 座`;
}
```

---

### 4. UI 子组件 - 航空公司信息 (`components/AirlineInfo.tsx`)

```typescript
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getAirlineInitials } from "../utils/formatters";

interface AirlineInfoProps {
  /** 航空公司 logo URL */
  logo?: string;
  /** 航空公司名称 */
  name: string;
  /** 航班号 */
  flightNumber: string;
  /** 机型 */
  aircraftType: string;
}

/**
 * 航空公司信息 - 纯 UI 组件
 *
 * 显示航空公司 logo、名称、航班号和机型
 */
export function AirlineInfo({
  logo,
  name,
  flightNumber,
  aircraftType,
}: AirlineInfoProps) {
  return (
    <div className="flex items-center gap-3 min-w-[180px]">
      {/* 航空公司 logo */}
      <Avatar className="h-12 w-12 shrink-0">
        <AvatarImage src={logo} alt={name} />
        <AvatarFallback className="text-xs font-semibold">
          {getAirlineInitials(name)}
        </AvatarFallback>
      </Avatar>

      {/* 航空公司名称和航班信息 */}
      <div className="flex flex-col gap-0.5">
        <div className="text-sm font-medium text-foreground leading-tight">
          {name}
        </div>
        <div className="text-xs text-muted-foreground leading-tight">
          {flightNumber} {aircraftType}
        </div>
      </div>
    </div>
  );
}
```

---

### 5. UI 子组件 - 航班行程 (`components/FlightItinerary.tsx`)

```typescript
import { ArrowRight } from "lucide-react";

interface FlightItineraryProps {
  /** 出发时间 (HH:mm) */
  departureTime: string;
  /** 出发机场 */
  departureAirport: string;
  /** 到达时间 (HH:mm) */
  arrivalTime: string;
  /** 到达机场 */
  arrivalAirport: string;
  /** 飞行时长 */
  duration: string;
  /** 跨天天数 */
  daysOffset?: number;
}

/**
 * 航班行程信息 - 纯 UI 组件
 *
 * 显示出发/到达时间、机场、飞行时长
 */
export function FlightItinerary({
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  duration,
  daysOffset,
}: FlightItineraryProps) {
  return (
    <div className="flex-1 flex items-center justify-center gap-8">
      {/* 出发信息 */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-2xl font-bold text-foreground leading-none">
          {departureTime}
        </div>
        <div className="text-sm text-muted-foreground leading-none">
          {departureAirport}
        </div>
      </div>

      {/* 箭头和时长 */}
      <div className="flex flex-col items-center justify-center gap-1 min-w-32">
        <div className="text-xs text-muted-foreground">{duration}</div>
        <div className="w-full flex items-center">
          <div className="flex-1 h-px bg-muted-foreground/30" />
          <ArrowRight className="h-4 w-4 text-muted-foreground mx-1" />
          <div className="flex-1 h-px bg-muted-foreground/30" />
        </div>
      </div>

      {/* 到达信息 */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-2xl font-bold text-foreground leading-none">
          {arrivalTime}
          {daysOffset && daysOffset > 0 && (
            <span className="text-sm text-primary ml-1.5 font-medium">
              +{daysOffset}
            </span>
          )}
        </div>
        <div className="text-sm text-muted-foreground leading-none">
          {arrivalAirport}
        </div>
      </div>
    </div>
  );
}
```

---

### 6. UI 子组件 - 价格区域 (`components/PriceSection.tsx`)

```typescript
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatCurrency } from "../utils/formatters";

interface PriceSectionProps {
  /** 显示的价格 */
  price: number;
  /** 是否为多舱位模式 */
  isMultiSeatClass: boolean;
  /** 是否展开 */
  isExpanded: boolean;
  /** 按钮文本 */
  buttonText: string;
  /** 按钮点击回调 */
  onButtonClick: () => void;
}

/**
 * 价格区域 - 纯 UI 组件
 *
 * 显示价格和操作按钮
 */
export function PriceSection({
  price,
  isMultiSeatClass,
  isExpanded,
  buttonText,
  onButtonClick,
}: PriceSectionProps) {
  return (
    <div className="flex items-center gap-4 ml-auto">
      {/* 价格显示 */}
      <div className="flex flex-col items-end">
        <div className="text-2xl font-bold text-secondary leading-none">
          {formatCurrency(price)}
          {isMultiSeatClass && (
            <span className="text-sm text-muted-foreground ml-1">起</span>
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <Button
        onClick={onButtonClick}
        variant="secondary"
        className="px-6 shrink-0"
      >
        {isMultiSeatClass ? (
          <>
            {isExpanded ? (
              <>
                收起 <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                订票 <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </>
        ) : (
          buttonText
        )}
      </Button>
    </div>
  );
}
```

---

### 7. UI 子组件 - 舱位行 (`components/SeatClassRow.tsx`)

```typescript
import { Button } from "@/components/ui/button";

import { formatCurrency, getSeatClassName } from "../utils/formatters";
import type { SeatClassOption } from "../types";

interface SeatClassRowProps {
  seatClass: SeatClassOption;
  buttonText: string;
  onButtonClick: (seatClass: SeatClassOption) => void;
}

/**
 * 舱位行 - 纯 UI 组件
 *
 * 显示单个舱位的信息和预订按钮
 */
export function SeatClassRow({
  seatClass,
  buttonText,
  onButtonClick,
}: SeatClassRowProps) {
  const isAvailable = seatClass.availableSeats > 0;

  return (
    <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
      {/* 左侧：舱位信息 */}
      <div className="flex items-center gap-4">
        <div className="font-medium">
          {getSeatClassName(seatClass.classType)}
        </div>
        <div className="text-sm text-muted-foreground">
          剩余 {seatClass.availableSeats} 座
        </div>
      </div>

      {/* 右侧：价格和按钮 */}
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-secondary">
          {formatCurrency(seatClass.price)}
        </div>
        <Button
          onClick={() => onButtonClick(seatClass)}
          variant="secondary"
          className="px-6"
          size="sm"
          disabled={!isAvailable}
        >
          {isAvailable ? buttonText : "已售罄"}
        </Button>
      </div>
    </div>
  );
}
```

---

### 8. UI 子组件 - 舱位列表 (`components/SeatClassList.tsx`)

```typescript
import { SeatClassRow } from "./SeatClassRow";
import type { SeatClassOption } from "../types";

interface SeatClassListProps {
  seatClasses: SeatClassOption[];
  buttonText: string;
  onSeatClassClick: (seatClass: SeatClassOption) => void;
}

/**
 * 舱位列表 - 纯 UI 组件
 *
 * 显示展开后的舱位选项列表
 */
export function SeatClassList({
  seatClasses,
  buttonText,
  onSeatClassClick,
}: SeatClassListProps) {
  return (
    <div className="mt-4 pt-4 border-t space-y-2">
      {seatClasses.map((seatClass) => (
        <SeatClassRow
          key={seatClass.id}
          seatClass={seatClass}
          buttonText={buttonText}
          onButtonClick={onSeatClassClick}
        />
      ))}
    </div>
  );
}
```

---

### 9. UI 主组件 - 航班卡片 (`components/FlightCardUI.tsx`)

```typescript
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { AirlineInfo } from "./AirlineInfo";
import { FlightItinerary } from "./FlightItinerary";
import { PriceSection } from "./PriceSection";
import { SeatClassList } from "./SeatClassList";
import type { FlightCardUIProps } from "../types";

/**
 * 航班卡片 - 纯 UI 组件
 *
 * 职责:
 * - 渲染卡片布局
 * - 组合各个子组件
 * - 转发用户交互事件
 *
 * 不包含:
 * - 状态管理
 * - 数据处理逻辑
 * - 格式化逻辑
 */
export function FlightCardUI({
  airlineLogo,
  airlineName,
  flightNumber,
  aircraftType,
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  daysOffset,
  duration,
  displayPrice,
  seatClasses,
  isExpanded,
  isMultiSeatClass,
  buttonText,
  onToggleExpand,
  onButtonClick,
  onSeatClassClick,
  className,
}: FlightCardUIProps) {
  // 确定按钮点击行为
  const handleButtonClick = () => {
    if (isMultiSeatClass) {
      onToggleExpand();
    } else {
      onButtonClick?.();
    }
  };

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-shadow w-full max-w-8xl",
        className
      )}
    >
      <CardContent className="py-2">
        {/* 主航班信息行 */}
        <div className="flex items-center gap-6">
          {/* 航空公司信息 */}
          <AirlineInfo
            logo={airlineLogo}
            name={airlineName}
            flightNumber={flightNumber}
            aircraftType={aircraftType}
          />

          {/* 航班行程信息 */}
          <FlightItinerary
            departureTime={departureTime}
            departureAirport={departureAirport}
            arrivalTime={arrivalTime}
            arrivalAirport={arrivalAirport}
            duration={duration}
            daysOffset={daysOffset}
          />

          {/* 价格和操作 */}
          <PriceSection
            price={displayPrice}
            isMultiSeatClass={isMultiSeatClass}
            isExpanded={isExpanded}
            buttonText={buttonText}
            onButtonClick={handleButtonClick}
          />
        </div>

        {/* 展开的舱位列表 */}
        {isMultiSeatClass && isExpanded && seatClasses && onSeatClassClick && (
          <SeatClassList
            seatClasses={seatClasses}
            buttonText={buttonText}
            onSeatClassClick={onSeatClassClick}
          />
        )}
      </CardContent>
    </Card>
  );
}
```

---

### 10. Custom Hook - 展开/收起逻辑 (`hooks/useFlightCardExpand.ts`)

```typescript
import { useState } from "react";

/**
 * 航班卡片展开/收起逻辑 Hook
 *
 * 职责:
 * - 管理展开状态
 * - 提供切换方法
 */
export function useFlightCardExpand(initialExpanded = false) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const expand = () => {
    setIsExpanded(true);
  };

  const collapse = () => {
    setIsExpanded(false);
  };

  return {
    isExpanded,
    toggleExpand,
    expand,
    collapse,
  };
}
```

---

### 11. Custom Hook - 航班卡片逻辑 (`hooks/useFlightCard.ts`)

```typescript
import type { FlightCardData, SeatClassOption } from "../types";
import { isMultiSeatClassMode, getDisplayPrice } from "../utils/helpers";

interface UseFlightCardProps extends FlightCardData {
  buttonText?: string;
  onButtonClick?: () => void;
  onSeatClassClick?: (seatClass: SeatClassOption) => void;
}

/**
 * 航班卡片逻辑 Hook
 *
 * 职责:
 * - 计算派生状态（是否多舱位、显示价格）
 * - 提供格式化后的数据
 * - 封装回调函数
 */
export function useFlightCard({
  price,
  lowestPrice,
  seatClasses,
  buttonText = "预订",
  onButtonClick,
  onSeatClassClick,
}: UseFlightCardProps) {
  // 判断是否为多舱位模式
  const isMultiSeatClass = isMultiSeatClassMode(seatClasses);

  // 计算显示价格
  const displayPrice = getDisplayPrice(price, lowestPrice);

  // 验证是否提供了必要的回调
  const hasValidCallbacks = isMultiSeatClass
    ? !!onSeatClassClick
    : !!onButtonClick;

  return {
    isMultiSeatClass,
    displayPrice,
    buttonText,
    hasValidCallbacks,
    onButtonClick,
    onSeatClassClick,
  };
}
```

---

### 12. 容器组件 - 航班卡片 (`FlightCard.tsx`)

```typescript
"use client";

import { FlightCardUI } from "./components/FlightCardUI";
import { useFlightCard } from "./hooks/useFlightCard";
import { useFlightCardExpand } from "./hooks/useFlightCardExpand";
import type { FlightCardProps } from "./types";

/**
 * 航班卡片 - 容器组件
 *
 * 职责:
 * - 组合 UI 组件和逻辑 Hooks
 * - 管理展开/收起状态
 * - 传递数据到 UI 组件
 *
 * 不包含:
 * - UI 渲染（由 FlightCardUI 处理）
 * - 数据格式化（由 utils 处理）
 * - 复杂计算（由 hooks 处理）
 */
export function FlightCard({
  airlineLogo,
  airlineName,
  flightNumber,
  aircraftType,
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  daysOffset,
  duration,
  price,
  seatClasses,
  lowestPrice,
  buttonText,
  onButtonClick,
  onSeatClassClick,
  className,
}: FlightCardProps) {
  // 航班卡片逻辑
  const flightCard = useFlightCard({
    price,
    lowestPrice,
    seatClasses,
    buttonText,
    onButtonClick,
    onSeatClassClick,
  });

  // 展开/收起逻辑
  const { isExpanded, toggleExpand } = useFlightCardExpand();

  return (
    <FlightCardUI
      airlineLogo={airlineLogo}
      airlineName={airlineName}
      flightNumber={flightNumber}
      aircraftType={aircraftType}
      departureTime={departureTime}
      departureAirport={departureAirport}
      arrivalTime={arrivalTime}
      arrivalAirport={arrivalAirport}
      daysOffset={daysOffset}
      duration={duration}
      seatClasses={seatClasses}
      displayPrice={flightCard.displayPrice}
      isMultiSeatClass={flightCard.isMultiSeatClass}
      isExpanded={isExpanded}
      buttonText={flightCard.buttonText}
      onToggleExpand={toggleExpand}
      onButtonClick={flightCard.onButtonClick}
      onSeatClassClick={flightCard.onSeatClassClick}
      className={className}
    />
  );
}
```

---

### 13. 导出入口 (`index.tsx`)

```typescript
export { FlightCard } from "./FlightCard";
export type { FlightCardProps, FlightCardData, SeatClassOption } from "./types";

// 可选：导出子组件供其他地方复用
export { FlightCardUI } from "./components/FlightCardUI";
export { AirlineInfo } from "./components/AirlineInfo";
export { FlightItinerary } from "./components/FlightItinerary";
export { PriceSection } from "./components/PriceSection";
export { SeatClassList } from "./components/SeatClassList";
export { SeatClassRow } from "./components/SeatClassRow";

// 可选：导出 hooks
export { useFlightCard } from "./hooks/useFlightCard";
export { useFlightCardExpand } from "./hooks/useFlightCardExpand";

// 可选：导出工具函数
export * from "./utils/formatters";
export * from "./utils/helpers";
```

---

## 📊 拆分前后对比

### 代码行数

| 项目       | 拆分前 | 拆分后       |
| ---------- | ------ | ------------ |
| 单文件行数 | 259 行 | 最大 ~100 行 |
| 文件数量   | 1 个   | 14 个        |
| 可复用组件 | 0 个   | 6+ 个        |

### 职责分离

| 关注点     | 拆分前          | 拆分后                   |
| ---------- | --------------- | ------------------------ |
| UI 渲染    | ❌ 混合在一起   | ✅ 6 个独立 UI 组件      |
| 状态管理   | ❌ 混合在组件中 | ✅ useFlightCardExpand   |
| 数据处理   | ❌ 混合在组件中 | ✅ useFlightCard + utils |
| 格式化逻辑 | ❌ 内部函数     | ✅ formatters.ts         |
| 辅助函数   | ❌ 内部函数     | ✅ helpers.ts            |

### 组件粒度

| 层级      | 拆分前        | 拆分后               |
| --------- | ------------- | -------------------- |
| 顶层组件  | 1 个（259行） | 1 个（~60行）        |
| UI 子组件 | 0 个          | 6 个（各 ~30-60 行） |
| 工具函数  | 3 个（内部）  | 8+ 个（独立文件）    |

---

## ✅ 拆分后的优势

### 1. **组件粒度更细** 🧩

**拆分前**:

```typescript
// 一个大组件包含所有逻辑
export function FlightCard({ ... }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAirlineInitials = (name: string) => { ... }
  const getSeatClassName = (classType: string) => { ... }

  return (
    <Card>
      {/* 200+ 行 JSX */}
    </Card>
  );
}
```

**拆分后**:

```typescript
// 容器组件：简洁清晰
export function FlightCard(props: FlightCardProps) {
  const flightCard = useFlightCard(props);
  const { isExpanded, toggleExpand } = useFlightCardExpand();

  return <FlightCardUI {...props} {...flightCard} {...expand} />;
}

// UI 组件：组合子组件
export function FlightCardUI(props: FlightCardUIProps) {
  return (
    <Card>
      <AirlineInfo {...} />
      <FlightItinerary {...} />
      <PriceSection {...} />
      {isExpanded && <SeatClassList {...} />}
    </Card>
  );
}
```

### 2. **子组件高度复用** ♻️

```typescript
// 在其他地方单独使用航空公司信息
import { AirlineInfo } from "@/components/flights/results/flight-card";

function FlightDetailPage({ flight }) {
  return (
    <div>
      <AirlineInfo
        logo={flight.airlineLogo}
        name={flight.airlineName}
        flightNumber={flight.flightNumber}
        aircraftType={flight.aircraftType}
      />
      {/* 其他内容 */}
    </div>
  );
}

// 在订单页面复用航班行程信息
import { FlightItinerary } from "@/components/flights/results/flight-card";

function OrderSummary({ order }) {
  return (
    <div>
      <h2>您的行程</h2>
      <FlightItinerary
        departureTime={order.departureTime}
        departureAirport={order.departureAirport}
        arrivalTime={order.arrivalTime}
        arrivalAirport={order.arrivalAirport}
        duration={order.duration}
        daysOffset={order.daysOffset}
      />
    </div>
  );
}

// 在搜索历史中复用价格区域
import { PriceSection } from "@/components/flights/results/flight-card";

function SearchHistoryItem({ history }) {
  return (
    <div>
      <span>{history.route}</span>
      <PriceSection
        price={history.price}
        isMultiSeatClass={false}
        isExpanded={false}
        buttonText="查看"
        onButtonClick={() => viewHistory(history)}
      />
    </div>
  );
}
```

### 3. **工具函数独立测试** 📝

```typescript
// 可以独立测试格式化函数
describe("formatters", () => {
  describe("formatCurrency", () => {
    it("formats price correctly", () => {
      expect(formatCurrency(1234)).toBe("¥1,234");
      expect(formatCurrency(1234.56)).toBe("¥1,235");
    });
  });

  describe("getAirlineInitials", () => {
    it("extracts initials correctly", () => {
      expect(getAirlineInitials("China Eastern")).toBe("CE");
      expect(getAirlineInitials("Air China")).toBe("AC");
      expect(getAirlineInitials("中国国际航空")).toBe("中国");
    });
  });

  describe("getSeatClassName", () => {
    it("maps class types correctly", () => {
      expect(getSeatClassName("ECONOMY")).toBe("经济舱");
      expect(getSeatClassName("BUSINESS")).toBe("商务舱");
      expect(getSeatClassName("FIRST")).toBe("头等舱");
    });
  });
});

// 可以独立测试辅助函数
describe("helpers", () => {
  describe("isMultiSeatClassMode", () => {
    it("returns true for multiple seat classes", () => {
      const seatClasses = [
        { id: "1", classType: "ECONOMY", /* ... */ },
        { id: "2", classType: "BUSINESS", /* ... */ },
      ];
      expect(isMultiSeatClassMode(seatClasses)).toBe(true);
    });

    it("returns false for single seat class", () => {
      const seatClasses = [
        { id: "1", classType: "ECONOMY", /* ... */ },
      ];
      expect(isMultiSeatClassMode(seatClasses)).toBe(false);
    });
  });
});

// 可以独立测试 UI 组件
describe("AirlineInfo", () => {
  it("renders airline info correctly", () => {
    const { getByText } = render(
      <AirlineInfo
        logo="https://example.com/logo.png"
        name="China Eastern"
        flightNumber="MU5137"
        aircraftType="A320"
      />
    );

    expect(getByText("China Eastern")).toBeInTheDocument();
    expect(getByText("MU5137 A320")).toBeInTheDocument();
  });

  it("shows initials when logo fails to load", () => {
    const { getByText } = render(
      <AirlineInfo
        name="China Eastern"
        flightNumber="MU5137"
        aircraftType="A320"
      />
    );

    expect(getByText("CE")).toBeInTheDocument();
  });
});

// 可以独立测试 Hook
describe("useFlightCardExpand", () => {
  it("toggles expand state", () => {
    const { result } = renderHook(() => useFlightCardExpand());

    expect(result.current.isExpanded).toBe(false);

    act(() => {
      result.current.toggleExpand();
    });

    expect(result.current.isExpanded).toBe(true);
  });
});
```

### 4. **性能优化空间** ⚡

```typescript
// 可以对纯 UI 组件使用 React.memo
export const AirlineInfo = React.memo(function AirlineInfo(props) {
  // ... 只在 props 变化时重新渲染
});

export const FlightItinerary = React.memo(function FlightItinerary(props) {
  // ... 只在 props 变化时重新渲染
});

export const SeatClassRow = React.memo(function SeatClassRow(props) {
  // ... 避免列表中不必要的渲染
});

// 工具函数可以缓存
import { memoize } from "lodash";

export const formatCurrency = memoize((amount: number) => {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
  }).format(amount);
});
```

### 5. **Storybook 友好** 📖

```typescript
// AirlineInfo.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { AirlineInfo } from "./AirlineInfo";

const meta: Meta<typeof AirlineInfo> = {
  component: AirlineInfo,
  title: "Flights/Results/AirlineInfo",
};

export default meta;
type Story = StoryObj<typeof AirlineInfo>;

export const Default: Story = {
  args: {
    logo: "https://example.com/logo.png",
    name: "China Eastern",
    flightNumber: "MU5137",
    aircraftType: "A320",
  },
};

export const WithoutLogo: Story = {
  args: {
    name: "China Eastern",
    flightNumber: "MU5137",
    aircraftType: "A320",
  },
};

// FlightItinerary.stories.tsx
export const Domestic: Story = {
  args: {
    departureTime: "08:00",
    departureAirport: "PVG",
    arrivalTime: "10:55",
    arrivalAirport: "PEK",
    duration: "2h 55m",
  },
};

export const WithDaysOffset: Story = {
  args: {
    departureTime: "23:00",
    departureAirport: "PVG",
    arrivalTime: "06:30",
    arrivalAirport: "LAX",
    duration: "12h 30m",
    daysOffset: 1,
  },
};
```

### 6. **易于扩展和维护** 🔧

```typescript
// 新增航班状态指示器，只需添加新的子组件
export function FlightStatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("badge", getStatusColor(status))}>
      {status}
    </span>
  );
}

// 在 FlightCardUI 中轻松集成
export function FlightCardUI(props: FlightCardUIProps) {
  return (
    <Card>
      <AirlineInfo {...} />
      <FlightStatusBadge status={props.status} /> {/* 新增 */}
      <FlightItinerary {...} />
      <PriceSection {...} />
    </Card>
  );
}

// 新增不同的价格展示模式
export function PremiumPriceSection(props: PriceSectionProps) {
  return (
    <div className="premium-price-section">
      {/* 特殊样式的价格展示 */}
    </div>
  );
}

// 容易创建变体
export function CompactFlightCard(props: FlightCardProps) {
  return (
    <Card className="compact">
      <div className="flex gap-2">
        <AirlineInfo {...} />
        <FlightItinerary {...} />
        <PriceSection {...} />
      </div>
    </Card>
  );
}
```

---

## 🎯 使用示例

### 基本使用 - 单价格模式

```typescript
import { FlightCard } from "@/components/flights/results/flight-card";

export function FlightListItem({ flight }) {
  const handleBook = () => {
    router.push(`/flights/booking?flightId=${flight.id}`);
  };

  return (
    <FlightCard
      airlineLogo={flight.airlineLogo}
      airlineName={flight.airlineName}
      flightNumber={flight.flightNumber}
      aircraftType={flight.aircraftType}
      departureTime={flight.departureTime}
      departureAirport={flight.departureAirport}
      arrivalTime={flight.arrivalTime}
      arrivalAirport={flight.arrivalAirport}
      duration={flight.duration}
      price={flight.price}
      buttonText="预订"
      onButtonClick={handleBook}
    />
  );
}
```

### 多舱位模式

```typescript
export function FlightListItemWithSeatClasses({ flight }) {
  const handleSeatClassSelect = (seatClass) => {
    router.push(`/flights/booking?flightId=${flight.id}&classId=${seatClass.id}`);
  };

  return (
    <FlightCard
      {...flight}
      seatClasses={flight.seatClasses}
      lowestPrice={Math.min(...flight.seatClasses.map(sc => sc.price))}
      buttonText="选择"
      onSeatClassClick={handleSeatClassSelect}
    />
  );
}
```

### 单独使用子组件构建自定义布局

```typescript
import {
  AirlineInfo,
  FlightItinerary,
  formatCurrency,
} from "@/components/flights/results/flight-card";

export function MobileFlightCard({ flight }) {
  return (
    <div className="mobile-flight-card">
      {/* 竖向布局 */}
      <AirlineInfo {...flight} />

      <div className="my-4">
        <FlightItinerary {...flight} />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-secondary">
          {formatCurrency(flight.price)}
        </span>
        <Button onClick={() => book(flight)}>
          立即预订
        </Button>
      </div>
    </div>
  );
}
```

### 自定义价格展示

```typescript
import { FlightCard } from "@/components/flights/results/flight-card";

// 显示会员价
export function MemberFlightCard({ flight, memberDiscount }) {
  const memberPrice = flight.price * (1 - memberDiscount);

  return (
    <div className="relative">
      <FlightCard {...flight} price={memberPrice} />
      {memberDiscount > 0 && (
        <div className="absolute top-2 right-2">
          <span className="badge-member">
            会员优惠 {(memberDiscount * 100).toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
}
```
