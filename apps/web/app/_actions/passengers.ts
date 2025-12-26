"use server";

import { requireSessionUser } from "@/actions/session";
import {
  batchDeletePassengers,
  createPassenger,
  deletePassenger,
  getPassenger,
  getPassengerById,
  getPassengers,
  type PassengerInput,
  updatePassenger,
} from "@/domains/passengers";
import { createScopedLogger } from "@/infra/logging/logger";
import { dateToLocalDateString } from "@/lib/format";

const logger = createScopedLogger({ module: "actions.passengers" });

async function requireUserId(redirectTo?: string): Promise<string> {
  const user = await requireSessionUser(redirectTo);
  return user.id;
}

/**
 * Server Actions for Passenger Management (Thin Controller Layer)
 *
 * These actions serve as thin controllers that:
 * 1. Handle authentication (Next.js specific)
 * 2. Call service layer for business logic
 * 3. Handle framework-specific operations (redirect, revalidatePath)
 * 4. Format responses
 *
 * All business logic is in the service layer (src/domains/passengers)
 * which can be tested independently without mocking Next.js runtime.
 */

/**
 * Server action to create a new passenger
 *
 * This is a thin controller that:
 * 1. Verifies authentication
 * 2. Converts form data to service input format
 * 3. Calls service layer
 * 4. Returns formatted response
 *
 * @param formData - Form data from passenger creation form
 * @returns Result object with success status and passenger data or error
 */
export async function createPassengerAction(formData: unknown) {
  try {
    const userId = await requireUserId();

    // 2. Convert form data to service input format
    // biome-ignore lint/suspicious/noExplicitAny: Input validation pending
    const data = formData as any;
    const passengerInput: PassengerInput = {
      name: data.name,
      nationality: data.nationality,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth
        ? dateToLocalDateString(data.dateOfBirth)
        : null,
      placeOfBirth: data.placeOfBirth,
      phone: data.phone,
      email: data.email,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      documentExpiryDate: data.documentExpiryDate
        ? dateToLocalDateString(data.documentExpiryDate)
        : null,
    };

    // 3. Call service layer
    const result = await createPassenger(userId, passengerInput);

    // 4. Return result
    return result;
  } catch (error) {
    logger.error(
      // biome-ignore lint/suspicious/noExplicitAny: Logging error context
      { err: error, passengerName: (formData as any)?.name },
      "Create passenger action error"
    );
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create passenger",
    };
  }
}

/**
 * Server action to update an existing passenger
 *
 * This is a thin controller that:
 * 1. Verifies authentication
 * 2. Converts form data to service input format
 * 3. Calls service layer
 * 4. Returns formatted response
 *
 * @param id - The passenger ID to update
 * @param formData - Form data from passenger update form
 * @returns Result object with success status and updated passenger data or error
 */
export async function updatePassengerAction(id: string, formData: unknown) {
  try {
    const userId = await requireUserId();

    // 2. Convert form data to service input format
    // biome-ignore lint/suspicious/noExplicitAny: Input validation pending
    const data = formData as any;
    const passengerInput: Partial<PassengerInput> = {
      name: data.name,
      nationality: data.nationality,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth
        ? dateToLocalDateString(data.dateOfBirth)
        : null,
      placeOfBirth: data.placeOfBirth,
      phone: data.phone,
      email: data.email,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      documentExpiryDate: data.documentExpiryDate
        ? dateToLocalDateString(data.documentExpiryDate)
        : null,
    };

    // 3. Call service layer
    const result = await updatePassenger(userId, id, passengerInput);

    // 4. Return result
    return result;
  } catch (error) {
    logger.error(
      { err: error, passengerId: id },
      "Update passenger action error"
    );
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update passenger",
    };
  }
}

/**
 * Server action to get a passenger by ID
 *
 * This is a thin controller that:
 * 1. Verifies authentication (redirects if not authenticated)
 * 2. Calls service layer
 * 3. Returns passenger data or null
 *
 * @param id - The passenger ID to retrieve
 * @returns Passenger data or null if not found
 */
export async function getPassengerAction(id: string) {
  try {
    const userId = await requireUserId();

    // 2. Call service layer
    const result = await getPassenger(userId, id);

    // 3. Return passenger data or null
    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    logger.error({ err: error, passengerId: id }, "Get passenger action error");
    return null;
  }
}

/**
 * Server action to delete a passenger (soft delete)
 *
 * This is a thin controller that:
 * 1. Verifies authentication
 * 2. Calls service layer
 * 3. Returns formatted response
 *
 * @param id - The passenger ID to delete
 * @returns Result object with success status and message or error
 */
export async function deletePassengerAction(id: string) {
  try {
    const userId = await requireUserId();

    // 2. Call service layer
    const result = await deletePassenger(userId, id);

    // 3. Return result
    return result;
  } catch (error) {
    logger.error(
      { err: error, passengerId: id },
      "Delete passenger action error"
    );
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete passenger",
    };
  }
}

/**
 * Server action to batch delete passengers (soft delete)
 *
 * This is a thin controller that:
 * 1. Verifies authentication
 * 2. Calls service layer
 * 3. Returns formatted response
 *
 * @param ids - Array of passenger IDs to delete
 * @returns Result object with success status and message or error
 */
export async function batchDeletePassengersAction(ids: string[]) {
  try {
    const userId = await requireUserId();
    const result = await batchDeletePassengers(userId, ids);

    // 3. Return result
    return result;
  } catch (error) {
    logger.error(
      { err: error, passengerIds: ids },
      "Batch delete passengers action error"
    );
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to batch delete passengers",
    };
  }
}

export async function getPassengersAction() {
  const user = await requireSessionUser("/home/passengers");
  return getPassengers(user.id);
}

export async function getPassengerDetailAction(id: string) {
  const user = await requireSessionUser();
  return getPassengerById(id, user.id);
}
