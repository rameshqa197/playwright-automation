const {test} = require("@playwright/test");

test("keyboardaction.spec.js", async ({page}) => {

    await page.goto("https://www.google.com");
    await page.locator('textarea[name="q"]').type('hellow', { delay: 100 });
    await page.keyboard.press('Enter');

    await page.pause()
   


})