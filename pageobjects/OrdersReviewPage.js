const { expect } = require("@playwright/test");

class OrdersReviewPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

        this.expiryDate = page.locator(".input.ddl");

        this.ccvNumber = page.locator('(//input[@type="text"])[2]');
        this.NameonCard = page.locator('(//input[@type="text"])[3]');
        this.coponValue = page.locator('(//input[@type="text"])[4]');
        this.applyCopon = page.getByRole('button', { name: 'Apply Coupon' });
        this.coponAppliedText = page.locator('.mt-1.ng-star-inserted');


    }
    async searchCountryAndSelect(countryCode, countryName) {
        await this.country.pressSequentially(countryCode);
        // await this.country.fill(countryCode,{delay:100});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }

    async SelectExpiryDate(month, date) {
        await this.expiryDate.nth(0).selectOption({ label: month });
        await this.expiryDate.nth(1).selectOption({ label: date });
    }
    async FillCardDetails(ccvNumber, NameonCard) {
        await this.ccvNumber.fill(ccvNumber);
        await this.NameonCard.fill(NameonCard);
    }

    async ApplyCoponAndVerify(coponCode) {
        await this.coponValue.fill(coponCode);
        await this.applyCopon.click();
        await expect(this.coponAppliedText).toHaveText('* Coupon Applied');
    }

    async VerifyEmailId(username) {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderId() {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}
module.exports = { OrdersReviewPage };
