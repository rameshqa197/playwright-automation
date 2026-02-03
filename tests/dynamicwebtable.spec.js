import { test, expect,page } from '@playwright/test';

test('Handling dynamic webtable', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#offers', { timeout: 60000 });
    
    // Wait for table rows to load
    await page.waitForSelector('tbody tr', { timeout: 30000 });

    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    console.log('Total rows:', rowCount);

    const targetProduct = 'Potato';

    for (let i = 0; i < rowCount; i++) {
        const productName = (await rows.nth(i).locator('td').nth(0).textContent()).trim();
        const price = (await rows.nth(i).locator('td').nth(1).textContent()).trim();

        if (productName.toLowerCase() === targetProduct.toLowerCase()) {
            console.log(`✅ Product: ${productName}, Price: ${price}`);
            break;
        }
    }
});