/**
 * Passenger DTOs for frontend/API layer
 *
 * Data Transfer Objects for passenger information display and API communication.
 * Used in Query layer, components, and client-side code.
 *
 * Note: Use direct imports from this file (e.g., "@/types/dto/passengers")
 * to avoid naming conflicts with database Passenger type.
 */

/**
 * Passenger DTO for frontend display and query results
 */
export interface Passenger {
  id: string;
  name: string;
  nationality: string | null;
  gender: "male" | "female" | "other" | null;
  dateOfBirth: string | null;
  placeOfBirth: string | null;
  phone: string | null;
  email: string | null;
  documentType: "id_card" | "passport" | "other";
  documentNumber: string;
  documentExpiryDate: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Simplified passenger item for list display
 */
export interface PassengerListItem {
  id: string;
  name: string;
  documentType: "id_card" | "passport" | "other";
  documentNumber: string;
  phone: string | null;
}
