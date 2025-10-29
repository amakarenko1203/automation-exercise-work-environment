import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  private signupLoginLink: Locator;
  private loggedInAsText: Locator;
  private deleteAccountLink: Locator;
  private logoutLink: Locator;
  private homePageLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.loggedInAsText = page.locator('.navbar-nav li:has-text("Logged in as")');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.homePageLogo = page.locator('.logo');
  }

  async navigateToHome(): Promise<void> {
    await this.page.goto('/');
  }

  async isHomePageLogoVisible(): Promise<void> {
    await expect(this.homePageLogo).toBeVisible();
  }

  async verifyHomePage(): Promise<void> {
    await this.isHomePageLogoVisible();
    await expect(this.page).toHaveURL(/.*automationexercise.com/);
  }

  async isLoggedInTextVisible(): Promise<void> {
    await expect(this.loggedInAsText).toBeVisible();
  }

  async verifyLoggedInUser(username: string): Promise<void> {
    await this.isLoggedInTextVisible();
    await expect(this.loggedInAsText).toContainText(username);
  }

  async getLoggedInUsername(): Promise<string> {
    const text = await this.loggedInAsText.textContent() || '';
    return text.replace('Logged in as ', '').trim();
  }

  async clickSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
  }

  async clickDeleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }
}