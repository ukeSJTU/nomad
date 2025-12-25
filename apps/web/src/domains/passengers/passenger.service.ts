import { createScopedLogger } from "@/infra/logging/logger";
import type { PassengerDTO } from "@/types/dto";
import type { ServiceResult } from "@/types/result";
import type {
  CreatePassengerData,
  UpdatePassengerData,
} from "@/types/validations";
import {
  PassengerRow,
  batchSoftDeletePassengersForUser,
  createPassengerRecord,
  findPassengerForUser,
  softDeletePassengerForUser,
  updatePassengerRecord,
} from "./passenger.repository";

/**
 * Service layer for passenger-related business logic
 *
 * This layer contains pure business logic without framework dependencies (no Next.js runtime),
 * making it easy to test and reuse in different contexts (user actions, admin operations, cron jobs, etc.).
 *
 * All functions accept userId as a parameter instead of accessing session directly,
 * following the dependency injection pattern.
 */

/**
 * UUID validation regex pattern
 * Matches standard UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validate if a string is a valid UUID format
 * @param id - The string to validate
 * @returns true if valid UUID format, false otherwise
 */
function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

/**
 * Passenger input type for create/update operations
 */
export type PassengerInput = CreatePassengerData;

const logger = createScopedLogger({ module: "passenger.service" });

function toPassengerDto(row: PassengerRow): PassengerDTO {
  return {
    id: row.id,
    name: row.name,
    nationality: row.nationality,
    gender: row.gender,
    dateOfBirth: row.dateOfBirth,
    placeOfBirth: row.placeOfBirth,
    phone: row.phone,
    email: row.email,
    documentType: row.documentType,
    documentNumber: row.documentNumber,
    documentExpiryDate: row.documentExpiryDate ?? null,
    isDeleted: false,
    createdAt: row.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: row.updatedAt?.toISOString() ?? new Date().toISOString(),
  };
}

/**
 * Create a new passenger for a user
 *
 * Business logic:
 * - Validates required fields (name, documentType, documentNumber, documentExpiryDate)
 * - Creates passenger record in database
 * - Returns the created passenger
 *
 * @param userId - The ID of the user who owns this passenger
 * @param data - Passenger data to create
 * @returns ServiceResult with created passenger data or error
 */
export async function createPassenger(
  userId: string,
  data: PassengerInput
): Promise<ServiceResult<PassengerDTO>> {
  try {
    // Validate required fields
    if (!data.name || !data.documentType || !data.documentNumber) {
      return {
        success: false,
        error: "Name, document type, and document number are required",
      };
    }

    // Prepare passenger data for database
    const passengerData = {
      userId,
      name: data.name,
      nationality: data.nationality || null,
      gender: data.gender || null,
      dateOfBirth: data.dateOfBirth || null,
      placeOfBirth: data.placeOfBirth || null,
      phone: data.phone || null,
      email: data.email || null,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      documentExpiryDate: data.documentExpiryDate || null,
      isDeleted: false,
    };

    // Insert into database
    const createdPassenger = await createPassengerRecord(passengerData);

    return {
      success: true,
      data: toPassengerDto(createdPassenger),
      message: "Passenger created successfully",
    };
  } catch (error) {
    logger.error({ err: error }, "Create passenger error");
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create passenger",
    };
  }
}

/**
 * Update an existing passenger
 *
 * Business logic:
 * - Verifies passenger exists and belongs to the user
 * - Verifies passenger is not deleted
 * - Updates passenger information
 * - Returns updated passenger
 *
 * @param userId - The ID of the user who owns this passenger
 * @param id - The passenger ID to update
 * @param data - Partial passenger data to update
 * @returns ServiceResult with updated passenger data or error
 */
export async function updatePassenger(
  userId: string,
  id: string,
  data: UpdatePassengerData
): Promise<ServiceResult<PassengerDTO>> {
  try {
    // Validate UUID format
    if (!isValidUUID(id)) {
      return {
        success: false,
        error: "Passenger not found",
      };
    }

    // Check if passenger exists and belongs to user
    const existingPassenger = await findPassengerForUser(id, userId);

    if (!existingPassenger) {
      return {
        success: false,
        error: "Passenger not found",
      };
    }

    // Prepare update data (only include provided fields)
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (data.name !== undefined) updateData.name = data.name;
    if (data.nationality !== undefined)
      updateData.nationality = data.nationality;
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.dateOfBirth !== undefined)
      updateData.dateOfBirth = data.dateOfBirth;
    if (data.placeOfBirth !== undefined)
      updateData.placeOfBirth = data.placeOfBirth;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.documentType !== undefined)
      updateData.documentType = data.documentType;
    if (data.documentNumber !== undefined)
      updateData.documentNumber = data.documentNumber;
    if (data.documentExpiryDate !== undefined)
      updateData.documentExpiryDate = data.documentExpiryDate;

    // Update in database
    const updatedPassenger = await updatePassengerRecord(
      id,
      updateData as Partial<PassengerRow>
    );

    if (!updatedPassenger) {
      return {
        success: false,
        error: "Passenger not found",
      };
    }

    return {
      success: true,
      data: toPassengerDto(updatedPassenger),
      message: "Passenger updated successfully",
    };
  } catch (error) {
    logger.error({ err: error }, "Update passenger error");
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update passenger",
    };
  }
}

/**
 * Get a passenger by ID
 *
 * Business logic:
 * - Verifies passenger exists and belongs to the user
 * - Verifies passenger is not deleted
 * - Returns passenger information
 *
 * @param userId - The ID of the user who owns this passenger
 * @param id - The passenger ID to retrieve
 * @returns ServiceResult with passenger data or null if not found
 */
export async function getPassenger(
  userId: string,
  id: string
): Promise<ServiceResult<PassengerDTO | null>> {
  try {
    // Validate UUID format
    if (!isValidUUID(id)) {
      return {
        success: true,
        data: null,
        message: "Passenger not found",
      };
    }

    // Get passenger
    const passenger = await findPassengerForUser(id, userId);

    if (!passenger) {
      return {
        success: true,
        data: null,
        message: "Passenger not found",
      };
    }

    return {
      success: true,
      data: toPassengerDto(passenger),
    };
  } catch (error) {
    logger.error({ err: error }, "Get passenger error");
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get passenger",
    };
  }
}

/**
 * Delete a passenger (soft delete)
 *
 * Business logic:
 * - Verifies passenger exists and belongs to the user
 * - Verifies passenger is not already deleted
 * - Soft deletes the passenger (sets isDeleted = true)
 *
 * @param userId - The ID of the user who owns this passenger
 * @param id - The passenger ID to delete
 * @returns ServiceResult with success status
 */
export async function deletePassenger(
  userId: string,
  id: string
): Promise<ServiceResult<void>> {
  try {
    // Validate UUID format
    if (!isValidUUID(id)) {
      return {
        success: false,
        error: "Passenger not found",
      };
    }

    // Check if passenger exists and belongs to user
    const existingPassenger = await findPassengerForUser(id, userId);

    if (!existingPassenger) {
      return {
        success: false,
        error: "Passenger not found",
      };
    }

    // Soft delete the passenger
    await softDeletePassengerForUser(id, userId);

    return {
      success: true,
      message: "Passenger deleted successfully",
    };
  } catch (error) {
    logger.error({ err: error }, "Delete passenger error");
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete passenger",
    };
  }
}

/**
 * Batch delete passengers (soft delete)
 *
 * Business logic:
 * - Soft deletes multiple passengers at once
 * - Only deletes passengers that belong to the user
 * - Only deletes passengers that are not already deleted
 * - Returns the number of passengers deleted
 *
 * @param userId - The ID of the user who owns these passengers
 * @param ids - Array of passenger IDs to delete
 * @returns ServiceResult with number of deleted passengers
 */
export async function batchDeletePassengers(
  userId: string,
  ids: string[]
): Promise<ServiceResult<number>> {
  try {
    // Validate input
    if (!ids || ids.length === 0) {
      return {
        success: false,
        error: "At least one passenger ID is required",
      };
    }

    // Soft delete passengers (only those belonging to the user and not already deleted)
    const deletedCount = await batchSoftDeletePassengersForUser(userId, ids);

    return {
      success: true,
      data: deletedCount,
      message: `Successfully deleted ${deletedCount} passenger(s)`,
    };
  } catch (error) {
    logger.error({ err: error }, "Batch delete passengers error");
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete passengers",
    };
  }
}
