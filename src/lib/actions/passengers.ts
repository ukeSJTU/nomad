"use server";

import { and, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { passengers } from "@/lib/schema/passengers";
import type { Passenger } from "@/types/api/passengers";

/**
 * Server action to create a new passenger
 */
export async function createPassengerAction(formData: unknown) {
  try {
    // Check authentication
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required. Please log in first.",
      };
    }

    // Convert form data to database format
    const data = formData as any;
    const passengerData: any = {
      userId: session.user.id,
      name: data.name,
      nationality: data.nationality || null,
      gender: data.gender || null,
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth).toISOString().split("T")[0]
        : null,
      placeOfBirth: data.placeOfBirth || null,
      phone: data.phone || null,
      fax:
        data.faxAreaCode && data.faxPhone
          ? `${data.faxAreaCode}-${data.faxPhone}${data.faxExtension ? `-${data.faxExtension}` : ""}`
          : null,
      email: data.email || null,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      isDeleted: false,
    };

    if (data.documentExpiryDate) {
      passengerData.documentExpiryDate = new Date(data.documentExpiryDate)
        .toISOString()
        .split("T")[0];
    }

    // Insert into database
    const [newPassenger] = await db
      .insert(passengers)
      .values(passengerData)
      .returning();

    return {
      success: true,
      data: newPassenger,
    };
  } catch (error) {
    console.error("Failed to create passenger:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create passenger",
    };
  }
}

/**
 * Server action to update an existing passenger
 */
export async function updatePassengerAction(id: string, formData: unknown) {
  try {
    // Check authentication
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required. Please log in first.",
      };
    }

    // Check if passenger exists and belongs to user
    const [existingPassenger] = await db
      .select()
      .from(passengers)
      .where(
        and(
          eq(passengers.id, id),
          eq(passengers.userId, session.user.id),
          eq(passengers.isDeleted, false)
        )
      );

    if (!existingPassenger) {
      return {
        success: false,
        error: "Passenger not found",
      };
    }

    // Convert form data to database format
    const data = formData as any;
    const updateData: Record<string, unknown> = {
      name: data.name,
      nationality: data.nationality || null,
      gender: data.gender || null,
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth).toISOString().split("T")[0]
        : null,
      placeOfBirth: data.placeOfBirth || null,
      phone: data.phone || null,
      fax:
        data.faxAreaCode && data.faxPhone
          ? `${data.faxAreaCode}-${data.faxPhone}${data.faxExtension ? `-${data.faxExtension}` : ""}`
          : null,
      email: data.email || null,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      documentExpiryDate: data.documentExpiryDate
        ? new Date(data.documentExpiryDate).toISOString().split("T")[0]
        : null,
      updatedAt: new Date(),
    };

    // Update in database
    const [updatedPassenger] = await db
      .update(passengers)
      .set(updateData)
      .where(eq(passengers.id, id))
      .returning();

    return {
      success: true,
      data: updatedPassenger,
    };
  } catch (error) {
    console.error("Failed to update passenger:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update passenger",
    };
  }
}

/**
 * Server action to get a passenger by ID
 */
export async function getPassengerAction(id: string) {
  try {
    // Check authentication
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      redirect("/auth/sign-in");
    }

    // Get passenger
    const [passenger] = await db
      .select()
      .from(passengers)
      .where(
        and(
          eq(passengers.id, id),
          eq(passengers.userId, session.user.id),
          eq(passengers.isDeleted, false)
        )
      );

    if (!passenger) {
      return null;
    }

    return {
      ...passenger,
      createdAt: passenger.createdAt?.toISOString() ?? new Date().toISOString(),
      updatedAt: passenger.updatedAt?.toISOString() ?? new Date().toISOString(),
    } as Passenger;
  } catch (error) {
    console.error("Failed to get passenger:", error);
    return null;
  }
}

/**
 * Server action to delete a passenger (soft delete)
 */
export async function deletePassengerAction(id: string) {
  try {
    // Check authentication
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required. Please log in first.",
      };
    }

    // Check if passenger exists and belongs to user
    const [existingPassenger] = await db
      .select()
      .from(passengers)
      .where(
        and(
          eq(passengers.id, id),
          eq(passengers.userId, session.user.id),
          eq(passengers.isDeleted, false)
        )
      );

    if (!existingPassenger) {
      return {
        success: false,
        error: "Passenger not found",
      };
    }

    // Soft delete
    await db
      .update(passengers)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(passengers.id, id));

    return {
      success: true,
      message: "Passenger deleted successfully",
    };
  } catch (error) {
    console.error("Failed to delete passenger:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete passenger",
    };
  }
}

/**
 * Server action to batch delete passengers (soft delete)
 */
export async function batchDeletePassengersAction(ids: string[]) {
  try {
    // Check authentication
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required. Please log in first.",
      };
    }

    // Soft delete passengers (only those belonging to the user)
    await db
      .update(passengers)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(
        and(
          inArray(passengers.id, ids),
          eq(passengers.userId, session.user.id),
          eq(passengers.isDeleted, false)
        )
      );

    return {
      success: true,
      message: `Successfully deleted ${ids.length} passenger(s)`,
    };
  } catch (error) {
    console.error("Failed to batch delete passengers:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to batch delete passengers",
    };
  }
}
