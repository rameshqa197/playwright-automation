const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');


// Before(async function () {
//   this.browser = await chromium.launch({ headless: false });
//   this.context = await this.browser.newContext();
//   this.page = await this.context.newPage();
// });

// After(async function () {
//   await this.page.close();
//   await this.context.close();
//   await this.browser.close();
// });

Given('User is on the online shopping homepage', async function () {
  await this.page.goto("https://teststore.automationtesting.co.uk/index.php");
});

When('User enters valid username {string} and password {string} and clicks on login', async function (UserName, Password) {
  await this.page.locator('span:has-text("Sign in")').click();
  await this.page.locator('#field-email').fill(UserName);
  await this.page.locator('#field-password').fill(Password);
  await this.page.getByRole('button', { name: 'Sign in' }).click();
  await this.page.waitForLoadState('networkidle');
});

When('User searches for {string} and add to cart', async function (productName) {

  const productTile = this.page.locator(".h3.product-title")
  const count = await productTile.count();

  for (let i = 0; i < count; i++) {
    const producttxt = (await productTile.nth(i).textContent()).trim();
    if (producttxt.includes(productName)) {
      await productTile.nth(i).click();
      break;
    }
  }

  await expect(this.page.locator(".h1")).toContainText(productName);
});

Then('The product should be added to the cart successfully', async function () {

  const addToCart = this.page.getByRole('button', { name: 'Add to cart' });
  await this.page.waitForTimeout(3000); // Wait 2 seconds
  await expect(addToCart).toBeVisible();
  await expect(addToCart).toBeEnabled();
  await addToCart.click();

  await expect(this.page.locator("#myModalLabel")).toContainText("Product successfully added to your shopping cart");
});

When('User proceeds to checkout', async function () {
  await this.page.locator('a:has-text("Proceed to checkout")').click();
  await this.page.getByRole('link', { name: "Proceed to checkout" }).click();
});





