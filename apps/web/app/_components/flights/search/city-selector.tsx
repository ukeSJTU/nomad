"use client";

import type {
  CityInputProps as CityInputUIProps,
  CitySelectorProps as CitySelectorUIProps,
} from "@ukesjtu/nomad-ui/components/flights/search";
import {
  CityInput as CityInputUI,
  CitySelector as CitySelectorUI,
} from "@ukesjtu/nomad-ui/components/flights/search";

// Re-export UI components as-is since they are already pure and have no container logic needed
export const CitySelector = CitySelectorUI;
export const CityInput = CityInputUI;

// Re-export types
export type CitySelectorProps = CitySelectorUIProps;
export type CityInputProps = CityInputUIProps;
