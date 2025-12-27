import type { ModuleDefinition, Priority, Requirement } from "../data/types";

export interface RequirementStats {
  totalRequirements: number;
  totalUserStories: number;
  totalAcceptanceCriteria: number;
  byModule: {
    [key: string]: {
      count: number;
      userStories: number;
      scenarios: number;
    };
  };
  byPriority: {
    "Must Have": number;
    "Should Have": number;
    "Could Have": number;
    "Won't Have": number;
  };
}

/**
 * 获取需求统计信息
 */
export function getRequirementStats(
  modules: ModuleDefinition[]
): RequirementStats {
  const stats: RequirementStats = {
    totalRequirements: 0,
    totalUserStories: 0,
    totalAcceptanceCriteria: 0,
    byModule: {},
    byPriority: {
      "Must Have": 0,
      "Should Have": 0,
      "Could Have": 0,
      "Won't Have": 0,
    },
  };

  for (const module of modules) {
    stats.totalRequirements += module.requirements.length;

    let moduleUserStories = 0;
    let moduleScenarios = 0;

    for (const req of module.requirements) {
      moduleUserStories += req.userStories.length;
      moduleScenarios += req.acceptanceCriteria.length;
      stats.totalUserStories += req.userStories.length;
      stats.totalAcceptanceCriteria += req.acceptanceCriteria.length;
      stats.byPriority[req.priority]++;
    }

    stats.byModule[module.id] = {
      count: module.requirements.length,
      userStories: moduleUserStories,
      scenarios: moduleScenarios,
    };
  }

  return stats;
}

/**
 * 获取指定优先级的需求列表
 */
export function getRequirementsByPriority(
  modules: ModuleDefinition[],
  priority: Priority
): Requirement[] {
  const requirements: Requirement[] = [];

  for (const module of modules) {
    for (const req of module.requirements) {
      if (req.priority === priority) {
        requirements.push(req);
      }
    }
  }

  return requirements;
}

/**
 * 获取指定模块的需求列表
 */
export function getRequirementsByModule(
  modules: ModuleDefinition[],
  moduleId: string
): Requirement[] {
  const module = modules.find(m => m.id === moduleId);
  return module ? module.requirements : [];
}
