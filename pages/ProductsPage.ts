import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductsPage extends BasePage {
  private pageHeading: Locator;
  private productsContainer: Locator;
  private viewCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h2.title.text-center').filter({ hasText: 'All Products' });
    this.productsContainer = page.locator('.features_items');
    // There is a "View Cart" link at /view_cart and sometimes a button in the modal. Keep a general locator.
    this.viewCartButton = page.locator('a:has-text("View Cart"), a[href="/view_cart"]');
  }

  async navigateToProducts(): Promise<void> {
    await this.page.goto('/products');
  }

  async scrollToProductsSection(): Promise<void> {
    // Try to ensure the products section is in view
    await this.productsContainer.scrollIntoViewIfNeeded();
  }

  async isProductListVisible(): Promise<void> {
    await expect(this.productsContainer).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    // Find the product card by name, then click an Add to cart button within it.
    const productCard = this.page.locator(`.productinfo:has-text("${productName}")`);

    // If the Add to cart button is in an overlay or elsewhere, search for a nearby "Add to cart" button.
    const addToCartBtn = productCard.locator('text=Add to cart').first();

    if (await addToCartBtn.count() > 0) {
      await addToCartBtn.click({ force: true });
      return;
    }

    // Fallback: search globally for a product tile that has the product name and an Add to cart button
    const fallbackBtn = this.page.locator(`.product:has-text("${productName}") >> text=Add to cart`).first();
    await fallbackBtn.click({ force: true });
  }

  async isAddToCartPopupVisible(): Promise<void> {
    // Many sites show a modal or overlay containing words like "added" or "Added". Check for any visible text containing "added".
    const addedText = this.page.locator('text=/added/i').first();
    await expect(addedText).toBeVisible({ timeout: 5000 });
  }

  async clickViewCart(): Promise<void> {
    // Click the View Cart link in the modal popup that appears after adding to cart
    const modalViewCart = this.page.locator('a:has-text("View Cart")').first();
    await modalViewCart.click();
  }
}
