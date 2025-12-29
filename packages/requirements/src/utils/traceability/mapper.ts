import type { CoverageMapping, ParsedTestFile, TestReference } from "./types";

/**
 * Build coverage mapping from parsed test files
 */
export function buildCoverageMapping(
  parsedFiles: ParsedTestFile[]
): CoverageMapping {
  const requirementToTests = new Map<string, TestReference[]>();
  const scenarioToTests = new Map<string, TestReference[]>();
  const userStoryToTests = new Map<string, TestReference[]>();

  for (const file of parsedFiles) {
    for (const test of file.tests) {
      const { finalTags, name, filePath, line } = test;

      const testRef: TestReference = {
        testName: name,
        filePath,
        line,
      };

      // Map requirements
      for (const reqId of finalTags.requirements) {
        if (!requirementToTests.has(reqId)) {
          requirementToTests.set(reqId, []);
        }
        requirementToTests.get(reqId)!.push(testRef);
      }

      // Map scenarios (need to combine with requirement ID)
      for (const reqId of finalTags.requirements) {
        for (const scenarioId of finalTags.scenarios) {
          const key = `${reqId}:${scenarioId}`;
          if (!scenarioToTests.has(key)) {
            scenarioToTests.set(key, []);
          }
          scenarioToTests.get(key)!.push(testRef);
        }
      }

      // Map user stories
      for (const storyId of finalTags.userStories) {
        if (!userStoryToTests.has(storyId)) {
          userStoryToTests.set(storyId, []);
        }
        userStoryToTests.get(storyId)!.push(testRef);
      }
    }
  }

  return {
    requirementToTests,
    scenarioToTests,
    userStoryToTests,
  };
}
