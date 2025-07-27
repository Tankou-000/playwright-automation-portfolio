// const {test, expect} = require("@playwright/test");
const { test, expect } = require('../utils/baseTest');
// const {LoginPage} = require('../pageobject/loginpage.js');
// const {DashboardPage} = require('../pageobject/DashBoardPage.js');
// const {Confirmation} = require("../pageobject/confirmation.js");
const {PageObjectManager} = require("../pageobject/POmanager.js");
const testData = require("../utils/clientAppPOTestData.json")

// const {expect} = require("/Users/mikedelossantos/Playwright Automation/playwright.config.js")
for (const data of testData) {
test(`Browser Context-Validating Error Login ${data.productName}`, async ({page}) =>
{
   const poManager = new PageObjectManager(page);
   const username = data.username; 
   const password = data.password;
   const productName =  data.productName;
   const products = page.locator(".card-body"); 
   const loginPage = poManager.getLoginPage();
   const confirmation = poManager.getConfirmationPage(); 
   await loginPage.goTo();
   await loginPage.validLogin(username,password);
   await page.pause();
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(productName);
   await dashboardPage.navigatetoCart();
   await confirmation.timer.first().waitFor();
   await confirmation.confirm();
   // expect(bool).toBeTruthy();
   await confirmation.dropdownMenu();

//    expect (page.locator("user__name [type='text']")).toHaveText(email);
   expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
   expect(page.locator(".user__name [type='text']").last()).toHaveValue(username);

//    await page.pause();

   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
   const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderID);
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

   for(let i = 0; i < await rows.count(); ++i)
   {
    const roWorderID = await rows.nth(i).locator("th").textContent();
    if(orderID.includes(roWorderID))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
   }

   await page.pause();

   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderID.includes(orderIdDetails)).toBeTruthy();

   

});
}

test('Login and place order using fixture data', async ({page, testDataForOrder}) =>
{
   const poManager = new PageObjectManager(page);
   const username = testDataForOrder.username; 
   const password = testDataForOrder.password;
   const productName =  testDataForOrder.productName;
   const products = page.locator(".card-body"); 
   const loginPage = poManager.getLoginPage();
   const confirmation = poManager.getConfirmationPage(); 
   await loginPage.goTo();
   await loginPage.validLogin(username,password);
   await page.pause();
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(productName);
   await dashboardPage.navigatetoCart();
   await confirmation.timer.first().waitFor();
   await confirmation.confirm();
   // expect(bool).toBeTruthy();
   await confirmation.dropdownMenu();

//    expect (page.locator("user__name [type='text']")).toHaveText(email);
   expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
   expect(page.locator(".user__name [type='text']").last()).toHaveValue(username);

//    await page.pause();

   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
   const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderID);
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

   for(let i = 0; i < await rows.count(); ++i)
   {
    const roWorderID = await rows.nth(i).locator("th").textContent();
    if(orderID.includes(roWorderID))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
   }

   await page.pause();

   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderID.includes(orderIdDetails)).toBeTruthy();

   

});


