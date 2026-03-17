import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Basic setup for jsdom
window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));
