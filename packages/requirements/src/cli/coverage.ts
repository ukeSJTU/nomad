#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";
import { Command } from "commander";
import { allModules } from "../data/index";
import { findAllTestFiles } from "../utils/glob";
import { buildCoverageMapping } from "../utils/traceability/mapper";
import { parseTestFiles } from "../utils/traceability/parser";
import {
  generateJsonReport,
  generateTableReport,
} from "../utils/traceability/reporter";
import { calculateCoverageStatistics } from "../utils/traceability/stats";
import { validateTestTags } from "../utils/traceability/validator";

async function main() {
  const program = new Command();

  program
    .name("ac-coverage")
    .description(
      "Generate test coverage report for acceptance criteria and requirements"
    )
    .option("--json", "Output in JSON format")
    .option("--output <file>", "Save output to file")
    .option("--module <modules>", "Filter by modules (comma-separated)")
    .option(
      "--path <directory>",
      "Path to the project directory to scan (default: ../../apps/web relative to cwd)"
    )
    .parse(process.argv);

  const options = program.opts();

  try {
    // Determine the project path
    const currentDir = process.cwd();
    const webAppPath = options.path
      ? path.resolve(currentDir, options.path)
      : path.resolve(currentDir, "../../apps/web");

    if (!fs.existsSync(webAppPath)) {
      console.error(`Error: Project directory not found at ${webAppPath}`);
      console.error(
        "Hint: Use --path <directory> to specify a different location"
      );
      process.exit(1);
    }

    console.log("Finding test files...");
    const testFiles = await findAllTestFiles(webAppPath);
    console.log(`Found ${testFiles.length} test files\n`);

    if (testFiles.length === 0) {
      console.log("No test files found.");
      process.exit(0);
    }

    console.log("Parsing test files...");
    const parsedFiles = await parseTestFiles(testFiles);

    console.log("Building coverage mapping...");
    const mapping = buildCoverageMapping(parsedFiles);

    console.log("Calculating statistics...\n");
    const validationErrors = validateTestTags(parsedFiles, allModules);

    // Filter modules if specified
    let modulesToUse = allModules;
    if (options.module) {
      const filterModuleIds = options.module
        .split(",")
        .map((m: string) => m.trim());
      modulesToUse = allModules.filter(mod => filterModuleIds.includes(mod.id));
    }

    const stats = calculateCoverageStatistics(mapping, modulesToUse);

    // Generate report
    let report = "";

    // Generate report based on format
    if (options.json) {
      report = generateJsonReport(stats, validationErrors);
    } else {
      report = generateTableReport(stats, validationErrors);
    }

    // Output to file or console
    if (options.output) {
      fs.writeFileSync(options.output, report);
      console.log(`Report saved to ${options.output}`);
    } else {
      console.log(report);
    }

    // Exit with error code if there are validation errors
    if (validationErrors.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("Error generating coverage report:");
    console.error(error);
    process.exit(1);
  }
}

main();
