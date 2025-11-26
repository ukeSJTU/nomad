import { authErrorConfigs } from "./auth";
import { bookingErrorConfigs } from "./booking";
import { commonErrorConfigs, DEFAULT_ERROR_CONFIG } from "./common";
import { flightErrorConfigs } from "./flight";
import type { ErrorConfig, ErrorConfigMap, ErrorType } from "./types";

export const ERROR_CONFIGS: ErrorConfigMap = {
  ...commonErrorConfigs,
  ...authErrorConfigs,
  ...bookingErrorConfigs,
  ...flightErrorConfigs,
};

export type ErrorKey = keyof typeof ERROR_CONFIGS;

export {
  authErrorConfigs,
  bookingErrorConfigs,
  commonErrorConfigs,
  DEFAULT_ERROR_CONFIG,
  flightErrorConfigs,
};
export type { ErrorConfig, ErrorConfigMap, ErrorType };
