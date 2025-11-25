import { authErrorConfigs } from "@/domains/auth/auth.error";
import { bookingErrorConfigs } from "@/domains/booking/booking.error";
import { flightErrorConfigs } from "@/domains/flights/flights.error";

import { commonErrorConfigs, DEFAULT_ERROR_CONFIG } from "./common.error";
import type { ErrorConfigMap } from "./types";

export const ERROR_CONFIGS: ErrorConfigMap = {
  ...commonErrorConfigs,
  ...authErrorConfigs,
  ...bookingErrorConfigs,
  ...flightErrorConfigs,
};

export type ErrorKey = keyof typeof ERROR_CONFIGS;
export { DEFAULT_ERROR_CONFIG };
export type { ErrorConfig, ErrorConfigMap, ErrorType } from "./types";
