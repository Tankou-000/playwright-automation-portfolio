const {LoginPage} = require('../pageobject/loginpage.js');
const {DashboardPage} = require('../pageobject/DashBoardPage.js');
const {Confirmation} = require("../pageobject/confirmation.js");

class PageObjectManager {
  constructor(page) {
    this.page = page;
    this.loginPage = null;
    this.dashboardPage = null;
    this.confirmationPage = null;
  }

  getLoginPage() {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page);
    }
    return this.loginPage;
  }

  getDashboardPage() {
    if (!this.dashboardPage) {
      this.dashboardPage = new DashboardPage(this.page);
    }
    return this.dashboardPage;
  }

  getConfirmationPage() {
    if (!this.confirmationPage) {
      this.confirmationPage = new Confirmation(this.page);
    }
    return this.confirmationPage;
  }
}

module.exports = { PageObjectManager };
