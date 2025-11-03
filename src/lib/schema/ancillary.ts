import { z } from "zod";

/**
 * Ancillary Services Schema
 *
 * Purpose:
 * - Define structure for ancillary services (insurance, airport pickup, meals)
 * - Provide type-safe validation for ancillary service data
 * - Support JSON storage in orders.ancillaryDetails field
 *
 * Service Categories:
 * 1. Insurance - Travel insurance options
 * 2. Airport Pickup - Airport transfer services
 * 3. Meal - In-flight meal options
 *
 * Each ancillary service has:
 * - code: Unique identifier (e.g., "INSURANCE_BASIC")
 * - name: Display name (e.g., "基础旅行险")
 * - description: Service description
 * - price: Service price in CNY
 * - category: Service category (INSURANCE, AIRPORT_PICKUP, MEAL)
 */

/**
 * Ancillary Service Category Enum
 */
export const ancillaryServiceCategories = [
  "INSURANCE",
  "AIRPORT_PICKUP",
  "MEAL",
] as const;

export type AncillaryServiceCategory =
  (typeof ancillaryServiceCategories)[number];

/**
 * Ancillary Service Schema
 *
 * Defines the structure of a single ancillary service
 */
export const ancillaryServiceSchema = z.object({
  code: z.string().min(1).max(50), // Unique service code (e.g., "INSURANCE_BASIC")
  name: z.string().min(1).max(100), // Display name (e.g., "基础旅行险")
  description: z.string().max(500).optional(), // Service description
  price: z.number().positive(), // Service price in CNY
  category: z.enum(ancillaryServiceCategories), // Service category
});

export type AncillaryService = z.infer<typeof ancillaryServiceSchema>;

/**
 * Ancillary Details Schema
 *
 * Defines the structure of the ancillaryDetails JSON field in orders table
 * This is an array of selected ancillary services
 */
export const ancillaryDetailsSchema = z.array(ancillaryServiceSchema);

export type AncillaryDetails = z.infer<typeof ancillaryDetailsSchema>;

/**
 * Available Ancillary Services
 *
 * Predefined list of available ancillary services
 * These can be used for seeding or as default options
 */
export const availableAncillaryServices: AncillaryService[] = [
  // Insurance Services
  {
    code: "INSURANCE_BASIC",
    name: "基础旅行险",
    description: "提供基本的旅行意外保障，包括意外伤害和医疗费用",
    price: 50.0,
    category: "INSURANCE",
  },
  {
    code: "INSURANCE_PREMIUM",
    name: "高级旅行险",
    description:
      "提供全面的旅行保障，包括意外伤害、医疗费用、行李丢失和航班延误",
    price: 120.0,
    category: "INSURANCE",
  },
  {
    code: "INSURANCE_FAMILY",
    name: "家庭旅行险",
    description: "适合全家出行，提供全面的家庭旅行保障",
    price: 200.0,
    category: "INSURANCE",
  },

  // Airport Pickup Services
  {
    code: "PICKUP_ECONOMY",
    name: "经济型接送机",
    description: "舒适的经济型车辆接送机服务",
    price: 80.0,
    category: "AIRPORT_PICKUP",
  },
  {
    code: "PICKUP_BUSINESS",
    name: "商务型接送机",
    description: "高端商务车辆接送机服务，提供更舒适的乘坐体验",
    price: 150.0,
    category: "AIRPORT_PICKUP",
  },
  {
    code: "PICKUP_LUXURY",
    name: "豪华型接送机",
    description: "豪华车辆接送机服务，享受尊贵出行体验",
    price: 300.0,
    category: "AIRPORT_PICKUP",
  },

  // Meal Services
  {
    code: "MEAL_STANDARD",
    name: "标准餐食",
    description: "提供标准的机上餐食，包括主食、小吃和饮料",
    price: 30.0,
    category: "MEAL",
  },
  {
    code: "MEAL_VEGETARIAN",
    name: "素食餐",
    description: "提供健康的素食餐食选择",
    price: 35.0,
    category: "MEAL",
  },
  {
    code: "MEAL_HALAL",
    name: "清真餐",
    description: "符合清真标准的餐食",
    price: 35.0,
    category: "MEAL",
  },
  {
    code: "MEAL_PREMIUM",
    name: "高级餐食",
    description: "提供精选的高级餐食，包括多道菜品和优质饮料",
    price: 80.0,
    category: "MEAL",
  },
];

/**
 * Helper function to get ancillary services by category
 */
export function getAncillaryServicesByCategory(
  category: AncillaryServiceCategory
): AncillaryService[] {
  return availableAncillaryServices.filter(
    service => service.category === category
  );
}

/**
 * Helper function to get ancillary service by code
 */
export function getAncillaryServiceByCode(
  code: string
): AncillaryService | undefined {
  return availableAncillaryServices.find(service => service.code === code);
}

/**
 * Helper function to calculate total price of ancillary services
 */
export function calculateAncillaryTotal(services: AncillaryService[]): number {
  return services.reduce((total, service) => total + service.price, 0);
}

/**
 * Helper function to validate ancillary details
 */
export function validateAncillaryDetails(
  data: unknown
):
  | { success: true; data: AncillaryDetails }
  | { success: false; error: string } {
  try {
    const validated = ancillaryDetailsSchema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Invalid ancillary details",
      };
    }
    return { success: false, error: "Unknown validation error" };
  }
}
