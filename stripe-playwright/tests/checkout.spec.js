const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { StripeCheckoutPage } = require('../pages/StripeCheckoutPage');
const { SuccessPage } = require('../pages/SuccessPage');
const { cards, customer } = require('../test-data/cards');

test.describe('Stripe Checkout', () => {
  let home, checkout, success;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    checkout = new StripeCheckoutPage(page);
    success = new SuccessPage(page);

    await home.open();
    await home.startCheckout();
  });

  test('successful card payment reaches success screen', async () => {
    await checkout.payWithCard({ number: cards.success, ...customer });
    await success.expectLoaded();
  });

  test('declined card shows an error and does not succeed', async ({ page }) => {
    await checkout.payWithCard({ number: cards.declined, ...customer });
    await checkout.expectDeclinedMessage();
    await expect(page).not.toHaveURL(/success\.html/);
  });
});