import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

// Product name used in the test
const PRODUCT_NAME = 'Blue Top';

test.describe('Add to Cart Flow', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    const url = process.env.baseURL;
    await page.goto(url!);
    await homePage.verifyHomePage();
  });

  test('Scroll to Products -> Add Blue Top to cart -> View Cart shows product', async ({ page }) => {
    // Step 1: Scroll to Products section
    await test.step('Scroll to Products section and verify product list visible', async () => {
      // Navigate to Products page
      await homePage.clickOnNavLink('Products');
      await productsPage.isProductListVisible();
    });

    // Step 2: Click Add to cart on Blue Top
    await test.step('Add "Blue Top" to cart and verify popup', async () => {
      await productsPage.addProductToCart(PRODUCT_NAME);
      await productsPage.isAddToCartPopupVisible();
    });

    // Step 3: Click View Cart and verify product in cart
    await test.step('Click View Cart and verify product in cart', async () => {
      await productsPage.clickViewCart();
      await cartPage.isCartPageOpened();
      await cartPage.verifyProductInCart(PRODUCT_NAME);
    });
  });
});
