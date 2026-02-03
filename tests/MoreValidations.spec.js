const { test, expect } = require('@playwright/test')
const fs = require('fs');

//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'})



test("Alert validation and action", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog', async dialog => {
        console.log('Alert text:', dialog.message());
        await dialog.accept(); // Click OK on the alert
    });
    await page.click('#confirmbtn'); // Trigger the alert

})


test("Handling alert for confiration button(dismiss)" ,async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/", { timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
    
    page.on('dialog', async (dialog)=>{
        console.log("Alert message: "+dialog.message());
        await dialog.dismiss(); // Click Cancel on the alert

    })
    await page.locator("#confirmbtn").click();
})



test("Handling All Frames", async ({page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/", { timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
    
    const frames = page.frames();
    for (const frame of frames) {
        const frameName = frame.name() || "Unnamed Frame";
        console.log(`Switching to frame: ${frameName}`);
    }

   const frameloc=await page.frameLocator("#courses-iframe");
   await frameloc.locator("a[href*='consulting']").first().click();
   const text = await frameloc.locator("div[class='inner-box'] h1").innerText();
   console.log(text);
   expect(text).toBe("JOB SUPPORT");

   expect(await page.locator("//legend[text()='Checkbox Example']")).toBeVisible();
  

})

//screenshot -store -> screenshot
test("Screenshot & Visual comparision", async ({ page }, testInfo) => {
    const fileName = `screenshots/${testInfo.title}_${Date.now()}.png`;
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    //2. Capture a Specific Element Screenshot
    await page.locator('#displayed-text').screenshot({ path: 'screenshots/partialScreenshot.png' });
    await page.locator("#hide-textbox").click();
    //3. Capture a Screenshot for full page
    await page.screenshot({ path: fileName, fullPage: true });
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//screenshot -store -> screenshot -> 
test('visual', async ({ page }) => {
    //make payment -when you 0 balance
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //expect(await page.screenshot()).toMatchSnapshot('landing.png');

})


test("Upload file", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/upload");
    //1. Set the file to upload
    const filePath = 'Testdata/adidas.jpg';
    //set single imput file
    await page.locator('#file-upload').setInputFiles(filePath);
    //set multiple input files if aplication suppoerts
    //await page.locator('#file-upload').setInputFiles(['test-data/adidas.jpg','test-data/adidas1.jpg']);
    
    //2. Click the upload button
    await page.locator('#file-submit').click();
    //3. Verify the file upload success message
    const uploadMessage = await page.locator('div.example h3').textContent();
    expect(uploadMessage).toBe('File Uploaded!');

   // ✅ Verify uploaded file name
   await expect(page.locator('#uploaded-files')).toHaveText('adidas.jpg');
    
})
    

test("download file", async ({page})=>{

    await page.goto("https://the-internet.herokuapp.com/download");

    // ✅ Create folder if not exists
    if (!fs.existsSync('download_file')) {
        fs.mkdirSync('download_file');
    }
    //1. Initiate the file download
    const [ download ] = await Promise.all([
        page.waitForEvent('download'), // Waits for the download to start
        page.locator('#content a').first().click() // Triggers the download
    ]);

    

    const filePath = `download_file/${download.suggestedFilename()}`;
    await download.saveAs(filePath);
    //2. Verify the file has been downloaded
    console.log(`File downloaded to: ${filePath}`);
    expect(fs.existsSync(filePath)).toBeTruthy();
})


