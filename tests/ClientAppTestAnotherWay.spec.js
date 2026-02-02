const { test, expect } = require('@playwright/test')
 const logger= require('../utils/logger')


test('Client App test on another way', async ({ browser }) => {

    logger.info("Launch the browser istance !!")

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const signInBtn = page.locator('#login')
    const products = page.locator('.card-body')
    const productName = "ZARA COAT 3";
    const cartOption = page.locator('[routerlink*="cart"]');

    const emailid = "chand7272@gmail.com";

    await page.goto('https://rahulshettyacademy.com/client')
    await page.getByPlaceholder('email@example.com').fill(emailid);
    await page.getByPlaceholder('enter your passsword').fill('Ramesh#12345');
    await page.getByRole('button', { name: 'Login' }).click();

   // await page.waitForLoadState('networkidle');
    await products.first().waitFor()

    await page.locator('.card-body').filter({ hasText: productName }).getByRole('button', { name: 'Add To Cart' }).click();
    await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
    await page.locator('div li').first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();
    await page.locator('text=Checkout').click();
    await page.getByPlaceholder('Select Country').pressSequentially('ind');
    await page.getByRole('button', { name: 'India' }).nth(1).click();
    await expect(page.locator('label[type="text"]')).toHaveText(emailid);
    await page.locator('(//input[@type="text"])[2]').fill('1234');
    await page.locator('(//input[@type="text"])[3]').fill('12345678901234');
    await page.locator('(//input[@type="text"])[4]').fill('rahulshettyacademy');
    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    await expect(page.locator('.mt-1.ng-star-inserted')).toHaveText('* Coupon Applied');

    //await page.getByRole('button', {name : 'Place Order '}).click();

      await page.getByText("PLACE ORDER").click();

    const confirmationmsg = await page.locator('.hero-primary').textContent();
    console.log(confirmationmsg);
    expect(confirmationmsg).toBe(" Thankyou for the order. ");

    const orderId = (await page.locator('.em-spacer-1 label').last().textContent() || '').trim();
    console.log(orderId);


})


