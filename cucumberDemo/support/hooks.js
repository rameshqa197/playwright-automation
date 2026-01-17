const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(60 * 1000); // 60s timeout for each step

Before(async function () {
  // Launch Browser
  this.browser = await chromium.launch({ headless: false });

  // Create Context & Page
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  console.log("Browser & Page initialized");
});

After(async function () {
  // Cleanup
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();

  console.log("Browser closed after scenario");
});
