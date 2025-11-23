import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { PassengerFormData } from "@/components/flights/booking/passenger-form-card";
import type { SavedPassenger } from "@/types/dto";

import {
  isFormEmpty,
  savedPassengerToFormData,
  shouldShowDeleteButton,
  usePassengerForms,
} from "./use-passenger-forms";

describe("Helper Functions", () => {
  describe("isFormEmpty", () => {
    it("should return true for completely empty form", () => {
      const emptyForm: PassengerFormData = {
        name: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      };
      expect(isFormEmpty(emptyForm)).toBe(true);
    });

    it("should return false if name is filled", () => {
      const form: PassengerFormData = {
        name: "张三",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      };
      expect(isFormEmpty(form)).toBe(false);
    });

    it("should return false if documentNumber is filled", () => {
      const form: PassengerFormData = {
        name: "",
        documentType: "id_card",
        documentNumber: "123456789",
        phone: "",
      };
      expect(isFormEmpty(form)).toBe(false);
    });

    it("should return false if phone is filled", () => {
      const form: PassengerFormData = {
        name: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "13800138000",
      };
      expect(isFormEmpty(form)).toBe(false);
    });

    it("should return true even if documentType is changed (select field)", () => {
      const form: PassengerFormData = {
        name: "",
        documentType: "passport",
        documentNumber: "",
        phone: "",
      };
      expect(isFormEmpty(form)).toBe(true);
    });
  });

  describe("savedPassengerToFormData", () => {
    const mockSavedPassenger: SavedPassenger = {
      id: "passenger-1",
      name: "张三",
      documentType: "id_card",
      documentNumber: "123456789012345678",
      phone: "13800138000",
    };

    it("should convert saved passenger to form data without link", () => {
      const result = savedPassengerToFormData(mockSavedPassenger);
      expect(result).toEqual({
        name: "张三",
        documentType: "id_card",
        documentNumber: "123456789012345678",
        phone: "13800138000",
        linkedSavedPassengerId: undefined,
      });
    });

    it("should convert saved passenger to form data with link", () => {
      const result = savedPassengerToFormData(
        mockSavedPassenger,
        "passenger-1"
      );
      expect(result).toEqual({
        name: "张三",
        documentType: "id_card",
        documentNumber: "123456789012345678",
        phone: "13800138000",
        linkedSavedPassengerId: "passenger-1",
      });
    });

    it("should handle null values in saved passenger", () => {
      const passengerWithNulls: SavedPassenger = {
        id: "passenger-2",
        name: "John Doe",
        documentType: "passport",
        documentNumber: "A12345678",
        phone: null,
      };
      const result = savedPassengerToFormData(passengerWithNulls);
      expect(result).toEqual({
        name: "John Doe",
        documentType: "passport",
        documentNumber: "A12345678",
        phone: "",
        linkedSavedPassengerId: undefined,
      });
    });
  });

  describe("shouldShowDeleteButton", () => {
    it("should return false for single empty form", () => {
      const passengers: PassengerFormData[] = [
        {
          name: "",
          documentType: "id_card",
          documentNumber: "",
          phone: "",
        },
      ];
      expect(shouldShowDeleteButton(passengers)).toBe(false);
    });

    it("should return true for single filled form", () => {
      const passengers: PassengerFormData[] = [
        {
          name: "张三",
          documentType: "id_card",
          documentNumber: "",
          phone: "",
        },
      ];
      expect(shouldShowDeleteButton(passengers)).toBe(true);
    });

    it("should return true for multiple forms regardless of content", () => {
      const passengers: PassengerFormData[] = [
        {
          name: "",
          documentType: "id_card",
          documentNumber: "",
          phone: "",
        },
        {
          name: "张三",
          documentType: "id_card",
          documentNumber: "",
          phone: "",
        },
      ];
      expect(shouldShowDeleteButton(passengers)).toBe(true);
    });
  });
});

describe("usePassengerForms Hook", () => {
  const mockSavedPassengers: SavedPassenger[] = [
    {
      id: "passenger-1",
      name: "张三",
      documentType: "id_card",
      documentNumber: "123456789012345678",
      phone: "13800138000",
    },
    {
      id: "passenger-2",
      name: "李四",
      documentType: "passport",
      documentNumber: "A12345678",
      phone: "13900139000",
    },
  ];

  describe("Initial State", () => {
    it("should initialize with one empty form", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );
      expect(result.current.passengers).toHaveLength(1);
      expect(isFormEmpty(result.current.passengers[0])).toBe(true);
      expect(result.current.selectedPassengerIds).toEqual([]);
    });
  });

  describe("handleAddPassenger", () => {
    it("should add a new empty form", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleAddPassenger();
      });

      expect(result.current.passengers).toHaveLength(2);
      expect(isFormEmpty(result.current.passengers[1])).toBe(true);
    });

    it("should not affect existing forms", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handlePassengerChange(0, "name", "张三");
        result.current.handleAddPassenger();
      });

      expect(result.current.passengers[0].name).toBe("张三");
      expect(isFormEmpty(result.current.passengers[1])).toBe(true);
    });
  });

  describe("handleRemovePassenger", () => {
    it("should clear the last form when only one form exists", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handlePassengerChange(0, "name", "张三");
        result.current.handleRemovePassenger(0);
      });

      expect(result.current.passengers).toHaveLength(1);
      expect(isFormEmpty(result.current.passengers[0])).toBe(true);
    });

    it("should remove the form when multiple forms exist", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleAddPassenger();
        result.current.handlePassengerChange(0, "name", "张三");
        result.current.handlePassengerChange(1, "name", "李四");
        result.current.handleRemovePassenger(0);
      });

      expect(result.current.passengers).toHaveLength(1);
      expect(result.current.passengers[0].name).toBe("李四");
    });

    it("should correctly renumber forms after deletion", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleAddPassenger();
        result.current.handleAddPassenger();
        result.current.handlePassengerChange(0, "name", "张三");
        result.current.handlePassengerChange(1, "name", "李四");
        result.current.handlePassengerChange(2, "name", "王五");
        result.current.handleRemovePassenger(1);
      });

      expect(result.current.passengers).toHaveLength(2);
      expect(result.current.passengers[0].name).toBe("张三");
      expect(result.current.passengers[1].name).toBe("王五");
    });

    it("should unlink saved passenger when removing linked form", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
        result.current.handleAddPassenger();
      });

      expect(result.current.selectedPassengerIds).toContain("passenger-1");

      act(() => {
        result.current.handleRemovePassenger(0);
      });

      expect(result.current.selectedPassengerIds).not.toContain("passenger-1");
    });
  });

  describe("handlePassengerChange", () => {
    it("should update field value", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handlePassengerChange(0, "name", "张三");
      });

      expect(result.current.passengers[0].name).toBe("张三");
    });

    it("should unlink saved passenger when editing linked form", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.selectedPassengerIds).toContain("passenger-1");
      expect(result.current.passengers[0].linkedSavedPassengerId).toBe(
        "passenger-1"
      );

      act(() => {
        result.current.handlePassengerChange(0, "name", "修改后的名字");
      });

      expect(result.current.selectedPassengerIds).not.toContain("passenger-1");
      expect(
        result.current.passengers[0].linkedSavedPassengerId
      ).toBeUndefined();
      expect(result.current.passengers[0].name).toBe("修改后的名字");
    });

    it("should not affect other forms", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleAddPassenger();
        result.current.handlePassengerChange(0, "name", "张三");
        result.current.handlePassengerChange(1, "name", "李四");
      });

      act(() => {
        result.current.handlePassengerChange(0, "name", "修改后");
      });

      expect(result.current.passengers[0].name).toBe("修改后");
      expect(result.current.passengers[1].name).toBe("李四");
    });
  });

  describe("handleSelectSavedPassenger", () => {
    it("should fill first empty form when selecting saved passenger", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.passengers[0].name).toBe("张三");
      expect(result.current.passengers[0].linkedSavedPassengerId).toBe(
        "passenger-1"
      );
      expect(result.current.selectedPassengerIds).toContain("passenger-1");
    });

    it("should create new form if no empty form exists", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handlePassengerChange(0, "name", "手动填写");
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.passengers).toHaveLength(2);
      expect(result.current.passengers[1].name).toBe("张三");
      expect(result.current.passengers[1].linkedSavedPassengerId).toBe(
        "passenger-1"
      );
    });

    it("should deselect and remove form when clicking selected passenger", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
        result.current.handleAddPassenger();
      });

      expect(result.current.passengers).toHaveLength(2);

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.passengers).toHaveLength(1);
      expect(isFormEmpty(result.current.passengers[0])).toBe(true);
      expect(result.current.selectedPassengerIds).not.toContain("passenger-1");
    });

    it("should clear last form when deselecting only form", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.passengers[0].name).toBe("张三");

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.passengers).toHaveLength(1);
      expect(isFormEmpty(result.current.passengers[0])).toBe(true);
    });

    it("should handle multiple saved passengers", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
        result.current.handleSelectSavedPassenger("passenger-2");
      });

      expect(result.current.passengers).toHaveLength(2);
      expect(result.current.passengers[0].name).toBe("张三");
      expect(result.current.passengers[1].name).toBe("李四");
      expect(result.current.selectedPassengerIds).toEqual([
        "passenger-1",
        "passenger-2",
      ]);
    });
  });

  describe("Corner Cases", () => {
    it("Corner Case 1: Select, edit, then select same passenger again", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      // Select passenger A
      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.passengers[0].linkedSavedPassengerId).toBe(
        "passenger-1"
      );

      // Edit the form (unlinks it)
      act(() => {
        result.current.handlePassengerChange(0, "name", "修改后");
      });

      expect(
        result.current.passengers[0].linkedSavedPassengerId
      ).toBeUndefined();

      // Select passenger A again
      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      // Should create a new form with A's data
      expect(result.current.passengers).toHaveLength(2);
      expect(result.current.passengers[0].name).toBe("修改后");
      expect(result.current.passengers[1].name).toBe("张三");
      expect(result.current.passengers[1].linkedSavedPassengerId).toBe(
        "passenger-1"
      );
    });

    it("Corner Case 2: Select A, select B, deselect A", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
        result.current.handleSelectSavedPassenger("passenger-2");
      });

      expect(result.current.passengers).toHaveLength(2);

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.passengers).toHaveLength(1);
      expect(result.current.passengers[0].name).toBe("李四");
      expect(result.current.selectedPassengerIds).toEqual(["passenger-2"]);
    });

    it("Corner Case 3: Manual fill, then select saved passenger", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handlePassengerChange(0, "name", "手动填写");
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.passengers).toHaveLength(2);
      expect(result.current.passengers[0].name).toBe("手动填写");
      expect(
        result.current.passengers[0].linkedSavedPassengerId
      ).toBeUndefined();
      expect(result.current.passengers[1].name).toBe("张三");
      expect(result.current.passengers[1].linkedSavedPassengerId).toBe(
        "passenger-1"
      );
    });

    it("Corner Case 4: Delete middle form from three forms", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handlePassengerChange(0, "name", "Form 1");
        result.current.handleAddPassenger();
        result.current.handlePassengerChange(1, "name", "Form 2");
        result.current.handleAddPassenger();
        result.current.handlePassengerChange(2, "name", "Form 3");
      });

      act(() => {
        result.current.handleRemovePassenger(1);
      });

      expect(result.current.passengers).toHaveLength(2);
      expect(result.current.passengers[0].name).toBe("Form 1");
      expect(result.current.passengers[1].name).toBe("Form 3");
    });

    it("Corner Case 5: Select passenger, add form, deselect passenger", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
        result.current.handleAddPassenger();
      });

      expect(result.current.passengers).toHaveLength(2);

      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });

      expect(result.current.passengers).toHaveLength(1);
      expect(isFormEmpty(result.current.passengers[0])).toBe(true);
    });

    it("Corner Case 6: Rapid toggle of same passenger", () => {
      const { result } = renderHook(() =>
        usePassengerForms(mockSavedPassengers)
      );

      // Select
      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });
      expect(result.current.selectedPassengerIds).toContain("passenger-1");

      // Deselect
      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });
      expect(result.current.selectedPassengerIds).not.toContain("passenger-1");

      // Select again
      act(() => {
        result.current.handleSelectSavedPassenger("passenger-1");
      });
      expect(result.current.selectedPassengerIds).toContain("passenger-1");
    });
  });
});
