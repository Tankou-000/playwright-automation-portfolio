const base = require('@playwright/test');

// Extend the default test object with custom fixture
const test = base.test.extend({
  testDataForOrder: {
    username: 'mdls9400@gmail.com',
    password: 'Tacobread5590',
    productName: 'ZARA COAT 3'
  }
});

module.exports = { test, expect: base.expect };
