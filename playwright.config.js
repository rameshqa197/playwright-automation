/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  retries: 0,
  workers: 1,

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
      use: {
        browserName: 'chromium',
        headless: process.env.CI === 'true' || process.env.PLAYWRIGHT_HEADLESS === 'true' ? true : false,
        video: 'retain-on-failure', // Saves video only for failed tests
        screenshot: 'only-on-failure', //on ,off,alway
        trace: 'retain-on-failure',//off,on} 
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
