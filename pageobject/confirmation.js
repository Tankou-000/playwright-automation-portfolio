class Confirmation {
  constructor(page) {
    this.page = page;
    this.timer = page.locator("div li");
    this.coat = page.locator("h3:has-text('ZARA COAT 3')");
    this.checkout = page.locator("text=Checkout");
    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");

    // Notes for use in test:
    // await this.timer.first().waitFor();
    // await this.coat.isVisible();
    // await expect(bool).toBeTruthy();
    // await this.checkout.click();
    // await this.country.pressSequentially("ind", { delay: 100 });
  }

  async dropdownMenu() {
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await this.dropdown.locator("button").nth(i).textContent();
      if (text.trim() === "India") {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async confirm() {
    await this.coat.isVisible();
    // expect(isVisible).toBeTruthy();
  }
}

module.exports = { Confirmation };
