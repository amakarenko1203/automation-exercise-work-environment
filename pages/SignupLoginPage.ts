import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class SignupLoginPage extends BasePage {
  private signupTitle: Locator;
  private nameField: Locator;
  private emailField: Locator;
  private signupButton: Locator;

  private loginTitle: Locator;
  private loginEmailField: Locator;
  private loginPasswordField: Locator;
  private loginButton: Locator;
  private loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    // New User Signup locators
    this.signupTitle = page.locator('.signup-form h2');
    this.nameField = page.locator('input[data-qa="signup-name"]');
    this.emailField = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');

    // Login locators
    this.loginTitle = page.locator('.login-form h2');
    this.loginEmailField = page.locator('input[data-qa="login-email"]');
    this.loginPasswordField = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('.login-form p[style*="color: red"]');
  }

  // New User Signup methods
  async isSignupTitleVisible(): Promise<void> {
    await expect(this.signupTitle).toBeVisible();
  }

  async verifySignupTitleText(): Promise<void> {
    await expect(this.signupTitle).toHaveText('New User Signup!');
  }

  async fillSignupName(name: string): Promise<void> {
    await this.nameField.fill(name);
  }

  async fillSignupEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async clickSignupButton(): Promise<void> {
    await this.signupButton.click();
  }

  async fillNewUserSignupForm(name: string, email: string): Promise<void> {
    await this.fillSignupName(name);
    await this.fillSignupEmail(email);
  }

  async verifySignupFieldsAcceptInput(name: string, email: string): Promise<void> {
    await expect(this.nameField).toHaveValue(name);
    await expect(this.emailField).toHaveValue(email);
  }

  // Login methods
  async isLoginTitleVisible(): Promise<void> {
    await expect(this.loginTitle).toBeVisible();
  }

  async verifyLoginTitleText(): Promise<void> {
    await expect(this.loginTitle).toHaveText('Login to your account');
  }

  async fillLoginEmail(email: string): Promise<void> {
    await this.loginEmailField.fill(email);
  }

  async fillLoginPassword(password: string): Promise<void> {
    await this.loginPasswordField.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async isLoginErrorMessageVisible(): Promise<void> {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async verifyLoginErrorMessageText(): Promise<void> {
    await expect(this.loginErrorMessage).toContainText('Your email or password is incorrect!');
  }

  async verifySignupLoginPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/.*login/);
    await this.isSignupTitleVisible();
    await this.isLoginTitleVisible();
  }
}