import "@testing-library/jest-dom/vitest";

// Polyfill for ResizeObserver (needed for Radix UI components)
if (typeof ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
