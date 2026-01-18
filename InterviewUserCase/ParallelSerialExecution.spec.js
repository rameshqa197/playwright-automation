const { test } = require('@playwright/test')


const userdetails = [
    { username: "Ramesh", password: "ramesh123" },
    { username: "Suresh", password: "suresh123" },
    { username: "Mahesh", password: "mahesh123" }
]

test.describe.parallel('Parallel Execution Suite', () => {

    for (const user of userdetails) {
        test(`Test Case 1 - Parallel for ${user.username}`, async ({ page }) => {
            await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
            console.log('Executing Test Case 1 in Parallel', user.username)
        })
    }

})


test.describe.serial('Serial Execution Suite', () => {

    for( const user of userdetails) {
        test(`Test Case 2 - Serial for ${user.username}`, async ({ page }) => {
            await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
            console.log('Executing Test Case 2 in Serial', user.username)
        })
    }

})