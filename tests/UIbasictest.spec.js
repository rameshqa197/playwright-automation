const { test, expect } = require('@playwright/test');

test('Ui basic test with login', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username')
    const password = page.locator('#password')
    const signInBtn = page.locator('#signInBtn')
    const passwordLoc= page.locator('b:nth-child(2) i:nth-child(1)')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await userName.fill('rahulshettyacademy');
    await password.fill('learning1');
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());

    await userName.fill("");
    await password.fill("");
    await userName.fill('rahulshettyacademy');
    await password.fill(await passwordLoc.textContent());
    await signInBtn.click();

    await page.waitForLoadState('networkidle');
    await page.waitForSelector(".card-body a");

    const allTexts = await page.locator(".card-body a").allTextContents();
    console.log(allTexts);

})



test('Ui basic test with more fields validation', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username')
    const password = page.locator('#password')
    const signInBtn = page.locator('#signInBtn')
    const radioUser = page.locator("#usertype")
    const optionConfirm = page.locator(".btn-success")
    const dropdownSelection = page.locator("select[class='form-control']")
    const termsCheckbox = page.locator("#terms")
    const passwordLoc= page.locator('b:nth-child(2) i:nth-child(1)')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await userName.fill('rahulshettyacademy');
   await password.fill(await passwordLoc.textContent());
    await radioUser.last().click();
    await optionConfirm.click();
    await expect(radioUser.last()).toBeChecked();

    await dropdownSelection.selectOption('consult');

    await termsCheckbox.click();
    await expect(termsCheckbox).toBeChecked();
    await termsCheckbox.uncheck();
    await expect(termsCheckbox.isChecked()).resolves.toBeFalsy();


    await signInBtn.click();
    
    //await page.waitForLoadState('networkidle');
    await page.waitForSelector(".card-body a");
    const allTexts = await page.locator(".card-body a").allTextContents();
    console.log(allTexts);

})


test('UI basic test with child window handlers ', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username')
    const password = page.locator('#password')

    const passwordLoc= page.locator('b:nth-child(2) i:nth-child(1)')

    const documentsRequestLink = page.locator('[href *= "documents-request"]');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    await expect(documentsRequestLink).toHaveAttribute('class', 'blinkingText');
    await expect(documentsRequestLink).toBeVisible();


     //resolve ,Rejected and Pendinng promises
    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        await documentsRequestLink.click(),
    ])
 
    const chlidpageText = await childPage.locator('.im-para.red').textContent();
    console.log(chlidpageText);


    const arrayText = chlidpageText.split("@");
    const domainName = arrayText[1].split(" ")[0];
    console.log(domainName);
    await childPage.close();

    // Bring parent to front
    await page.bringToFront();

// Debug: check URL
    console.log('Parent URL:', page.url());

    await userName.fill(domainName.split(".")[0]);
    await password.fill(await passwordLoc.textContent());

    console.log(await page.locator('#username').inputValue());
    console.log(await password.inputValue());

    await page.locator('#signInBtn').click();


    const homepage = await page.locator('.navbar-brand').first().textContent();
    console.log(homepage);
    await expect(homepage).toBe('ProtoCommerce');


     await page.waitForSelector(".card-body a");
    const allTexts = await page.locator(".card-body a").allTextContents();
    console.log(allTexts);



});


test("Mutltile windows handlers", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');  

    // Listen for new page event
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('#openwindow').click()       
    ])

    await newPage.locator('body').waitFor();

    console.log(await newPage.title());
    console.log(await newPage.url());

    await newPage.close();
    console.log(await page.title());
    console.log(await page.url());

})

test('dropdown handling', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const dropdown = page.locator('#dropdown-class-example'); 
   // await dropdown.selectOption('option2');
    await dropdown.selectOption({ label: 'Option2' });
    console.log(await dropdown.inputValue());
    expect(await dropdown.inputValue()).toBe('option2');

    await page.locator('input[name="radioButton"][value="radio1"]').check();
    
});     