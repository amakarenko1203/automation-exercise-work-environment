import { Page, expect } from '@playwright/test';

export class TestHelpers {
  /**
   * Wait for a specific URL pattern
   */
  static async waitForUrl(page: Page, urlPattern: RegExp, timeout: number = 10000): Promise<void> {
    await page.waitForFunction(
      (pattern) => new RegExp(pattern).test(window.location.href),
      urlPattern.source,
      { timeout }
    );
  }

  /**
   * Take a screenshot with a custom name
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ 
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Wait for element to be stable (not moving)
   */
  static async waitForStableElement(page: Page, selector: string): Promise<void> {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible' });
    
    // Wait for element to stop moving
    let previousBox = await element.boundingBox();
    await page.waitForTimeout(100);
    let currentBox = await element.boundingBox();
    
    while (previousBox && currentBox && 
           (previousBox.x !== currentBox.x || previousBox.y !== currentBox.y)) {
      previousBox = currentBox;
      await page.waitForTimeout(100);
      currentBox = await element.boundingBox();
    }
  }

  /**
   * Scroll element into view if needed
   */
  static async scrollIntoViewIfNeeded(page: Page, selector: string): Promise<void> {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Clear and fill input field
   */
  static async clearAndFill(page: Page, selector: string, text: string): Promise<void> {
    const input = page.locator(selector);
    await input.clear();
    await input.fill(text);
  }

  /**
   * Wait for network to be idle
   */
  static async waitForNetworkIdle(page: Page, timeout: number = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Generate a random string
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Check if element exists without throwing error
   */
  static async elementExists(page: Page, selector: string): Promise<boolean> {
    try {
      const element = page.locator(selector);
      await element.waitFor({ state: 'attached', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current timestamp for unique identifiers
   */
  static getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Log test step information
   */
  static logStep(stepName: string, details?: string): void {
    console.log(`🔵 Step: ${stepName}${details ? ` - ${details}` : ''}`);
  }

  /**
   * Log test assertion
   */
  static logAssertion(assertion: string, result: boolean): void {
    const emoji = result ? '✅' : '❌';
    console.log(`${emoji} Assertion: ${assertion} - ${result ? 'PASSED' : 'FAILED'}`);
  }

  /**
   * Retry an action with exponential backoff
   */
  static async retryAction<T>(
    action: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await action();
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          const delay = baseDelay * Math.pow(2, i);
          console.log(`Retry attempt ${i + 1} after ${delay}ms delay`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }
}