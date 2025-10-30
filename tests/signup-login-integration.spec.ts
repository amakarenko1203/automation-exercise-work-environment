// Integrated test: Create user via signup, then login with that user
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { AccountInformationPage } from '../pages/AccountInformationPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { TestDataGenerator } from '../utils/TestDataGenerator';

test.describe('User Signup and Login Integration', () => {
  let homePage: HomePage;
  let signupLoginPage: SignupLoginPage;
  let accountInformationPage: AccountInformationPage;
  let accountCreatedPage: AccountCreatedPage;
  let testUser: any;

  test.beforeAll(() => {
    // Generate unique test user data that will be used across tests
    testUser = TestDataGenerator.generateUniqueUser();
  });

  test('Create user account and then login with credentials', async ({ page }) => {
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    accountInformationPage = new AccountInformationPage(page);
    accountCreatedPage = new AccountCreatedPage(page);

    const url = process.env.baseURL;
    await page.goto(url!);
    await homePage.verifyHomePage();

    // PART 1: Create a new user account
    await test.step('Create new user account via signup', async () => {
      // Navigate to signup page
      await homePage.clickOnNavLink('Signup / Login');
      await signupLoginPage.verifySignupLoginPageOpened();

      // Fill signup form
      await signupLoginPage.fillNewUserSignupForm(testUser.name, testUser.email);
      await signupLoginPage.clickSignupButton();

      // Fill account information
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

      // Fill address information
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

      // Create account
      await accountInformationPage.clickCreateAccount();
      await accountCreatedPage.verifyAccountCreatedPageOpened();
      await accountCreatedPage.clickContinue();

      // Verify user is logged in
      await homePage.verifyLoggedInUser(testUser.name);
    });

    // PART 2: Logout and then login with the created credentials
    await test.step('Logout from the account', async () => {
      await homePage.clickLogout();
      await expect(page).toHaveURL(/.*login/);
    });

    await test.step('Login with created user credentials', async () => {
      // Step 1: Verify we're on login page
      await signupLoginPage.verifySignupLoginPageOpened();
      await signupLoginPage.isLoginTitleVisible();
      await signupLoginPage.verifyLoginTitleText();

      // Step 2: Enter valid email and password
      await signupLoginPage.fillLoginForm(testUser.email, testUser.password);
      
      // Verify: Fields accept input
      await signupLoginPage.verifyLoginFieldsAcceptInput(testUser.email, testUser.password);

      // Step 3: Click Login button
      await signupLoginPage.clickLoginButton();
      
      // Verify: User is redirected to home page with "Logged in as [username]" message
      await expect(page).toHaveURL(/.*automationexercise.com/);
      await homePage.isLoggedInTextVisible();
      await homePage.verifyLoggedInUser(testUser.name);
    });

    // Cleanup: Delete the account
    await test.step('Cleanup - Delete test account', async () => {
      await homePage.clickDeleteAccount();
      await expect(page).toHaveURL(/.*delete_account/);
    });
  });
});
