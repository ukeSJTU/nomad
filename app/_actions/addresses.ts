"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

import {
  cancelDefaultAddress,
  createAddress,
  deleteAddress,
  getUserAddresses,
  setDefaultAddress,
  updateAddress,
} from "@/domains/user/address.repository";
import { createScopedLogger } from "@/infra/logging/logger";
import {
  createAddressSchema,
  updateAddressSchema,
} from "@/types/validations/addresses";
import { requireSessionUser } from "./session";

const logger = createScopedLogger({ module: "actions.addresses" });

async function requireUserId(redirectTo?: string): Promise<string> {
  const user = await requireSessionUser(redirectTo);
  return user.id;
}

/**
 * Get all addresses for the current user
 */
export async function getAddressesAction() {
  try {
    const userId = await requireUserId();
    const addresses = await getUserAddresses(userId);
    return { success: true, data: addresses };
  } catch (error) {
    logger.error(
      { err: error instanceof Error ? error : new Error(String(error)) },
      "Get addresses action error"
    );
    return { success: false, error: "Failed to fetch addresses" };
  }
}

/**
 * Create a new address
 */
export async function createAddressAction(data: unknown) {
  try {
    const userId = await requireUserId();

    // Validate input
    const validatedData = createAddressSchema.parse(data);

    const newAddress = await createAddress({
      ...validatedData,
      userId,
    });

    revalidatePath("/home/info");
    return { success: true, data: newAddress };
  } catch (error) {
    logger.error(
      { err: error instanceof Error ? error : new Error(String(error)), data },
      "Create address action error"
    );
    if (error instanceof ZodError) {
      const errorMessage = (error as ZodError).issues
        .map(issue => issue.message)
        .join("\n");
      return { success: false, error: errorMessage };
    }
    return { success: false, error: "Failed to create address" };
  }
}

/**
 * Update an address
 */
export async function updateAddressAction(addressId: string, data: unknown) {
  try {
    const userId = await requireUserId();

    // Validate input
    const validatedData = updateAddressSchema.parse(data);

    const updatedAddress = await updateAddress(
      addressId,
      userId,
      validatedData
    );

    if (!updatedAddress) {
      return { success: false, error: "Address not found" };
    }

    revalidatePath("/home/info");
    return { success: true, data: updatedAddress };
  } catch (error) {
    logger.error(
      {
        err: error instanceof Error ? error : new Error(String(error)),
        addressId,
        data,
      },
      "Update address action error"
    );
    if (error instanceof ZodError) {
      const errorMessage = (error as ZodError).issues
        .map(issue => issue.message)
        .join("\n");
      return { success: false, error: errorMessage };
    }
    return { success: false, error: "Failed to update address" };
  }
}

/**
 * Delete an address
 */
export async function deleteAddressAction(addressId: string) {
  try {
    const userId = await requireUserId();
    await deleteAddress(addressId, userId);
    revalidatePath("/home/info");
    return { success: true };
  } catch (error) {
    logger.error(
      {
        err: error instanceof Error ? error : new Error(String(error)),
        addressId,
      },
      "Delete address action error"
    );
    return { success: false, error: "Failed to delete address" };
  }
}

/**
 * Set default address
 */
export async function setDefaultAddressAction(addressId: string) {
  try {
    const userId = await requireUserId();
    await setDefaultAddress(addressId, userId);
    revalidatePath("/home/info");
    return { success: true };
  } catch (error) {
    logger.error(
      {
        err: error instanceof Error ? error : new Error(String(error)),
        addressId,
      },
      "Set default address action error"
    );
    return { success: false, error: "Failed to set default address" };
  }
}

/**
 * Cancel default address
 */
export async function cancelDefaultAddressAction(addressId: string) {
  try {
    const userId = await requireUserId();
    await cancelDefaultAddress(addressId, userId);
    revalidatePath("/home/info");
    return { success: true };
  } catch (error) {
    logger.error(
      {
        err: error instanceof Error ? error : new Error(String(error)),
        addressId,
      },
      "Cancel default address action error"
    );
    return { success: false, error: "Failed to cancel default address" };
  }
}
