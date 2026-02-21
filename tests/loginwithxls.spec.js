const { test } = require('@playwright/test')
const { ExcelUtil } = require('../utils/excelUtil');
const path = require('path');

const excelFilePath = path.join(__dirname, '../Testdata/testData.xlsx');
const sheetName = 'loginData';

const excelUtil = new ExcelUtil(excelFilePath);
const loginData = excelUtil.readExcelFile(sheetName);


loginData.forEach((data, index) => {

    test(`Login Test - ${data.userName} - Row ${index + 1}`, async ({ page }) => {

        try {

            await page.goto(process.env.BASE_URL)
            await page.locator('#userEmail').fill(data.userName);
            await page.locator('#userPassword').fill(data.Password);
            await page.getByRole('button', { name: 'Login' }).click();
            excelUtil.writeResultToExcel(sheetName, index, 'Pass');

        } catch (err) {
            excelUtil.writeResultToExcel(sheetName, index, 'Fail');
            console.error(`Error in test for ${data.userName} at row ${index + 1}:`, err);
        }


    })
})
