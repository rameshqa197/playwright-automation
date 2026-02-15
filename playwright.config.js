import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment files
// 1) Base .env (lets you define TEST_ENV and shared defaults)
// 2) Environment-specific .env.<env>
dotenv.config({ path: '.env' });
const env = process.env.TEST_ENV || 'dev';

dotenv.config({
  path: `.env.${env}`,
  override: true
});

// BASE URL Priority
// 1️⃣ CI variable
// 2️⃣.env variable
// 3️⃣ Fallback
const baseURL =
  process.env.BASE_URL_AUTOMATION ||
  process.env.BASE_URL ||
  process.env.BASE_URL_API ||
  process.env.API_BASE_URL ||'https://rahulshettyacademy.com';

console.log(`Running tests on ENV: ${env}`);
console.log(`Base URL: ${baseURL}`);

// Worker calculation
const workers =
  process.env.WORKERS ? Number(process.env.WORKERS): process.env.CI === 'true'? 2: undefined;

export default defineConfig({

  testDir: './tests',
  retries: 0,
  workers,
  timeout: 60 * 1000,
  expect: { timeout: 10000},

  reporter: [
    ['line'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['allure-playwright', {
      outputFolder: 'allure-results'
    }]
  ],

  projects: [
    {
      name: 'chromium',

      use: {
        browserName: 'chromium',
        baseURL,     // ⭐ FIXED — Now available in tests
        headless:process.env.CI === 'true' || process.env.HEADLESS === 'true' ? true : false,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
      }
    }

    // Uncomment when needed
    /*
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        baseURL,
        headless: false,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
      }
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        baseURL,
        headless: false,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
      }
    }
    */
  ]
});
