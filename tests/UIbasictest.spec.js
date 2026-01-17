const { test, expect } = require('@playwright/test');

test('Ui basic test with login', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username')
    const password = page.locator('#password')
    const signInBtn = page.locator('#signInBtn')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await userName.fill('rahulshettyacademy');
    await password.fill('learning1');
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());

    await userName.fill("");
    await password.fill("");
    await userName.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInBtn.click();

    //await page.waitForLoadState('networkidle');
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

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await userName.fill('rahulshettyacademy');
    await password.fill('learning');
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

    await userName.fill(domainName);

    console.log(await page.locator('#username').inputValue());


});