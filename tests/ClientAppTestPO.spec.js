const { test, expect } = require('@playwright/test')
const {POManager} = require('../pageobjects/POManager');


test('Client App test', async ({ page }) => {

    const productName = "ZARA COAT 3";
    const emailid = "chand7272@gmail.com";
    
    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage();

    await loginPage.navigate();
    await loginPage.ApplicationLogin(process.env.USER_EMAIL, process.env.USER_PASSWORD);

   // await page.waitForLoadState('networkidle');

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart()


    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    await ordersReviewPage.SelectExpiryDate("12", "29");
    await ordersReviewPage.FillCardDetails('1234','Ramesh Kumar');
    await ordersReviewPage.ApplyCoponAndVerify('rahulshettyacademy');
    await ordersReviewPage.VerifyEmailId(process.env.USER_EMAIL);

    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();   

})


