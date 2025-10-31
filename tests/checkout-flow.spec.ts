import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { AccountInformationPage } from '../pages/AccountInformationPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { TestDataGenerator } from '../utils/TestDataGenerator';

const PRODUCT_NAME = 'Blue Top';

test.describe('Checkout Flow', () => {
  let homePage: HomePage;
  let signupLoginPage: SignupLoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let paymentPage: PaymentPage;
  let orderConfirmationPage: OrderConfirmationPage;
  let testUser: any;

  test('Complete checkout flow - Add product, login, checkout, payment, verify order', async ({ page }) => {
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);
    orderConfirmationPage = new OrderConfirmationPage(page);

    const url = process.env.baseURL;
    await page.goto(url!);
    await homePage.verifyHomePage();

    // Precondition: Create user account and login
    await test.step('Precondition: Create and login user account', async () => {
      testUser = TestDataGenerator.generateUniqueUser();
      const accountInformationPage = new AccountInformationPage(page);
      const accountCreatedPage = new AccountCreatedPage(page);

      // Create account
      await homePage.clickOnNavLink('Signup / Login');
      await signupLoginPage.fillNewUserSignupForm(testUser.name, testUser.email);
      await signupLoginPage.clickSignupButton();

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
      await accountCreatedPage.clickContinue();
      await homePage.verifyLoggedInUser(testUser.name);
    });

    // Precondition: Add product to cart
    await test.step('Precondition: Add product to cart', async () => {
      await homePage.clickOnNavLink('Products');
      await productsPage.addProductToCart(PRODUCT_NAME);
      await productsPage.isAddToCartPopupVisible();
      await productsPage.clickViewCart();
      await cartPage.isCartPageOpened();
      await cartPage.verifyProductInCart(PRODUCT_NAME);
    });

    // Step 1: User clicks "Proceed to Checkout"
    await test.step('Click Proceed to Checkout', async () => {
      await cartPage.clickProceedToCheckout();
      
      // Verify: Checkout page displays user and order details
      await checkoutPage.isCheckoutPageOpened();
      await checkoutPage.verifyAddressDetails();
      await checkoutPage.verifyOrderDetails();
    });

    // Step 2: User confirms address and clicks "Place Order"
    await test.step('Confirm address and click Place Order', async () => {
      await checkoutPage.clickPlaceOrder();
      
      // Verify: Payment page displays
      await paymentPage.isPaymentPageOpened();
    });

    // Step 3: User enters valid card details and clicks "Pay and Confirm Order"
    await test.step('Enter card details and pay', async () => {
      const cardDetails = {
        name: testUser.name,
        cardNumber: '4532015112830366',
        cvv: '123',
        expiryMonth: '12',
        expiryYear: '2027'
      };

      await paymentPage.fillCardDetails(cardDetails);
      await paymentPage.clickPayAndConfirm();
      
      // Verify: Payment is processed successfully (redirects to confirmation)
    });

    // Step 4: Verify order confirmation page
    await test.step('Verify order confirmation', async () => {
      await orderConfirmationPage.isOrderConfirmationPageOpened();
      
      // Verify: "Your order has been placed successfully!" message is displayed
      await orderConfirmationPage.verifySuccessMessage();
    });

    // Cleanup: Delete test account
    await test.step('Cleanup: Delete test account', async () => {
      await homePage.clickDeleteAccount();
      await expect(page).toHaveURL(/.*delete_account/);
    });
  });
});
