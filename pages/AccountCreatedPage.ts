import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class AccountCreatedPage extends BasePage {
  private accountCreatedMessage: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountCreatedMessage = page.locator('h2[data-qa="account-created"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async isAccountCreatedMessageVisible(): Promise<void> {
    await expect(this.accountCreatedMessage).toBeVisible();
  }

  async verifyAccountCreatedMessageText(): Promise<void> {
    await expect(this.accountCreatedMessage).toHaveText('ACCOUNT CREATED!');
  }

  async verifyAccountCreatedPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/.*account_created/);
    await this.isAccountCreatedMessageVisible();
    await this.verifyAccountCreatedMessageText();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async isContinueButtonVisible(): Promise<void> {
    await expect(this.continueButton).toBeVisible();
  }
}