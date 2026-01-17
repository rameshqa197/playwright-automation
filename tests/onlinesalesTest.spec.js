const { test, expect } = require('@playwright/test');
//const testData=JSON.parse(JSON.stringify(require('../utils/onlinesaleTestData.json')))
const testDataList = require('../utils/onlinesalesTestData.json')

// Iterate over the data set and create a separate test for each entry (data-driven tests)
for (const testData of testDataList) {

    test(`@Web sales site for product validation for ${testData.productName}`, async ({ page }) => {

        // Navigate to the online store homepage
        await page.goto("https://teststore.automationtesting.co.uk/index.php")

        // Open Sign in, enter credentials from test data and submit
        await page.locator('span:has-text("Sign in")').click();
        await page.locator('#field-email').fill(testData.userName);
        await page.locator('#field-email').screenshot({ path: 'UserName.png' })
        await page.locator('#field-password').fill(testData.password);
        await page.getByRole('button', { name: 'Sign in' }).click()

        // Ensure page is fully loaded after login
        await page.waitForLoadState('networkidle');
        //await page.screenshot({ path: 'loginpage.png' })

        // Locate product tiles displayed on the page so we can search for the target product
        const productTile = page.locator(".h3.product-title")
        //const productName = "Hummingbird printed sweater"

        const produclist = await productTile.allTextContents();
        const count = await productTile.count();
        console.log(count);

        // Loop through the product tiles and click the one that contains the product name from test data
        for (let i = 0; i < count; i++) {

            const producttxt = await productTile.nth(i).textContent();
            console.log(producttxt);
            if (producttxt.includes(testData.productName)) {
                console.log("found the product");
                // Click the matched product to go to the product details page
                await productTile.nth(i).click();
                break;
            }
        }

        // Assert that the product details page shows the expected product name
        expect(await page.locator(".h1").textContent()).toContain(testData.productName)

        await page.waitForTimeout(2000); // Short pause to ensure dynamic elements are ready
        
        // Prepare to add the product to cart: check Add to cart button visibility and enabled state, then click
        const addToCart = page.getByRole('button', { name: 'Add to cart' });
        
        await expect(addToCart).toBeVisible();
        await expect(addToCart).toBeEnabled();
        await addToCart.click();

        // Verify the cart/modal displays the correct product name
        await expect(page.locator(".h6.product-name")).toContainText(testData.productName);

        // Verify the success message and product name inside the modal
        expect(await page.locator("#myModalLabel").textContent()).toContain("Product successfully added to your shopping cart");
        expect(await page.locator("h6.product-name").textContent()).toContain(testData.productName)

        // Proceed to checkout from the modal
        await page.locator('a:has-text("Proceed to checkout")').click();
        await page.getByRole('link', { name: "Proceed to checkout" }).click();


    });

}


