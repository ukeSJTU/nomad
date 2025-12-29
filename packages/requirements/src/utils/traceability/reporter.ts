import chalk from "chalk";
import Table from "cli-table3";
import type { CoverageStatistics, ValidationError } from "./types";

/**
 * Generate table format report
 */
export function generateTableReport(
  stats: CoverageStatistics,
  validationErrors: ValidationError[]
): string {
  const output: string[] = [];

  // Show validation errors if any
  if (validationErrors.length > 0) {
    output.push("\n");
    output.push(
      chalk.red.bold(`Validation Errors (${validationErrors.length}):`)
    );
    output.push("\n");

    for (const error of validationErrors) {
      output.push(`  ${error.filePath}:${error.line}`);
      output.push(`    ${chalk.red("[ERROR]")} ${error.message}`);
      output.push("\n");
    }
  }

  // Title
  output.push("\n");
  output.push(
    chalk.bold("Test Coverage Report - Acceptance Criteria & Requirements")
  );
  output.push("\n");

  // Summary table
  output.push(chalk.bold.blue("\nCoverage Summary"));
  const summaryTable = new Table({
    head: ["Metric", "Total", "Covered", "Coverage %"].map(h => chalk.cyan(h)),
  });
  summaryTable.push(
    [
      "Requirements",
      stats.totalRequirements,
      stats.coveredRequirements,
      `${stats.requirementCoverage}%`,
    ],
    [
      "Scenarios",
      stats.totalScenarios,
      stats.coveredScenarios,
      `${stats.scenarioCoverage}%`,
    ]
  );
  output.push(summaryTable.toString());

  // Module stats
  output.push(chalk.bold.blue("\nCoverage by Module"));
  const moduleTable = new Table({
    head: ["Module", "Name", "Total", "Covered", "Coverage %"].map(h =>
      chalk.cyan(h)
    ),
  });
  for (const mod of stats.moduleStats) {
    moduleTable.push([
      mod.module,
      mod.name,
      mod.totalRequirements,
      mod.coveredRequirements,
      `${mod.coverage}%`,
    ]);
  }
  output.push(moduleTable.toString());

  // Uncovered requirements
  const uncoveredReqsToShow = stats.uncoveredRequirements.slice(0, 20);
  output.push(
    chalk.bold.yellow(
      `\nUncovered Requirements (${stats.uncoveredRequirements.length})`
    )
  );
  const uncoveredReqTable = new Table({
    head: ["ID", "Name", "Module", "Priority"].map(h => chalk.cyan(h)),
  });
  for (const req of uncoveredReqsToShow) {
    uncoveredReqTable.push([req.id, req.name, req.module, req.priority]);
  }
  output.push(uncoveredReqTable.toString());
  if (stats.uncoveredRequirements.length > 20) {
    output.push(`\n  ... and ${stats.uncoveredRequirements.length - 20} more`);
  }

  // Uncovered scenarios
  const uncoveredScenariosToShow = stats.uncoveredScenarios.slice(0, 20);
  output.push(
    chalk.bold.yellow(
      `\nUncovered Scenarios (${stats.uncoveredScenarios.length})`
    )
  );
  const uncoveredScenarioTable = new Table({
    head: ["Scenario", "Req ID", "Title"].map(h => chalk.cyan(h)),
  });
  for (const scenario of uncoveredScenariosToShow) {
    uncoveredScenarioTable.push([
      scenario.scenarioId,
      scenario.requirementId,
      scenario.title,
    ]);
  }
  output.push(uncoveredScenarioTable.toString());
  if (stats.uncoveredScenarios.length > 20) {
    output.push(`\n  ... and ${stats.uncoveredScenarios.length - 20} more`);
  }

  // Test distribution (top 10)
  const topDistribution = stats.testDistribution.slice(0, 10);
  output.push(chalk.bold.green("\nTest Distribution per Scenario (Top 10)"));
  const distributionTable = new Table({
    head: ["Scenario", "Req ID", "Title", "Test Count"].map(h => chalk.cyan(h)),
  });
  for (const dist of topDistribution) {
    distributionTable.push([
      dist.scenarioId,
      dist.requirementId,
      dist.title,
      dist.testCount,
    ]);
  }
  output.push(distributionTable.toString());

  output.push("\n");
  return output.join("\n");
}

/**
 * Generate JSON format report
 */
export function generateJsonReport(
  stats: CoverageStatistics,
  validationErrors: ValidationError[]
): string {
  return JSON.stringify(
    {
      validationErrors,
      statistics: stats,
    },
    null,
    2
  );
}
