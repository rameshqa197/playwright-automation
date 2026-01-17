class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.signInBtn = page.locator('#login')
    }

    async ApplicationLogin(email, pwd) {
        await this.userName.fill(email);
        await this.password.fill(pwd);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');

    }

    async navigate(url) {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }
}

module.exports = { LoginPage }