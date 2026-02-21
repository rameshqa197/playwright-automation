const { test, expect } = require('@playwright/test');
const { request } = require('http');


test('@API Network call for abort and print all API request and reponse status', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("chand7272@gmail.com");
    await page.locator("#userPassword").fill("Ramesh#12345");
    await page.locator("[value='Login']").click();
    //await page.route("**/*.{png,jpg,jpeg}", route => route.abort());
    await page.locator(".card-body b").first().waitFor();

    page.on('request', request => {
        console.log('>>', request.method(), request.url());
    });

    page.on('response', response => console.log('<<', response.status(), response.url()));

    // ✅ abort orders API (register BEFORE navigation)
    await page.route('**/api/ecom/order/get-orders-for-customer/*', async route => {
        console.log('BLOCKED:', route.request().url());
        // await route.abort('failed');
        // await route.abort('aborted');
         await route.abort('timedout');
        // await route.abort('accessdenied');
    });
    await page.locator("button[routerlink*='myorders']").click();
    await page.close()


})