import { defineConfig } from '@playwright/test'
export default defineConfig({
    testDir: './e2e-local',
    workers: 1,
    use: {
        baseURL: 'http://127.0.0.1:5189',
        headless: true,
        launchOptions: process.env.CHROME_PATH
            ? { executablePath: process.env.CHROME_PATH }
            : {},
    },
    webServer: {
        command: 'corepack yarn dev:demo',
        url: 'http://127.0.0.1:5189',
        reuseExistingServer: !process.env.CI,
    },
})
