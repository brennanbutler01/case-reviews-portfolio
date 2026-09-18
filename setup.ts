import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import * as resizeObserver from 'resize-observer-polyfill'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

global.ResizeObserver = resizeObserver.default

// extends Vitest's expect method with methods from react-testing-library

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup()
})
