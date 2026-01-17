// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  retries: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  //reporter: 'html',

  reporter: [
    ['html', { open: 'never' }],       // Playwright HTML Report
    ['allure-playwright']              // Allure Results
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
   use: {
    browserName: 'chromium',
    headless: true,               // Run in headless mode
    screenshot: 'only-on-failure',
    //video: 'retain-on-failure',   // Video only for failed tests
    trace: 'retain-on-failure',      // Capture trace for debugging
  },


});

