/**
 * JSDoc custom tag for linking test cases to requirements.
 *
 * Usage in test files:
 * ```typescript
 * /**
 *  * Test for phone OTP registration
 *  * @requirement REQ-U01
 *  * @scenario 场景1
 *  *\/
 * test('should complete two-step registration', async () => {
 *   // test implementation
 * });
 * ```
 *
 * Supported tags:
 * - @requirement {string} - The requirement ID (e.g., REQ-U01, REQ-F05)
 * - @scenario {string} - The scenario ID within the requirement (e.g., 场景1, 场景2)
 */
export type RequirementTag = string;

/**
 * Extract requirement tags from a test file
 */
export function extractRequirementTags(fileContent: string): {
  requirementId: string;
  scenarioId?: string;
  line: number;
}[] {
  // Implementation for extracting @requirement tags
  const regex = /@requirement\s+(\S+)/g;
  const matches = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(fileContent)) !== null) {
    matches.push({
      requirementId: match[1],
      line: fileContent.substring(0, match.index).split("\n").length,
    });
  }

  return matches;
}

/**
 * Extract scenario tags from a test file
 */
export function extractScenarioTags(fileContent: string): {
  scenarioId: string;
  line: number;
}[] {
  const regex = /@scenario\s+([^\n]+)/g;
  const matches = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(fileContent)) !== null) {
    matches.push({
      scenarioId: match[1].trim(),
      line: fileContent.substring(0, match.index).split("\n").length,
    });
  }

  return matches;
}
