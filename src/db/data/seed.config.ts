import { z } from "zod";

/**
 * Data source type for seeding
 * - fixture-faker: Use real fixture data for cities/airports/airlines, generate flights with Faker
 * - scenario: Use complete predefined scenario data (for exam, etc.)
 */
export type DataSource = "fixture-faker" | "scenario";

/**
 * Seed configuration schema
 * Defines the structure and validation rules for database seeding
 */
export const seedConfigSchema = z.object({
  /**
   * Data source type
   * @default "fixture-faker"q
   */
  dataSource: z.enum(["fixture-faker", "scenario"]).default("fixture-faker"),

  /**
   * Scenario file name (only used when dataSource is "scenario")
   * Points to a file in fixtures/scenarios/ directory
   * @example "exam.2025"
   */
  scenarioFile: z.string().optional(),

  /**
   * Faker seed for reproducible random data generation
   * Same seed value will always generate the same data
   * @default 42
   */
  seed: z.number().int().positive().optional().default(42),

  /**
   * Seeding mode
   * - full: Clear all data and reseed (default)
   * - incremental: Keep existing data and add new records
   */
  mode: z.enum(["full", "incremental"]).default("full"),

  /**
   * Tables to seed (only used in incremental mode)
   * If empty, all tables will be seeded
   */
  tables: z
    .array(
      z.enum([
        "cities",
        "airports",
        "airlines",
        "flights",
        "users",
        "passengers",
      ])
    )
    .optional(),

  /**
   * Number of records to generate for each table
   * Only used when dataSource is "fixture-faker"
   * Optional when dataSource is "scenario"
   */
  counts: z
    .object({
      cities: z.number().int().positive().default(30),
      airports: z.number().int().positive().default(70),
      airlines: z.number().int().positive().default(30),
      flights: z.number().int().positive().default(50),
      users: z.number().int().positive().default(10),
      passengersPerUser: z
        .object({
          min: z.number().int().positive().default(1),
          max: z.number().int().positive().default(5),
        })
        .default({ min: 1, max: 5 }),
      orders: z.number().int().positive().optional(), // Optional: defaults to 1.5x users in the seed runner
      searchesPerUser: z
        .object({
          min: z.number().int().positive().default(2),
          max: z.number().int().positive().default(8),
        })
        .optional()
        .default({ min: 2, max: 8 }),
    })
    .optional()
    .default({
      cities: 30,
      airports: 70,
      airlines: 30,
      flights: 50,
      users: 10,
      passengersPerUser: { min: 1, max: 5 },
      searchesPerUser: { min: 2, max: 8 },
    }),
});

export type SeedConfig = z.infer<typeof seedConfigSchema>;

/**
 * Predefined scenarios for different use cases
 */
export const scenarios = {
  development: {
    name: "Development",
    description:
      "Moderate data for daily development (real cities + generated flights)",
    dataSource: "fixture-faker" as const,
    seed: 42,
    mode: "full" as const,
    counts: {
      cities: 10,
      airports: 20,
      airlines: 15,
      flights: 50,
      users: 5,
      passengersPerUser: { min: 1, max: 3 },
      searchesPerUser: { min: 2, max: 5 },
    },
  },
  demo: {
    name: "Demo",
    description:
      "Rich data for demonstrations (all real cities + many flights)",
    dataSource: "fixture-faker" as const,
    seed: 99999,
    mode: "full" as const,
    counts: {
      cities: 65, // All cities from REAL_CITIES
      airports: 110, // All airports from REAL_AIRPORTS
      airlines: 43, // All airlines from REAL_AIRLINES
      flights: 500,
      users: 20,
      passengersPerUser: { min: 1, max: 5 },
      searchesPerUser: { min: 3, max: 10 },
    },
  },
  exam: {
    name: "Exam 2025",
    description: "Exact data for course exam (predefined scenario)",
    dataSource: "scenario" as const,
    scenarioFile: "exam.2025",
    seed: 42, // Not used in scenario mode, but required by schema
    mode: "full" as const,
    // counts is not needed for scenario mode
  },
} as const;

export type ScenarioName = keyof typeof scenarios;

/**
 * Default seed configuration
 */
export const defaultSeedConfig: SeedConfig = {
  dataSource: "fixture-faker",
  seed: 42, // Fixed seed for reproducible data
  mode: "full",
  counts: {
    cities: 30,
    airports: 70,
    airlines: 30,
    flights: 50,
    users: 10,
    passengersPerUser: {
      min: 1,
      max: 5,
    },
    searchesPerUser: {
      min: 2,
      max: 8,
    },
  },
};

/**
 * Parse CLI arguments and merge with default config
 * Supports the following CLI arguments:
 * - --scenario=<name>: Use a predefined scenario (development, demo, exam)
 * - --seed=<number>: Set the Faker seed for reproducible data
 * - --mode=<mode>: Seeding mode (full or incremental)
 * - --incremental: Shorthand for --mode=incremental
 * - --cities=<number>: Number of cities to generate
 * - --airports=<number>: Number of airports to generate
 * - --airlines=<number>: Number of airlines to generate
 * - --flights=<number>: Number of flights to generate
 * - --users=<number>: Number of users to generate
 *
 * @example
 * ```bash
 * # Use a predefined scenario
 * pnpm db:seed --scenario=demo
 *
 * # Use exam scenario (exact data)
 * pnpm db:seed --scenario=exam
 *
 * # Generate with specific seed for reproducibility
 * pnpm db:seed --seed=12345
 *
 * # Incremental mode (don't clear existing data)
 * pnpm db:seed --incremental --flights=10
 *
 * # Generate more data
 * pnpm db:seed --cities=50 --airports=100 --flights=200
 *
 * # Combine multiple options
 * pnpm db:seed --seed=12345 --users=20 --flights=100
 * ```
 */
export function parseSeedConfig(): SeedConfig {
  const args = process.argv.slice(2);

  // Check for scenario first
  const scenarioArg = args.find(arg => arg.startsWith("--scenario="));
  let baseConfig: Partial<SeedConfig> = {};

  if (scenarioArg) {
    const scenarioName = scenarioArg.split("=")[1] as ScenarioName;
    if (scenarioName in scenarios) {
      baseConfig = { ...scenarios[scenarioName] };
      console.log(
        `[SEED CONFIG] Using scenario: ${scenarios[scenarioName].name}`
      );
      console.log(
        `[SEED CONFIG] Description: ${scenarios[scenarioName].description}\n`
      );
    } else {
      console.error(
        `[SEED CONFIG] Unknown scenario: ${scenarioName}. Available: ${Object.keys(scenarios).join(", ")}`
      );
      process.exit(1);
    }
  } else {
    baseConfig = { ...defaultSeedConfig };
  }

  const config: {
    dataSource?: DataSource;
    scenarioFile?: string;
    seed?: number;
    mode?: "full" | "incremental";
    counts?: Partial<SeedConfig["counts"]>;
  } = {
    dataSource: baseConfig.dataSource,
    scenarioFile: baseConfig.scenarioFile,
    seed: baseConfig.seed,
    mode: baseConfig.mode,
    counts: baseConfig.counts ? { ...baseConfig.counts } : undefined,
  };

  for (const arg of args) {
    if (arg.startsWith("--seed=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        config.seed = value;
      }
    } else if (arg.startsWith("--mode=")) {
      const mode = arg.split("=")[1];
      if (mode === "full" || mode === "incremental") {
        config.mode = mode;
      }
    } else if (arg === "--incremental") {
      config.mode = "incremental";
    } else if (arg.startsWith("--cities=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        if (!config.counts) config.counts = {};
        config.counts.cities = value;
      }
    } else if (arg.startsWith("--airports=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        if (!config.counts) config.counts = {};
        config.counts.airports = value;
      }
    } else if (arg.startsWith("--airlines=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        if (!config.counts) config.counts = {};
        config.counts.airlines = value;
      }
    } else if (arg.startsWith("--flights=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        if (!config.counts) config.counts = {};
        config.counts.flights = value;
      }
    } else if (arg.startsWith("--users=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        if (!config.counts) config.counts = {};
        config.counts.users = value;
      }
    }
  }

  // Merge with defaults
  const mergedConfig = {
    dataSource: config.dataSource ?? defaultSeedConfig.dataSource,
    scenarioFile: config.scenarioFile,
    seed: config.seed ?? defaultSeedConfig.seed,
    mode: config.mode ?? defaultSeedConfig.mode,
    counts: config.counts
      ? {
          ...defaultSeedConfig.counts,
          ...config.counts,
        }
      : undefined,
  };

  // Validate the merged configuration
  const result = seedConfigSchema.safeParse(mergedConfig);

  if (!result.success) {
    console.error("[SEED CONFIG] Invalid configuration:");
    console.error(result.error.issues);
    throw new Error("Invalid seed configuration");
  }

  return result.data;
}

/**
 * Interactive mode - prompt user to select a scenario
 */
export async function promptForScenario(): Promise<SeedConfig> {
  const { select, confirm } = await import("@inquirer/prompts");

  console.log("\nDatabase Seeding - Interactive Mode\n");

  const scenarioChoices = Object.entries(scenarios).map(([key, scenario]) => ({
    name: `${scenario.name} - ${scenario.description}`,
    value: key,
    description:
      "counts" in scenario && scenario.counts
        ? `Cities: ${scenario.counts.cities}, Airports: ${scenario.counts.airports}, Flights: ${scenario.counts.flights}, Users: ${scenario.counts.users}`
        : "Predefined scenario data",
  }));

  scenarioChoices.push({
    name: "Custom - Configure manually",
    value: "custom",
    description: "Specify your own configuration",
  });

  const selectedScenario = await select({
    message: "Select a seeding scenario:",
    choices: scenarioChoices,
  });

  if (selectedScenario === "custom") {
    // For custom, we'll use the default config
    // In the future, we could add more prompts for custom values
    console.log(
      "\nUsing default configuration (you can override with CLI args)\n"
    );
    return defaultSeedConfig;
  }

  const scenario = scenarios[selectedScenario as ScenarioName];

  console.log(`\nSelected: ${scenario.name}`);
  console.log(`${scenario.description}\n`);

  const shouldProceed = await confirm({
    message: "Proceed with this configuration?",
    default: true,
  });

  if (!shouldProceed) {
    console.log("\nSeeding cancelled.\n");
    process.exit(0);
  }

  return {
    dataSource: scenario.dataSource,
    scenarioFile:
      "scenarioFile" in scenario ? scenario.scenarioFile : undefined,
    seed: scenario.seed,
    mode: scenario.mode,
    counts: "counts" in scenario ? scenario.counts : undefined,
  } as SeedConfig;
}

/**
 * Display the current seed configuration
 */
export function displaySeedConfig(config: SeedConfig): void {
  console.log("\n[SEED CONFIG] Configuration:");
  console.log(`   - Data Source: ${config.dataSource}`);
  if (config.dataSource === "scenario") {
    console.log(`   - Scenario File: ${config.scenarioFile}`);
  }
  console.log(`   - Mode: ${config.mode}`);
  console.log(`   - Seed: ${config.seed}`);
  if (config.dataSource === "fixture-faker" && config.counts) {
    console.log(`   - Cities: ${config.counts.cities}`);
    console.log(`   - Airports: ${config.counts.airports}`);
    console.log(`   - Airlines: ${config.counts.airlines}`);
    console.log(`   - Flights: ${config.counts.flights}`);
    console.log(`   - Users: ${config.counts.users}`);
    console.log(
      `   - Passengers per user: ${config.counts.passengersPerUser.min}-${config.counts.passengersPerUser.max}`
    );
    console.log(
      `   - Orders: ${config.counts.orders || `~${Math.floor(config.counts.users * 1.5)}`} (auto)`
    );
    console.log(
      `   - Searches per user: ${config.counts.searchesPerUser?.min || 2}-${config.counts.searchesPerUser?.max || 8}`
    );
  }
  console.log("");
}
