# GitHub Copilot Instructions

## Project Overview
This is a Playwright TypeScript test automation project for testing the automation-exercise website, focusing on user signup flows and related functionality.

## Architecture & Patterns

### Page Object Model (POM)
- All page classes extend `basePage.ts`
- Store locators and page-specific methods in page classes
- Keep test logic in spec files, page interaction logic in page objects
- Use descriptive method names that indicate user actions (e.g., `fillSignupForm`, `clickContinue`)

### Test Organization
- Group related tests using `test.describe()`
- Use clear, descriptive test names that explain the scenario
- Follow AAA pattern: Arrange, Act, Assert
- Isolate tests - each test should be independent

## Coding Standards

### TypeScript
- Use strict TypeScript typing - avoid `any`
- Define interfaces for test data structures
- Use async/await for all Playwright operations
- Export types and interfaces that may be reused

### Playwright Best Practices
- Use `page.locator()` with specific, stable selectors (prefer test IDs, then accessible names)
- Add explicit waits when needed using `waitFor()` or built-in auto-waiting
- Use `expect()` from `@playwright/test` for assertions
- Leverage Playwright's auto-retry and waiting mechanisms

### Naming Conventions
- Page classes: `PascalCase` ending with `Page` (e.g., `HomePage`)
- Test files: `kebab-case` ending with `.spec.ts` (e.g., `signup-flow.spec.ts`)
- Methods: `camelCase` describing the action (e.g., `navigateToSignup`)
- Constants: `UPPER_SNAKE_CASE` for truly constant values
- Test data generators: Use utility functions in `TestDataGenerator.ts`

### File Organization
```
pages/          # Page Object Model classes
tests/          # Test specifications
utils/          # Helper utilities and test data generators
playwright-report/   # Generated test reports (gitignored)
test-results/   # Test execution results (gitignored)
```

## Test Data
- Use `TestDataGenerator.ts` for generating random test data (emails, names, etc.)
- Use `TestHelpers.ts` for common test utilities
- Avoid hardcoding test data in spec files
- Generate unique data per test run to avoid conflicts

## Common Patterns

### Page Class Structure
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ExamplePage extends BasePage {
    readonly elementLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.elementLocator = page.locator('selector');
    }

    async performAction(): Promise<void> {
        await this.elementLocator.click();
    }
}
```

### Test Structure
```typescript
test.describe('Feature Name', () => {
    test('should do something specific', async ({ page }) => {
        // Arrange
        const homePage = new HomePage(page);
        const testData = TestDataGenerator.generateUserData();

        // Act
        await homePage.navigate();
        await homePage.performAction(testData);

        // Assert
        await expect(page.locator('result')).toBeVisible();
    });
});
```

## Error Handling
- Let Playwright's built-in retry logic handle transient failures
- Add custom error messages to assertions for better debugging
- Use soft assertions (`expect.soft()`) when checking multiple conditions
- Capture screenshots on failure (configured in `playwright.config.ts`)

## When Suggesting Changes
1. Maintain existing patterns and architecture
2. Follow the Page Object Model consistently
3. Ensure test independence and isolation
4. Add appropriate waits and assertions
5. Generate unique test data for each run
6. Keep page objects focused on page interactions, not test logic
7. Use TypeScript features for type safety

## Configuration
- Review `playwright.config.ts` for project settings
- Tests run on Chromium, Firefox, and WebKit by default
- Screenshots and traces captured on failure
- HTML reporter enabled for test results
