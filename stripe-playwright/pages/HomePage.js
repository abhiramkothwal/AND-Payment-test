class HomePage {
  constructor(page) {
    this.page = page;
    // Matches a button OR a link whose visible text contains "buy" or "checkout"
    this.checkoutButton = page
      .getByRole('button', { name: /buy|checkout/i })
      .or(page.getByRole('link', { name: /buy|checkout/i }))
      .first();
  }

  async open() {
    await this.page.goto('/');
  }

  async startCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForURL(/checkout\.stripe\.com/, { timeout: 100000 });
  }
}

module.exports = { HomePage };