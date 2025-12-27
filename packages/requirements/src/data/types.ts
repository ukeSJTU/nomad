/**
 * MoSCoW 优先级
 */
export type Priority =
  | "Must Have"
  | "Should Have"
  | "Could Have"
  | "Won't Have";

/**
 * 需求模块
 */
export type Module = "user" | "flight" | "order" | "payment" | "ui-ux";

/**
 * 用户故事
 */
export interface UserStory {
  /** 用户故事ID，如 US-01, US-02 */
  id: string;
  /** 用户故事内容 */
  content: string;
}

/**
 * 验收标准（场景）
 */
export interface AcceptanceCriteria {
  /** 场景ID，如 "场景1", "场景2" */
  id: string;
  /** 场景标题 */
  title: string;
  /** Given 条件 */
  given?: string[];
  /** When 操作 */
  when?: string[];
  /** Then 期望结果 */
  then?: string[];
  /** And 附加条件 */
  and?: string[];
}

/**
 * UI/UX 注释
 */
export interface UIUXNotes {
  /** 所需UI元素列表 */
  elements?: string[];
  /** 关键交互说明 */
  interactions?: string[];
  /** 页面布局描述 */
  layout?: string;
}

/**
 * 需求定义
 */
export interface Requirement {
  /** 需求ID，如 REQ-U01, REQ-F01 */
  id: string;
  /** 所属模块 */
  module: Module;
  /** 需求名称 */
  name: string;
  /** 功能概述 */
  overview: string;
  /** 优先级 */
  priority: Priority;
  /** 用户故事列表 */
  userStories: UserStory[];
  /** 验收标准列表 */
  acceptanceCriteria: AcceptanceCriteria[];
  /** UI/UX注释 */
  uiNotes?: UIUXNotes;
  /** 相关需求ID列表 */
  relatedRequirements?: string[];
}

/**
 * 模块定义
 */
export interface ModuleDefinition {
  /** 模块ID */
  id: Module;
  /** 模块名称 */
  name: string;
  /** 模块描述 */
  description: string;
  /** 模块图标 */
  icon?: string;
  /** 需求列表 */
  requirements: Requirement[];
}
