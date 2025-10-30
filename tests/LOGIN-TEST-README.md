# Login Flow Test

## Overview
Automated test suite for validating user login functionality.

## Test Scenarios

### 1. Complete User Login Flow
- Navigate to Signup/Login page
- Enter valid credentials
- Verify successful login with "Logged in as [username]" message

### 2. Login Flow Validation (Step-by-step)
- Verify each step independently
- Test navigation
- Test form field acceptance
- Test login button functionality

### 3. Invalid Credentials Test
- Verify error message appears for invalid login

## Prerequisites

**Important:** These tests require a pre-existing user account in the system.

### Option 1: Use Signup Flow First
Before running login tests, create a test user by running the signup flow:
```bash
npx playwright test tests/signup-flow.spec.ts
```
This will create a new user with credentials you can then use for login tests.

### Option 2: Update Test Credentials
Edit the test credentials in `tests/login-flow.spec.ts`:
```typescript
const testCredentials = {
  email: 'your-existing-user@example.com',
  password: 'YourPassword123!',
  username: 'Your Username'
};
```

## Running the Tests

### Run all login tests
```bash
npx playwright test tests/login-flow.spec.ts
```

### Run specific test
```bash
npx playwright test tests/login-flow.spec.ts -g "Complete user login flow"
```

### Run with UI mode
```bash
npx playwright test tests/login-flow.spec.ts --ui
```

### Run with headed browser
```bash
npx playwright test tests/login-flow.spec.ts --headed
```

## Test Data
- Email: Uses pre-existing account email
- Password: Uses pre-existing account password
- Username: Expected username displayed after login

## Page Objects Used
- `HomePage`: Home page interactions and navigation
- `SignupLoginPage`: Login form interactions and validations

## Expected Results
1. ✓ Login page opens when clicking Signup/Login link
2. ✓ Form fields accept valid email and password input
3. ✓ Successful login redirects to home page
4. ✓ "Logged in as [username]" message appears after login
5. ✓ Error message appears for invalid credentials
