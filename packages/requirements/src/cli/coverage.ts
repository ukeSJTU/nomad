#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";
import { Command } from "commander";
import { buildCoverageMapping } from "../coverage/mapper";
import { parseTestFiles } from "../coverage/parser";
import {
  generateJSONReport,
  generateTableReport,
  reportValidationErrors,
} from "../coverage/reporter";
import { calculateCoverageStatistics } from "../coverage/stats";
import { allModules } from "../data/index";
import { findAllTestFiles } from "../utils/glob";

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
    .parse(process.argv);

  const options = program.opts();

  try {
    // Determine the apps/web path
    const currentDir = process.cwd();
    const webAppPath = path.resolve(currentDir, "../../apps/web");

    if (!fs.existsSync(webAppPath)) {
      console.error(`Error: apps/web directory not found at ${webAppPath}`);
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
    const mapping = buildCoverageMapping(parsedFiles, allModules);

    // Parse module filter
    const filterModules = options.module
      ? options.module.split(",").map((m: string) => m.trim())
      : undefined;

    console.log("Calculating statistics...\n");
    const stats = calculateCoverageStatistics(
      mapping,
      allModules,
      filterModules
    );

    // Generate report
    let report = "";

    // Show validation errors first
    if (mapping.validationErrors.length > 0) {
      report += reportValidationErrors(mapping.validationErrors);
    }

    // Generate report based on format
    if (options.json) {
      report += generateJSONReport(stats);
    } else {
      report += generateTableReport(stats);
    }

    // Output to file or console
    if (options.output) {
      fs.writeFileSync(options.output, report);
      console.log(`Report saved to ${options.output}`);
    } else {
      console.log(report);
    }

    // Exit with error code if there are validation errors
    if (mapping.validationErrors.length > 0) {
      console.error(
        `\nFound ${mapping.validationErrors.length} validation error(s).`
      );
      process.exit(1);
    }
  } catch (error) {
    console.error("Error generating coverage report:");
    console.error(error);
    process.exit(1);
  }
}

main();
