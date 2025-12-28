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
 * 验收标准中的单个步骤
 */
export interface AcceptanceStep {
  /** 步骤类型 */
  type: "given" | "when" | "then" | "and" | "but";
  /** 步骤描述 */
  description: string;
}

/**
 * 验收标准（场景）
 * 支持灵活的步骤定义，可以处理复杂的多步骤操作流程
 */
export interface AcceptanceCriteria {
  /** 场景ID，如 "场景1", "场景2" */
  id: string;
  /** 场景标题 */
  title: string;
  /** 场景描述（可选，用于复杂场景的总体说明） */
  description?: string;
  /** 步骤列表 - 按顺序执行的验收步骤 */
  steps: AcceptanceStep[];
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
  /** 补充说明（用于记录技术细节、UI/UX要求、业务规则等） */
  notes?: string;
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
