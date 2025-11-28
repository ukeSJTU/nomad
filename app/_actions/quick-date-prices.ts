"use server";

import { getQuickDatePrices as getQuickDatePricesService } from "@/domains/flights/quick-date-price.service";
import {
  type GetQuickDatePricesParams,
  type QuickDatePrice,
} from "@/types/dto";

// export type { QuickDatePrice } from "@/domains/flights/quick-date-price.service";

export async function getQuickDatePrices(
  params: GetQuickDatePricesParams
): Promise<QuickDatePrice[]> {
  return getQuickDatePricesService(params);
}
