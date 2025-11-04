import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { AccountInformationPage } from '../pages/AccountInformationPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { TestDataGenerator } from '../utils/TestDataGenerator';

test.describe('Smoke Test Suite', () => {
  test('End-to-End Smoke Test - Signup, Login, Add to Cart, Checkout, and Complete Order', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

    // Generate unique test user
    const testUser = TestDataGenerator.generateUniqueUser();
    const productName = 'Blue Top';

    const url = process.env.baseURL;
    await page.goto(url!);

    // 1. Verify home page loads
    await test.step('Verify home page loads', async () => {
      await homePage.verifyHomePage();
    });

    // 2. User Signup Flow
    await test.step('Complete user signup', async () => {
      await homePage.clickOnNavLink('Signup / Login');
      await signupLoginPage.verifySignupLoginPageOpened();
      await signupLoginPage.fillNewUserSignupForm(testUser.name, testUser.email);
      await signupLoginPage.clickSignupButton();

      await accountInformationPage.verifyAccountInformationPageOpened();
      await accountInformationPage.fillAccountInformation({
        title: testUser.title,
        password: testUser.password,
        day: testUser.day,
        month: testUser.month,
        year: testUser.year,
        newsletter: true,
        specialOffers: true
      });

      await accountInformationPage.fillAddressInformation({
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        company: testUser.company,
        address1: testUser.address1,
        address2: testUser.address2,
        country: testUser.country,
        state: testUser.state,
        city: testUser.city,
        zipcode: testUser.zipcode,
        mobileNumber: testUser.mobileNumber
      });

      await accountInformationPage.clickCreateAccount();
      await accountCreatedPage.verifyAccountCreatedPageOpened();
      await accountCreatedPage.clickContinue();
      await homePage.verifyLoggedInUser(testUser.name);
    });

    // 3. Logout and Login Flow
    await test.step('Logout and login with created credentials', async () => {
      await homePage.clickLogout();
      await signupLoginPage.verifySignupLoginPageOpened();
      
      await signupLoginPage.fillLoginForm(testUser.email, testUser.password);
      await signupLoginPage.clickLoginButton();
      
      await homePage.verifyLoggedInUser(testUser.name);
    });

    // 4. Add Product to Cart Flow
    await test.step('Navigate to products and add item to cart', async () => {
      await homePage.clickOnNavLink('Products');
      await productsPage.isProductListVisible();
      await productsPage.addProductToCart(productName);
      await productsPage.isAddToCartPopupVisible();
      await productsPage.clickViewCart();
      
      await cartPage.isCartPageOpened();
      await cartPage.verifyProductInCart(productName);
    });

    // 5. Checkout Flow
    await test.step('Complete checkout process', async () => {
      await cartPage.clickProceedToCheckout();
      
      await checkoutPage.isCheckoutPageOpened();
      await checkoutPage.verifyAddressDetails();
      await checkoutPage.verifyOrderDetails();
      await checkoutPage.clickPlaceOrder();
    });

    // 6. Payment Flow
    await test.step('Enter payment details and complete order', async () => {
      await paymentPage.isPaymentPageOpened();
      
      const cardDetails = {
        name: testUser.name,
        cardNumber: '4532015112830366',
        cvv: '123',
        expiryMonth: '12',
        expiryYear: '2027'
      };
      
      await paymentPage.fillCardDetails(cardDetails);
      await paymentPage.clickPayAndConfirm();
    });

    // 7. Verify Order Confirmation
    await test.step('Verify order confirmation', async () => {
      await orderConfirmationPage.isOrderConfirmationPageOpened();
      await orderConfirmationPage.verifySuccessMessage();
    });

    // 8. Cleanup - Delete Account
    await test.step('Delete test account', async () => {
      await homePage.clickDeleteAccount();
      await expect(page).toHaveURL(/.*delete_account/);
    });
  });

  test('Quick Smoke Test - Login with Invalid Credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);

    const url = process.env.baseURL;
    await page.goto(url!);

    await test.step('Verify login error with invalid credentials', async () => {
      await homePage.verifyHomePage();
      await homePage.clickOnNavLink('Signup / Login');
      await signupLoginPage.verifySignupLoginPageOpened();
      
      await signupLoginPage.fillLoginForm('invalid@test.com', 'wrongpassword');
      await signupLoginPage.clickLoginButton();
      
      await signupLoginPage.isLoginErrorMessageVisible();
      await signupLoginPage.verifyLoginErrorMessageText();
    });
  });

  test('Product Navigation Smoke Test', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    const url = process.env.baseURL;
    await page.goto(url!);

    await test.step('Verify products page navigation and visibility', async () => {
      await homePage.verifyHomePage();
      await homePage.clickOnNavLink('Products');
      await productsPage.isProductListVisible();
    });
  });
});
