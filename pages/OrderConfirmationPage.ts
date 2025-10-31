import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class OrderConfirmationPage extends BasePage {
  private successMessage: Locator;
  private orderPlacedHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.successMessage = page.locator('p:has-text("Congratulations")');
    this.orderPlacedHeading = page.locator('h2:has-text("Order Placed")');
  }

  async isOrderConfirmationPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/.*payment_done/);
  }

  async verifySuccessMessage(): Promise<void> {
    // Verify the success message is displayed
    await expect(this.successMessage.first()).toBeVisible();
  }
}
