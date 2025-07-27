const {test, expect} = require("@playwright/test");
const { text } = require("stream/consumers");
// const {expect} = require("/Users/mikedelossantos/Playwright Automation/playwright.config.js")

test("Browser playwright test", async ({browser})=>
{
   
   const context =  await browser.newContext();
   const page = await context.newPage();
   const userName =  page.locator("#username");
   const passWord = page.locator("[type='password']");
   const signIn = page.locator('#signInBtn');
   const cardTitles = page.locator(".card-body a")
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await userName.fill("rahulshetty");
   await passWord.fill('learning');
   await signIn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   await userName.fill("") 
   await userName.fill("rahulshettyacademy");
   await signIn.click();
//     console.log(await cardTitles.first().textContent());
//    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});




test.only("UI Controls", async ({page})=>
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName =  page.locator("#username");
     const signIn = page.locator('#signInBtn');
   const documentLocator =  page.locator("[href*='documents-request']")
   const dropdown = await page.locator("select.form-control");
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator('#okayBtn').click();
   console.log (page.locator(".radiotextsty").last().isChecked());
   expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator('#terms').click();
   await expect (page.locator('#terms')).toBeChecked();
   await page.locator('#terms').uncheck();
   expect(await page.locator('#terms').isChecked()).toBeFalsy();
   await expect(documentLocator).toHaveAttribute("class","blinkingText");

   await page.screenshot({path: 'testshot.png'});



    //   await page.pause();



});


test("child windows", async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName =  page.locator("#username");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink =  page.locator("[href*='documents-request']")

   const [newPage] = await Promise.all(
[
    context.waitForEvent('page'),
   documentLink.click(),
]);

const text = await newPage.locator('.red').textContent();
const arrayText =  text.split("@")
const domain = arrayText[1].split(" ")[0]
console.log(domain);
await page.locator("#username").fill(domain);
await page.pause();
console.log(await page.locator("#username").inputValue());









});