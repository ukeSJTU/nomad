import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("px-2", "py-4");
    expect(result).toBe("px-2 py-4");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("should handle false conditional classes", () => {
    const isActive = false;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class");
  });

  it("should merge conflicting Tailwind classes", () => {
    // twMerge should merge conflicting Tailwind classes
    const result = cn("px-2 px-4");
    expect(result).toBe("px-4");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["px-2", "py-4"], "text-center");
    expect(result).toBe("px-2 py-4 text-center");
  });

  it("should handle objects with boolean values", () => {
    const result = cn({
      "px-2": true,
      "py-4": true,
      hidden: false,
      block: true,
    });
    expect(result).toBe("px-2 py-4 block");
  });

  it("should handle mixed input types", () => {
    const result = cn(
      "base-class",
      ["array-class-1", "array-class-2"],
      {
        "conditional-true": true,
        "conditional-false": false,
      },
      undefined,
      null,
      "final-class"
    );
    expect(result).toBe(
      "base-class array-class-1 array-class-2 conditional-true final-class"
    );
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle undefined and null values", () => {
    const result = cn("valid-class", undefined, null, "another-class");
    expect(result).toBe("valid-class another-class");
  });

  it("should resolve Tailwind class conflicts correctly", () => {
    const result = cn("bg-red-500 bg-blue-500", "text-sm text-lg");
    expect(result).toBe("bg-blue-500 text-lg");
  });

  it("should handle complex Tailwind class merging", () => {
    const result = cn(
      "px-2 py-1 bg-red-500",
      "px-4 bg-blue-500",
      "hover:bg-green-500"
    );
    expect(result).toBe("py-1 px-4 bg-blue-500 hover:bg-green-500");
  });
});
