
const { test, expect ,request } = require('@playwright/test');
const{APiUtils} = require('../utils/APiUtils');


const loginPayload= {userEmail: "chand7272@gmail.com",userPassword: "Ramesh#12345" };
const orderPayload= {orders: [{country: "India",productOrderedId: "6960eac0c941646b7a8b3e68"}]};


let response;
test.beforeAll(async () => {

    const apiContext =await request.newContext()
    const apiUtils =new APiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});


test('WebAPi Itegration with Login and order details !!', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value)}, response.token    
    );

    const products = page.locator('.card-body')
    const productName = "ZARA COAT 3";
    const emailid = "chand7272@gmail.com";

    await page.goto('https://rahulshettyacademy.com/client')
    await products.first().waitFor()

    console.log(response.orderId);

    await page.locator('button[routerlink*=myorders]').click();
    await page.locator('tbody').first().waitFor();
    const orderRows = page.locator('tbody tr');
    const orderRowCount = await orderRows.count();

    for( let i=0; i< orderRowCount; i++) {
        const rowOrderId = await orderRows.nth(i).locator('th').textContent();
        if(response.orderId.includes(rowOrderId.trim())) {

            await orderRows.nth(i).locator('.btn.btn-primary').click();
            break;

        }
    }

    const orderIdDetails = await page.locator('.col-text.-main').textContent();
    expect(response.orderId.includes(orderIdDetails.trim())).toBeTruthy();
    
    const DeliveryAddress= await page.locator('p.text').nth(2).textContent();
    console.log(DeliveryAddress);
    expect(DeliveryAddress.includes(emailid)).toBeTruthy();
    
    const expectProd= await page.locator(".title").textContent();
    expect(expectProd.trim()).toBe(productName);


})


