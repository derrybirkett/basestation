import { defineConfig, devices } from '@playwright/test';

const PORT = 4200;
const HOST = '127.0.0.1';
const API_PORT = 8787;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: `http://${HOST}:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm nx serve api',
      url: `http://${HOST}:${API_PORT}/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: `pnpm exec vite apps/app --host ${HOST} --port ${PORT} --strictPort`,
      url: `http://${HOST}:${PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
