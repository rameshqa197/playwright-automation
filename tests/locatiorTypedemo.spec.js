const { test } = require('@playwright/test')

test('Locator Type demo', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').check();

    await page.getByLabel('Gender').selectOption('Male');
    await page.getByPlaceholder('Password').fill("Ramesh#12345");

    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByText('Success! The Form has been submitted successfully.').isVisible();

    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Samsung Note 8' }).getByRole('button', { name: 'Add' }).click();



})