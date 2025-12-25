import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    // These e2e tests load a built browser extension, which requires a headed browser.
    // In CI, we provide a virtual display via Xvfb (see .github/workflows/ci.yml).
    headless: false,

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },

  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
