const { expect } = require('@playwright/test');

class StripeCheckoutPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator('#email');
    this.cardNumber = page.locator('#cardNumber');
    this.cardExpiry = page.locator('#cardExpiry');
    this.cardCvc = page.locator('#cardCvc');
    this.billingName = page.locator('#billingName');
    this.postalCode = page.locator('#billingPostalCode');
    this.payButton = page.locator('.SubmitButton, [data-testid="hosted-payment-submit-button"]').first();
    this.errorMessage = page.getByText(/card was declined/i);
  }

  async fillCardDetails({ number, email, name, expiry, cvc, postalCode }) {
    await this.email.fill(email);
    await this.cardNumber.fill(number);
    await this.cardExpiry.fill(expiry);
    await this.cardCvc.fill(cvc);
    await this.billingName.fill(name);
    // Postal code only appears for some regions/configs
    if (await this.postalCode.isVisible().catch(() => false)) {
      await this.postalCode.fill(postalCode);
    }
  }

  async pay() {
    await expect(this.payButton).toBeEnabled();
    await this.payButton.click();
  }

  async payWithCard(details) {
    await this.fillCardDetails(details);
    await this.pay();
  }

  async expectDeclinedMessage() {
    await expect(this.errorMessage).toBeVisible({ timeout: 30000 });
    await expect(this.page).toHaveURL(/checkout\.stripe\.com/);
  }
}

module.exports = { StripeCheckoutPage };