import type { ModuleDefinition } from "../../data/types";
import { getAllRequirements } from "../query";
import type { CoverageMapping, CoverageStatistics } from "./types";

/**
 * Calculate coverage statistics
 */
export function calculateCoverageStatistics(
  mapping: CoverageMapping,
  modules: ModuleDefinition[]
): CoverageStatistics {
  const allRequirements = getAllRequirements(modules);

  // Calculate requirement coverage
  const coveredRequirements = new Set<string>();
  for (const reqId of mapping.requirementToTests.keys()) {
    coveredRequirements.add(reqId);
  }

  // Calculate scenario coverage
  const allScenarios: Array<{
    reqId: string;
    scenarioId: string;
    title: string;
  }> = [];
  for (const req of allRequirements) {
    for (const ac of req.acceptanceCriteria) {
      allScenarios.push({
        reqId: req.id,
        scenarioId: ac.id,
        title: ac.title,
      });
    }
  }

  const coveredScenarios = new Set<string>();
  for (const key of mapping.scenarioToTests.keys()) {
    coveredScenarios.add(key);
  }

  // Calculate uncovered requirements
  const uncoveredRequirements = allRequirements
    .filter(req => !coveredRequirements.has(req.id))
    .map(req => ({
      id: req.id,
      name: req.name,
      module: req.module,
      priority: req.priority,
    }));

  // Calculate uncovered scenarios
  const uncoveredScenarios = allScenarios
    .filter(
      scenario =>
        !coveredScenarios.has(`${scenario.reqId}:${scenario.scenarioId}`)
    )
    .map(scenario => ({
      scenarioId: scenario.scenarioId,
      requirementId: scenario.reqId,
      title: scenario.title,
    }));

  // Calculate test distribution per scenario
  const testDistribution = Array.from(mapping.scenarioToTests.entries())
    .map(([key, tests]) => {
      const [reqId, scenarioId] = key.split(":");
      const scenario = allScenarios.find(
        s => s.reqId === reqId && s.scenarioId === scenarioId
      );
      return {
        scenarioId,
        requirementId: reqId,
        title: scenario?.title || "Unknown",
        testCount: tests.length,
      };
    })
    .sort((a, b) => b.testCount - a.testCount);

  // Calculate module stats
  const moduleStats = modules.map(module => {
    const moduleReqs = module.requirements;
    const coveredCount = moduleReqs.filter(req =>
      coveredRequirements.has(req.id)
    ).length;
    return {
      module: module.id,
      name: module.name,
      totalRequirements: moduleReqs.length,
      coveredRequirements: coveredCount,
      coverage:
        moduleReqs.length > 0
          ? Math.round((coveredCount / moduleReqs.length) * 1000) / 10
          : 0,
    };
  });

  return {
    totalRequirements: allRequirements.length,
    coveredRequirements: coveredRequirements.size,
    requirementCoverage:
      allRequirements.length > 0
        ? Math.round(
            (coveredRequirements.size / allRequirements.length) * 1000
          ) / 10
        : 0,
    totalScenarios: allScenarios.length,
    coveredScenarios: coveredScenarios.size,
    scenarioCoverage:
      allScenarios.length > 0
        ? Math.round((coveredScenarios.size / allScenarios.length) * 1000) / 10
        : 0,
    uncoveredRequirements,
    uncoveredScenarios,
    testDistribution,
    moduleStats,
  };
}
