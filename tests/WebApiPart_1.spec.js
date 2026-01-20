
const { test, expect, request } = require('@playwright/test')
const{getDbData}= require('../utils/dbUtils');

const loginPayload = { userEmail: "chand7272@gmail.com", userPassword: "Ramesh#12345" };
const orderpayload = {
    orders: [{country: "India",productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let token;
let orderId;
let productOrderId;
let message;
test.beforeAll(async () => {


    //Create API context for making API requests
    const apiContext = await request.newContext();
    const apiResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayload
        }
    )

    expect(apiResponse.status()).toBe(200);
    const apiResponseJson = await apiResponse.json();
    token = apiResponseJson.token;

    //cCreate API for order creation and passing to the test case

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderpayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    expect(orderResponse.status()).toBe(201);
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
    productOrderId =orderResponseJson.productOrderId[0];
    message = orderResponseJson.message;


});


test.afterAll(async () => {
    console.log("This is after all tests")

});


test.beforeEach(async () => {
    console.log("This is before each test")
})


test.afterEach('This is after each test', async () => {
    console.log("This is after each test")
})


test('Client App test on another way', async ({ page }) => {
    
    const products = page.locator('.card-body')
    const productName = "ZARA COAT 3";
    const emailid = "chand7272@gmail.com";

    await page.context().addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);


    await page.goto('https://rahulshettyacademy.com/client')
    await products.first().waitFor()

    const productTitles = await products.locator('b').allTextContents();
    console.log(productTitles);

    console.log(orderId);
    console.log("Product order details: ", productOrderId);
    console.log(message);

    const dbQuery = `SELECT productname FROM testingipay.login_data WHERE username='${emailid}'`;
    const dbData = await getDbData(dbQuery);
    console.log("DB Data is : ", dbData);

   
    const productInDb = dbData.map(b => b.productname);
    console.log("Product in DB: ", productInDb);

    expect(productInDb).toContain(productOrderId);
    //expect(dbData[0].productname).toBe(productOrderId);
   

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
    console.log("Product order Id are :: ", orderIdDetails);
    expect(orderId.includes(orderIdDetails.trim())).toBeTruthy();


})


