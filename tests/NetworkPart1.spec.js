const { test, expect ,request } = require('@playwright/test');
const{APiUtils} = require('../utils/APiUtils');

const loginPayload= {userEmail: "chand7272@gmail.com",userPassword: "Ramesh#12345" };
const orderPayload= {orders: [{country: "India",productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;
test.beforeAll(async () => {
    const apiContext =await request.newContext()
    const apiUtils = new APiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});


test(' @API WebAPi Itegration with Login and order details !!', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)}, response.token    
    );

    const products = page.locator('.card-body')
    const productName = "ZARA COAT 3";
    const emailid = "chand7272@gmail.com";

    await page.goto(process.env.BASE_URL)
    await products.first().waitFor()
    console.log(response.orderId);

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
       
        async route => {
            const response = await page.request.fetch(route.request());
            let bodyData = JSON.stringify(fakePayLoadOrders);

            route.fulfill({
                response,
                body: bodyData,
            });
        //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        },
    )

    await page.locator('button[routerlink*=myorders]').click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    
    console.log(await page.locator(".mt-4").textContent());
    expect(await page.locator(".mt-4").textContent()).toContain("No Orders");

})


