import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { documentTypeEnum, genderEnum } from "./enums";
import { passengers } from "./passengers";

describe("Passengers Schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(passengers)).toBe("passengers");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(passengers);

    // Required fields
    expect(columns).toContain("id");
    expect(columns).toContain("userId");
    expect(columns).toContain("name");
    expect(columns).toContain("documentType");
    expect(columns).toContain("documentNumber");
    expect(columns).toContain("documentExpiryDate");
    expect(columns).toContain("isDeleted");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");

    // Optional fields
    expect(columns).toContain("nationality");
    expect(columns).toContain("gender");
    expect(columns).toContain("dateOfBirth");
    expect(columns).toContain("placeOfBirth");
    expect(columns).toContain("phone");
    expect(columns).toContain("email");
  });

  it("should have correct enum values for gender", () => {
    expect(genderEnum.enumName).toBe("gender");
    expect(genderEnum.enumValues).toEqual(["male", "female", "other"]);
  });

  it("should have correct enum values for document type", () => {
    expect(documentTypeEnum.enumName).toBe("document_type");
    expect(documentTypeEnum.enumValues).toEqual([
      "passport",
      "id_card",
      "other",
    ]);
  });
});
