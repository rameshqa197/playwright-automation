const { test, expect } = require('@playwright/test')


test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'})


test("Alert validation and action", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.once('dialog', async dialog => {
        console.log('Alert text:', dialog.message());
        await dialog.accept(); // Click OK on the alert
    });
    await page.click('#confirmbtn'); // Trigger the alert

})


test("Handling All Frames", async ({page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const frames = page.frames();
    for (const frame of frames) {
        const frameName = frame.name() || "Unnamed Frame";
        console.log(`Switching to frame: ${frameName}`);

        // Get text from the entire frame
        const text = await frame.textContent('body');
        //console.log(`Text in ${frameName}: ${text}`);
    }

})

//screenshot -store -> screenshot
test("Screenshot & Visual comparision", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    //2. Capture a Specific Element Screenshot
    await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' });
    await page.locator("#hide-textbox").click();
    //3. Capture a Screenshot for full page
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await page.screenshot({ path: `screenshot-${Date.now()}.png`, fullPage: true });
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//screenshot -store -> screenshot -> 
test('visual', async ({ page }) => {
    //make payment -when you 0 balance
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //expect(await page.screenshot()).toMatchSnapshot('landing.png');

})





