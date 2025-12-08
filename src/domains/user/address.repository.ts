import { and, count, desc, eq, ne } from "drizzle-orm";

import { db } from "@/db";
import { addresses } from "@/db/schema";
import { type DbExecutor } from "@/db/transaction";
import { type Address } from "@/types/db";

export type AddressRow = Address;
export type AddressInsert = typeof addresses.$inferInsert;

/**
 * Get all addresses for a user
 */
export async function getUserAddresses(
  userId: string,
  dbClient: DbExecutor = db
): Promise<AddressRow[]> {
  return dbClient
    .select()
    .from(addresses)
    .where(eq(addresses.userId, userId))
    .orderBy(desc(addresses.isDefault), desc(addresses.createdAt));
}

/**
 * Get a specific address
 */
export async function getAddressById(
  addressId: string,
  dbClient: DbExecutor = db
): Promise<AddressRow | undefined> {
  const [address] = await dbClient
    .select()
    .from(addresses)
    .where(eq(addresses.id, addressId));
  return address;
}

/**
 * Create a new address
 */
export async function createAddress(
  data: AddressInsert,
  dbClient: DbExecutor = db
): Promise<AddressRow> {
  return dbClient.transaction(async tx => {
    // If this is the first address, make it default
    const [existingCount] = await tx
      .select({ count: count() })
      .from(addresses)
      .where(eq(addresses.userId, data.userId));

    if (existingCount.count === 0) {
      data.isDefault = true;
    }

    // If setting as default, unset others
    if (data.isDefault) {
      await tx
        .update(addresses)
        .set({ isDefault: false })
        .where(eq(addresses.userId, data.userId));
    }

    const [newAddress] = await tx.insert(addresses).values(data).returning();
    return newAddress;
  });
}

/**
 * Update an address
 */
export async function updateAddress(
  addressId: string,
  userId: string, // passed for security check
  data: Partial<AddressInsert>,
  dbClient: DbExecutor = db
): Promise<AddressRow | undefined> {
  return dbClient.transaction(async tx => {
    // If setting as default, unset others
    if (data.isDefault) {
      await tx
        .update(addresses)
        .set({ isDefault: false })
        .where(and(eq(addresses.userId, userId), ne(addresses.id, addressId)));
    }

    const [updatedAddress] = await tx
      .update(addresses)
      .set(data)
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
      .returning();

    return updatedAddress;
  });
}

/**
 * Delete an address
 */
export async function deleteAddress(
  addressId: string,
  userId: string,
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient
    .delete(addresses)
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)));
}

/**
 * Set default address
 */
export async function setDefaultAddress(
  addressId: string,
  userId: string,
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient.transaction(async tx => {
    // Unset all
    await tx
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));

    // Set new default
    await tx
      .update(addresses)
      .set({ isDefault: true })
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)));
  });
}

/**
 * Cancel default address
 */
export async function cancelDefaultAddress(
  addressId: string,
  userId: string,
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient
    .update(addresses)
    .set({ isDefault: false })
    .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)));
}
