import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  private cartTable: Locator;
  private cartItemsContainer: Locator;
  private proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('table.cart, table#cart_info_table, table.table-condensed');
    this.cartItemsContainer = page.locator('.cart_info, .cart_items, .table-responsive');
    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout"), .btn:has-text("Proceed To Checkout")');
  }

  async isCartPageOpened(): Promise<void> {
    // Wait for a URL or cart container
    await expect(this.page).toHaveURL(/.*view_cart/);
    await expect(this.cartItemsContainer).toBeVisible();
  }

  async verifyProductInCart(productName: string): Promise<void> {
    // Look for the product name anywhere in cart table/container
    const productLocator = this.cartItemsContainer.locator(`text=${productName}`);
    await expect(productLocator).toBeVisible();
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.first().click();
  }
}
