const { test } = require('@playwright/test');

test('@Web Read web table data from W3Schools', async ({ page }) => {

  await page.goto('https://www.w3schools.com/sql/sql_join_inner.asp');

  const table = page.locator('table.ws-table-all').first();
  const rows = table.locator('tr');

  const rowCount = await rows.count();
  console.log("Total Rows:", rowCount);

   for (let i = 0; i < rowCount; i++) {
    const cols = rows.nth(i).locator('td');
    const colCount = await cols.count();

    let rowData = [];
    for (let j = 0; j < colCount; j++) {
      rowData.push(await cols.nth(j).innerText());
    }

    console.log(rowData.join(" | "));
  }
});

test('@Web Match ProductName in web table', async ({ page }) => {

  await page.goto('https://www.w3schools.com/sql/sql_join_inner.asp');

  const rows = page.locator('table.ws-table-all tr');
  const rowCount = await rows.count();

  for (let i = 1; i < rowCount; i++) { // skip header

    const cols = rows.nth(i).locator('td');
    const productName = await cols.nth(1).innerText(); // ProductName column

    if (productName.trim() === "Chais") {

      const orderId = await cols.nth(0).innerText();
      const customer = await cols.nth(1).innerText();
      const employee = await cols.nth(2).innerText();

      console.log("Matched Product:", productName);
      console.log("Order ID:", orderId);
      console.log("Customer:", customer);
      console.log("Employee:", employee);

      break;
    }
  }
});
