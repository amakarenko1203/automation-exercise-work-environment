# Automation Exercise - User Signup Flow Testing

This project contains automated tests for the user signup flow using Playwright and TypeScript.

## Test Scenarios

The test suite covers the complete user signup flow with the following steps:

### Main Signup Flow Test
1. **Navigate to Signup/Login**: User clicks on "Signup / Login" link
   - **Expected**: Signup/Login page opens
2. **Enter User Details**: User enters valid name and email in "New User Signup" form
   - **Expected**: Fields accept input
3. **Click Signup**: User clicks on "Signup" button
   - **Expected**: "Enter Account Information" page displays
4. **Fill Account Information**: User fills in all required fields and clicks "Create Account"
   - **Expected**: "Account created!" message displayed
5. **Continue to Home**: User clicks "Continue" button
   - **Expected**: User is redirected to the logged-in home page

### Additional Validation Tests
- Individual step validation
- Form field validation
- Navigation validation
- Error handling scenarios

## Project Structure

```
automation-exercise-work-environment/
├── pages/                          # Page Object Model classes
│   ├── HomePage.ts                 # Home page interactions
│   ├── SignupLoginPage.ts          # Signup/Login page interactions
│   ├── AccountInformationPage.ts   # Account creation form
│   └── AccountCreatedPage.ts       # Success page interactions
├── tests/                          # Test specifications
│   └── signup-flow.spec.ts         # Main signup flow tests
├── utils/                          # Utility functions and helpers
│   ├── TestDataGenerator.ts        # Generate test data
│   └── TestHelpers.ts              # Common test utilities
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright Browsers**
   ```bash
   npx playwright install
   ```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (with browser UI)
```bash
npm run test:headed
```

### Run Tests with UI Mode (Playwright Test UI)
```bash
npm run test:ui
```

### Debug Tests
```bash
npm run test:debug
```

### View Test Report
```bash
npm run report
```

## Test Configuration

The tests are configured to run against `https://automationexercise.com` by default.

### Browser Support
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

### Test Features
- **Parallel Execution**: Tests run in parallel for faster execution
- **Retry Logic**: Failed tests are retried automatically (in CI environments)
- **Screenshots**: Captured on test failures
- **Video Recording**: Recorded on test failures
- **Trace Collection**: Available for debugging failed tests

## Page Object Model

This project uses the Page Object Model (POM) pattern for better maintainability:

### HomePage
- Navigation to signup/login
- Verify logged-in status
- User authentication state management

### SignupLoginPage
- New user signup form interactions
- Login form interactions
- Form validation

### AccountInformationPage
- Account details form filling
- Address information management
- Account creation submission

### AccountCreatedPage
- Success message verification
- Navigation to logged-in state

## Test Data Management

### TestDataGenerator
- **generateUniqueUser()**: Creates unique user data for each test run
- **generateRandomUser()**: Creates randomized user data
- **getValidEmailFormats()**: Provides various valid email formats
- **getInvalidEmailFormats()**: Provides invalid email formats for negative testing

### TestHelpers
Utility functions for:
- Screenshot capture
- Network idle waiting
- Element stability checks
- Retry mechanisms
- Logging and debugging

## Best Practices Implemented

1. **Page Object Model**: Separation of concerns between test logic and page interactions
2. **Unique Test Data**: Each test run uses unique data to avoid conflicts
3. **Explicit Waits**: Proper waiting for elements and network states
4. **Error Handling**: Comprehensive error handling and retry mechanisms
5. **Modular Design**: Reusable components and utilities
6. **Clear Assertions**: Descriptive test assertions with proper error messages
7. **Test Isolation**: Each test is independent and can run in any order

## Troubleshooting

### Common Issues

1. **Tests Timing Out**
   - Check network connectivity
   - Verify the target website is accessible
   - Increase timeout values if needed

2. **Element Not Found**
   - Website structure might have changed
   - Update selectors in page objects
   - Check for dynamic content loading

3. **Browser Installation Issues**
   - Run `npx playwright install` to reinstall browsers
   - Check system requirements for Playwright

### Debugging Tips

1. **Use Debug Mode**
   ```bash
   npm run test:debug
   ```

2. **Enable Trace Viewer**
   - Traces are automatically collected on failures
   - View with: `npx playwright show-trace trace.zip`

3. **Use Console Logs**
   - Add `console.log()` statements in page objects
   - Use `TestHelpers.logStep()` for structured logging

## CI/CD Integration

This test suite is ready for CI/CD integration with:
- GitHub Actions
- Jenkins
- Azure DevOps
- Other CI/CD platforms

Example GitHub Actions workflow:
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - run: npm ci
    - run: npx playwright install --with-deps
    - run: npm test
```

## Contributing

1. Follow the existing code structure and naming conventions
2. Add appropriate tests for new features
3. Update documentation for any changes
4. Ensure all tests pass before submitting changes

## License

This project is for educational and testing purposes.