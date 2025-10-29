# Quick Start Guide

## Running Your First Test

### Option 1: Run all tests
```bash
npm test
```

### Option 2: Run with browser visible (headed mode)
```bash
npm run test:headed
```

### Option 3: Run with Playwright UI (recommended for beginners)
```bash
npm run test:ui
```

## What to Expect

When you run the tests, Playwright will:

1. Open the browser(s)
2. Navigate to https://automationexercise.com
3. Click on the "Signup / Login" link
4. Fill in a new user signup form with unique data
5. Submit the signup form
6. Fill in the complete account information form
7. Create the account
8. Verify the success message
9. Continue to the logged-in home page
10. Verify the user is logged in

## Test Execution Time

- Average execution time: 30-60 seconds per test
- Tests run in parallel across multiple browsers by default

## Understanding the Output

### Successful Test Run
```
Running 2 tests using 2 workers

  ✓ 1 signup-flow.spec.ts:13:3 › User Signup Flow › Complete user signup flow (30s)
  ✓ 2 signup-flow.spec.ts:95:3 › User Signup Flow › Signup flow validation (25s)

  2 passed (55s)
```

### Failed Test Run
If a test fails, you'll see:
- Red X marker
- Error message
- Screenshot saved in test-results/
- Video recording (if enabled)
- Trace file for debugging

## Viewing Test Reports

After running tests, view the HTML report:
```bash
npm run report
```

This opens an interactive report showing:
- Test results
- Screenshots
- Videos
- Execution timeline
- Detailed error messages

## Debugging Failed Tests

### Method 1: Debug Mode
```bash
npm run test:debug
```
Opens Playwright Inspector for step-by-step debugging.

### Method 2: View Trace
```bash
npx playwright show-trace test-results/trace.zip
```
Opens the trace viewer showing complete test execution.

### Method 3: Check Screenshots
Navigate to `test-results/` folder to see failure screenshots.

## Running Specific Tests

### Run a specific test file
```bash
npx playwright test tests/signup-flow.spec.ts
```

### Run a specific test by name
```bash
npx playwright test -g "Complete user signup flow"
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Common Commands Reference

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests headless |
| `npm run test:headed` | Run tests with browser UI |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:debug` | Debug tests with inspector |
| `npm run report` | View HTML test report |
| `npx playwright codegen` | Generate test code interactively |

## Tips for Success

1. **First Run**: Use `npm run test:ui` to see tests execute interactively
2. **Debugging**: Use `npm run test:headed` to watch tests in real browsers
3. **CI/CD**: Use `npm test` for automated pipelines
4. **Development**: Use debug mode to step through test execution

## Troubleshooting

### "Cannot find module" error
```bash
npm install
```

### "Browser not installed" error
```bash
npx playwright install
```

### Tests timeout
- Check internet connection
- Verify website is accessible
- Increase timeout in playwright.config.ts

## Next Steps

1. Explore the test files in `tests/` folder
2. Examine page objects in `pages/` folder
3. Review test utilities in `utils/` folder
4. Modify test data as needed
5. Add more test scenarios

## Need Help?

- Check the full README.md for detailed documentation
- Review Playwright documentation: https://playwright.dev
- Examine the code comments in test files