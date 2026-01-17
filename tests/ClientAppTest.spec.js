const { test, expect } = require('@playwright/test')


test('Client App test without PO', async ({ browser }) => {

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
    await userName.fill(emailid);
    await password.fill('Ramesh#12345');
    await signInBtn.click();

    //await page.waitForLoadState('networkidle');
    await products.first().waitFor()
    const productTitles = await products.locator('b').allTextContents();
    console.log(productTitles);

    const productCnt = await products.count();

    for (let i = 0; i < productCnt; i++) {

        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }

    }
    await cartOption.click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
    console.log(bool);
    expect(bool).toBeTruthy();

    await page.locator('text=Checkout').click();
    await page.locator('[placeholder="Select Country"]').pressSequentially('ind');

    const dropdownOptions = page.locator('.ta-results');
    await dropdownOptions.waitFor();
    const optionCnt = await dropdownOptions.locator('button').count();

    for (let i = 0; i < optionCnt; i++) {
        const text = await dropdownOptions.locator('button').nth(i).textContent();
        if (text.trim() === "India") {
            await dropdownOptions.locator('button').nth(i).click();
            break;
        }
    }

    await expect(page.locator('label[type="text"]')).toHaveText(emailid);
    
    await page.locator('(//input[@type="text"])[2]').fill('1234');
    await page.locator('(//input[@type="text"])[3]').fill('12345678901234');
    await page.locator('(//input[@type="text"])[4]').fill('rahulshettyacademy');

    await page.getByRole('button',{ name: 'Apply Coupon' }).click();
    await expect(page.locator('.mt-1.ng-star-inserted')).toHaveText('* Coupon Applied');
    await page.locator('a:has-text("Place Order")').click();


    const confirmationmsg = await page.locator('.hero-primary').textContent();
    console.log(confirmationmsg);
    expect(confirmationmsg).toBe(" Thankyou for the order. ");

    const orderId = (await page.locator('.em-spacer-1 label').last().textContent() || '').trim();
    console.log(orderId);


    await page.locator('button[routerlink*=myorders]').click();
    await page.locator('tbody').first().waitFor();
    const orderRows = page.locator('tbody tr');
    const orderRowCount = await orderRows.count();

    for( let i=0; i< orderRowCount; i++) {
        const rowOrderId = await orderRows.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderId.trim())) {

            await orderRows.nth(i).locator('.btn.btn-primary').click();
            break;

        }
    }

    const orderIdDetails = await page.locator('.col-text.-main').textContent();
    expect(orderId.includes(orderIdDetails.trim())).toBeTruthy();

    
    const DeliveryAddress= await page.locator('p.text').nth(2).textContent();
    console.log(DeliveryAddress);
    expect(DeliveryAddress.includes(emailid)).toBeTruthy();
    
    const expectProd= await page.locator(".title").textContent();
    expect(expectProd.trim()).toBe(productName);





})


