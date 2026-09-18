import { defineConfig } from '@playwright/test'
export default defineConfig({
    testDir: './e2e-visitor',
    workers: 1,
    use: {
        baseURL: process.env.VISITOR_URL || 'http://127.0.0.1:5211',
        launchOptions: process.env.CHROME_PATH
            ? { executablePath: process.env.CHROME_PATH }
            : {},
    },
    webServer: process.env.VISITOR_URL
        ? undefined
        : {
              command: 'corepack yarn dev:visitor',
              url: 'http://127.0.0.1:5211',
              reuseExistingServer: false,
          },
})
