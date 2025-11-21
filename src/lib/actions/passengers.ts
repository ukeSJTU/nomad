"use server";

import { redirect } from "next/navigation";

import {
  batchDeletePassengers,
  createPassenger,
  deletePassenger,
  getPassenger,
  type PassengerInput,
  updatePassenger,
} from "@/lib/services";
import { getAuthenticatedUserId } from "@/utils/auth-helpers";

/**
 * Server Actions for Passenger Management (Thin Controller Layer)
 *
 * These actions serve as thin controllers that:
 * 1. Handle authentication (Next.js specific)
 * 2. Call service layer for business logic
 * 3. Handle framework-specific operations (redirect, revalidatePath)
 * 4. Format responses
 *
 * All business logic is in the service layer (src/lib/services/passengers.ts)
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
    // 1. Verify authentication
    const authResult = await getAuthenticatedUserId();
    if (!authResult.success || !authResult.userId) {
      return {
        success: false,
        error: authResult.error,
      };
    }

    // 2. Convert form data to service input format
    const data = formData as any;
    const passengerInput: PassengerInput = {
      name: data.name,
      nationality: data.nationality,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      placeOfBirth: data.placeOfBirth,
      phone: data.phone,
      fax:
        data.faxAreaCode && data.faxPhone
          ? `${data.faxAreaCode}-${data.faxPhone}${data.faxExtension ? `-${data.faxExtension}` : ""}`
          : undefined,
      email: data.email,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      documentExpiryDate: data.documentExpiryDate,
    };

    // 3. Call service layer
    const result = await createPassenger(authResult.userId, passengerInput);

    // 4. Return result
    return result;
  } catch (error) {
    console.error("Create passenger action error:", error);
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
    // 1. Verify authentication
    const authResult = await getAuthenticatedUserId();
    if (!authResult.success || !authResult.userId) {
      return {
        success: false,
        error: authResult.error,
      };
    }

    // 2. Convert form data to service input format
    const data = formData as any;
    const passengerInput: Partial<PassengerInput> = {
      name: data.name,
      nationality: data.nationality,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      placeOfBirth: data.placeOfBirth,
      phone: data.phone,
      fax:
        data.faxAreaCode && data.faxPhone
          ? `${data.faxAreaCode}-${data.faxPhone}${data.faxExtension ? `-${data.faxExtension}` : ""}`
          : undefined,
      email: data.email,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      documentExpiryDate: data.documentExpiryDate,
    };

    // 3. Call service layer
    const result = await updatePassenger(authResult.userId, id, passengerInput);

    // 4. Return result
    return result;
  } catch (error) {
    console.error("Update passenger action error:", error);
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
    // 1. Verify authentication (redirect if not authenticated)
    const authResult = await getAuthenticatedUserId();
    if (!authResult.success || !authResult.userId) {
      redirect("/auth/sign-in");
    }

    // 2. Call service layer
    const result = await getPassenger(authResult.userId, id);

    // 3. Return passenger data or null
    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Get passenger action error:", error);
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
    // 1. Verify authentication
    const authResult = await getAuthenticatedUserId();
    if (!authResult.success || !authResult.userId) {
      return {
        success: false,
        error: authResult.error,
      };
    }

    // 2. Call service layer
    const result = await deletePassenger(authResult.userId, id);

    // 3. Return result
    return result;
  } catch (error) {
    console.error("Delete passenger action error:", error);
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
    // 1. Verify authentication
    const authResult = await getAuthenticatedUserId();
    if (!authResult.success || !authResult.userId) {
      return {
        success: false,
        error: authResult.error,
      };
    }

    // 2. Call service layer
    const result = await batchDeletePassengers(authResult.userId, ids);

    // 3. Return result
    return result;
  } catch (error) {
    console.error("Batch delete passengers action error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to batch delete passengers",
    };
  }
}
