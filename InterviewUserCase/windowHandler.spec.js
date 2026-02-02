
const{test, chromium}= require('@playwright/test')

test("mutile window handler from paranet to child", async ()=>{

     const browser = await chromium.launch({headless: false});
     const context = await browser.newContext()
     const page = await context.newPage();
     await page.goto("https://the-internet.herokuapp.com/windows");

     console.log(await page.title());

     // 4. Click "Click Here" to open new tab

     const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        page.click("a[href='/windows/new']"),
        console.log("new tab opened")
     ])

     const newPageTitle = await newPage.title();
     console.log("New page title is: "+newPageTitle);

    const textonpage = await newPage.locator("div[class='example'] h3").textContent();
    console.log("Text on new page is: "+textonpage);

})