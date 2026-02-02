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
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
      categories: [
        {
          name: 'Ignored tests',
          matchedStatuses: ['skipped']
        },
        {
          name: 'Infrastructure problems',
          matchedStatuses: ['broken', 'failed'],
          messageRegex: '.*broken.*'
        },
        {
          name: 'Outdated tests',
          matchedStatuses: ['broken'],
          traceRegex: '.*FileNotFoundException.*'
        },
        {
          name: 'Product defects',
          matchedStatuses: ['failed']
        }
      ],
      environmentInfo: {
        os_platform: process.env.OS || process.platform,
        os_release: process.env.OS_VERSION || 'unknown',
        os_version: process.env.OS_VERSION || 'unknown',
        browser: 'chromium',
        node_version: process.version
      }
    }]          // Allure results with detailed configuration
  ],
   use: {
  
    baseURL: process.env.BASE_URL || 'http://localhost',
    browserName: 'chromium',
    headless: process.env.HEADLESS === 'true',              // Run in headless mode
    screenshot: 'only-on-failure',
    //video: 'retain-on-failure',   // Video only for failed tests
    trace: 'retain-on-failure',      // Capture trace for debugging
  },
  workers: 1,  // Disabled parallel execution - run tests sequentially

});

