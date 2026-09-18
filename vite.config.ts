import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'setup.ts',
        exclude: [
            ...configDefaults.exclude,
            './tests/*',
            './tests-examples/*',
            './e2e-local/*',
            './e2e-portfolio/*',
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },
})
