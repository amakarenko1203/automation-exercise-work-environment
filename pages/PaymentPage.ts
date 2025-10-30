import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class PaymentPage extends BasePage {
  private nameOnCardInput: Locator;
  private cardNumberInput: Locator;
  private cvvInput: Locator;
  private expiryMonthInput: Locator;
  private expiryYearInput: Locator;
  private payAndConfirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameOnCardInput = page.locator('input[name="name_on_card"], input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[name="card_number"], input[data-qa="card-number"]');
    this.cvvInput = page.locator('input[name="cvc"], input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[name="expiry_month"], input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[name="expiry_year"], input[data-qa="expiry-year"]');
    this.payAndConfirmButton = page.locator('button:has-text("Pay and Confirm Order"), button[data-qa="pay-button"]');
  }

  async isPaymentPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/.*payment/);
    await expect(this.nameOnCardInput).toBeVisible();
  }

  async fillCardDetails(cardDetails: {
    name: string;
    cardNumber: string;
    cvv: string;
    expiryMonth: string;
    expiryYear: string;
  }): Promise<void> {
    await this.nameOnCardInput.fill(cardDetails.name);
    await this.cardNumberInput.fill(cardDetails.cardNumber);
    await this.cvvInput.fill(cardDetails.cvv);
    await this.expiryMonthInput.fill(cardDetails.expiryMonth);
    await this.expiryYearInput.fill(cardDetails.expiryYear);
  }

  async clickPayAndConfirm(): Promise<void> {
    await this.payAndConfirmButton.click();
  }
}
