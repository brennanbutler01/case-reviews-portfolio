import { defineConfig } from '@playwright/test'
export default defineConfig({
    testDir: './e2e-portfolio',
    workers: 1,
    use: {
        baseURL: process.env.PORTFOLIO_URL || 'http://127.0.0.1:5191',
        headless: true,
        launchOptions: process.env.CHROME_PATH
            ? { executablePath: process.env.CHROME_PATH }
            : {},
    },
    webServer: process.env.PORTFOLIO_URL
        ? undefined
        : {
              command:
                  'corepack yarn preview --host 127.0.0.1 --port 5191 --strictPort',
              url: 'http://127.0.0.1:5191',
              reuseExistingServer: false,
          },
})
