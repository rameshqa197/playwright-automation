/** @type {import('@playwright/test').PlaywrightTestConfig} */

const dotenv = require('dotenv');

const envArg = process.argv.find(arg => arg.startsWith('--env='));
const environment = envArg?.split('=')[1] || 'dev';

dotenv.config({ path: `.env.${environment}` });

console.log(`Running tests on environment: ${environment}`);
console.log(`🔗 Base URL: ${process.env.BASE_URL}\n`);


const config = {
  testDir: './tests',
  retries: 0,
  workers: 4,

  /* Maximum time one test can run for. */
  timeout: 60 * 1000, // Increased from 30s to 60s for CI stability
  expect: {

    timeout: 10000 /* Increased assertion timeout from 5s to 10s */
  },

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
      baseURL: process.env.BASE_URL, // ✅ Dynamic baseURL from environment
      use: {
        browserName: 'chromium',
        headless: process.env.CI === 'true' || process.env.PLAYWRIGHT_HEADLESS === 'true' ? true : false,
        video: 'off', // Disabled to save storage
        screenshot: 'only-on-failure', //on ,off,alway
        trace: 'off', // Disabled to save storage
      }
    },
    /*{ 
      name: 'firefox', 
      use: { 
        browserName: 'firefox' ,
        headless: false,
        video: 'retain-on-failure', // Saves video only for failed tests
        screenshot: 'only-on-failure', //on ,off,alway
        trace: 'retain-on-failure',//off,on
      } 
    },

    { name: 'webkit', 
      use: { 
        browserName: 'webkit',
        headless: false,
        video: 'retain-on-failure', // Saves video only for failed tests
        screenshot: 'only-on-failure', //on ,off,alway
        trace: 'retain-on-failure',//off,on

      }
    }, */
  ],

};

module.exports = config;
