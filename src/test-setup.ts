import "@testing-library/jest-dom/vitest";

// Polyfill for ResizeObserver (needed for Radix UI components)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
