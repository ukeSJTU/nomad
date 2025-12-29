import type { ModuleDefinition } from "../../data/types";
import { getRequirementById } from "../query";
import type { ParsedTestFile, ValidationError } from "./types";

/**
 * Validate that all requirement/scenario IDs referenced in tests exist
 */
export function validateTestTags(
  parsedFiles: ParsedTestFile[],
  modules: ModuleDefinition[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const file of parsedFiles) {
    for (const test of file.tests) {
      const { finalTags, filePath, line } = test;

      // Validate requirement IDs
      for (const reqId of finalTags.requirements) {
        const requirement = getRequirementById(modules, reqId);
        if (!requirement) {
          errors.push({
            filePath,
            line,
            type: "requirement",
            id: reqId,
            message: `Invalid requirement: ${reqId} not found`,
          });
          continue;
        }

        // Validate scenario IDs for this requirement
        for (const scenarioId of finalTags.scenarios) {
          const scenario = requirement.acceptanceCriteria.find(
            ac => ac.id === scenarioId
          );
          if (!scenario) {
            errors.push({
              filePath,
              line,
              type: "scenario",
              id: scenarioId,
              message: `Invalid scenario: ${scenarioId} not found in ${reqId}`,
            });
          }
        }
      }
    }
  }

  return errors;
}
