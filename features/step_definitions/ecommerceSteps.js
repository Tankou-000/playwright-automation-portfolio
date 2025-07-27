const { Given, When, Then } = require('@cucumber/cucumber');

Given('login to e-commerce application with username {string} and password {string}', async function (username, password) {
  // Playwright login logic here
});

When('add product with code {string} to the cart', async function (productCode) {
  // Playwright logic to add item
});

Then('verify product with code {string} is displayed in the cart', async function (productCode) {
  // Assert with Playwright
});
