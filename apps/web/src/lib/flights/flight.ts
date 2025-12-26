/**
 * Flight utility functions (frontend-safe)
 *
 * This module provides utility functions for flight data transformation and calculations
 */

import type { FlightSearchResult } from "@/types/dto";

/**
 * Calculate flight duration in minutes
 *
 * @param departureTime - Departure datetime ISO string
 * @param arrivalTime - Arrival datetime ISO string
 * @returns Duration in minutes
 */
export function calculateFlightDuration(
  departureTime: string,
  arrivalTime: string
): number {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);
  return Math.floor((arrival.getTime() - departure.getTime()) / (1000 * 60));
}

/**
 * Format duration in minutes to human-readable string
 *
 * @param minutes - Duration in minutes
 * @returns Formatted duration string (e.g., "2h 55m")
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

/**
 * Format time from ISO datetime string to HH:mm format
 *
 * @param datetime - ISO datetime string
 * @returns Time in HH:mm format
 */
export function formatFlightTime(datetime: string): string {
  const date = new Date(datetime);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Calculate days offset between departure and arrival
 *
 * @param departureTime - Departure datetime ISO string
 * @param arrivalTime - Arrival datetime ISO string
 * @returns Number of days offset (0 for same day, 1 for next day, etc.)
 */
export function calculateDaysOffset(
  departureTime: string,
  arrivalTime: string
): number {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  // Set both to midnight for date comparison
  const departureDate = new Date(departure);
  departureDate.setHours(0, 0, 0, 0);

  const arrivalDate = new Date(arrival);
  arrivalDate.setHours(0, 0, 0, 0);

  const diffTime = arrivalDate.getTime() - departureDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Get the lowest price from seat classes
 *
 * @param seatClasses - Array of seat classes
 * @returns Lowest price as number, or 0 if no seat classes
 */
export function getLowestPrice(
  seatClasses: FlightSearchResult["seatClasses"]
): number {
  if (!seatClasses || seatClasses.length === 0) {
    return 0;
  }

  const prices = seatClasses.map(sc => parseFloat(sc.price));
  return Math.min(...prices);
}

/**
 * Format airport display name with terminal if available
 *
 * @param airportName - Airport name
 * @param terminal - Terminal (optional)
 * @returns Formatted airport display string
 */
export function formatAirportDisplay(
  airportName: string,
  terminal: string | null
): string {
  if (terminal) {
    return `${airportName} ${terminal}`;
  }
  return airportName;
}
