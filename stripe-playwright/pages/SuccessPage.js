const { expect } = require('@playwright/test');

class SuccessPage {
  constructor(page) {
    this.page = page;
    this.successText = page.getByText(/succeeded|success/i).first();
  }

  async expectLoaded() {
    await this.page.waitForURL(/success\.html/, { timeout: 45000 });
    await expect(this.page).toHaveURL(/session_id=cs_test_/);
    await expect(this.successText).toBeVisible();
  }
}

module.exports = { SuccessPage };