const { test,expect } = require('@playwright/test');
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

    await page.locator("button[routerlink*='myorders']").click();    
})