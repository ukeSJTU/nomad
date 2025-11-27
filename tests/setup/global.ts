import "@testing-library/jest-dom/vitest";

// Polyfill for ResizeObserver (needed for Radix UI components)
if (typeof ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Mock console methods to suppress component outputs during tests.
// Uncomment the following lines and import `vi` from vitest when you need to silence logs:
// import { vi } from "vitest";
// vi.spyOn(console, "log").mockImplementation(() => {});
// vi.spyOn(console, "warn").mockImplementation(() => {});
// vi.spyOn(console, "error").mockImplementation(() => {});
// vi.spyOn(console, "info").mockImplementation(() => {});
// vi.spyOn(console, "debug").mockImplementation(() => {});
