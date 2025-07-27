const {test, expect, request} = require("@playwright/test");
const { json } = require("stream/consumers");
const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
let token

test.beforeAll( async ()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:loginPayload


        })
        expect(loginResponse.ok()).toBeTruthy();
        const jsonResponse = await loginResponse.json();
        token = jsonResponse.token;
        console.log(token);
});

test.beforeEach( ()=>
{




});

test.only("Browser Context-Validating Error Login", async ({page})=>
{
   page.addInitScript(value => {
 
    window.localStorage.setItem('token',value);


   },token); 
   const email = "" 
   const productName =  'ZARA COAT 3';
   await page.goto('https://rahulshettyacademy.com/client/');
   const products = page.locator(".card-body"); 
//    await page.goto('https://rahulshettyacademy.com/client/');
//    await page.locator('#userEmail').fill(email);
//    await page.locator('#userPassword').fill('Iamking@000');
//    await page.locator('[value="Login"]').click();
//    await page.waitForLoadState('networkidle');
   const titles = await page.locator('.card-body b').allTextContents();
   console.log(titles);
   const count =  await products.count();
   for (let i = 0; i < count; ++i)
   {
       if (await products.nth(i).locator("b").textContent() === productName)
       {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
       }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for(let i = 0;i< optionsCount; ++i)
   {
       const text = await dropdown.locator("button").nth(i).textContent();
       if (text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
   }

//    expect (page.locator("user__name [type='text']")).toHaveText(email);
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   expect(page.locator(".user__name [type='text']").last()).toHaveValue(email);

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