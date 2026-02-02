// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  retries: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: [
    ['html', { open: 'never' }],   // Playwright HTML report
    ['line'],
    ['allure-playwright']          // Allure results
  ],
   use: {
  
    baseURL: process.env.BASE_URL || 'http://localhost',
    browserName: 'chromium',
    headless: process.env.HEADLESS === 'true',              // Run in headless mode
    screenshot: 'only-on-failure',
    //video: 'retain-on-failure',   // Video only for failed tests
    trace: 'retain-on-failure',      // Capture trace for debugging
  },
  workers: 2,

});

