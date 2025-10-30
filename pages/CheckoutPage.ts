import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  private deliveryAddressSection: Locator;
  private billingAddressSection: Locator;
  private orderReviewSection: Locator;
  private placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddressSection = page.locator('#address_delivery, .address_delivery');
    this.billingAddressSection = page.locator('#address_invoice, .address_invoice');
    this.orderReviewSection = page.locator('#cart_info, .cart_info');
    this.placeOrderButton = page.locator('a:has-text("Place Order"), .btn:has-text("Place Order")');
  }

  async isCheckoutPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout/);
    await expect(this.deliveryAddressSection).toBeVisible();
  }

  async verifyAddressDetails(): Promise<void> {
    // Verify both delivery and billing addresses are visible
    await expect(this.deliveryAddressSection).toBeVisible();
    await expect(this.billingAddressSection).toBeVisible();
  }

  async verifyOrderDetails(): Promise<void> {
    // Verify order review section is visible
    await expect(this.orderReviewSection).toBeVisible();
  }

  async clickPlaceOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }
}
