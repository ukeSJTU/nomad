import { z } from "zod";

/**
 * Seed configuration schema
 * Defines the structure and validation rules for database seeding
 */
export const seedConfigSchema = z.object({
  /**
   * Faker seed for reproducible random data generation
   * Same seed value will always generate the same data
   * @default Random seed (Date.now())
   */
  seed: z.number().int().positive().optional().default(42),

  /**
   * Number of records to generate for each table
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
    })
    .default({
      cities: 30,
      airports: 70,
      airlines: 30,
      flights: 50,
      users: 10,
      passengersPerUser: { min: 1, max: 5 },
    }),
});

export type SeedConfig = z.infer<typeof seedConfigSchema>;

/**
 * Default seed configuration
 */
export const defaultSeedConfig: SeedConfig = {
  seed: 42, // Fixed seed for reproducible data
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
  },
};

/**
 * Parse CLI arguments and merge with default config
 * Supports the following CLI arguments:
 * - --seed=<number>: Set the Faker seed for reproducible data
 * - --cities=<number>: Number of cities to generate
 * - --airports=<number>: Number of airports to generate
 * - --airlines=<number>: Number of airlines to generate
 * - --flights=<number>: Number of flights to generate
 * - --users=<number>: Number of users to generate
 *
 * @example
 * ```bash
 * # Generate with specific seed for reproducibility
 * pnpm db:seed --seed=12345
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
  const config: {
    seed?: number;
    counts: Partial<SeedConfig["counts"]>;
  } = {
    counts: {},
  };

  for (const arg of args) {
    if (arg.startsWith("--seed=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        config.seed = value;
      }
    } else if (arg.startsWith("--cities=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        config.counts!.cities = value;
      }
    } else if (arg.startsWith("--airports=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        config.counts!.airports = value;
      }
    } else if (arg.startsWith("--airlines=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        config.counts!.airlines = value;
      }
    } else if (arg.startsWith("--flights=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        config.counts!.flights = value;
      }
    } else if (arg.startsWith("--users=")) {
      const value = parseInt(arg.split("=")[1], 10);
      if (!isNaN(value)) {
        config.counts!.users = value;
      }
    }
  }

  // Merge with defaults
  const mergedConfig = {
    seed: config.seed ?? defaultSeedConfig.seed,
    counts: {
      ...defaultSeedConfig.counts,
      ...config.counts,
    },
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
 * Display the current seed configuration
 */
export function displaySeedConfig(config: SeedConfig): void {
  console.log("\n[SEED CONFIG] Configuration:");
  console.log(`   - Seed: ${config.seed ?? "random (Date.now())"}`);
  console.log(`   - Cities: ${config.counts.cities}`);
  console.log(`   - Airports: ${config.counts.airports}`);
  console.log(`   - Airlines: ${config.counts.airlines}`);
  console.log(`   - Flights: ${config.counts.flights}`);
  console.log(`   - Users: ${config.counts.users}`);
  console.log(
    `   - Passengers per user: ${config.counts.passengersPerUser.min}-${config.counts.passengersPerUser.max}`
  );
  console.log("");
}
