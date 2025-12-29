import * as fs from "node:fs";
import * as ts from "typescript";
import type { ParsedTestFile, TestNode, TestTag } from "./types";

/**
 * Extract JSDoc tags from a TypeScript AST node
 */
function extractJSDocTags(node: ts.Node): TestTag {
  const tags: TestTag = {
    requirements: [],
    scenarios: [],
    userStories: [],
  };

  // For CallExpression nodes, JSDoc is attached to the parent ExpressionStatement
  let jsDocTarget = node;
  if (
    ts.isCallExpression(node) &&
    node.parent &&
    ts.isExpressionStatement(node.parent)
  ) {
    jsDocTarget = node.parent;
  }

  // Get all JSDoc comments for this node
  // biome-ignore lint/suspicious/noExplicitAny: TypeScript Compiler API doesn't export JSDoc types
  const jsDoc = (jsDocTarget as any).jsDoc;
  if (!jsDoc || !Array.isArray(jsDoc)) {
    return tags;
  }

  // Process each JSDoc comment block
  for (const doc of jsDoc) {
    if (!doc.tags) continue;

    for (const tag of doc.tags) {
      const tagName = tag.tagName?.text || tag.tagName?.escapedText;
      if (!tagName) continue;

      // Extract the comment text
      let value = "";
      if (typeof tag.comment === "string") {
        value = tag.comment;
      } else if (Array.isArray(tag.comment)) {
        // biome-ignore lint/suspicious/noExplicitAny: JSDoc comment parts are not typed
        value = tag.comment.map((part: any) => part.text || "").join("");
      }
      value = value.trim();

      if (!value) continue;

      if (tagName === "requirement") {
        tags.requirements.push(value);
      } else if (tagName === "scenario") {
        tags.scenarios.push(value);
      } else if (tagName === "userStory") {
        tags.userStories.push(value);
      }
    }
  }

  return tags;
}

/**
 * Check if a node is a describe() or test() call
 */
function isTestCall(
  node: ts.Node,
  type: "describe" | "test"
): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) return false;

  const expression = node.expression;
  if (!ts.isIdentifier(expression)) return false;

  const name = expression.text;

  if (type === "describe") {
    return name === "describe";
  }

  return name === "test" || name === "it";
}

/**
 * Extract the name from a test/describe call
 */
function extractTestName(node: ts.CallExpression): string {
  if (node.arguments.length === 0) return "<unnamed>";

  const firstArg = node.arguments[0];

  if (
    ts.isStringLiteral(firstArg) ||
    ts.isNoSubstitutionTemplateLiteral(firstArg)
  ) {
    return firstArg.text;
  }

  if (ts.isTemplateExpression(firstArg)) {
    return firstArg.getText().slice(1, -1);
  }

  return "<dynamic name>";
}

/**
 * Get line number from a node
 */
function getLineNumber(sourceFile: ts.SourceFile, node: ts.Node): number {
  const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
  return line + 1;
}

/**
 * Build test hierarchy tree from AST
 */
function buildTestTree(sourceFile: ts.SourceFile, filePath: string): TestNode {
  const fileNode: TestNode = {
    type: "file",
    name: filePath,
    filePath,
    line: 1,
    tags: { requirements: [], scenarios: [], userStories: [] },
    finalTags: { requirements: [], scenarios: [], userStories: [] },
    children: [],
  };

  // Extract file-level JSDoc tags
  if (sourceFile.statements.length > 0) {
    const firstStatement = sourceFile.statements[0];
    fileNode.tags = extractJSDocTags(firstStatement);
  }

  // Parse the tree
  function visit(node: ts.Node, parent: TestNode): void {
    // Check for describe blocks
    if (isTestCall(node, "describe")) {
      const describeNode: TestNode = {
        type: "describe",
        name: extractTestName(node),
        filePath,
        line: getLineNumber(sourceFile, node),
        tags: extractJSDocTags(node),
        finalTags: { requirements: [], scenarios: [], userStories: [] },
        children: [],
      };

      parent.children = parent.children || [];
      parent.children.push(describeNode);

      // Visit children of describe block
      ts.forEachChild(node, child => visit(child, describeNode));
      return;
    }

    // Check for test/it blocks
    if (isTestCall(node, "test")) {
      const testNode: TestNode = {
        type: "test",
        name: extractTestName(node),
        filePath,
        line: getLineNumber(sourceFile, node),
        tags: extractJSDocTags(node),
        finalTags: { requirements: [], scenarios: [], userStories: [] },
      };

      parent.children = parent.children || [];
      parent.children.push(testNode);
      return;
    }

    // Continue traversing
    ts.forEachChild(node, child => visit(child, parent));
  }

  ts.forEachChild(sourceFile, node => visit(node, fileNode));

  return fileNode;
}

/**
 * Resolve tag inheritance from parent to children
 */
function resolveTagInheritance(node: TestNode, parentTags?: TestTag): void {
  // Merge parent tags with current tags
  const hasTags =
    node.tags.requirements.length > 0 ||
    node.tags.scenarios.length > 0 ||
    node.tags.userStories.length > 0;

  if (hasTags) {
    // Node has its own tags, use them
    node.finalTags = { ...node.tags };
  } else if (parentTags) {
    // Inherit from parent
    node.inheritedTags = { ...parentTags };
    node.finalTags = { ...parentTags };
  }

  // Recursively resolve children
  if (node.children) {
    for (const child of node.children) {
      resolveTagInheritance(child, node.finalTags);
    }
  }
}

/**
 * Flatten test tree to a list of test nodes
 */
function flattenTestNodes(root: TestNode): TestNode[] {
  const tests: TestNode[] = [];

  function traverse(node: TestNode): void {
    if (node.type === "test") {
      tests.push(node);
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(root);
  return tests;
}

/**
 * Parse a test file and extract JSDoc tags and test structure
 */
export async function parseTestFile(filePath: string): Promise<ParsedTestFile> {
  const content = fs.readFileSync(filePath, "utf-8");

  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const fileNode = buildTestTree(sourceFile, filePath);
  resolveTagInheritance(fileNode);
  const tests = flattenTestNodes(fileNode);

  return {
    filePath,
    fileNode,
    tests,
  };
}

/**
 * Parse multiple test files in parallel
 */
export async function parseTestFiles(
  filePaths: string[]
): Promise<ParsedTestFile[]> {
  const results = await Promise.all(
    filePaths.map(filePath => parseTestFile(filePath))
  );
  return results;
}
