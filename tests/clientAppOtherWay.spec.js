const {test, expect} = require("@playwright/test");
// const {expect} = require("/Users/mikedelossantos/Playwright Automation/playwright.config.js")

test.only("Browser Context-Validating Error Login", async ({page})=>
{
   const email = "anshika@gmail.com" 
   const productName =  'ZARA COAT 3';
   const products = page.locator(".card-body"); 
   await page.goto('https://rahulshettyacademy.com/client/');
   await page.getByPlaceholder('email@example').fill(email);
   await page.getByPlaceholder('enter your passsword').fill('Iamking@000');
   await page.getByRole("button", {name:"Login"}).click();
   await page.locator('[value="Login"]').click();
   await page.waitForLoadState('networkidle');
   
   await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();

   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
   
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();


   await page.getByRole("button",{name:"Checkout"}).click();
   await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});
   
   await page.getByRole("button",{name:"India"}).nth(1).click();

  

//    expect (page.locator("user__name [type='text']")).toHaveText(email);


//    await page.pause();

   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();

});




