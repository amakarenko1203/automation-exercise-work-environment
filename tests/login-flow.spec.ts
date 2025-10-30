// Test suite for user login flow validation
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { AccountInformationPage } from '../pages/AccountInformationPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { TestDataGenerator } from '../utils/TestDataGenerator';

test.describe('User Login Flow', () => {
  let homePage: HomePage;
  let signupLoginPage: SignupLoginPage;
  let testUser: any;

  test.beforeAll(() => {
    // Generate test user that will be created and used for login
    testUser = TestDataGenerator.generateUniqueUser();
  });

  // This test creates a user and then tests the login flow
  test('User Login Flow - Navigate, enter credentials, and verify login', async ({ page }) => {
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);

    const url = process.env.baseURL;
    await page.goto(url!);
    await homePage.verifyHomePage();

    // First, create the user account
    await test.step('Setup: Create test user account', async () => {
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

      // Logout to prepare for login test
      await homePage.clickLogout();
    });
    // Step 1: User clicks on "Signup / Login" link
    await test.step('Navigate to Signup/Login page', async () => {
      await homePage.clickOnNavLink('Signup / Login');
      
      // Verify: Login page opens
      await signupLoginPage.verifySignupLoginPageOpened();
    });

    // Step 2: User enters valid email and password
    await test.step('Enter valid email and password', async () => {
      await signupLoginPage.isLoginTitleVisible();
      await signupLoginPage.verifyLoginTitleText();
      
      await signupLoginPage.fillLoginForm(testUser.email, testUser.password);
      
      // Verify: Fields accept input
      await signupLoginPage.verifyLoginFieldsAcceptInput(testUser.email, testUser.password);
    });

    // Step 3: User clicks "Login" button
    await test.step('Click Login button and verify logged in home page', async () => {
      await signupLoginPage.clickLoginButton();
      
      // Verify: User is redirected to home page with "Logged in as [username]" message
      await expect(page).toHaveURL(/.*automationexercise.com/);
      await homePage.isLoggedInTextVisible();
      await homePage.verifyLoggedInUser(testUser.name);
    });

    // Cleanup
    await test.step('Cleanup: Delete test account', async () => {
      await homePage.clickDeleteAccount();
      await expect(page).toHaveURL(/.*delete_account/);
    });
  });

  test('Login flow validation - verify each step independently', async ({ page }) => {
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const independentTestUser = TestDataGenerator.generateUniqueUser();

    const url = process.env.baseURL;
    await page.goto(url!);
    await homePage.verifyHomePage();

    // Setup: Create test user
    await test.step('Setup: Create test user', async () => {
      await homePage.clickOnNavLink('Signup / Login');
      await signupLoginPage.fillNewUserSignupForm(independentTestUser.name, independentTestUser.email);
      await signupLoginPage.clickSignupButton();
      await accountInformationPage.fillAccountInformation({
        title: independentTestUser.title,
        password: independentTestUser.password,
        day: independentTestUser.day,
        month: independentTestUser.month,
        year: independentTestUser.year,
        newsletter: true,
        specialOffers: true
      });
      await accountInformationPage.fillAddressInformation({
        firstName: independentTestUser.firstName,
        lastName: independentTestUser.lastName,
        company: independentTestUser.company,
        address1: independentTestUser.address1,
        address2: independentTestUser.address2,
        country: independentTestUser.country,
        state: independentTestUser.state,
        city: independentTestUser.city,
        zipcode: independentTestUser.zipcode,
        mobileNumber: independentTestUser.mobileNumber
      });
      await accountInformationPage.clickCreateAccount();
      await accountCreatedPage.clickContinue();
      await homePage.clickLogout();
    });

    // Test Step 1: Verify Signup/Login link navigation
    await test.step('Verify Signup/Login link functionality', async () => {
      await homePage.clickOnNavLink('Signup / Login');
      
      // Verify navigation to signup/login page
      await signupLoginPage.verifySignupLoginPageOpened();
    });

    // Test Step 2: Verify login form field validation
    await test.step('Verify login form fields accept input', async () => {
      await signupLoginPage.isLoginTitleVisible();
      await signupLoginPage.verifyLoginTitleText();
      
      // Test form fields
      await signupLoginPage.fillLoginForm(independentTestUser.email, independentTestUser.password);
      await signupLoginPage.verifyLoginFieldsAcceptInput(independentTestUser.email, independentTestUser.password);
    });

    // Test Step 3: Verify login button functionality
    await test.step('Verify login button leads to logged in home page', async () => {
      await signupLoginPage.clickLoginButton();
      
      // Verify redirect to logged in home page
      await expect(page).toHaveURL(/.*automationexercise.com/);
      await homePage.isLoggedInTextVisible();
    });

    // Cleanup
    await test.step('Cleanup: Delete test account', async () => {
      await homePage.clickDeleteAccount();
    });
  });

  test('Login with invalid credentials shows error', async ({ page }) => {
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);

    const url = process.env.baseURL;
    await page.goto(url!);
    await homePage.verifyHomePage();

    await test.step('Navigate to login page', async () => {
      await homePage.clickOnNavLink('Signup / Login');
      await signupLoginPage.verifySignupLoginPageOpened();
    });

    await test.step('Enter invalid credentials and verify error', async () => {
      await signupLoginPage.fillLoginEmail('invalid@email.com');
      await signupLoginPage.fillLoginPassword('wrongpassword');
      await signupLoginPage.clickLoginButton();
      
      // Verify error message is displayed
      await signupLoginPage.isLoginErrorMessageVisible();
      await signupLoginPage.verifyLoginErrorMessageText();
    });
  });
});
