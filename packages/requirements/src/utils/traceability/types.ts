/**
 * JSDoc标签集合
 */
export interface TestTag {
  requirements: string[];
  scenarios: string[];
  userStories: string[];
}

/**
 * 测试节点（文件、describe块、test块）
 */
export interface TestNode {
  type: "file" | "describe" | "test";
  name: string;
  filePath: string;
  line: number;
  tags: TestTag;
  inheritedTags?: TestTag;
  finalTags: TestTag;
  children?: TestNode[];
}

/**
 * 解析后的测试文件
 */
export interface ParsedTestFile {
  filePath: string;
  fileNode: TestNode;
  tests: TestNode[];
}

/**
 * 测试引用信息
 */
export interface TestReference {
  testName: string;
  filePath: string;
  line: number;
}

/**
 * 覆盖率映射
 */
export interface CoverageMapping {
  requirementToTests: Map<string, TestReference[]>;
  scenarioToTests: Map<string, TestReference[]>;
  userStoryToTests: Map<string, TestReference[]>;
}

/**
 * 验证错误
 */
export interface ValidationError {
  filePath: string;
  line: number;
  type: "requirement" | "scenario" | "userStory";
  id: string;
  message: string;
}

/**
 * 覆盖率统计
 */
export interface CoverageStatistics {
  totalRequirements: number;
  coveredRequirements: number;
  requirementCoverage: number;
  totalScenarios: number;
  coveredScenarios: number;
  scenarioCoverage: number;
  uncoveredRequirements: Array<{
    id: string;
    name: string;
    module: string;
    priority: string;
  }>;
  uncoveredScenarios: Array<{
    scenarioId: string;
    requirementId: string;
    title: string;
  }>;
  testDistribution: Array<{
    scenarioId: string;
    requirementId: string;
    title: string;
    testCount: number;
  }>;
  moduleStats: Array<{
    module: string;
    name: string;
    totalRequirements: number;
    coveredRequirements: number;
    coverage: number;
  }>;
}
