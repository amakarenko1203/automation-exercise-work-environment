import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class AccountInformationPage extends BasePage {
  private pageHeading: Locator;
  private titleMrRadio: Locator;
  private titleMrsRadio: Locator;
  private nameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private daySelect: Locator;
  private monthSelect: Locator;
  private yearSelect: Locator;
  private newsletterCheckbox: Locator;
  private specialOffersCheckbox: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private companyInput: Locator;
  private address1Input: Locator;
  private address2Input: Locator;
  private countrySelect: Locator;
  private stateInput: Locator;
  private cityInput: Locator;
  private zipcodeInput: Locator;
  private mobileNumberInput: Locator;
  private createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h2.title.text-center b');
    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daySelect = page.locator('select[data-qa="days"]');
    this.monthSelect = page.locator('select[data-qa="months"]');
    this.yearSelect = page.locator('select[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.address1Input = page.locator('input[data-qa="address"]');
    this.address2Input = page.locator('input[data-qa="address2"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
  }

  async isPageHeadingVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async verifyPageHeadingText(): Promise<void> {
    await expect(this.pageHeading).toHaveText('ENTER ACCOUNT INFORMATION');
  }

  async verifyAccountInformationPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/.*signup/);
    await this.isPageHeadingVisible();
    await this.verifyPageHeadingText();
  }

  async selectTitle(title: 'Mr' | 'Mrs'): Promise<void> {
    if (title === 'Mr') {
      await this.titleMrRadio.check();
    } else {
      await this.titleMrsRadio.check();
    }
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async selectDateOfBirth(day: string, month: string, year: string): Promise<void> {
    await this.daySelect.selectOption(day);
    await this.monthSelect.selectOption(month);
    await this.yearSelect.selectOption(year);
  }

  async checkNewsletter(): Promise<void> {
    await this.newsletterCheckbox.check();
  }

  async checkSpecialOffers(): Promise<void> {
    await this.specialOffersCheckbox.check();
  }

  async fillAccountInformation(accountData: {
    title: 'Mr' | 'Mrs';
    password: string;
    day: string;
    month: string;
    year: string;
    newsletter?: boolean;
    specialOffers?: boolean;
  }): Promise<void> {
    await this.selectTitle(accountData.title);
    await this.fillPassword(accountData.password);
    await this.selectDateOfBirth(accountData.day, accountData.month, accountData.year);
    
    if (accountData.newsletter) {
      await this.checkNewsletter();
    }
    
    if (accountData.specialOffers) {
      await this.checkSpecialOffers();
    }
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async fillCompany(company: string): Promise<void> {
    await this.companyInput.fill(company);
  }

  async fillAddress1(address: string): Promise<void> {
    await this.address1Input.fill(address);
  }

  async fillAddress2(address: string): Promise<void> {
    await this.address2Input.fill(address);
  }

  async selectCountry(country: string): Promise<void> {
    await this.countrySelect.selectOption(country);
  }

  async fillState(state: string): Promise<void> {
    await this.stateInput.fill(state);
  }

  async fillCity(city: string): Promise<void> {
    await this.cityInput.fill(city);
  }

  async fillZipcode(zipcode: string): Promise<void> {
    await this.zipcodeInput.fill(zipcode);
  }

  async fillMobileNumber(mobileNumber: string): Promise<void> {
    await this.mobileNumberInput.fill(mobileNumber);
  }

  async fillAddressInformation(addressData: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }): Promise<void> {
    await this.fillFirstName(addressData.firstName);
    await this.fillLastName(addressData.lastName);
    
    if (addressData.company) {
      await this.fillCompany(addressData.company);
    }
    
    await this.fillAddress1(addressData.address1);
    
    if (addressData.address2) {
      await this.fillAddress2(addressData.address2);
    }
    
    await this.selectCountry(addressData.country);
    await this.fillState(addressData.state);
    await this.fillCity(addressData.city);
    await this.fillZipcode(addressData.zipcode);
    await this.fillMobileNumber(addressData.mobileNumber);
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async isCreateAccountButtonVisible(): Promise<void> {
    await expect(this.createAccountButton).toBeVisible();
  }
}