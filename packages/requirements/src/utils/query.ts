import type { ModuleDefinition, Requirement } from "../data/types";

/**
 * 根据ID查询需求
 */
export function getRequirementById(
  modules: ModuleDefinition[],
  id: string
): Requirement | undefined {
  for (const module of modules) {
    const requirement = module.requirements.find(req => req.id === id);
    if (requirement) {
      return requirement;
    }
  }
  return undefined;
}

/**
 * 根据名称搜索需求（模糊匹配）
 */
export function searchRequirementsByName(
  modules: ModuleDefinition[],
  query: string
): Requirement[] {
  const results: Requirement[] = [];
  const lowerQuery = query.toLowerCase();

  for (const module of modules) {
    for (const req of module.requirements) {
      if (
        req.name.toLowerCase().includes(lowerQuery) ||
        req.overview.toLowerCase().includes(lowerQuery)
      ) {
        results.push(req);
      }
    }
  }

  return results;
}

/**
 * 获取所有需求的平铺列表
 */
export function getAllRequirements(modules: ModuleDefinition[]): Requirement[] {
  const requirements: Requirement[] = [];

  for (const module of modules) {
    requirements.push(...module.requirements);
  }

  return requirements;
}
