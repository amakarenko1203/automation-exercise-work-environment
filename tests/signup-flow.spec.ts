import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { AccountInformationPage } from '../pages/AccountInformationPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { faker } from '@faker-js/faker';

test.describe('User Signup Flow', () => {
  let homePage: HomePage;
  let signupLoginPage: SignupLoginPage;
  let accountInformationPage: AccountInformationPage;
  let accountCreatedPage: AccountCreatedPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    accountInformationPage = new AccountInformationPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    
    const url = process.env.baseURL;
    await page.goto(url!);
    await homePage.verifyHomePage();
  });

  test('Complete user signup flow - from signup to logged in home page', async ({ page }) => {
    // Generate unique test data using faker
    const testUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'United States',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.phone.number()
    };

    // Step 1: User clicks on "Signup / Login" link
    await test.step('Navigate to Signup/Login page', async () => {
      await homePage.clickOnNavLink('Signup / Login');
      
      // Verify: Signup/Login page opens
      await signupLoginPage.verifySignupLoginPageOpened();
    });

    // Step 2: User enters valid name and email in "New User Signup" form
    await test.step('Enter valid name and email in New User Signup form', async () => {
      await signupLoginPage.isSignupTitleVisible();
      await signupLoginPage.verifySignupTitleText();
      await signupLoginPage.fillNewUserSignupForm(testUser.name, testUser.email);
      
      // Verify: Fields accept input
      await signupLoginPage.verifySignupFieldsAcceptInput(testUser.name, testUser.email);
    });

    // Step 3: User clicks on "Signup" button
    await test.step('Click Signup button', async () => {
      await signupLoginPage.clickSignupButton();
      
      // Verify: "Enter Account Information" page displays
      await accountInformationPage.verifyAccountInformationPageOpened();
    });

    // Step 4: User fills in all required fields and clicks "Create Account"
    await test.step('Fill in all required account information and create account', async () => {
      // Fill account information
      await accountInformationPage.fillAccountInformation({
        title: 'Mr',
        password: testUser.password,
        day: '15',
        month: 'January',
        year: '1990',
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

      // Click Create Account button
      await accountInformationPage.clickCreateAccount();
      
      // Verify: "Account created!" message displayed
      await accountCreatedPage.verifyAccountCreatedPageOpened();
    });

    // Step 5: User clicks "Continue" button
    await test.step('Click Continue button and verify logged in home page', async () => {
      await accountCreatedPage.clickContinue();
      
      // Verify: User is redirected to the logged-in home page
      await homePage.isLoggedInTextVisible();
      await homePage.verifyLoggedInUser(testUser.name);
    });
  });

  test('Signup flow validation - verify each step independently', async ({ page }) => {
    const testUser = {
      name: faker.person.fullName(),
      email: faker.internet.email()
    };

    // Test Step 1: Verify Signup/Login link navigation
    await test.step('Verify Signup/Login link functionality', async () => {
      await homePage.clickOnNavLink('Signup / Login');
      
      // Verify navigation to signup/login page
      await signupLoginPage.verifySignupLoginPageOpened();
    });

    // Test Step 2: Verify form field validation
    await test.step('Verify signup form field validation', async () => {
      await signupLoginPage.isSignupTitleVisible();
      await signupLoginPage.verifySignupTitleText();
      
      // Test valid input
      await signupLoginPage.fillNewUserSignupForm(testUser.name, testUser.email);
      await signupLoginPage.verifySignupFieldsAcceptInput(testUser.name, testUser.email);
    });

    // Test Step 3: Verify signup button functionality
    await test.step('Verify signup button leads to account information page', async () => {
      await signupLoginPage.clickSignupButton();
      
      // Verify redirect to account information page
      await accountInformationPage.verifyAccountInformationPageOpened();
    });
  });
});